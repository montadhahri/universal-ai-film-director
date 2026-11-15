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
'audio-continuity':function(module,exports,require){
'use strict';
// Pure planning validation and impact reports, no asset writes, approval, media or provider actions.
const {validateProject}=require('./project-contracts.js');
const {validateTimeline}=require('./production-pipeline.js');
const ok=x=>typeof x==='string'&&x.trim().length>0;
const safe=x=>Number.isSafeInteger(x)&&x>=0;
const fail=s=>{throw new Error(s)};
const copy=x=>structuredClone(x);
const tracks=new Set(['narration','dialogue','music','sfx','ambience']);
const statuses=new Set(['PLANNED','USER_SUPPLIED','GENERATED_UNVERIFIED']);
function validateAudioTimeline(t,picture){
 if(!t||!safe(t.duration_ms)||t.duration_ms===0||!Array.isArray(t.cues)||
  !Array.isArray(t.required_narration)||!Array.isArray(t.intentional_silence))
  fail('Audio timeline requires duration_ms, cues, required_narration and intentional_silence');
 if(picture){validateTimeline(picture);if(t.duration_ms!==picture.duration_ms)fail('Audio and picture duration mismatch')}
 const ids=new Set(),byTrack=new Map();
 for(const [i,c] of t.cues.entries()){
  if(!c||!ok(c.id)||!tracks.has(c.track)||!safe(c.start_ms)||!safe(c.end_ms)||
    c.end_ms<=c.start_ms||c.end_ms>t.duration_ms||!statuses.has(c.status))
   fail('Invalid audio cue at index '+i);
  if(ids.has(c.id))fail('Duplicate audio cue ID '+c.id);
  ids.add(c.id);
  const arr=byTrack.get(c.track)||[];arr.push(c);byTrack.set(c.track,arr);
 }
 // Overlap between different tracks is normal mixing; same-track overlap requires a future explicit layer model.
 for(const [track,cues] of byTrack){
  cues.sort((a,b)=>a.start_ms-b.start_ms||a.end_ms-b.end_ms);
  for(let i=1;i<cues.length;i++)if(cues[i].start_ms<cues[i-1].end_ms)
   fail('Same-track overlap in '+track+' between '+cues[i-1].id+' and '+cues[i].id);
 }
 const interval=(a,label)=>{if(!a||!safe(a.start_ms)||!safe(a.end_ms)||a.end_ms<=a.start_ms||
  a.end_ms>t.duration_ms)fail('Invalid '+label+' interval');};
 const silence=t.intentional_silence.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const s of silence)interval(s,'intentional silence');
 for(let i=1;i<silence.length;i++)if(silence[i].start_ms<silence[i-1].end_ms)fail('Overlapping silence intervals');
 // Intentional silence means no active cues of any track; validate that declaration rather than assuming it.
 for(const s of silence)for(const c of t.cues)
  if(c.start_ms<s.end_ms&&c.end_ms>s.start_ms)fail('Audio cue '+c.id+' overlaps intentional silence');
 const required=t.required_narration.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const r of required)interval(r,'required narration');
 for(let i=1;i<required.length;i++)if(required[i].start_ms<required[i-1].end_ms)fail('Overlapping required narration intervals');
 const narration=byTrack.get('narration')||[];
 for(const r of required){
  let covered=r.start_ms;
  for(const c of narration){
   if(c.end_ms<=covered||c.start_ms>=r.end_ms)continue;
   if(c.start_ms>covered)fail('Narration gap at '+covered+'ms');
   covered=Math.max(covered,Math.min(c.end_ms,r.end_ms));
   if(covered===r.end_ms)break;
  }
  if(covered<r.end_ms)fail('Narration gap at '+covered+'ms');
 }
 return {valid:true,duration_ms:t.duration_ms,cue_count:t.cues.length,required_narration_windows:required.length,
  intentional_silence_windows:silence.length,mixing_rule:'CROSS_TRACK_ALLOWED; SAME_TRACK_DISALLOWED'};
}
// Canonical references are kind:id. Legacy bare IDs are accepted only
// when exactly one node has that ID; ambiguous legacy references fail closed.
function resolveDependencyRef(ref,nodes) {
 const keys=nodes.map(n=>n.kind+':'+n.id);
 if(keys.includes(ref))return ref;
 const matches=nodes.filter(n=>n.id===ref);
 if(matches.length===1)return matches[0].kind+':'+matches[0].id;
 fail(matches.length>1?'Ambiguous dependency reference '+ref:'Dangling dependency reference '+ref);
}
function validateDependencyGraph(g){
 if(!g||!Array.isArray(g.nodes)||!Array.isArray(g.edges))fail('Dependency graph needs nodes and edges');
 const keys=new Set(),adj=new Map();
 for(const n of g.nodes){
  if(!n||!['shot','audio','anchor'].includes(n.kind)||!ok(n.id))fail('Invalid dependency node');
  const k=n.kind+':'+n.id;
  if(keys.has(k))fail('Duplicate dependency node '+k);
  keys.add(k);adj.set(k,[]);
 }
 const edges=new Set();
 for(const e of g.edges){
  if(!e||!ok(e.from)||!ok(e.to))fail('Dangling dependency reference');
  const from=resolveDependencyRef(e.from,g.nodes),to=resolveDependencyRef(e.to,g.nodes);
  const k=from+'->'+to;
  if(edges.has(k))fail('Duplicate dependency edge');
  edges.add(k);adj.get(from).push(to);
 }
 const states=new Map();
 const visit=k=>{
  if(states.get(k)===1)fail('Dependency cycle at '+k);
  if(states.get(k)===2)return;
  states.set(k,1);for(const next of adj.get(k))visit(next);states.set(k,2);
 };
 for(const k of keys)visit(k);
 return {valid:true,node_count:keys.size,edge_count:edges.size};
}
function recordAudioTimeline(p,{expected_revision,timeline}){
 validateProject(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(p.phase!=='sound')fail('Audio timeline may be recorded only during sound planning');
 if(!p.shot_timeline)fail('Approved picture timeline is required');
 if(!p.gates.storyboard.approved)fail('Storyboard approval required');
 if(p.audio_timeline)fail('Existing audio timeline cannot be silently overwritten; use a scoped repair proposal');
 validateAudioTimeline(timeline,p.shot_timeline);
 const n=copy(p);n.audio_timeline=copy(timeline);n.revision++;return n;
}
function previewRepairImpact(p,{expected_revision,target}){
 validateProject(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(!p.dependency_graph)fail('Dependency graph missing');
 validateDependencyGraph(p.dependency_graph);
 if(!ok(target))fail('Unknown repair target');
 let normalizedTarget;
 try{normalizedTarget=resolveDependencyRef(target,p.dependency_graph.nodes)}
 catch(err){if(err.message.startsWith('Dangling dependency reference'))fail('Unknown repair target');throw err;}
 if(p.shot_timeline)validateTimeline(p.shot_timeline);
 if(p.audio_timeline)validateAudioTimeline(p.audio_timeline,p.shot_timeline);
 const adj=new Map(p.dependency_graph.nodes.map(n=>[n.kind+':'+n.id,[]]));
 for(const e of p.dependency_graph.edges)adj.get(resolveDependencyRef(e.from,p.dependency_graph.nodes)).push(resolveDependencyRef(e.to,p.dependency_graph.nodes));
 const affected=new Set([normalizedTarget]),queue=[normalizedTarget];
 for(let i=0;i<queue.length;i++)for(const next of adj.get(queue[i]))
  if(!affected.has(next)){affected.add(next);queue.push(next)}
 const locked=p.shots.filter(s=>s.state==='LOCKED').map(s=>'shot:'+s.id);
 const candidateLocked=locked.filter(k=>affected.has(k));
 return {target:normalizedTarget,affected:[...affected].sort(),unaffected:p.dependency_graph.nodes.map(n=>n.kind+':'+n.id)
   .filter(k=>!affected.has(k)).sort(),affected_locked_shots:[...new Set(candidateLocked)].sort(),
   requires_scoped_unlock:candidateLocked.length>0,changed_assets:[],media_inspected:false,
   status:'IMPACT_PREVIEW_ONLY'};
}
module.exports={validateAudioTimeline,validateDependencyGraph,recordAudioTimeline,previewRepairImpact};

},
'smart-repair':function(module,exports,require){
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

}
module.exports={planSmartRepair};

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
module.exports={...load('project-contracts'),...load('memory-consistency'),...load('visual-continuity-assessment'),...load('production-pipeline'),...load('audio-continuity'),...load('smart-repair')};
