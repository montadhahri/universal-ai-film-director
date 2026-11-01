'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const {validate,names}=require('../validate_repo.js');
const {validate:packages}=require('../package/validate-package.js');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
test('seven skill packages are independently installable and self-contained',()=>{assert.equal(packages().length,7);assert.deepEqual(validate().errors,[]);});
test('Director has a functional single-agent fallback and protects approvals',()=>{
 const s=read('skills/universal-ai-film-director/SKILL.md');
 for(const word of ['exactly one','do not restart discovery','screenplay','Visual Bible','storyboard','LOCKED','BLOCKED_NO_PROVIDER','specialist'])assert(s.toLowerCase().includes(word.toLowerCase()),word);
});
test('Specialists do not claim automatic real-media generation or project approval',()=>{
 for(const name of names.slice(1)){const s=read('skills/'+name+'/SKILL.md');assert(s.includes('PROPOSED')||s.includes('Propose')||s.includes('propose'),name);}
 assert(read('skills/film-video-production/SKILL.md').includes('BLOCKED_NO_PROVIDER'));
});
test('No version folders or duplicate root skill source remain',()=>{
 for(const p of ['SKILL.md','engine','adapters','references','schemas','templates','examples','skills/v1','skills/v2','contracts/v1','contracts/v2'])assert(!fs.existsSync(path.join(root,p)),p);
});

test('all 31 historical v1 filmmaking references and templates have current modular equivalents',()=>{
 const expected={
 'universal-ai-film-director':['references/decision-procedure.md','references/discovery.md','references/project-state.md','references/continuity.md','assets/project-bible-template.md','assets/checkpoint-template.md'],
 'film-storytelling':['references/storytelling.md'],
 'film-visual-direction':['references/visual-style.md'],
 'film-cinematography':['references/shot-planning.md','references/camera-grammar.md','references/lighting-composition.md','assets/shot-plan-template.md','assets/storyboard-template.md'],
 'film-video-production':['references/capability-matrix.md','references/generator-selection.md','references/google-flow.md','references/google-flow-checklist.md','references/other-generators.md','references/prompt-engineering.md','assets/shot-packet-template.md'],
 'film-sound-direction':['references/audio-direction.md','references/audio-design.md','references/dubbing-localization.md','assets/audio-timeline-template.md'],
 'film-continuity-qa':['references/quality-assurance.md','references/localized-repair.md','references/quality-control.md','references/postproduction.md','assets/defect-report-template.md','assets/repair-plan-template.md','assets/shot-review-template.md']
 };
 assert.equal(Object.values(expected).flat().length,31);
 for(const [skill,refs] of Object.entries(expected)){
  const entry=read('skills/'+skill+'/SKILL.md');
  for(const rel of refs){
   const key='skills/'+skill+'/'+rel;
   assert(fs.existsSync(path.join(root,key)),'Missing migrated filmmaking knowledge: '+key);
   assert(read(key).length>80,'Empty or superficial migrated reference: '+key);
   assert(entry.includes('('+rel+')'),'Skill entrypoint does not expose conditional reference: '+key);
  }
 }
});
test('director gate, cinema timing, sound dropout and repair procedures retain production invariants',()=>{
 const d=read('skills/universal-ai-film-director/references/project-state.md');
 const c=read('skills/film-cinematography/references/shot-planning.md');
 const a=read('skills/film-sound-direction/references/audio-direction.md');
 const q=read('skills/film-continuity-qa/references/localized-repair.md');
 const p=read('skills/film-video-production/references/capability-matrix.md');
 for(const [doc,terms] of [[d,['LOCKED','NEEDS_FIX','scope-specific']], [c,['overlap','timeline','approval']], [a,['audio-only','narration','locked picture']], [q,['rollback','repair','approved']], [p,['DOCUMENTED','TESTED','UNVERIFIED','UNSUPPORTED']]]){
  for(const term of terms)assert(doc.toLowerCase().includes(term.toLowerCase()),'Required retained invariant: '+term);
 }
});
