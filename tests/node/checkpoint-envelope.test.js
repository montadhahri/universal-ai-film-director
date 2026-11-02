'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {exportCheckpoint,importCheckpoint}=require('../../scripts/checkpoint-envelope.js');
test('checkpoint survives export/import with identical project and explicit limits',()=>{
 const p=newProject('recovery-1');
 const result=importCheckpoint(exportCheckpoint(p));
 assert.deepEqual(result.project,p);
 assert.equal(result.integrity_verified,true);
 assert.equal(result.approval_authenticated,false);
 assert.equal(result.asset_files_verified,false);
 assert.equal(result.persisted,false);
});
test('canonical checksum is stable across object key insertion order',()=>{
 const p=newProject('recovery-2');
 const reversed=Object.fromEntries(Object.entries(p).reverse());
 assert.equal(JSON.parse(exportCheckpoint(p)).checksum,JSON.parse(exportCheckpoint(reversed)).checksum);
});
test('tampered checkpoint is rejected',()=>{
 const p=newProject('recovery-3');
 const envelope=JSON.parse(exportCheckpoint(p));
 envelope.project.project_id='changed';
 assert.throws(()=>importCheckpoint(JSON.stringify(envelope)),/checksum mismatch/);
});
test('unsupported envelope version is rejected',()=>{
 const envelope=JSON.parse(exportCheckpoint(newProject('recovery-4')));
 envelope.envelope_version=2;
 assert.throws(()=>importCheckpoint(JSON.stringify(envelope)),/Unsupported checkpoint envelope/);
});
test('invalid project is rejected before checksum acceptance',()=>{
 const envelope=JSON.parse(exportCheckpoint(newProject('recovery-5')));
 envelope.project.authorization.production_go=true;
 assert.throws(()=>importCheckpoint(JSON.stringify(envelope)),/No operational authorization/);
});
test('dependency problems are preserved and reported after import',()=>{
 const p=newProject('recovery-6');
 p.dependency_graph={nodes:[{kind:'shot',id:'SH01'}],edges:[{from:'SH01',to:'MISSING'}]};
 const result=importCheckpoint(exportCheckpoint(p));
 assert.ok(result.inspection.unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'));
});
