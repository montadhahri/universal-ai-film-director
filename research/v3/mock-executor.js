'use strict';

// Research-only deterministic mock executor. No network, filesystem or provider calls.
const crypto = require('node:crypto');
const SHOTS = Object.freeze(['SH01','SH02','SH03','SH04','SH05']);
const TERMINAL = new Set(['COMPLETED','FAILED','BLOCKED','CANCELLED']);
function digest(value) { return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex'); }
function createProject() {
  return {project_id:'the-last-light-research', approved_revision:'storyboard-v1', production_go:false,
    budget_limit:0, spent:0, locked:{SH01:'original-locked-asset'}, jobs:[], events:[]};
}
function validApproval(project, request, approval, retryRequired=false) {
  return Boolean(project.production_go && approval && approval.granted === true &&
    approval.project_id === request.project_id && approval.shot_id === request.shot_id &&
    approval.approved_revision === request.approved_revision &&
    approval.operation === request.operation && approval.adapter === request.adapter &&
    Number.isFinite(approval.max_cost) && approval.max_cost >= request.cost &&
    typeof approval.evidence_ref === 'string' && approval.evidence_ref.trim() &&
    (!retryRequired || approval.retry === true));
}
function submit(project, request, approval) {
  if (!SHOTS.includes(request.shot_id)) throw Error('UNKNOWN_SHOT');
  if (request.project_id !== project.project_id || request.approved_revision !== project.approved_revision) throw Error('STALE_OR_WRONG_REVISION');
  if (request.adapter !== 'mock' || request.operation !== 'mock-render') throw Error('UNSUPPORTED_ADAPTER');
  if (!Number.isFinite(request.cost) || request.cost < 0 || request.cost > 0) throw Error('BUDGET_EXCEEDED');
  if (project.spent + request.cost > project.budget_limit) throw Error('BUDGET_EXCEEDED');
  if (project.locked[request.shot_id]) throw Error('LOCKED_SHOT');
  if (!request.idempotency_key || !request.output_requirements) throw Error('INVALID_REQUEST');
  const fingerprint = digest(request);
  const existing = project.jobs.find(j=>j.idempotency_key===request.idempotency_key);
  if (existing) {
    if (existing.fingerprint!==fingerprint) throw Error('IDEMPOTENCY_CONFLICT');
    // A blocked request cannot be upgraded by resubmission; require a new reviewed request.
    return existing;
  }
  const authorized = validApproval(project, request, approval);
  const job={idempotency_key:request.idempotency_key,shot_id:request.shot_id,
    fingerprint,request:Object.freeze({...request,output_requirements:Object.freeze({...request.output_requirements})}),status:authorized?'AUTHORIZED':'BLOCKED',attempts:0,
    result_evidence:null,reason:authorized?null:'MISSING_EXPLICIT_EXECUTION_AUTHORIZATION'};
  project.jobs.push(job);project.events.push({event:'SUBMITTED',shot_id:job.shot_id,status:job.status});
  return job;
}
function runMock(project, job, options={}) {
  if (!project.jobs.includes(job) || !project.production_go || project.locked[job.shot_id] ||
      job.request.approved_revision!==project.approved_revision || job.status!=='AUTHORIZED') throw Error('JOB_NOT_AUTHORIZED');
  job.status='RUNNING';job.attempts++;
  if (options.fail) { job.status='FAILED';job.reason='SIMULATED_FAILURE';return job; }
  job.status='VALIDATING';
  const artifact={uri:'mock://'+project.project_id+'/'+job.shot_id+'/'+job.idempotency_key,
    kind:'simulated',not_rendered:true,checksum:digest({shot_id:job.shot_id,request:job.fingerprint})};
  job.result_evidence=artifact;job.status='COMPLETED';job.reason=null;
  project.events.push({event:'COMPLETED',shot_id:job.shot_id,checksum:artifact.checksum});
  return job;
}
function cancel(project,job,reason='USER_CANCELLED') {
  if (!project.jobs.includes(job)) throw Error('UNKNOWN_JOB');
  if (job.status==='CANCELLED') return job;
  if (TERMINAL.has(job.status)) throw Error('CANNOT_CANCEL_TERMINAL_JOB');
  if (typeof reason!=='string' || !reason.trim()) throw Error('INVALID_CANCEL_REASON');
  job.status='CANCELLED';job.reason=reason;
  project.events.push({event:'CANCELLED',shot_id:job.shot_id,reason});
  return job;
}
function retry(project,job,approval) {
  if (job.status!=='FAILED') throw Error('RETRY_REQUIRES_FAILURE');
  if (!project.jobs.includes(job) || project.locked[job.shot_id] ||
      !validApproval(project, job.request, approval, true)) throw Error('RETRY_NOT_AUTHORIZED');
  job.status='AUTHORIZED';job.reason=null;project.events.push({event:'RETRY_AUTHORIZED',shot_id:job.shot_id});
  return job;
}
module.exports={SHOTS,TERMINAL,createProject,submit,runMock,retry,cancel,digest};
