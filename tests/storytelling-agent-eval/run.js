#!/usr/bin/env node
'use strict';
// Offline evaluation of real external agent captures. Does not invoke any model.
const fs=require('node:fs'),path=require('node:path'),suite=require('./cases.json');
const filled=x=>typeof x==='string'&&x.trim().length>0;
const statuses=['PASS','FAIL','BLOCKED','NOT_RUN'];
function evaluate(data={captures:[]}){
 if(!data||!Array.isArray(data.captures))throw Error('Expected captures array');
 const known=new Map(suite.cases.map(c=>[c.id,c])),seen=new Map();
 for(const x of data.captures){
  if(!x||!known.has(x.case_id))throw Error('Unknown case');
  if(seen.has(x.case_id))throw Error('Duplicate case');
  seen.set(x.case_id,x);
 }
 const results=suite.cases.map(c=>{
  const x=seen.get(c.id);
  if(!x||x.verdict==='NOT_RUN')return {case_id:c.id,status:'NOT_RUN',reason:'No reviewed real-agent capture'};
  if(x.verdict==='BLOCKED')return filled(x.reason)?{case_id:c.id,status:'BLOCKED',reason:x.reason}:{case_id:c.id,status:'FAIL',issues:['Missing block reason']};
  const issues=[];
  if(!['PASS','FAIL'].includes(x.verdict))issues.push('Invalid verdict');
  for(const k of ['host','model','time','prompt','response','skill','evidence_ref','reviewer','review_notes','skill_revision'])
   if(!filled(x[k]))issues.push('Missing '+k);
  if(x.prompt!==c.prompt)issues.push('Prompt differs from manifest');
  if(x.skill!==suite.skill)issues.push('Wrong skill');
  if(!Array.isArray(x.loaded_files)||!x.loaded_files.includes('skills/film-storytelling/SKILL.md'))
   issues.push('Missing skill-load evidence');
  if(filled(x.time)&&!Number.isFinite(Date.parse(x.time)))issues.push('Invalid timestamp');
  if(!x.criteria||typeof x.criteria!=='object')issues.push('Missing criterion-by-criterion review');
  else for(const criterion of c.expected){
   const v=x.criteria[criterion];
   if(!v||!['PASS','FAIL'].includes(v.verdict)||!filled(v.evidence))
    issues.push('Missing reviewed evidence for '+criterion);
  }
  if(x.verdict==='PASS'&&x.criteria&&c.expected.some(k=>x.criteria[k]?.verdict!=='PASS'))
   issues.push('PASS conflicts with failed criterion');
  if(/\\bI (?:watched|inspected|rendered|generated) (?:the )?(?:film|video|clip)\\b/i.test(x.response||''))
   issues.push('Possible fabricated media claim; manual review required');
  return {case_id:c.id,status:issues.length?'FAIL':x.verdict,issues,
   evidence_class:'REVIEWER_SUPPLIED_UNVERIFIED',evidence_ref:x.evidence_ref||null};
 });
 const counts=Object.fromEntries(statuses.map(s=>[s,results.filter(r=>r.status===s).length]));
 return {suite:suite.suite,total:results.length,counts,results,agent_invoked_by_runner:false,
  media_generated:false,complete:counts.PASS===results.length,
  limitation:'Capture and criterion evidence are reviewer supplied, not independently authenticated; creative quality requires human judgment.'};
}
function main(argv=process.argv.slice(2)){
 let input={captures:[]},out=null;
 for(let i=0;i<argv.length;i++){
  if(argv[i]==='--captures'&&argv[i+1])input=JSON.parse(fs.readFileSync(argv[++i],'utf8'));
  else if(argv[i]==='--json-out'&&argv[i+1])out=argv[++i];
  else throw Error('Usage: run.js [--captures private.json] [--json-out report.json]');
 }
 const r=evaluate(input);
 if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(r,null,2)+'\\n')}
 for(const x of r.results)console.log(x.status+' '+x.case_id);
 console.log('Real agent calls by runner: 0; reviewed:',r.counts.PASS+r.counts.FAIL,'/',r.total);
 return r.counts.FAIL?1:0;
}
if(require.main===module)try{process.exitCode=main()}catch(e){console.error(e.message);process.exitCode=2}
module.exports={evaluate,main};
