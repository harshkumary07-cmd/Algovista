export default function TeacherAnalytics() {
  const weeks = [42, 58, 51, 67]
  const max = 80

  return (
    <div className="page-content">
      <div className="ph"><h1>Analytics</h1><p>Batch-wide performance trends — last 30 days</p></div>

      <div className="srow">
        {[
          ['Total submissions', '1,284', 'this month'],
          ['Acceptance rate', '67%', 'batch avg'],
          ['Most attempted', 'Two Sum', 'Easy'],
          ['Least attempted', 'Word Ladder', 'Hard'],
        ].map(([l, n, s]) => (
          <div key={l} className="sc">
            <div className="sc-lbl">{l}</div>
            <div className="sc-num" style={{ fontSize: 16 }}>{n}</div>
            <div className="sc-sub">{s}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="ch"><span className="ct">Problems solved — batch total per week</span></div>
          <svg width="100%" height="100" viewBox="0 0 260 100">
            {weeks.map((v, i) => {
              const x = 20 + i * 60
              const h = Math.round((v / max) * 72)
              return (
                <g key={i}>
                  <rect x={x} y={80 - h} width={40} height={h} fill={i === 3 ? '#5b4ef5' : '#1a1830'} rx="3"/>
                  <text x={x + 20} y={80 - h - 4} textAnchor="middle" fontSize="9" fill="#55555e">{v}</text>
                  <text x={x + 20} y={92} textAnchor="middle" fontSize="9" fill="#33333c">Week {i + 1}</text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="card">
          <div className="ch"><span className="ct">Submission outcomes — batch</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {[
              ['Accepted', '67%', 67, '#3a9e62'],
              ['Wrong Answer', '20%', 20, '#c04040'],
              ['Time Limit', '8%', 8, '#c07a1a'],
              ['Runtime Error', '5%', 5, '#44444e'],
            ].map(([l, p, w, c]) => (
              <div key={l}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: c }}>{l}</span>
                  <span style={{ color: '#44444e' }}>{p}</span>
                </div>
                <div className="ptrack"><div className="pfill" style={{ width: `${w}%`, background: c }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '7px 18px 18px' }}>
        <div className="card">
          <div className="ch"><span className="ct">Student activity distribution</span></div>
          <div style={{ display: 'flex', gap: 7 }}>
            {[
              ['High activity', '6', '25%', '#3a9e62', '#0a1f12'],
              ['Regular', '12', '50%', '#9b8ff8', '#1a1830'],
              ['Low activity', '4', '17%', '#c07a1a', '#1f160a'],
              ['Inactive', '2', '8%', '#c04040', '#1f0a0a'],
            ].map(([l, n, p, c, bg]) => (
              <div key={l} style={{ flex: 1, background: bg, borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: c }}>{n}</div>
                <div style={{ fontSize: 10, color: c, marginTop: 2, opacity: 0.8 }}>{l}</div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>{p} of batch</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
