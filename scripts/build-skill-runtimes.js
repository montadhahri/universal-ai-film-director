#!/usr/bin/env node
'use strict';
// Deterministic optional Node.js skill packaging from canonical root scripts.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const mapping={
  "universal-ai-film-director": [
    "project-contracts",
    "director-authority",
    "production-pipeline",
    "checkpoint-envelope",
    "audio-continuity"
  ],
  "film-storytelling": [
    "project-contracts",
    "storytelling-preflight"
  ],
  "film-visual-direction": [
    "project-contracts",
    "memory-consistency",
    "visual-continuity-assessment"
  ],
  "film-cinematography": [
    "project-contracts",
    "production-pipeline"
  ],
  "film-video-production": [
    "project-contracts",
    "production-pipeline"
  ],
  "film-sound-direction": [
    "project-contracts",
    "production-pipeline",
    "audio-continuity"
  ],
  "film-continuity-qa": [
    "project-contracts",
    "memory-consistency",
    "visual-continuity-assessment",
    "production-pipeline",
    "audio-continuity",
    "smart-repair"
  ]
};
function render(names){
 const factories=names.map(name=>"'"+name+"':function(module,exports,require){\\n".replace('\\n','\n')+fs.readFileSync(path.join(root,'scripts',name+'.js'),'utf8')+"\\n}".replace('\\n','\n')).join(',\\n'.replace('\\n','\n'));
 return `'use strict';\n// GENERATED from canonical root scripts by scripts/build-skill-runtimes.js. Do not edit.\n// Optional Node.js helpers; no external modules or provider execution.\nconst factories={\n${factories}\n};\nconst cache=new Map();\nfunction load(id){\n if(cache.has(id))return cache.get(id).exports;\n if(!Object.prototype.hasOwnProperty.call(factories,id))throw Error('Unknown bundled module: '+id);\n const module={exports:{}};cache.set(id,module);\n try{factories[id](module,module.exports,ref=>{\n  if(ref==='node:crypto')return require('node:crypto');\n  if(!/^\\.\\/[-a-z]+\\.js$/.test(ref))throw Error('External module forbidden: '+ref);\n  return load(ref.slice(2,-3));\n });}catch(e){cache.delete(id);throw e;}\n return module.exports;\n}\nmodule.exports={${names.map(name=>"...load('"+name+"')").join(',')}};\n`;
}
let failures=0;
for(const [skill,names] of Object.entries(mapping)){
 const target=path.join(root,'skills',skill,'scripts/runtime.js'),content=render(names);
 if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==content){console.error('Outdated installed runtime: '+skill);failures++;}
 }else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content);console.log('Built runtime: '+skill);}
}
if(failures)process.exitCode=1;else if(process.argv.includes('--check'))console.log('PASS: seven skill runtimes match canonical sources');
