'use strict';
// V2.3 deterministic, text-only beginner journey. Not a live-agent test.
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {proposeGate,approveGate,inspectCheckpoint,restoreCheckpoint}=require('../../scripts/director-authority.js');
const {nextPhase,recordTimeline,previewNextPhase,validatePipeline}=require('../../scripts/production-pipeline.js');
const {recordAudioTimeline,validateAudioTimeline}=require('../../scripts/audio-continuity.js');

const evidence=(gate)=>({actor:'USER',source_ref:'synthetic:v23:'+gate,quote:'I approve '+gate+' V1'});
const propose=(p,gate)=>proposeGate(p,{expected_revision:p.revision,gate,version:gate.toUpperCase()+'-V1',
 artifact_ref:'synthetic:'+gate+':v1',proposal_id:'proposal-'+gate});
const approve=(p,gate)=>approveGate(p,{expected_revision:p.revision,proposal_id:'proposal-'+gate,evidence:evidence(gate)});
const picture={duration_ms:30000,shots:[
 {id:'SH01',revision:1,start_ms:0,end_ms:6000},
 {id:'SH02',revision:1,start_ms:6000,end_ms:14000},
 {id:'SH03',revision:1,start_ms:14000,end_ms:23000},
 {id:'SH04',revision:1,start_ms:23000,end_ms:30000}
]};
const sound={duration_ms:30000,cues:[
 {id:'MUSIC-01',track:'music',start_ms:0,end_ms:30000,status:'PLANNED'},
 {id:'NARR-01',track:'narration',start_ms:0,end_ms:14000,status:'PLANNED'},
 {id:'NARR-02',track:'narration',start_ms:14000,end_ms:30000,status:'PLANNED'}
],required_narration:[{start_ms:0,end_ms:30000}],intentional_silence:[]};

test('complete fictional first-film planning journey preserves three approvals and stops before media execution',()=>{
 let p=newProject('fictional-glowing-seed');
 const initial=structuredClone(p);
 assert.equal(p.phase,'discovery');
 p=nextPhase(p,{expected_revision:p.revision,to:'script'});
 p=propose(p,'script');
 assert.equal(previewNextPhase(p).allowed,false);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'visual_bible'}),/Missing approval/);
 p=approve(p,'script');
 assert.equal(p.gates.visual_bible.approved,false);
 p=nextPhase(p,{expected_revision:p.revision,to:'visual_bible'});
 p=propose(p,'visual_bible');
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'storyboard'}),/Missing approval/);
 p=approve(p,'visual_bible');
 p=nextPhase(p,{expected_revision:p.revision,to:'storyboard'});
 p=propose(p,'storyboard');
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'sound'}),/Missing approval/);
 p=recordTimeline(p,{expected_revision:p.revision,timeline:picture});
 p=approve(p,'storyboard');
 p=nextPhase(p,{expected_revision:p.revision,to:'sound'});
 assert.deepEqual(validateAudioTimeline(sound,p.shot_timeline).valid,true);
 p=recordAudioTimeline(p,{expected_revision:p.revision,timeline:sound});
 assert.equal(p.audio_timeline.cues.every(x=>x.status==='PLANNED'),true);
 assert.equal(p.approval_ledger.length,3);
 assert.deepEqual(p.approval_ledger.map(x=>x.gate),['script','visual_bible','storyboard']);
 assert.deepEqual(p.approval_ledger.map(x=>x.evidence.source_ref),['synthetic:v23:script','synthetic:v23:visual_bible','synthetic:v23:storyboard']);
 assert.equal(validatePipeline(p),true);
 const snapshot=JSON.stringify(p);
 const restored=restoreCheckpoint(snapshot);
 assert.deepEqual(restored,p);
 assert.deepEqual(initial,newProject('fictional-glowing-seed'));
 const report=inspectCheckpoint(restored);
 assert.deepEqual(report.approval_integrity_issues,[]);
 assert.equal(report.pending.length,0);
 assert.equal(report.media_inspected,false);
 assert.equal(report.provider_execution_performed,false);
 assert.equal(report.persisted,false);
 p=nextPhase(restored,{expected_revision:restored.revision,to:'generator'});
 assert.equal(previewNextPhase(p).allowed,false);
 assert.match(previewNextPhase(p).reasons.join(' '),/HOLD/);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'generate'}),/HOLD/);
 for(const flag of ['production_go','provider_job_allowed','publication_allowed'])assert.equal(p.authorization[flag],false);
 assert.equal(p.shots.length,0,'A text-only storyboard is not rendered media');
});

test('beginner journey rejects incorrect approvals and invalid picture/audio plans without mutation',()=>{
 let p=nextPhase(newProject('negative-path'),{expected_revision:1,to:'script'});
 p=propose(p,'script');
 const before=structuredClone(p);
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'proposal-script',evidence:{actor:'USER',source_ref:'synthetic',quote:'looks good'}}),/Ambiguous/);
 assert.deepEqual(p,before);
 p=approve(p,'script');
 p=nextPhase(p,{expected_revision:p.revision,to:'visual_bible'});
 p=propose(p,'visual_bible');
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'proposal-visual_bible',evidence:{actor:'ASSISTANT',source_ref:'synthetic',quote:'I approve'}}),/USER/);
 p=approve(p,'visual_bible');
 p=nextPhase(p,{expected_revision:p.revision,to:'storyboard'});
 const bad=structuredClone(picture);bad.shots[2].start_ms+=1;
 assert.throws(()=>recordTimeline(p,{expected_revision:p.revision,timeline:bad}),/gap/);
 assert.equal(p.shot_timeline,undefined);
 p=recordTimeline(p,{expected_revision:p.revision,timeline:picture});
 p=propose(p,'storyboard');p=approve(p,'storyboard');
 p=nextPhase(p,{expected_revision:p.revision,to:'sound'});
 const badAudio=structuredClone(sound);badAudio.cues[2].start_ms=14001;
 assert.throws(()=>recordAudioTimeline(p,{expected_revision:p.revision,timeline:badAudio}),/Narration gap/);
 assert.equal(p.audio_timeline,undefined);
});
