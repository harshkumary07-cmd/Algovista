// src/context/UserContext.jsx
import { createContext, useContext, useState } from 'react'
import { db } from '../firebase'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'

const UserContext = createContext(null)

const DEMO_ACCOUNTS = [
  { username: 'arjun',     password: '1234',  role: 'student', name: 'Arjun Singh',    batch: 'Batch 2024', roll: 'CS21001' },
  { username: 'priya',     password: '1234',  role: 'student', name: 'Priya K.',        batch: 'Batch 2024', roll: 'CS21002' },
  { username: 'rohan',     password: '1234',  role: 'student', name: 'Rohan M.',        batch: 'Batch 2024', roll: 'CS21003' },
  { username: 'siddharth', password: '1234',  role: 'student', name: 'Siddharth J.',   batch: 'Batch 2024', roll: 'CS21004' },
  { username: 'teacher',   password: 'admin', role: 'teacher', name: 'Prof. Sharma',    batch: '' },
]

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('av_user')) } catch { return null }
  })
  const [leetcodeData, setLeetcodeData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('av_lc_data')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('av_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setLeetcodeData(null)
    localStorage.removeItem('av_user')
    localStorage.removeItem('av_lc_data')
  }

  const handleLogin = (username, password) => {
    const account = DEMO_ACCOUNTS.find(
      a => a.username === username.trim() && a.password === password
    )
    if (account) { login(account); return true }
    return false
  }

  const fetchLeetCode = async (lcUsername) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leetcode?username=' + encodeURIComponent(lcUsername))
      const json = await res.json()
      if (json.error) { setError(json.error); setLoading(false); return false }
      const data = json.data
      setLeetcodeData(data)
      localStorage.setItem('av_lc_data', JSON.stringify(data))
      if (user) {
        try {
          const stats = data?.matchedUser?.submitStats?.acSubmissionNum || []
          await setDoc(doc(db, 'students', user.roll), {
            name: user.name, roll: user.roll, batch: user.batch,
            lcUsername,
            easy:   stats.find(s => s.difficulty === 'Easy')?.count   || 0,
            medium: stats.find(s => s.difficulty === 'Medium')?.count || 0,
            hard:   stats.find(s => s.difficulty === 'Hard')?.count   || 0,
            total:  stats.find(s => s.difficulty === 'All')?.count    || 0,
            streak: data?.matchedUser?.userCalendar?.streak || 0,
            lastSync: new Date().toISOString(),
          })
        } catch(e) { console.warn('Firebase not set up yet:', e.message) }
      }
      setLoading(false)
      return true
    } catch(err) {
      setError('Server not running. Open a terminal and run: npm run dev')
      setLoading(false)
      return false
    }
  }

  const fetchAllStudents = async () => {
    try {
      const snap = await getDocs(collection(db, 'students'))
      return snap.docs.map(d => d.data())
    } catch { return null }
  }

  return (
    <UserContext.Provider value={{ user, login, logout, handleLogin, leetcodeData, fetchLeetCode, loading, error, fetchAllStudents }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
