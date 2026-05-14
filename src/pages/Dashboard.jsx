import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Heatmap from '../components/Heatmap'

const MOCK_ACTIVITY = [
  { tag: 'Easy', name: 'Two Sum', ok: true, time: '2h ago', topic: 'Arrays' },
  { tag: 'Med', name: 'Longest Substring', ok: true, time: '1d ago', topic: 'Sliding Window' },
  { tag: 'Hard', name: 'Trapping Rain Water', ok: false, time: '3d ago', topic: 'Two Pointers' },
  { tag: 'Med', name: '3Sum', ok: true, time: '4d ago', topic: 'Arrays' },
  { tag: 'Easy', name: 'Best Time to Buy Stock', ok: true, time: '5d ago', topic: 'DP' },
]

const LEADERBOARD = [
  { rank: 1, init: 'R', color: '#1a1830', tc: '#9b8ff8', name: 'Rohan M.', pct: 100, score: 142 },
  { rank: 2, init: 'P', color: '#0a1f12', tc: '#3a9e62', name: 'Priya K.', pct: 85, score: 121 },
  { rank: 3, init: 'S', color: '#1f160a', tc: '#c07a1a', name: 'Siddharth J.', pct: 74, score: 106 },
  { rank: 4, init: 'M', color: '#141420', tc: '#55555e', name: 'Meera P.', pct: 68, score: 97 },
  { rank: 7, init: 'A', color: '#1a1830', tc: '#9b8ff8', name: 'You', pct: 59, score: null, isYou: true },
]

const TOPICS = [
  { name: 'Arrays', pct: 82, color: '#5b4ef5' },
  { name: 'Hash Map', pct: 70, color: '#3a9e62' },
  { name: 'Sliding Window', pct: 55, color: '#c07a1a' },
  { name: 'Dynamic Prog.', pct: 30, color: '#c04040' },
  { name: 'Graphs', pct: 18, color: '#44444e' },
  { name: 'Trees', pct: 42, color: '#2a6090' },
]

export default function Dashboard() {
  const { user, leetcodeData, fetchLeetCode, loading, error } = useUser()
  const [lcUsername, setLcUsername] = useState('')

  // Extract real data if available
  const submitStats = leetcodeData?.matchedUser?.submitStats?.acSubmissionNum || []
  const allCount = submitStats.find(s => s.difficulty === 'All')?.count || 84
  const easyCount = submitStats.find(s => s.difficulty === 'Easy')?.count || 47
  const medCount = submitStats.find(s => s.difficulty === 'Medium')?.count || 29
  const hardCount = submitStats.find(s => s.difficulty === 'Hard')?.count || 8
  const totalAll = leetcodeData?.allQuestionsCount?.find(q => q.difficulty === 'All')?.count || 248
  const streak = leetcodeData?.matchedUser?.userCalendar?.streak || 12
  const calendar = leetcodeData?.matchedUser?.userCalendar?.submissionCalendar

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleFetch = async (e) => {
    e.preventDefault()
    if (lcUsername.trim()) await fetchLeetCode(lcUsername.trim())
  }

  return (
    <div className="page-content">
      <div className="topbar">
        <div className="greet">
          <h1>Dashboard</h1>
          <p>{today} — {user.batch}</p>
        </div>
        <div className="tacts">
          <div className="spill"><div className="sdot"></div>{streak} day streak</div>
          <div className="nbtn">
            <svg viewBox="0 0 13 13"><path d="M6.5 1a4 4 0 0 1 4 4v3l1 1.5H1.5L2.5 8V5a4 4 0 0 1 4-4z"/><path d="M5 11.5a1.5 1.5 0 0 0 3 0"/></svg>
          </div>
        </div>
      </div>

      {/* LeetCode fetch bar */}
      <form className="username-form" onSubmit={handleFetch}>
        <input
          className="username-input"
          placeholder="Enter your LeetCode username to sync data"
          value={lcUsername}
          onChange={e => setLcUsername(e.target.value)}
        />
        <button className="fetch-btn" type="submit" disabled={loading}>
          {loading ? 'Syncing...' : 'Sync LeetCode'}
        </button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      {leetcodeData && <div className="loading-msg" style={{ color: '#3a9e62' }}>Synced with LeetCode</div>}

      {/* Stat cards */}
      <div className="srow">
        <div className="sc">
          <div className="sc-lbl">Problems solved<span className="sbadge sbup">+3</span></div>
          <div className="sc-num">{allCount}</div>
          <div className="sc-sub">of {totalAll} total</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Easy<span className="sbadge sbpct">{Math.round(easyCount / 100 * 100)}%</span></div>
          <div className="sc-num">{easyCount}</div>
          <div className="sc-sub">of 100</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Medium<span className="sbadge sbup">+2</span></div>
          <div className="sc-num">{medCount}</div>
          <div className="sc-sub">of 100</div>
        </div>
        <div className="sc">
          <div className="sc-lbl">Hard</div>
          <div className="sc-num" style={{ color: '#c04040' }}>{hardCount}</div>
          <div className="sc-sub">of 48</div>
        </div>
      </div>

      {/* Progress + Heatmap */}
      <div className="g2">
        <div className="card">
          <div className="ch"><span className="ct">Overall progress</span><button className="cl">View all</button></div>
          <div className="pr-wrap">
            <svg width="62" height="62" viewBox="0 0 62 62" style={{ flexShrink: 0 }}>
              <circle cx="31" cy="31" r="25" fill="none" stroke="#1e1e24" strokeWidth="4.5"/>
              <circle cx="31" cy="31" r="25" fill="none" stroke="#5b4ef5" strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="157"
                strokeDashoffset={157 - (allCount / totalAll) * 157}
                transform="rotate(-90 31 31)"/>
              <text x="31" y="36" textAnchor="middle" fontSize="14" fontWeight="500" fill="#f0f0f2">{allCount}</text>
            </svg>
            <div className="pbars">
              <div className="prow">
                <div className="pmeta"><span>Easy</span><span>{easyCount}/100</span></div>
                <div className="ptrack"><div className="pfill" style={{ width: `${easyCount}%`, background: '#3a9e62' }}></div></div>
              </div>
              <div className="prow">
                <div className="pmeta"><span>Medium</span><span>{medCount}/100</span></div>
                <div className="ptrack"><div className="pfill" style={{ width: `${medCount}%`, background: '#c07a1a' }}></div></div>
              </div>
              <div className="prow" style={{ marginBottom: 0 }}>
                <div className="pmeta"><span>Hard</span><span>{hardCount}/48</span></div>
                <div className="ptrack"><div className="pfill" style={{ width: `${(hardCount/48)*100}%`, background: '#c04040' }}></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="ch"><span className="ct">Activity heatmap</span><span className="cs">Last 90 days</span></div>
          <Heatmap calendar={calendar} />
        </div>
      </div>

      {/* Activity + Leaderboard + Topics */}
      <div className="g3 section-gap">
        {/* Recent Activity */}
        <div className="card">
          <div className="ch"><span className="ct">Recent activity</span><button className="cl">See all</button></div>
          {MOCK_ACTIVITY.map((item, i) => (
            <div key={i} className="act-item">
              <span className={`dtag ${item.tag === 'Easy' ? 'de' : item.tag === 'Med' ? 'dm' : 'dh'}`}>{item.tag}</span>
              <span className="aname">{item.name}</span>
              <div className={`ast ${item.ok ? 'ok' : 'no'}`}>
                <svg viewBox="0 0 7 7" fill="none" stroke={item.ok ? '#3a9e62' : '#c04040'} strokeWidth="1.5">
                  {item.ok
                    ? <polyline points="1,3.5 2.8,5.5 6,1.5"/>
                    : <><line x1="1.5" y1="1.5" x2="5.5" y2="5.5"/><line x1="5.5" y1="1.5" x2="1.5" y2="5.5"/></>
                  }
                </svg>
              </div>
              <div className="ameta">{item.time}<br />{item.topic}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="ch"><span className="ct">Leaderboard</span><span className="cs">Batch rank</span></div>
          {LEADERBOARD.map((lb) => (
            <div key={lb.rank} className="lb-item">
              <span className={`lbr${lb.isYou ? ' you' : ''}`}>{lb.rank}</span>
              <div className="lbav" style={{ background: lb.color, color: lb.tc }}>{lb.init}</div>
              <span className={`lbn${lb.isYou ? ' you' : ''}`}>{lb.name}</span>
              <div className="lbbar"><div className={`lbfill${lb.isYou ? ' you' : ''}`} style={{ width: `${lb.pct}%` }}></div></div>
              <span className={`lbsc${lb.isYou ? ' you' : ''}`}>{lb.isYou ? allCount : lb.score}</span>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div className="card">
          <div className="ch"><span className="ct">Topic coverage</span><button className="cl">Explore</button></div>
          {TOPICS.map((t) => (
            <div key={t.name} className="topic-item">
              <div className="tdot" style={{ background: t.color }}></div>
              <span className="tname">{t.name}</span>
              <div className="ttrack"><div className="tfill" style={{ width: `${t.pct}%`, background: t.color }}></div></div>
              <span className="tpct">{t.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
