'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {proposeGate,approveGate,proposeLockedShotRevision,recordPermission,inspectCheckpoint,restoreCheckpoint}=require('../../scripts/director-authority.js');
const user=(quote,source_ref='conversation:test:1')=>({actor:'USER',source_ref,quote});
const script=p=>proposeGate(p,{expected_revision:p.revision,gate:'script',version:'SCRIPT-V1',artifact_ref:'draft-script-1',proposal_id:'gate-1'});
test('only exact pending screenplay proposal can be explicitly approved',()=>{
 const p=script(newProject('demo')),prior=structuredClone(p);
 const n=approveGate(p,{expected_revision:p.revision,proposal_id:'gate-1',evidence:user('I approve the screenplay')});
 assert.equal(n.gates.script.approved,true);assert.equal(n.gates.script.version,'SCRIPT-V1');
 assert.equal(n.gates.visual_bible.approved,false);assert.equal(n.gates.storyboard.approved,false);
 assert.deepEqual(p,prior);assert.equal(n.approval_ledger.length,1);
});
test('approval rejects no proposal, stale revision, missing user provenance and ambiguous reply',()=>{
 const p=script(newProject('demo'));
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'missing',evidence:user('I approve')}),/No exact/);
 assert.throws(()=>approveGate(p,{expected_revision:1,proposal_id:'gate-1',evidence:user('I approve')}),/Stale/);
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'gate-1',evidence:{actor:'ASSISTANT',source_ref:'assistant:x',quote:'I approve'}}),/USER/);
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'gate-1',evidence:user('looks good')}),/Ambiguous/);
});
test('bare yes is refused when unrelated pending gates make it ambiguous',()=>{
 let p=script(newProject('demo'));
 p=proposeGate(p,{expected_revision:p.revision,gate:'visual_bible',version:'VISUAL-V1',artifact_ref:'visual-1',proposal_id:'gate-2'});
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'gate-1',evidence:user('yes')}),/Ambiguous yes/);
});
test('Visual Bible cannot be approved before screenplay',()=>{
 let p=newProject('demo');
 p=proposeGate(p,{expected_revision:p.revision,gate:'visual_bible',version:'V1',artifact_ref:'visual-1',proposal_id:'visual-1'});
 assert.throws(()=>approveGate(p,{expected_revision:p.revision,proposal_id:'visual-1',evidence:user('I approve the Visual Bible')}),/Earlier/);
});
test('locked source shot remains identical while scoped repair becomes proposed revision',()=>{
 const p=newProject('demo');p.shots.push({id:'S01_SH08',revision:4,state:'LOCKED',approved_asset:'asset://already-approved',continuity_refs:[],issues:[]});
 const original=structuredClone(p.shots[0]);
 const next=proposeLockedShotRevision(p,{expected_revision:p.revision,shot_id:'S01_SH08',source_revision:4,new_revision:5,authorization_ref:'unl-5',evidence:user('I allow repair of S01_SH08 only'),reason:'transition defect'});
 assert.deepEqual(next.shots[0],original);assert.deepEqual(p.shots[0],original);
 assert.equal(next.shots[1].state,'PROPOSED');assert.equal(next.shots[1].parent_revision,4);
 assert.equal(next.shots[1].approved_asset,undefined);
});
test('locked shot cannot be bulk-unlocked, overwritten or revised without scoped user evidence',()=>{
 const p=newProject('demo');p.shots.push({id:'S01_SH08',revision:4,state:'LOCKED',approved_asset:'asset://approved',continuity_refs:[],issues:[]});
 const opts={expected_revision:p.revision,shot_id:'S01_SH08',source_revision:4,new_revision:5,authorization_ref:'unlock-1',reason:'defect',evidence:user('Change all shots')};
 assert.throws(()=>proposeLockedShotRevision(p,opts),/identify affected shot/);
 assert.throws(()=>proposeLockedShotRevision(p,{...opts,evidence:user('I approve something else')}),/identify affected shot/);
 assert.throws(()=>proposeLockedShotRevision(p,{...opts,new_revision:4,evidence:user('I allow repair of S01_SH08')}),/Invalid scoped/);
});
test('specific generation and publication intent is recorded separately without invoking or granting execution',()=>{
 const p=newProject('demo');
 const n=recordPermission(p,{expected_revision:p.revision,permission:'provider_job',scope:'S01_SH01 only',grant_id:'job-grant-1',evidence:user('I authorize video generation of S01_SH01 only')});
 assert.equal(n.permission_ledger[0].permission,'provider_job');
 assert.equal(n.authorization.provider_job_allowed,false);
 assert.equal(n.authorization.production_go,false);
 assert.equal(n.authorization.publication_allowed,false);
 assert.deepEqual(p.permission_ledger,[]);
 assert.throws(()=>recordPermission(p,{expected_revision:p.revision,permission:'provider_job',scope:'shot',grant_id:'x',evidence:user('maybe later')}),/Explicit permission/);
});
test('checkpoint roundtrip preserves exact approved/locked revisions and never claims media inspected or persisted',()=>{
 const p=newProject('demo');p.shots.push({id:'SH01',revision:1,state:'LOCKED',approved_asset:'asset://fake-fixture',continuity_refs:[],issues:[]});
 const restored=restoreCheckpoint(JSON.stringify(p));assert.deepEqual(restored,p);
 const report=inspectCheckpoint(restored);assert.equal(report.locked[0].asset_ref,'asset://fake-fixture');
 assert.equal(report.media_inspected,false);assert.equal(report.persisted,false);assert.equal(report.provider_execution_performed,false);
 assert.throws(()=>restoreCheckpoint('}{'),/Invalid checkpoint/);
 assert.throws(()=>restoreCheckpoint(JSON.stringify({...p,gates:{...p.gates,script:{approved:true}}})),/evidence/);
});

test('an already approved gate cannot be silently replaced by another proposal',()=>{
 let p=script(newProject('demo'));
 p=approveGate(p,{expected_revision:p.revision,proposal_id:'gate-1',evidence:user('I approve screenplay V1')});
 assert.throws(()=>proposeGate(p,{expected_revision:p.revision,gate:'script',version:'SCRIPT-V2',artifact_ref:'replacement',proposal_id:'gate-3'}),/Previously approved gate/);
});
test('Project Bible schema does not silently permit setting operational flags to true',()=>{
 const schema=require('../../contracts/project-bible.schema.json');
 for(const k of ['production_go','provider_job_allowed','publication_allowed'])
  assert.equal(schema.properties.authorization.properties[k].const,false,k);
});

test('checkpoint exposes scoped revision and adjacent dependencies without changing locked source',()=>{
 let p=newProject('impact');
 p.shots.push({id:'SH08',revision:2,state:'LOCKED',approved_asset:'asset://shot8',continuity_refs:[],issues:[]});
 p.dependency_graph={nodes:[{kind:'shot',id:'SH08'},{kind:'audio',id:'CUE08'},{kind:'anchor',id:'CHAR01'}],
 edges:[{from:'SH08',to:'CUE08'},{from:'CHAR01',to:'SH08'}]};
 const source=structuredClone(p.shots[0]);
 p=proposeLockedShotRevision(p,{expected_revision:p.revision,shot_id:'SH08',source_revision:2,new_revision:3,
 authorization_ref:'unlock-8',evidence:user('I allow repair of SH08 only'),reason:'transition mismatch'});
 const snapshot=JSON.stringify(p);
 const result=inspectCheckpoint(restoreCheckpoint(snapshot));
 assert.deepEqual(result.pending_shot_revisions,[{shot_id:'SH08',proposed_revision:3,source_revision:2,
 source_locked:true,source_asset_ref:'asset://shot8',related_node_ids:['anchor:CHAR01','audio:CUE08'],requires_review:true}]);
 assert.deepEqual(p.shots[0],source);
 assert.match(result.issues.join(' '),/Pending scoped shot revisions/);
 assert.equal(JSON.stringify(p),snapshot);
 assert.equal(p.authorization.provider_job_allowed,false);
});
test('pending revision is not presented as approved when source lock is missing',()=>{
 const p=newProject('orphan');
 p.shots.push({id:'SH01',revision:2,parent_revision:1,state:'PROPOSED',continuity_refs:[],issues:['repair']});
 const report=inspectCheckpoint(p);
 assert.equal(report.pending_shot_revisions[0].source_locked,false);
 assert.equal(report.pending_shot_revisions[0].source_asset_ref,null);
});
