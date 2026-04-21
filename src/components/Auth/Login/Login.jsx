import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, AlertCircle } from 'lucide-react'
import './Login.css'

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPass, setShowLoginPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('uc_hackathon_users') || '[]')
      const user = users.find(u => u.email === loginEmail && u.password === loginPassword)
      
      if (user) {
        onLogin()
      } else {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flip-front-content">
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Don't have an account?
            <button onClick={onSwitchToSignup} className="login-switch-btn">
              Sign up
            </button>
          </p>
        </div>

        {error && (
          <div className="login-alert login-alert-error">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-wrapper">
            <Mail className="login-input-icon" size={18} />
            <input 
              type="email" 
              required 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} 
              className="login-input" 
              placeholder="Email address" 
            />
          </div>

          <div className="login-input-wrapper">
            <Lock className="login-input-icon" size={18} />
            <input 
              type={showLoginPass ? 'text' : 'password'} 
              required 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              className="login-input login-input-password" 
              placeholder="Password" 
            />
            <button 
              type="button" 
              onClick={() => setShowLoginPass(!showLoginPass)} 
              className="login-toggle-pass"
            >
              {showLoginPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="login-options">
            <label className="login-checkbox-label">
              <input type="checkbox" className="login-checkbox" />
              <span className="login-checkbox-text">Remember me</span>
            </label>
            <a href="#" className="login-forgot-link">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="login-btn">
            <span className="login-btn-content">
              {isLoading ? <span>Loading...</span> : <><span>Sign In</span><ArrowRight size={18} /></>}
            </span>
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login