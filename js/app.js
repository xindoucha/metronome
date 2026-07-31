/* ════════════════════════════════════════════
   State
════════════════════════════════════════════ */
let bpm=120, beats=4, noteValue=4, subdiv='1', sound='realdrums', vol=0.8;
let playing=false, isDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
// accentLevels: 0=strong,1=normal,2=ghost,3=mute
let accentLevels=[0,1,1,1];

let currentBeat=0, nextBeatTime=0, timerID=null, beatQueue=[], rafID=null;
let tapTimes=[], tapTimer=null, pressTimer=null;
const LA=25, SA=0.12;

/* ════════════════════════════════════════════
   Tempo
════════════════════════════════════════════ */
const TEMPOS=[[20,'Larghissimo'],[40,'Grave'],[60,'Largo'],[66,'Larghetto'],[76,'Adagio'],
              [108,'Andante'],[120,'Moderato'],[156,'Allegro'],[176,'Vivace'],[200,'Presto'],[240,'Prestissimo']];
const tempoOf=b=>{ for(const[m,n]of TEMPOS)if(b<=m)return n; return'Prestissimo'; };

/* ════════════════════════════════════════════
   Audio
════════════════════════════════════════════ */
let _ctx=null;
const AC=()=>{
  if(!_ctx){
    _ctx=new(window.AudioContext||window.webkitAudioContext)();
  }
  return _ctx;
};
// Volume multipliers per click type
const VM={accent:1,beat:.72,sub:.38,ghost:.28};
const SAMPLE_SOUNDS=new Set(['realdrums','acousticclick','hatpulse']);
const SAMPLE_URLS={
  kick:'assets/audio/drums/kick.wav',
  snare:'assets/audio/drums/snare.wav',
  rim:'assets/audio/drums/rim.wav',
  hat:'assets/audio/drums/hat-closed.wav',
};
let sampleBuffers=null, sampleLoadPromise=null;

function isSampleSound(name){
  return SAMPLE_SOUNDS.has(name);
}

function loadDrumSamples(c=AC()){
  if(sampleBuffers)return Promise.resolve(sampleBuffers);
  if(!sampleLoadPromise){
    sampleLoadPromise=Promise.all(Object.entries(SAMPLE_URLS).map(async([name,url])=>{
      const res=await fetch(url);
      if(!res.ok)throw new Error(`Failed to load ${url}: ${res.status}`);
      const data=await res.arrayBuffer();
      const buffer=await c.decodeAudioData(data);
      return [name,buffer];
    })).then(entries=>{
      sampleBuffers=Object.fromEntries(entries);
      return sampleBuffers;
    }).catch(err=>{
      sampleLoadPromise=null;
      console.warn('[Audio] drum samples unavailable, falling back to synthesized kit.',err);
      throw err;
    });
  }
  return sampleLoadPromise;
}

function ensureSoundReady(){
  if(!isSampleSound(sound))return Promise.resolve();
  return loadDrumSamples(AC()).catch(()=>{});
}

function playSample(c,name,t,gain=1,rate=1,dur){
  const buffer=sampleBuffers&&sampleBuffers[name];
  if(!buffer)return false;
  const src=c.createBufferSource(),g=c.createGain();
  const len=dur||buffer.duration;
  src.buffer=buffer;
  src.playbackRate.setValueAtTime(rate,t);
  g.gain.setValueAtTime(Math.max(.0001,gain),t);
  g.gain.exponentialRampToValueAtTime(.0001,t+Math.min(len,.32));
  src.connect(g);g.connect(c.destination);
  src.start(t);
  src.stop(t+len+.01);
  return true;
}

function playSampleLayers(c,layers,t,baseGain){
  if(!sampleBuffers)return false;
  let played=false;
  layers.forEach(layer=>{
    const [name,gain=1,offset=0,rate=1,dur]=layer;
    played=playSample(c,name,t+offset,baseGain*gain,rate,dur)||played;
  });
  return played;
}

// Resolve accent level → click type
function levelToType(beatIdx){
  const l=accentLevels[beatIdx]??1;
  if(l===3)return null;
  if(l===0)return'accent';
  if(l===1)return'beat';
  return'ghost';  // l===2
}

const SND={
  classic:(c,t,tp,v)=>{
    const m=v*VM[tp],fh=tp==='accent'?1800:tp==='beat'?1200:900,fl=tp==='accent'?520:tp==='beat'?370:220;
    const o1=c.createOscillator(),g1=c.createGain();
    o1.type='square';o1.frequency.value=fh;
    g1.gain.setValueAtTime(m*.22,t);g1.gain.exponentialRampToValueAtTime(.0001,t+.022);
    o1.connect(g1);g1.connect(c.destination);o1.start(t);o1.stop(t+.025);
    const o2=c.createOscillator(),g2=c.createGain();
    o2.type='sine';o2.frequency.value=fl;
    g2.gain.setValueAtTime(m*.88,t);g2.gain.exponentialRampToValueAtTime(.0001,t+.055);
    o2.connect(g2);g2.connect(c.destination);o2.start(t);o2.stop(t+.06);
  },
  wood:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?320:tp==='beat'?230:165,dur=.07;
    const r=c.sampleRate,buf=c.createBuffer(1,Math.ceil(r*dur),r),d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(d.length*.18));
    const ns=c.createBufferSource();ns.buffer=buf;
    const flt=c.createBiquadFilter();flt.type='bandpass';flt.frequency.value=f*2.2;flt.Q.value=3;
    const ng=c.createGain();ng.gain.setValueAtTime(m*.5,t);ng.gain.exponentialRampToValueAtTime(.0001,t+dur);
    ns.connect(flt);flt.connect(ng);ng.connect(c.destination);ns.start(t);ns.stop(t+dur+.01);
    const ot=c.createOscillator(),og=c.createGain();
    ot.type='sine';ot.frequency.value=f;
    og.gain.setValueAtTime(m*.85,t);og.gain.exponentialRampToValueAtTime(.0001,t+dur+.02);
    ot.connect(og);og.connect(c.destination);ot.start(t);ot.stop(t+dur+.03);
  },
  bell:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?1480:tp==='beat'?1108:880,dc=tp==='accent'?1.1:tp==='beat'?.75:.45;
    const o1=c.createOscillator(),g1=c.createGain();
    o1.type='sine';o1.frequency.value=f;
    g1.gain.setValueAtTime(m*.6,t);g1.gain.exponentialRampToValueAtTime(.0001,t+dc);
    o1.connect(g1);g1.connect(c.destination);o1.start(t);o1.stop(t+dc+.05);
    const o2=c.createOscillator(),g2=c.createGain();
    o2.type='sine';o2.frequency.value=f*2.756;
    g2.gain.setValueAtTime(m*.18,t);g2.gain.exponentialRampToValueAtTime(.0001,t+dc*.45);
    o2.connect(g2);g2.connect(c.destination);o2.start(t);o2.stop(t+dc*.5);
    const o3=c.createOscillator(),g3=c.createGain();
    o3.type='square';o3.frequency.value=f*4;
    g3.gain.setValueAtTime(m*.08,t);g3.gain.exponentialRampToValueAtTime(.0001,t+.012);
    o3.connect(g3);g3.connect(c.destination);o3.start(t);o3.stop(t+.015);
  },
  beep:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?880:tp==='beat'?660:440,dur=tp==='sub'?.04:.065;
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(m*.85,t+.004);
    g.gain.setValueAtTime(m*.85,t+dur-.006);g.gain.linearRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.01);
  },
  clap:(c,t,tp,v)=>{
    const m=v*VM[tp];
    [0,.012,.022].forEach((off,i)=>{
      const dur=.06,buf=c.createBuffer(1,Math.ceil(c.sampleRate*dur),c.sampleRate),d=buf.getChannelData(0);
      const a=1/(i===0?8:20);
      for(let j=0;j<d.length;j++)d[j]=(Math.random()*2-1)*Math.exp(-j*a);
      const ns=c.createBufferSource();ns.buffer=buf;
      const fl=c.createBiquadFilter();fl.type='bandpass';fl.frequency.value=1000+i*350;fl.Q.value=1.8;
      const g=c.createGain();g.gain.setValueAtTime(m*(i===0?.9:.45),t+off);
      ns.connect(fl);fl.connect(g);g.connect(c.destination);ns.start(t+off);ns.stop(t+off+dur+.01);
    });
  },
  kick:(c,t,tp,v)=>{
    const m=v*VM[tp],f0=tp==='accent'?190:tp==='beat'?155:120;
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(38,t+.09);
    g.gain.setValueAtTime(m,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.16);
    const o2=c.createOscillator(),g2=c.createGain();
    o2.type='square';o2.frequency.value=520;
    g2.gain.setValueAtTime(m*.3,t);g2.gain.exponentialRampToValueAtTime(.001,t+.016);
    o2.connect(g2);g2.connect(c.destination);o2.start(t);o2.stop(t+.02);
  },
  whistle:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?1760:tp==='beat'?1320:1056,dur=.16;
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';
    o.frequency.setValueAtTime(f*.88,t);o.frequency.linearRampToValueAtTime(f*1.02,t+dur*.4);
    o.frequency.linearRampToValueAtTime(f*.97,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(m*.65,t+.02);
    g.gain.setValueAtTime(m*.65,t+dur-.03);g.gain.linearRampToValueAtTime(0,t+dur);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.01);
  },
  tri:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?3200:tp==='beat'?2400:1800,dc=tp==='accent'?1.6:tp==='beat'?1.1:.6;
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    g.gain.setValueAtTime(m*.5,t);g.gain.exponentialRampToValueAtTime(.0001,t+dc);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dc+.05);
    const o2=c.createOscillator(),g2=c.createGain();
    o2.type='sine';o2.frequency.value=f*1.48;
    g2.gain.setValueAtTime(m*.28,t);g2.gain.exponentialRampToValueAtTime(.0001,t+dc*.5);
    o2.connect(g2);g2.connect(c.destination);o2.start(t);o2.stop(t+dc*.55);
    const o3=c.createOscillator(),g3=c.createGain();
    o3.type='square';o3.frequency.value=f*2.5;
    g3.gain.setValueAtTime(m*.1,t);g3.gain.exponentialRampToValueAtTime(.0001,t+.01);
    o3.connect(g3);g3.connect(c.destination);o3.start(t);o3.stop(t+.015);
  },
  piano:(c,t,tp,v)=>{
    const m=v*VM[tp],f=tp==='accent'?440:tp==='beat'?330:262;
    [[1,.8,.65],[2,.15,.3],[3,.1,.15],[4,.05,.1],[6,.03,.08]].forEach(([k,amp,dc])=>{
      const o=c.createOscillator(),g=c.createGain();
      o.type='sine';o.frequency.value=f*k;
      g.gain.setValueAtTime(m*amp,t);g.gain.exponentialRampToValueAtTime(.0001,t+dc);
      o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dc+.02);
    });
    const on=c.createOscillator(),gn=c.createGain();
    on.type='square';on.frequency.value=f*8;
    gn.gain.setValueAtTime(m*.12,t);gn.gain.exponentialRampToValueAtTime(.0001,t+.008);
    on.connect(gn);gn.connect(c.destination);on.start(t);on.stop(t+.01);
  },
  timer:(c,t,tp,v)=>{
    const m=v*VM[tp],dur=tp==='accent'?.075:tp==='beat'?.052:.035;
    const f=tp==='accent'?2350:tp==='beat'?1850:1450;
    const click=c.createOscillator(),clickGain=c.createGain();
    click.type='square';
    click.frequency.setValueAtTime(f,t);
    click.frequency.exponentialRampToValueAtTime(f*.62,t+dur);
    clickGain.gain.setValueAtTime(m*.5,t);
    clickGain.gain.exponentialRampToValueAtTime(.0001,t+dur);
    click.connect(clickGain);clickGain.connect(c.destination);click.start(t);click.stop(t+dur+.01);

    const r=c.sampleRate,buf=c.createBuffer(1,Math.ceil(r*dur),r),d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(d.length*.12));
    const ns=c.createBufferSource(),bp=c.createBiquadFilter(),ng=c.createGain();
    ns.buffer=buf;
    bp.type='bandpass';bp.frequency.value=tp==='accent'?4200:3600;bp.Q.value=7;
    ng.gain.setValueAtTime(m*.42,t);
    ng.gain.exponentialRampToValueAtTime(.0001,t+dur*.7);
    ns.connect(bp);bp.connect(ng);ng.connect(c.destination);ns.start(t);ns.stop(t+dur);

    if(tp==='accent'){
      const tock=c.createOscillator(),tg=c.createGain();
      tock.type='triangle';tock.frequency.value=720;
      tg.gain.setValueAtTime(m*.25,t+.012);
      tg.gain.exponentialRampToValueAtTime(.0001,t+.09);
      tock.connect(tg);tg.connect(c.destination);tock.start(t+.012);tock.stop(t+.1);
    }
  },
  drumkit:(c,t,tp,v)=>{
    const m=v*VM[tp];
    const hat=(time,amp,dur=.045)=>{
      const r=c.sampleRate,buf=c.createBuffer(1,Math.ceil(r*dur),r),d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(d.length*.23));
      const src=c.createBufferSource(),hp=c.createBiquadFilter(),g=c.createGain();
      src.buffer=buf;hp.type='highpass';hp.frequency.value=6500;
      g.gain.setValueAtTime(amp,time);
      g.gain.exponentialRampToValueAtTime(.0001,time+dur);
      src.connect(hp);hp.connect(g);g.connect(c.destination);src.start(time);src.stop(time+dur+.01);
    };
    const snare=(time,amp)=>{
      const dur=.105,r=c.sampleRate,buf=c.createBuffer(1,Math.ceil(r*dur),r),d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(d.length*.18));
      const src=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();
      src.buffer=buf;bp.type='bandpass';bp.frequency.value=1850;bp.Q.value=.95;
      g.gain.setValueAtTime(amp,time);
      g.gain.exponentialRampToValueAtTime(.0001,time+dur);
      src.connect(bp);bp.connect(g);g.connect(c.destination);src.start(time);src.stop(time+dur+.02);
      const body=c.createOscillator(),bg=c.createGain();
      body.type='triangle';body.frequency.value=185;
      bg.gain.setValueAtTime(amp*.28,time);
      bg.gain.exponentialRampToValueAtTime(.0001,time+.075);
      body.connect(bg);bg.connect(c.destination);body.start(time);body.stop(time+.085);
    };
    const kick=(time,amp)=>{
      const o=c.createOscillator(),g=c.createGain(),click=c.createOscillator(),cg=c.createGain();
      o.type='sine';
      o.frequency.setValueAtTime(118,time);
      o.frequency.exponentialRampToValueAtTime(42,time+.09);
      g.gain.setValueAtTime(amp,time);
      g.gain.exponentialRampToValueAtTime(.0001,time+.16);
      o.connect(g);g.connect(c.destination);o.start(time);o.stop(time+.17);
      click.type='square';click.frequency.value=1500;
      cg.gain.setValueAtTime(amp*.18,time);
      cg.gain.exponentialRampToValueAtTime(.0001,time+.012);
      click.connect(cg);cg.connect(c.destination);click.start(time);click.stop(time+.015);
    };
    if(tp==='accent'){
      kick(t,m*.95);
      snare(t+.004,m*.58);
      hat(t,m*.22,.08);
    } else if(tp==='beat'){
      snare(t,m*.7);
      hat(t,m*.16,.05);
    } else if(tp==='sub'){
      hat(t,m*.5,.038);
    } else {
      hat(t,m*.28,.032);
    }
  },
  realdrums:(c,t,tp,v)=>{
    const m=v*VM[tp];
    let played=false;
    if(tp==='accent'){
      played=playSampleLayers(c,[['kick',.92],['snare',.58,.004,1,.18],['hat',.42,0,1,.09]],t,m);
    } else if(tp==='beat'){
      played=playSampleLayers(c,[['rim',.72,0,1.08,.14],['hat',.26,0,1,.065]],t,m);
    } else if(tp==='sub'){
      played=playSampleLayers(c,[['hat',.72,0,1.08,.045]],t,m);
    } else {
      played=playSampleLayers(c,[['hat',.42,0,1.16,.035]],t,m);
    }
    if(!played)SND.drumkit(c,t,tp,v);
  },
  acousticclick:(c,t,tp,v)=>{
    const m=v*VM[tp];
    let played=false;
    if(tp==='accent'){
      played=playSampleLayers(c,[['rim',.95,0,1.2,.11],['kick',.34,0,1,.11]],t,m);
    } else if(tp==='beat'){
      played=playSampleLayers(c,[['rim',.72,0,1.28,.085]],t,m);
    } else if(tp==='sub'){
      played=playSampleLayers(c,[['hat',.46,0,1.18,.035]],t,m);
    } else {
      played=playSampleLayers(c,[['hat',.25,0,1.25,.03]],t,m);
    }
    if(!played)SND.timer(c,t,tp,v);
  },
  hatpulse:(c,t,tp,v)=>{
    const m=v*VM[tp];
    let played=false;
    if(tp==='accent'){
      played=playSampleLayers(c,[['hat',.82,0,.96,.075],['kick',.22,0,1,.09]],t,m);
    } else if(tp==='beat'){
      played=playSampleLayers(c,[['hat',.64,0,1.04,.052]],t,m);
    } else if(tp==='sub'){
      played=playSampleLayers(c,[['hat',.42,0,1.12,.032]],t,m);
    } else {
      played=playSampleLayers(c,[['hat',.22,0,1.18,.028]],t,m);
    }
    if(!played)SND.drumkit(c,t,tp,v);
  },
};

/* ════════════════════════════════════════════
   Scheduler
════════════════════════════════════════════ */
// Subdivision offset maps: fraction of one beat interval
const SUBDIV_DEFS={
  '1': [0],
  '2': [0, .5],
  '3': [0, 1/3, 2/3],
  '4': [0, .25, .5, .75],
};

function sched(){
  const c=AC(), bi=60/bpm;
  const offsets=SUBDIV_DEFS[subdiv]||[0];
  let scheduled=0;
  while(nextBeatTime<c.currentTime+SA){
    const tp=levelToType(currentBeat);
    if(tp) SND[sound](c,nextBeatTime,tp,vol);
    beatQueue.push({beat:currentBeat, time:nextBeatTime});
    for(let s=1;s<offsets.length;s++)
      SND[sound](c,nextBeatTime+offsets[s]*bi,'sub',vol);
    nextBeatTime+=bi; currentBeat=(currentBeat+1)%beats;
    scheduled++;
  }
  timerID=setTimeout(sched,LA);
}

/* ════════════════════════════════════════════
   Draw loop
════════════════════════════════════════════ */
function draw(){
  if(!playing)return;
  const now=AC().currentTime;
  while(beatQueue.length&&beatQueue[0].time<=now) flashBeat(beatQueue.shift().beat);
  rafID=requestAnimationFrame(draw);
}

/* ════════════════════════════════════════════
   Visuals
════════════════════════════════════════════ */
const LV_CLASS=['lv-strong','lv-normal','lv-ghost','lv-mute'];

function renderIndicator(){
  const box=document.getElementById('beatIndicator');
  box.innerHTML='';
  for(let i=0;i<beats;i++){
    const b=document.createElement('div');
    b.className=`beat-block ${LV_CLASS[accentLevels[i]??1]}`;
    box.appendChild(b);
  }
}

function flashBeat(idx){
  document.querySelectorAll('.beat-block').forEach((b,i)=>{
    b.classList.toggle('lit',i===idx);
  });
}

/* ════════════════════════════════════════════
   Play
════════════════════════════════════════════ */
function startM(){
  const c=AC();
  const buf=c.createBuffer(1,Math.ceil(c.sampleRate*.1),c.sampleRate);
  const src=c.createBufferSource();
  src.buffer=buf; src.connect(c.destination); src.start(0);
  const begin=()=>{
    if(!playing)return;
    currentBeat=0; nextBeatTime=c.currentTime+.3; beatQueue=[];
    sched(); rafID=requestAnimationFrame(draw);
  };
  const beginWhenReady=()=>ensureSoundReady().then(begin);
  if(c.state==='suspended'){
    c.resume().then(beginWhenReady);
  } else {
    beginWhenReady();
  }
}
function stopM(){
  clearTimeout(timerID);timerID=null;
  cancelAnimationFrame(rafID);rafID=null;
  beatQueue=[];
  document.querySelectorAll('.beat-block').forEach(b=>b.classList.remove('lit'));
}
function togglePlay(){
  playing=!playing;
  const btn=document.getElementById('playBtn');
  if(playing){ startM(); btn.classList.add('on'); document.getElementById('playIcon').textContent='⏸'; document.getElementById('playTxt').textContent='停止 / Stop'; }
  else { stopM(); btn.classList.remove('on'); document.getElementById('playIcon').textContent='▶'; document.getElementById('playTxt').textContent='开始 / Start'; }
}

function setAppTab(name){
  document.querySelectorAll('.app-tab').forEach(btn=>{
    const active=btn.dataset.tab===name;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-selected',String(active));
  });
  document.querySelectorAll('.tab-panel').forEach(panel=>{
    panel.classList.toggle('active',panel.id===`panel${name[0].toUpperCase()}${name.slice(1)}`);
  });
}

/* ════════════════════════════════════════════
   BPM
════════════════════════════════════════════ */
function setBPM(v){
  bpm=Math.max(20,Math.min(240,Math.round(v)));
  const nm=tempoOf(bpm);
  document.getElementById('bpmNum').textContent=bpm;
  document.getElementById('bpmSlider').value=bpm;
  document.getElementById('tempoBadge').textContent=nm;
  fillSlider(document.getElementById('bpmSlider'));
}

/* BPM contenteditable */
const numEl=document.getElementById('bpmNum');
numEl.addEventListener('focus',()=>{ requestAnimationFrame(()=>{ const r=document.createRange();r.selectNodeContents(numEl);const s=window.getSelection();s.removeAllRanges();s.addRange(r); }); });
numEl.addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();numEl.blur();return;}
  if(e.key==='Escape'){numEl.textContent=bpm;numEl.blur();return;}
  if(!['0','1','2','3','4','5','6','7','8','9','Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter','Escape'].includes(e.key))e.preventDefault();
});
numEl.addEventListener('blur',()=>{ const v=parseInt(numEl.textContent.replace(/\D/g,''),10); setBPM(isNaN(v)?bpm:v); });
numEl.addEventListener('paste',e=>{ e.preventDefault(); const n=parseInt((e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,''),10); if(!isNaN(n))numEl.textContent=String(Math.max(20,Math.min(240,n))); });

/* ════════════════════════════════════════════
   Slider fill
════════════════════════════════════════════ */
function fillSlider(el){
  const pct=((el.value-el.min)/(el.max-el.min))*100;
  const cs=getComputedStyle(document.documentElement);
  el.style.background=`linear-gradient(to right,${cs.getPropertyValue('--accent').trim()} ${pct}%,${cs.getPropertyValue('--border').trim()} ${pct}%)`;
}

/* ════════════════════════════════════════════
   Time signature
════════════════════════════════════════════ */
const NOTE_VALUES=[2,4,8,16];
let noteIdx=1; // index into NOTE_VALUES, default=4

function tsSig(){ return `${beats}/${NOTE_VALUES[noteIdx]}`; }

function updateTs(){
  document.getElementById('tsBig').textContent=tsSig();
  document.getElementById('beatsVal').textContent=beats;
  document.getElementById('noteVal').textContent=`1/${NOTE_VALUES[noteIdx]}`;
  document.getElementById('cfgTs').textContent=tsSig();
  // Update preset selection
  document.querySelectorAll('.ts-preset').forEach(b=>{
    b.classList.toggle('sel',+b.dataset.beats===beats && +b.dataset.note===NOTE_VALUES[noteIdx]);
  });
  updateAccentSheet();
  renderIndicator();
}

function changeBeats(delta){
  beats=Math.max(1,Math.min(16,beats+delta));
  // resize accentLevels
  while(accentLevels.length<beats) accentLevels.push(1);
  accentLevels=accentLevels.slice(0,beats);
  currentBeat=0;
  updateTs();
  updateCfgDots();
}
function changeNote(delta){
  noteIdx=Math.max(0,Math.min(NOTE_VALUES.length-1,noteIdx+delta));
  updateTs();
}

/* ════════════════════════════════════════════
   Accent
════════════════════════════════════════════ */
const LV_LABELS=['重音','普通','弱拍','静音'];
const LV_CLS_BTN=['lv-strong','lv-normal','lv-ghost','lv-mute'];

function updateAccentSheet(){
  const list=document.getElementById('accentList');
  if(!list)return;
  list.innerHTML='';
  for(let i=0;i<beats;i++){
    const row=document.createElement('div');
    row.className='accent-beat-row';
    const num=document.createElement('div');
    num.className='accent-beat-num'; num.textContent=i+1;
    row.appendChild(num);
    const levels=document.createElement('div');
    levels.className='accent-levels';
    for(let l=0;l<4;l++){
      const btn=document.createElement('button');
      btn.className=`al-btn ${LV_CLS_BTN[l]}`+(accentLevels[i]===l?' sel':'');
      btn.textContent=LV_LABELS[l];
      btn.addEventListener('click',()=>{
        accentLevels[i]=l;
        // update this row's buttons
        levels.querySelectorAll('.al-btn').forEach((b,li)=>b.classList.toggle('sel',li===l));
        updateCfgDots();
        const block=document.querySelectorAll('.beat-block')[i];
        if(block) block.className=`beat-block ${LV_CLASS[l]}`;
      });
      levels.appendChild(btn);
    }
    row.appendChild(levels);
    list.appendChild(row);
  }
}

function updateCfgDots(){
  const container=document.getElementById('cfgDots');
  container.innerHTML='';
  accentLevels.forEach(l=>{
    const d=document.createElement('div');
    d.className=`mini-dot l${l}`;
    container.appendChild(d);
  });
}

function resetAccent(){
  accentLevels=Array.from({length:beats},(_,i)=>i===0?0:1);
  updateAccentSheet();
  updateCfgDots();
  renderIndicator();
}

/* ════════════════════════════════════════════
   Sheet system
════════════════════════════════════════════ */
function openSheet(id){
  document.getElementById('backdrop').classList.add('on');
  document.getElementById(id).classList.add('on');
  document.body.style.overflow='hidden';
  if(id==='sheetAccent') updateAccentSheet();
}
function closeSheet(id){
  document.getElementById('backdrop').classList.remove('on');
  document.getElementById(id).classList.remove('on');
  document.body.style.overflow='';
}
function closeAllSheets(){
  document.querySelectorAll('.sheet.on').forEach(s=>s.classList.remove('on'));
  document.getElementById('backdrop').classList.remove('on');
  document.body.style.overflow='';
}

/* ════════════════════════════════════════════
   Tap
════════════════════════════════════════════ */
function tap(){
  const now=performance.now(); tapTimes.push(now);
  if(tapTimes.length>6)tapTimes.shift();
  const btn=document.getElementById('tapBtn');
  btn.classList.add('flash'); setTimeout(()=>btn.classList.remove('flash'),140);
  if(tapTimes.length>=2){
    let s=0; for(let i=1;i<tapTimes.length;i++)s+=tapTimes[i]-tapTimes[i-1];
    setBPM(60000/(s/(tapTimes.length-1)));
  }
  clearTimeout(tapTimer); tapTimer=setTimeout(()=>{ tapTimes=[]; },2200);
}

/* ════════════════════════════════════════════
   Theme
════════════════════════════════════════════ */
function applyTheme(){
  document.documentElement.setAttribute('data-theme',isDark?'dark':'light');
  document.getElementById('swTrack').classList.toggle('on',isDark);
  setTimeout(()=>{ fillSlider(document.getElementById('bpmSlider')); fillSlider(document.getElementById('volSlider')); },40);
}

/* ════════════════════════════════════════════
   Long press
════════════════════════════════════════════ */
const startPress=dir=>{ setBPM(bpm+dir); pressTimer=setInterval(()=>setBPM(bpm+dir),88); };
const endPress=()=>clearInterval(pressTimer);

/* ════════════════════════════════════════════
   Init
════════════════════════════════════════════ */
applyTheme();
setBPM(120);
fillSlider(document.getElementById('volSlider'));
updateCfgDots();
renderIndicator();
if(typeof initPractice==='function') initPractice();
else if(typeof renderDrumScores==='function') renderDrumScores();

/* ════════════════════════════════════════════
   Events
════════════════════════════════════════════ */
document.getElementById('playBtn').addEventListener('click',togglePlay);

// App tabs
document.querySelectorAll('.app-tab').forEach(btn=>{
  btn.addEventListener('click',()=>setAppTab(btn.dataset.tab));
});

// Theme
const tw=document.getElementById('themeWrap');
tw.addEventListener('click',()=>{ isDark=!isDark; applyTheme(); });
tw.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); isDark=!isDark; applyTheme(); } });

// Tap
document.getElementById('tapBtn').addEventListener('click',tap);

// BPM slider
document.getElementById('bpmSlider').addEventListener('input',e=>{ setBPM(+e.target.value); fillSlider(e.target); });

// Volume
document.getElementById('volSlider').addEventListener('input',e=>{ vol=e.target.value/100; fillSlider(e.target); });

// BPM +/-
['bpmDn','bpmUp'].forEach(id=>{
  const el=document.getElementById(id),dir=id==='bpmUp'?1:-1;
  el.addEventListener('click',()=>setBPM(bpm+dir));
  el.addEventListener('mousedown',()=>startPress(dir));
  el.addEventListener('touchstart',e=>{ e.preventDefault(); startPress(dir); },{passive:false});
  el.addEventListener('mouseup',endPress); el.addEventListener('mouseleave',endPress); el.addEventListener('touchend',endPress);
});

// Subdivision
document.getElementById('subRow').addEventListener('click',e=>{
  const b=e.target.closest('.sub-btn'); if(!b)return;
  document.querySelectorAll('#subRow .sub-btn').forEach(x=>x.classList.remove('sel'));
  b.classList.add('sel'); subdiv=b.dataset.d;
});

// Practice exercises
document.getElementById('panelPractice').addEventListener('click',e=>{
  const btn=e.target.closest('.use-exercise');
  if(!btn)return;
  setBPM(+btn.dataset.bpm);
  subdiv=btn.dataset.subdiv;
  document.querySelectorAll('#subRow .sub-btn').forEach(x=>x.classList.toggle('sel',x.dataset.d===subdiv));
  setAppTab('metronome');
});

// Config buttons → open sheets
document.getElementById('btnTs').addEventListener('click',()=>openSheet('sheetTs'));
document.getElementById('btnSound').addEventListener('click',()=>openSheet('sheetSound'));
document.getElementById('btnAccent').addEventListener('click',()=>openSheet('sheetAccent'));

// Backdrop → close
document.getElementById('backdrop').addEventListener('click',closeAllSheets);

// Sheet close buttons
document.querySelectorAll('.sheet-close').forEach(btn=>{
  btn.addEventListener('click',()=>closeSheet(btn.dataset.close));
});

// ── 拍号 sheet events ──
document.getElementById('beatsDn').addEventListener('click',()=>changeBeats(-1));
document.getElementById('beatsUp').addEventListener('click',()=>changeBeats(1));
document.getElementById('noteDn').addEventListener('click',()=>changeNote(-1));
document.getElementById('noteUp').addEventListener('click',()=>changeNote(1));
document.getElementById('tsPresets').addEventListener('click',e=>{
  const b=e.target.closest('.ts-preset'); if(!b)return;
  beats=+b.dataset.beats;
  // match noteIdx
  noteIdx=NOTE_VALUES.indexOf(+b.dataset.note); if(noteIdx<0)noteIdx=1;
  while(accentLevels.length<beats) accentLevels.push(1);
  accentLevels=accentLevels.slice(0,beats);
  currentBeat=0;
  updateTs();
  updateCfgDots();
});

// ── 音色 sheet events ──
document.getElementById('soundList').addEventListener('click',e=>{
  const item=e.target.closest('.sound-item'); if(!item)return;
  document.querySelectorAll('.sound-item').forEach(x=>x.classList.remove('sel'));
  item.classList.add('sel');
  sound=item.dataset.s;
  // Update config button label
  document.getElementById('cfgSound').textContent=item.querySelector('.sound-name').textContent;
  // Preview sound — await resume for iOS
  const c=AC();
  const preview=()=>ensureSoundReady().then(()=>SND[sound](c,c.currentTime+.05,'accent',vol*.7));
  if(c.state==='suspended') c.resume().then(preview); else preview();
});

// ── Accent reset ──
document.getElementById('accentReset').addEventListener('click',resetAccent);

// ── Keyboard ──
document.addEventListener('keydown',e=>{
  if(document.activeElement===numEl)return;
  if(e.target.tagName==='INPUT')return;
  if(e.code==='Space'){ e.preventDefault(); togglePlay(); }
  if(e.code==='ArrowUp'){ e.preventDefault(); setBPM(bpm+1); }
  if(e.code==='ArrowDown'){ e.preventDefault(); setBPM(bpm-1); }
  if(e.code==='KeyT') tap();
  if(e.code==='Escape') closeAllSheets();
});

// Pre-create AudioContext on first touch (within user gesture) so it's
// ready when the play button is pressed.
document.addEventListener('touchstart', ()=>{ AC(); }, {once:true, passive:true});
