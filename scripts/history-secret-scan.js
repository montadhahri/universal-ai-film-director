#!/usr/bin/env node
// Conservative, dependency-free historical credential-pattern check.
// Never print matched values or blob contents. Not a substitute for a specialist scanner.
const {execFileSync, spawnSync} = require('node:child_process');
const {Buffer} = require('node:buffer');
const patterns = [
  ['GitHub token', /(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})/g],
  ['OpenAI-style secret', /sk-[A-Za-z0-9_-]{24,}/g],
  ['Google API key', /AIza[0-9A-Za-z_-]{30,}/g],
  ['Private key', /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g],
  ['AWS access key ID', /(?:AKIA|ASIA)[A-Z0-9]{16}/g],
  ['Credential assignment', /(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"'\r\n]{12,}["']/gi],
];
const objects = execFileSync('git',['rev-list','--objects','--all'],{encoding:'utf8',maxBuffer:64*1024*1024})
  .split('\n').filter(Boolean).map(x=>x.split(' ')[0]);
const unique=[...new Set(objects)];
let inspected=0, skipped=0, findings=0;
for(const oid of unique){
  const kind=spawnSync('git',['cat-file','-t',oid],{encoding:'utf8'});
  if(kind.status!==0) throw Error('Cannot inspect Git object');
  if(kind.stdout.trim()!=='blob') continue;
  const size=Number(execFileSync('git',['cat-file','-s',oid],{encoding:'utf8'}));
  if(size>2*1024*1024){skipped++;continue;}
  const blob=spawnSync('git',['cat-file','blob',oid],{maxBuffer:3*1024*1024});
  if(blob.status!==0) throw Error('Cannot read Git blob');
  if(blob.stdout.includes(0)){skipped++;continue;}
  inspected++;
  const s=blob.stdout.toString('utf8');
  for(const [name,re] of patterns){
    re.lastIndex=0;
    if(re.test(s)){
      findings++;
      // Object IDs and pattern categories only; never print matching secret text.
      // Keep historical object IDs out of public workflow logs.
    }
  }
}
// Commit messages and historical path names can also leak information even when
// the corresponding file contents are removed from the current checkout.
const log = execFileSync('git',['log','--all','--format=%H%x00%B%x00'],{encoding:'utf8',maxBuffer:64*1024*1024});
const paths = execFileSync('git',['log','--all','--name-only','--pretty=format:'],{encoding:'utf8',maxBuffer:64*1024*1024});
let metadataMatches=0;
for(const [scope,value] of [['commit metadata',log],['historical paths',paths]]) {
  for(const [name,re] of patterns) {
    re.lastIndex=0;
    if(re.test(value)) {
      metadataMatches++;
      findings++;
      // Details deliberately omitted from public logs.
    }
  }
}
console.log(JSON.stringify({metadata_pattern_categories:metadataMatches,scanned_text_blobs:inspected,skipped_large_or_binary_blobs:skipped,findings,limitations:'reachable refs only; pattern based; no media privacy, licensing or author metadata checks'}));
if(findings)process.exitCode=1;
