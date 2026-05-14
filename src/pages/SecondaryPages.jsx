const TOPICS_DATA = [
  { name: 'Arrays', solved: 18, total: 22, pct: 82, color: '#5b4ef5' },
  { name: 'Hash Map', solved: 14, total: 20, pct: 70, color: '#3a9e62' },
  { name: 'Sliding Window', solved: 11, total: 20, pct: 55, color: '#c07a1a' },
  { name: 'Trees', solved: 8, total: 19, pct: 42, color: '#2a6090' },
  { name: 'Dynamic Prog.', solved: 6, total: 20, pct: 30, color: '#c04040', note: 'needs work' },
  { name: 'Graphs', solved: 3, total: 17, pct: 18, color: '#44444e', note: 'weakest area' },
]

export function Topics() {
  return (
    <div className="page-content">
      <div className="ph"><h1>Topics</h1><p>Browse by pattern — know where you stand in each</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 7 }}>
        {TOPICS_DATA.map(t => (
          <div key={t.name} className="card" style={{ borderLeft: `2px solid ${t.color}`, borderRadius: '0 8px 8px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0c8', marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#f0f0f2' }}>{t.solved} <span style={{ fontSize: 11, color: '#44444e', fontWeight: 400 }}>solved</span></div>
            <div className="ptrack" style={{ margin: '6px 0 4px' }}><div className="pfill" style={{ width: `${t.pct}%`, background: t.color }}></div></div>
            <div style={{ fontSize: 10, color: t.note ? '#c04040' : '#44444e' }}>{t.pct}% complete{t.note ? ` — ${t.note}` : ''}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Contests() {
  return (
    <div className="page-content">
      <div className="ph"><h1>Contests</h1><p>Track upcoming rounds and your past performance</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">Upcoming</span><span style={{ fontSize: 10, background: '#0a1f12', color: '#3a9e62', padding: '2px 7px', borderRadius: 3 }}>2 this week</span></div>
          <div className="act-item">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#c0c0c8', fontWeight: 500 }}>Weekly Contest 390</div>
              <div style={{ fontSize: 10.5, color: '#44444e', marginTop: 2 }}>Sunday 8:00 AM — 1h 30m</div>
            </div>
            <div style={{ fontSize: 10, background: '#1a1830', color: '#7c6ff7', padding: '2px 8px', borderRadius: 4 }}>In 2 days</div>
          </div>
          <div className="act-item">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#c0c0c8', fontWeight: 500 }}>Biweekly Contest 128</div>
              <div style={{ fontSize: 10.5, color: '#44444e', marginTop: 2 }}>Saturday 8:00 PM — 1h 30m</div>
            </div>
            <div style={{ fontSize: 10, background: '#1e1a14', color: '#c08030', padding: '2px 8px', borderRadius: 4 }}>In 5 days</div>
          </div>
        </div>
        <div className="card">
          <div className="ch"><span className="ct">Your history</span></div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {[['12','Contests'],['1,847','Rating'],['Top 28%','Global']].map(([n,l]) => (
              <div key={l} style={{ flex: 1, background: '#141420', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f0f2' }}>{n}</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          {[['Weekly 388','+42'],['Biweekly 127','-18'],['Weekly 386','+65']].map(([n,r]) => (
            <div key={n} className="act-item">
              <span style={{ flex: 1, fontSize: 11.5, color: '#c0c0c8' }}>{n}</span>
              <span style={{ fontSize: 10.5, color: r.startsWith('+') ? '#3a9e62' : '#c04040' }}>{r} rating</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Analytics() {
  const weeks = [18, 24, 15, 27]
  const max = 30
  return (
    <div className="page-content">
      <div className="ph"><h1>Analytics</h1><p>Your solving patterns over the last 30 days</p></div>
      <div style={{ padding: '12px 18px 0' }}>
        <div className="srow" style={{ padding: 0, marginBottom: 7 }}>
          {[['Avg / day','2.8','problems'],['Best day','7','Feb 28'],['Acceptance','71%','all time'],['Current streak','12','days']].map(([l,n,s]) => (
            <div key={l} className="sc">
              <div className="sc-lbl">{l}</div>
              <div className="sc-num" style={{ color: l === 'Acceptance' ? '#3a9e62' : l === 'Current streak' ? '#c08030' : '#f0f0f2' }}>{n}</div>
              <div className="sc-sub">{s}</div>
            </div>
          ))}
        </div>
        <div className="g2" style={{ padding: 0 }}>
          <div className="card">
            <div className="ch"><span className="ct">Problems solved — last 4 weeks</span></div>
            <svg width="100%" height="90" viewBox="0 0 260 90">
              {weeks.map((v, i) => {
                const x = 20 + i * 60; const h = Math.round((v / max) * 65)
                return (
                  <g key={i}>
                    <rect x={x} y={80 - h} width={40} height={h} fill={i === 3 ? '#5b4ef5' : '#1a1830'} rx="3"/>
                    <text x={x + 20} y={80 - h - 4} textAnchor="middle" fontSize="9" fill="#55555e">{v}</text>
                    <text x={x + 20} y={88} textAnchor="middle" fontSize="9" fill="#33333c">Week {i+1}</text>
                  </g>
                )
              })}
            </svg>
          </div>
          <div className="card">
            <div className="ch"><span className="ct">Submission outcomes</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              {[['Accepted','71%',71,'#3a9e62'],['Wrong Answer','18%',18,'#c04040'],['Time Limit','7%',7,'#c07a1a'],['Runtime Error','4%',4,'#44444e']].map(([l,p,w,c]) => (
                <div key={l}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: c }}>{l}</span><span style={{ color: '#44444e' }}>{p}</span>
                  </div>
                  <div className="ptrack"><div className="pfill" style={{ width: `${w}%`, background: c }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Bookmarks() {
  const bms = [
    { tag: 'Hard', name: 'Median of Two Sorted Arrays', topic: 'Binary Search' },
    { tag: 'Hard', name: 'Word Ladder', topic: 'BFS' },
    { tag: 'Med', name: 'LRU Cache', topic: 'Design' },
    { tag: 'Med', name: 'Coin Change', topic: 'DP' },
    { tag: 'Med', name: 'Kth Largest Element', topic: 'Heap' },
  ]
  return (
    <div className="page-content">
      <div className="ph"><h1>Bookmarks</h1><p>Problems saved for later review</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">Saved problems</span><span className="cs">11 total</span></div>
          {bms.map((b, i) => (
            <div key={i} className="act-item">
              <span className={`dtag ${b.tag === 'Hard' ? 'dh' : 'dm'}`}>{b.tag}</span>
              <span className="aname">{b.name}</span>
              <span style={{ fontSize: 10, color: '#44444e' }}>{b.topic}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ch"><span className="ct">By topic</span></div>
          {[['Hard problems',7,100,'#c04040'],['DP patterns',4,57,'#c07a1a'],['Graph problems',3,43,'#2a6090'],['Design problems',2,28,'#44444e']].map(([n,c,p,col]) => (
            <div key={n} className="topic-item">
              <div className="tdot" style={{ background: col }}></div>
              <span className="tname">{n}</span>
              <div className="ttrack"><div className="tfill" style={{ width: `${p}%`, background: col }}></div></div>
              <span className="tpct">{c}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '0.5px solid #1e1e24', fontSize: 10.5, color: '#33333c' }}>
            Mostly saved when you fail a problem. Good instinct.
          </div>
        </div>
      </div>
    </div>
  )
}
