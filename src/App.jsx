import { useState } from 'react'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/features/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  return (
    <Layout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}>
      {!isLoggedIn ? (
        showLogin ? (
          <Login 
            onLogin={() => setIsLoggedIn(true)} 
            onSwitchToSignup={() => setShowLogin(false)} 
          />
        ) : (
          <Signup 
            onSwitchToLogin={() => setShowLogin(true)} 
          />
        )
      ) : (
        <Dashboard />
      )}
    </Layout>
  )
}

export default App