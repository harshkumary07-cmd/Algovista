const DUE_NOW = [
  { days: '30d', name: 'Two Sum' },
  { days: '14d', name: 'Valid Parentheses' },
  { days: '14d', name: 'Maximum Subarray' },
  { days: '30d', name: 'Climbing Stairs' },
  { days: '14d', name: 'Reverse Linked List' },
]

const COMING = [
  { days: '2d', name: 'Merge Intervals', label: 'in 2 days', cls: 'ds' },
  { days: '5d', name: 'Binary Search', label: 'in 5 days', cls: 'dg' },
  { days: '7d', name: '3Sum', label: 'in 7 days', cls: 'dg' },
]

export default function SpacedRepetition() {
  return (
    <div className="page-content">
      <div className="ph"><h1>Spaced Repetition</h1><p>Problems scheduled for review based on forgetting curve</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch">
            <span className="ct">Due now</span>
            <span style={{ fontSize: 10, background: '#1f0a0a', color: '#c04040', padding: '2px 7px', borderRadius: 3 }}>5 overdue</span>
          </div>
          {DUE_NOW.map((item, i) => (
            <div key={i} className="spaced-item">
              <span className="dpill dn">{item.days}</span>
              <span className="sp-name">{item.name}</span>
              <button className="review-btn">Review</button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="card">
            <div className="ch"><span className="ct">Coming up</span></div>
            {COMING.map((item, i) => (
              <div key={i} className="spaced-item">
                <span className={`dpill ${item.cls}`}>{item.days}</span>
                <span className="sp-name">{item.name}</span>
                <span className="sp-days">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ch"><span className="ct">Retention stats</span></div>
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ flex: 1, background: '#141420', borderRadius: 6, padding: 9, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#f0f0f2' }}>23</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>Reviewed</div>
              </div>
              <div style={{ flex: 1, background: '#0a1f12', borderRadius: 6, padding: 9, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#3a9e62' }}>81%</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>Retention</div>
              </div>
              <div style={{ flex: 1, background: '#1f0a0a', borderRadius: 6, padding: 9, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#c04040' }}>5</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>Overdue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
