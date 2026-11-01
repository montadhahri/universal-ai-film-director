#!/usr/bin/env node
'use strict';
// Offline reader of human reviews. Never invokes a model, provider or video renderer.
const fs=require('node:fs'),path=require('node:path');
const suite=require('./cases.json'),valid=new Set([1,2,3,4,5]);
const filled=x=>typeof x==='string'&&x.trim().length>0;
function evaluate(data={comparisons:[]}){
 if(!data||!Array.isArray(data.comparisons))throw Error('Expected comparisons array');
 const known=new Set(suite.cases.map(c=>c.id)),map=new Map();
 for(const pair of data.comparisons){
  if(!pair||!known.has(pair.case_id))throw Error('Unknown comparison case ID');
  if(map.has(pair.case_id))throw Error('Duplicate comparison case ID');
  map.set(pair.case_id,pair);
 }
 const results=suite.cases.map(c=>{
  const p=map.get(c.id);
  if(!p||p.status==='NOT_RUN')return {case_id:c.id,status:'NOT_RUN',reason:'No real reviewed agent captures'};
  if(p.status==='BLOCKED')return filled(p.reason)?{case_id:c.id,status:'BLOCKED',reason:p.reason}:{case_id:c.id,status:'FAIL',issues:['Block reason required']};
  if(p.status!=='REVIEWED')return {case_id:c.id,status:'FAIL',issues:['Unknown status']};
  const problems=[];
  if(!filled(p.reviewer)||!filled(p.review_ref))problems.push('Missing reviewer/provenance');
  if(!['AB','BA'].includes(p.blind_order))problems.push('Missing blind order');
  if(p.safety_violation===true)problems.push('Safety violation prohibits scoring success');
  for(const [which,version] of [['baseline','v1.0.0'],['candidate','v2-development']]){
   const a=p[which];
   if(!a||typeof a!=='object'){problems.push('Missing '+which+' agent capture');continue}
   for(const f of ['host','model','timestamp','prompt','response','skill','evidence_ref','loaded_skill_file'])
    if(!filled(a[f]))problems.push(which+' missing '+f);
   if(a.prompt!==c.prompt||a.skill!==c.skill||a.version!==version)problems.push(which+' prompt/skill/version mismatch');
   if(filled(a.timestamp)&&!Number.isFinite(Date.parse(a.timestamp)))problems.push(which+' timestamp invalid');
   if(!filled(p.rationale?.[which]))problems.push(which+' rationale missing');
   for(const dim of c.dimensions)if(!valid.has(p.scores?.[which]?.[dim]))problems.push(which+' invalid score '+dim);
  }
  if(problems.length)return {case_id:c.id,status:'FAIL',issues:problems};
  const avg=role=>c.dimensions.reduce((sum,dim)=>sum+p.scores[role][dim],0)/c.dimensions.length;
  const delta=Number((avg('candidate')-avg('baseline')).toFixed(3));
  return {case_id:c.id,status:'PASS',reviewer_reported:true,delta,
   outcome:delta>0?'V2_HIGHER':delta<0?'V1_HIGHER':'TIE',review_ref:p.review_ref};
 });
 const counts=Object.fromEntries(['PASS','FAIL','BLOCKED','NOT_RUN'].map(status=>[status,results.filter(x=>x.status===status).length]));
 const rated=results.filter(x=>x.status==='PASS'),wins=Object.fromEntries(['V2_HIGHER','V1_HIGHER','TIE'].map(x=>[x,rated.filter(y=>y.outcome===x).length]));
 return {suite:suite.suite,counts,wins,mean_delta:rated.length?Number((rated.reduce((a,x)=>a+x.delta,0)/rated.length).toFixed(3)):null,
  complete:counts.PASS===suite.cases.length,model_executed:false,media_generated:false,reviewer_captures_unverified:true,
  pass_semantics:'PASS confirms a structurally complete submitted review, not proof that v2 is better',results};
}
function main(argv=process.argv.slice(2)){
 let data={comparisons:[]},out=null;
 for(let i=0;i<argv.length;i++){
  if(argv[i]==='--comparisons'&&argv[i+1])data=JSON.parse(fs.readFileSync(argv[++i],'utf8'));
  else if(argv[i]==='--json-out'&&argv[i+1])out=argv[++i];
  else throw Error('Usage: run.js [--comparisons private.json] [--json-out report.json]');
 }
 const result=evaluate(data);
 if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n')}
 for(const x of result.results)console.log(x.status+' '+x.case_id);
 console.log('Reviewer comparisons:',result.counts.PASS,'/',suite.cases.length,'; model executed: false');
 return result.counts.FAIL?1:0;
}
if(require.main===module)try{process.exitCode=main()}catch(e){console.error(e.message);process.exitCode=2}
module.exports={evaluate,main};
