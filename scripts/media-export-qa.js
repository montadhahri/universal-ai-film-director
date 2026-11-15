'use strict';
// Pure evidence classification: declared metadata is not decoded media inspection.
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const positive=x=>Number.isSafeInteger(x)&&x>0;
const str=x=>typeof x==='string'&&x.trim().length>0;
function assessMediaExport({artifact,metadata,requirements,evidence}={}){
 const checks=[];
 const add=(name,status,reason)=>checks.push({name,status,reason});
 const mock=artifact?.kind==='MOCK_MANIFEST'||artifact?.synthetic===true;
 const provenance=artifact?.origin==='USER_REPORTED'||artifact?.origin==='DIRECT_INSPECTION';
 if(mock){add('provenance','GAP','Synthetic mock manifest is not playable media');}
 else if(!obj(artifact)||!str(artifact.ref)||!provenance){add('provenance','NOT_VERIFIED','No grounded artifact reference and origin');}
 else add('provenance','PASS','Artifact reference and origin declared; bytes not authenticated');
 const validMetadata=obj(metadata)&&positive(metadata.duration_ms)&&positive(metadata.width)&&positive(metadata.height)&&positive(metadata.frame_rate_num)&&positive(metadata.frame_rate_den)&&typeof metadata.has_audio==='boolean';
 const validRequirements=obj(requirements)&&positive(requirements.duration_ms)&&positive(requirements.width)&&positive(requirements.height)&&positive(requirements.frame_rate_num)&&positive(requirements.frame_rate_den)&&typeof requirements.audio_required==='boolean';
 if(!validMetadata||!validRequirements)add('metadata','NOT_VERIFIED','Complete duration, dimensions, frame rate and audio declarations required');
 else {
  add('duration',metadata.duration_ms===requirements.duration_ms?'PASS':'GAP','Declared duration comparison only');
  add('resolution',metadata.width===requirements.width&&metadata.height===requirements.height?'PASS':'GAP','Declared pixel dimensions comparison only');
  add('frame_rate',metadata.frame_rate_num*requirements.frame_rate_den===requirements.frame_rate_num*metadata.frame_rate_den?'PASS':'GAP','Declared rational frame-rate comparison only');
  add('audio',!requirements.audio_required||metadata.has_audio?'PASS':'GAP','Audio-track declaration only; content not heard');
 }
 const inspected=obj(evidence)&&evidence.kind==='DIRECT_INSPECTION'&&evidence.bytes_inspected===true&&str(evidence.inspection_ref);
 add('byte_inspection',mock?'GAP':inspected?'PASS':'NOT_VERIFIED',mock?'Synthetic manifest has no media bytes':inspected?'Independent inspection evidence supplied; not reproduced here':'No independent media inspection evidence');
 const creative=obj(evidence)&&evidence.creative_review==='PASS'&&str(evidence.creative_review_ref);
 add('creative_review',mock?'GAP':creative?'PASS':'NOT_VERIFIED',mock?'Mock has no visual/audio quality':creative?'Human review declared; not reproduced here':'No human visual/audio review evidence');
 const status=checks.some(c=>c.status==='GAP')?'GAP':checks.some(c=>c.status==='NOT_VERIFIED')?'NOT_VERIFIED':'PASS';
 return {status,checks,scope:'EVIDENCE_CLASSIFICATION_ONLY',media_generated:false,provider_invoked:false,export_performed:false,publication_authorized:false};
}
module.exports={assessMediaExport};
