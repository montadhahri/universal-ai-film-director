'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {inspectCheckpoint,restoreCheckpoint}=require('../../scripts/director-authority.js');
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
