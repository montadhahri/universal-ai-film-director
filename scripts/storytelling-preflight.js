'use strict';
// Lightweight structured pre-handoff review. It does NOT judge art, approve scripts,
// verify rendered media, or replace Director/user approvals.
const validText=x=>typeof x==='string'&&x.trim().length>0;
const positive=n=>Number.isSafeInteger(n)&&n>0;
const nonnegative=n=>Number.isSafeInteger(n)&&n>=0;
function intersects(a,b){return a.start_ms<b.end_ms&&b.start_ms<a.end_ms}
function reviewDraft(d){
 if(!d||!positive(d.duration_ms)||!Array.isArray(d.beats)||d.beats.length===0||!Array.isArray(d.narration))
  throw Error('Draft requires positive duration_ms, nonempty beats, and narration array');
 const issues=[],warnings=[],ids=new Set();let cursor=0;
 const ordered=[];
 for(const [i,b] of d.beats.entries()){
  if(!b||!validText(b.id)||!nonnegative(b.start_ms)||!positive(b.end_ms)||b.end_ms<=b.start_ms||!validText(b.action))
   throw Error('Invalid beat '+i);
  if(ids.has(b.id))issues.push('Duplicate beat ID '+b.id);ids.add(b.id);
  if(b.start_ms>cursor)issues.push('Beat gap before '+b.id);
  if(b.start_ms<cursor)issues.push('Beat overlap before '+b.id);
  if(b.end_ms>d.duration_ms)issues.push('Beat exceeds film duration '+b.id);
  cursor=b.end_ms;ordered.push(b);
 }
 if(cursor!==d.duration_ms)issues.push('Beat plan does not cover requested duration');
 const narration=d.narration.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const [i,n] of narration.entries()){
  if(!n||!validText(n.text)||!nonnegative(n.start_ms)||!positive(n.end_ms)||n.end_ms<=n.start_ms||n.end_ms>d.duration_ms)
   throw Error('Invalid narration cue '+i);
  if(i&&intersects(narration[i-1],n))warnings.push('Narration cues overlap: verify delivery and sound handoff');
  const words=n.text.trim().split(/\s+/u).length;
  if(!Number.isFinite(n.assumed_wpm)||n.assumed_wpm<=0)warnings.push('Narration speaking rate not documented at '+n.start_ms);
  else if(words/n.assumed_wpm*60000>n.end_ms-n.start_ms)
   issues.push('Narration does not fit estimated cue window at '+n.start_ms);
  // visual_attention is a human-labeled scene requirement, NOT video inspection.
  for(const b of ordered){
   if(b.visual_attention==='READ_TEXT'&&intersects(n,b))
    warnings.push('Narration competes with on-screen reading at beat '+b.id);
   else if(b.visual_attention==='SUBTLE_REACTION'&&intersects(n,b))
    warnings.push('Narration may compete with subtle reaction at beat '+b.id);
  }
 }
 if(nonnegative(d.max_narration_words)){
  const total=narration.reduce((sum,n)=>sum+n.text.trim().split(/\s+/u).length,0);
  if(total>d.max_narration_words)issues.push('Narration exceeds maximum word budget: '+total);
 }
 if(d.no_narration===true&&narration.length)issues.push('No-narration constraint violated');
 for(const b of ordered){
  const length=b.end_ms-b.start_ms;
  if(b.emotional_payoff===true&&length<3500)
   warnings.push('Emotional payoff may lack reaction time: '+b.id+' ('+length+'ms)');
  if(b.complex_action===true&&length<4000)
   warnings.push('Complex action may not fit: '+b.id+' ('+length+'ms)');
  if(b.visual_attention==='READ_TEXT'&&length<2500)
   warnings.push('On-screen text may not be readable: '+b.id);
 }
 if(!validText(d.opening_motif)||!validText(d.ending_payoff))
  warnings.push('Opening motif or earned final-image connection not documented');
 if(d.has_confirmed_rights===false)warnings.push('Confirm rights/consent before any external production');
 return {status:issues.length?'REVISION_REQUIRED':'READY_FOR_DIRECTOR_REVIEW',
  issues:[...new Set(issues)],warnings:[...new Set(warnings)],approval_granted:false,
  media_inspected:false,quality_proven:false,
  interpretation:'Structural checks and editorial prompts only. Creative merit and approval require human review.'};
}
module.exports={reviewDraft};
