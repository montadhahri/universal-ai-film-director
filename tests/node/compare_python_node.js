#!/usr/bin/env node
'use strict';
// Evidence gate: compare Python and Node evaluator reports for identical transcripts.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {spawnSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..');
const PY=process.env.PYTHON||'python3';
function invoke(cmd,args) {
 const p=spawnSync(cmd,args,{cwd:ROOT,encoding:'utf8',timeout:120000});
 if(p.error)throw new Error(cmd+': '+p.error.message);
 return {exit:p.status,stdout:p.stdout,stderr:p.stderr};
}
function normalized(report){
 return {suite:report.suite,model_executed:report.model_executed,total:report.total,passed:report.passed,failed:report.failed,
 results:report.results.map(x=>({file:x.file,scenario:x.scenario??null,provenance:x.provenance??null,passed:x.passed,errors:x.errors}))};
}
function compare(dir,strict=false){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'film-parity-'));
 try {
  const a=path.join(tmp,'python.json'),b=path.join(tmp,'node.json');
  const common=['--transcripts',dir,...(strict?['--strict']:[])];
  const py=invoke(PY,['tests/behavior/evaluate.py',...common,'--json-out',a]);
  const node=invoke(process.execPath,['tests/behavior/evaluate.js',...common,'--json-out',b]);
  if(!fs.existsSync(a)||!fs.existsSync(b))throw new Error('Missing report from one evaluator');
  const p=normalized(JSON.parse(fs.readFileSync(a,'utf8'))),n=normalized(JSON.parse(fs.readFileSync(b,'utf8')));
  if(JSON.stringify(p)!==JSON.stringify(n))throw new Error('Python/Node report mismatch: '+JSON.stringify({python:p,node:n}));
  if(py.exit!==node.exit)throw new Error('Python/Node exit mismatch: '+py.exit+' vs '+node.exit);
  return {total:p.total,failed:p.failed,exit:py.exit,strict};
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
}
function writeCase(dir,file,scenario,content,extra={}){
 fs.writeFileSync(path.join(dir,file),JSON.stringify({scenario,messages:[{role:'user',content:'Test'},{role:'assistant',content}],...extra}));
}
function main(){
 const results=[];
 results.push({name:'positive-fixtures',...compare(path.join(ROOT,'tests/behavior/fixtures'))});
 results.push({name:'strict-fixtures',...compare(path.join(ROOT,'tests/behavior/fixtures'),true)});
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'film-parity-cases-'));
 try{
  writeCase(tmp,'01-discovery.json','discovery_one_question','What genre? What duration?');
  writeCase(tmp,'02-script.json','script_approval_gate','Rendered successfully');
  writeCase(tmp,'03-locked.json','locked_shot_preservation','Regenerate all shots, including locked shot');
  writeCase(tmp,'04-unseen.json','no_unseen_media_claim','I watched the video');
  writeCase(tmp,'05-audio.json','audio_only_repair','Fix the audio only');
  writeCase(tmp,'06-unknown.json','not_a_scenario','Hello');
  fs.writeFileSync(path.join(tmp,'07-malformed.json'),'{broken');
  fs.writeFileSync(path.join(tmp,'08-missing-assistant.json'),JSON.stringify({scenario:'resume_from_checkpoint',messages:[{role:'user',content:'Continue'}]}));
  results.push({name:'negative-and-malformed',...compare(tmp)});
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
 const report={schema:'python-node-parity-v1',model_executed:false,video_generated:false,production_go:false,
 comparisons:results,passed:results.every(x=>x.name==='positive-fixtures'?x.exit===0:x.exit!==0)};
 const out=path.join(ROOT,'build/python-node-parity.json');
 fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
 for(const r of results)console.log(r.name+': '+r.total+' cases, '+r.failed+' failures, exit '+r.exit);
 console.log('Parity report:',out,'PASS:',report.passed);
 return report.passed?0:1;
}
if(require.main===module){try{process.exitCode=main();}catch(e){console.error(e.stack);process.exitCode=1;}}
module.exports={normalized,compare,main};
