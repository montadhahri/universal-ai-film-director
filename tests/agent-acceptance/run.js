#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const cases=require('./cases.json').cases;
const required=['host','model','time','prompt','response','skill','evidence_ref','review_notes'];
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
function evaluate(input={captures:[]}){
 if(!input||!Array.isArray(input.captures))throw Error('Expected captures array');
 const map=new Map(),ids=new Set(cases.map(x=>x.id));
 for(const c of input.captures){
  if(!c||!ids.has(c.case_id))throw Error('Unknown capture case');
  if(map.has(c.case_id))throw Error('Duplicate capture case');
  map.set(c.case_id,c);
 }
 const results=cases.map(c=>{
  const x=map.get(c.id);
  if(!x)return {case_id:c.id,skill:c.skill,status:'NOT_RUN',reason:'No actual agent capture provided'};
  if(x.verdict==='NOT_RUN')return {case_id:c.id,skill:c.skill,status:'NOT_RUN',reason:'Reported not executed'};
  if(x.verdict==='BLOCKED')return nonempty(x.reason)?{case_id:c.id,skill:c.skill,status:'BLOCKED',reason:x.reason}:{case_id:c.id,skill:c.skill,status:'FAIL',reason:'Blocked without reason'};
  if(!['PASS','FAIL'].includes(x.verdict))return {case_id:c.id,skill:c.skill,status:'FAIL',reason:'Invalid reviewer verdict'};
  const issues=required.filter(k=>!nonempty(x[k])).map(k=>'Missing '+k);
  if(x.prompt!==c.prompt)issues.push('Prompt does not match manifest');
  if(x.skill!==c.skill)issues.push('Different skill loaded');
  if(!Array.isArray(x.loaded_files)||!x.loaded_files.includes('skills/'+c.skill+'/SKILL.md'))issues.push('Missing skill load evidence');
  if(nonempty(x.time)&&!Number.isFinite(Date.parse(x.time)))issues.push('Invalid timestamp');
  if(['VIDEO-01','QA-01','QA-02','SOUND-02','DIR-04'].includes(c.id)&&/\bI (?:watched|inspected|rendered|generated) (?:the )?(?:film|video|clip)\b/i.test(x.response||''))issues.push('Possible fabricated media inspection or generation');
  return {case_id:c.id,skill:c.skill,status:issues.length?'FAIL':x.verdict,
   reviewer_verdict:x.verdict,evidence_ref:x.evidence_ref||null,host:x.host||null,
   issues,evidence_class:'SUPPLIED_CAPTURE_UNVERIFIED'};
 });
 const counts=Object.fromEntries(['PASS','FAIL','BLOCKED','NOT_RUN'].map(s=>[s,results.filter(r=>r.status===s).length]));
 return {suite:'V2-03',total:cases.length,counts,results,agent_invoked_by_runner:false,video_generated:false,
  complete:counts.PASS===cases.length,
  limitation:'Reviewer-provided results; offline structural checks do not verify agent identity, semantics, media or host.'};
}
function main(args=process.argv.slice(2)){
 let input={captures:[]},out=null;
 for(let i=0;i<args.length;i++){
  if(args[i]==='--captures'&&args[i+1])input=JSON.parse(fs.readFileSync(args[++i],'utf8'));
  else if(args[i]==='--json-out'&&args[i+1])out=args[++i];
  else throw Error('Usage: run.js [--captures file.json] [--json-out file.json]');
 }
 const r=evaluate(input);
 if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(r,null,2)+'\n')}
 for(const x of r.results)console.log(x.status+' '+x.case_id);
 console.log('Observed cases:',r.counts.PASS+r.counts.FAIL+r.counts.BLOCKED,'of',r.total,'; runner did not invoke agents');
 return r.counts.FAIL?1:0;
}
if(require.main===module)try{process.exitCode=main()}catch(e){console.error(e.message);process.exitCode=2}
module.exports={evaluate,main};
