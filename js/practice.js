/* ════════════════════════════════════════════
   VexFlow drum practice notation
════════════════════════════════════════════ */
const PRACTICE_EXERCISES={
  pad:[
    {
      id:'pad-single-eighth',
      step:'01',
      title:'哑鼓垫：八分单击',
      desc:'目标：左右手交替 R L，声音高度和间隔尽量一致。',
      range:'建议 60 → 90 BPM',
      bpm:70,
      subdiv:'2',
      aria:'哑鼓垫八分单击谱'
    },
    {
      id:'pad-single-sixteenth',
      step:'02',
      title:'哑鼓垫：十六分单击',
      desc:'目标：R L R L 连续交替，手腕小动作，不靠手臂硬砸。',
      range:'建议 50 → 75 BPM',
      bpm:60,
      subdiv:'4',
      aria:'哑鼓垫十六分单击谱'
    },
    {
      id:'pad-double-sixteenth',
      step:'03',
      title:'哑鼓垫：双击基础',
      desc:'目标：R R L L 成组练习，第二下不要塌掉，保持回弹。',
      range:'建议 45 → 70 BPM',
      bpm:56,
      subdiv:'4',
      aria:'哑鼓垫十六分双击谱'
    }
  ],
  kit:[
    {
      id:'quarter',
      step:'04',
      title:'四分音符稳拍',
      desc:'目标：建立 1 2 3 4 的落点，底鼓和军鼓先稳住。',
      range:'建议 70 → 90 BPM',
      bpm:70,
      subdiv:'1',
      aria:'四分音符鼓谱'
    },
    {
      id:'eighth',
      step:'05',
      title:'八分音符律动',
      desc:'目标：右手打满 1 & 2 &，保持二四拍军鼓清晰。',
      range:'建议 70 → 100 BPM',
      bpm:80,
      subdiv:'2',
      aria:'八分音符鼓谱'
    },
    {
      id:'sixteenth',
      step:'06',
      title:'十六分音符控制',
      desc:'目标：右手连续十六分，脚鼓只放在明确位置，别抢拍。',
      range:'建议 55 → 80 BPM',
      bpm:60,
      subdiv:'4',
      aria:'十六分音符鼓谱'
    },
    {
      id:'quarter-eighth',
      step:'07',
      title:'四分 → 八分切换',
      desc:'目标：前两拍四分，后两拍八分，切换时速度感不变。',
      range:'建议 65 → 90 BPM',
      bpm:72,
      subdiv:'2',
      aria:'四分到八分切换鼓谱'
    },
    {
      id:'eighth-sixteenth',
      step:'08',
      title:'八分 → 十六分切换',
      desc:'目标：一小节内完成密度升级，手腕保持小动作。',
      range:'建议 55 → 75 BPM',
      bpm:64,
      subdiv:'4',
      aria:'八分到十六分切换鼓谱'
    },
    {
      id:'mixed',
      step:'09',
      title:'综合循环',
      desc:'目标：四分、八分、十六分交替出现，作为初学者日常热身。',
      range:'建议 60 → 85 BPM',
      bpm:68,
      subdiv:'4',
      aria:'综合循环鼓谱'
    }
  ]
};

const SCORE_PATTERNS={
  'pad-single-eighth': {
    title:'哑鼓垫八分单击',
    pad:true,
    hh:[],
    sd:[0,2,4,6,8,10,12,14],
    bd:[],
    beams:[[0,2],[4,6],[8,10],[12,14]],
    sticking:{0:'R',2:'L',4:'R',6:'L',8:'R',10:'L',12:'R',14:'L'}
  },
  'pad-single-sixteenth': {
    title:'哑鼓垫十六分单击',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'L',6:'R',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'L',14:'R',15:'L'}
  },
  'pad-double-sixteenth': {
    title:'哑鼓垫双击基础',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'R',2:'L',3:'L',4:'R',5:'R',6:'L',7:'L',8:'R',9:'R',10:'L',11:'L',12:'R',13:'R',14:'L',15:'L'}
  },
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

let practiceType='pad';
let practiceExerciseId=PRACTICE_EXERCISES.pad[0].id;

function renderDrumScores(root=document){
  const VF=getVexFlow();
  root.querySelectorAll('[data-score]').forEach(box=>{
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

function initPractice(){
  const typeTabs=document.getElementById('practiceTypeTabs');
  const options=document.getElementById('practiceOptions');
  const detail=document.getElementById('practiceDetail');
  if(!typeTabs||!options||!detail)return;

  typeTabs.addEventListener('click',e=>{
    const btn=e.target.closest('.practice-type');
    if(!btn||btn.dataset.type===practiceType)return;
    practiceType=btn.dataset.type;
    practiceExerciseId=PRACTICE_EXERCISES[practiceType][0].id;
    updatePracticeTypeTabs();
    renderPracticeOptions();
    renderPracticeDetail();
  });

  options.addEventListener('click',e=>{
    const btn=e.target.closest('.practice-option');
    if(!btn||btn.dataset.exercise===practiceExerciseId)return;
    practiceExerciseId=btn.dataset.exercise;
    renderPracticeOptions();
    renderPracticeDetail();
  });

  updatePracticeTypeTabs();
  renderPracticeOptions();
  renderPracticeDetail();
}

function updatePracticeTypeTabs(){
  document.querySelectorAll('.practice-type').forEach(btn=>{
    const active=btn.dataset.type===practiceType;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-selected',String(active));
  });
}

function renderPracticeOptions(){
  const options=document.getElementById('practiceOptions');
  if(!options)return;
  options.innerHTML=PRACTICE_EXERCISES[practiceType].map(ex=>`
    <button class="practice-option${ex.id===practiceExerciseId?' active':''}" data-exercise="${ex.id}">
      <span class="practice-option-step">${ex.step}</span>
      <span>${ex.title.replace(/^哑鼓垫：/,'')}</span>
    </button>
  `).join('');
}

function renderPracticeDetail(){
  const detail=document.getElementById('practiceDetail');
  if(!detail)return;
  const exercise=PRACTICE_EXERCISES[practiceType].find(ex=>ex.id===practiceExerciseId);
  if(!exercise){
    detail.innerHTML='<div class="practice-empty">请选择练习内容</div>';
    return;
  }
  detail.innerHTML=`
    <article class="exercise-card">
      <div class="exercise-meta">
        <span class="exercise-step">${exercise.step}</span>
        <div>
          <h2>${exercise.title}</h2>
          <p>${exercise.desc}</p>
        </div>
      </div>
      <div class="exercise-actions">
        <span>${exercise.range}</span>
        <button class="use-exercise" data-bpm="${exercise.bpm}" data-subdiv="${exercise.subdiv}">套用</button>
      </div>
      <div class="drum-score${practiceType==='pad'?' pad-score':''}" data-score="${exercise.id}" aria-label="${exercise.aria}"></div>
    </article>
  `;
  renderDrumScores(detail);
}

function getVexFlow(){
  if(!window.Vex)return null;
  return window.Vex.Flow||window.Vex;
}

function renderVexFlowScore(box,pattern,VF){
  const width=440, height=pattern.sticking?162:142;
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
  addMeasureLabels(box,pattern);
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

function addMeasureLabels(box,pattern){
  const svg=box.querySelector('svg');
  if(!svg)return;
  const ns='http://www.w3.org/2000/svg';
  if(pattern.sticking){
    Object.entries(pattern.sticking).forEach(([pos,label])=>{
      const text=document.createElementNS(ns,'text');
      text.setAttribute('class',`vf-sticking ${label==='R'?'right':'left'}`);
      text.setAttribute('x',String(108+Number(pos)*19));
      text.setAttribute('y','130');
      text.setAttribute('text-anchor','middle');
      text.textContent=label;
      svg.appendChild(text);
    });
  }
  [1,2,3,4].forEach((beat,i)=>{
    const text=document.createElementNS(ns,'text');
    text.setAttribute('class','vf-beat-label');
    text.setAttribute('x',String(108+i*76));
    text.setAttribute('y',pattern.sticking?'150':'128');
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
