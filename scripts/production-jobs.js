'use strict';
// Pure deterministic job records: no I/O, media generation or provider access.
const fail=m=>{throw Error(m)},obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),str=x=>typeof x==='string'&&x.trim().length>0;
const copy=x=>structuredClone(x);
function check(p,l){
 if(!obj(p)||!str(p.project_id)||!Number.isSafeInteger(p.revision)||!obj(p.authorization)||!['production_go','provider_job_allowed','publication_allowed'].every(k=>p.authorization[k]===false))fail('Operational HOLD required');
 if(!obj(l)||l.project_id!==p.project_id||l.project_revision!==p.revision||!Array.isArray(l.jobs))fail('Stale or invalid job ledger');
 const ids=new Set(),keys=new Set();
 for(const j of l.jobs){
  if(!obj(j)||!str(j.id)||!str(j.idempotency_key)||ids.has(j.id)||keys.has(j.idempotency_key)||!str(j.shot_id)||!['MOCK','LOCAL','MANUAL'].includes(j.method)||!['PLANNED','RUNNING_MOCK','FAILED_MOCK','COMPLETED_MOCK','RECORDED_EXTERNAL'].includes(j.status)||!Number.isSafeInteger(j.attempt)||j.attempt<0||!Array.isArray(j.artifacts))fail('Invalid or duplicate job');
  if(j.method!=='MOCK'&&!['PLANNED','RECORDED_EXTERNAL'].includes(j.status))fail('Non-mock execution forbidden');
  if(j.status==='COMPLETED_MOCK'&&(j.method!=='MOCK'||j.artifacts.length!==1))fail('Invalid mock completion');
  if(j.status!=='COMPLETED_MOCK'&&j.artifacts.length)fail('Unverified artifact state');
  for(const a of j.artifacts)if(!obj(a)||a.kind!=='MOCK_MANIFEST'||a.synthetic!==true||a.media_verified!==false||a.job_id!==j.id)fail('Fabricated media evidence');
  ids.add(j.id);keys.add(j.idempotency_key);
 }
 return true;
}
function newJobLedger(p){
 const l={project_id:p?.project_id,project_revision:p?.revision,jobs:[]};check(p,l);return l;
}
function planProductionJob(p,l,r){
 check(p,l);
 if(!obj(r)||!str(r.id)||!str(r.idempotency_key)||!str(r.shot_id)||!['MOCK','LOCAL','MANUAL'].includes(r.method))fail('Invalid job request');
 if(!Array.isArray(p.shots)||!p.shots.some(s=>s.id===r.shot_id))fail('Unknown shot');
 const existing=l.jobs.find(j=>j.idempotency_key===r.idempotency_key);
 if(existing){if(existing.id!==r.id||existing.method!==r.method||existing.shot_id!==r.shot_id)fail('Idempotency conflict');return copy(l);}
 if(l.jobs.some(j=>j.id===r.id))fail('Duplicate job ID');
 const n=copy(l);n.jobs.push({id:r.id,idempotency_key:r.idempotency_key,shot_id:r.shot_id,method:r.method,status:'PLANNED',attempt:0,artifacts:[]});return n;
}
function advanceMockJob(p,l,{job_id,action}){
 check(p,l);const n=copy(l),j=n.jobs.find(j=>j.id===job_id);
 if(!j||j.method!=='MOCK')fail('Only mock jobs advance');
 if(action==='START'&&['PLANNED','FAILED_MOCK'].includes(j.status)){j.status='RUNNING_MOCK';j.attempt++;return n;}
 if(action==='FAIL'&&j.status==='RUNNING_MOCK'){j.status='FAILED_MOCK';return n;}
 if(action==='COMPLETE'&&j.status==='RUNNING_MOCK'){j.status='COMPLETED_MOCK';j.artifacts=[{id:j.id+':'+j.attempt,job_id:j.id,kind:'MOCK_MANIFEST',synthetic:true,media_verified:false}];return n;}
 fail('Invalid mock transition');
}
function recordExternalArtifact(p,l,{job_id,artifact_ref}){
 check(p,l);if(!str(artifact_ref))fail('Artifact reference required');
 const n=copy(l),j=n.jobs.find(j=>j.id===job_id);
 if(!j||j.method==='MOCK'||j.status!=='PLANNED')fail('Manual/local planned job required');
 j.status='RECORDED_EXTERNAL';j.external_artifact={ref:artifact_ref,verified:false,origin:'USER_REPORTED'};return n;
}
module.exports={newJobLedger,planProductionJob,advanceMockJob,recordExternalArtifact,validateJobLedger:check};
