/* ════════════════════════════════════════════
   Audio-to-drum-score product demo
   The current version demonstrates the workflow with preset score data.
════════════════════════════════════════════ */
(()=>{
  const EIGHTH_BEAMS=[[0,2],[4,6],[8,10],[12,14]];
  const SIXTEENTH_BEAMS=[[0,3],[4,7],[8,11],[12,15]];

  const LEVELS={
    starter:{
      hint:'保留主干节奏，适合第一次跟歌练习。',
      kept:'24 / 52', rule:'稳定八分律动', tempo:'65–80 BPM', confidence:'91%',
      bars:[
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,8],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,8,10],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,6,8],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,8,14],beams:EIGHTH_BEAMS}
      ]
    },
    basic:{
      hint:'保留关键切分和段尾变化，适合稳定八分律动后练习。',
      kept:'34 / 52', rule:'保留关键底鼓切分', tempo:'72–92 BPM', confidence:'88%',
      bars:[
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,6,8,14],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,3,8,10,14],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,6,8,11],beams:EIGHTH_BEAMS},
        {hh:[0,2,4,6,8,10,12,14],sd:[4,12],bd:[0,7,8,14,15],beams:EIGHTH_BEAMS}
      ]
    },
    advanced:{
      hint:'加入十六分踩镲、弱起底鼓和动态变化，接近原始演奏。',
      kept:'44 / 52', rule:'保留动态与弱起', tempo:'80–100 BPM', confidence:'84%',
      bars:[
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,12],bd:[0,6,8,11,14],beams:SIXTEENTH_BEAMS,accents:[0,8]},
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,12],bd:[0,3,7,8,10,14],beams:SIXTEENTH_BEAMS,accents:[0,8]},
        {hh:[0,2,4,6,8,9,10,11,12,13,14,15],sd:[4,12,15],bd:[0,6,8,11,14],beams:[[0,2],[4,6],[8,11],[12,15]],accents:[0,8]},
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,12,14,15],bd:[0,7,8,10,13],beams:SIXTEENTH_BEAMS,accents:[0,8]}
      ]
    },
    original:{
      hint:'显示全部检测事件和低置信度细节，适合人工校对。',
      kept:'52 / 52', rule:'不简化 · 待校对', tempo:'原速 92 BPM', confidence:'78%',
      bars:[
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,11,12],bd:[0,3,6,8,11,14],beams:SIXTEENTH_BEAMS,accents:[0,8]},
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,7,12,15],bd:[0,3,7,8,10,14],beams:SIXTEENTH_BEAMS,accents:[0,8]},
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[3,4,12,15],bd:[0,6,8,11,14],beams:SIXTEENTH_BEAMS,accents:[0,8]},
        {hh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sd:[4,11,12,14,15],bd:[0,3,7,8,10,13,15],beams:SIXTEENTH_BEAMS,accents:[0,8]}
      ]
    }
  };

  let currentLevel='starter';
  let audioUrl='';
  let uploadedFile=null;
  let analysisTimer=null;

  function initTranscriptionDemo(){
    const panel=document.getElementById('panelTranscription');
    if(!panel)return;

    document.getElementById('difficultySwitch').addEventListener('click',event=>{
      const button=event.target.closest('.difficulty-btn');
      if(!button)return;
      setDifficulty(button.dataset.level);
    });

    const fileInput=document.getElementById('audioFile');
    fileInput.addEventListener('change',()=>useFile(fileInput.files[0]));

    const drop=document.getElementById('audioDrop');
    ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,event=>{
      event.preventDefault();
      drop.classList.add('dragging');
    }));
    ['dragleave','drop'].forEach(type=>drop.addEventListener(type,event=>{
      event.preventDefault();
      drop.classList.remove('dragging');
    }));
    drop.addEventListener('drop',event=>useFile(event.dataTransfer.files[0]));

    document.getElementById('useDemoAudio').addEventListener('click',useBuiltInDemo);
    document.getElementById('transcriptionBars').addEventListener('change',()=>{
      setDifficulty(currentLevel);
      setProgress(100,'分析范围已更新',`当前展示 ${selectedBarCount()} 小节示例结果`);
    });
    document.getElementById('generateScore').addEventListener('click',runDemoAnalysis);
    document.getElementById('downloadDemoJson').addEventListener('click',downloadDemoJson);

    setDifficulty('starter');
  }

  function useFile(file){
    if(!file||!file.type.startsWith('audio/'))return;
    uploadedFile=file;
    if(audioUrl)URL.revokeObjectURL(audioUrl);
    audioUrl=URL.createObjectURL(file);

    const preview=document.getElementById('audioPreview');
    preview.src=audioUrl;
    preview.classList.add('visible');
    const drop=document.getElementById('audioDrop');
    drop.classList.add('has-file');
    document.getElementById('audioDropTitle').textContent=file.name;
    document.getElementById('audioDropMeta').textContent=`${formatBytes(file.size)} · 仅本地预览`;
    document.getElementById('resultSource').textContent=`待生成 · ${file.name}`;

    preview.onloadedmetadata=()=>{
      if(Number.isFinite(preview.duration)){
        document.getElementById('audioDropMeta').textContent=`${formatBytes(file.size)} · ${formatDuration(preview.duration)} · 仅本地预览`;
      }
    };
  }

  function useBuiltInDemo(){
    uploadedFile=null;
    if(audioUrl)URL.revokeObjectURL(audioUrl);
    audioUrl='';
    const preview=document.getElementById('audioPreview');
    preview.removeAttribute('src');
    preview.classList.remove('visible');
    const drop=document.getElementById('audioDrop');
    drop.classList.remove('has-file');
    document.getElementById('audioDropTitle').textContent='上传歌曲片段';
    document.getElementById('audioDropMeta').textContent='MP3 / WAV / M4A，建议 30–60 秒';
    document.getElementById('resultSource').textContent='内置示例 · Indie Pop Groove';
    document.getElementById('resultTitle').textContent='主歌节奏转录';
    setProgress(100,'示例结果已就绪','可直接切换难度查看变化');
    setDifficulty('starter');
  }

  function runDemoAnalysis(){
    clearInterval(analysisTimer);
    const button=document.getElementById('generateScore');
    const steps=[
      [12,'读取音频结构','检查时长、采样率和声道'],
      [34,'分离鼓组声部','Demucs 鼓轨分离流程演示'],
      [58,'识别鼓击事件','检测底鼓、军鼓和踩镲落点'],
      [78,'对齐拍点与小节','量化到十六分音符网格'],
      [100,'生成完成','已生成 4 个可切换难度的鼓谱版本']
    ];
    let index=0;
    button.disabled=true;
    setProgress(...steps[index]);
    analysisTimer=setInterval(()=>{
      index+=1;
      setProgress(...steps[index]);
      if(index===steps.length-1){
        clearInterval(analysisTimer);
        analysisTimer=null;
        button.disabled=false;
        document.getElementById('resultSource').textContent=uploadedFile?`本地 Demo · ${uploadedFile.name}`:'内置示例 · Indie Pop Groove';
        document.getElementById('resultTitle').textContent=uploadedFile?'模拟转录结果':'主歌节奏转录';
        setProgress(100,'生成完成',`已生成 ${selectedBarCount()} 小节和 4 个可切换难度的鼓谱版本`);
        setDifficulty('starter');
      }
    },520);
  }

  function setProgress(percent,title,text){
    document.getElementById('analysisProgressBar').style.width=`${percent}%`;
    document.getElementById('analysisProgressTitle').textContent=title;
    document.getElementById('analysisProgressText').textContent=text;
  }

  function setDifficulty(level){
    if(!LEVELS[level])return;
    currentLevel=level;
    document.querySelectorAll('.difficulty-btn').forEach(button=>{
      button.classList.toggle('active',button.dataset.level===level);
    });
    const data=LEVELS[level];
    document.getElementById('difficultyHint').textContent=data.hint;
    const [kept,total]=data.kept.split(' / ').map(Number);
    const multiplier=selectedBarCount()/4;
    document.getElementById('keptNotes').textContent=`${kept*multiplier} / ${total*multiplier}`;
    document.getElementById('simplifyRule').textContent=data.rule;
    document.getElementById('practiceTempo').textContent=data.tempo;
    document.getElementById('resultConfidence').textContent=data.confidence;
    renderTranscriptionScore();
  }

  function renderTranscriptionScore(){
    const root=document.getElementById('transcriptionScore');
    const VF=typeof getVexFlow==='function'?getVexFlow():null;
    if(!root)return;
    root.innerHTML='';
    if(!VF||typeof renderVexFlowScore!=='function'){
      root.innerHTML='<div class="practice-empty">鼓谱引擎加载失败，请刷新页面</div>';
      return;
    }
    const sourceBars=LEVELS[currentLevel].bars;
    Array.from({length:selectedBarCount()},(_,index)=>sourceBars[index%sourceBars.length]).forEach((pattern,index)=>{
      const measure=document.createElement('div');
      measure.className='drum-score transcription-measure';
      measure.setAttribute('aria-label',`第 ${index+1} 小节`);
      renderVexFlowScore(measure,{...pattern,title:`第 ${index+1} 小节`},VF);
      const label=document.createElement('span');
      label.className='measure-number';
      label.textContent=String(index+1).padStart(2,'0');
      measure.appendChild(label);
      root.appendChild(measure);
    });
  }

  function downloadDemoJson(){
    const payload={
      demo:true,
      source:uploadedFile?uploadedFile.name:'Indie Pop Groove',
      bpm:92,
      timeSignature:'4/4',
      difficulty:currentLevel,
      generatedAt:new Date().toISOString(),
      measures:Array.from(
        {length:selectedBarCount()},
        (_,index)=>LEVELS[currentLevel].bars[index%LEVELS[currentLevel].bars.length]
      )
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement('a');
    anchor.href=url;
    anchor.download=`drum-score-demo-${currentLevel}.json`;
    anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),0);
  }

  function formatBytes(bytes){
    if(bytes<1024*1024)return `${Math.max(1,Math.round(bytes/1024))} KB`;
    return `${(bytes/(1024*1024)).toFixed(1)} MB`;
  }

  function selectedBarCount(){
    return document.getElementById('transcriptionBars')?.value==='8'?8:4;
  }

  function formatDuration(seconds){
    const minutes=Math.floor(seconds/60);
    return `${minutes}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
  }

  window.initTranscriptionDemo=initTranscriptionDemo;
  initTranscriptionDemo();
})();
