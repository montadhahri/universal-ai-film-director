'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {inspectCheckpoint,restoreCheckpoint,proposeGate,approveGate}=require('../../scripts/director-authority.js');
function fullyApproved(p){
 for(const [i,gate] of ['script','visual_bible','storyboard'].entries()){
  const proposal_id='GP-'+i;
  p=proposeGate(p,{expected_revision:p.revision,gate,version:'v1',artifact_ref:gate+'-v1',proposal_id});
  p=approveGate(p,{expected_revision:p.revision,proposal_id,evidence:{actor:'USER',source_ref:'fixture-'+i,quote:'I approve'}});
 }
 return p;
}
function project(nodes,edges){const p=newProject('dependency-regression');p.dependency_graph={nodes,edges};return p;}
test('REC-10 missing dependency endpoint is explicitly reported',()=>{
 const p=project([{kind:'shot',id:'SH01'}],[{from:'SH01',to:'MISSING_ASSET'}]);
 const restored=restoreCheckpoint(JSON.stringify(p));
 const report=inspectCheckpoint(restored);
 assert.ok(report.unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'&&x.endpoint==='MISSING_ASSET'&&x.side==='to'));
 assert.equal(report.provider_execution_performed,false);
 assert.equal(report.media_inspected,false);
 assert.equal(report.persisted,false);
});
test('valid dependency graph has no unresolved issues',()=>{
 const report=inspectCheckpoint(project([{kind:'shot',id:'SH01'},{kind:'anchor',id:'ANCHOR01'}],[{from:'SH01',to:'ANCHOR01'}]));
 assert.deepEqual(report.unresolved_issues,[]);
});
test('duplicate nodes and invalid node kinds are reported',()=>{
 const report=inspectCheckpoint(project([{kind:'shot',id:'SH01'},{kind:'shot',id:'SH01'},{kind:'other',id:'BAD'}],[]));
 assert.ok(report.unresolved_issues.some(x=>x.code==='DUPLICATE_DEPENDENCY_NODE'));
 assert.ok(report.unresolved_issues.some(x=>x.code==='INVALID_DEPENDENCY_NODE'));
});
test('invalid edge and missing from endpoint are reported',()=>{
 const report=inspectCheckpoint(project([{kind:'shot',id:'SH01'}],[{from:'MISSING',to:'SH01'},{from:'SH01',to:''}]));
 assert.ok(report.unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'&&x.side==='from'));
 assert.ok(report.unresolved_issues.some(x=>x.code==='INVALID_DEPENDENCY_EDGE'));
});
test('checkpoint inspection never changes project state or grants permissions',()=>{
 const p=project([{kind:'shot',id:'SH01'}],[{from:'SH01',to:'MISSING'}]);const before=JSON.stringify(p);
 inspectCheckpoint(p);
 assert.equal(JSON.stringify(p),before);
 assert.deepEqual(p.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});
});

test('approved gates with graph defects recommend dependency repair',()=>{
 const p=fullyApproved(project([{kind:'shot',id:'SH01'}],[{from:'SH01',to:'MISSING'}]));
 assert.match(inspectCheckpoint(p).next_safe_action,/Resolve dependency graph issues/);
});
test('valid graph with approved gates permits planning-only continuation',()=>{
 const p=fullyApproved(project([{kind:'shot',id:'SH01'}],[]));
 assert.match(inspectCheckpoint(p).next_safe_action,/Continue planning only/);
});
test('missing gate approval remains first recovery action',()=>{
 assert.equal(inspectCheckpoint(project([{kind:'shot',id:'SH01'}],[{from:'SH01',to:'MISSING'}])).next_safe_action,'Resolve script approval');
});

test('canonical graph IDs distinguish nodes sharing a bare ID',()=>{
 const p=project([{kind:'shot',id:'X'},{kind:'audio',id:'X'}],[{from:'shot:X',to:'audio:X'}]);
 assert.deepEqual(inspectCheckpoint(p).unresolved_issues,[]);
 const ambiguous=project([{kind:'shot',id:'X'},{kind:'audio',id:'X'}],[{from:'X',to:'audio:X'}]);
 assert.ok(inspectCheckpoint(ambiguous).unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'));
});
