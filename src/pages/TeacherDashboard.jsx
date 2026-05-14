const STUDENTS = [
  { init: 'R', color: '#1a1830', tc: '#9b8ff8', name: 'Rohan M.', roll: 'CS21001', easy: 58, medium: 51, hard: 33, total: 142, active: true },
  { init: 'P', color: '#0a1f12', tc: '#3a9e62', name: 'Priya K.', roll: 'CS21002', easy: 54, medium: 45, hard: 22, total: 121, active: true },
  { init: 'S', color: '#1f160a', tc: '#c07a1a', name: 'Siddharth J.', roll: 'CS21003', easy: 50, medium: 38, hard: 18, total: 106, active: true },
  { init: 'M', color: '#141420', tc: '#55555e', name: 'Meera P.', roll: 'CS21004', easy: 48, medium: 34, hard: 15, total: 97, active: true },
  { init: 'A', color: '#1a1830', tc: '#9b8ff8', name: 'Arjun Singh', roll: 'CS21005', easy: 47, medium: 29, hard: 8, total: 84, active: true },
]

const ALERTS = [
  { name: 'Anjali B.', roll: 'CS21010', msg: 'No activity in 7 days', type: 'warn' },
  { name: 'Divya M.', roll: 'CS21008', msg: 'Below batch average by 40%', type: 'warn' },
  { name: 'Kavya R.', roll: 'CS21006', msg: 'Inactive for 5 days', type: 'info' },
]

export default function TeacherDashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="page-content">
      <div className="topbar">
        <div className="greet">
          <h1>Overview</h1>
          <p>{today} — Batch 2024</p>
        </div>
        <div className="tacts">
          <div className="spill" style={{ background: '#0a1f12', borderColor: '#1a3a20', color: '#3a9e62' }}>
            <div className="sdot" style={{ background: '#3a9e62' }}></div>
            18 active today
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="srow">
        <div className="sc">
          <div className="sc-lbl">Total students</div>
          <div className="sc-num">24</div>
          <div className="sc-sub">Batch 2024</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Avg solved<span className="sbadge sbup">+4</span></div>
          <div className="sc-num">61</div>
          <div className="sc-sub">per student</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Active this week</div>
          <div className="sc-num" style={{ color: '#3a9e62' }}>18</div>
          <div className="sc-sub">75% of batch</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Need attention</div>
          <div className="sc-num" style={{ color: '#c04040' }}>3</div>
          <div className="sc-sub">inactive students</div>
        </div>
      </div>

      {/* Top performers + Difficulty dist */}
      <div className="g2">
        <div className="card">
          <div className="ch"><span className="ct">Top performers</span><span className="cs">by total solved</span></div>
          {STUDENTS.slice(0, 5).map((s, i) => (
            <div key={i} className="lb-item">
              <span className="lbr">{i + 1}</span>
              <div className="lbav" style={{ background: s.color, color: s.tc }}>{s.init}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: '#c0c0c8' }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#44444e' }}>{s.roll}</div>
              </div>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <span className="stat-chip" style={{ background: '#0a1f12', color: '#3a9e62', fontSize: 9.5 }}>{s.easy}</span>
                <span className="stat-chip" style={{ background: '#1f160a', color: '#c07a1a', fontSize: 9.5 }}>{s.medium}</span>
                <span className="stat-chip" style={{ background: '#1f0a0a', color: '#c04040', fontSize: 9.5 }}>{s.hard}</span>
                <span style={{ fontSize: 11, color: '#9b8ff8', fontWeight: 500, marginLeft: 4, minWidth: 26, textAlign: 'right' }}>{s.total}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="card">
            <div className="ch"><span className="ct">Batch difficulty avg</span></div>
            {[['Easy', 47, 100, '#3a9e62'], ['Medium', 29, 100, '#c07a1a'], ['Hard', 8, 48, '#c04040']].map(([l, v, t, c]) => (
              <div key={l} className="prow">
                <div className="pmeta"><span>{l}</span><span style={{ color: c }}>{v}/{t}</span></div>
                <div className="ptrack"><div className="pfill" style={{ width: `${(v / t) * 100}%`, background: c }}></div></div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="ch"><span className="ct">Needs attention</span><span style={{ fontSize: 10, background: '#1f0a0a', color: '#c04040', padding: '2px 7px', borderRadius: 3 }}>{ALERTS.length}</span></div>
            {ALERTS.map((a, i) => (
              <div key={i} className="act-item">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.type === 'warn' ? '#c04040' : '#c07a1a', flexShrink: 0 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11.5, color: '#c0c0c8' }}>{a.name} <span style={{ color: '#44444e', fontSize: 10 }}>{a.roll}</span></div>
                  <div style={{ fontSize: 10.5, color: '#44444e', marginTop: 1 }}>{a.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic coverage across batch */}
      <div style={{ padding: '7px 18px 18px' }}>
        <div className="card">
          <div className="ch"><span className="ct">Topic coverage — batch average</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 16px' }}>
            {[
              ['Arrays', 72, '#5b4ef5'], ['Hash Map', 60, '#3a9e62'],
              ['Sliding Window', 45, '#c07a1a'], ['Trees', 38, '#2a6090'],
              ['Dynamic Prog.', 28, '#c04040'], ['Graphs', 20, '#44444e'],
            ].map(([name, pct, color]) => (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 3 }}>
                  <span style={{ color: '#88888e' }}>{name}</span>
                  <span style={{ color: '#44444e' }}>{pct}%</span>
                </div>
                <div className="ptrack"><div className="pfill" style={{ width: `${pct}%`, background: color }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
