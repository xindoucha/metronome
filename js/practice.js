/* ════════════════════════════════════════════
   VexFlow drum practice notation
════════════════════════════════════════════ */
const SCORE_PATTERNS={
  quarter: {
    title:'四分稳拍',
    hh:[0,4,8,12],
    sd:[4,12],
    bd:[0,8],
    beams:[]
  },
  eighth: {
    title:'八分律动',
    hh:[0,2,4,6,8,10,12,14],
    sd:[4,12],
    bd:[0,8,10],
    beams:[[0,2],[4,6],[8,10],[12,14]]
  },
  sixteenth: {
    title:'十六分控制',
    hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    sd:[4,12],
    bd:[0,6,8,11],
    beams:[[0,3],[4,7],[8,11],[12,15]]
  },
  'quarter-eighth': {
    title:'四分到八分',
    hh:[0,4,8,10,12,14],
    sd:[4,12],
    bd:[0,8],
    beams:[[8,10],[12,14]]
  },
  'eighth-sixteenth': {
    title:'八分到十六分',
    hh:[0,2,4,6,8,9,10,11,12,13,14,15],
    sd:[4,12],
    bd:[0,8,14],
    beams:[[0,2],[4,6],[8,11],[12,15]]
  },
  mixed: {
    title:'综合循环',
    hh:[0,4,6,8,9,10,11,12,14],
    sd:[4,12],
    bd:[0,8,11],
    beams:[[4,6],[8,11],[12,14]]
  }
};

const DRUM_KEYS={
  hh:'g/5',
  sd:'c/5',
  bd:'f/4'
};

function renderDrumScores(){
  const VF=getVexFlow();
  document.querySelectorAll('[data-score]').forEach(box=>{
    const pattern=SCORE_PATTERNS[box.dataset.score];
    if(!pattern)return;
    box.innerHTML='';
    if(!VF){
      box.innerHTML='<div class="notation-error">鼓谱引擎加载失败，请刷新页面</div>';
      return;
    }
    renderVexFlowScore(box,pattern,VF);
  });
}

function getVexFlow(){
  if(!window.Vex)return null;
  return window.Vex.Flow||window.Vex;
}

function renderVexFlowScore(box,pattern,VF){
  const width=440, height=142;
  const renderer=new VF.Renderer(box,VF.Renderer.Backends.SVG);
  renderer.resize(width,height);
  const context=renderer.getContext();
  context.setFont('Arial',10,'');

  const stave=new VF.Stave(18,30,400);
  stave.addClef('percussion').addTimeSignature('4/4');
  stave.setContext(context).draw();

  const {notes,positionToNote}=buildNotes(pattern,VF);
  const voice=new VF.Voice({num_beats:4,beat_value:4});
  voice.addTickables(notes);

  new VF.Formatter().joinVoices([voice]).format([voice],310);
  voice.draw(context,stave);

  buildBeams(pattern,positionToNote,VF).forEach(beam=>beam.setContext(context).draw());
  addMeasureLabels(box);
  polishPercussionHeads(box);
}

function buildNotes(pattern,VF){
  const positions=eventPositions(pattern);
  const notes=[];
  const positionToNote=new Map();
  positions.forEach((pos,index)=>{
    const next=positions[index+1]??16;
    const duration=durationFromSlots(next-pos);
    const keys=keysAt(pattern,pos);
    const note=new VF.StaveNote({
      clef:'percussion',
      keys,
      duration,
      stem_direction:1,
      auto_stem:false
    });
    note.__gridPosition=pos;
    notes.push(note);
    positionToNote.set(pos,note);
  });
  return {notes,positionToNote};
}

function eventPositions(pattern){
  return [...new Set([...pattern.hh,...pattern.sd,...pattern.bd])].sort((a,b)=>a-b);
}

function keysAt(pattern,pos){
  const keys=[];
  if(pattern.hh.includes(pos))keys.push(DRUM_KEYS.hh);
  if(pattern.sd.includes(pos))keys.push(DRUM_KEYS.sd);
  if(pattern.bd.includes(pos))keys.push(DRUM_KEYS.bd);
  return keys;
}

function durationFromSlots(slots){
  if(slots>=4)return 'q';
  if(slots===2)return '8';
  return '16';
}

function buildBeams(pattern,positionToNote,VF){
  return (pattern.beams||[]).map(([start,end])=>{
    const notes=[];
    for(let pos=start;pos<=end;pos++){
      const note=positionToNote.get(pos);
      if(note)notes.push(note);
    }
    return notes.length>1?new VF.Beam(notes):null;
  }).filter(Boolean);
}

function addMeasureLabels(box){
  const svg=box.querySelector('svg');
  if(!svg)return;
  const ns='http://www.w3.org/2000/svg';
  [1,2,3,4].forEach((beat,i)=>{
    const text=document.createElementNS(ns,'text');
    text.setAttribute('class','vf-beat-label');
    text.setAttribute('x',String(108+i*76));
    text.setAttribute('y','128');
    text.setAttribute('text-anchor','middle');
    text.textContent=beat;
    svg.appendChild(text);
  });
}

function polishPercussionHeads(box){
  const svg=box.querySelector('svg');
  if(!svg)return;
  svg.classList.add('vexflow-staff');
  const ns='http://www.w3.org/2000/svg';
  const heads=[...svg.querySelectorAll('[class*="vf-notehead"]')];
  heads.forEach(head=>{
    const path=head.querySelector('path');
    const d=path?.getAttribute('d')||'';
    const match=d.match(/M\s*([0-9.]+)\s+([0-9.]+)/);
    if(!match)return;
    const cx=Number(match[1])+5;
    const cy=Number(match[2]);
    if(cy<80){
      head.classList.add('vf-hi-hat-head');
      head.innerHTML='';
      const a=document.createElementNS(ns,'line');
      const b=document.createElementNS(ns,'line');
      a.setAttribute('x1',String(cx-5)); a.setAttribute('y1',String(cy-5));
      a.setAttribute('x2',String(cx+5)); a.setAttribute('y2',String(cy+5));
      b.setAttribute('x1',String(cx+5)); b.setAttribute('y1',String(cy-5));
      b.setAttribute('x2',String(cx-5)); b.setAttribute('y2',String(cy+5));
      head.append(a,b);
    } else if(cy>100) {
      head.classList.add('vf-kick-head');
    } else {
      head.classList.add('vf-snare-head');
    }
  });
}
