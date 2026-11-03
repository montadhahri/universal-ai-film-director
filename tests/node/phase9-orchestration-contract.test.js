'use strict';
// Phase 9: deterministic pipeline-contract acceptance. This is NOT a live agent execution.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const {newProject}=require('../../scripts/project-contracts.js');
const {proposeGate,approveGate}=require('../../scripts/director-authority.js');
const {nextPhase,recordTimeline,previewNextPhase}=require('../../scripts/production-pipeline.js');
const {saveCheckpointFile}=require('../../scripts/checkpoint-file.js');

const timeline={duration_ms:30000,shots:[
 {id:'SH01',revision:1,start_ms:0,end_ms:5000},
 {id:'SH02',revision:1,start_ms:5000,end_ms:11000},
 {id:'SH03',revision:1,start_ms:11000,end_ms:20000},
 {id:'SH04',revision:1,start_ms:20000,end_ms:26000},
 {id:'SH05',revision:1,start_ms:26000,end_ms:30000}
]};
function approveSynthetic(p,gate,index){
 const proposal_id='PH9-'+index;
 p=proposeGate(p,{expected_revision:p.revision,gate,version:'v1',artifact_ref:gate+'-fixture',proposal_id});
 return approveGate(p,{expected_revision:p.revision,proposal_id,evidence:{actor:'USER',source_ref:'synthetic-test-'+index,quote:'I approve this synthetic test proposal'}});
}
test('PH9-01: sequential planning gates, checkpoint handoff, and provider HOLD',t=>{
 let p=newProject('phase9-offline');
 p=nextPhase(p,{expected_revision:p.revision,to:'script'});
 assert.equal(previewNextPhase(p).allowed,false);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'visual_bible'}),/Missing approval/);
 p=approveSynthetic(p,'script',1);
 p=nextPhase(p,{expected_revision:p.revision,to:'visual_bible'});
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'storyboard'}),/Missing approval/);
 p=approveSynthetic(p,'visual_bible',2);
 p=nextPhase(p,{expected_revision:p.revision,to:'storyboard'});
 p=recordTimeline(p,{expected_revision:p.revision,timeline});
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'sound'}),/Missing approval/);
 p=approveSynthetic(p,'storyboard',3);
 p=nextPhase(p,{expected_revision:p.revision,to:'sound'});
 p=nextPhase(p,{expected_revision:p.revision,to:'generator'});
 assert.equal(previewNextPhase(p).allowed,false);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'generate'}),/HOLD/);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'phase9-pipeline-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const file=path.join(dir,'checkpoint.json');
 saveCheckpointFile(file,p);
 const script="const {loadCheckpointFile}=require('./scripts/checkpoint-file.js');process.stdout.write(JSON.stringify(loadCheckpointFile(process.argv[1])))";
 const recovered=JSON.parse(execFileSync(process.execPath,['-e',script,file],{cwd:path.resolve(__dirname,'../..'),encoding:'utf8'}));
 assert.deepEqual(recovered.project,p);
 assert.deepEqual(recovered.inspection.approval_integrity_issues,[]);
 assert.equal(recovered.project.shot_timeline.shots.length,5);
 assert.equal(recovered.project.shot_timeline.duration_ms,30000);
 assert.equal(recovered.approval_authenticated,false);
 assert.equal(recovered.asset_files_verified,false);
 assert.equal(recovered.project.authorization.production_go,false);
 assert.equal(recovered.project.authorization.provider_job_allowed,false);
 assert.equal(recovered.project.authorization.publication_allowed,false);
 assert.equal(recovered.inspection.provider_execution_performed,false);
});
test('PH9-02: stale transition cannot mutate an approved project',()=>{
 let p=newProject('phase9-stale');
 p=nextPhase(p,{expected_revision:p.revision,to:'script'});
 p=approveSynthetic(p,'script',1);
 const before=structuredClone(p);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision-1,to:'visual_bible'}),/Stale/);
 assert.deepEqual(p,before);
});
