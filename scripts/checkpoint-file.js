'use strict';
// Offline, local-only checkpoint persistence. Not encrypted, authenticated,
// uploaded, backed up or suitable for storing secrets.
const fs=require('node:fs');
const path=require('node:path');
const {exportCheckpoint,importCheckpoint}=require('./checkpoint-envelope.js');
const fail=message=>{throw new Error(message)};
function saveCheckpointFile(filePath,project) {
 if(typeof filePath!=='string'||!filePath.trim())fail('Checkpoint file path required');
 const payload=exportCheckpoint(project);
 // Exclusive creation prevents silently overwriting an existing checkpoint.
 // Caller owns parent directory and must ensure its access controls.
 const fd=fs.openSync(filePath,'wx',0o600);
 try {
  fs.writeFileSync(fd,payload,{encoding:'utf8'});
  fs.fsyncSync(fd);
 }catch(error) {
  try{fs.closeSync(fd)}catch{}
  try{fs.unlinkSync(filePath)}catch{}
  throw error;
 }
 fs.closeSync(fd);
 return {path:path.resolve(filePath),bytes:Buffer.byteLength(payload),persisted:true,
  approval_authenticated:false,asset_files_verified:false};
}
function loadCheckpointFile(filePath) {
 if(typeof filePath!=='string'||!filePath.trim())fail('Checkpoint file path required');
 const stat=fs.statSync(filePath);
 if(!stat.isFile())fail('Checkpoint path must be a regular file');
 const result=importCheckpoint(fs.readFileSync(filePath,'utf8'));
 return {...result,persisted:true};
}
module.exports={saveCheckpointFile,loadCheckpointFile};
