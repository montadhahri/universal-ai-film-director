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
module.exports={planSmartRepair};
