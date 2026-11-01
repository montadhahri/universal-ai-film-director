'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'../..');
const PACKAGE=path.join(ROOT,'skills/universal-ai-film-director');
const DIRS=['adapters','engine','references','schemas','templates'];
function list(dir,base){
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const absolute=path.join(dir,e.name);
  if(e.isSymbolicLink())throw new Error('Symlinks forbidden in payload: '+absolute);
  if(e.isDirectory())return list(absolute,base);
  if(!e.isFile())throw new Error('Unsupported payload entry: '+absolute);
  return [path.relative(base,absolute).split(path.sep).join('/')];
 });
}
function validate(){
 const expected=['SKILL.md','docs/agent-compatibility.md',...DIRS.flatMap(dir=>list(path.join(ROOT,dir),ROOT))].sort();
 const actual=list(PACKAGE,PACKAGE).sort();
 assert.deepEqual(actual,expected,'Installable skill must contain only canonical runtime resources');
 for(const rel of actual){
  assert(fs.readFileSync(path.join(PACKAGE,rel)).equals(fs.readFileSync(path.join(ROOT,rel))),'Stale skill mirror: '+rel);
 }
 const skill=fs.readFileSync(path.join(PACKAGE,'SKILL.md'),'utf8');
 assert(skill.startsWith('---\n'));
 assert(/^name:\s*universal-ai-film-director\s*$/m.test(skill));
 return actual;
}
if(require.main===module){try{console.log('PASS: isolated skill contains '+validate().length+' exact runtime files');}catch(e){console.error('FAIL:',e.message);process.exitCode=1;}}
module.exports={validate};
