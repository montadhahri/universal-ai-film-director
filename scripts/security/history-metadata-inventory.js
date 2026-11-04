#!/usr/bin/env node
// Aggregate-only historical binary/commit-metadata inventory. Not a privacy or license clearance.
// Never print paths, author identities, commit messages, blob hashes or file contents.
const {execFileSync,spawnSync}=require('node:child_process');
const run=(args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:128*1024*1024});
const objects=[...new Set(run(['rev-list','--objects','--all']).split('\n').filter(Boolean).map(s=>s.split(' ')[0]))];
const counts={git_objects_examined:objects.length,blob_count:0,text_blobs:0,binary_or_large_blobs:0,large_blobs:0,nul_containing_blobs:0,unreadable_blobs:0,total_binary_or_large_bytes:0,commit_count:0,commits_with_non_noreply_author_email:0,commits_with_non_noreply_committer_email:0,commit_message_pattern_hits:0};
const limit=2*1024*1024;
for(const oid of objects){
  const kind=run(['cat-file','-t',oid]).trim();
  if(kind!=='blob')continue;
  counts.blob_count++;
  const size=Number(run(['cat-file','-s',oid]).trim());
  if(size>limit){counts.large_blobs++;counts.binary_or_large_blobs++;counts.total_binary_or_large_bytes+=size;continue;}
  const data=spawnSync('git',['cat-file','blob',oid],{maxBuffer:limit+1024});
  if(data.status!==0){counts.unreadable_blobs++;continue;}
  if(data.stdout.includes(0)){counts.nul_containing_blobs++;counts.binary_or_large_blobs++;counts.total_binary_or_large_bytes+=size;}
  else counts.text_blobs++;
}
const raw=run(['log','--all','--format=%x00%ae%x00%ce%x00%B%x00%x01']);
const commits=raw.split('\x01').filter(x=>x.trim());
const metadataPattern=/(?:gh[pousr]_[a-zA-Z0-9_]{20,}|github_pat_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9_-]{24,}|AKIA[A-Z0-9]{16}|-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----)/;
for(const item of commits){
  const p=item.split('\x00');
  if(p.length<4)continue;
  counts.commit_count++;
  const email=(s)=>s.includes('@') && !/noreply/i.test(s);
  if(email(p[1]||''))counts.commits_with_non_noreply_author_email++;
  if(email(p[2]||''))counts.commits_with_non_noreply_committer_email++;
  if(metadataPattern.test(p.slice(3).join('\x00')))counts.commit_message_pattern_hits++;
}
console.log(JSON.stringify({status:'INVENTORY_ONLY_NOT_CLEARED',...counts,limitations:'Fetched reachable refs only. No content disclosure; cannot establish privacy, media rights, archive safety or existing Actions artifact safety.'}));
if(counts.unreadable_blobs||counts.commit_message_pattern_hits)process.exitCode=1;
