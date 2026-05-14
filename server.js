// server.js — runs locally on port 3001
// This is what makes LeetCode sync work on YOUR computer
// When deployed to Vercel, the /api/leetcode.js file handles it instead

import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// LeetCode proxy endpoint
app.get('/api/leetcode', async (req, res) => {
  const { username } = req.query

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        profile {
          realName
          ranking
          userAvatar
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
        tagProblemCounts {
          advanced { tagName problemsSolved }
          intermediate { tagName problemsSolved }
          fundamental { tagName problemsSolved }
        }
      }
    }
  `

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'Origin': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ query, variables: { username } }),
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'LeetCode API error' })
    }

    const data = await response.json()

    if (data.errors) {
      return res.status(404).json({ error: 'LeetCode user not found' })
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Server error', message: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ AlgoVista server running at http://localhost:${PORT}`)
  console.log(`   LeetCode proxy ready at http://localhost:${PORT}/api/leetcode`)
})
