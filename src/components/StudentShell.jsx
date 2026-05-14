import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Dashboard from '../pages/Dashboard'
import Problems from '../pages/Problems'
import Topics from '../pages/Topics'
import Contests from '../pages/Contests'
import Analytics from '../pages/Analytics'
import Bookmarks from '../pages/Bookmarks'
import Hints from '../pages/Hints'
import WeaknessDetector from '../pages/WeaknessDetector'
import FocusMode from '../pages/FocusMode'
import PeerRadar from '../pages/PeerRadar'
import SpacedRepetition from '../pages/SpacedRepetition'

const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg viewBox="0 0 13 13"><rect x="1" y="1" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="1" width="4.5" height="4.5" rx="1"/><rect x="1" y="7.5" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1"/></svg> },
  { id: 'problems', label: 'Problems', icon: <svg viewBox="0 0 13 13"><path d="M1.5 3.5h10M1.5 6.5h7M1.5 9.5h5"/></svg>, badge: '248' },
  { id: 'topics', label: 'Topics', icon: <svg viewBox="0 0 13 13"><rect x="1" y="1" width="4" height="4" rx="1"/><rect x="8" y="1" width="4" height="4" rx="1"/><rect x="1" y="8" width="4" height="4" rx="1"/><rect x="8" y="8" width="4" height="4" rx="1"/></svg> },
  { id: 'contests', label: 'Contests', icon: <svg viewBox="0 0 13 13"><circle cx="6.5" cy="6.5" r="5"/><path d="M6.5 3.5v3l2 2"/></svg> },
]

const NAV_PROGRESS = [
  { id: 'analytics', label: 'Analytics', icon: <svg viewBox="0 0 13 13"><polyline points="1,10 3.5,6 6.5,8 9.5,3 12,5"/></svg> },
  { id: 'bookmarks', label: 'Bookmarks', icon: <svg viewBox="0 0 13 13"><path d="M3 1.5h7v10L6.5 9.5l-3.5 2V1.5z"/></svg> },
]

const NAV_FEATURES = [
  { id: 'hints', label: 'Hints' },
  { id: 'weakness', label: 'Weakness Detector' },
  { id: 'focus', label: 'Focus Mode' },
  { id: 'radar', label: 'Peer Radar' },
  { id: 'spaced', label: 'Spaced Repetition' },
]

const PAGES = {
  dashboard: Dashboard,
  problems: Problems,
  topics: Topics,
  contests: Contests,
  analytics: Analytics,
  bookmarks: Bookmarks,
  hints: Hints,
  weakness: WeaknessDetector,
  focus: FocusMode,
  radar: PeerRadar,
  spaced: SpacedRepetition,
}

export default function StudentShell() {
  const { user, logout } = useUser()
  const [active, setActive] = useState('dashboard')

  const PageComponent = PAGES[active] || Dashboard
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="shell">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 13 13"><polyline points="1,10 4,5 7,7 10,2"/></svg>
          </div>
          <span className="logo-name">Algo<span>Vista</span></span>
        </div>

        <div className="nav-sec">
          <div className="nav-lbl">Main</div>
          {NAV_MAIN.map(item => (
            <div key={item.id} className={`ni${active === item.id ? ' active' : ''}`} onClick={() => setActive(item.id)}>
              {item.icon}
              {item.label}
              {item.badge && <span className="nbadge">{item.badge}</span>}
            </div>
          ))}
        </div>

        <div className="nav-sec" style={{ marginTop: 4 }}>
          <div className="nav-lbl">Progress</div>
          {NAV_PROGRESS.map(item => (
            <div key={item.id} className={`ni${active === item.id ? ' active' : ''}`} onClick={() => setActive(item.id)}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        <div className="nav-sec" style={{ marginTop: 4 }}>
          <div className="nav-lbl">Features</div>
          {NAV_FEATURES.map(item => (
            <div key={item.id} className={`ni-ft${active === item.id ? ' active' : ''}`} onClick={() => setActive(item.id)}>
              <div className="ft-dot"></div>
              {item.label}
            </div>
          ))}
        </div>

        <div className="sb-bot">
          <div className="urow">
            <div className="uav">{initials}</div>
            <div className="uinfo">
              <p>{user.name}</p>
              <span>{user.batch}</span>
            </div>
            <div title="Logout" onClick={logout} style={{ marginLeft: 'auto', cursor: 'pointer', color: '#33333c', fontSize: 10 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 6H1M5 3l-3 3 3 3M9 3h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <PageComponent />
      </div>
    </div>
  )
}
