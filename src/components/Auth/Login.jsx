import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowRight, ArrowLeft, User, AlertCircle, CheckCircle, Shield } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')

  const [isFlipped, setIsFlipped] = useState(false)
  const [showLoginPass, setShowLoginPass] = useState(false)
  const [showRegPass, setShowRegPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        setIsFlipped(false)
        setSuccess('')
        setRegName('')
        setRegEmail('')
        setRegPassword('')
        setRegConfirmPassword('')
      }, 1500)
    }, 500)
  }

  const features = [
    { icon: Shield, text: 'Secure' },
    { icon: UserPlus, text: 'Exclusive' },
    { icon: CheckCircle, text: 'Premium' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Info */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-12 bg-blue-900 rounded-full" />
              <span className="text-blue-900 text-sm font-medium uppercase tracking-widest">Hackathon 2026</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Build the Future with AI
            </h1>
            <p className="mt-4 text-slate-500 text-lg max-w-md">
              Join University of Cebu's biggest hackathon. Innovate, create, and compete with the best.
            </p>
          </div>

          <div className="flex space-x-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="auth-feature-card">
                  <div className="auth-feature-icon">
                    <Icon className="text-blue-900" size={20} />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{feature.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side - Flip Card */}
        <div>
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            
            {/* FRONT FACE - LOGIN */}
            <div className="flip-card-front">
              <div className="auth-card">
                <div className="text-center mb-8">
                  <div className="mx-auto w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center mb-4">
                    <LogIn className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                  <p className="mt-2 text-slate-500 text-sm">
                    Don't have an account?
                    <button onClick={() => { setError(''); setIsFlipped(true) }} className="ml-1 text-blue-900 font-medium hover:underline">
                      Sign up
                    </button>
                  </p>
                </div>

                {error && (
                  <div className="auth-alert auth-alert-error">
                    <AlertCircle size={16} /> <span>{error}</span>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" size={18} />
                    <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="auth-input" placeholder="Email address" />
                  </div>

                  <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" size={18} />
                    <input type={showLoginPass ? 'text' : 'password'} required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="auth-input auth-input-password" placeholder="Password" />
                    <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="auth-toggle-pass">
                      {showLoginPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900" />
                      <span className="text-slate-600 text-sm">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-900 hover:underline text-sm font-medium">Forgot password?</a>
                  </div>

                  <button type="submit" disabled={isLoading} className="auth-btn">
                    <span className="flex items-center justify-center space-x-2">
                      {isLoading ? <span>Loading...</span> : <><span>Sign In</span><ArrowRight size={18} /></>}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* BACK FACE - REGISTER */}
            <div className="flip-card-back">
              <div className="auth-card">
                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center mb-4">
                    <UserPlus className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Join Us</h2>
                  <p className="mt-2 text-slate-500 text-sm">
                    Already have an account?
                    <button onClick={() => { setError(''); setSuccess(''); setIsFlipped(false) }} className="ml-1 text-blue-900 font-medium hover:underline">
                      Sign in
                    </button>
                  </p>
                </div>

                {error && (
                  <div className="auth-alert auth-alert-error">
                    <AlertCircle size={16} /> <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="auth-alert auth-alert-success">
                    <CheckCircle size={16} /> <span>{success}</span>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSignup}>
                  <div className="auth-input-wrapper">
                    <User className="auth-input-icon" size={18} />
                    <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} className="auth-input" placeholder="Full name" />
                  </div>

                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" size={18} />
                    <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="auth-input" placeholder="Email address" />
                  </div>

                  <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" size={18} />
                    <input type={showRegPass ? 'text' : 'password'} required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="auth-input auth-input-password" placeholder="Create password" />
                    <button type="button" onClick={() => setShowRegPass(!showRegPass)} className="auth-toggle-pass">
                      {showRegPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" size={18} />
                    <input type={showRegPass ? 'text' : 'password'} required value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} className="auth-input" placeholder="Confirm password" />
                  </div>

                  <button type="submit" disabled={isLoading} className="auth-btn">
                    <span className="flex items-center justify-center space-x-2">
                      {isLoading ? <span>Creating...</span> : <><span>Create Account</span><ArrowLeft size={18} /></>}
                    </span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login