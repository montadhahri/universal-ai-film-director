#!/usr/bin/env node
'use strict';
// Verify copied CLI installation contains exactly the approved skill payload.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
function files(folder,base=folder){
 const output=[];
 for(const e of fs.readdirSync(folder,{withFileTypes:true})){
  const full=path.join(folder,e.name);
  if(e.isSymbolicLink())throw new Error('Installed symlink unexpected with --copy: '+full);
  if(e.isDirectory())output.push(...files(full,base));
  else if(e.isFile())output.push(path.relative(base,full).split(path.sep).join('/'));
  else throw new Error('Unexpected installed entry: '+full);
 }
 return output.sort();
}
function check(source,dest){
 const expected=files(source);
 const actual=files(dest);
 assert.deepEqual(actual,expected,'CLI installed extra or missing files');
 for(const rel of expected)assert(fs.readFileSync(path.join(source,rel)).equals(fs.readFileSync(path.join(dest,rel))),'Installed bytes differ: '+rel);
 for(const forbidden of ['tests/','examples/','.github/','docs/ROADMAP.md','README.md','CHANGELOG.md','CONTRIBUTING.md']){
  assert(!actual.some(x=>x===forbidden||x.startsWith(forbidden)),'Forbidden installed entry: '+forbidden);
 }
 assert(actual.includes('SKILL.md'));
 const report={kind:'local-skills-cli-smoke',source_files:expected.length,installed_files:actual.length,installed_exact_match:true,development_files_installed:false,authenticated_private_remote_tested:false,agent_executed:false,video_generated:false,production_go:false};
 console.log(JSON.stringify(report,null,2));
 return report;
}
if(require.main===module){
 try{if(process.argv.length!==4)throw new Error('Usage: node tests/installation/check-installed.js SOURCE_DIR INSTALLED_DIR');check(process.argv[2],process.argv[3]);}
 catch(e){console.error(e.stack);process.exitCode=1;}
}
module.exports={check,files};
