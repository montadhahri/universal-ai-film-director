'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {planBudget}=require('../../scripts/budget-planner.js');
const {newJobLedger,planProductionJob,advanceMockJob}=require('../../scripts/production-jobs.js');
const {reconcileBudgetJobs}=require('../../scripts/budget-reconciliation.js');
const {exportRecoveryBundle,importRecoveryBundle}=require('../../scripts/recovery-bundle.js');
const {exportCheckpoint,importCheckpoint}=require('../../scripts/checkpoint-envelope.js');
const {assessMediaExport}=require('../../scripts/media-export-qa.js');
const ids=['SH01','SH02','SH03','SH04','SH05'];
const project=()=>{
 const p=newProject('the-last-light-acceptance');
 p.shots=ids.map((id,i)=>({id,revision:1,state:i===0?'LOCKED':'APPROVED',...(i===0?{approved_asset:'fixture:approved-SH01'}:{})}));
 return p;
};
const budgetRequest=p=>({expected_revision:p.revision,currency:'EUR',ceiling_minor:0,
 shots:ids.map(id=>({shot_id:id,selected_option_id:'mock',options:[{id:'mock',method:'MOCK',currency:'EUR',cost_minor:0,confidence:'ESTIMATE',source:'synthetic test fixture, no provider cost',observed_on:'2026-11-15'}]}))});
const add=(p,l,id)=>planProductionJob(p,l,{id:'job-'+id,idempotency_key:'key-'+id,shot_id:id,method:'MOCK'});
test('five-shot 30-second zero-cost planning, mock recovery and truthful QA',()=>{
 const p=project(),original=structuredClone(p),request=budgetRequest(p);
 assert.equal(ids.length,5);assert.equal(5*6000,30000);
 assert.equal(planBudget(p,request).status,'WITHIN_ESTIMATED_CEILING');
 let ledger=newJobLedger(p);
 for(const id of ids)ledger=add(p,ledger,id);
 assert.equal(reconcileBudgetJobs(p,request,ledger).status,'PASS');
 assert.deepEqual(add(p,ledger,'SH02'),ledger);
 assert.throws(()=>planProductionJob(p,ledger,{id:'different',idempotency_key:'key-SH02',shot_id:'SH02',method:'MOCK'}),/Idempotency/);
 for(const id of ids){
  ledger=advanceMockJob(p,ledger,{job_id:'job-'+id,action:'START'});
  if(id==='SH03'){
   ledger=advanceMockJob(p,ledger,{job_id:'job-'+id,action:'FAIL'});
   ledger=advanceMockJob(p,ledger,{job_id:'job-'+id,action:'START'});
  }
  ledger=advanceMockJob(p,ledger,{job_id:'job-'+id,action:'COMPLETE'});
 }
 assert.equal(ledger.jobs.length,5);
 assert.equal(ledger.jobs.find(j=>j.shot_id==='SH03').attempt,2);
 assert.ok(ledger.jobs.every(j=>j.artifacts[0].synthetic&&j.artifacts[0].media_verified===false));
 const bundle=exportRecoveryBundle(p,ledger),restored=importRecoveryBundle(bundle);
 assert.deepEqual(restored.project,p);assert.deepEqual(restored.job_ledger,ledger);
 assert.equal(restored.approval_authenticated,false);assert.equal(restored.job_execution_resumed,false);
 assert.equal(reconcileBudgetJobs(restored.project,request,restored.job_ledger).status,'PASS');
 const qa=assessMediaExport({artifact:ledger.jobs[0].artifacts[0],metadata:{duration_ms:30000,width:1280,height:720,frame_rate_num:24,frame_rate_den:1,has_audio:true},requirements:{duration_ms:30000,width:1280,height:720,frame_rate_num:24,frame_rate_den:1,audio_required:true}});
 assert.equal(qa.status,'GAP');assert.equal(qa.export_performed,false);
 assert.deepEqual(p,original);assert.equal(p.shots[0].state,'LOCKED');assert.equal(p.authorization.production_go,false);
});
test('legacy checkpoint remains readable without job ledger',()=>{
 const p=project();assert.deepEqual(importCheckpoint(exportCheckpoint(p)).project,p);
});
test('tampering, mismatched revision and fabricated media evidence fail closed',()=>{
 const p=project(),l=add(p,newJobLedger(p),'SH01');
 const bundle=JSON.parse(exportRecoveryBundle(p,l));bundle.job_ledger='{}';
 assert.throws(()=>importRecoveryBundle(JSON.stringify(bundle)),/checksum mismatch/);
 const stale=structuredClone(p);stale.revision++;
 assert.throws(()=>exportRecoveryBundle(stale,l),/Stale/);
 const forged=structuredClone(l);forged.jobs[0].status='COMPLETED_MOCK';forged.jobs[0].artifacts=[{kind:'MOCK_MANIFEST',synthetic:true,media_verified:true,job_id:'job-SH01'}];
 assert.throws(()=>exportRecoveryBundle(p,forged),/Fabricated/);
});
test('budget mismatch and unknown pricing never authorize jobs',()=>{
 const p=project(),l=add(p,newJobLedger(p),'SH01'),req=budgetRequest(p);
 req.shots[0].options[0].method='LOCAL';
 assert.equal(reconcileBudgetJobs(p,req,l).status,'GAP');
 req.shots[0].options[0].method='MOCK';req.shots[0].options[0].cost_minor=null;req.shots[0].options[0].confidence='UNKNOWN';
 assert.equal(reconcileBudgetJobs(p,req,l).status,'GAP');
 assert.equal(p.authorization.provider_job_allowed,false);
});
