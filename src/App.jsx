import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import Login from './pages/Login'
import StudentShell from './components/StudentShell'
import TeacherShell from './components/TeacherShell'

function AppRoutes() {
  const { user } = useUser()

  if (!user) return <Login />

  if (user.role === 'teacher') return <TeacherShell />

  return <StudentShell />
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  )
}
