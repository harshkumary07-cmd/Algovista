$env:Path += ";C:\Windows\System32"
npm run dev// api/leetcode.js
// This runs on Vercel's server - no CORS issues here
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

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
          aboutMe
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
        tagProblemCounts {
          advanced {
            tagName
            problemsSolved
          }
          intermediate {
            tagName
            problemsSolved
          }
          fundamental {
            tagName
            problemsSolved
          }
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
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'LeetCode API error' })
    }

    const data = await response.json()

    if (data.errors) {
      return res.status(404).json({ error: 'User not found', details: data.errors })
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch from LeetCode', message: err.message })
  }
}
