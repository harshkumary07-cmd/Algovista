const WEAKNESSES = [
  { priority: 'hi', label: 'High priority', text: 'Off-by-one errors in sliding window', sub: 'Failed 4 of last 5 medium problems', errorPct: 80 },
  { priority: 'hi', label: 'High priority', text: 'Missing edge cases on empty input', sub: '7 wrong submissions shared this pattern', errorPct: 60 },
  { priority: 'md', label: 'Medium', text: 'Base cases in recursion / DP', sub: 'Avg +2 attempts before passing', errorPct: 40 },
  { priority: 'ok', label: 'Improving', text: 'Two pointer initialization', sub: 'Down from 5 errors to 1 this month', errorPct: 15 },
]

const FIX_PROBLEMS = [
  { tag: 'Med', name: 'Minimum Size Subarray Sum', topic: 'Sliding window' },
  { tag: 'Med', name: 'Coin Change', topic: 'DP base case' },
  { tag: 'Med', name: 'Number of Islands', topic: 'Graph visited set' },
]

export default function WeaknessDetector() {
  return (
    <div className="page-content">
      <div className="ph"><h1>Weakness Detector</h1><p>Patterns from your submission history — refreshed daily</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">Detected patterns</span></div>
          {WEAKNESSES.map((w, i) => (
            <div key={i} className="weak-item">
              <div className={`wtag wt-${w.priority}`}>{w.label}</div>
              <div className="wtext">{w.text}</div>
              <div className="wsub">{w.sub}</div>
              <div className="wbar-wrap">
                <div style={{ fontSize: 9.5, color: '#44444e', width: 55 }}>Error rate</div>
                <div className="wbar-track">
                  <div className="wbar-fill" style={{
                    width: `${w.errorPct}%`,
                    background: w.priority === 'hi' ? '#c04040' : w.priority === 'md' ? '#c07a1a' : '#3a9e62'
                  }}></div>
                </div>
                <span style={{ fontSize: 10, color: w.priority === 'hi' ? '#c04040' : w.priority === 'md' ? '#c07a1a' : '#3a9e62' }}>{w.errorPct}%</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="card">
            <div className="ch"><span className="ct">Fix these first</span></div>
            {FIX_PROBLEMS.map((p, i) => (
              <div key={i} className="act-item">
                <span className="dtag dm">{p.tag}</span>
                <span className="aname">{p.name}</span>
                <span style={{ fontSize: 10, color: '#7c6ff7' }}>{p.topic}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ch"><span className="ct">This month</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#0a1f12', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#3a9e62' }}>−3</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 2 }}>Errors</div>
              </div>
              <div style={{ flex: 1, background: '#1a1830', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#9b8ff8' }}>+11</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 2 }}>Solved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
