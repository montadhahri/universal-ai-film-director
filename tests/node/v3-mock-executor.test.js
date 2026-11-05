'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {SHOTS,createProject,submit,runMock,retry}=require('../../research/v3/mock-executor.js');
const request=(shot_id)=>({project_id:'the-last-light-research',shot_id,approved_revision:'storyboard-v1',
 operation:'mock-render',adapter:'mock',cost:0,idempotency_key:'mock-'+shot_id,output_requirements:{kind:'simulated'}});
const approval=(shot_id)=>({granted:true,project_id:'the-last-light-research',shot_id,approved_revision:'storyboard-v1',
 operation:'mock-render',adapter:'mock',max_cost:0,evidence_ref:'fictional-test-approval'});
test('five requests are blocked while Production GO is HOLD',()=>{
 const p=createProject();for(const s of SHOTS){const j=submit(p,request(s),approval(s));assert.equal(j.status,'BLOCKED');assert.throws(()=>runMock(p,j),/JOB_NOT_AUTHORIZED/)}
 assert.equal(p.jobs.length,5);assert.equal(p.spent,0);
});
test('only explicitly scoped mock authorization can run',()=>{
 const p=createProject();p.production_go=true;const r=request('SH02');
 assert.equal(submit(p,r,null).status,'BLOCKED');
 assert.equal(submit(p,request('SH03'),approval('SH02')).status,'BLOCKED');
 const j=submit(p,request('SH04'),approval('SH04'));assert.equal(j.status,'AUTHORIZED');
 assert.equal(runMock(p,j).status,'COMPLETED');assert.equal(j.result_evidence.not_rendered,true);
});
test('idempotency, collision, stale revision and budget are rejected',()=>{
 const p=createProject();p.production_go=true;const r=request('SH02');const j=submit(p,r,approval('SH02'));
 assert.equal(submit(p,r,approval('SH02')),j);assert.equal(p.jobs.length,1);
 assert.throws(()=>submit(p,{...r,output_requirements:{kind:'changed'}},approval('SH02')),/IDEMPOTENCY_CONFLICT/);
 assert.throws(()=>submit(p,{...request('SH03'),approved_revision:'other'},approval('SH03')),/STALE_OR_WRONG_REVISION/);
 assert.throws(()=>submit(p,{...request('SH03'),cost:1},approval('SH03')),/BUDGET_EXCEEDED/);
});
test('locked shot cannot be submitted or overwritten',()=>{
 const p=createProject();p.production_go=true;
 assert.throws(()=>submit(p,request('SH01'),approval('SH01')),/LOCKED_SHOT/);
 assert.equal(p.locked.SH01,'original-locked-asset');
});
test('failed job requires separately authorized retry',()=>{
 const p=createProject();p.production_go=true;const j=submit(p,request('SH05'),approval('SH05'));
 runMock(p,j,{fail:true});assert.equal(j.status,'FAILED');
 assert.throws(()=>retry(p,j,approval('SH05')),/RETRY_NOT_AUTHORIZED/);
 retry(p,j,{...approval('SH05'),retry:true});runMock(p,j);
 assert.equal(j.status,'COMPLETED');assert.equal(j.attempts,2);
});
