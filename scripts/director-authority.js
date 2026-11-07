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
function inspectDependencyGraph(p) {
 const issues=[];
 if(!p.dependency_graph)return issues;
 const ids=new Set();
 for(const [i,node] of p.dependency_graph.nodes.entries()) {
  if(!node||!['shot','audio','anchor'].includes(node.kind)||!ok(node.id)) {
   issues.push({code:'INVALID_DEPENDENCY_NODE',index:i});continue;
  }
  if(ids.has(node.id))issues.push({code:'DUPLICATE_DEPENDENCY_NODE',node_id:node.id});
  ids.add(node.id);
 }
 for(const [i,edge] of p.dependency_graph.edges.entries()) {
  if(!edge||!ok(edge.from)||!ok(edge.to)) {
   issues.push({code:'INVALID_DEPENDENCY_EDGE',index:i});continue;
  }
  if(!ids.has(edge.from))issues.push({code:'MISSING_DEPENDENCY_ENDPOINT',index:i,endpoint:edge.from,side:'from'});
  if(!ids.has(edge.to))issues.push({code:'MISSING_DEPENDENCY_ENDPOINT',index:i,endpoint:edge.to,side:'to'});
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
function inspectCheckpoint(p) {
 validateProject(p);
 const issues=[],g=['script','visual_bible','storyboard'];
 const next=g.find(x=>!p.gates[x].approved);
 if(next)issues.push('Missing approval: '+next);
 const locked=p.shots.filter(s=>s.state==='LOCKED').map(s=>({id:s.id,revision:s.revision,asset_ref:s.approved_asset}));
 const pending=getLedger(p,'gate_proposals').filter(x=>x.status==='PENDING').map(x=>({proposal_id:x.proposal_id,gate:x.gate,version:x.version}));
 const unresolved_issues=inspectDependencyGraph(p);
 const approval_integrity_issues=inspectApprovalLedger(p);
 if(unresolved_issues.length)issues.push('Unresolved dependency graph issues: '+unresolved_issues.length);
 if(approval_integrity_issues.length)issues.push('Approval integrity issues: '+approval_integrity_issues.length);
 return {project_id:p.project_id,revision:p.revision,phase:p.phase,locked,pending,issues,unresolved_issues,approval_integrity_issues,
 next_safe_action:approval_integrity_issues.length?'Resolve approval integrity issues before continuing planning':next?'Resolve '+next+' approval':unresolved_issues.length?'Resolve dependency graph issues before continuing planning':'Continue planning only; verify separate permissions before any production or provider execution',
 provider_execution_performed:false,media_inspected:false,persisted:false};
}
function restoreCheckpoint(json) {
 let p;
 try{p=JSON.parse(json)}catch{fail('Invalid checkpoint JSON')}
 validateProject(p);
 return clone(p); // no implicit upload, saved file, provider access or approval
}
module.exports={proposeGate,approveGate,proposeLockedShotRevision,recordPermission,inspectCheckpoint,restoreCheckpoint};
