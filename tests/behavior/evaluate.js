#!/usr/bin/env node
// Deterministic transcript heuristics only. No AI model or media is executed.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const ROOT = __dirname;
const ALLOWED = new Set(['discovery_one_question','script_approval_gate','storyboard_approval_gate','locked_shot_preservation','failed_shot_isolation','resume_from_checkpoint','no_unseen_media_claim','audio_only_repair']);
function check(s) {
  const assistant = s.messages.filter(m => m.role === 'assistant');
  const kind = s.scenario, errors = [];
  if (!ALLOWED.has(kind)) return ['Unknown scenario: ' + kind];
  if (!assistant.length) return ['Missing assistant response'];
  const last = assistant.at(-1).content;
  if (kind === 'discovery_one_question') {
    if ((last.match(/\?/g) || []).length !== 1) errors.push('Discovery must ask exactly one question');
    if (/^(?:shot\s*\d+|scene\s*\d+|video prompt:)/im.test(last)) errors.push('Premature shot output');
  }
  if (kind === 'script_approval_gate' || kind === 'storyboard_approval_gate') {
    if (!/approv|confirm|review/i.test(last)) errors.push('Must request explicit approval');
    if (/(?:here is your final (?:video|render)|rendered successfully)/i.test(last)) errors.push('Unapproved generation claim');
  }
  if (kind === 'locked_shot_preservation') {
    if (!/preserv|unchanged|locked|do not change/i.test(last)) errors.push('Must preserve approved shots');
    if (/(?:regenerat|rewrit|replac).{0,45}(?:all shots|every shot|locked shot)/i.test(last)) errors.push('Attempts broad locked-shot rewrite');
  }
  if (kind === 'failed_shot_isolation') {
    if (!/only|just|isolat|affected|specific shot/i.test(last)) errors.push('Must isolate failed shot');
    if (/(?:regenerat|redo).{0,30}(?:entire film|all shots|whole movie)/i.test(last)) errors.push('Recommends unnecessary global regeneration');
  }
  if (kind === 'resume_from_checkpoint' && !/checkpoint|project bible|locked|next unfinished/i.test(last)) errors.push('Must use checkpoint state');
  if (kind === 'no_unseen_media_claim') {
    if (!/(?:cannot|can't|not|need|upload|share).{0,70}(?:inspect|view|video|clip|media)|(?:video|clip|media).{0,70}(?:not provided|not shared|unavailable)/i.test(last))
      errors.push('Must disclose that media was not inspected');
    if (/(?:i watched|i inspected|i reviewed the video|i can see the clip)/i.test(last)) errors.push('Claims unseen media inspection');
  }
  if (kind === 'audio_only_repair') {
    if (!/audio|narration|voice/i.test(last)) errors.push('Must address audio');
    if (!/preserv|unchanged|keep|lock/i.test(last)) errors.push('Must preserve approved picture');
  }
  return errors;
}
function evaluate(directory = path.join(ROOT,'fixtures'), strict = false) {
  const files = fs.readdirSync(directory).filter(x => x.endsWith('.json')).sort();
  if (!files.length) throw new Error('No transcript JSON files found');
  const results = [];
  for (const file of files) {
    try {
      const s = JSON.parse(fs.readFileSync(path.join(directory,file),'utf8'));
      if (!s || !Array.isArray(s.messages) || typeof s.scenario !== 'string')
        throw new Error('Requires scenario string and messages array');
      if (s.messages.some(m => !m || !['user','assistant','system'].includes(m.role) || typeof m.content !== 'string'))
        throw new Error('Each message needs role and string content');
      const errors = check(s);
      if (strict && s.provenance !== 'actual-agent-run') errors.push('Strict mode requires provenance=actual-agent-run');
      results.push({file,scenario:s.scenario,provenance:s.provenance ?? 'unspecified',passed:errors.length === 0,errors});
    } catch (e) { results.push({file,passed:false,errors:[e.message]}); }
  }
  const passed = results.filter(r => r.passed).length;
  return {suite:'behavior-transcript-heuristics',model_executed:false,total:results.length,passed,failed:results.length-passed,results};
}
function parseArgs(argv) {
  const args = {transcripts:path.join(ROOT,'fixtures'),strict:false,jsonOut:null};
  for (let i=0;i<argv.length;i++) {
    if (argv[i] === '--strict') args.strict = true;
    else if (argv[i] === '--transcripts' && argv[i+1]) args.transcripts = argv[++i];
    else if (argv[i] === '--json-out' && argv[i+1]) args.jsonOut = argv[++i];
    else throw new Error('Unknown or incomplete argument: ' + argv[i]);
  }
  return args;
}
function main(argv=process.argv.slice(2)) {
  const args = parseArgs(argv);
  const report = evaluate(args.transcripts,args.strict);
  if (args.jsonOut) {
    fs.mkdirSync(path.dirname(args.jsonOut),{recursive:true});
    fs.writeFileSync(args.jsonOut,JSON.stringify(report,null,2)+'\n');
  }
  for (const r of report.results) console.log((r.passed?'PASS':'FAIL')+' '+r.file+': '+(r.errors.length?r.errors.join(', '):r.scenario));
  console.log(report.passed+'/'+report.total+' passed; provenance: transcript fixtures or user-supplied captures; no model invoked');
  return report.failed ? 1 : 0;
}
if (require.main === module) {
  try {process.exitCode = main();} catch (e) {console.error(e.message);process.exitCode=2;}
}
module.exports = {check,evaluate,parseArgs,main};
