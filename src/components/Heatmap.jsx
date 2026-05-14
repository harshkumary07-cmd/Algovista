import { useMemo } from 'react'

const COLORS = ['#161e18', '#1a3320', '#1e5230', '#227a44', '#26a855']

export default function Heatmap({ calendar }) {
  const weeks = useMemo(() => {
    // If real calendar data from LeetCode, parse it
    if (calendar) {
      try {
        const parsed = JSON.parse(calendar)
        const cells = []
        const now = Date.now() / 1000
        for (let w = 12; w >= 0; w--) {
          const week = []
          for (let d = 6; d >= 0; d--) {
            const ts = Math.floor(now - (w * 7 + d) * 86400)
            const dayTs = ts - (ts % 86400)
            week.push(parsed[dayTs] || 0)
          }
          cells.push(week)
        }
        return cells
      } catch {
        // fall through to mock
      }
    }
    // Mock data
    const seed = [2,0,1,3,4,2,1,0,3,4,3,2,1,2,3,4,4,3,2,1,0,1,2,3,4,3,2,1,0,0,1,3,4,3,2,1,2,3,4,3,2,0,1,2,3,2,1,0,1,2,4,3,2,1,0,1,2,3,4,4,3,2,1,0,1,3,4,3,2,1,0,1,2,3,2,1,0,0,2,3,4,3,2,1,0,1,2,3,4,3,2]
    const result = []
    for (let w = 0; w < 13; w++) {
      const week = []
      for (let d = 0; d < 7; d++) week.push(seed[w * 7 + d] || 0)
      result.push(week)
    }
    return result
  }, [calendar])

  return (
    <div className="hm-grid" style={{ gridTemplateColumns: `repeat(13, 1fr)` }}>
      {weeks.map((week, wi) => (
        <div key={wi} className="hm-col">
          {week.map((val, di) => (
            <div key={di} className="hm-cell" style={{ background: COLORS[Math.min(val, 4)] }} />
          ))}
        </div>
      ))}
    </div>
  )
}
