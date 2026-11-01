'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {validateTimeline,validatePipeline,recordTimeline,nextPhase,previewNextPhase}=require('../../scripts/production-pipeline.js');
const timeline={duration_ms:30000,shots:[
 {id:'S01',revision:1,start_ms:0,end_ms:5000},
 {id:'S02',revision:1,start_ms:5000,end_ms:12000},
 {id:'S03',revision:1,start_ms:12000,end_ms:18000},
 {id:'S04',revision:1,start_ms:18000,end_ms:25000},
 {id:'S05',revision:1,start_ms:25000,end_ms:30000}]};
const approved=p=>{p.gates.script={approved:true,version:'SCRIPT-V1',evidence:'user-message-1'};
 p.gates.visual_bible={approved:true,version:'VISUAL-V1',evidence:'user-message-2'};
 p.gates.storyboard={approved:true,version:'BOARD-V1',evidence:'user-message-3'};return p;};
test('30-second five-shot cut-only timeline is exact',()=>{
 assert.deepEqual(validateTimeline(timeline),{valid:true,duration_ms:30000,shot_count:5,transition_mode:'CUTS_ONLY'});
});
test('gaps, overlaps, overflow, missing final segment and invalid durations fail',()=>{
 for(const [change,expected] of [
 [t=>t.shots[2].start_ms=12001,/gap/],
 [t=>t.shots[2].start_ms=11999,/overlap/],
 [t=>t.shots[4].end_ms=30001,/past film duration/],
 [t=>t.shots[4].end_ms=29999,/does not cover/],
 [t=>t.shots[0].end_ms=0,/Invalid timed shot/],
 [t=>t.shots[4].id='S01',/Duplicate/]
 ]){const t=structuredClone(timeline);change(t);assert.throws(()=>validateTimeline(t),expected);}
});
test('unapproved screenplay blocks look; no phase can skip forward',()=>{
 const p=newProject('film');
 const s=nextPhase(p,{expected_revision:1,to:'script'});
 assert.equal(s.phase,'script');assert.equal(p.phase,'discovery');
 assert.throws(()=>nextPhase(s,{expected_revision:s.revision,to:'visual_bible'}),/Missing approval/);
 assert.throws(()=>nextPhase(s,{expected_revision:s.revision,to:'sound'}),/single-step/);
 assert.equal(previewNextPhase(s).allowed,false);
});
test('explicit approvals unlock planning stages but not provider operations',()=>{
 let p=newProject('film');
 p=nextPhase(p,{expected_revision:p.revision,to:'script'});
 p.gates.script={approved:true,version:'SCRIPT-V1',evidence:'user-msg-1'};
 p=nextPhase(p,{expected_revision:p.revision,to:'visual_bible'});
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'storyboard'}),/Missing approval/);
 p.gates.visual_bible={approved:true,version:'VISUAL-V1',evidence:'user-msg-2'};
 p=nextPhase(p,{expected_revision:p.revision,to:'storyboard'});
 const before=structuredClone(p);
 p=recordTimeline(p,{expected_revision:p.revision,timeline});
 assert.deepEqual(before.shot_timeline,undefined);
 p.gates.storyboard={approved:true,version:'BOARD-V1',evidence:'user-msg-3'};
 p=nextPhase(p,{expected_revision:p.revision,to:'sound'});
 p=nextPhase(p,{expected_revision:p.revision,to:'generator'});
 assert.equal(p.phase,'generator');assert.equal(previewNextPhase(p).allowed,false);
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'generate'}),/HOLD/);
 assert.equal(p.authorization.production_go,false);
});
test('cannot move to sound without fully reconciled shot timeline',()=>{
 const p=approved(newProject('film'));p.phase='storyboard';
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'sound'}),/timeline/);
 p.shot_timeline={duration_ms:30000,shots:[{id:'SH1',revision:1,start_ms:0,end_ms:10000}]};
 assert.throws(()=>nextPhase(p,{expected_revision:p.revision,to:'sound'}),/does not cover/);
});
test('recording a timeline requires correct phase, revision and unlocked storyboard',()=>{
 const p=approved(newProject('film'));p.phase='storyboard';
 assert.throws(()=>recordTimeline(p,{expected_revision:p.revision,timeline}),/before user approval/);
 p.gates.storyboard={approved:false};
 assert.throws(()=>recordTimeline(p,{expected_revision:99,timeline}),/Stale/);
 const n=recordTimeline(p,{expected_revision:p.revision,timeline});
 assert.equal(n.revision,p.revision+1);assert.equal(p.shot_timeline,undefined);
 n.shot_timeline.shots[0].end_ms=1;assert.equal(timeline.shots[0].end_ms,5000);
});
test('fabricated advanced phase with missing approvals is rejected on recovery',()=>{
 const p=newProject('film');p.phase='delivery';
 assert.throws(()=>validatePipeline(p),/requires approved/);
 const ready=approved(newProject('film'));ready.phase='delivery';ready.shot_timeline=timeline;
 assert.throws(()=>validatePipeline(ready),/not supported/);
});
test('stale phase transitions rejected without mutation',()=>{
 const p=newProject('film'),copy=structuredClone(p);
 assert.throws(()=>nextPhase(p,{expected_revision:99,to:'script'}),/Stale/);
 assert.deepEqual(p,copy);
});
