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
'director-authority':function(module,exports,require){
'use strict';
// Deterministic authoring/ledger logic, NOT authentication, filesystem persistence,
// provider execution, media inspection or a substitute for reviewing user intent.
const {validateProject}=require('./project-contracts.js');
const clone=x=>structuredClone(x);
const ok=x=>typeof x==='string'&&x.trim().length>0;
const fail=msg=>{throw new Error(msg)};
const gateNames=new Set(['script','visual_bible','storyboard']);
const permissionKinds=new Set(['production_go','provider_job','publication']);
const getLedger=(p,key)=>Array.isArray(p[key])?p[key]:[];
function checkRevision(p,revision) {
 validateProject(p);
 if(revision!==p.revision)fail('Stale project revision; reload current checkpoint');
}
function evidenceOfUser(e) {
 if(!e||e.actor!=='USER'||!ok(e.source_ref)||!ok(e.quote))fail('Explicit USER evidence with source_ref and quote required');
 return clone({actor:'USER',source_ref:e.source_ref,quote:e.quote});
}
function scopeIsApproval(e) {
 const q=e.quote.trim();
 return /^(?:yes|yes[,. ]+i approve|approved|approve|i approve(?:\s|$)|i confirm(?:\s|$)|confirmed)$/i.test(q)
  || /\b(?:i approve|i confirm|approved by me)\b/i.test(q);
}
function proposeGate(p,{expected_revision,gate,version,artifact_ref,proposal_id}) {
 checkRevision(p,expected_revision);
 if(!gateNames.has(gate)||!ok(version)||!ok(artifact_ref)||!ok(proposal_id))fail('Invalid gate proposal');
 if(p.gates[gate].approved)fail('Previously approved gate requires a separate scoped revision workflow');
 if(getLedger(p,'gate_proposals').some(x=>x.proposal_id===proposal_id))fail('Duplicate gate proposal ID');
 if(getLedger(p,'gate_proposals').some(x=>x.gate===gate&&x.status==='PENDING'))fail('Resolve existing pending gate proposal first');
 const n=clone(p);
 n.gate_proposals=getLedger(n,'gate_proposals');
 n.gate_proposals.push({proposal_id,gate,version,artifact_ref,status:'PENDING',created_revision:p.revision});
 n.revision++;return n;
}
function approveGate(p,{expected_revision,proposal_id,evidence}) {
 checkRevision(p,expected_revision);
 const q=getLedger(p,'gate_proposals').find(x=>x.proposal_id===proposal_id&&x.status==='PENDING');
 if(!q)fail('No exact pending proposal to approve');
 const e=evidenceOfUser(evidence);
 if(!scopeIsApproval(e))fail('Ambiguous user reply; explicit approval needed');
 // A bare yes is only meaningful if exactly one item is pending overall.
 if(/^yes[.!]?$/i.test(e.quote.trim())&&getLedger(p,'gate_proposals').filter(x=>x.status==='PENDING').length!==1)
  fail('Ambiguous yes with multiple pending gates');
 const order=['script','visual_bible','storyboard'];
 const index=order.indexOf(q.gate);
 if(index>0 && !p.gates[order[index-1]].approved)fail('Earlier user approval gate is missing');
 const n=clone(p);n.gate_proposals=getLedger(n,'gate_proposals');
 const item=n.gate_proposals.find(x=>x.proposal_id===proposal_id);
 item.status='APPROVED';item.approved_evidence=e;
 n.gates[q.gate]={approved:true,version:q.version,evidence:e.source_ref};
 n.approval_ledger=getLedger(n,'approval_ledger');
 n.approval_ledger.push({kind:'GATE',gate:q.gate,proposal_id,version:q.version,artifact_ref:q.artifact_ref,evidence:e});
 n.revision++;return n;
}
function proposeLockedShotRevision(p,{expected_revision,shot_id,source_revision,new_revision,authorization_ref,evidence,reason}) {
 checkRevision(p,expected_revision);
 if(!ok(shot_id)||!Number.isInteger(source_revision)||!Number.isInteger(new_revision)||new_revision<=source_revision||!ok(reason)||!ok(authorization_ref))fail('Invalid scoped revision');
 const source=p.shots.find(s=>s.id===shot_id&&s.revision===source_revision);
 if(!source||source.state!=='LOCKED')fail('Only an existing LOCKED shot can be revised through scoped unlock');
 if(p.shots.some(s=>s.id===shot_id&&s.revision===new_revision))fail('New shot revision already exists');
 const e=evidenceOfUser(evidence);
 if(!/\b(?:unlock|revise|replace|change|repair|modify|allow)\b/i.test(e.quote)||!e.quote.includes(shot_id))
  fail('Scoped user authorization must explicitly identify affected shot');
 if(getLedger(p,'unlock_ledger').some(x=>x.authorization_ref===authorization_ref))fail('Duplicate authorization reference');
 const n=clone(p);n.unlock_ledger=getLedger(n,'unlock_ledger');
 n.unlock_ledger.push({authorization_ref,shot_id,source_revision,new_revision,reason,evidence:e});
 n.shots.push({id:shot_id,revision:new_revision,parent_revision:source_revision,state:'PROPOSED',
  continuity_refs:clone(source.continuity_refs),issues:[reason]});
 n.revision++;return n;
}
function recordPermission(p,{expected_revision,permission,scope,grant_id,evidence}) {
 checkRevision(p,expected_revision);
 if(!permissionKinds.has(permission)||!ok(scope)||!ok(grant_id))fail('Permission kind, scope and grant ID required');
 const e=evidenceOfUser(evidence);
 if(!/\b(?:authorize|authorise|permission|allow|approve|go ahead|you may)\b/i.test(e.quote))
  fail('Explicit permission statement required');
 if(getLedger(p,'permission_ledger').some(x=>x.grant_id===grant_id))fail('Duplicate permission grant ID');
 const n=clone(p);n.permission_ledger=getLedger(n,'permission_ledger');
 n.permission_ledger.push({grant_id,permission,scope,evidence,status:'RECORDED_ONLY'});
 // Intentional: grants document a user's statement. This library never changes
 // operational flags, invokes providers, connects accounts or publishes media.
 n.revision++;return n;
}
function resolveGraphRef(ref,nodes) {
 if(!ok(ref))return null;
 const canonical=nodes.filter(n=>n&&['shot','audio','anchor'].includes(n.kind)&&ok(n.id)).map(n=>({key:n.kind+':'+n.id,id:n.id}));
 if(canonical.some(n=>n.key===ref))return ref;
 const matches=canonical.filter(n=>n.id===ref);
 return matches.length===1?matches[0].key:null;
}
function inspectDependencyGraph(p) {
 const issues=[];
 if(!p.dependency_graph)return issues;
 const ids=new Set();
 for(const [i,node] of p.dependency_graph.nodes.entries()) {
  if(!node||!['shot','audio','anchor'].includes(node.kind)||!ok(node.id)) {
   issues.push({code:'INVALID_DEPENDENCY_NODE',index:i});continue;
  }
  const key=node.kind+':'+node.id;
  if(ids.has(key))issues.push({code:'DUPLICATE_DEPENDENCY_NODE',node_id:key});
  ids.add(key);
 }
 for(const [i,edge] of p.dependency_graph.edges.entries()) {
  if(!edge||!ok(edge.from)||!ok(edge.to)) {
   issues.push({code:'INVALID_DEPENDENCY_EDGE',index:i});continue;
  }
  if(!resolveGraphRef(edge.from,p.dependency_graph.nodes))issues.push({code:'MISSING_DEPENDENCY_ENDPOINT',index:i,endpoint:edge.from,side:'from'});
  if(!resolveGraphRef(edge.to,p.dependency_graph.nodes))issues.push({code:'MISSING_DEPENDENCY_ENDPOINT',index:i,endpoint:edge.to,side:'to'});
 }
 return issues;
}
function inspectApprovalLedger(p) {
 const issues=[];
 const ledger=getLedger(p,'approval_ledger');
 const proposals=getLedger(p,'gate_proposals');
 for(const gate of ['script','visual_bible','storyboard']) {
  const state=p.gates[gate];
  if(!state.approved)continue;
  const entries=ledger.filter(x=>x&&x.kind==='GATE'&&x.gate===gate);
  if(entries.length!==1) {
   issues.push({code:entries.length?'AMBIGUOUS_GATE_APPROVAL':'MISSING_GATE_APPROVAL_LEDGER',gate});
   continue;
  }
  const item=entries[0];
  if(item.version!==state.version||!item.evidence||item.evidence.source_ref!==state.evidence)
   issues.push({code:'GATE_APPROVAL_MISMATCH',gate});
  if(!item.evidence||item.evidence.actor!=='USER'||!ok(item.evidence.source_ref)||!ok(item.evidence.quote))
   issues.push({code:'INVALID_GATE_EVIDENCE',gate});
  const proposal=proposals.find(x=>x&&x.proposal_id===item.proposal_id&&x.gate===gate);
  if(!proposal||proposal.status!=='APPROVED'||proposal.version!==item.version||proposal.artifact_ref!==item.artifact_ref)
   issues.push({code:'GATE_PROPOSAL_MISMATCH',gate});
 }
 return issues;
}
// Read-only conservative impact report: graph edges are not assumed to encode
// propagation direction. Both endpoints are flagged for human reconciliation.
function inspectPendingShotRevisions(p) {
 const graph=p.dependency_graph;
 return p.shots.filter(s=>s.state==='PROPOSED'&&Number.isInteger(s.parent_revision)).map(s=>{
  const source=p.shots.find(x=>x.id===s.id&&x.revision===s.parent_revision&&x.state==='LOCKED');
  const neighbors=new Set();
  if(graph&&Array.isArray(graph.edges))for(const edge of graph.edges){
   if(!edge)continue;
   const from=resolveGraphRef(edge.from,graph.nodes),to=resolveGraphRef(edge.to,graph.nodes);
   if(from==='shot:'+s.id&&to)neighbors.add(to);
   if(to==='shot:'+s.id&&from)neighbors.add(from);
  }
  neighbors.delete('shot:'+s.id);
  return {shot_id:s.id,proposed_revision:s.revision,source_revision:s.parent_revision,
   source_locked:!!source,source_asset_ref:source?.approved_asset||null,
   related_node_ids:[...neighbors].sort(),requires_review:true};
 });
}
function inspectCheckpoint(p) {
 validateProject(p);
 const issues=[],g=['script','visual_bible','storyboard'];
 const next=g.find(x=>!p.gates[x].approved);
 if(next)issues.push('Missing approval: '+next);
 const locked=p.shots.filter(s=>s.state==='LOCKED').map(s=>({id:s.id,revision:s.revision,asset_ref:s.approved_asset}));
 const pending=getLedger(p,'gate_proposals').filter(x=>x.status==='PENDING').map(x=>({proposal_id:x.proposal_id,gate:x.gate,version:x.version}));
 const unresolved_issues=inspectDependencyGraph(p);
 const approval_integrity_issues=inspectApprovalLedger(p);
 const pending_shot_revisions=inspectPendingShotRevisions(p);
 if(pending_shot_revisions.length)issues.push('Pending scoped shot revisions require review: '+pending_shot_revisions.length);
 if(unresolved_issues.length)issues.push('Unresolved dependency graph issues: '+unresolved_issues.length);
 if(approval_integrity_issues.length)issues.push('Approval integrity issues: '+approval_integrity_issues.length);
 return {project_id:p.project_id,revision:p.revision,phase:p.phase,locked,pending,issues,unresolved_issues,approval_integrity_issues,pending_shot_revisions,
 next_safe_action:approval_integrity_issues.length?'Resolve approval integrity issues before continuing planning':next?'Resolve '+next+' approval':unresolved_issues.length?'Resolve dependency graph issues before continuing planning':pending_shot_revisions.length?'Review pending scoped shot revisions and related dependencies before continuing planning':'Continue planning only; verify separate permissions before any production or provider execution',
 provider_execution_performed:false,media_inspected:false,persisted:false};
}
function restoreCheckpoint(json) {
 let p;
 try{p=JSON.parse(json)}catch{fail('Invalid checkpoint JSON')}
 validateProject(p);
 return clone(p); // no implicit upload, saved file, provider access or approval
}
module.exports={proposeGate,approveGate,proposeLockedShotRevision,recordPermission,inspectCheckpoint,restoreCheckpoint};

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
'checkpoint-envelope':function(module,exports,require){
'use strict';
// Portable, deterministic checkpoint envelope. SHA-256 detects accidental modification,
// NOT malicious tampering, trusted provenance, or authenticated user consent.
const {createHash}=require('node:crypto');
const {validateProject}=require('./project-contracts.js');
const {inspectCheckpoint}=require('./director-authority.js');
const VERSION=1;
const fail=msg=>{throw new Error(msg)};
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
function canonical(value) {
 if(value===null||typeof value==='string'||typeof value==='boolean')return JSON.stringify(value);
 if(typeof value==='number'&&Number.isFinite(value))return JSON.stringify(value);
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value&&typeof value==='object'&&Object.getPrototypeOf(value)===Object.prototype)
  return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}';
 fail('Unsupported checkpoint data type');
}
const digest=project=>'sha256:'+createHash('sha256').update(canonical(project),'utf8').digest('hex');
function exportCheckpoint(project) {
 validateProject(project);
 const snapshot=JSON.parse(JSON.stringify(project));
 return JSON.stringify({envelope_version:VERSION,algorithm:'sha256-canonical-json-v1',project:snapshot,checksum:digest(snapshot)});
}
function importCheckpoint(json) {
 let e;
 try{e=JSON.parse(json)}catch{fail('Invalid checkpoint envelope JSON')}
 if(!e||typeof e!=='object'||Array.isArray(e)||Object.keys(e).sort().join(',')!=='algorithm,checksum,envelope_version,project')fail('Invalid checkpoint envelope');
 if(e.envelope_version!==VERSION||e.algorithm!=='sha256-canonical-json-v1'||typeof e.checksum!=='string')fail('Unsupported checkpoint envelope version or algorithm');
 validateProject(e.project);
 if(e.checksum!==digest(e.project))fail('Checkpoint checksum mismatch');
 const project=structuredClone(e.project);
 return {project,inspection:inspectCheckpoint(project),integrity_verified:true,approval_authenticated:false,asset_files_verified:false,persisted:false};
}
module.exports={exportCheckpoint,importCheckpoint};

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
module.exports={...load('project-contracts'),...load('director-authority'),...load('production-pipeline'),...load('checkpoint-envelope'),...load('audio-continuity')};
