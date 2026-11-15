'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const {newProject}=require('../../scripts/project-contracts.js');
const {prepareRepairHandoff}=require('../../scripts/repair-handoff.js');
const {verifyRepairBytes}=require('../../scripts/repair-integrity.js');
const sha=b=>createHash('sha256').update(b).digest('hex');
function fixture(){
 const p=newProject('integrity');p.shots=[
 {id:'SH01',revision:1,state:'LOCKED',approved_asset:'source.png',continuity_refs:[],issues:[]},
 {id:'SH01',revision:2,parent_revision:1,state:'PROPOSED',continuity_refs:[],issues:[]}];
 p.unlock_ledger=[{shot_id:'SH01',source_revision:1,new_revision:2,authorization_ref:'user-1'}];
 const source=Buffer.from('approved original bytes'),output=Buffer.from('new candidate bytes');
 const handoff=prepareRepairHandoff(p,{expected_revision:p.revision,shot_id:'SH01',source_revision:1,new_revision:2,
 repair_kind:'IMAGE',source_asset:'source.png',source_sha256:sha(source),proposed_output_ref:'candidate.png',
 expected_result:'Correct appearance',acceptance_checks:['Visual','Boundaries','Full film'],
 rollback_ref:'source.png',immutable_asset_refs:['source.png']});
 const args={source_bytes:source,output_bytes:output,source_sha256:sha(source),output_sha256:sha(output),
 source_asset_ref:'source.png',output_asset_ref:'candidate.png'};
 return {p,handoff,args};
}
test('real byte hashes match exact scoped source and candidate without changing project',()=>{
 const {p,handoff,args}=fixture(),snapshot=JSON.stringify(p);
 const r=verifyRepairBytes(p,handoff,args);
 assert.equal(r.status,'BYTE_INTEGRITY_VERIFIED');assert.equal(r.actual_bytes_hashed,true);
 assert.equal(r.visual_quality_verified,false);assert.equal(r.auto_approved,false);
 assert.equal(JSON.stringify(p),snapshot);assert.equal(p.shots[0].state,'LOCKED');
});
test('incorrect source or output hashes fail closed',()=>{
 const {p,handoff,args}=fixture();
 assert.equal(verifyRepairBytes(p,handoff,{...args,source_sha256:'0'.repeat(64)}).status,'BYTE_INTEGRITY_FAILED');
 assert.equal(verifyRepairBytes(p,handoff,{...args,output_sha256:'0'.repeat(64)}).status,'BYTE_INTEGRITY_FAILED');
});
test('identical candidate bytes do not count as a repaired artifact',()=>{
 const {p,handoff,args}=fixture();
 const r=verifyRepairBytes(p,handoff,{...args,output_bytes:args.source_bytes,output_sha256:args.source_sha256});
 assert.equal(r.status,'BYTE_INTEGRITY_FAILED');assert.equal(r.byte_content_distinct,false);
});
test('reject missing real bytes, incorrect refs, and absent authorization',()=>{
 const {p,handoff,args}=fixture();
 assert.throws(()=>verifyRepairBytes(p,handoff,{...args,source_bytes:'just a hash'}),/Uint8Array/);
 assert.throws(()=>verifyRepairBytes(p,handoff,{...args,output_bytes:Buffer.alloc(0)}),/Empty/);
 assert.throws(()=>verifyRepairBytes(p,handoff,{...args,output_asset_ref:'wrong.png'}),/references/);
 p.unlock_ledger=[];assert.throws(()=>verifyRepairBytes(p,handoff,args),/Scoped/);
});
