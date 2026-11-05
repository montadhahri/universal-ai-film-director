'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {SHOTS,createProject,submit,runMock,retry}=require('../../research/v3/mock-executor.js');
const request=(shot_id)=>({project_id:'the-last-light-research',shot_id,approved_revision:'storyboard-v1',
 operation:'mock-render',adapter:'mock',cost:0,idempotency_key:'mock-'+shot_id,output_requirements:{kind:'simulated'}});
const approval=(shot_id)=>({granted:true,project_id:'the-last-light-research',shot_id,approved_revision:'storyboard-v1',
 operation:'mock-render',adapter:'mock',max_cost:0,evidence_ref:'fictional-test-approval'});
test('five requests are blocked while Production GO is HOLD',()=>{
 const p=createProject();for(const s of SHOTS.filter(s=>s!=='SH01')){const j=submit(p,request(s),approval(s));assert.equal(j.status,'BLOCKED');assert.throws(()=>runMock(p,j),/JOB_NOT_AUTHORIZED/)}
 assert.throws(()=>submit(p,request('SH01'),approval('SH01')),/LOCKED_SHOT/);
 assert.equal(p.jobs.length,4);assert.equal(p.spent,0);
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

test('blocked request cannot be upgraded by later approval',()=>{
 const p=createProject();const r=request('SH02');
 const blocked=submit(p,r,null);p.production_go=true;
 assert.equal(submit(p,r,approval('SH02')),blocked);
 assert.equal(blocked.status,'BLOCKED');
 assert.throws(()=>runMock(p,blocked),/JOB_NOT_AUTHORIZED/);
});
test('retry rejects wrong project, revision, operation, adapter, budget and missing evidence',()=>{
 const p=createProject();p.production_go=true;
 const j=submit(p,request('SH05'),approval('SH05'));
 runMock(p,j,{fail:true});
 const valid={...approval('SH05'),retry:true};
 for(const altered of [
   {project_id:'other'}, {approved_revision:'other'}, {operation:'other'},
   {adapter:'other'}, {max_cost:-1}, {evidence_ref:''}, {shot_id:'SH03'}
 ]) {
   assert.throws(()=>retry(p,j,{...valid,...altered}),/RETRY_NOT_AUTHORIZED/);
   assert.equal(j.status,'FAILED');
 }
 retry(p,j,valid);assert.equal(runMock(p,j).status,'COMPLETED');
});
test('retry cannot run when shot becomes locked or Production GO is revoked',()=>{
 const p=createProject();p.production_go=true;
 const j=submit(p,request('SH03'),approval('SH03'));
 runMock(p,j,{fail:true});
 p.production_go=false;
 assert.throws(()=>retry(p,j,{...approval('SH03'),retry:true}),/RETRY_NOT_AUTHORIZED/);
 p.production_go=true;p.locked.SH03='approved-asset';
 assert.throws(()=>retry(p,j,{...approval('SH03'),retry:true}),/RETRY_NOT_AUTHORIZED/);
});
