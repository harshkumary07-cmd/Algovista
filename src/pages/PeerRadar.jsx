import { useEffect, useRef } from 'react'

const AXES = ['Arrays', 'DP', 'Graphs', 'Trees', 'Strings']
const YOU = [0.82, 0.30, 0.18, 0.55, 0.68]
const AVG = [0.65, 0.50, 0.45, 0.60, 0.58]

const BREAKDOWN = [
  { name: 'Arrays', you: 82, avg: 65, diff: '+17%', color: '#5b4ef5', good: true },
  { name: 'Hash Map', you: 70, avg: 58, diff: '+12%', color: '#5b4ef5', good: true },
  { name: 'Trees', you: 55, avg: 60, diff: '−5%', color: '#c07a1a', good: false },
  { name: 'Dynamic Prog.', you: 30, avg: 50, diff: '−20%', color: '#c04040', good: false },
  { name: 'Graphs', you: 18, avg: 45, diff: '−27%', color: '#c04040', good: false },
]

function radarPoint(val, i, total, r, cx, cy) {
  const angle = (i / total) * 2 * Math.PI - Math.PI / 2
  return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }
}

export default function PeerRadar() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.innerHTML = ''
    const cx = 110, cy = 98, r = 76

    // Grid rings
    for (let i = 0; i < 5; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const p = radarPoint(1, i, 5, r, cx, cy)
      line.setAttribute('x1', cx); line.setAttribute('y1', cy)
      line.setAttribute('x2', p.x); line.setAttribute('y2', p.y)
      line.setAttribute('stroke', '#1e1e24'); line.setAttribute('stroke-width', '0.5')
      svg.appendChild(line)

      ;[0.33, 0.67, 1].forEach(f => {
        const pts = Array.from({ length: 5 }, (_, j) => {
          const q = radarPoint(f, j, 5, r, cx, cy)
          return `${q.x},${q.y}`
        }).join(' ')
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        poly.setAttribute('points', pts); poly.setAttribute('fill', 'none')
        poly.setAttribute('stroke', '#1e1e24'); poly.setAttribute('stroke-width', '0.5')
        svg.appendChild(poly)
      })

      const lp = radarPoint(1.22, i, 5, r, cx, cy)
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      t.setAttribute('x', lp.x); t.setAttribute('y', lp.y)
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'middle')
      t.setAttribute('font-size', '10'); t.setAttribute('fill', '#55555e')
      t.textContent = AXES[i]; svg.appendChild(t)
    }

    // Draw polygons
    const drawPoly = (data, color, opacity) => {
      const pts = data.map((v, i) => {
        const p = radarPoint(v, i, 5, r, cx, cy)
        return `${p.x},${p.y}`
      }).join(' ')
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      poly.setAttribute('points', pts); poly.setAttribute('fill', color)
      poly.setAttribute('fill-opacity', opacity); poly.setAttribute('stroke', color)
      poly.setAttribute('stroke-width', '1.5'); svg.appendChild(poly)
    }

    drawPoly(AVG, '#2a2a50', 0.5)
    drawPoly(YOU, '#5b4ef5', 0.3)

    // Legend
    ;[['#5b4ef5', 'You'], ['#44445a', 'Batch avg']].forEach(([c, l], i) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', 10 + i * 78); rect.setAttribute('y', 196)
      rect.setAttribute('width', 10); rect.setAttribute('height', 5)
      rect.setAttribute('rx', 1); rect.setAttribute('fill', c); svg.appendChild(rect)
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      t.setAttribute('x', 24 + i * 78); t.setAttribute('y', 201)
      t.setAttribute('font-size', '10'); t.setAttribute('fill', '#55555e')
      t.textContent = l; svg.appendChild(t)
    })
  }, [])

  return (
    <div className="page-content">
      <div className="ph"><h1>Peer Radar</h1><p>Your topic coverage vs batch average</p></div>
      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="ch" style={{ width: '100%' }}><span className="ct">You vs batch average</span></div>
          <svg ref={svgRef} width="220" height="210" viewBox="0 0 220 210" />
        </div>
        <div className="card">
          <div className="ch"><span className="ct">Topic breakdown</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BREAKDOWN.map(b => (
              <div key={b.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: '#c0c0c8' }}>{b.name}</span>
                  <span style={{ color: b.good ? '#3a9e62' : '#c04040' }}>{b.diff} {b.good ? 'above' : 'below'} avg</span>
                </div>
                <div className="ptrack"><div className="pfill" style={{ width: `${b.you}%`, background: b.color }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
