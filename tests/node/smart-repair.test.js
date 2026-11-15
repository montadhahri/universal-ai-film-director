'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {planSmartRepair}=require('../../scripts/smart-repair.js');
const ev={actor:'USER',source_ref:'fixture-approval',quote:'I approve'};
function project(){
 const p=newProject('repair-v24');
 p.shots=[
  {id:'SH01',revision:1,state:'LOCKED',approved_asset:'media/SH01.png',continuity_refs:['anchor:CHILD-01@1'],issues:[]},
  {id:'SH02',revision:1,state:'DRAFT',continuity_refs:['anchor:CHILD-01@2'],issues:[]},
  {id:'SH03',revision:1,state:'LOCKED',approved_asset:'media/SH03.png',continuity_refs:[],issues:[]}];
 p.memory_anchors=[
  {id:'CHILD-01',kind:'character',revision:1,status:'APPROVED',description:'Blue coat',
   provenance:{kind:'DOCUMENTED',reference:'bible'},shot_refs:['SH01'],approved_evidence:ev},
  {id:'CHILD-01',kind:'character',revision:2,status:'APPROVED',description:'Red coat',
   provenance:{kind:'DOCUMENTED',reference:'bible-v2'},shot_refs:['SH02'],approved_evidence:ev}];
 p.dependency_graph={nodes:[{kind:'anchor',id:'CHILD-01'},{kind:'shot',id:'SH01'},
  {kind:'shot',id:'SH02'},{kind:'shot',id:'SH03'}],
  edges:[{from:'anchor:CHILD-01',to:'shot:SH01'},{from:'shot:SH01',to:'shot:SH02'}]};
 return p;
}
const observation={shot_id:'SH02',anchor_id:'CHILD-01',anchor_revision:2,criterion:'wardrobe',
 outcome:'MISMATCH',source_asset:'images/SH02.png',source_sha256:'a'.repeat(64),
 reviewer:'reviewer-1',review_ref:'inspection-1',notes:'Wrong coat'};
test('memory conflict and visual mismatch yield union of dependency-closure candidates',()=>{
 const p=project(),before=JSON.stringify(p);
 const r=planSmartRepair(p,{expected_revision:p.revision,observations:[observation]});
 assert.equal(r.status,'REPAIR_PROPOSAL_ONLY');
 assert.deepEqual(r.affected_candidates,['anchor:CHILD-01','shot:SH01','shot:SH02']);
 assert.deepEqual(r.unaffected_candidates,['shot:SH03']);
 assert.deepEqual(r.affected_locked_shots,['shot:SH01']);
 assert.equal(r.requires_scoped_unlock,true);
 assert.equal(r.graph_completeness_verified,false);
 for(const k of ['visual_pixels_inspected','source_hashes_verified','user_authorization_verified','repair_performed','production_authorized'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(p),before);
 assert.equal(p.shots[0].approved_asset,'media/SH01.png');
});
test('missing graph blocks repair scoping rather than guessing',()=>{
 const p=project();delete p.dependency_graph;
 const r=planSmartRepair(p,{expected_revision:p.revision,observations:[observation]});
 assert.equal(r.status,'BLOCKED');assert.ok(r.blockers.includes('DEPENDENCY_GRAPH_MISSING'));
 assert.deepEqual(r.affected_candidates,[]);assert.deepEqual(r.unaffected_candidates,[]);
});
test('missing target in graph blocks whole impact plan',()=>{
 const p=project();p.dependency_graph.nodes=p.dependency_graph.nodes.filter(n=>n.id!=='CHILD-01');
 p.dependency_graph.edges=[];
 const r=planSmartRepair(p,{expected_revision:p.revision,observations:[observation]});
 assert.equal(r.status,'BLOCKED');assert.ok(r.blockers.some(x=>x.startsWith('TARGET_NOT_IN_DEPENDENCY_GRAPH:anchor:CHILD-01')));
 assert.deepEqual(r.impact_previews,[]);
});
test('invalid graph and stale project revision fail safely',()=>{
 const p=project();
 assert.throws(()=>planSmartRepair(p,{expected_revision:p.revision+1}),/Stale project revision/);
 p.dependency_graph.edges.push({from:'shot:SH03',to:'MISSING'});
 const r=planSmartRepair(p,{expected_revision:p.revision});
 assert.equal(r.status,'BLOCKED');assert.ok(r.blockers.includes('DEPENDENCY_GRAPH_INVALID'));
});
test('no findings is not proof of visual continuity',()=>{
 const p=newProject('empty');p.dependency_graph={nodes:[],edges:[]};
 const r=planSmartRepair(p,{expected_revision:p.revision});
 assert.equal(r.status,'NO_REPORTED_DEFECTS');
 assert.equal(r.graph_completeness_verified,false);
 assert.equal(r.visual_pixels_inspected,false);
});
test('reviewer-reported mismatch never becomes an approved repair',()=>{
 const p=project();p.memory_anchors=[p.memory_anchors[1]];p.shots[0].continuity_refs=[];
 const r=planSmartRepair(p,{expected_revision:p.revision,observations:[observation]});
 assert.ok(r.defects.some(d=>d.source==='VISUAL'&&d.evidence_status==='REVIEWER_REPORTED_UNVERIFIED'));
 assert.equal(r.repair_performed,false);
});
