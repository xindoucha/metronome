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
    },
    {
      id:'pad-single-double-mix',
      step:'04',
      title:'哑鼓垫：单双混合',
      desc:'目标：R L R L 接 R R L L，练习从单击过渡到双击。',
      range:'建议 45 → 70 BPM',
      bpm:56,
      subdiv:'4',
      aria:'哑鼓垫单双混合谱'
    },
    {
      id:'pad-paradiddle',
      step:'05',
      title:'哑鼓垫：Paradiddle',
      desc:'目标：R L R R / L R L L，保持每组最后一个双击不赶拍。',
      range:'建议 45 → 75 BPM',
      bpm:58,
      subdiv:'4',
      aria:'哑鼓垫 paradiddle 谱'
    },
    {
      id:'pad-accent-downbeat',
      step:'06',
      title:'哑鼓垫：重音在拍头',
      desc:'目标：每组十六分第 1 下加重，其他三下保持轻而稳。',
      range:'建议 50 → 80 BPM',
      bpm:60,
      subdiv:'4',
      aria:'哑鼓垫拍头重音谱'
    },
    {
      id:'pad-accent-offbeat',
      step:'07',
      title:'哑鼓垫：重音后移',
      desc:'目标：重音移动到每组第 2 下，练习手腕控制和动态差异。',
      range:'建议 45 → 70 BPM',
      bpm:54,
      subdiv:'4',
      aria:'哑鼓垫后移重音谱'
    },
    {
      id:'pad-accent-upbeat',
      step:'08',
      title:'哑鼓垫：反拍重音',
      desc:'目标：重音放在每组第 3 下，保持轻音不要变大。',
      range:'建议 45 → 70 BPM',
      bpm:54,
      subdiv:'4',
      aria:'哑鼓垫反拍重音谱'
    },
    {
      id:'pad-endurance',
      step:'09',
      title:'哑鼓垫：稳定耐力',
      desc:'目标：连续十六分 2 分钟不僵硬，声音、间隔、动作幅度保持一致。',
      range:'建议 50 → 80 BPM',
      bpm:60,
      subdiv:'4',
      aria:'哑鼓垫稳定耐力谱'
    }
  ],
  kit:[
    {
      id:'quarter',
      step:'10',
      title:'四分音符稳拍',
      desc:'目标：建立 1 2 3 4 的落点，底鼓和军鼓先稳住。',
      range:'建议 70 → 90 BPM',
      bpm:70,
      subdiv:'1',
      aria:'四分音符鼓谱'
    },
    {
      id:'eighth',
      step:'11',
      title:'八分音符律动',
      desc:'目标：右手打满 1 & 2 &，保持二四拍军鼓清晰。',
      range:'建议 70 → 100 BPM',
      bpm:80,
      subdiv:'2',
      aria:'八分音符鼓谱'
    },
    {
      id:'sixteenth',
      step:'12',
      title:'十六分音符控制',
      desc:'目标：右手连续十六分，脚鼓只放在明确位置，别抢拍。',
      range:'建议 55 → 80 BPM',
      bpm:60,
      subdiv:'4',
      aria:'十六分音符鼓谱'
    },
    {
      id:'quarter-eighth',
      step:'13',
      title:'四分 → 八分切换',
      desc:'目标：前两拍四分，后两拍八分，切换时速度感不变。',
      range:'建议 65 → 90 BPM',
      bpm:72,
      subdiv:'2',
      aria:'四分到八分切换鼓谱'
    },
    {
      id:'eighth-sixteenth',
      step:'14',
      title:'八分 → 十六分切换',
      desc:'目标：一小节内完成密度升级，手腕保持小动作。',
      range:'建议 55 → 75 BPM',
      bpm:64,
      subdiv:'4',
      aria:'八分到十六分切换鼓谱'
    },
    {
      id:'mixed',
      step:'15',
      title:'综合循环',
      desc:'目标：四分、八分、十六分交替出现，作为初学者日常热身。',
      range:'建议 60 → 85 BPM',
      bpm:68,
      subdiv:'4',
      aria:'综合循环鼓谱'
    },
    {
      id:'gulou-basic',
      step:'16',
      title:'《鼓楼》入门伴奏型',
      desc:'目标：用简单民谣摇滚律动跟歌练稳定，先稳住八分踩镲和二四拍军鼓。',
      range:'建议 62 → 78 BPM',
      bpm:70,
      subdiv:'2',
      aria:'鼓楼入门伴奏型鼓谱'
    }
  ]
};

const PRACTICE_TYPE_LABELS={
  info:'基础知识',
  pad:'哑鼓垫',
  kit:'架子鼓',
  plan:'15天计划'
};

const KNOWLEDGE_TOPICS=[
  {
    id:'notes',
    step:'K1',
    title:'音符时值',
    desc:'先理解一拍里放几个音，再去看练习谱会轻松很多。',
    cards:[
      {mark:'♩', title:'四分音符', text:'一拍一下，只打主拍。适合建立 1 2 3 4 的稳定落点。'},
      {mark:'♪ ♪', title:'八分音符', text:'一拍两下，可以数成 1 & 2 &。多数入门歌曲会先从八分踩镲开始。'},
      {mark:'♬♬', title:'十六分音符', text:'一拍四下，可以数成 1 e & a。先慢速练均匀，不要急着提速。'},
      {mark:'3', title:'三连音', text:'一拍三下，感觉更圆。初学阶段先认识，不必马上追求速度。'}
    ],
    actions:[
      {label:'套用四分', bpm:70, subdiv:'1'},
      {label:'套用八分', bpm:70, subdiv:'2'},
      {label:'套用十六分', bpm:60, subdiv:'4'}
    ]
  },
  {
    id:'drum-map',
    step:'K2',
    title:'鼓谱位置',
    desc:'入门阶段先认三个核心部件：踩镲、军鼓、底鼓。',
    cards:[
      {mark:'HH', title:'踩镲', text:'通常在谱面上方，用 x 符头显示。右手负责稳定脉冲。'},
      {mark:'SD', title:'军鼓', text:'常见在第 2、4 拍出现，是律动的核心重心。'},
      {mark:'BD', title:'底鼓', text:'脚踩，常放在第 1 拍和其他变化位置。先轻踩准，不要抢。'}
    ],
    actions:[
      {label:'练八分律动', type:'kit', exercise:'eighth'},
      {label:'练鼓楼入门型', type:'kit', exercise:'gulou-basic'}
    ]
  },
  {
    id:'stroke-types',
    step:'K3',
    title:'击打类型',
    desc:'同样是打一下，手法和声音控制不同，练习目标也不同。',
    cards:[
      {mark:'R L', title:'单击', text:'左右手轮流。目标是声音、间隔和动作高度一致。'},
      {mark:'R R L L', title:'双击', text:'同一只手连续两下。第二下要靠回弹出来，不要塌掉。'},
      {mark:'>', title:'重音', text:'重音更明显，轻音保持小声。差异来自动作高度，不是硬砸。'},
      {mark:'ghost', title:'轻音', text:'轻音贴近鼓面，保持节奏存在感，但不要盖过重音。'}
    ],
    actions:[
      {label:'练单击', type:'pad', exercise:'pad-single-eighth'},
      {label:'练双击', type:'pad', exercise:'pad-double-sixteenth'},
      {label:'练重音', type:'pad', exercise:'pad-accent-downbeat'}
    ]
  },
  {
    id:'reading',
    step:'K4',
    title:'读谱顺序',
    desc:'不要一眼看所有音。先抓住稳定脉冲，再加其他鼓件。',
    cards:[
      {mark:'1', title:'先看右手', text:'先确认踩镲或哑鼓垫连续音符是否稳定。'},
      {mark:'2', title:'再看军鼓', text:'找第 2、4 拍，知道哪里是律动重心。'},
      {mark:'3', title:'最后看底鼓', text:'底鼓是变化来源，慢速读清楚再上脚。'}
    ],
    actions:[
      {label:'练四分稳拍', type:'kit', exercise:'quarter'},
      {label:'练综合循环', type:'kit', exercise:'mixed'}
    ]
  },
  {
    id:'practice-standard',
    step:'K5',
    title:'练习达标',
    desc:'新手最容易练得太快。用明确标准判断今天是否该提速。',
    cards:[
      {mark:'4小节', title:'连续无错', text:'一条练习能连续 4 小节稳定，再考虑加 5 BPM。'},
      {mark:'-5 BPM', title:'错了降速', text:'如果明显抢拍、拖拍或乱手，不要硬撑，降 5 BPM 重来。'},
      {mark:'录音', title:'自我检查', text:'录 1 分钟，听间隔是否均匀，比边打边猜更可靠。'},
      {mark:'放松', title:'动作质量', text:'手腕、肩膀、脚踝不能僵。紧张时先降速。'}
    ],
    actions:[
      {label:'打开15天计划', type:'plan', plan:'day-1'},
      {label:'练稳定耐力', type:'pad', exercise:'pad-endurance'}
    ]
  }
];

const WEEKLY_PLAN=[
  {
    id:'day-1',
    day:'Day 1',
    stage:'阶段一：手型与落点',
    title:'认识落点：八分单击',
    goal:'先把 R L 交替和 1 2 3 4 的落点对齐。',
    minutes:'15 分钟',
    standard:'70 BPM 连续 4 小节不抢拍，再加到 75 BPM。',
    cues:[
      {mark:'R L', text:'左右手轮流，声音高度尽量一样'},
      {mark:'1 2 3 4', text:'每个数字都要和节拍器主拍重合'}
    ],
    tasks:[
      {exercise:'pad-single-eighth', label:'八分单击', bpm:65, subdiv:'2', time:'8 分钟'},
      {exercise:'quarter', label:'四分稳拍', bpm:70, subdiv:'1', time:'7 分钟'}
    ]
  },
  {
    id:'day-2',
    day:'Day 2',
    stage:'阶段一：手型与落点',
    title:'十六分手腕控制',
    goal:'动作变小，不靠手臂硬砸，先追求均匀。',
    minutes:'18 分钟',
    standard:'60 BPM 连续 4 小节声音均匀，再练 2 分钟耐力。',
    cues:[
      {mark:'R L R L', text:'四下为一组，手腕小幅度连续运动'},
      {mark:'弱而稳', text:'先小声打准，别一上来追求大音量'}
    ],
    tasks:[
      {exercise:'pad-single-sixteenth', label:'十六分单击', bpm:55, subdiv:'4', time:'10 分钟'},
      {exercise:'pad-endurance', label:'稳定耐力', bpm:55, subdiv:'4', time:'8 分钟'}
    ]
  },
  {
    id:'day-3',
    day:'Day 3',
    stage:'阶段一：手型与落点',
    title:'双击入门',
    goal:'让第二下靠回弹出来，不要比第一下明显变小。',
    minutes:'18 分钟',
    standard:'56 BPM 每组 R R L L 清楚，连续 4 小节不乱手。',
    cues:[
      {mark:'R R L L', text:'第二下靠鼓棒回弹，手指轻轻收住'},
      {mark:'慢速', text:'宁可慢一点，也不要把双击打成拖拍'}
    ],
    tasks:[
      {exercise:'pad-double-sixteenth', label:'双击基础', bpm:50, subdiv:'4', time:'10 分钟'},
      {exercise:'pad-single-double-mix', label:'单双混合', bpm:52, subdiv:'4', time:'8 分钟'}
    ]
  },
  {
    id:'day-4',
    day:'Day 4',
    stage:'阶段一：手型与落点',
    title:'重音和轻音',
    goal:'打出明显强弱差异，轻音真的轻，重音不砸。',
    minutes:'20 分钟',
    standard:'54 BPM 重音清楚，轻音不跟着变大。',
    cues:[
      {mark:'> r l r', text:'重音高一点，轻音贴近鼓面'},
      {mark:'强弱差', text:'强音不是用力砸，而是动作高度更明确'}
    ],
    tasks:[
      {exercise:'pad-accent-downbeat', label:'拍头重音', bpm:54, subdiv:'4', time:'7 分钟'},
      {exercise:'pad-accent-offbeat', label:'后移重音', bpm:50, subdiv:'4', time:'7 分钟'},
      {exercise:'pad-accent-upbeat', label:'反拍重音', bpm:50, subdiv:'4', time:'6 分钟'}
    ]
  },
  {
    id:'day-5',
    day:'Day 5',
    stage:'阶段一：手型与落点',
    title:'Paradiddle 组合',
    goal:'熟悉 R L R R / L R L L，为以后加花打基础。',
    minutes:'18 分钟',
    standard:'58 BPM 连续 4 小节不乱手，再加 5 BPM。',
    cues:[
      {mark:'RLRR LRLL', text:'把每四下当成一个单词来记'},
      {mark:'不加速', text:'双击位置最容易突然变快，专门盯住它'}
    ],
    tasks:[
      {exercise:'pad-paradiddle', label:'Paradiddle', bpm:52, subdiv:'4', time:'12 分钟'},
      {exercise:'eighth', label:'八分律动', bpm:76, subdiv:'2', time:'6 分钟'}
    ]
  },
  {
    id:'day-6',
    day:'Day 6',
    stage:'阶段二：上鼓基础',
    title:'上鼓：基础律动',
    goal:'把手上的稳定性带到整套鼓，脚鼓不要抢。',
    minutes:'20 分钟',
    standard:'80 BPM 八分律动连续 8 小节稳定。',
    cues:[
      {mark:'HH 8分', text:'右手像时钟一样稳定，不被脚鼓带跑'},
      {mark:'SD 2/4', text:'军鼓固定在第 2、4 拍，声音清楚'}
    ],
    tasks:[
      {exercise:'quarter', label:'四分稳拍', bpm:72, subdiv:'1', time:'6 分钟'},
      {exercise:'eighth', label:'八分律动', bpm:76, subdiv:'2', time:'8 分钟'},
      {exercise:'gulou-basic', label:'鼓楼入门伴奏型', bpm:68, subdiv:'2', time:'6 分钟'}
    ]
  },
  {
    id:'day-7',
    day:'Day 7',
    stage:'阶段二：上鼓基础',
    title:'复盘日：慢速到中速',
    goal:'不要冲速度，把一周内容串起来，记录最稳的 BPM。',
    minutes:'25 分钟',
    standard:'选择 3 条练习，各连续 4 小节无明显错误。',
    cues:[
      {mark:'记录 BPM', text:'写下今天最稳的速度，不用和别人比'},
      {mark:'4小节', text:'能稳定循环 4 小节，再考虑提速'}
    ],
    tasks:[
      {exercise:'pad-single-sixteenth', label:'十六分单击', bpm:60, subdiv:'4', time:'8 分钟'},
      {exercise:'pad-paradiddle', label:'Paradiddle', bpm:56, subdiv:'4', time:'8 分钟'},
      {exercise:'mixed', label:'综合循环', bpm:66, subdiv:'4', time:'9 分钟'}
    ]
  },
  {
    id:'day-8',
    day:'Day 8',
    stage:'阶段二：上鼓基础',
    title:'脚手分离：底鼓落点',
    goal:'右手保持八分，底鼓只在指定位置出现。',
    minutes:'22 分钟',
    standard:'76 BPM 连续 8 小节，底鼓不提前。',
    cues:[
      {mark:'BD = 脚', text:'脚鼓轻踩准，不要用力跺'},
      {mark:'手不变', text:'脚鼓加入后，右手八分不能变形'}
    ],
    tasks:[
      {exercise:'eighth', label:'八分律动', bpm:72, subdiv:'2', time:'10 分钟'},
      {exercise:'gulou-basic', label:'鼓楼入门伴奏型', bpm:66, subdiv:'2', time:'12 分钟'}
    ]
  },
  {
    id:'day-9',
    day:'Day 9',
    stage:'阶段二：上鼓基础',
    title:'十六分回到哑鼓垫',
    goal:'用一天把手腕重新校准，避免上鼓之后动作变大。',
    minutes:'20 分钟',
    standard:'60 BPM 十六分稳定 2 分钟，手腕不酸僵。',
    cues:[
      {mark:'小动作', text:'鼓棒高度控制在舒服范围，不要抬太高'},
      {mark:'均匀', text:'听每一下间隔，不只看手序'}
    ],
    tasks:[
      {exercise:'pad-single-sixteenth', label:'十六分单击', bpm:58, subdiv:'4', time:'8 分钟'},
      {exercise:'pad-accent-downbeat', label:'拍头重音', bpm:56, subdiv:'4', time:'6 分钟'},
      {exercise:'pad-endurance', label:'稳定耐力', bpm:58, subdiv:'4', time:'6 分钟'}
    ]
  },
  {
    id:'day-10',
    day:'Day 10',
    stage:'阶段二：上鼓基础',
    title:'密度切换：四分到八分',
    goal:'练习从稀到密，速度感不变。',
    minutes:'22 分钟',
    standard:'72 BPM 切换 8 小节，进入八分时不突然变快。',
    cues:[
      {mark:'稀 -> 密', text:'变的是音符数量，不是 BPM'},
      {mark:'先唱再打', text:'心里先数出后两拍八分，再上手'}
    ],
    tasks:[
      {exercise:'quarter-eighth', label:'四分到八分切换', bpm:68, subdiv:'2', time:'12 分钟'},
      {exercise:'eighth', label:'八分律动', bpm:78, subdiv:'2', time:'10 分钟'}
    ]
  },
  {
    id:'day-11',
    day:'Day 11',
    stage:'阶段三：入门整合',
    title:'密度升级：八分到十六分',
    goal:'开始感受更密的右手，不牺牲军鼓和底鼓落点。',
    minutes:'24 分钟',
    standard:'64 BPM 连续 4 小节，十六分段落清楚不糊。',
    cues:[
      {mark:'8 -> 16', text:'右手变密后，二四拍军鼓仍要明显'},
      {mark:'放松', text:'越密越要放松，否则很快失控'}
    ],
    tasks:[
      {exercise:'eighth-sixteenth', label:'八分到十六分切换', bpm:60, subdiv:'4', time:'12 分钟'},
      {exercise:'sixteenth', label:'十六分控制', bpm:58, subdiv:'4', time:'12 分钟'}
    ]
  },
  {
    id:'day-12',
    day:'Day 12',
    stage:'阶段三：入门整合',
    title:'加花准备：Paradiddle 上速度',
    goal:'让 Paradiddle 更顺，为简单过门做准备。',
    minutes:'22 分钟',
    standard:'62 BPM Paradiddle 连续 4 小节不乱手。',
    cues:[
      {mark:'RLRR', text:'右手开头的四下是一组'},
      {mark:'LRLL', text:'左手开头的四下是一组，别只练右手舒服的方向'}
    ],
    tasks:[
      {exercise:'pad-paradiddle', label:'Paradiddle', bpm:58, subdiv:'4', time:'12 分钟'},
      {exercise:'pad-single-double-mix', label:'单双混合', bpm:58, subdiv:'4', time:'10 分钟'}
    ]
  },
  {
    id:'day-13',
    day:'Day 13',
    stage:'阶段三：入门整合',
    title:'跟歌练习：《鼓楼》入门型',
    goal:'用简单伴奏型跟着歌曲感觉练稳定，而不是追求复杂。',
    minutes:'25 分钟',
    standard:'68 BPM 先单独打稳，再尝试跟歌一段不乱。',
    cues:[
      {mark:'HH steady', text:'踩镲是你的轨道，先让它稳定'},
      {mark:'少即是多', text:'底鼓不要加太多，先稳住律动'}
    ],
    tasks:[
      {exercise:'gulou-basic', label:'鼓楼入门伴奏型', bpm:66, subdiv:'2', time:'15 分钟'},
      {exercise:'eighth', label:'八分律动', bpm:78, subdiv:'2', time:'10 分钟'}
    ]
  },
  {
    id:'day-14',
    day:'Day 14',
    stage:'阶段三：入门整合',
    title:'综合循环：稳定优先',
    goal:'把四分、八分、十六分和基础律动串起来。',
    minutes:'28 分钟',
    standard:'综合循环 66 BPM 连续 8 小节，明显错误不超过 1 次。',
    cues:[
      {mark:'循环', text:'错了不要停，回到下一小节继续'},
      {mark:'慢检查', text:'如果错超过 1 次，降 5 BPM 重来'}
    ],
    tasks:[
      {exercise:'mixed', label:'综合循环', bpm:66, subdiv:'4', time:'12 分钟'},
      {exercise:'sixteenth', label:'十六分控制', bpm:60, subdiv:'4', time:'8 分钟'},
      {exercise:'gulou-basic', label:'鼓楼入门伴奏型', bpm:70, subdiv:'2', time:'8 分钟'}
    ]
  },
  {
    id:'day-15',
    day:'Day 15',
    stage:'阶段三：入门整合',
    title:'入门水平自测',
    goal:'检查你是否能稳定完成入门节奏，不追求花哨。',
    minutes:'30 分钟',
    standard:'任选 4 条练习，各连续 8 小节；能稳定完成就进入下一阶段。',
    cues:[
      {mark:'自测', text:'录音或录像 1 分钟，听是否抢拍拖拍'},
      {mark:'过关', text:'稳定比速度重要，达标后再系统学过门'}
    ],
    tasks:[
      {exercise:'pad-single-sixteenth', label:'十六分单击', bpm:62, subdiv:'4', time:'6 分钟'},
      {exercise:'pad-paradiddle', label:'Paradiddle', bpm:60, subdiv:'4', time:'6 分钟'},
      {exercise:'eighth', label:'八分律动', bpm:82, subdiv:'2', time:'8 分钟'},
      {exercise:'mixed', label:'综合循环', bpm:68, subdiv:'4', time:'10 分钟'}
    ]
  }
];

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
  'pad-single-double-mix': {
    title:'哑鼓垫单双混合',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'R',6:'L',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'R',14:'L',15:'L'}
  },
  'pad-paradiddle': {
    title:'哑鼓垫 Paradiddle',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'R',4:'L',5:'R',6:'L',7:'L',8:'R',9:'L',10:'R',11:'R',12:'L',13:'R',14:'L',15:'L'}
  },
  'pad-accent-downbeat': {
    title:'哑鼓垫拍头重音',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'L',6:'R',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'L',14:'R',15:'L'},
    accents:[0,4,8,12]
  },
  'pad-accent-offbeat': {
    title:'哑鼓垫后移重音',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'L',6:'R',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'L',14:'R',15:'L'},
    accents:[1,5,9,13]
  },
  'pad-accent-upbeat': {
    title:'哑鼓垫反拍重音',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'L',6:'R',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'L',14:'R',15:'L'},
    accents:[2,6,10,14]
  },
  'pad-endurance': {
    title:'哑鼓垫稳定耐力',
    pad:true,
    hh:[],
    sd:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    bd:[],
    beams:[[0,3],[4,7],[8,11],[12,15]],
    sticking:{0:'R',1:'L',2:'R',3:'L',4:'R',5:'L',6:'R',7:'L',8:'R',9:'L',10:'R',11:'L',12:'R',13:'L',14:'R',15:'L'}
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
  },
  'gulou-basic': {
    title:'鼓楼入门伴奏型',
    hh:[0,2,4,6,8,10,12,14],
    sd:[4,12],
    bd:[0,6,8,14],
    beams:[[0,2],[4,6],[8,10],[12,14]]
  }
};

const DRUM_KEYS={
  hh:'g/5',
  sd:'c/5',
  bd:'f/4'
};

let practiceType='info';
let knowledgeTopicId=KNOWLEDGE_TOPICS[0].id;
let practiceExerciseId=PRACTICE_EXERCISES.pad[0].id;
let practicePlanId=WEEKLY_PLAN[0].id;

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
    if(practiceType==='info') knowledgeTopicId=KNOWLEDGE_TOPICS[0].id;
    else if(practiceType==='plan') practicePlanId=WEEKLY_PLAN[0].id;
    else practiceExerciseId=PRACTICE_EXERCISES[practiceType][0].id;
    updatePracticeTypeTabs();
    renderPracticeOptions();
    renderPracticeDetail();
  });

  options.addEventListener('click',e=>{
    const btn=e.target.closest('.practice-option');
    if(!btn)return;
    if(practiceType==='info'){
      if(btn.dataset.topic===knowledgeTopicId)return;
      knowledgeTopicId=btn.dataset.topic;
    } else if(practiceType==='plan'){
      if(btn.dataset.plan===practicePlanId)return;
      practicePlanId=btn.dataset.plan;
    } else {
      if(btn.dataset.exercise===practiceExerciseId)return;
      practiceExerciseId=btn.dataset.exercise;
    }
    renderPracticeOptions();
    renderPracticeDetail();
  });

  detail.addEventListener('click',e=>{
    const jump=e.target.closest('.knowledge-jump');
    if(!jump)return;
    practiceType=jump.dataset.type;
    if(practiceType==='plan') practicePlanId=jump.dataset.plan;
    else practiceExerciseId=jump.dataset.exercise;
    updatePracticeTypeTabs();
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
  if(practiceType==='info'){
    options.innerHTML=KNOWLEDGE_TOPICS.map(topic=>`
      <button class="practice-option${topic.id===knowledgeTopicId?' active':''}" data-topic="${topic.id}">
        <span class="practice-option-step">${topic.step}</span>
        <span>${topic.title}</span>
      </button>
    `).join('');
    return;
  }
  if(practiceType==='plan'){
    options.innerHTML=WEEKLY_PLAN.map(plan=>`
      <button class="practice-option${plan.id===practicePlanId?' active':''}" data-plan="${plan.id}">
        <span class="practice-option-step">${plan.day}</span>
        <span>${plan.title}</span>
      </button>
    `).join('');
    return;
  }
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
  if(practiceType==='info'){
    renderKnowledgeDetail(detail);
    return;
  }
  if(practiceType==='plan'){
    renderPlanDetail(detail);
    return;
  }
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
      ${exercise.note?`<div class="exercise-note">${exercise.note}</div>`:''}
      <div class="drum-score${practiceType==='pad'?' pad-score':''}" data-score="${exercise.id}" aria-label="${exercise.aria}"></div>
    </article>
  `;
  renderDrumScores(detail);
}

function renderKnowledgeDetail(detail){
  const topic=KNOWLEDGE_TOPICS.find(item=>item.id===knowledgeTopicId);
  if(!topic){
    detail.innerHTML='<div class="practice-empty">请选择基础知识</div>';
    return;
  }
  detail.innerHTML=`
    <article class="exercise-card knowledge-card">
      <div class="exercise-meta">
        <span class="exercise-step">${topic.step}</span>
        <div>
          <span class="plan-stage">基础知识</span>
          <h2>${topic.title}</h2>
          <p>${topic.desc}</p>
        </div>
      </div>
      <div class="knowledge-grid">
        ${topic.cards.map(card=>`
          <div class="knowledge-item">
            <span class="knowledge-mark">${card.mark}</span>
            <div>
              <strong>${card.title}</strong>
              <p>${card.text}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="knowledge-actions">
        ${topic.actions.map(action=>action.exercise||action.plan?`
          <button class="knowledge-jump" data-type="${action.type}" data-exercise="${action.exercise||''}" data-plan="${action.plan||''}">${action.label}</button>
        `:`
          <button class="use-exercise" data-bpm="${action.bpm}" data-subdiv="${action.subdiv}">${action.label}</button>
        `).join('')}
      </div>
    </article>
  `;
}

function renderPlanDetail(detail){
  const plan=WEEKLY_PLAN.find(item=>item.id===practicePlanId);
  if(!plan){
    detail.innerHTML='<div class="practice-empty">请选择每天任务</div>';
    return;
  }
  detail.innerHTML=`
    <article class="exercise-card plan-card">
      <div class="exercise-meta">
        <span class="exercise-step">${plan.day.replace('Day ','D')}</span>
        <div>
          <span class="plan-stage">${plan.stage}</span>
          <h2>${plan.title}</h2>
          <p>${plan.goal}</p>
        </div>
      </div>
      <div class="plan-summary">
        <div><span>练习时长</span><strong>${plan.minutes}</strong></div>
        <div><span>达标标准</span><strong>${plan.standard}</strong></div>
      </div>
      <div class="plan-cues">
        ${plan.cues.map(cue=>`
          <div class="plan-cue">
            <span>${cue.mark}</span>
            <p>${cue.text}</p>
          </div>
        `).join('')}
      </div>
      <div class="plan-task-list">
        ${plan.tasks.map(task=>`
          <div class="plan-task">
            <div>
              <strong>${task.label}</strong>
              <span>${task.time} · ${task.bpm} BPM</span>
            </div>
            <button class="use-exercise" data-bpm="${task.bpm}" data-subdiv="${task.subdiv}">套用</button>
          </div>
        `).join('')}
      </div>
    </article>
  `;
}

function getVexFlow(){
  if(!window.Vex)return null;
  return window.Vex.Flow||window.Vex;
}

function renderVexFlowScore(box,pattern,VF){
  const positions=eventPositions(pattern);
  const dense=positions.length>=16;
  const width=dense?620:480, height=pattern.sticking?162:142;
  const staveWidth=dense?570:430;
  const formatWidth=dense?480:340;
  const renderer=new VF.Renderer(box,VF.Renderer.Backends.SVG);
  renderer.resize(width,height);
  const context=renderer.getContext();
  context.setFont('Arial',10,'');

  const stave=new VF.Stave(18,30,staveWidth);
  stave.addClef('percussion').addTimeSignature('4/4');
  stave.setContext(context).draw();

  const {notes,positionToNote}=buildNotes(pattern,VF);
  const voice=new VF.Voice({num_beats:4,beat_value:4});
  voice.addTickables(notes);

  new VF.Formatter().joinVoices([voice]).format([voice],formatWidth);
  voice.draw(context,stave);

  buildBeams(pattern,positionToNote,VF).forEach(beam=>beam.setContext(context).draw());
  addMeasureLabels(box,pattern,positionToNote);
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

function noteXAt(positionToNote,pos){
  const note=positionToNote.get(Number(pos));
  if(note&&typeof note.getAbsoluteX==='function')return note.getAbsoluteX();
  return 108+Number(pos)*19;
}

function addMeasureLabels(box,pattern,positionToNote){
  const svg=box.querySelector('svg');
  if(!svg)return;
  const ns='http://www.w3.org/2000/svg';
  if(pattern.sticking){
    Object.entries(pattern.sticking).forEach(([pos,label])=>{
      const text=document.createElementNS(ns,'text');
      text.setAttribute('class',`vf-sticking ${label==='R'?'right':'left'}`);
      text.setAttribute('x',String(noteXAt(positionToNote,pos)));
      text.setAttribute('y','130');
      text.setAttribute('text-anchor','middle');
      text.textContent=label;
      svg.appendChild(text);
    });
  }
  (pattern.accents||[]).forEach(pos=>{
    const text=document.createElementNS(ns,'text');
    text.setAttribute('class','vf-accent-mark');
    text.setAttribute('x',String(noteXAt(positionToNote,pos)));
    text.setAttribute('y','47');
    text.setAttribute('text-anchor','middle');
    text.textContent='>';
    svg.appendChild(text);
  });
  [1,2,3,4].forEach((beat,i)=>{
    const text=document.createElementNS(ns,'text');
    text.setAttribute('class','vf-beat-label');
    text.setAttribute('x',String(noteXAt(positionToNote,i*4)));
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
