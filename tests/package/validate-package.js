'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'../..');
const names=require('../validate_repo.js').names;
function validate(){
 const found=fs.readdirSync(path.join(ROOT,'skills'),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).sort();
 assert.deepEqual(found,names.slice().sort(),'Unexpected or missing specialist');
 for(const name of names){
  const dir=path.join(ROOT,'skills',name),actual=[];
  function walk(p){
   for(const e of fs.readdirSync(p,{withFileTypes:true})){
    const a=path.join(p,e.name);
    assert(!e.isSymbolicLink(),'No symlinks allowed');
    if(e.isDirectory())walk(a);else actual.push(path.relative(dir,a).split(path.sep).join('/'));
   }
  }
  walk(dir);
  assert(actual.includes('SKILL.md') && actual.includes('references/guide.md'),'Required files missing: '+name);
  assert(actual.every(x=>x==='SKILL.md'||/^references\/[a-z0-9-]+\.md$/.test(x)||/^assets\/[a-z0-9-]+\.md$/.test(x)),'Unexpected file in runtime payload: '+name);
  assert(!actual.some(x=>x.includes('README')||x.includes('CHANGELOG')||x.includes('tests/')),'Development files leaked into skill: '+name);
  const doc=fs.readFileSync(path.join(dir,'SKILL.md'),'utf8');
  assert(doc.startsWith('---\nname: '+name+'\n'),'Bad frontmatter: '+name);
 }
 return names;
}
if(require.main===module){try{console.log('PASS: '+validate().length+' isolated portable skill packages');}catch(e){console.error('FAIL:',e.message);process.exitCode=1;}}
module.exports={validate};
