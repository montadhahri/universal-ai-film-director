'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {assessVisualContinuity}=require('../../scripts/visual-continuity-assessment.js');
function project(){
 const p=newProject('visual-review');
 p.shots=[{id:'SH02',revision:1,state:'DRAFT',continuity_refs:['anchor:CHILD-01@1'],issues:[]}];
 p.memory_anchors=[{id:'CHILD-01',kind:'character',revision:1,status:'PROPOSED',
 description:'Blue coat',provenance:{kind:'DOCUMENTED',reference:'bible'},shot_refs:['SH02']}];
 return p;
}
const observation={shot_id:'SH02',anchor_id:'CHILD-01',anchor_revision:1,criterion:'wardrobe',
 outcome:'MISMATCH',source_asset:'images/SH02.png',source_sha256:'a'.repeat(64),
 reviewer:'human-reviewer',review_ref:'review/SH02-wardrobe-1',notes:'Coat appears red'};
test('attributable mismatch is a proposal candidate, never an executed repair',()=>{
 const p=project(),before=JSON.stringify(p),r=assessVisualContinuity(p,[observation]);
 assert.equal(r.status,'MISMATCH_REPORTED');assert.equal(r.findings[0].repair_candidate,true);
 assert.equal(r.findings[0].evidence_class,'REVIEWER_REPORTED');
 for(const k of ['actual_image_pixels_inspected_by_tool','source_hashes_verified_by_tool','approval_authenticated','repair_performed','production_authorized'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(p),before);
});
test('rejects unsupported PASS claims without asset hash and reviewer evidence',()=>{
 assert.throws(()=>assessVisualContinuity(project(),[{...observation,outcome:'MATCH',source_sha256:undefined}]),/requires attributable/);
 assert.throws(()=>assessVisualContinuity(project(),[{...observation,reviewer:''}]),/requires attributable/);
});
test('NOT_RUN remains explicitly uninspected',()=>{
 const {source_asset,source_sha256,reviewer,review_ref,...missing}=observation;
 const r=assessVisualContinuity(project(),[{...missing,outcome:'NOT_RUN'}]);
 assert.equal(r.status,'INCOMPLETE');assert.equal(r.findings[0].evidence_class,'NOT_INSPECTED');
 assert.throws(()=>assessVisualContinuity(project(),[{...observation,outcome:'NOT_RUN'}]),/NOT_RUN/);
});
test('rejects unknown shots, missing anchors and duplicate observations',()=>{
 assert.throws(()=>assessVisualContinuity(project(),[{...observation,shot_id:'SH99'}]),/Invalid visual/);
 assert.throws(()=>assessVisualContinuity(project(),[{...observation,anchor_revision:9}]),/Unknown visual anchor/);
 assert.throws(()=>assessVisualContinuity(project(),[observation,observation]),/Duplicate visual/);
});
test('legacy project and no observations do not claim visual PASS',()=>{
 const r=assessVisualContinuity(newProject('legacy'));
 assert.equal(r.status,'INCOMPLETE');assert.deepEqual(r.findings,[]);
});
test('reviewer MATCH is labeled reported, not automatically verified',()=>{
 const r=assessVisualContinuity(project(),[{...observation,outcome:'MATCH'}]);
 assert.equal(r.status,'REVIEWER_MATCHES_REPORTED');
 assert.equal(r.actual_image_pixels_inspected_by_tool,false);
});
