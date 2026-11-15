'use strict';
// Advisory-only diagnosis and dependency-closure planning. No asset writes, unlocks or provider calls.
const {validateProject}=require('./project-contracts.js');
const {inspectMemoryConsistency}=require('./memory-consistency.js');
const {assessVisualContinuity}=require('./visual-continuity-assessment.js');
const {previewRepairImpact,validateDependencyGraph}=require('./audio-continuity.js');
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
function planSmartRepair(project,{expected_revision,observations=[]}={}){
 validateProject(project);
 if(expected_revision!==project.revision)throw Error('Stale project revision');
 const memory=inspectMemoryConsistency(project);
 const visual=assessVisualContinuity(project,observations);
 const defects=[];
 for(const issue of memory.issues){
  const target=issue.shot_id?'shot:'+issue.shot_id:issue.anchor_id?'anchor:'+issue.anchor_id:null;
  defects.push({source:'MEMORY',code:issue.code,target,evidence_status:'STRUCTURAL_CHECK',detail:issue});
 }
 for(const finding of visual.findings){
  if(finding.outcome!=='MISMATCH')continue;
  defects.push({source:'VISUAL',code:'REVIEWER_REPORTED_MISMATCH',target:'shot:'+finding.shot_id,
   evidence_status:'REVIEWER_REPORTED_UNVERIFIED',detail:finding});
 }
 defects.sort((a,b)=>[a.target||'',a.source,a.code,JSON.stringify(a.detail)].join('|')
  .localeCompare([b.target||'',b.source,b.code,JSON.stringify(b.detail)].join('|')));
 const blockers=[];
 if(!project.dependency_graph)blockers.push('DEPENDENCY_GRAPH_MISSING');
 else{
  try{validateDependencyGraph(project.dependency_graph);}
  catch(e){blockers.push('DEPENDENCY_GRAPH_INVALID');}
 }
 const nodeKeys=new Set((project.dependency_graph?.nodes||[]).map(n=>n.kind+':'+n.id));
 const previews=[];
 if(!blockers.length){
  for(const target of [...new Set(defects.map(d=>d.target).filter(Boolean))].sort()){
   if(!nodeKeys.has(target)){
    blockers.push('TARGET_NOT_IN_DEPENDENCY_GRAPH:'+target);
    continue;
   }
   previews.push(previewRepairImpact(project,{expected_revision,target}));
  }
 }
 const affected=new Set(previews.flatMap(p=>p.affected));
 const affectedLocked=new Set(previews.flatMap(p=>p.affected_locked_shots));
 const allNodes=[...nodeKeys].sort();
 // The union is only a lower-bound dependency closure if the graph is complete and correct.
 const safeToScope=blockers.length===0;
 return {
  status:blockers.length?'BLOCKED':defects.length?'REPAIR_PROPOSAL_ONLY':'NO_REPORTED_DEFECTS',
  defects,blockers,impact_previews:safeToScope?previews:[],
  affected_candidates:safeToScope?[...affected].sort():[],
  unaffected_candidates:safeToScope?allNodes.filter(k=>!affected.has(k)):[],
  affected_locked_shots:safeToScope?[...affectedLocked].sort():[],
  requires_scoped_unlock:safeToScope&&affectedLocked.size>0,
  graph_completeness_verified:false,visual_pixels_inspected:false,source_hashes_verified:false,
  user_authorization_verified:false,repair_performed:false,production_authorized:false,
  next_safe_action:blockers.length?'Repair and independently review dependency graph before scoping changes':
   defects.length?'Review proposed scope, confirm graph completeness and request explicit scoped user authorization before any change':
   'No defect reported; do not infer a visual or production PASS',
  limitations:'Conservative advisory graph closure only. A valid graph may omit real dependencies; unaffected candidates are not proven safe. No images or locked assets are changed.'
 };
}

const {proposeLockedShotRevision}=require('./director-authority.js');
const validHash=x=>typeof x==='string'&&/^[a-fA-F0-9]{64}$/.test(x);
const validRef=x=>typeof x==='string'&&x.trim().length>0;
function prepareScopedRepair(project,{expected_revision,observations=[],shot_id,source_revision,new_revision,reason,authorization_ref,evidence}={}){
 const plan=planSmartRepair(project,{expected_revision,observations});
 if(plan.status!=='REPAIR_PROPOSAL_ONLY')throw Error('Repair diagnosis is not actionable');
 if(!validRef(shot_id)||!plan.affected_locked_shots.includes('shot:'+shot_id))
  throw Error('Locked shot must be within reported impact scope');
 if(!plan.defects.some(d=>d.target==='shot:'+shot_id||
    d.target?.startsWith('anchor:')&&plan.affected_candidates.includes(d.target)))
  throw Error('No supported repair finding for scoped shot');
 if(!validRef(reason)||!validRef(authorization_ref))throw Error('Repair reason and authorization reference required');
 // Existing authority procedure checks exact USER evidence and preserves the locked source.
 const updated=proposeLockedShotRevision(project,{expected_revision,shot_id,source_revision,
  new_revision,reason,authorization_ref,evidence});
 return {status:'SCOPED_REVISION_PROPOSED',project:updated,
  source_locked_preserved:true,asset_changed:false,repair_executed:false,
  image_inspected:false,authorization_authenticated:false,production_authorized:false,
  next_safe_action:'Review proposed shot revision and separately execute approved repair; do not overwrite locked source'};
}
function reviewRepairEvidence(project,{shot_id,source_revision,new_revision,before,after,reviewer,review_ref,outcome}={}){
 validateProject(project);
 if(!validRef(shot_id)||!Number.isSafeInteger(source_revision)||!Number.isSafeInteger(new_revision)||
  new_revision<=source_revision)throw Error('Invalid repair revision pair');
 const original=project.shots.find(s=>s.id===shot_id&&s.revision===source_revision&&s.state==='LOCKED');
 const proposal=project.shots.find(s=>s.id===shot_id&&s.revision===new_revision&&
  s.parent_revision===source_revision&&s.state==='PROPOSED');
 const authorization=(project.unlock_ledger||[]).find(e=>e.shot_id===shot_id&&
  e.source_revision===source_revision&&e.new_revision===new_revision);
 if(!original||!proposal||!authorization)throw Error('No scoped authorized repair proposal');
 if(!validRef(before?.asset_ref)||!validHash(before?.sha256)||
  !validRef(after?.asset_ref)||!validHash(after?.sha256)||
  !validRef(reviewer)||!validRef(review_ref)||
  !['MATCH','MISMATCH','INDETERMINATE'].includes(outcome))
  throw Error('Attributable before and after review evidence required');
 if(before.asset_ref!==original.approved_asset)throw Error('Before asset must reference locked source');
 if(before.asset_ref===after.asset_ref&&before.sha256.toLowerCase()===after.sha256.toLowerCase())
  throw Error('No distinct after evidence');
 return {status:outcome==='MATCH'?'REVIEWER_REPORTED_REPAIR_MATCH':
  outcome==='MISMATCH'?'REVIEWER_REPORTED_REPAIR_MISMATCH':'REVIEW_INDETERMINATE',
  shot_id,source_revision,new_revision,
  before:{asset_ref:before.asset_ref,sha256:before.sha256.toLowerCase()},
  after:{asset_ref:after.asset_ref,sha256:after.sha256.toLowerCase()},
  reviewer,review_ref,reviewer_outcome:outcome,
  actual_bytes_verified:false,image_pixels_inspected:false,reviewer_authenticated:false,
  asset_changed:false,repair_executed:false,auto_approved:false,production_authorized:false,
  next_safe_action:'Independently verify asset bytes and visual outcome, then request separate acceptance of proposed revision'};
}

module.exports={planSmartRepair,prepareScopedRepair,reviewRepairEvidence};
