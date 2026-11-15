'use strict';
// Optional recovery bundle: legacy checkpoint format remains unchanged.
const {createHash}=require('node:crypto');
const {exportCheckpoint,importCheckpoint}=require('./checkpoint-envelope.js');
const {validateJobLedger}=require('./production-jobs.js');
const fail=m=>{throw Error(m)};
const digest=s=>'sha256:'+createHash('sha256').update(s,'utf8').digest('hex');
function exportRecoveryBundle(project,ledger){
 validateJobLedger(project,ledger);
 const checkpoint=exportCheckpoint(project);
 const jobs=JSON.stringify(structuredClone(ledger));
 const payload={bundle_version:1,checkpoint,job_ledger:jobs};
 return JSON.stringify({...payload,checksum:digest(JSON.stringify(payload))});
}
function importRecoveryBundle(json){
 let bundle;
 try{bundle=JSON.parse(json)}catch{fail('Invalid recovery bundle JSON')}
 if(!bundle||typeof bundle!=='object'||Array.isArray(bundle)||Object.keys(bundle).sort().join(',')!=='bundle_version,checkpoint,checksum,job_ledger')fail('Invalid recovery bundle');
 if(bundle.bundle_version!==1||typeof bundle.checkpoint!=='string'||typeof bundle.job_ledger!=='string'||typeof bundle.checksum!=='string')fail('Unsupported recovery bundle');
 const payload={bundle_version:bundle.bundle_version,checkpoint:bundle.checkpoint,job_ledger:bundle.job_ledger};
 if(bundle.checksum!==digest(JSON.stringify(payload)))fail('Recovery bundle checksum mismatch');
 const restored=importCheckpoint(bundle.checkpoint);
 let ledger;
 try{ledger=JSON.parse(bundle.job_ledger)}catch{fail('Invalid recovery job ledger')}
 validateJobLedger(restored.project,ledger);
 return {...restored,job_ledger:structuredClone(ledger),job_ledger_integrity_verified:true,job_ledger_persisted:false,job_execution_resumed:false,media_inspected:false};
}
module.exports={exportRecoveryBundle,importRecoveryBundle};
