'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject,validateProject}=require('../../scripts/project-contracts.js');
const {exportCheckpoint,importCheckpoint}=require('../../scripts/checkpoint-envelope.js');
const evidence={actor:'USER',source_ref:'user-confirmation-1',quote:'I approve this anchor'};
const anchor=(overrides={})=>({
 id:'CHILD-01',kind:'character',revision:1,status:'PROPOSED',
 description:'Short tousled hair and blue coat',
 provenance:{kind:'DOCUMENTED',reference:'visual-bible-v1'},
 shot_refs:['SH01'],reference_assets:['reference/child-01.png'],...overrides
});
function fixture(){const p=newProject('memory-v24');p.shots.push({id:'SH01',revision:1,state:'DRAFT',continuity_refs:[],issues:[]});return p;}
test('legacy v2.0 project remains valid without memory anchors',()=>assert.equal(validateProject(newProject('legacy')),true));
test('proposed memory anchors preserve all operational denies and round-trip checkpoints',()=>{
 const p=fixture();p.memory_anchors=[anchor()];
 assert.equal(validateProject(p),true);
 const restored=importCheckpoint(exportCheckpoint(p));
 assert.deepEqual(restored.project,p);
 assert.equal(restored.approval_authenticated,false);
 assert.equal(restored.asset_files_verified,false);
 assert.deepEqual(restored.project.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});
});
test('approved anchor requires explicit user evidence',()=>{
 const p=fixture();p.memory_anchors=[anchor({status:'APPROVED'})];
 assert.throws(()=>validateProject(p),/user evidence/);
 p.memory_anchors[0].approved_evidence=evidence;
 assert.equal(validateProject(p),true);
});
test('rejects duplicate anchor revision, missing shots and duplicate assets',()=>{
 const p=fixture();p.memory_anchors=[anchor(),anchor()];
 assert.throws(()=>validateProject(p),/Duplicate memory/);
 p.memory_anchors=[anchor({shot_refs:['MISSING']})];
 assert.throws(()=>validateProject(p),/shot references/);
 p.memory_anchors=[anchor({reference_assets:['same','same']})];
 assert.throws(()=>validateProject(p),/asset references/);
});
test('unknown provenance remains explicit and does not imply verified media',()=>{
 const p=fixture();p.memory_anchors=[anchor({status:'UNKNOWN',provenance:{kind:'UNKNOWN',reference:null},reference_assets:[]})];
 assert.equal(validateProject(p),true);
});
test('rejects invalid anchor kind and fabricated user approval',()=>{
 const p=fixture();p.memory_anchors=[anchor({kind:'unsupported'})];
 assert.throws(()=>validateProject(p),/Invalid memory anchor/);
 p.memory_anchors=[anchor({status:'APPROVED',approved_evidence:{actor:'AGENT',source_ref:'x',quote:'yes'}})];
 assert.throws(()=>validateProject(p),/user evidence/);
});
