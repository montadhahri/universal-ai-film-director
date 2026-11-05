'use strict';
// Research-only local checkpoint. Never stores authorization as executable permission.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {digest}=require('./mock-executor.js');
const VERSION=1;
const STATES=new Set(['AUTHORIZED','RUNNING','VALIDATING','COMPLETED','FAILED','BLOCKED','CANCELLED']);
function checkpoint(project,file) {
  if (!project || !Array.isArray(project.jobs) || !Array.isArray(project.events)) throw Error('INVALID_PROJECT');
  if (typeof file!=='string' || !file.trim()) throw Error('INVALID_PATH');
  const state=JSON.parse(JSON.stringify(project));
  const payload={version:VERSION,state};
  const envelope={payload,checksum:digest(payload)};
  const dir=path.dirname(path.resolve(file));
  const tmp=path.join(dir,'.'+path.basename(file)+'.'+crypto.randomBytes(8).toString('hex')+'.tmp');
  try {
    fs.writeFileSync(tmp,JSON.stringify(envelope),{encoding:'utf8',flag:'wx',mode:0o600});
    fs.renameSync(tmp,file);
  } finally { try { fs.unlinkSync(tmp); } catch(e) { if (e.code!=='ENOENT') throw e; } }
}
function restore(file) {
  const envelope=JSON.parse(fs.readFileSync(file,'utf8'));
  if (!envelope || !envelope.payload || envelope.payload.version!==VERSION ||
      envelope.checksum!==digest(envelope.payload)) throw Error('INVALID_CHECKPOINT');
  const state=envelope.payload.state;
  if (!state || typeof state.project_id!=='string' || typeof state.approved_revision!=='string' ||
      !Array.isArray(state.jobs) || !Array.isArray(state.events) ||
      !state.locked || typeof state.locked!=='object' ||
      !Number.isFinite(state.budget_limit) || !Number.isFinite(state.spent) ||
      state.budget_limit<0 || state.spent<0 || state.spent>state.budget_limit) throw Error('INVALID_CHECKPOINT');
  const keys=new Set();
  for (const job of state.jobs) {
    if (!job || !STATES.has(job.status) || typeof job.idempotency_key!=='string' ||
        keys.has(job.idempotency_key) || !job.request ||
        job.request.project_id!==state.project_id || job.request.shot_id!==job.shot_id ||
        job.request.approved_revision!==state.approved_revision ||
        job.fingerprint!==digest(job.request) ||
        !Number.isInteger(job.attempts) || job.attempts<0) throw Error('INVALID_CHECKPOINT');
    keys.add(job.idempotency_key);
  }
  // Always fail closed: checkpointed approval is not an active execution grant.
  state.production_go=false;
  for (const job of state.jobs) {
    if (['AUTHORIZED','RUNNING','VALIDATING'].includes(job.status)) {
      job.status='BLOCKED';job.reason='RECOVERY_REQUIRES_NEW_AUTHORIZATION';
      state.events.push({event:'RECOVERY_BLOCKED',shot_id:job.shot_id});
    }
  }
  return state;
}
module.exports={checkpoint,restore};
