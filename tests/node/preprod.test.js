const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const {COMMANDS}=require('../preprod/run_validation.js');
test('node runner checks remain offline and production blocked',()=>{
 const src=read('tests/preprod/run_validation.js');
 for(const s of ['release_authorized:false','production_go:false','repository_visibility_change:false','agent_executed:false','video_generated:false'])
  assert(src.includes(s));
 assert.equal(COMMANDS.length,5);
 assert(COMMANDS.every(([name,args])=>typeof name==='string'&&Array.isArray(args)));
 assert(!src.includes('execSync('));
});
test('node runner covers validation, regression, synthetic fixtures',()=>{
 const args=COMMANDS.flatMap(x=>x[1]).join(' ');
 for(const p of ['check_preservation.js','validate_repo.js','regression.test.js','behavior.test.js','evaluate.js'])
  assert(args.includes(p));
});
