import { useState } from 'react'

const STUCK_PROBLEMS = [
  {
    tag: 'Hard', name: 'Trapping Rain Water', ago: '3d ago',
    hints: [
      'What does the water level at any position depend on?',
      'It\'s min(maxLeft, maxRight) — track both as you move inward with two pointers.',
    ]
  },
  {
    tag: 'Hard', name: 'Median of Two Sorted Arrays', ago: '5d ago',
    hints: [
      'Merging is O(n) — you need O(log n). What algorithm does that?',
      'Binary search on a partition: find a split so every left element is smaller than every right element across both arrays.',
    ]
  },
  {
    tag: 'Med', name: 'Longest Consecutive Sequence', ago: '6d ago',
    hints: [
      'Put everything in a HashSet first.',
      'Only start counting if num−1 is NOT in the set. This way you never reprocess a sequence from the middle.',
    ]
  },
]

export default function Hints() {
  const [open, setOpen] = useState({})

  const toggle = (i) => setOpen(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="page-content">
      <div className="ph"><h1>Hints</h1><p>A nudge in the right direction — not the full answer</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">Problems you got stuck on</span><span className="cs">{STUCK_PROBLEMS.length} this week</span></div>
          {STUCK_PROBLEMS.map((p, i) => (
            <div key={i}>
              <div className="hint-act-row">
                <span className={`dtag ${p.tag === 'Hard' ? 'dh' : 'dm'}`}>{p.tag}</span>
                <span className="aname">{p.name}</span>
                <span style={{ fontSize: 10, color: '#44444e', marginRight: 6 }}>{p.ago}</span>
                <button className="hint-btn" onClick={() => toggle(i)}>
                  {open[i] ? 'Hide' : 'Get hint'}
                </button>
              </div>
              {open[i] && (
                <div className="hint-box show">
                  {p.hints.map((h, j) => (
                    <div key={j} className="hint-step" style={{ marginTop: j > 0 ? 6 : 0 }}>
                      <div className="hint-num">{j + 1}</div>
                      <div>{h}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card">
          <div className="ch"><span className="ct">How hints are graded</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 2 }}>
            {[
              ['1', 'Concept reminder', 'Points you to the right pattern — no approach given'],
              ['2', 'Approach nudge', 'Outlines the strategy without writing any code'],
              ['3', 'Key insight', 'Reveals the non-obvious trick that unlocks the solution'],
            ].map(([n, title, desc]) => (
              <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1a1830', color: '#9b8ff8', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 500 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 11.5, color: '#c0c0c8', fontWeight: 500 }}>{title}</div>
                  <div style={{ fontSize: 10.5, color: '#44444e', marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
