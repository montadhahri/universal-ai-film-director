#!/usr/bin/env node
'use strict';
// The Missing Umbrella: original, scripted 2D film example.
// This produces actual media with FFmpeg; it does NOT invoke an AI agent or video model.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const fps=15,seconds=30,width=960,height=540;
const output=path.resolve(process.argv[2]||'build/marketing-showcase');
const frames=path.join(output,'frames');
fs.mkdirSync(frames,{recursive:true});
const bound=x=>Math.min(1,Math.max(0,x));
const ease=x=>{x=bound(x);return x*x*(3-2*x);};
const hash=n=>((Math.sin(n*127.1+91)*43758.5453)%1+1)%1;
const line=(x,y,X,Y,c,w=5,o=1)=>`<line x1="${x}" y1="${y}" x2="${X}" y2="${Y}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
const label=(x,y,v,size=20,color='#dce7ee')=>`<text x="${x}" y="${y}" font-size="${size}" font-family="DejaVu Sans,Arial,sans-serif" fill="${color}">${v}</text>`;
function person(x,y,second,t){
 const coat=second?'#b25c5b':'#33517b',skin='#d8ae94',wobble=Math.sin(t*5)*4;
 return `<g>${line(x-10,y+54,x-16+wobble,y+108,'#1a2d41',12)}
 ${line(x+10,y+54,x+15-wobble,y+108,'#1a2d41',12)}
 <path d="M${x-21} ${y} Q${x} ${y-15} ${x+21} ${y} L${x+22} ${y+61} L${x-22} ${y+61}Z" fill="${coat}" stroke="#203449" stroke-width="3"/>
 ${line(x-17,y+10,x-27+wobble,y+45,coat,11)}
 ${line(x+17,y+10,x+27-wobble,y+45,coat,11)}
 <circle cx="${x}" cy="${y-26}" r="20" fill="${skin}" stroke="#203449" stroke-width="3"/>
 <path d="M${x-20} ${y-36} Q${x-2} ${y-62} ${x+20} ${y-36} L${x-20} ${y-32}Z" fill="#213447"/>
 <circle cx="${x+8}" cy="${y-24}" r="2.5" fill="#23384a"/>
 ${second?`<path d="M${x-17} ${y+2} Q${x+13} ${y+10} ${x+25} ${y+25}" fill="none" stroke="#e3a16b" stroke-width="12" stroke-linecap="round"/>`:''}</g>`;
}
function umbrella(x,y,isOpen){
 if(!isOpen)return line(x,y,x,y+95,'#d9c8a1',5);
 return `<g>${line(x,y,x,y+105,'#d9c8a1',5)}
 <path d="M${x-57} ${y+7} Q${x} ${y-93} ${x+57} ${y+7}
 Q${x+29} ${y-7} ${x} ${y+7} Q${x-29} ${y-7} ${x-57} ${y+7}Z"
 fill="#e9bb53" stroke="#99733a" stroke-width="4"/></g>`;
}
function render(n){
 const t=n/fps,shot=t<6?1:t<12?2:t<19?3:t<26?4:5,clear=ease((t-26)/3);
 const walking=shot===4?ease((t-19)/7)*80:0;
 const first=shot===5?540:355+walking;
 const second=shot===2?765-ease((t-6)/5)*145:shot===5?670:600+walking;
 const title=['','A RAINY EVENING','SOMEONE ELSE ARRIVES','A SMALL GESTURE','BETTER TOGETHER','THE RAIN STOPS'][shot];
 const subtitle=['','One person. One small shelter.','The rain keeps falling.','The umbrella is barely big enough.','Somehow, they make it work.','Small gestures matter.'][shot];
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><defs>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#162c45"/><stop offset="1" stop-color="#52718a"/></linearGradient>
 <linearGradient id="road" x2="0" y2="1"><stop stop-color="#415b71"/><stop offset="1" stop-color="#142b40"/></linearGradient>
 </defs><rect width="960" height="540" fill="url(#sky)"/>
 <circle cx="770" cy="97" r="64" fill="#e5dbad" opacity="${.13+.6*clear}"/>`;
 for(let j=0;j<7;j++){
  const x=(j*187+35)%1000,h=120+(j*33)%85;
  svg+=`<rect x="${x}" y="${312-h}" width="104" height="${h}" fill="#21364d" opacity=".7"/>`;
  for(let k=0;k<4;k++)svg+=`<rect x="${x+18+(k%2)*34}" y="${326-h+Math.floor(k/2)*38}" width="11" height="16" fill="#e1c48a" opacity=".3"/>`;
 }
 svg+=`<rect y="428" width="960" height="112" fill="url(#road)"/>
 <rect x="229" y="212" width="448" height="14" fill="#132b3e"/>
 <rect x="247" y="225" width="9" height="205" fill="#a3b3c0" opacity=".8"/>
 <rect x="651" y="225" width="9" height="205" fill="#a3b3c0" opacity=".8"/>
 <rect x="270" y="245" width="376" height="176" fill="#8ba7b9" opacity=".09" stroke="#d2dce2" stroke-width="3"/>
 <rect x="252" y="399" width="431" height="13" rx="6" fill="#838b96"/>`;
 for(let j=0;j<90;j++){
  const x=(hash(j)*960+t*(33+j%3*16))%960;
  const y=(hash(j+900)*540+t*(125+j%5*21))%540;
  if(y<425)svg+=line(x,y,x-6,y+18,'#c5e2ef',2,(1-clear)*(.14+.4*hash(j+20)));
 }
 if(shot===1)svg+=person(first,344,false,t);
 if(shot===2)svg+=person(first,344,false,t)+person(second,344,true,t);
 if(shot===3)svg+=person(first,344,false,t)+person(second,344,true,t)+`<g opacity="${ease((t-12)/1.5)}">${umbrella(first+52,232,true)}</g>`;
 if(shot===4)svg+=person(first,344,false,t)+person(second,344,true,t)+umbrella((first+second)/2,235,true);
 if(shot===5)svg+=person(first,344,false,t)+person(second,344,true,t)+umbrella(first+73,272,false);
 svg+=`<rect width="960" height="77" fill="#061b2a" opacity=".75"/>
 ${label(48,40,'THE MISSING UMBRELLA',26,'#efc567')}
 ${label(48,63,'AN ORIGINAL 30-SECOND SHORT',12,'#b8cbd5')}
 <rect x="47" y="471" width="868" height="55" rx="11" fill="#071d32" opacity=".85"/>
 ${label(65,493,title,18,'#efc567')}${label(65,517,subtitle,17,'#e5edf3')}
 ${label(887,39,'0'+shot,14,'#c5d8e5')}</svg>`;
 return svg;
}
for(let i=0;i<seconds*fps;i++)fs.writeFileSync(path.join(frames,'frame_'+String(i).padStart(4,'0')+'.svg'),render(i));
const film=path.join(output,'missing-umbrella.mp4');
const args=['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',path.join(frames,'frame_%04d.svg'),
 '-f','lavfi','-i','anoisesrc=color=pink:amplitude=0.02:sample_rate=48000:duration=30',
 '-f','lavfi','-i','sine=frequency=220:sample_rate=48000:duration=30',
 '-filter_complex','[1:a]volume=0.4[a1];[2:a]volume=0.05,afade=t=out:st=27:d=3[a2];[a1][a2]amix=inputs=2:normalize=0,afade=t=out:st=27:d=3[a]',
 '-map','0:v','-map','[a]','-r',String(fps),'-c:v','libx264','-preset','veryfast','-crf','25','-pix_fmt','yuv420p',
 '-c:a','aac','-b:a','96k','-t','30','-movflags','+faststart',film];
const run=spawnSync('ffmpeg',args,{stdio:'inherit'});
if(run.error||run.status!==0)throw new Error('FFmpeg render failed: '+run.error?.message);
console.log('Rendered:',film);
