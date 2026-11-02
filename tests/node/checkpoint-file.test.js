'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const {newProject}=require('../../scripts/project-contracts.js');
const {saveCheckpointFile,loadCheckpointFile}=require('../../scripts/checkpoint-file.js');
function fixture(){const p=newProject('recovery-file');p.dependency_graph={nodes:[{kind:'shot',id:'SH01'}],edges:[{from:'SH01',to:'MISSING'}]};return p;}
function temp(t){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'film-checkpoint-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));return path.join(dir,'checkpoint.json');}
test('file save and restore preserve project and unresolved issues',t=>{
 const file=temp(t),p=fixture();const save=saveCheckpointFile(file,p);
 assert.equal(save.persisted,true);
 const loaded=loadCheckpointFile(file);
 assert.deepEqual(loaded.project,p);
 assert.ok(loaded.inspection.unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'));
 assert.equal(loaded.approval_authenticated,false);
 assert.equal(loaded.asset_files_verified,false);
});
test('cross-process recovery verifies checkpoint and reports unresolved issues',t=>{
 const file=temp(t);saveCheckpointFile(file,fixture());
 const script="const {loadCheckpointFile}=require('./scripts/checkpoint-file.js');const r=loadCheckpointFile(process.argv[1]);process.stdout.write(JSON.stringify({project_id:r.project.project_id,issues:r.inspection.unresolved_issues,integrity:r.integrity_verified}));";
 const output=execFileSync(process.execPath,['-e',script,file],{cwd:path.resolve(__dirname,'../..'),encoding:'utf8'});
 const result=JSON.parse(output);
 assert.equal(result.project_id,'recovery-file');
 assert.equal(result.integrity,true);
 assert.ok(result.issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'));
});
test('existing checkpoint cannot be silently overwritten',t=>{
 const file=temp(t);saveCheckpointFile(file,fixture());
 const before=fs.readFileSync(file,'utf8');
 assert.throws(()=>saveCheckpointFile(file,newProject('replacement')),/EEXIST/);
 assert.equal(fs.readFileSync(file,'utf8'),before);
});
test('tampered file is rejected during load',t=>{
 const file=temp(t);saveCheckpointFile(file,fixture());
 const env=JSON.parse(fs.readFileSync(file,'utf8'));env.project.project_id='tampered';
 fs.writeFileSync(file,JSON.stringify(env));
 assert.throws(()=>loadCheckpointFile(file),/checksum mismatch/);
});
test('missing checkpoint file fails explicitly',t=>{
 const file=temp(t);
 assert.throws(()=>loadCheckpointFile(file),/ENOENT/);
});
