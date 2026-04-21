import { useState } from 'react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Login from './components/Auth/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      <main className="flex-grow">
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <div className="container mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Welcome to Hackathon 2026
              </h1>
              <p className="text-blue-900 font-medium">Ready to build something amazing!</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App