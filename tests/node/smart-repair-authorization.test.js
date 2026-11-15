'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {prepareScopedRepair,reviewRepairEvidence}=require('../../scripts/smart-repair.js');
function fixture(){
 const p=newProject('repair-scope');
 p.shots=[
  {id:'SH01',revision:1,state:'LOCKED',approved_asset:'before.png',continuity_refs:['anchor:CHILD@1'],issues:[]},
  {id:'SH02',revision:1,state:'LOCKED',approved_asset:'other.png',continuity_refs:[],issues:[]}];
 p.memory_anchors=[{id:'CHILD',kind:'character',revision:1,status:'PROPOSED',
  description:'Blue coat',provenance:{kind:'DOCUMENTED',reference:'bible'},shot_refs:['SH01']}];
 p.dependency_graph={nodes:[{kind:'shot',id:'SH01'},{kind:'shot',id:'SH02'}],edges:[]};
 return p;
}
const obs={shot_id:'SH01',anchor_id:'CHILD',anchor_revision:1,criterion:'wardrobe',
 outcome:'MISMATCH',source_asset:'before.png',source_sha256:'a'.repeat(64),
 reviewer:'reviewer',review_ref:'review-1'};
const opts={shot_id:'SH01',source_revision:1,new_revision:2,reason:'Repair wardrobe continuity',
 authorization_ref:'user-msg-1',evidence:{actor:'USER',source_ref:'user-msg-1',quote:'I authorize repair of SH01'}};
function prepared(){const p=fixture();return prepareScopedRepair(p,{expected_revision:p.revision,observations:[obs],...opts});}
test('scoped authorization creates only a new PROPOSED revision and preserves LOCKED original',()=>{
 const p=fixture(),before=JSON.stringify(p),r=prepareScopedRepair(p,{expected_revision:p.revision,observations:[obs],...opts});
 assert.equal(JSON.stringify(p),before);
 assert.equal(r.project.shots.find(s=>s.id==='SH01'&&s.revision===1).approved_asset,'before.png');
 assert.equal(r.project.shots.find(s=>s.id==='SH01'&&s.revision===1).state,'LOCKED');
 assert.equal(r.project.shots.find(s=>s.id==='SH01'&&s.revision===2).state,'PROPOSED');
 assert.equal(r.repair_executed,false);assert.equal(r.authorization_authenticated,false);
});
test('ambiguous, missing, unrelated or stale authorization cannot propose repair',()=>{
 const p=fixture();
 assert.throws(()=>prepareScopedRepair(p,{expected_revision:2,observations:[obs],...opts}),/Stale/);
 assert.throws(()=>prepareScopedRepair(p,{expected_revision:1,observations:[obs],...opts,shot_id:'SH02'}),/within reported impact/);
 assert.throws(()=>prepareScopedRepair(p,{expected_revision:1,observations:[obs],...opts,evidence:{actor:'USER',source_ref:'x',quote:'yes'}}),/explicitly identify/);
 assert.throws(()=>prepareScopedRepair(p,{expected_revision:1,...opts}),/not actionable/);
});
test('review requires attributable before and after evidence linked to exact proposal',()=>{
 const p=prepared().project;
 const r=reviewRepairEvidence(p,{shot_id:'SH01',source_revision:1,new_revision:2,
  before:{asset_ref:'before.png',sha256:'a'.repeat(64)},after:{asset_ref:'after.png',sha256:'b'.repeat(64)},
  reviewer:'reviewer',review_ref:'review-2',outcome:'MATCH'});
 assert.equal(r.status,'REVIEWER_REPORTED_REPAIR_MATCH');
 assert.equal(r.actual_bytes_verified,false);assert.equal(r.image_pixels_inspected,false);
 assert.equal(r.auto_approved,false);assert.equal(r.repair_executed,false);
 assert.equal(p.shots.find(s=>s.id==='SH01'&&s.revision===2).state,'PROPOSED');
});
test('rejects false repair completion, identical evidence and missing scoped authorization',()=>{
 const p=prepared().project;
 const base={shot_id:'SH01',source_revision:1,new_revision:2,
  before:{asset_ref:'before.png',sha256:'a'.repeat(64)},after:{asset_ref:'after.png',sha256:'b'.repeat(64)},
  reviewer:'reviewer',review_ref:'review-2',outcome:'MATCH'};
 assert.throws(()=>reviewRepairEvidence(p,{...base,after:{asset_ref:'before.png',sha256:'a'.repeat(64)}}),/No distinct after/);
 assert.throws(()=>reviewRepairEvidence(p,{...base,after:{asset_ref:'after.png',sha256:'bogus'}}),/Attributable/);
 assert.throws(()=>reviewRepairEvidence(p,{...base,before:{asset_ref:'unrelated.png',sha256:'a'.repeat(64)}}),/Before asset/);
 assert.throws(()=>reviewRepairEvidence(fixture(),base),/No scoped authorized/);
});
test('reviewer mismatch remains unresolved; no automatic PASS',()=>{
 const p=prepared().project;
 const r=reviewRepairEvidence(p,{shot_id:'SH01',source_revision:1,new_revision:2,
  before:{asset_ref:'before.png',sha256:'a'.repeat(64)},after:{asset_ref:'after.png',sha256:'b'.repeat(64)},
  reviewer:'reviewer',review_ref:'review-2',outcome:'MISMATCH'});
 assert.equal(r.status,'REVIEWER_REPORTED_REPAIR_MISMATCH');
 assert.equal(r.production_authorized,false);
});
