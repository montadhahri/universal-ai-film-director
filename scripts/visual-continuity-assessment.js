'use strict';
// Evidence-backed visual review records; never reads image pixels or grants authority.
const {validateProject}=require('./project-contracts.js');
const {inspectMemoryConsistency}=require('./memory-consistency.js');
const isObject=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
const outcomes=new Set(['MATCH','MISMATCH','INDETERMINATE','NOT_RUN']);
const criteria=new Set(['character','wardrobe','prop','location','look','lighting','camera','custody']);
function assessVisualContinuity(project,observations=[]){
 validateProject(project);
 if(!Array.isArray(observations))throw Error('Observations must be an array');
 const shots=new Set(project.shots.map(s=>s.id));
 const anchors=new Map((project.memory_anchors||[]).map(a=>[a.id+'@'+a.revision,a]));
 const seen=new Set(),findings=[];
 for(const o of observations){
  if(!isObject(o)||Object.keys(o).some(k=>!['shot_id','anchor_id','anchor_revision','criterion','outcome','source_asset','source_sha256','reviewer','review_ref','notes'].includes(k))||
    !nonempty(o.shot_id)||!shots.has(o.shot_id)||!nonempty(o.anchor_id)||
    !Number.isSafeInteger(o.anchor_revision)||o.anchor_revision<1||
    !criteria.has(o.criterion)||!outcomes.has(o.outcome))throw Error('Invalid visual observation');
  const key=o.shot_id+':'+o.anchor_id+'@'+o.anchor_revision+':'+o.criterion;
  if(seen.has(key))throw Error('Duplicate visual observation');
  seen.add(key);
  const anchor=anchors.get(o.anchor_id+'@'+o.anchor_revision);
  if(!anchor)throw Error('Unknown visual anchor revision');
  if(!anchor.shot_refs.includes(o.shot_id))throw Error('Visual anchor not linked to shot');
  const hasEvidence=nonempty(o.source_asset)&&/^[a-fA-F0-9]{64}$/.test(o.source_sha256||'')&&
    nonempty(o.reviewer)&&nonempty(o.review_ref);
  if(o.outcome!=='NOT_RUN'&&!hasEvidence)throw Error('Visual finding requires attributable asset hash and reviewer evidence');
  if(o.outcome==='NOT_RUN'&&['source_asset','source_sha256','reviewer','review_ref'].some(k=>o[k]!==undefined))
    throw Error('NOT_RUN must not claim inspection evidence');
  if(o.notes!==undefined&&!nonempty(o.notes))throw Error('Invalid observation notes');
  findings.push({shot_id:o.shot_id,anchor_ref:'anchor:'+o.anchor_id+'@'+o.anchor_revision,
   criterion:o.criterion,outcome:o.outcome,evidence_class:hasEvidence?'REVIEWER_REPORTED':'NOT_INSPECTED',
   source_asset:hasEvidence?o.source_asset:null,source_sha256:hasEvidence?o.source_sha256.toLowerCase():null,
   reviewer:hasEvidence?o.reviewer:null,review_ref:hasEvidence?o.review_ref:null,
   notes:o.notes||null,repair_candidate:o.outcome==='MISMATCH'});
 }
 findings.sort((a,b)=>[a.shot_id,a.anchor_ref,a.criterion].join(':').localeCompare([b.shot_id,b.anchor_ref,b.criterion].join(':')));
 const consistency=inspectMemoryConsistency(project);
 return {status:findings.some(f=>f.outcome==='MISMATCH')?'MISMATCH_REPORTED':
  findings.length&&findings.every(f=>f.outcome==='MATCH')?'REVIEWER_MATCHES_REPORTED':'INCOMPLETE',
  findings,structural_issues:consistency.issues,
  actual_image_pixels_inspected_by_tool:false,source_hashes_verified_by_tool:false,
  approval_authenticated:false,repair_performed:false,production_authorized:false,
  limitations:'Findings are attributable reviewer assertions, not automated visual recognition or verified image bytes. Missing evidence cannot be treated as PASS.'};
}
module.exports={assessVisualContinuity};
