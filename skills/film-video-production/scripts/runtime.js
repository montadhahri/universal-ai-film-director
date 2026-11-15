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
'production-pipeline':function(module,exports,require){
'use strict';
// Planning-only production pipeline. Does not authenticate approvals,
// persist checkpoints, inspect media, invoke providers or grant permissions.
const {validateProject}=require('./project-contracts.js');
const phases=['discovery','script','visual_bible','storyboard','sound','generator','generate','review','delivery'];
const nonempty=s=>typeof s==='string'&&s.trim().length>0;
const fail=m=>{throw new Error(m)};
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const clone=x=>structuredClone(x);
const timelineEps=0; // millisecond contract: cuts only; no implicit dissolves or crossfades

function validateTimeline(t){
 if(!t||!integer(t.duration_ms)||t.duration_ms===0||!Array.isArray(t.shots)||t.shots.length===0)
  fail('Timeline needs positive integer duration_ms and nonempty shots');
 const ids=new Set();
 let cursor=0;
 for(const [i,s] of t.shots.entries()){
  if(!s||!nonempty(s.id)||!Number.isSafeInteger(s.revision)||s.revision<1
   ||!integer(s.start_ms)||!integer(s.end_ms)||s.end_ms<=s.start_ms)
   fail('Invalid timed shot at index '+i);
  const id=s.id+':'+s.revision;
  if(ids.has(id))fail('Duplicate timed shot revision: '+id);
  ids.add(id);
  if(s.start_ms>cursor+timelineEps)fail('Timeline gap before '+s.id+' at '+cursor+'ms');
  if(s.start_ms<cursor-timelineEps)fail('Timeline overlap before '+s.id+' at '+s.start_ms+'ms; explicit transition plan required');
  if(s.end_ms>t.duration_ms)fail('Shot extends past film duration: '+s.id);
  cursor=s.end_ms;
 }
 if(cursor!==t.duration_ms)fail('Timeline does not cover full film duration: '+cursor+'/'+t.duration_ms+'ms');
 return {valid:true,duration_ms:t.duration_ms,shot_count:t.shots.length,transition_mode:'CUTS_ONLY'};
}

function requirements(phase){
 switch(phase){
 case 'visual_bible':return ['script'];
 case 'storyboard':return ['script','visual_bible'];
 case 'sound':case 'generator':case 'generate':case 'review':case 'delivery':return ['script','visual_bible','storyboard'];
 default:return [];
 }
}
function validatePipeline(p){
 validateProject(p);
 if(!phases.includes(p.phase))fail('Unknown production phase');
 for(const gate of requirements(p.phase))if(!p.gates[gate].approved)fail('Production phase '+p.phase+' requires approved '+gate);
 if(phases.indexOf(p.phase)>=phases.indexOf('sound')){
  if(!p.shot_timeline)fail('A reconciled shot timeline is required before sound');
  validateTimeline(p.shot_timeline);
 }
 // No execution adapter exists: future phases cannot be asserted by manually changing phase.
 if(['generate','review','delivery'].includes(p.phase))fail('Media execution/review phases are not supported by this planning-only pipeline');
 return true;
}
function recordTimeline(p,{expected_revision,timeline}){
 validatePipeline(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(p.phase!=='storyboard'||p.gates.storyboard.approved)fail('Timeline revisions require storyboard planning before user approval');
 validateTimeline(timeline);
 const n=clone(p);n.shot_timeline=clone(timeline);n.revision++;
 return n;
}
function nextPhase(p,{expected_revision,to}){
 validatePipeline(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 const current=phases.indexOf(p.phase),target=phases.indexOf(to);
 if(target!==current+1)fail('Only forward single-step phase transitions are supported');
 if(to==='generate')fail('Production GO HOLD: no execution adapter or provider authorization is available');
 for(const gate of requirements(to))if(!p.gates[gate].approved)fail('Missing approval gate: '+gate);
 if(to==='sound'){
  if(!p.shot_timeline)fail('Storyboard timeline not supplied');
  validateTimeline(p.shot_timeline);
 }
 if(to==='generator'&&!p.shot_timeline)fail('No storyboard timeline');
 const n=clone(p);n.phase=to;n.revision++;return n;
}
function previewNextPhase(p){
 validatePipeline(p);
 const index=phases.indexOf(p.phase);
 if(index===phases.length-1)return {from:p.phase,to:null,allowed:false,reasons:['Already at terminal phase']};
 const to=phases[index+1],reasons=[];
 for(const gate of requirements(to))if(!p.gates[gate].approved)reasons.push('Missing approved '+gate);
 if(to==='sound'&&!p.shot_timeline)reasons.push('Missing reconciled storyboard timeline');
 else if(to==='sound'&&p.shot_timeline){try{validateTimeline(p.shot_timeline)}catch(e){reasons.push(e.message)}}
 if(to==='generate')reasons.push('Production GO HOLD; no authorized execution adapter');
 return {from:p.phase,to,allowed:reasons.length===0,reasons};
}
module.exports={phases,validateTimeline,validatePipeline,recordTimeline,nextPhase,previewNextPhase};

},
'budget-planner':function(module,exports,require){
'use strict';
// Pure budget proposal evaluation. No provider, filesystem, approval or spending side effects.
const fail=message=>{throw new Error(message);};
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const text=x=>typeof x==='string'&&x.trim().length>0;
const money=x=>Number.isSafeInteger(x)&&x>=0;
const currencies=new Set(['EUR','USD','GBP','TND','CAD','AUD','JPY','CHF']);
function planBudget(project,request){
 if(!object(project)||!text(project.project_id)||!Number.isSafeInteger(project.revision)||project.revision<1)fail('Invalid project');
 if(!object(project.authorization)||Object.values(project.authorization).some(v=>v!==false))fail('Budget planner requires operational HOLD');
 if(!object(request)||request.expected_revision!==project.revision)fail('Stale budget request');
 if(!currencies.has(request.currency)||!money(request.ceiling_minor))fail('Invalid currency or ceiling');
 if(!Array.isArray(request.shots)||request.shots.length===0)fail('Shot estimates required');
 const ids=new Set(),evaluated=[];let total=0,unknown=false;
 for(const shot of request.shots){
  if(!object(shot)||!text(shot.shot_id)||ids.has(shot.shot_id))fail('Invalid or duplicate shot ID');
  ids.add(shot.shot_id);
  if(!Array.isArray(shot.options)||shot.options.length===0)fail('Shot options required');
  const optionIds=new Set();
  const options=shot.options.map(option=>{
   if(!object(option)||!text(option.id)||optionIds.has(option.id))fail('Invalid or duplicate option');
   optionIds.add(option.id);
   if(!['MANUAL','LOCAL','MOCK','EXTERNAL'].includes(option.method))fail('Invalid production method');
   if(option.currency!==request.currency)fail('Mixed currency without explicit conversion');
   if(!['KNOWN','ESTIMATE','UNKNOWN'].includes(option.confidence))fail('Invalid cost confidence');
   if(!text(option.source)||!/^\d{4}-\d{2}-\d{2}$/.test(option.observed_on)||!Number.isFinite(Date.parse(option.observed_on+'T00:00:00Z')))fail('Missing cost source or date');
   if(option.confidence==='UNKNOWN'&&option.cost_minor!==null)fail('Unknown cost must be null');
   if(option.confidence!=='UNKNOWN'&&!money(option.cost_minor))fail('Invalid cost');
   return {id:option.id,method:option.method,currency:option.currency,cost_minor:option.cost_minor,confidence:option.confidence,source:option.source,observed_on:option.observed_on};
  });
  if(!text(shot.selected_option_id))fail('Selected option required');
  const chosen=options.find(o=>o.id===shot.selected_option_id);
  if(!chosen)fail('Selected option not found');
  if(chosen.cost_minor===null)unknown=true;
  else {total+=chosen.cost_minor;if(!Number.isSafeInteger(total))fail('Cost total overflow');}
  evaluated.push({shot_id:shot.shot_id,selected_option_id:chosen.id,selected:chosen,options});
 }
 const exceeds=total>request.ceiling_minor;
 return {project_id:project.project_id,input_revision:project.revision,status:unknown?'BLOCKED_UNKNOWN_COST':exceeds?'BLOCKED_OVER_BUDGET':'WITHIN_ESTIMATED_CEILING',
  currency:request.currency,ceiling_minor:request.ceiling_minor,known_selected_total_minor:total,
  remaining_minor:unknown||exceeds?null:request.ceiling_minor-total,has_unknown_cost:unknown,
  estimated_only:evaluated.some(s=>s.selected.confidence!=='KNOWN'),
  shots:evaluated,provider_execution_performed:false,spending_authorized:false,media_generated:false};
}
module.exports={planBudget};

},
'production-jobs':function(module,exports,require){
'use strict';
// Pure deterministic job records: no I/O, media generation or provider access.
const fail=m=>{throw Error(m)},obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),str=x=>typeof x==='string'&&x.trim().length>0;
const copy=x=>structuredClone(x);
function check(p,l){
 if(!obj(p)||!str(p.project_id)||!Number.isSafeInteger(p.revision)||!obj(p.authorization)||!['production_go','provider_job_allowed','publication_allowed'].every(k=>p.authorization[k]===false))fail('Operational HOLD required');
 if(!obj(l)||l.project_id!==p.project_id||l.project_revision!==p.revision||!Array.isArray(l.jobs))fail('Stale or invalid job ledger');
 const ids=new Set(),keys=new Set();
 for(const j of l.jobs){
  if(!obj(j)||!str(j.id)||!str(j.idempotency_key)||ids.has(j.id)||keys.has(j.idempotency_key)||!str(j.shot_id)||!['MOCK','LOCAL','MANUAL'].includes(j.method)||!['PLANNED','RUNNING_MOCK','FAILED_MOCK','COMPLETED_MOCK','RECORDED_EXTERNAL'].includes(j.status)||!Number.isSafeInteger(j.attempt)||j.attempt<0||!Array.isArray(j.artifacts))fail('Invalid or duplicate job');
  if(j.method!=='MOCK'&&!['PLANNED','RECORDED_EXTERNAL'].includes(j.status))fail('Non-mock execution forbidden');
  if(j.status==='COMPLETED_MOCK'&&(j.method!=='MOCK'||j.artifacts.length!==1))fail('Invalid mock completion');
  if(j.status!=='COMPLETED_MOCK'&&j.artifacts.length)fail('Unverified artifact state');
  for(const a of j.artifacts)if(!obj(a)||a.kind!=='MOCK_MANIFEST'||a.synthetic!==true||a.media_verified!==false||a.job_id!==j.id)fail('Fabricated media evidence');
  ids.add(j.id);keys.add(j.idempotency_key);
 }
 return true;
}
function newJobLedger(p){
 const l={project_id:p?.project_id,project_revision:p?.revision,jobs:[]};check(p,l);return l;
}
function planProductionJob(p,l,r){
 check(p,l);
 if(!obj(r)||!str(r.id)||!str(r.idempotency_key)||!str(r.shot_id)||!['MOCK','LOCAL','MANUAL'].includes(r.method))fail('Invalid job request');
 if(!Array.isArray(p.shots)||!p.shots.some(s=>s.id===r.shot_id))fail('Unknown shot');
 const existing=l.jobs.find(j=>j.idempotency_key===r.idempotency_key);
 if(existing){if(existing.id!==r.id||existing.method!==r.method||existing.shot_id!==r.shot_id)fail('Idempotency conflict');return copy(l);}
 if(l.jobs.some(j=>j.id===r.id))fail('Duplicate job ID');
 const n=copy(l);n.jobs.push({id:r.id,idempotency_key:r.idempotency_key,shot_id:r.shot_id,method:r.method,status:'PLANNED',attempt:0,artifacts:[]});return n;
}
function advanceMockJob(p,l,{job_id,action}){
 check(p,l);const n=copy(l),j=n.jobs.find(j=>j.id===job_id);
 if(!j||j.method!=='MOCK')fail('Only mock jobs advance');
 if(action==='START'&&['PLANNED','FAILED_MOCK'].includes(j.status)){j.status='RUNNING_MOCK';j.attempt++;return n;}
 if(action==='FAIL'&&j.status==='RUNNING_MOCK'){j.status='FAILED_MOCK';return n;}
 if(action==='COMPLETE'&&j.status==='RUNNING_MOCK'){j.status='COMPLETED_MOCK';j.artifacts=[{id:j.id+':'+j.attempt,job_id:j.id,kind:'MOCK_MANIFEST',synthetic:true,media_verified:false}];return n;}
 fail('Invalid mock transition');
}
function recordExternalArtifact(p,l,{job_id,artifact_ref}){
 check(p,l);if(!str(artifact_ref))fail('Artifact reference required');
 const n=copy(l),j=n.jobs.find(j=>j.id===job_id);
 if(!j||j.method==='MOCK'||j.status!=='PLANNED')fail('Manual/local planned job required');
 j.status='RECORDED_EXTERNAL';j.external_artifact={ref:artifact_ref,verified:false,origin:'USER_REPORTED'};return n;
}
module.exports={newJobLedger,planProductionJob,advanceMockJob,recordExternalArtifact};

},
'media-export-qa':function(module,exports,require){
'use strict';
// Pure evidence classification: declared metadata is not decoded media inspection.
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const positive=x=>Number.isSafeInteger(x)&&x>0;
const str=x=>typeof x==='string'&&x.trim().length>0;
function assessMediaExport({artifact,metadata,requirements,evidence}={}){
 const checks=[];
 const add=(name,status,reason)=>checks.push({name,status,reason});
 const mock=artifact?.kind==='MOCK_MANIFEST'||artifact?.synthetic===true;
 const provenance=artifact?.origin==='USER_REPORTED'||artifact?.origin==='DIRECT_INSPECTION';
 if(mock){add('provenance','GAP','Synthetic mock manifest is not playable media');}
 else if(!obj(artifact)||!str(artifact.ref)||!provenance){add('provenance','NOT_VERIFIED','No grounded artifact reference and origin');}
 else add('provenance','PASS','Artifact reference and origin declared; bytes not authenticated');
 const validMetadata=obj(metadata)&&positive(metadata.duration_ms)&&positive(metadata.width)&&positive(metadata.height)&&positive(metadata.frame_rate_num)&&positive(metadata.frame_rate_den)&&typeof metadata.has_audio==='boolean';
 const validRequirements=obj(requirements)&&positive(requirements.duration_ms)&&positive(requirements.width)&&positive(requirements.height)&&positive(requirements.frame_rate_num)&&positive(requirements.frame_rate_den)&&typeof requirements.audio_required==='boolean';
 if(!validMetadata||!validRequirements)add('metadata','NOT_VERIFIED','Complete duration, dimensions, frame rate and audio declarations required');
 else {
  add('duration',metadata.duration_ms===requirements.duration_ms?'PASS':'GAP','Declared duration comparison only');
  add('resolution',metadata.width===requirements.width&&metadata.height===requirements.height?'PASS':'GAP','Declared pixel dimensions comparison only');
  add('frame_rate',metadata.frame_rate_num*requirements.frame_rate_den===requirements.frame_rate_num*metadata.frame_rate_den?'PASS':'GAP','Declared rational frame-rate comparison only');
  add('audio',!requirements.audio_required||metadata.has_audio?'PASS':'GAP','Audio-track declaration only; content not heard');
 }
 const inspected=obj(evidence)&&evidence.kind==='DIRECT_INSPECTION'&&evidence.bytes_inspected===true&&str(evidence.inspection_ref);
 add('byte_inspection',mock?'GAP':inspected?'PASS':'NOT_VERIFIED',mock?'Synthetic manifest has no media bytes':inspected?'Independent inspection evidence supplied; not reproduced here':'No independent media inspection evidence');
 const creative=obj(evidence)&&evidence.creative_review==='PASS'&&str(evidence.creative_review_ref);
 add('creative_review',mock?'GAP':creative?'PASS':'NOT_VERIFIED',mock?'Mock has no visual/audio quality':creative?'Human review declared; not reproduced here':'No human visual/audio review evidence');
 const status=checks.some(c=>c.status==='GAP')?'GAP':checks.some(c=>c.status==='NOT_VERIFIED')?'NOT_VERIFIED':'PASS';
 return {status,checks,scope:'EVIDENCE_CLASSIFICATION_ONLY',media_generated:false,provider_invoked:false,export_performed:false,publication_authorized:false};
}
module.exports={assessMediaExport};

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
module.exports={...load('project-contracts'),...load('production-pipeline'),...load('budget-planner'),...load('production-jobs'),...load('media-export-qa')};
