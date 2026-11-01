'use strict';
// Planning-only production pipeline. Does not authenticate approvals,
// persist checkpoints, inspect media, invoke providers or grant permissions.
const {validateProject}=require('./project-contracts.js');
const phases=['discovery','script','visual_bible','storyboard','sound','generator','generate','review','delivery'];
const nonempty=s=>typeof s==='string'&&s.trim().length>0;
const fail=m=>{throw new Error(m)};
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const clone=x=>structuredClone(x);
const timelineEps=0; // millisecond contract: cuts only; no implicit dissolves or crossfades

function validateTimeline(t){
 if(!t||!integer(t.duration_ms)||t.duration_ms===0||!Array.isArray(t.shots)||t.shots.length===0)
  fail('Timeline needs positive integer duration_ms and nonempty shots');
 const ids=new Set();
 let cursor=0;
 for(const [i,s] of t.shots.entries()){
  if(!s||!nonempty(s.id)||!Number.isSafeInteger(s.revision)||s.revision<1
   ||!integer(s.start_ms)||!integer(s.end_ms)||s.end_ms<=s.start_ms)
   fail('Invalid timed shot at index '+i);
  const id=s.id+':'+s.revision;
  if(ids.has(id))fail('Duplicate timed shot revision: '+id);
  ids.add(id);
  if(s.start_ms>cursor+timelineEps)fail('Timeline gap before '+s.id+' at '+cursor+'ms');
  if(s.start_ms<cursor-timelineEps)fail('Timeline overlap before '+s.id+' at '+s.start_ms+'ms; explicit transition plan required');
  if(s.end_ms>t.duration_ms)fail('Shot extends past film duration: '+s.id);
  cursor=s.end_ms;
 }
 if(cursor!==t.duration_ms)fail('Timeline does not cover full film duration: '+cursor+'/'+t.duration_ms+'ms');
 return {valid:true,duration_ms:t.duration_ms,shot_count:t.shots.length,transition_mode:'CUTS_ONLY'};
}

function requirements(phase){
 switch(phase){
 case 'visual_bible':return ['script'];
 case 'storyboard':return ['script','visual_bible'];
 case 'sound':case 'generator':case 'generate':case 'review':case 'delivery':return ['script','visual_bible','storyboard'];
 default:return [];
 }
}
function validatePipeline(p){
 validateProject(p);
 if(!phases.includes(p.phase))fail('Unknown production phase');
 for(const gate of requirements(p.phase))if(!p.gates[gate].approved)fail('Production phase '+p.phase+' requires approved '+gate);
 if(phases.indexOf(p.phase)>=phases.indexOf('sound')){
  if(!p.shot_timeline)fail('A reconciled shot timeline is required before sound');
  validateTimeline(p.shot_timeline);
 }
 // No execution adapter exists: future phases cannot be asserted by manually changing phase.
 if(['generate','review','delivery'].includes(p.phase))fail('Media execution/review phases are not supported by this planning-only pipeline');
 return true;
}
function recordTimeline(p,{expected_revision,timeline}){
 validatePipeline(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(p.phase!=='storyboard'||p.gates.storyboard.approved)fail('Timeline revisions require storyboard planning before user approval');
 validateTimeline(timeline);
 const n=clone(p);n.shot_timeline=clone(timeline);n.revision++;
 return n;
}
function nextPhase(p,{expected_revision,to}){
 validatePipeline(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 const current=phases.indexOf(p.phase),target=phases.indexOf(to);
 if(target!==current+1)fail('Only forward single-step phase transitions are supported');
 if(to==='generate')fail('Production GO HOLD: no execution adapter or provider authorization is available');
 for(const gate of requirements(to))if(!p.gates[gate].approved)fail('Missing approval gate: '+gate);
 if(to==='sound'){
  if(!p.shot_timeline)fail('Storyboard timeline not supplied');
  validateTimeline(p.shot_timeline);
 }
 if(to==='generator'&&!p.shot_timeline)fail('No storyboard timeline');
 const n=clone(p);n.phase=to;n.revision++;return n;
}
function previewNextPhase(p){
 validatePipeline(p);
 const index=phases.indexOf(p.phase);
 if(index===phases.length-1)return {from:p.phase,to:null,allowed:false,reasons:['Already at terminal phase']};
 const to=phases[index+1],reasons=[];
 for(const gate of requirements(to))if(!p.gates[gate].approved)reasons.push('Missing approved '+gate);
 if(to==='sound'&&!p.shot_timeline)reasons.push('Missing reconciled storyboard timeline');
 else if(to==='sound'&&p.shot_timeline){try{validateTimeline(p.shot_timeline)}catch(e){reasons.push(e.message)}}
 if(to==='generate')reasons.push('Production GO HOLD; no authorized execution adapter');
 return {from:p.phase,to,allowed:reasons.length===0,reasons};
}
module.exports={phases,validateTimeline,validatePipeline,recordTimeline,nextPhase,previewNextPhase};
