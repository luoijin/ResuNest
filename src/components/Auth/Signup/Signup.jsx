import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft, User, AlertCircle, CheckCircle } from 'lucide-react'
import './Signup.css'

const Signup = ({ onSwitchToLogin }) => {
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [showRegPass, setShowRegPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (regPassword !== regConfirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }
      if (regPassword.length < 6) {
        setError('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      const users = JSON.parse(localStorage.getItem('uc_hackathon_users') || '[]')
      
      if (users.find(u => u.email === regEmail)) {
        setError('An account with this email already exists')
        setIsLoading(false)
        return
      }

      users.push({ name: regName, email: regEmail, password: regPassword })
      localStorage.setItem('uc_hackathon_users', JSON.stringify(users))
      
      setSuccess('Account created successfully! Please sign in.')
      setError('')
      setIsLoading(false)
      
      setTimeout(() => {
        onSwitchToLogin()
        setSuccess('')
        setRegName('')
        setRegEmail('')
        setRegPassword('')
        setRegConfirmPassword('')
      }, 1500)
    }, 500)
  }

  return (
    <div className="flip-back-content">
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">Join Us</h2>
          <p className="signup-subtitle">
            Already have an account?
            <button onClick={onSwitchToLogin} className="signup-switch-btn">
              Sign in
            </button>
          </p>
        </div>

        {error && (
          <div className="signup-alert signup-alert-error">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="signup-alert signup-alert-success">
            <CheckCircle size={16} /> <span>{success}</span>
          </div>
        )}

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-input-wrapper">
            <User className="signup-input-icon" size={18} />
            <input 
              type="text" 
              required 
              value={regName} 
              onChange={(e) => setRegName(e.target.value)} 
              className="signup-input" 
              placeholder="Full name" 
            />
          </div>

          <div className="signup-input-wrapper">
            <Mail className="signup-input-icon" size={18} />
            <input 
              type="email" 
              required 
              value={regEmail} 
              onChange={(e) => setRegEmail(e.target.value)} 
              className="signup-input" 
              placeholder="Email address" 
            />
          </div>

          <div className="signup-input-wrapper">
            <Lock className="signup-input-icon" size={18} />
            <input 
              type={showRegPass ? 'text' : 'password'} 
              required 
              value={regPassword} 
              onChange={(e) => setRegPassword(e.target.value)} 
              className="signup-input signup-input-password" 
              placeholder="Create password" 
            />
            <button 
              type="button" 
              onClick={() => setShowRegPass(!showRegPass)} 
              className="signup-toggle-pass"
            >
              {showRegPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="signup-input-wrapper">
            <Lock className="signup-input-icon" size={18} />
            <input 
              type={showRegPass ? 'text' : 'password'} 
              required 
              value={regConfirmPassword} 
              onChange={(e) => setRegConfirmPassword(e.target.value)} 
              className="signup-input" 
              placeholder="Confirm password" 
            />
          </div>

          <button type="submit" disabled={isLoading} className="signup-btn">
            <span className="signup-btn-content">
              {isLoading ? <span>Creating...</span> : <><span>Create Account</span><ArrowLeft size={18} /></>}
            </span>
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup