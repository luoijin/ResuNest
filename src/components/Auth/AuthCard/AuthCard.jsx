import { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import './AuthCard.css'

const AuthCard = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true)

  const handleSwitchToSignup = () => setIsLoginView(false)
  const handleSwitchToLogin = () => setIsLoginView(true)

  return (
    <div className="auth-wrapper">
      <div className="auth-info">
        <div className="auth-badge">
          <div className="auth-badge-line" />
          <span className="auth-badge-text">Hackathon 2026</span>
        </div>
        <h1 className="auth-title">Build the Future with AI</h1>
        <p className="auth-description">
          Join University of Cebu's biggest hackathon. Innovate, create, and compete with the best.
        </p>
        <div className="auth-features">
          <div className="auth-feature">
            <div className="auth-feature-icon">🔒</div>
            <span>Secure</span>
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon">👥</div>
            <span>Exclusive</span>
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon">⭐</div>
            <span>Premium</span>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        {isLoginView ? (
          <Login onLogin={onLogin} onSwitchToSignup={handleSwitchToSignup} />
        ) : (
          <Signup onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </div>
  )
}

export default AuthCard