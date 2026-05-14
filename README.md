# AlgoVista — Complete Setup Guide

## What you need installed first
- Node.js (version 18 or above) — download from https://nodejs.org
- VS Code — download from https://code.visualstudio.com
- Git (optional) — download from https://git-scm.com

---

## STEP 1 — Check Node.js is installed
Open VS Code. Press Ctrl+` (backtick) to open terminal. Type:
```
node -v
```
You should see something like v18.17.0 or v20.x.x
If you get "not recognized" — install Node.js from nodejs.org first, then restart VS Code.

---

## STEP 2 — Extract and open the project
1. Extract algovista.zip to any folder (Desktop is fine)
2. In VS Code: File → Open Folder → select the algovista folder
3. You should see all files in the left panel

---

## STEP 3 — Install all packages
In VS Code terminal:
```
npm install
```
This downloads everything. Takes 1-2 minutes. You will see a node_modules folder appear.
If you see errors — try: npm install --legacy-peer-deps

---

## STEP 4 — Run the project
```
npm run dev
```
This starts TWO things at once:
- Backend server on port 3001 (handles LeetCode API)
- Frontend on port 5173 (your React app)

You will see:
  ✅ AlgoVista server running at http://localhost:3001
  ➜  Local: http://localhost:5173/

---

## STEP 5 — Open in browser
Go to: http://localhost:5173

---

## STEP 6 — Login credentials
Student accounts (any of these):
  arjun    / 1234
  priya    / 1234
  rohan    / 1234
  siddharth / 1234

Teacher account:
  teacher  / admin

---

## STEP 7 — Test LeetCode sync (as student)
1. Login as arjun / 1234
2. On the Dashboard, find the sync bar at top
3. Type any real LeetCode username (e.g. neal_wu or your own)
4. Click "Sync LeetCode"
5. Your real stats will appear in the dashboard cards and heatmap

---

## STEP 8 — Set up Firebase (so teacher sees real student data)

### 8a — Create free Firebase project
1. Go to https://console.firebase.google.com
2. Click "Add project" → name it "algovista" → click Continue
3. Disable Google Analytics → click Create project
4. Click "Continue" when ready

### 8b — Enable Firestore Database
1. In left sidebar click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" → click Next
4. Choose any location (asia-south1 for India) → click Enable

### 8c — Get your config keys
1. In Firebase console click the gear icon (top left) → Project settings
2. Scroll down to "Your apps" → click the </> (web) icon
3. App nickname: algovista → click Register app
4. You will see a firebaseConfig object like this:
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "algovista-xxx.firebaseapp.com",
     projectId: "algovista-xxx",
     storageBucket: "algovista-xxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   }
5. Copy all these values

### 8d — Paste into your project
Open src/firebase.js and replace the placeholder values with your real values.

### 8e — Restart
Stop the server (Ctrl+C) and run npm run dev again.

Now when a student syncs their LeetCode data, it saves to Firebase.
Teacher logs in and sees Students page → real data appears automatically.

---

## STEP 9 — Deploy to Vercel (to share online)

### 9a — Install Vercel CLI
```
npm install -g vercel
```

### 9b — Deploy
```
vercel
```
Follow the prompts:
- Set up and deploy? Y
- Which scope? Select your account
- Link to existing project? N
- Project name: algovista
- Directory: ./ (just press Enter)
- Override settings? N

### 9c — Add Firebase environment variables to Vercel
In the Vercel dashboard → your project → Settings → Environment Variables
Add all your Firebase values from firebase.js

### 9d — Redeploy
```
vercel --prod
```
You get a live URL like https://algovista-xxx.vercel.app

---

## Common errors and fixes

ERROR: "npm run dev" shows port 3001 already in use
FIX: Run this command: npx kill-port 3001  then try again

ERROR: "Cannot find module firebase"
FIX: Run npm install again

ERROR: LeetCode sync shows "Server not running"
FIX: Make sure you ran npm run dev (not npm run dev:frontend)

ERROR: Firebase permission denied
FIX: In Firebase console → Firestore → Rules → change to:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
Click Publish.

---

## File structure explained
algovista/
├── server.js          ← Local backend (fixes LeetCode sync locally)
├── api/
│   └── leetcode.js    ← Vercel serverless function (same thing for production)
├── src/
│   ├── firebase.js    ← Firebase config (you fill in your keys)
│   ├── context/
│   │   └── UserContext.jsx  ← Login + LeetCode fetch + Firebase save
│   ├── components/
│   │   ├── StudentShell.jsx ← Student sidebar + navigation
│   │   └── TeacherShell.jsx ← Teacher sidebar + navigation
│   └── pages/
│       ├── Login.jsx
│       ├── Dashboard.jsx    ← Main student page (real LeetCode data here)
│       ├── Problems.jsx
│       ├── Topics.jsx
│       ├── Contests.jsx
│       ├── Analytics.jsx
│       ├── Bookmarks.jsx
│       ├── Hints.jsx
│       ├── WeaknessDetector.jsx
│       ├── FocusMode.jsx    ← Working timer
│       ├── PeerRadar.jsx    ← Radar chart
│       ├── SpacedRepetition.jsx
│       ├── TeacherDashboard.jsx
│       ├── TeacherStudents.jsx  ← Shows real Firebase data when available
│       ├── TeacherAnalytics.jsx
│       └── TeacherAssignments.jsx
