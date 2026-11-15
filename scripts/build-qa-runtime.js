#!/usr/bin/env node
'use strict';
// Deterministic source-of-truth packaging: regenerate or check the installable QA bundle.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const names=["project-contracts","memory-consistency","visual-continuity-assessment","production-pipeline","audio-continuity","director-authority","smart-repair"];
const factories=names.map(name=>{
 const source=fs.readFileSync(path.join(root,'scripts',name+'.js'),'utf8');
 return "'"+name+"':function(module,exports,require){\\n".replace('\\n','\n')+source+"\\n}".replace('\\n','\n');
}).join(',\\n'.replace('\\n','\n'));
const result=`'use strict';\n// GENERATED from canonical root scripts by scripts/build-qa-runtime.js. Do not edit.\n// Optional Node.js utilities shipped inside film-continuity-qa; no external modules.\nconst factories={\n${factories}\n};\nconst cache=new Map();\nfunction load(id){\n if(cache.has(id))return cache.get(id).exports;\n if(!Object.prototype.hasOwnProperty.call(factories,id))throw Error('Unknown bundled module: '+id);\n const module={exports:{}};cache.set(id,module);\n try{factories[id](module,module.exports,ref=>{\n  if(!/^\\.\\/[-a-z]+\\.js$/.test(ref))throw Error('External module forbidden: '+ref);\n  return load(ref.slice(2,-3));\n });}catch(e){cache.delete(id);throw e;}\n return module.exports;\n}\nmodule.exports={\n assessVisualContinuity:load('visual-continuity-assessment').assessVisualContinuity,\n inspectMemoryConsistency:load('memory-consistency').inspectMemoryConsistency,\n planSmartRepair:load('smart-repair').planSmartRepair,\n prepareScopedRepair:load('smart-repair').prepareScopedRepair,\n reviewRepairEvidence:load('smart-repair').reviewRepairEvidence,\n previewRepairImpact:load('audio-continuity').previewRepairImpact\n};\n`;
const target=path.join(root,'skills/film-continuity-qa/scripts/continuity-runtime.js');
if(process.argv.includes('--check')){
 if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==result){console.error('QA runtime bundle out of date; run node scripts/build-qa-runtime.js');process.exitCode=1;}
 else console.log('PASS: QA runtime bundle matches canonical sources');
}else{fs.writeFileSync(target,result);console.log('Updated installable QA runtime');}
