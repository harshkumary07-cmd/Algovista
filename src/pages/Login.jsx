import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Login() {
  const { handleLogin } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')

  const submit = (e) => {
    e.preventDefault()
    const ok = handleLogin(username, password)
    if (!ok) setError('Invalid username or password')
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 13 13"><polyline points="1,10 4,5 7,7 10,2"/></svg>
          </div>
          <span className="logo-name">Algo<span>Vista</span></span>
        </div>

        <form onSubmit={submit}>
          {error && <div className="login-error">{error}</div>}
          <label className="login-label">Username</label>
          <input className="login-input" type="text" placeholder="arjun / teacher"
            value={username} onChange={e => { setUsername(e.target.value); setError('') }} autoFocus />
          <label className="login-label">Password</label>
          <input className="login-input" type="password" placeholder="••••"
            value={password} onChange={e => { setPassword(e.target.value); setError('') }} />
          <button className="login-btn" type="submit">Sign in</button>
        </form>

        <div style={{ marginTop: 16, fontSize: 10.5, color: '#2e2e38', lineHeight: 2 }}>
          <div>Students: <span style={{ color:'#7c6ff7' }}>arjun / priya / rohan / siddharth</span> — pass: <span style={{ color:'#7c6ff7' }}>1234</span></div>
          <div>Teacher: <span style={{ color:'#7c6ff7' }}>teacher</span> — pass: <span style={{ color:'#7c6ff7' }}>admin</span></div>
        </div>
      </div>
    </div>
  )
}
