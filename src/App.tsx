import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './routes/login'
import './App.css'
import GamesDashboard from './routes/gamesDashboard'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<GamesDashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
