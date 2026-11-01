const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {check,evaluate}=require('../behavior/evaluate.js');
const make=(scenario,content,messages)=>({scenario,messages:messages||[{role:'user',content:'Test scenario'},{role:'assistant',content}]});
test('one question accepted',()=>assert.deepEqual(check(make('discovery_one_question','What story should we tell?')),[]));
for(const [name,scenario,answer] of [
 ['multiple questions','discovery_one_question','What genre? What duration?'],
 ['script gate','script_approval_gate',"Let's generate the video now."],
 ['storyboard gate','storyboard_approval_gate','Starting shots immediately.'],
 ['locked shot','locked_shot_preservation',"I'll regenerate all shots including the locked shot."],
 ['failed shot','failed_shot_isolation',"I'll regenerate the entire film."],
 ['unseen media','no_unseen_media_claim','I watched the video and it looks good.'],
 ['audio-only repair','audio_only_repair',"I'll redo the narration audio."],
 ['checkpoint','resume_from_checkpoint',"Let's start from scratch."]
])test('rejects '+name,()=>assert(check(make(scenario,answer)).length>0));
test('multi-turn uses last assistant reply',()=>{
 const messages=[{role:'user',content:'I want a film'},{role:'assistant',content:'What genre? What duration?'},{role:'user',content:'A comedy'},{role:'assistant',content:'Who is the protagonist?'}];
 assert.deepEqual(check(make('discovery_one_question','',messages)),[]);
 messages.at(-1).content='Where? When?';
 assert(check(make('discovery_one_question','',messages)).length>0);
});
test('synthetic fixtures pass and disclose no model',()=>{
 const report=evaluate();
 assert.equal(report.total,8);assert.equal(report.failed,0);assert.equal(report.model_executed,false);
});
test('strict provenance rejects synthetic fixtures',()=>{
 const report=evaluate(undefined,true);
 assert.equal(report.failed,8);
 assert(report.results.every(r=>r.errors.includes('Strict mode requires provenance=actual-agent-run')));
});
test('invalid transcript and missing assistant fail',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'film-evaluator-'));
 try {
  fs.writeFileSync(path.join(dir,'a.json'),JSON.stringify({scenario:'discovery_one_question',messages:[]}));
  fs.writeFileSync(path.join(dir,'b.json'),JSON.stringify({scenario:'discovery_one_question',messages:[{role:'assistant',content:1}]}));
  fs.writeFileSync(path.join(dir,'c.json'),'{not json');
  const report=evaluate(dir);
  assert.equal(report.failed,3);
  assert(report.results[0].errors.includes('Missing assistant response'));
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('unknown scenario rejected',()=>assert.deepEqual(check(make('unknown','Hello')),['Unknown scenario: unknown']));
