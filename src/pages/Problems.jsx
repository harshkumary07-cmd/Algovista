const PROBLEMS = [
  { tag: 'Easy', name: 'Two Sum', topic: 'Arrays', solved: true },
  { tag: 'Easy', name: 'Valid Parentheses', topic: 'Stack', solved: true },
  { tag: 'Easy', name: 'Best Time to Buy Stock', topic: 'DP', solved: true },
  { tag: 'Med', name: 'Longest Substring', topic: 'Sliding Window', solved: true },
  { tag: 'Med', name: '3Sum', topic: 'Arrays', solved: true },
  { tag: 'Med', name: 'Coin Change', topic: 'DP', solved: false },
  { tag: 'Med', name: 'Number of Islands', topic: 'Graphs', solved: false },
  { tag: 'Med', name: 'LRU Cache', topic: 'Design', solved: false },
  { tag: 'Hard', name: 'Trapping Rain Water', topic: 'Two Pointers', solved: false },
  { tag: 'Hard', name: 'Median of Two Sorted Arrays', topic: 'Binary Search', solved: false },
  { tag: 'Hard', name: 'Word Ladder', topic: 'BFS', solved: false },
]

export default function Problems() {
  return (
    <div className="page-content">
      <div className="ph"><h1>Problems</h1><p>248 problems — track your progress across all topics</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">All problems</span><span className="cs">248 total</span></div>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="prob-row">
              <span className={`dtag ${p.tag === 'Easy' ? 'de' : p.tag === 'Med' ? 'dm' : 'dh'}`}>{p.tag}</span>
              <span className="aname">{p.name}</span>
              <span style={{ fontSize: 10, color: '#44444e' }}>{p.topic}</span>
              {p.solved && (
                <div className="ast ok">
                  <svg viewBox="0 0 7 7" fill="none" stroke="#3a9e62" strokeWidth="1.5"><polyline points="1,3.5 2.8,5.5 6,1.5"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="card">
            <div className="ch"><span className="ct">By difficulty</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#0a1f12', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#3a9e62' }}>47</div>
                <div style={{ fontSize: 10, color: '#3a9e62', marginTop: 2 }}>Easy</div>
              </div>
              <div style={{ flex: 1, background: '#1f160a', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#c07a1a' }}>29</div>
                <div style={{ fontSize: 10, color: '#c07a1a', marginTop: 2 }}>Medium</div>
              </div>
              <div style={{ flex: 1, background: '#1f0a0a', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#c04040' }}>8</div>
                <div style={{ fontSize: 10, color: '#c04040', marginTop: 2 }}>Hard</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="ch"><span className="ct">Unsolved</span><span style={{ fontSize: 10, background: '#1a1830', color: '#7c6ff7', padding: '2px 7px', borderRadius: 3 }}>164 left</span></div>
            {PROBLEMS.filter(p => !p.solved).slice(0, 4).map((p, i) => (
              <div key={i} className="prob-row">
                <span className={`dtag ${p.tag === 'Easy' ? 'de' : p.tag === 'Med' ? 'dm' : 'dh'}`}>{p.tag}</span>
                <span className="aname">{p.name}</span>
                <span style={{ fontSize: 10, color: '#44444e' }}>{p.topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
