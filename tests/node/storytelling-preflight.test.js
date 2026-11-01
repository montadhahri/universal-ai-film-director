'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {reviewDraft}=require('../../scripts/storytelling-preflight.js');
const beat=(id,start_ms,end_ms,extra={})=>({id,start_ms,end_ms,action:'A visible choice changes what the audience knows',...extra});
const vo=(start_ms,end_ms,text,assumed_wpm=120)=>({start_ms,end_ms,text,assumed_wpm});
const lighthouse=()=>({duration_ms:45000,max_narration_words:15,
 opening_motif:'Stool turned away',ending_payoff:'Stool turned toward doorway',
 beats:[beat('LH01',0,7000),beat('LH02',7000,15000),beat('LH03',15000,23000),
 beat('LH04',23000,34000,{visual_attention:'READ_TEXT'}),
 beat('LH05',34000,45000,{emotional_payoff:true})],
 narration:[vo(29000,33500,'A light can reach someone you never see.')]});
const musician=()=>({duration_ms:30000,no_narration:true,
 opening_motif:'Player has violin',ending_payoff:'Hands empty, music continues',
 beats:[beat('MU01',0,6000),beat('MU02',6000,12000),beat('MU03',12000,18000),
 beat('MU04',18000,25000,{complex_action:true}),beat('MU05',25000,30000,{emotional_payoff:true})],
 narration:[]});
test('previous lighthouse VO-vs-reading conflict is identified for review',()=>{
 const r=reviewDraft(lighthouse());
 assert.equal(r.status,'READY_FOR_DIRECTOR_REVIEW');
 assert(r.warnings.some(x=>x.includes('competes with on-screen reading')));
 assert.equal(r.approval_granted,false);assert.equal(r.media_inspected,false);
});
test('moving VO after reading removes that conflict without changing approved picture',()=>{
 const original=lighthouse(),updated=structuredClone(original);
 updated.narration=[vo(36000,40500,'A light can reach someone you never see.')];
 const r=reviewDraft(updated);
 assert(!r.warnings.some(x=>x.includes('on-screen reading')));
 assert.deepEqual(original.beats,updated.beats);
});
test('musician test respects NO_VO and can flag a rushed payoff',()=>{
 const d=musician();assert.equal(reviewDraft(d).issues.length,0);
 d.beats[3].end_ms=27500;d.beats[4].start_ms=27500;
 assert(reviewDraft(d).warnings.some(x=>x.includes('reaction time')));
});
test('new unseen scenario: note reveal with simultaneous narration triggers conflict',()=>{
 const d={duration_ms:20000,opening_motif:'Sealed envelope',ending_payoff:'Envelope opened',
 beats:[beat('NEW1',0,10000),beat('NEW2',10000,16000,{visual_attention:'READ_TEXT'}),beat('NEW3',16000,20000)],
 narration:[vo(11000,15000,'The answer had been beside her all along.')]};
 assert(reviewDraft(d).warnings.some(x=>x.includes('on-screen reading')));
});
test('new unseen scenario: too much action and compressed final reaction gets warnings',()=>{
 const d={duration_ms:12000,opening_motif:'Closed door',ending_payoff:'Door open',
 beats:[beat('NEW1',0,4000),beat('NEW2',4000,9500,{complex_action:true}),
 beat('NEW3',9500,12000,{emotional_payoff:true})],narration:[]};
 assert(reviewDraft(d).warnings.some(x=>x.includes('Emotional payoff')));
});
test('unfilmable beat gaps and narration overrun prevent clean preflight',()=>{
 const d=lighthouse();d.beats[2].start_ms=15500;d.narration[0].end_ms=30000;
 const r=reviewDraft(d);assert.equal(r.status,'REVISION_REQUIRED');
 assert(r.issues.some(x=>x.includes('Beat gap')));
 assert(r.issues.some(x=>x.includes('Narration does not fit')));
});
test('max-words/no-narration constraints must be enforced',()=>{
 const d=musician();d.narration=[vo(0,5000,'A farewell to someone no one knew')];
 assert(reviewDraft(d).issues.some(x=>x.includes('No-narration')));
 const l=lighthouse();l.max_narration_words=3;
 assert(reviewDraft(l).issues.some(x=>x.includes('maximum word budget')));
});
test('correct timing and no structural issues never count as automatic approval',()=>{
 const r=reviewDraft(musician());
 assert.equal(r.status,'READY_FOR_DIRECTOR_REVIEW');assert.equal(r.approval_granted,false);
 assert.equal(r.quality_proven,false);
});


const {reviewBrief,reviewRevisionScope}=require('../../scripts/storytelling-preflight.js');
const brief=(words,exclusions=[])=>({duration_ms:20000,narration_words:words,max_wpm:120,narration_exclusions:exclusions});
const silent=[{start_ms:0,end_ms:5000},{start_ms:15000,end_ms:20000}];
test('REG-06 impossible 100 words in 20s is blocked',()=>{
 const r=reviewBrief(brief(100,[...silent,{start_ms:5000,end_ms:9000}]));
 assert.equal(r.status,'BLOCKED');assert.equal(r.available_ms,6000);
 assert.equal(r.required_ms,50000);assert.equal(r.shortfall_ms,44000);
});
test('REG-07 overlapping reading and silence are not double-counted',()=>{
 const r=reviewBrief(brief(10,[...silent,{start_ms:1000,end_ms:5000}]));
 assert.equal(r.reserved_ms,10000);assert.equal(r.available_ms,10000);
 assert.equal(r.status,'FEASIBLE');
});
test('REG-08 feasible 20s narration fits ten available seconds',()=>{
 assert.equal(reviewBrief(brief(20,silent)).status,'FEASIBLE');
});
test('REG-09 unauthorized visual changes and protected versions are rejected',()=>{
 const r=reviewRevisionScope({allowed_types:['AUDIO'],changed_artifacts:[
  {id:'VISUAL-V2',type:'VISUAL'},{id:'AUDIO-V1',type:'AUDIO'}],
  protected_versions:[{id:'VISUAL-V2'}]});
 assert.equal(r.status,'REVISION_REQUIRED');assert.equal(r.issues.length,2);
});
test('REG-05 audio-only declared revision preserves locked screenplay',()=>{
 const r=reviewRevisionScope({allowed_types:['AUDIO'],
 changed_artifacts:[{id:'AUDIO-V2',type:'AUDIO'}],
 protected_versions:[{id:'SCREENPLAY-V2'},{id:'VISUAL-V2'}]});
 assert.equal(r.status,'READY_FOR_DIRECTOR_REVIEW');assert.equal(r.approval_granted,false);
});
test('REG-01 lighthouse 10-word VO at 90 WPM exceeds six-second cue',()=>{
 const d=lighthouse();d.narration=[vo(39000,45000,'Some lights are left on for someone who may return.',90)];
 assert(reviewDraft(d).issues.some(x=>x.includes('Narration does not fit')));
});
test('REG-02 compressed musician handover is an editorial warning',()=>{
 const d=musician();d.beats[3].start_ms=18000;d.beats[3].end_ms=21000;
 d.beats[4].start_ms=21000;d.beats[4].end_ms=30000;
 assert(reviewDraft(d).warnings.some(x=>x.includes('Complex action')));
});
test('REG-03 and REG-04 emotional causality require human editorial evaluation',()=>{
 const r=reviewDraft(musician());
 assert.equal(r.quality_proven,false);assert.equal(r.approval_granted,false);
});
test('REG-10 unconventional narrative is not automatically failed by motif metadata',()=>{
 const d=musician();delete d.opening_motif;delete d.ending_payoff;
 const r=reviewDraft(d);assert.equal(r.status,'READY_FOR_DIRECTOR_REVIEW');
 assert(r.warnings.some(x=>x.includes('motif')));
});
test('invalid exclusion boundaries cannot silently produce feasibility',()=>{
 assert.throws(()=>reviewBrief(brief(1,[{start_ms:19000,end_ms:21000}])));
});
const {countNarrationWords}=require('../../scripts/storytelling-preflight.js');
test('ST-01 actual six-word VO contradicts claimed seven words',()=>{
 const d=lighthouse();d.narration=[{...vo(38000,42000,'A place can hold a promise.',110),declared_word_count:7}];
 const r=reviewDraft(d);
 assert.equal(countNarrationWords(d.narration[0].text),6);
 assert(r.issues.some(x=>x.includes('word count mismatch')));
 assert.equal(r.status,'REVISION_REQUIRED');
});
test('ST-01 exact six-word VO at 110 WPM fits four seconds',()=>{
 const d=lighthouse();d.narration=[{...vo(38000,42000,'A place can hold a promise.',110),declared_word_count:6}];
 const r=reviewDraft(d);
 assert(!r.issues.some(x=>x.includes('Narration does not fit')));
 assert(!r.issues.some(x=>x.includes('word count mismatch')));
});
test('contractions and punctuation follow documented whitespace-token convention',()=>{
 assert.equal(countNarrationWords("I'll be back for the scarf."),6);
 assert.equal(countNarrationWords("  Don't   go.  "),2);
 assert.equal(countNarrationWords(''),0);
});
test('unverified declared word counts must not be silently accepted',()=>{
 const d=lighthouse();d.narration=[{...vo(38000,42000,'A place can hold a promise.',110),declared_word_count:-1}];
 assert.throws(()=>reviewDraft(d),/Invalid declared narration word count/);
});
