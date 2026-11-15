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
'storytelling-preflight':function(module,exports,require){
'use strict';
// Lightweight structured pre-handoff review. It does NOT judge art, approve scripts,
// verify rendered media, or replace Director/user approvals.
const validText=x=>typeof x==='string'&&x.trim().length>0;
const positive=n=>Number.isSafeInteger(n)&&n>0;
const nonnegative=n=>Number.isSafeInteger(n)&&n>=0;
function intersects(a,b){return a.start_ms<b.end_ms&&b.start_ms<a.end_ms}
// Whitespace-token convention: contractions count as one word. No linguistic word segmentation claim.
function countNarrationWords(text){
 if(typeof text!=='string')throw Error('Narration text must be a string');
 return text.trim()?text.trim().split(/\s+/u).length:0;
}
function reviewDraft(d){
 if(!d||!positive(d.duration_ms)||!Array.isArray(d.beats)||d.beats.length===0||!Array.isArray(d.narration))
  throw Error('Draft requires positive duration_ms, nonempty beats, and narration array');
 const issues=[],warnings=[],ids=new Set();let cursor=0;
 const ordered=[];
 for(const [i,b] of d.beats.entries()){
  if(!b||!validText(b.id)||!nonnegative(b.start_ms)||!positive(b.end_ms)||b.end_ms<=b.start_ms||!validText(b.action))
   throw Error('Invalid beat '+i);
  if(ids.has(b.id))issues.push('Duplicate beat ID '+b.id);ids.add(b.id);
  if(b.start_ms>cursor)issues.push('Beat gap before '+b.id);
  if(b.start_ms<cursor)issues.push('Beat overlap before '+b.id);
  if(b.end_ms>d.duration_ms)issues.push('Beat exceeds film duration '+b.id);
  cursor=b.end_ms;ordered.push(b);
 }
 if(cursor!==d.duration_ms)issues.push('Beat plan does not cover requested duration');
 // Optional structured prop trace: explicit state changes need a transfer annotation.
 // This validates supplied annotations, not unstructured prose or rendered media.
 const previousProps=new Map();
 for(const b of ordered){
  if(b.prop_states===undefined)continue;
  if(!Array.isArray(b.prop_states))throw Error('Invalid prop states at '+b.id);
  const seenProps=new Set();
  for(const p of b.prop_states){
   if(!p||!validText(p.id)||!validText(p.location)||!validText(p.owner))
    throw Error('Invalid prop state at '+b.id);
   if(seenProps.has(p.id))issues.push('Duplicate prop state '+p.id+' at '+b.id);
   seenProps.add(p.id);
   const previous=previousProps.get(p.id);
   if(previous&&(previous.location!==p.location||previous.owner!==p.owner)&&
      !validText(p.transfer_from_previous))
    issues.push('Unexplained prop transfer '+p.id+' from '+previous.beat+' to '+b.id);
   previousProps.set(p.id,{beat:b.id,location:p.location,owner:p.owner});
  }
 }
 const narration=d.narration.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const [i,n] of narration.entries()){
  if(!n||!validText(n.text)||!nonnegative(n.start_ms)||!positive(n.end_ms)||n.end_ms<=n.start_ms||n.end_ms>d.duration_ms)
   throw Error('Invalid narration cue '+i);
  if(i&&intersects(narration[i-1],n))warnings.push('Narration cues overlap: verify delivery and sound handoff');
  const words=countNarrationWords(n.text);
  if(n.declared_word_count!==undefined){
   if(!nonnegative(n.declared_word_count))throw Error('Invalid declared narration word count '+i);
   if(n.declared_word_count!==words)issues.push('Narration word count mismatch at '+n.start_ms+': declared '+n.declared_word_count+', actual '+words);
  }
  if(!Number.isFinite(n.assumed_wpm)||n.assumed_wpm<=0)warnings.push('Narration speaking rate not documented at '+n.start_ms);
  else if(words/n.assumed_wpm*60000>n.end_ms-n.start_ms)
   issues.push('Narration does not fit estimated cue window at '+n.start_ms);
  // visual_attention is a human-labeled scene requirement, NOT video inspection.
  for(const b of ordered){
   if(b.visual_attention==='READ_TEXT'&&intersects(n,b))
    warnings.push('Narration competes with on-screen reading at beat '+b.id);
   else if(b.visual_attention==='SUBTLE_REACTION'&&intersects(n,b))
    warnings.push('Narration may compete with subtle reaction at beat '+b.id);
  }
 }
 if(nonnegative(d.max_narration_words)){
  const total=narration.reduce((sum,n)=>sum+countNarrationWords(n.text),0);
  if(total>d.max_narration_words)issues.push('Narration exceeds maximum word budget: '+total);
 }
 if(d.no_narration===true&&narration.length)issues.push('No-narration constraint violated');
 for(const b of ordered){
  const length=b.end_ms-b.start_ms;
  if(b.emotional_payoff===true&&length<3500)
   warnings.push('Emotional payoff may lack reaction time: '+b.id+' ('+length+'ms)');
  if(b.complex_action===true&&length<4000)
   warnings.push('Complex action may not fit: '+b.id+' ('+length+'ms)');
  if(b.visual_attention==='READ_TEXT'&&length<2500)
   warnings.push('On-screen text may not be readable: '+b.id);
 }
 if(!validText(d.opening_motif)||!validText(d.ending_payoff))
  warnings.push('Opening motif or earned final-image connection not documented');
 if(d.has_confirmed_rights===false)warnings.push('Confirm rights/consent before any external production');
 return {status:issues.length?'REVISION_REQUIRED':'READY_FOR_DIRECTOR_REVIEW',
  issues:[...new Set(issues)],warnings:[...new Set(warnings)],approval_granted:false,
  media_inspected:false,quality_proven:false,
  interpretation:'Structural checks and editorial prompts only. Creative merit and approval require human review.'};
}

/** Pre-draft timing feasibility. Exclusions prohibit narration and may overlap. */
function reviewBrief(brief){
 if(!brief||!positive(brief.duration_ms)||!nonnegative(brief.narration_words)||
    !Number.isFinite(brief.max_wpm)||brief.max_wpm<=0||
    !Array.isArray(brief.narration_exclusions))
  throw Error('Invalid timing brief');
 const intervals=brief.narration_exclusions.map((v,i)=>{
  if(!v||!nonnegative(v.start_ms)||!positive(v.end_ms)||
     v.end_ms<=v.start_ms||v.end_ms>brief.duration_ms)
   throw Error('Invalid exclusion '+i);
  return v;
 }).sort((a,b)=>a.start_ms-b.start_ms);
 let reserved=0,start=-1,end=-1;
 for(const v of intervals){
  if(start<0){start=v.start_ms;end=v.end_ms;}
  else if(v.start_ms<=end)end=Math.max(end,v.end_ms);
  else{reserved+=end-start;start=v.start_ms;end=v.end_ms;}
 }
 if(start>=0)reserved+=end-start;
 const available_ms=brief.duration_ms-reserved;
 const required_ms=brief.narration_words/brief.max_wpm*60000;
 return {status:required_ms<=available_ms?'FEASIBLE':'BLOCKED',
  available_ms,required_ms,reserved_ms:reserved,
  shortfall_ms:Math.max(0,required_ms-available_ms),
  approval_granted:false,media_inspected:false,
  interpretation:'Timing estimate only; pauses and actual synchronization unverified.'};
}
/** Declarative scope check, not a real diff or authorization verification. */
function reviewRevisionScope(change){
 if(!change||!Array.isArray(change.allowed_types)||
    !Array.isArray(change.changed_artifacts)||!Array.isArray(change.protected_versions))
  throw Error('Invalid revision scope');
 const issues=[];
 for(const a of change.changed_artifacts){
  if(!a||!validText(a.id)||!validText(a.type))throw Error('Invalid changed artifact');
  if(!change.allowed_types.includes(a.type))
   issues.push('Unauthorized artifact type: '+a.type+' ('+a.id+')');
  if(change.protected_versions.some(p=>p.id===a.id))
   issues.push('Protected approved artifact changed: '+a.id);
 }
 return {status:issues.length?'REVISION_REQUIRED':'READY_FOR_DIRECTOR_REVIEW',
  issues,approval_granted:false,media_inspected:false};
}
module.exports={reviewDraft,reviewBrief,reviewRevisionScope,countNarrationWords};

}
};
const cache=new Map();
function load(id){
 if(cache.has(id))return cache.get(id).exports;
 if(!Object.prototype.hasOwnProperty.call(factories,id))throw Error('Unknown bundled module: '+id);
 const module={exports:{}};cache.set(id,module);
 try{factories[id](module,module.exports,ref=>{
  if(!/^\.\/[-a-z]+\.js$/.test(ref))throw Error('External module forbidden: '+ref);
  return load(ref.slice(2,-3));
 });}catch(e){cache.delete(id);throw e;}
 return module.exports;
}
module.exports={...load('project-contracts'),...load('storytelling-preflight')};
