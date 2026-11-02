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
