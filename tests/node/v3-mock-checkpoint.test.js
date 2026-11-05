'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {createProject,submit,runMock}=require('../../research/v3/mock-executor.js');
const {checkpoint,restore}=require('../../research/v3/mock-checkpoint.js');
const request=(shot)=>({project_id:'the-last-light-research',shot_id:shot,approved_revision:'storyboard-v1',operation:'mock-render',adapter:'mock',cost:0,idempotency_key:'checkpoint-'+shot,output_requirements:{kind:'simulated'}});
const approval=(shot)=>({granted:true,project_id:'the-last-light-research',shot_id:shot,approved_revision:'storyboard-v1',operation:'mock-render',adapter:'mock',max_cost:0,evidence_ref:'test-only'});
function scratch(fn) { const dir=fs.mkdtempSync(path.join(os.tmpdir(),'v3-mock-'));try{return fn(path.join(dir,'state.json'));}finally{fs.rmSync(dir,{recursive:true,force:true});} }
test('authorized work is blocked on restart, never auto-resumed',()=>scratch(file=>{
 const p=createProject();p.production_go=true;
 submit(p,request('SH02'),approval('SH02'));
 checkpoint(p,file);
 const restored=restore(file);
 assert.equal(restored.production_go,false);
 assert.equal(restored.jobs[0].status,'BLOCKED');
 assert.equal(restored.jobs[0].reason,'RECOVERY_REQUIRES_NEW_AUTHORIZATION');
 assert.throws(()=>runMock(restored,restored.jobs[0]),/JOB_NOT_AUTHORIZED/);
 assert.equal(restored.events.at(-1).event,'RECOVERY_BLOCKED');
}));
test('completed mock evidence survives checkpoint but cannot be executed again',()=>scratch(file=>{
 const p=createProject();p.production_go=true;
 runMock(p,submit(p,request('SH03'),approval('SH03')));
 checkpoint(p,file);
 const restored=restore(file);
 assert.equal(restored.jobs[0].status,'COMPLETED');
 assert.equal(restored.jobs[0].result_evidence.not_rendered,true);
 assert.throws(()=>runMock(restored,restored.jobs[0]),/JOB_NOT_AUTHORIZED/);
}));
test('tampered or unsupported checkpoint is rejected',()=>scratch(file=>{
 const p=createProject();checkpoint(p,file);
 const envelope=JSON.parse(fs.readFileSync(file,'utf8'));
 envelope.payload.state.production_go=true;
 fs.writeFileSync(file,JSON.stringify(envelope));
 assert.throws(()=>restore(file),/INVALID_CHECKPOINT/);
 envelope.payload.version=2;
 fs.writeFileSync(file,JSON.stringify(envelope));
 assert.throws(()=>restore(file),/INVALID_CHECKPOINT/);
}));
test('checkpoint keeps zero budget and locked shot',()=>scratch(file=>{
 const p=createProject();checkpoint(p,file);
 const restored=restore(file);
 assert.equal(restored.budget_limit,0);
 assert.equal(restored.locked.SH01,'original-locked-asset');
 assert.equal(restored.production_go,false);
}));
