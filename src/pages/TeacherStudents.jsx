import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'

const MOCK_STUDENTS = [
  { roll:'CS21001', name:'Rohan M.',      easy:58, medium:51, hard:33, total:142, active:true,  lcUsername:'rohanm' },
  { roll:'CS21002', name:'Priya K.',      easy:54, medium:45, hard:22, total:121, active:true,  lcUsername:'priyak' },
  { roll:'CS21003', name:'Siddharth J.', easy:50, medium:38, hard:18, total:106, active:true,  lcUsername:'' },
  { roll:'CS21004', name:'Meera P.',     easy:48, medium:34, hard:15, total:97,  active:true,  lcUsername:'' },
  { roll:'CS21005', name:'Arjun Singh',  easy:47, medium:29, hard:8,  total:84,  active:true,  lcUsername:'' },
  { roll:'CS21006', name:'Kavya R.',     easy:40, medium:25, hard:5,  total:70,  active:false, lcUsername:'' },
  { roll:'CS21007', name:'Nikhil S.',    easy:38, medium:20, hard:3,  total:61,  active:true,  lcUsername:'' },
  { roll:'CS21008', name:'Divya M.',     easy:30, medium:18, hard:2,  total:50,  active:false, lcUsername:'' },
  { roll:'CS21009', name:'Rahul T.',     easy:28, medium:15, hard:1,  total:44,  active:true,  lcUsername:'' },
  { roll:'CS21010', name:'Anjali B.',    easy:22, medium:10, hard:0,  total:32,  active:false, lcUsername:'' },
]

export default function TeacherStudents() {
  const { fetchAllStudents } = useUser()
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [search, setSearch]     = useState('')
  const [realData, setRealData] = useState(false)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetchAllStudents().then(data => {
      if (data && data.length > 0) {
        // Merge real Firebase data over mock — real data wins
        const merged = MOCK_STUDENTS.map(mock => {
          const real = data.find(r => r.roll === mock.roll)
          return real ? { ...mock, ...real, active: true } : mock
        })
        // Add any Firebase students not in mock list
        data.forEach(r => {
          if (!merged.find(m => m.roll === r.roll)) merged.push({ ...r, active: true })
        })
        setStudents(merged)
        setRealData(true)
      }
      setLoading(false)
    })
  }, [])

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => b.total - a.total)

  return (
    <div className="page-content">
      <div className="ph">
        <h1>Students</h1>
        <p>Batch 2024 — academic monitoring{realData ? ' · Live data from Firebase' : ' · Mock data (students need to sync LeetCode)'}</p>
      </div>

      <div className="username-form" style={{ paddingTop: 12 }}>
        <input
          className="username-input"
          placeholder="Search by name or roll number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '100%', flex: 1 }}
        />
        {realData && (
          <span style={{ fontSize: 10.5, color: '#3a9e62', whiteSpace: 'nowrap' }}>
            Live Firebase data
          </span>
        )}
      </div>

      <div style={{ padding: '0 18px 18px' }}>
        <div className="card">
          <div className="ch">
            <span className="ct">All students</span>
            <span className="cs">{filtered.length} shown · sorted by total</span>
          </div>
          {loading ? (
            <div style={{ fontSize: 11, color: '#44444e', padding: '12px 0' }}>Loading...</div>
          ) : (
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>LeetCode</th>
                  <th>Easy</th>
                  <th>Medium</th>
                  <th>Hard</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(s => (
                  <tr key={s.roll}>
                    <td style={{ color: '#44444e' }}>{s.roll}</td>
                    <td style={{ fontWeight: 500, color: '#d0d0d8' }}>{s.name}</td>
                    <td>
                      {s.lcUsername
                        ? <span style={{ fontSize: 10, color: '#7c6ff7' }}>{s.lcUsername}</span>
                        : <span style={{ fontSize: 10, color: '#2e2e38' }}>not linked</span>
                      }
                    </td>
                    <td><span className="stat-chip" style={{ background:'#0a1f12', color:'#3a9e62' }}>{s.easy}</span></td>
                    <td><span className="stat-chip" style={{ background:'#1f160a', color:'#c07a1a' }}>{s.medium}</span></td>
                    <td><span className="stat-chip" style={{ background:'#1f0a0a', color:'#c04040' }}>{s.hard}</span></td>
                    <td style={{ fontWeight:500, color:'#9b8ff8' }}>{s.total}</td>
                    <td>
                      <span style={{
                        fontSize:9.5, padding:'2px 7px', borderRadius:3,
                        background: s.active ? '#0a1f12' : '#1a1a20',
                        color:      s.active ? '#3a9e62' : '#44444e'
                      }}>{s.active ? 'Active' : 'Inactive'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
