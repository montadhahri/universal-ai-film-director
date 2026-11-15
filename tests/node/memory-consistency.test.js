'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {inspectMemoryConsistency}=require('../../scripts/memory-consistency.js');
const evidence={actor:'USER',source_ref:'fixture-user',quote:'Approved'};
function fixture(){
 const p=newProject('consistency');
 p.shots.push({id:'SH01',revision:1,state:'DRAFT',continuity_refs:['anchor:CHILD-01@1'],issues:[]});
 p.memory_anchors=[{id:'CHILD-01',kind:'character',revision:1,status:'APPROVED',description:'Blue coat',
  provenance:{kind:'USER_SUPPLIED',reference:'visual-bible'},shot_refs:['SH01'],approved_evidence:evidence}];
 return p;
}
test('matching versioned reference produces read-only no-issues report',()=>{
 const p=fixture(),before=JSON.stringify(p),r=inspectMemoryConsistency(p);
 assert.equal(r.status,'NO_ISSUES_DETECTED');assert.deepEqual(r.issues,[]);
 assert.equal(JSON.stringify(p),before);
 for(const flag of ['media_inspected','asset_files_verified','approval_authenticated','repair_performed','production_authorized'])assert.equal(r[flag],false);
});
test('stale references and changed approved variants are reported, not repaired',()=>{
 const p=fixture();p.memory_anchors.push({...p.memory_anchors[0],revision:2,description:'Red coat'});
 const r=inspectMemoryConsistency(p);
 assert.ok(r.issues.some(x=>x.code==='STALE_ANCHOR_REVISION'&&x.latest_revision===2));
 assert.ok(r.issues.some(x=>x.code==='APPROVED_ANCHOR_VARIANTS'));
 assert.equal(p.shots[0].continuity_refs[0],'anchor:CHILD-01@1');
});
test('missing revision, malformed explicit ref and missing reciprocal link',()=>{
 const p=fixture();p.shots[0].continuity_refs=['anchor:CHILD-01@9','anchor:broken','anchor:CHILD-01@1'];
 p.memory_anchors[0].shot_refs=[];
 const r=inspectMemoryConsistency(p);
 for(const code of ['MISSING_ANCHOR_REVISION','MALFORMED_ANCHOR_REF','MISSING_RECIPROCAL_SHOT_LINK'])
  assert.ok(r.issues.some(x=>x.code===code),code);
});
test('conflicting anchor kinds and legacy unversioned refs',()=>{
 const p=fixture();p.memory_anchors.push({...p.memory_anchors[0],kind:'prop',revision:2});
 p.shots[0].continuity_refs.push('CHILD-01');
 const r=inspectMemoryConsistency(p);
 assert.ok(r.issues.some(x=>x.code==='ANCHOR_KIND_CONFLICT'));
 assert.ok(!r.issues.some(x=>x.reference==='CHILD-01'));
});
test('old projects without memory anchors are accepted without false claims',()=>{
 const p=newProject('legacy');const r=inspectMemoryConsistency(p);
 assert.equal(r.status,'NO_ISSUES_DETECTED');assert.equal(r.anchor_count,0);
});
