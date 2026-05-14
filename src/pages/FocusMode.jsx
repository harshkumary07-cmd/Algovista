import { useState, useEffect, useRef } from 'react'

const TOTAL = 25 * 60

export default function FocusMode() {
  const [timeLeft, setTimeLeft] = useState(TOTAL)
  const [running, setRunning] = useState(false)
  const [sub, setSub] = useState('Ready to focus')
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            setSub('Session complete!')
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const toggle = () => {
    if (!running) {
      setRunning(true)
      setSub('Stay focused...')
    } else {
      setRunning(false)
      setSub('Paused')
    }
  }

  const reset = () => {
    setRunning(false)
    setTimeLeft(TOTAL)
    setSub('Ready to focus')
  }

  const m = Math.floor(timeLeft / 60)
  const s = timeLeft % 60
  const pct = timeLeft / TOTAL
  const circumference = 251
  const offset = Math.round(circumference * (1 - pct))

  return (
    <div className="page-content">
      <div className="ph"><h1>Focus Mode</h1><p>Pomodoro sessions tied to your problem-solving</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="ch" style={{ justifyContent: 'center' }}><span className="ct">Session timer</span></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e24" strokeWidth="5"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#5b4ef5" strokeWidth="5"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.9s linear' }}/>
            </svg>
          </div>
          <div className="focus-display">{m}:{s < 10 ? '0' : ''}{s}</div>
          <div className="focus-sub">{sub}</div>
          <div className="tbtn-row">
            <button className="tbtn go" onClick={toggle}>{running ? 'Pause' : timeLeft < TOTAL ? 'Resume' : 'Start'}</button>
            <button className="tbtn rst" onClick={reset}>Reset</button>
          </div>
          <div className="sess-row">
            <div className="ss"><div className="ss-n">3</div><div className="ss-l">solved today</div></div>
            <div className="ss"><div className="ss-n">47</div><div className="ss-l">min focused</div></div>
            <div className="ss"><div className="ss-n">2</div><div className="ss-l">sessions</div></div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="card">
            <div className="ch"><span className="ct">Session history</span></div>
            {[['25 min','Morning session','Solved 2','de'],['25 min','Afternoon session','Solved 1','de'],['14 min','Evening — interrupted','Solved 0','dm']].map(([dur,name,res,cls]) => (
              <div key={name} className="act-item">
                <span className={`dtag ${cls}`} style={{ minWidth: 50, textAlign: 'center' }}>{dur}</span>
                <span className="aname">{name}</span>
                <span style={{ fontSize: 10, color: '#44444e' }}>{res}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ch"><span className="ct">This week</span></div>
            <div style={{ display: 'flex', gap: 7 }}>
              {[['4','Sessions','#f0f0f2'],['89','Min focused','#9b8ff8'],['6','Solved','#3a9e62']].map(([n,l,c]) => (
                <div key={l} style={{ flex: 1, background: '#141420', borderRadius: 6, padding: 9, textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: c }}>{n}</div>
                  <div style={{ fontSize: 10, color: '#44444e', marginTop: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
