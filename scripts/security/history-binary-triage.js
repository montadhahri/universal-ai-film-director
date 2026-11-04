#!/usr/bin/env node
// Aggregate-only format triage. This is NOT content, privacy, or rights clearance.
// Never print object IDs, historical filenames, raw contents, or embedded metadata.
const {execFileSync,spawnSync}=require('node:child_process');
const git=(args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:128*1024*1024}).trim();
const ids=[...new Set(git(['rev-list','--objects','--all']).split('\n').filter(Boolean).map(x=>x.split(' ')[0]))];
const cutoff=2*1024*1024, maxRead=64*1024*1024;
const result={status:'TRIAGE_ONLY_NOT_CLEARED',binary_or_large_blobs:0,large_blobs:0,nul_containing_small_blobs:0,formats:{png:0,jpeg:0,mp4_or_iso_bmff:0,pdf:0,zip:0,wav:0,other_or_unknown:0},not_fully_read:0,read_errors:0};
for(const oid of ids){
  if(git(['cat-file','-t',oid])!=='blob')continue;
  const size=Number(git(['cat-file','-s',oid]));
  if(!Number.isSafeInteger(size)||size<0){result.read_errors++;continue;}
  if(size>maxRead){result.binary_or_large_blobs++;result.large_blobs++;result.not_fully_read++;result.formats.other_or_unknown++;continue;}
  const r=spawnSync('git',['cat-file','blob',oid],{maxBuffer:size+1024});
  if(r.status!==0||r.error){result.read_errors++;continue;}
  const b=r.stdout;
  const large=size>cutoff, binary=b.includes(0);
  if(!large&&!binary)continue;
  result.binary_or_large_blobs++;
  if(large)result.large_blobs++;else result.nul_containing_small_blobs++;
  const ascii=(start,length)=>b.subarray(start,start+length).toString('ascii');
  let type='other_or_unknown';
  if(b.length>=8&&b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))type='png';
  else if(b.length>=3&&b[0]===255&&b[1]===216&&b[2]===255)type='jpeg';
  else if(ascii(4,4)==='ftyp')type='mp4_or_iso_bmff';
  else if(ascii(0,5)==='%PDF-')type='pdf';
  else if(ascii(0,2)==='PK')type='zip';
  else if(ascii(0,4)==='RIFF'&&ascii(8,4)==='WAVE')type='wav';
  result.formats[type]++;
}
console.log(JSON.stringify({...result,limitations:'Signature classification only. No file contents, private metadata, embedded image/audio/video inspection, rights verification, artifacts, or unreachable refs reviewed.'}));
if(result.read_errors||result.not_fully_read)process.exitCode=1;
