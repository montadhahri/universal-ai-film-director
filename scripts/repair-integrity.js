'use strict';
// Independently hash supplied actual file bytes; never read paths, inspect pixels or write files.
const {createHash,timingSafeEqual}=require('node:crypto');
const {validateProject}=require('./project-contracts.js');
const ok=x=>typeof x==='string'&&x.trim().length>0;
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/i.test(x);
function bytes(x){
 if(!Buffer.isBuffer(x)&&!(x instanceof Uint8Array))throw Error('Actual Uint8Array or Buffer bytes required');
 if(x.byteLength===0)throw Error('Empty media bytes cannot be verified');
 return x;
}
function digest(x){return createHash('sha256').update(bytes(x)).digest('hex');}
function sameHash(a,b){return timingSafeEqual(Buffer.from(a,'hex'),Buffer.from(b,'hex'));}
function verifyRepairBytes(project,handoff,{source_bytes,output_bytes,source_sha256,output_sha256,source_asset_ref,output_asset_ref}={}){
 validateProject(project);
 if(!handoff||handoff.status!=='MANUAL_REPAIR_HANDOFF_READY')throw Error('Exact manual repair handoff required');
 const source=project.shots.find(s=>s.id===handoff.shot_id&&s.revision===handoff.source_revision&&s.state==='LOCKED');
 const proposal=project.shots.find(s=>s.id===handoff.shot_id&&s.revision===handoff.new_revision&&s.parent_revision===handoff.source_revision&&s.state==='PROPOSED');
 const auth=(project.unlock_ledger||[]).find(x=>x.shot_id===handoff.shot_id&&x.source_revision===handoff.source_revision&&x.new_revision===handoff.new_revision&&x.authorization_ref===handoff.authorization_ref);
 if(!source||!proposal||!auth)throw Error('Scoped locked source and proposed revision are required');
 if(source_asset_ref!==source.approved_asset||source_asset_ref!==handoff.input?.asset_ref||
   output_asset_ref!==handoff.proposed_output_ref||!ok(output_asset_ref)||output_asset_ref===source_asset_ref)
  throw Error('Media references must match the exact handoff and locked source');
 if(!hex(source_sha256)||!hex(output_sha256)||!hex(handoff.input.sha256_claim))
  throw Error('Expected SHA-256 values must be 64 hexadecimal characters');
 const actualSource=digest(source_bytes),actualOutput=digest(output_bytes);
 const sourceMatched=sameHash(actualSource,source_sha256.toLowerCase())&&sameHash(actualSource,handoff.input.sha256_claim.toLowerCase());
 const outputMatched=sameHash(actualOutput,output_sha256.toLowerCase());
 const distinct=!sameHash(actualSource,actualOutput);
 const verified=sourceMatched&&outputMatched&&distinct;
 return {status:verified?'BYTE_INTEGRITY_VERIFIED':'BYTE_INTEGRITY_FAILED',
  shot_id:handoff.shot_id,source_revision:handoff.source_revision,new_revision:handoff.new_revision,
  source_asset_ref,output_asset_ref,
  source:{sha256_actual:actualSource,sha256_expected:source_sha256.toLowerCase(),matched:sourceMatched},
  output:{sha256_actual:actualOutput,sha256_expected:output_sha256.toLowerCase(),matched:outputMatched},
  byte_content_distinct:distinct,actual_bytes_hashed:true,byte_integrity_verified:verified,
  source_identity_authenticated:false,media_semantics_inspected:false,visual_quality_verified:false,
  edit_boundaries_verified:false,full_film_verified:false,auto_approved:false,
  production_authorized:false,asset_modified:false,
  next_safe_action:verified?'Obtain separate visual/audio, boundary and full-film inspection with user acceptance':'Reject mismatched bytes and investigate source/output provenance'};
}
module.exports={verifyRepairBytes};
