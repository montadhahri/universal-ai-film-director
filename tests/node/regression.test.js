// Node.js semantic/static regression tests migrated from the original Python suites.
// No model, video generator or network execution occurs here.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(ROOT,p),'utf8');
const json = p => JSON.parse(read(p));
const copy = x => structuredClone(x);
const has = (p, s) => assert(read(p).includes(s), p + ' missing ' + s);
const containsAll = (p, values) => values.forEach(v => has(p,v));
const check = (name, fn) => test(name, fn);
const states = ['DRAFT','PROPOSED','APPROVED','LOCKED','NEEDS_FIX'];
const transitions = {DRAFT:['PROPOSED'],PROPOSED:['DRAFT','APPROVED'],APPROVED:['LOCKED','NEEDS_FIX'],LOCKED:['NEEDS_FIX'],NEEDS_FIX:['PROPOSED']};

function continuity(snapshot) {
 const errors=[]; if(snapshot.schema_version!=='1.0')errors.push('Unsupported schema version');
 const gates=snapshot.gates||{};
 if(['script','visual_bible','storyboard'].some(k=>!(k in gates)))errors.push('Missing approval gate');
 for(const [name,gate] of Object.entries(gates))if(gate.approved&&!(gate.version&&gate.evidence))errors.push('Approved gate lacks evidence: '+name);
 const keys=new Set();
 for(const shot of snapshot.shots||[]){
  const key=JSON.stringify([shot.id,shot.revision]);if(keys.has(key))errors.push('Duplicate shot revision');keys.add(key);
  if(!states.includes(shot.state))errors.push('Invalid shot state');
  if(shot.state==='LOCKED'&&!shot.approved_asset)errors.push('Locked shot lacks approved asset reference');
 }
 const anchors=(snapshot.continuity||[]).map(a=>a.id);
 if(anchors.length!==new Set(anchors).size)errors.push('Duplicate continuity anchor ID');
 for(const shot of snapshot.shots||[]){
  if(shot.parent_revision!=null){
   if(!keys.has(JSON.stringify([shot.id,shot.parent_revision])))errors.push('Missing parent shot revision');
   if(shot.parent_revision>= (shot.revision||0))errors.push('Parent revision must be older');
  }
  if((shot.continuity_refs||[]).some(ref=>!anchors.includes(ref)))errors.push('Unknown continuity reference');
 }
 return errors;
}
function timeline(shots,overlaps=[],target=null){
 if(!shots.length)return ['No shots'];
 const errors=[],ids=new Set();
 shots.forEach((shot,i)=>{
  if(ids.has(shot.id))errors.push('Duplicate shot ID');ids.add(shot.id);
  if(shot.end_seconds<=shot.start_seconds)errors.push('Nonpositive shot duration');
  if(i){const prior=shots[i-1],overlap=prior.end_seconds-shot.start_seconds;
   if(overlap<0)errors.push('Unplanned timeline gap');
   if(overlap>0&&!overlaps.includes(overlap))errors.push('Undeclared transition overlap');
   if(shot.start_seconds<=prior.start_seconds)errors.push('Shots out of chronological order');
  }
 });
 if(shots[0].start_seconds!==0)errors.push('Timeline must start at zero');
 if(target!==null&&shots.at(-1).end_seconds!==target)errors.push('Target duration mismatch');
 return errors;
}
function audio(plan){
 const errors=[],duration=plan.duration_seconds||0,ids=new Set();
 if(duration<=0)errors.push('Invalid film duration');
 for(const [track,cues] of Object.entries(plan.tracks||{})){
  for(const cue of cues){
   if(ids.has(cue.id))errors.push('Duplicate cue ID');ids.add(cue.id);
   if(cue.start<0||cue.end<=cue.start)errors.push('Invalid cue interval');
   if(cue.end>duration)errors.push('Cue exceeds film duration');
  }
  if(track==='narration'){const ordered=[...cues].sort((a,b)=>a.start-b.start);
   for(let i=1;i<ordered.length;i++)if(ordered[i].start<ordered[i-1].end)errors.push('Overlapping narration');
  }
 }
 return errors;
}
function uncovered(cues,duration){
 const gaps=[];let cursor=0;
 for(const cue of [...cues].sort((a,b)=>a.start-b.start)){if(cue.start>cursor)gaps.push([cursor,cue.start]);cursor=Math.max(cursor,cue.end);}
 if(cursor<duration)gaps.push([cursor,duration]);return gaps;
}
const categories=new Set('VIDEO_FREEZE REPEATED_FRAMES MISSING_SHOT DUPLICATE_SHOT IDENTITY_DRIFT LIGHTING_DRIFT ACTION_DISCONTINUITY BAD_TRANSITION AUDIO_DROPOUT REPEATED_NARRATION AUDIO_DESYNC MUSIC_GAP TITLE_MISSING WRONG_DURATION UNKNOWN'.split(' '));
function repair(ticket){
 const errors=[],proposal=ticket.proposal||{},times=ticket.time_range_seconds||{};
 if(!categories.has(ticket.category))errors.push('Unknown defect category');
 if(!['DIRECT_INSPECTION','USER_REPORT','DOCUMENT_CHECK','UNVERIFIED'].includes(ticket.evidence_source))errors.push('Unknown evidence source');
 if(ticket.evidence_source==='DIRECT_INSPECTION'&&!ticket.actual_media_inspected)errors.push('Inspection claim without inspected media');
 if((times.start??-1)<0||(times.end??0)<=(times.start??-1))errors.push('Invalid defect time range');
 const affected=new Set(proposal.affected_ids||[]),preserve=new Set(proposal.preserve||[]);
 if([...affected].some(x=>!(ticket.affected_ids||[]).includes(x)))errors.push('Repair scope exceeds defect scope');
 if([...affected].some(x=>preserve.has(x)))errors.push('Affected and preserved IDs overlap');
 if((ticket.locked_assets||[]).some(x=>!preserve.has(x)))errors.push('Locked assets not preserved');
 if(proposal.status==='APPLIED'&&ticket.status==='REPORTED')errors.push('Repair applied without authorization');
 return errors;
}

const checkpoint=json('examples/continuity-checkpoint.json');
check('continuity: example passes',()=>assert.deepEqual(continuity(checkpoint),[]));
check('continuity: schema valid and states',()=>{const schema=json('schemas/project-bible.schema.json');assert.equal(schema.$schema,'https://json-schema.org/draft/2020-12/schema');assert.equal(schema.properties.schema_version.const,'1.0');assert.deepEqual(new Set(schema.$defs.shot.properties.state.enum),new Set(states));});
for(const [name,change,error] of [
 ['missing gate',x=>delete x.gates.script,'Missing approval gate'],
 ['missing evidence',x=>x.gates.script.evidence='','Approved gate lacks evidence'],
 ['duplicate revision',x=>x.shots.push(copy(x.shots[0])),'Duplicate shot revision'],
 ['invalid parent',x=>x.shots[1].parent_revision=7,'Missing parent shot revision'],
 ['missing anchor',x=>x.shots[0].continuity_refs=['MISSING'],'Unknown continuity reference'],
 ['locked asset',x=>delete x.shots[0].approved_asset,'Locked shot lacks approved asset reference']
])check('continuity: '+name,()=>{const x=copy(checkpoint);change(x);assert(continuity(x).some(e=>e.includes(error)));});
check('continuity: locked transition constraints',()=>{assert(!transitions.LOCKED.includes('DRAFT'));assert(transitions.LOCKED.includes('NEEDS_FIX'));assert(!transitions.LOCKED.includes('PROPOSED'));});
check('continuity: skill links',()=>containsAll('SKILL.md',['engine/continuity.md','engine/project-state.md']));

const shots=json('examples/shot-plan.json').shots;
check('shot plan: example',()=>assert.deepEqual(timeline(shots,[],12),[]));
for(const [name,change,error] of [
 ['gap',x=>x[1].start_seconds=6,'Unplanned timeline gap'],
 ['undeclared overlap',x=>x[1].start_seconds=4,'Undeclared transition overlap'],
 ['duplicate id',x=>x[1].id='S01_SH01','Duplicate shot ID'],
 ['nonpositive',x=>x[1].end_seconds=5,'Nonpositive shot duration'],
 ['start zero',x=>x[0].start_seconds=1,'Timeline must start at zero']
])check('shot plan: '+name,()=>{const x=copy(shots);change(x);assert(timeline(x).includes(error));});
check('shot plan: declared overlap',()=>{const x=copy(shots);x[1].start_seconds=4;assert.deepEqual(timeline(x,[1],12),[]);});
check('shot plan: target mismatch',()=>assert(timeline(shots,[],13).includes('Target duration mismatch')));
check('shot plan: links and template',()=>{containsAll('SKILL.md',['engine/shot-planning.md','templates/shot-plan.md']);containsAll('templates/storyboard.md',['Shot ID','request approval']);});

const plan=json('examples/audio-cue-sheet.json');
check('audio: example',()=>assert.deepEqual(audio(plan),[]));
check('audio: music covered',()=>assert.deepEqual(uncovered(plan.tracks.music,12),[]));
check('audio: narration gaps allowed',()=>{assert.deepEqual(uncovered(plan.tracks.narration,12),[[4,7],[11,12]]);assert.deepEqual(audio(plan),[]);});
for(const [name,change,error] of [
 ['duplicate id',x=>x.tracks.music[0].id='N01','Duplicate cue ID'],
 ['truncated end',x=>x.tracks.narration[1].end=13,'Cue exceeds film duration'],
 ['negative start',x=>x.tracks.narration[0].start=-1,'Invalid cue interval'],
 ['overlap',x=>x.tracks.narration[1].start=3,'Overlapping narration']
])check('audio: '+name,()=>{const x=copy(plan);change(x);assert(audio(x).includes(error));});
check('audio: music gap',()=>{const x=copy(plan);x.tracks.music[0].end=9;assert.deepEqual(uncovered(x.tracks.music,12),[[9,12]]);});
check('audio: links and locked picture',()=>{containsAll('SKILL.md',['engine/audio.md','templates/audio-timeline.md']);containsAll('engine/audio.md',['audio-only','locked picture']);});

const ticket=json('examples/defect-report.json');
check('repair: example',()=>assert.deepEqual(repair(ticket),[]));
for(const [name,change,error] of [
 ['false inspection',x=>x.evidence_source='DIRECT_INSPECTION','Inspection claim without inspected media'],
 ['invalid category',x=>x.category='GUESS','Unknown defect category'],
 ['invalid time',x=>x.time_range_seconds.end=32,'Invalid defect time range'],
 ['scope broadening',x=>x.proposal.affected_ids.push('S01_SH09'),'Repair scope exceeds defect scope'],
 ['locked preservation',x=>x.proposal.preserve.splice(x.proposal.preserve.indexOf('S01_SH01'),1),'Locked assets not preserved'],
 ['overlap',x=>x.proposal.preserve.push('N03'),'Affected and preserved IDs overlap'],
 ['unapproved apply',x=>x.proposal.status='APPLIED','Repair applied without authorization']
])check('repair: '+name,()=>{const x=copy(ticket);change(x);assert(repair(x).includes(error));});
check('repair: links and rollback',()=>{containsAll('SKILL.md',['engine/repair.md','engine/quality-assurance.md']);containsAll('templates/repair-plan.md',['Rollback','Immutable locked']);});

check('director: routing and contracts',()=>{
 has('SKILL.md','engine/director.md');
 for(const x of ['Project Bible','locked','approval','one focused question','PROPOSED','conflict'])assert(read('engine/director.md').toLowerCase().includes(x.toLowerCase()));
 for(const x of ['exactly one question','PROPOSED','APPROVED','runtime'])assert(read('engine/discovery.md').toLowerCase().includes(x.toLowerCase()));
 containsAll('SKILL.md',['Require explicit approval','Approved shots are LOCKED','Never invent']);
});
check('compatibility: skill links',()=>containsAll('SKILL.md',['adapters/capability-matrix.md','adapters/generator-selection.md']));
check('compatibility: evidence and disclaimers',()=>{
 containsAll('adapters/capability-matrix.md',['UNVERIFIED','Google Flow / Veo','actual execution']);
 has('adapters/google-flow-checklist.md','made-up button names');
 containsAll('docs/agent-compatibility.md',['NOT TESTED','ChatGPT web/app','private repository']);
 has('adapters/generator-selection.md','does\n**not** grant video generation');
 for(let i=1;i<=7;i++)has('tests/integration/README.md','A'+String(i).padStart(2,'0'));
 for(const p of ['adapters/google-flow.md','adapters/other-generators.md'])assert(fs.statSync(path.join(ROOT,p)).isFile());
});
check('flagship: five shots and timeline',()=>{
 const film=read('examples/flagship-film/README.md');
 for(let i=1;i<=5;i++)assert(film.includes('S'+String(i).padStart(2,'0')));
 const ranges=[...film.matchAll(/\| S\d\d \| (\d+)–(\d+)s \|/g)].map(x=>[Number(x[1]),Number(x[2])]);
 assert.deepEqual(ranges,[[0,6],[6,12],[12,19],[19,26],[26,30]]);
});
check('flagship: no real media claim and approvals',()=>{
 containsAll('examples/flagship-film/README.md',['No media generated']);
 assert(read('examples/flagship-film/README.md').toLowerCase().includes('fictional'));
 has('examples/flagship-film/project-bible.md','audio-only');
 has('docs/release-checklist.md','explicit owner authorization');
 has('docs/end-to-end-workflow.md','npx skills add');
 const phase=read('docs/ROADMAP.md').split('\n').find(x=>x.startsWith('| 8 |'));
 assert(phase.includes('Merged')&&phase.includes('v1.0.0 privately released'));
 has('docs/ROADMAP.md','Production GO is not authorized');
 has('CHANGELOG.md','Phase 8');
});
check('preprod: runner safety',()=>{
 containsAll('tests/preprod/run_validation.js',['production_go:false','agent_executed:false','video_generated:false','check_preservation.js','validate_repo.js','evaluate.js','NODE_TEST_FILES']);
});
check('preprod: private CI',()=>{
 containsAll('.github/workflows/preprod-validation.yml',['contents: read','persist-credentials: false']);
 assert(!read('.github/workflows/preprod-validation.yml').includes('secrets.'));
});
check('preprod: unverified agent template',()=>{
 const x=json('tests/integration/real-agent-result.template.json');
 assert.equal(x.status,'NOT_RUN');assert.equal(x.production_go,false);assert.equal(x.scenarios.length,7);
 assert(x.scenarios.every(s=>s.status==='NOT_RUN'));
});
check('preprod: private install and approval',()=>{
 containsAll('docs/private-preprod-validation.md',['gh auth status','Do **not** make the repository public']);
 has('docs/release-checklist.md','explicit owner authorization');
});
