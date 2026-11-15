'use strict';
// Read-only, deterministic consistency assessment. No asset inspection or authorization.
const {validateProject}=require('./project-contracts.js');
function inspectMemoryConsistency(project){
 validateProject(project);
 const anchors=project.memory_anchors||[];
 const issues=[];
 const byId=new Map();
 for(const a of anchors){
  if(!byId.has(a.id))byId.set(a.id,[]);
  byId.get(a.id).push(a);
 }
 const latest=new Map();
 for(const [id,revisions] of byId){
  const sorted=[...revisions].sort((a,b)=>b.revision-a.revision);
  latest.set(id,sorted[0]);
  if(new Set(revisions.map(a=>a.kind)).size>1)
   issues.push({code:'ANCHOR_KIND_CONFLICT',anchor_id:id});
  const approved=revisions.filter(a=>a.status==='APPROVED');
  if(approved.length>1){
   const descriptions=new Set(approved.map(a=>a.description));
   if(descriptions.size>1)
    issues.push({code:'APPROVED_ANCHOR_VARIANTS',anchor_id:id,revisions:approved.map(a=>a.revision).sort((a,b)=>a-b)});
  }
 }
 // Explicit versioned refs only. Unversioned legacy continuity_refs remain untouched.
 for(const shot of project.shots){
  if(!Array.isArray(shot.continuity_refs))continue;
  for(const ref of shot.continuity_refs){
   if(typeof ref!=='string'||!ref.startsWith('anchor:'))continue;
   const match=/^anchor:([^@]+)@([1-9][0-9]*)$/.exec(ref);
   if(!match){issues.push({code:'MALFORMED_ANCHOR_REF',shot_id:shot.id,reference:ref});continue;}
   const [,id,revText]=match,rev=Number(revText);
   const entries=byId.get(id)||[];
   if(!Number.isSafeInteger(rev)||!entries.some(a=>a.revision===rev)){
    issues.push({code:'MISSING_ANCHOR_REVISION',shot_id:shot.id,reference:ref});continue;
   }
   const current=latest.get(id);
   if(rev<current.revision)
    issues.push({code:'STALE_ANCHOR_REVISION',shot_id:shot.id,reference:ref,latest_revision:current.revision});
   const selected=entries.find(a=>a.revision===rev);
   if(!selected.shot_refs.includes(shot.id))
    issues.push({code:'MISSING_RECIPROCAL_SHOT_LINK',shot_id:shot.id,reference:ref});
  }
 }
 issues.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 return {status:issues.length?'ISSUES_FOUND':'NO_ISSUES_DETECTED',issues,anchor_count:anchors.length,
  media_inspected:false,asset_files_verified:false,approval_authenticated:false,
  repair_performed:false,production_authorized:false,
  limitations:'Static consistency checks only; no visual identity or asset existence verification.'};
}
module.exports={inspectMemoryConsistency};
