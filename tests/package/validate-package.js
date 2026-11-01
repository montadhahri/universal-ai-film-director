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
  assert.deepEqual(actual.sort(),['SKILL.md','references/guide.md'].sort(),'Runtime package has extra/missing content: '+name);
  const doc=fs.readFileSync(path.join(dir,'SKILL.md'),'utf8');
  assert(doc.startsWith('---\nname: '+name+'\n'),'Bad frontmatter: '+name);
 }
 return names;
}
if(require.main===module){try{console.log('PASS: '+validate().length+' isolated portable skill packages');}catch(e){console.error('FAIL:',e.message);process.exitCode=1;}}
module.exports={validate};
