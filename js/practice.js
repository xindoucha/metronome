/* ════════════════════════════════════════════
   Drum practice notation
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
    beams:[[0,2,1],[4,6,1],[8,10,1],[12,14,1]]
  },
  sixteenth: {
    title:'十六分控制',
    hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    sd:[4,12],
    bd:[0,6,8,11],
    beams:[[0,3,2],[4,7,2],[8,11,2],[12,15,2]]
  },
  'quarter-eighth': {
    title:'四分到八分',
    hh:[0,4,8,10,12,14],
    sd:[4,12],
    bd:[0,8],
    beams:[[8,10,1],[12,14,1]]
  },
  'eighth-sixteenth': {
    title:'八分到十六分',
    hh:[0,2,4,6,8,9,10,11,12,13,14,15],
    sd:[4,12],
    bd:[0,8,14],
    beams:[[0,2,1],[4,6,1],[8,11,2],[12,15,2]]
  },
  mixed: {
    title:'综合循环',
    hh:[0,4,6,8,9,10,11,12,14],
    sd:[4,12],
    bd:[0,8,11],
    beams:[[4,6,1],[8,11,2],[12,14,1]]
  }
};

function renderDrumScores(){
  document.querySelectorAll('[data-score]').forEach(box=>{
    const pattern=SCORE_PATTERNS[box.dataset.score];
    if(pattern) box.innerHTML=drumScoreSvg(pattern);
  });
}

function drumScoreSvg(pattern){
  const xs=Array.from({length:16},(_,i)=>92+i*19);
  const staff={left:66,right:398,top:35,gap:8.5};
  const y={
    hh:staff.top-16,
    sd:staff.top+staff.gap*2,
    bd:staff.top+staff.gap*4+13
  };
  return `
    <svg class="drum-staff" viewBox="0 0 420 104" role="img" aria-label="${pattern.title}鼓谱">
      ${scoreBackground(staff)}
      ${percussionClef(39,staff.top+3)}
      <text class="staff-time" x="57" y="49" text-anchor="middle">4</text>
      <text class="staff-time" x="57" y="66" text-anchor="middle">4</text>
      ${measureNumbers(xs)}
      ${stems(pattern,xs,y)}
      ${beams(pattern,xs)}
      ${hhNotes(pattern.hh,xs,y.hh)}
      ${roundNotes(pattern.sd,xs,y.sd,'snare')}
      ${roundNotes(pattern.bd,xs,y.bd,'kick')}
    </svg>`;
}

function scoreBackground(staff){
  const lines=Array.from({length:5},(_,i)=>{
    const y=staff.top+i*staff.gap;
    return `<line class="staff-line" x1="${staff.left}" y1="${y}" x2="${staff.right}" y2="${y}"/>`;
  }).join('');
  const bars=[staff.left,staff.left+83,staff.left+166,staff.left+249,staff.right].map((x,i)=>{
    const cls=i===4?'staff-barline final':'staff-barline';
    return `<line class="${cls}" x1="${x}" y1="${staff.top}" x2="${x}" y2="${staff.top+staff.gap*4}"/>`;
  }).join('');
  return lines+bars;
}

function percussionClef(x,y){
  return `
    <rect class="staff-clef" x="${x}" y="${y}" width="4" height="25" rx="1"/>
    <rect class="staff-clef" x="${x+9}" y="${y}" width="4" height="25" rx="1"/>`;
}

function measureNumbers(xs){
  return [0,4,8,12].map((idx,i)=>`<text class="staff-count" x="${xs[idx]}" y="94" text-anchor="middle">${i+1}</text>`).join('');
}

function stems(pattern,xs,y){
  const up=[
    ...pattern.hh.map(i=>`<line class="staff-stem" x1="${xs[i]+5}" y1="${y.hh+2}" x2="${xs[i]+5}" y2="51"/>`),
    ...pattern.sd.map(i=>`<line class="staff-stem" x1="${xs[i]+5}" y1="${y.sd}" x2="${xs[i]+5}" y2="51"/>`)
  ].join('');
  const down=pattern.bd.map(i=>`<line class="staff-stem down" x1="${xs[i]-5}" y1="${y.bd}" x2="${xs[i]-5}" y2="43"/>`).join('');
  return up+down;
}

function beams(pattern,xs){
  return (pattern.beams||[]).map(([start,end,count])=>{
    const x1=xs[start]+5, x2=xs[end]+5;
    const main=`<line class="staff-beam" x1="${x1}" y1="50" x2="${x2}" y2="50"/>`;
    const extra=count>1?`<line class="staff-beam" x1="${x1}" y1="55" x2="${x2}" y2="55"/>`:'';
    return main+extra;
  }).join('');
}

function hhNotes(values,xs,y){
  return values.map(i=>`
    <g class="staff-x">
      <line x1="${xs[i]-5}" y1="${y-5}" x2="${xs[i]+5}" y2="${y+5}"/>
      <line x1="${xs[i]+5}" y1="${y-5}" x2="${xs[i]-5}" y2="${y+5}"/>
    </g>`).join('');
}

function roundNotes(values,xs,y,type){
  return values.map(i=>`<ellipse class="staff-note ${type}" cx="${xs[i]}" cy="${y}" rx="5.6" ry="4.1" transform="rotate(-18 ${xs[i]} ${y})"/>`).join('');
}
