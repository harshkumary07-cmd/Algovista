import { useState } from 'react'

const ASSIGNMENTS = [
  { title: 'Arrays — Week 1', topic: 'Arrays', due: 'Mar 15', submitted: 22, total: 24, status: 'closed' },
  { title: 'Sliding Window Practice', topic: 'Sliding Window', due: 'Mar 22', submitted: 18, total: 24, status: 'active' },
  { title: 'DP Introduction', topic: 'Dynamic Prog.', due: 'Mar 29', submitted: 0, total: 24, status: 'upcoming' },
]

const PROBLEMS = [
  { tag: 'Easy', name: 'Two Sum', topic: 'Arrays' },
  { tag: 'Med', name: 'Longest Substring Without Repeating', topic: 'Sliding Window' },
  { tag: 'Med', name: 'Minimum Size Subarray Sum', topic: 'Sliding Window' },
  { tag: 'Hard', name: 'Trapping Rain Water', topic: 'Arrays' },
]

export default function TeacherAssignments() {
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('Arrays')

  return (
    <div className="page-content">
      <div className="topbar">
        <div className="greet"><h1>Assignments</h1><p>Create and track topic-based practice sets</p></div>
        <div className="tacts">
          <button
            className="fetch-btn"
            style={{ fontSize: 11, padding: '5px 12px' }}
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? 'Cancel' : '+ New assignment'}
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <div style={{ padding: '12px 18px 0' }}>
          <div className="card">
            <div className="ch"><span className="ct">Create assignment</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <div style={{ fontSize: 10.5, color: '#44444e', marginBottom: 5 }}>Title</div>
                <input
                  className="username-input"
                  style={{ width: '100%', maxWidth: '100%' }}
                  placeholder="e.g. Arrays Week 2"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div>
                <div style={{ fontSize: 10.5, color: '#44444e', marginBottom: 5 }}>Topic</div>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  style={{ width: '100%', background: '#141418', border: '0.5px solid #2a2a30', borderRadius: 6, padding: '7px 10px', color: '#f0f0f2', fontSize: 12, outline: 'none' }}
                >
                  {['Arrays', 'Sliding Window', 'Hash Map', 'Trees', 'Dynamic Prog.', 'Graphs'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="fetch-btn"
              style={{ marginTop: 12, fontSize: 11 }}
              onClick={() => setShowCreate(false)}
            >
              Create assignment
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card">
          <div className="ch"><span className="ct">All assignments</span></div>
          {ASSIGNMENTS.map((a, i) => (
            <div key={i} className="act-item">
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#c0c0c8', fontWeight: 500 }}>{a.title}</div>
                <div style={{ fontSize: 10.5, color: '#44444e', marginTop: 2 }}>Due {a.due} · {a.topic}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: a.status === 'active' ? '#9b8ff8' : a.status === 'closed' ? '#44444e' : '#c07a1a' }}>
                  {a.status === 'active' ? 'Active' : a.status === 'closed' ? 'Closed' : 'Upcoming'}
                </div>
                <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>{a.submitted}/{a.total} submitted</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="ch"><span className="ct">Problem bank</span><span className="cs">{PROBLEMS.length} problems</span></div>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="prob-row">
              <span className={`dtag ${p.tag === 'Easy' ? 'de' : p.tag === 'Med' ? 'dm' : 'dh'}`}>{p.tag}</span>
              <span className="aname">{p.name}</span>
              <span style={{ fontSize: 10, color: '#44444e' }}>{p.topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
