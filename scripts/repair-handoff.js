'use strict';
// Deterministic, provider-neutral repair handoff. Generates instructions, never runs tools.
const {validateProject}=require('./project-contracts.js');
const {reviewRepairEvidence}=require('./smart-repair.js');
const ok=x=>typeof x==='string'&&x.trim().length>0;
const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/i.test(x);
const clone=x=>structuredClone(x);
function prepareRepairHandoff(project,{expected_revision,shot_id,source_revision,new_revision,repair_kind,source_asset,source_sha256,proposed_output_ref,expected_result,acceptance_checks,rollback_ref,immutable_asset_refs=[]}={}){
 validateProject(project);
 if(expected_revision!==project.revision)throw Error('Stale project revision');
 if(!ok(shot_id)||!Number.isSafeInteger(source_revision)||!Number.isSafeInteger(new_revision)||new_revision<=source_revision)throw Error('Invalid repair scope');
 if(!['IMAGE','VIDEO','AUDIO','EDIT'].includes(repair_kind))throw Error('Unsupported repair kind');
 const source=project.shots.find(x=>x.id===shot_id&&x.revision===source_revision&&x.state==='LOCKED');
 const proposal=project.shots.find(x=>x.id===shot_id&&x.revision===new_revision&&x.parent_revision===source_revision&&x.state==='PROPOSED');
 const auth=(project.unlock_ledger||[]).find(x=>x.shot_id===shot_id&&x.source_revision===source_revision&&x.new_revision===new_revision);
 if(!source||!proposal||!auth)throw Error('Exact locked source and scoped proposed revision required');
 if(!ok(source_asset)||source_asset!==source.approved_asset||!hash(source_sha256))throw Error('Attributable source asset reference and claimed SHA-256 required');
 if(!ok(proposed_output_ref)||proposed_output_ref===source_asset||!ok(expected_result)||!ok(rollback_ref)||rollback_ref!==source_asset)throw Error('Distinct output, expected result and source rollback required');
 if(!Array.isArray(acceptance_checks)||!acceptance_checks.length||acceptance_checks.some(x=>!ok(x)))throw Error('Explicit acceptance checks required');
 if(!Array.isArray(immutable_asset_refs)||immutable_asset_refs.some(x=>!ok(x))||immutable_asset_refs.includes(proposed_output_ref))throw Error('Invalid immutable asset scope');
 if(!immutable_asset_refs.includes(source_asset))throw Error('Locked source must be explicitly immutable');
 if(new Set([source_asset,...immutable_asset_refs]).size!==immutable_asset_refs.length)throw Error('Duplicate immutable asset refs');
 return {status:'MANUAL_REPAIR_HANDOFF_READY',shot_id,source_revision,new_revision,repair_kind,
  input:{asset_ref:source_asset,sha256_claim:source_sha256.toLowerCase()},
  proposed_output_ref,expected_result,acceptance_checks:clone(acceptance_checks),
  immutable_asset_refs:clone(immutable_asset_refs),rollback_ref,
  authorization_ref:auth.authorization_ref,
  instructions:'Use a separately authorized local/manual tool on a COPY; never overwrite immutable assets. Record real output bytes, independent visual/audio review, both edit boundaries and full-film check before requesting acceptance.',
  execution_performed:false,source_bytes_verified:false,output_bytes_verified:false,
  user_identity_authenticated:false,provider_authorized:false,production_authorized:false,
  auto_approved:false};
}
function inspectRepairHandoffEvidence(project,handoff,{after,reviewer,review_ref,outcome,checks=[]}={}){
 if(!handoff||handoff.status!=='MANUAL_REPAIR_HANDOFF_READY'||handoff.execution_performed!==false)throw Error('Valid unexecuted handoff required');
 if(!Array.isArray(checks)||checks.length!==handoff.acceptance_checks.length||
   checks.some((x,i)=>x?.criterion!==handoff.acceptance_checks[i]||!['PASS','FAIL','NOT_RUN'].includes(x?.outcome)))
   throw Error('Each acceptance check needs a recorded outcome');
 if(after?.asset_ref!==handoff.proposed_output_ref)throw Error('Output must match proposed handoff target');
 const review=reviewRepairEvidence(project,{shot_id:handoff.shot_id,source_revision:handoff.source_revision,
  new_revision:handoff.new_revision,before:{asset_ref:handoff.input.asset_ref,sha256:handoff.input.sha256_claim},
  after,reviewer,review_ref,outcome});
 const complete=checks.every(x=>x.outcome==='PASS');
 return {...review,acceptance_checks:clone(checks),reported_acceptance_checks_pass:complete,
  status:complete&&outcome==='MATCH'?'REVIEWER_REPORTED_CHECKS_PASS':'REPAIR_REVIEW_INCOMPLETE',
  independent_media_verification:false,actual_output_verified:false,auto_approved:false,
  production_authorized:false,next_safe_action:'Independently verify media and hashes, then obtain separate acceptance of proposed revision'};
}
module.exports={prepareRepairHandoff,inspectRepairHandoffEvidence};
