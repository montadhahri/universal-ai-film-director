#!/usr/bin/env node
// Offline-only pre-production validation; never invokes providers or publishing.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..');
const COMMANDS=[
 ['node-syntax',['--check','tests/behavior/evaluate.js']],
 ['protected-files',['tests/regression/check_preservation.js']],
 ['repo-structure',['tests/validate_repo.js']],
 ['regression-tests',['--test','tests/node/validation.test.js','tests/node/regression.test.js','tests/node/behavior.test.js','tests/node/preprod.test.js']],
 ['synthetic-fixtures',['tests/behavior/evaluate.js','--json-out','build/behavior-report.json']]
];
function run(out=path.join(ROOT,'build/preprod-validation.json')) {
 const checks=[];
 for (const [name,args] of COMMANDS) {
  const proc=spawnSync(process.execPath,args,{cwd:ROOT,encoding:'utf8',timeout:120000,maxBuffer:8*1024*1024});
  const timedOut=proc.error?.code==='ETIMEDOUT';
  const result={name,passed:proc.status===0&&!proc.error,exit_code:proc.status,stdout_tail:(proc.stdout||'').slice(-3000),stderr_tail:(proc.stderr||'').slice(-3000)};
  if (timedOut) {result.passed=false;result.error='Timed out after 120 seconds';}
  else if (proc.error) {result.passed=false;result.error=proc.error.message;}
  checks.push(result);
 }
 const report={
  report_schema:'preprod-validation-v1',
  timestamp_utc:new Date().toISOString(),
  repository:'montadhahri/universal-ai-film-director',
  release_authorized:false,production_go:false,repository_visibility_change:false,
  agent_executed:false,video_generated:false,checks,
  passed:checks.every(x=>x.passed),
  limitations:['Offline validation only; does not prove agent behavior','No private npx installation or generator test executed','Real-agent and real-media sign-off remain manual']
 };
 fs.mkdirSync(path.dirname(out),{recursive:true});
 fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
 for (const item of checks) {console.log((item.passed?'PASS':'FAIL')+': '+item.name);if(!item.passed)console.log(item.stderr_tail||item.error||'');}
 console.log('Report:',out);
 return report.passed?0:1;
}
function main(argv=process.argv.slice(2)) {
 if (!argv.length) return run();
 if (argv.length===2&&argv[0]==='--out') return run(argv[1]);
 throw new Error('Usage: node tests/preprod/run_validation.js [--out report.json]');
}
if(require.main===module) {try {process.exitCode=main();}catch(e){console.error(e.message);process.exitCode=2;}}
module.exports={run,COMMANDS,main};
