import { useState } from 'react'
import { useUser } from '../context/UserContext'
import TeacherDashboard from '../pages/TeacherDashboard'
import TeacherStudents from '../pages/TeacherStudents'
import TeacherAnalytics from '../pages/TeacherAnalytics'
import TeacherAssignments from '../pages/TeacherAssignments'

const NAV_MAIN = [
  {
    id: 'dashboard', label: 'Overview',
    icon: <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="1" width="4.5" height="4.5" rx="1"/><rect x="1" y="7.5" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1"/></svg>
  },
  {
    id: 'students', label: 'Students', badge: '24',
    icon: <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6.5" cy="4" r="2"/><path d="M2 11c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4"/></svg>
  },
  {
    id: 'analytics', label: 'Analytics',
    icon: <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1,10 3.5,6 6.5,8 9.5,3 12,5"/></svg>
  },
  {
    id: 'assignments', label: 'Assignments',
    icon: <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2h9v9H2zM4 5h5M4 7h3"/></svg>
  },
]

const PAGES = {
  dashboard: TeacherDashboard,
  students: TeacherStudents,
  analytics: TeacherAnalytics,
  assignments: TeacherAssignments,
}

export default function TeacherShell() {
  const { user, logout } = useUser()
  const [active, setActive] = useState('dashboard')

  const Page = PAGES[active] || TeacherDashboard
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
          <div className="nav-lbl">Teacher Portal</div>
          {NAV_MAIN.map(item => (
            <div
              key={item.id}
              className={`ni${active === item.id ? ' active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              {item.icon}
              {item.label}
              {item.badge && <span className="nbadge">{item.badge}</span>}
            </div>
          ))}
        </div>

        <div className="nav-sec" style={{ marginTop: 4 }}>
          <div className="nav-lbl">Quick stats</div>
          <div style={{ padding: '4px 8px 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: '#44444e' }}>Active today</span>
              <span style={{ fontSize: 10.5, color: '#3a9e62', fontWeight: 500 }}>18 / 24</span>
            </div>
            <div className="ptrack"><div className="pfill" style={{ width: '75%', background: '#3a9e62' }}></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: '#44444e' }}>Avg solved</span>
              <span style={{ fontSize: 10.5, color: '#9b8ff8', fontWeight: 500 }}>61</span>
            </div>
            <div className="ptrack"><div className="pfill" style={{ width: '25%', background: '#5b4ef5' }}></div></div>
          </div>
        </div>

        <div className="sb-bot">
          <div className="urow">
            <div className="uav" style={{ background: '#1a2e1a', color: '#3a9e62' }}>{initials}</div>
            <div className="uinfo">
              <p>{user.name}</p>
              <span>Faculty</span>
            </div>
            <div title="Logout" onClick={logout} style={{ marginLeft: 'auto', cursor: 'pointer', color: '#33333c' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 6H1M5 3l-3 3 3 3M9 3h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <Page />
      </div>
    </div>
  )
}
