'use strict';
// GENERATED from canonical root scripts by scripts/build-skill-runtimes.js. Do not edit.
// Optional Node.js helpers; no external modules or provider execution.
const factories={
'project-contracts':function(module,exports,require){
'use strict';
// Canonical project/proposal operations. No media, provider or user-approval side effects.
const clone = x => structuredClone(x);
const gates = ['script','visual_bible','storyboard'];
const states = new Set(['DRAFT','PROPOSED','APPROVED','LOCKED','NEEDS_FIX']);
const origins = new Set(['film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa']);
const isObject = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const nonempty = x => typeof x === 'string' && x.trim().length > 0;
const reject = msg => {throw new Error(msg);};
function newProject(projectId) {
 if (!nonempty(projectId)) reject('Project ID required');
 return {schema_version:'2.0',project_id:projectId,revision:1,phase:'discovery',
  gates:Object.fromEntries(gates.map(k=>[k,{approved:false}])),decisions:[],continuity:[],
  shots:[],proposals:[],gate_proposals:[],approval_ledger:[],unlock_ledger:[],permission_ledger:[],
  authorization:{production_go:false,provider_job_allowed:false,publication_allowed:false},open_questions:[]};
}
function validateProject(p) {
 if (!isObject(p)||p.schema_version!=='2.0'||!nonempty(p.project_id)||!Number.isInteger(p.revision)||p.revision<1) reject('Invalid project identity/revision');
 if (!isObject(p.gates)||!gates.every(k=>isObject(p.gates[k])&&typeof p.gates[k].approved==='boolean')) reject('Missing gates');
 for (const k of gates) if(p.gates[k].approved&&(!nonempty(p.gates[k].version)||!nonempty(p.gates[k].evidence))) reject('Approval missing evidence: '+k);
 if (!['discovery','script','visual_bible','storyboard','sound','generator','generate','review','delivery'].includes(p.phase))reject('Invalid project phase');
 if (!Array.isArray(p.shots)||!Array.isArray(p.decisions)||!Array.isArray(p.continuity)||!Array.isArray(p.proposals)) reject('Missing project collections');
 const keys=new Set();
 for (const s of p.shots) {
  if(!isObject(s)||!nonempty(s.id)||!Number.isInteger(s.revision)||s.revision<1||!states.has(s.state))reject('Invalid shot');
  const key=s.id+':'+s.revision;if(keys.has(key))reject('Duplicate shot revision');keys.add(key);
  if(s.state==='LOCKED'&&!nonempty(s.approved_asset))reject('LOCKED shot requires approved asset');
 }
 if(p.memory_anchors!==undefined){
  if(!Array.isArray(p.memory_anchors))reject('Invalid memory anchors collection');
  const revisions=new Set(),kinds=new Set(['character','wardrobe','prop','location','look']);
  const statuses=new Set(['PROPOSED','APPROVED','UNKNOWN']);
  const origins=new Set(['USER_SUPPLIED','DOCUMENTED','AGENT_DRAFT','UNKNOWN']);
  const shotIds=new Set(p.shots.map(s=>s.id));
  const allowed=new Set(['id','kind','revision','status','description','provenance','shot_refs','reference_assets','approved_evidence']);
  for(const a of p.memory_anchors){
   if(!isObject(a)||Object.keys(a).some(k=>!allowed.has(k))||!nonempty(a.id)||!kinds.has(a.kind)||
      !Number.isInteger(a.revision)||a.revision<1||!statuses.has(a.status)||!nonempty(a.description))
    reject('Invalid memory anchor');
   const key=a.id+':'+a.revision;
   if(revisions.has(key))reject('Duplicate memory anchor revision');
   revisions.add(key);
   if(!isObject(a.provenance)||Object.keys(a.provenance).some(k=>!['kind','reference'].includes(k))||
      !origins.has(a.provenance.kind)||!(a.provenance.reference===null||nonempty(a.provenance.reference)))
    reject('Invalid memory provenance');
   if(!Array.isArray(a.shot_refs)||!a.shot_refs.every(nonempty)||new Set(a.shot_refs).size!==a.shot_refs.length||
      a.shot_refs.some(id=>!shotIds.has(id)))reject('Invalid memory shot references');
   if(a.reference_assets!==undefined&&(!Array.isArray(a.reference_assets)||!a.reference_assets.every(nonempty)||
      new Set(a.reference_assets).size!==a.reference_assets.length))reject('Invalid memory asset references');
   if(a.status==='APPROVED'&&(!isObject(a.approved_evidence)||a.approved_evidence.actor!=='USER'||
      !nonempty(a.approved_evidence.source_ref)||!nonempty(a.approved_evidence.quote)))
    reject('Approved memory anchor requires user evidence');
   if(a.approved_evidence!==undefined&&(!isObject(a.approved_evidence)||a.approved_evidence.actor!=='USER'||
      !nonempty(a.approved_evidence.source_ref)||!nonempty(a.approved_evidence.quote)))
    reject('Invalid memory approval evidence');
  }
 }
 if(p.shot_timeline!==undefined){
  const t=p.shot_timeline;
  if(!isObject(t)||!Number.isSafeInteger(t.duration_ms)||t.duration_ms<1||!Array.isArray(t.shots))reject('Invalid shot timeline shape');
 }
 if(p.audio_timeline!==undefined){
  const a=p.audio_timeline;
  if(!isObject(a)||!Number.isSafeInteger(a.duration_ms)||a.duration_ms<1||!Array.isArray(a.cues)||
    !Array.isArray(a.required_narration)||!Array.isArray(a.intentional_silence))reject('Invalid audio timeline shape');
 }
 if(p.dependency_graph!==undefined){
  if(!isObject(p.dependency_graph)||!Array.isArray(p.dependency_graph.nodes)||!Array.isArray(p.dependency_graph.edges))
   reject('Invalid dependency graph shape');
 }
 if (!isObject(p.authorization)||!['production_go','provider_job_allowed','publication_allowed'].every(k=>p.authorization[k]===false))reject('No operational authorization without separate execution adapter');
 for(const key of ['gate_proposals','approval_ledger','unlock_ledger','permission_ledger'])if(p[key]!==undefined&&!Array.isArray(p[key]))reject('Invalid authority ledger: '+key);
 return true;
}
const stages = new Set(['script','visual_bible','storyboard','sound','generator','generate','review','delivery']);
const permissions = new Set(['script_user_approval','visual_bible_user_approval','storyboard_user_approval','scoped_unlock','provider_job_permission','publication_permission']);
const handoffKeys = new Set(['contract_version','project_id','request_id','origin','stage','input_revision','status','proposed_artifact','provenance','required_authorization','dependencies','assumptions']);
function validOptionalStrings(values) {return values===undefined||(Array.isArray(values)&&values.every(nonempty)&&new Set(values).size===values.length);}
function validateHandoffShape(q) {
 if(!stages.has(q.stage))reject('Invalid specialist stage');
 if(Object.keys(q).some(k=>!handoffKeys.has(k)))reject('Unknown specialist proposal field');
 if(!Object.prototype.hasOwnProperty.call(q.provenance,'evidence_ref')||
   !(q.provenance.evidence_ref===null||typeof q.provenance.evidence_ref==='string'))
  reject('Invalid provenance evidence_ref');
 if(Object.keys(q.provenance).some(k=>!['kind','evidence_ref'].includes(k)))reject('Unknown provenance field');
 if(q.required_authorization.some(k=>!permissions.has(k))||
   new Set(q.required_authorization).size!==q.required_authorization.length)reject('Invalid required authorization');
 if(!validOptionalStrings(q.dependencies)||!validOptionalStrings(q.assumptions))reject('Invalid handoff dependencies or assumptions');
 if(Object.prototype.hasOwnProperty.call(q.proposed_artifact,'id')===false)reject('Missing proposed artifact ID');
}
function validateProposal(p,q) {
 validateProject(p);
 if(!isObject(q)||q.contract_version!=='2.0'||q.status!=='PROPOSED'||!nonempty(q.request_id)||!origins.has(q.origin))reject('Invalid specialist proposal');
 if(q.project_id!==p.project_id)reject('Project mismatch');
 if(q.input_revision!==p.revision)reject('Stale proposal');
 if(!isObject(q.proposed_artifact)||!nonempty(q.proposed_artifact.id)||!nonempty(q.proposed_artifact.kind)||!Number.isInteger(q.proposed_artifact.revision)||q.proposed_artifact.revision<1)reject('Invalid proposed artifact');
 if(!isObject(q.provenance)||q.provenance.kind!=='AGENT_DRAFT')reject('Specialist cannot claim inspection or user approval');
 if(!Array.isArray(q.required_authorization))reject('Required authorization list missing');
 validateHandoffShape(q);
 if(p.proposals.some(prev=>prev.request_id===q.request_id))reject('Duplicate request ID');
 return true;
}
function recordProposal(p,q) {
 validateProposal(p,q);const next=clone(p);next.proposals.push(clone(q));next.revision++;
 return next; // no gate, media, lock, spending or publication mutation
}
module.exports={newProject,validateProject,validateProposal,recordProposal};

},
'memory-consistency':function(module,exports,require){
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

},
'visual-continuity-assessment':function(module,exports,require){
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

}
};
const cache=new Map();
function load(id){
 if(cache.has(id))return cache.get(id).exports;
 if(!Object.prototype.hasOwnProperty.call(factories,id))throw Error('Unknown bundled module: '+id);
 const module={exports:{}};cache.set(id,module);
 try{factories[id](module,module.exports,ref=>{
  if(ref==='node:crypto')return require('node:crypto');
  if(!/^\.\/[-a-z]+\.js$/.test(ref))throw Error('External module forbidden: '+ref);
  return load(ref.slice(2,-3));
 });}catch(e){cache.delete(id);throw e;}
 return module.exports;
}
module.exports={...load('project-contracts'),...load('memory-consistency'),...load('visual-continuity-assessment')};
