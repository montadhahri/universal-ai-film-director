'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {newJobLedger,planProductionJob,advanceMockJob,recordExternalArtifact}=require('../../scripts/production-jobs.js');
const project=()=>{const p=newProject('film');p.shots.push({id:'SH01',revision:1,state:'DRAFT'});return p};
const request=(method='MOCK')=>({id:'j1',idempotency_key:'key1',shot_id:'SH01',method});
test('mock lifecycle is deterministic, synthetic and immutable',()=>{
 const p=project(),l=newJobLedger(p),planned=planProductionJob(p,l,request());
 assert.deepEqual(planProductionJob(p,planned,request()),planned);
 const run=advanceMockJob(p,planned,{job_id:'j1',action:'START'});
 const done=advanceMockJob(p,run,{job_id:'j1',action:'COMPLETE'});
 assert.equal(done.jobs[0].artifacts[0].media_verified,false);
 assert.equal(done.jobs[0].artifacts[0].synthetic,true);
 assert.equal(l.jobs.length,0);assert.equal(planned.jobs[0].status,'PLANNED');
 assert.equal(p.authorization.production_go,false);
 assert.throws(()=>advanceMockJob(p,done,{job_id:'j1',action:'START'}),/transition/);
});
test('failure and retry increment attempt',()=>{
 const p=project(),l=planProductionJob(p,newJobLedger(p),request());
 const run=advanceMockJob(p,l,{job_id:'j1',action:'START'});
 const failed=advanceMockJob(p,run,{job_id:'j1',action:'FAIL'});
 assert.equal(advanceMockJob(p,failed,{job_id:'j1',action:'START'}).jobs[0].attempt,2);
 assert.throws(()=>advanceMockJob(p,failed,{job_id:'j1',action:'COMPLETE'}),/transition/);
});
test('idempotency conflict rejected',()=>{
 const p=project(),l=planProductionJob(p,newJobLedger(p),request());
 assert.throws(()=>planProductionJob(p,l,{...request(),id:'j2'}),/Idempotency/);
});
test('provider jobs rejected',()=>{const p=project();assert.throws(()=>planProductionJob(p,newJobLedger(p),request('EXTERNAL')),/Invalid/);});
test('stale revisions rejected',()=>{const p=project(),l=newJobLedger(p);p.revision++;assert.throws(()=>planProductionJob(p,l,request()),/Stale/);});
test('operational authorization HOLD enforced',()=>{const p=project(),l=newJobLedger(p);p.authorization.provider_job_allowed=true;assert.throws(()=>planProductionJob(p,l,request()),/HOLD/);});
test('manual artifact is user reported, not verified',()=>{
 const p=project(),l=planProductionJob(p,newJobLedger(p),request('MANUAL'));
 const n=recordExternalArtifact(p,l,{job_id:'j1',artifact_ref:'user:video.mp4'});
 assert.equal(n.jobs[0].external_artifact.verified,false);
 assert.throws(()=>advanceMockJob(p,l,{job_id:'j1',action:'START'}),/mock/);
});
test('unknown shot rejected',()=>{const p=project();assert.throws(()=>planProductionJob(p,newJobLedger(p),{...request(),shot_id:'other'}),/Unknown/);});
