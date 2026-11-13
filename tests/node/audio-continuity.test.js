'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {validateAudioTimeline,validateDependencyGraph,recordAudioTimeline,previewRepairImpact}=require('../../scripts/audio-continuity.js');
const picture={duration_ms:30000,shots:[
 {id:'S01',revision:1,start_ms:0,end_ms:10000},{id:'S02',revision:1,start_ms:10000,end_ms:20000},
 {id:'S03',revision:1,start_ms:20000,end_ms:30000}]};
const sound={duration_ms:30000,cues:[
 {id:'VO1',track:'narration',start_ms:0,end_ms:8000,status:'PLANNED'},
 {id:'M1',track:'music',start_ms:0,end_ms:18000,status:'PLANNED'},
 {id:'FX1',track:'sfx',start_ms:12000,end_ms:14000,status:'PLANNED'},
 {id:'VO2',track:'narration',start_ms:18000,end_ms:26000,status:'PLANNED'}],
 required_narration:[{start_ms:0,end_ms:8000},{start_ms:18000,end_ms:26000}],
 intentional_silence:[{start_ms:26000,end_ms:30000}]};
const graph={nodes:[
 {kind:'anchor',id:'CHAR1'},{kind:'shot',id:'S01'},{kind:'shot',id:'S02'},{kind:'shot',id:'S03'},
 {kind:'audio',id:'VO1'},{kind:'audio',id:'VO2'},{kind:'audio',id:'M1'}],
 edges:[{from:'anchor:CHAR1',to:'shot:S01'},{from:'anchor:CHAR1',to:'shot:S02'},
 {from:'shot:S02',to:'audio:VO2'}]};
const project=()=>{const p=newProject('film');p.phase='sound';p.shot_timeline=structuredClone(picture);
 for(const g of ['script','visual_bible','storyboard'])p.gates[g]={approved:true,version:'v1',evidence:'user-record'};
 p.shots=[{id:'S01',revision:1,state:'LOCKED',approved_asset:'asset:1',continuity_refs:[],issues:[]},
 {id:'S02',revision:1,state:'LOCKED',approved_asset:'asset:2',continuity_refs:[],issues:[]},
 {id:'S03',revision:1,state:'LOCKED',approved_asset:'asset:3',continuity_refs:[],issues:[]}];
 p.dependency_graph=structuredClone(graph);return p};
test('cross-track music/voice mixing allowed with intentional end silence and full required narration',()=>{
 const result=validateAudioTimeline(sound,picture);assert.equal(result.valid,true);
 assert.equal(result.cue_count,4);
});
test('same-track overlap rejected but cross-track overlap allowed',()=>{
 const x=structuredClone(sound);x.cues.push({id:'VO3',track:'narration',start_ms:7000,end_ms:9000,status:'PLANNED'});
 assert.throws(()=>validateAudioTimeline(x,picture),/Same-track overlap/);
});
test('required narration gaps, duplicate IDs and audio exceeding film are rejected',()=>{
 const a=structuredClone(sound);a.cues[3].start_ms=19000;
 assert.throws(()=>validateAudioTimeline(a,picture),/Narration gap/);
 const b=structuredClone(sound);b.cues[2].id='M1';
 assert.throws(()=>validateAudioTimeline(b,picture),/Duplicate audio/);
 const c=structuredClone(sound);c.cues[3].end_ms=30001;
 assert.throws(()=>validateAudioTimeline(c,picture),/Invalid audio cue/);
 const d=structuredClone(sound);d.duration_ms=31000;
 assert.throws(()=>validateAudioTimeline(d,picture),/duration mismatch/);
});
test('declared silence cannot coincide with any audio and coverage is never inferred from missing cues',()=>{
 const a=structuredClone(sound);a.cues.push({id:'M2',track:'music',start_ms:27000,end_ms:29000,status:'PLANNED'});
 assert.throws(()=>validateAudioTimeline(a,picture),/intentional silence/);
 const b=structuredClone(sound);b.required_narration=[{start_ms:0,end_ms:30000}];
 assert.throws(()=>validateAudioTimeline(b,picture),/Narration gap/);
});
test('dependency graph rejects dangling references, duplicates and cycles',()=>{
 assert.equal(validateDependencyGraph(graph).valid,true);
 const a=structuredClone(graph);a.edges.push({from:'shot:DOES_NOT_EXIST',to:'shot:S01'});
 assert.throws(()=>validateDependencyGraph(a),/Dangling/);
 const b=structuredClone(graph);b.edges.push({from:'audio:VO2',to:'anchor:CHAR1'});
 assert.throws(()=>validateDependencyGraph(b),/cycle/);
 const c=structuredClone(graph);c.nodes.push({kind:'shot',id:'S01'});
 assert.throws(()=>validateDependencyGraph(c),/Duplicate dependency node/);
});
test('audio-only repair preview cannot change locked picture or unrelated audio',()=>{
 const p=project();p.audio_timeline=structuredClone(sound);const before=structuredClone(p);
 const report=previewRepairImpact(p,{expected_revision:p.revision,target:'audio:VO2'});
 assert.deepEqual(report.affected,['audio:VO2']);assert.deepEqual(report.affected_locked_shots,[]);
 assert.equal(report.requires_scoped_unlock,false);assert.equal(report.status,'IMPACT_PREVIEW_ONLY');
 assert(report.unaffected.includes('shot:S02'));assert(report.unaffected.includes('audio:VO1'));
 assert.deepEqual(p,before);assert.deepEqual(report.changed_assets,[]);
});
test('character anchor change shows only downstream shots and cues with locked unlock requirement',()=>{
 const p=project();
 const r=previewRepairImpact(p,{expected_revision:p.revision,target:'anchor:CHAR1'});
 assert(r.affected.includes('shot:S01'));assert(r.affected.includes('shot:S02'));
 assert(r.affected.includes('audio:VO2'));assert(!r.affected.includes('shot:S03'));
 assert.deepEqual(r.affected_locked_shots,['shot:S01','shot:S02']);
 assert.equal(r.requires_scoped_unlock,true);
});
test('record audio plan requires approved storyboard and preserves input project immutably',()=>{
 const p=project(),before=structuredClone(p);
 const n=recordAudioTimeline(p,{expected_revision:p.revision,timeline:sound});
 assert.deepEqual(p,before);assert.deepEqual(n.audio_timeline,sound);
 assert.equal(n.revision,p.revision+1);assert.equal(n.authorization.provider_job_allowed,false);
 assert.throws(()=>recordAudioTimeline(n,{expected_revision:n.revision,timeline:sound}),/cannot be silently overwritten/);
});
test('recording fails for stale revision, missing approval and invalid timeline',()=>{
 const p=project();
 assert.throws(()=>recordAudioTimeline(p,{expected_revision:p.revision+1,timeline:sound}),/Stale/);
 p.gates.storyboard={approved:false};
 assert.throws(()=>recordAudioTimeline(p,{expected_revision:p.revision,timeline:sound}),/Storyboard approval/);
});
test('dependency preview rejects unknown target and stale project revision',()=>{
 const p=project();
 assert.throws(()=>previewRepairImpact(p,{expected_revision:p.revision,target:'audio:UNKNOWN'}),/Unknown/);
 assert.throws(()=>previewRepairImpact(p,{expected_revision:99,target:'audio:VO2'}),/Stale/);
});

test('legacy bare dependency edges resolve when unambiguous and reject ambiguous IDs',()=>{
 const legacy=structuredClone(graph);
 legacy.edges=[{from:'CHAR1',to:'S01'},{from:'S01',to:'VO1'}];
 assert.equal(validateDependencyGraph(legacy).valid,true);
 const p=project();p.dependency_graph=legacy;
 const report=previewRepairImpact(p,{expected_revision:p.revision,target:'anchor:CHAR1'});
 assert(report.affected.includes('audio:VO1'));
 const ambiguous=structuredClone(legacy);
 ambiguous.nodes.push({kind:'audio',id:'S01'});
 assert.throws(()=>validateDependencyGraph(ambiguous),/Ambiguous dependency reference/);
});
