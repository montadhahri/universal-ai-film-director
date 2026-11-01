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
 if (!Array.isArray(p.shots)||!Array.isArray(p.decisions)||!Array.isArray(p.continuity)||!Array.isArray(p.proposals)) reject('Missing project collections');
 const keys=new Set();
 for (const s of p.shots) {
  if(!isObject(s)||!nonempty(s.id)||!Number.isInteger(s.revision)||s.revision<1||!states.has(s.state))reject('Invalid shot');
  const key=s.id+':'+s.revision;if(keys.has(key))reject('Duplicate shot revision');keys.add(key);
  if(s.state==='LOCKED'&&!nonempty(s.approved_asset))reject('LOCKED shot requires approved asset');
 }
 if(p.shot_timeline!==undefined){
  const t=p.shot_timeline;
  if(!isObject(t)||!Number.isSafeInteger(t.duration_ms)||t.duration_ms<1||!Array.isArray(t.shots))reject('Invalid shot timeline shape');
 }
 if (!isObject(p.authorization)||!['production_go','provider_job_allowed','publication_allowed'].every(k=>p.authorization[k]===false))reject('No operational authorization without separate execution adapter');
 for(const key of ['gate_proposals','approval_ledger','unlock_ledger','permission_ledger'])if(p[key]!==undefined&&!Array.isArray(p[key]))reject('Invalid authority ledger: '+key);
 return true;
}
function validateProposal(p,q) {
 validateProject(p);
 if(!isObject(q)||q.contract_version!=='2.0'||q.status!=='PROPOSED'||!nonempty(q.request_id)||!origins.has(q.origin))reject('Invalid specialist proposal');
 if(q.project_id!==p.project_id)reject('Project mismatch');
 if(q.input_revision!==p.revision)reject('Stale proposal');
 if(!isObject(q.proposed_artifact)||!nonempty(q.proposed_artifact.id)||!nonempty(q.proposed_artifact.kind)||!Number.isInteger(q.proposed_artifact.revision)||q.proposed_artifact.revision<1)reject('Invalid proposed artifact');
 if(!isObject(q.provenance)||q.provenance.kind!=='AGENT_DRAFT')reject('Specialist cannot claim inspection or user approval');
 if(!Array.isArray(q.required_authorization))reject('Required authorization list missing');
 if(p.proposals.some(prev=>prev.request_id===q.request_id))reject('Duplicate request ID');
 return true;
}
function recordProposal(p,q) {
 validateProposal(p,q);const next=clone(p);next.proposals.push(clone(q));next.revision++;
 return next; // no gate, media, lock, spending or publication mutation
}
module.exports={newProject,validateProject,validateProposal,recordProposal};
