import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import FlipWrapper from './components/auth/FlipWrapper/FlipWrapper'
import ResumeInput from './components/ResumeInput'
import JobCard from './components/JobCard'
import SkillGapChart from './components/SkillGapChart'
import Recommendations from './components/Recommendations'
import About from './components/About'
import AnalysisHistory from './components/AnalysisHistory'
import { jobsDataset } from './data/jobsDataset'
import { learningMap } from './data/learningMap'
import { mockLogin, mockLogout, getCurrentUser, isAuthenticated } from './utils/auth'
import { useResumeAnalysis } from './hooks/useResumeAnalysis'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [theme, setTheme] = useState(() => localStorage.getItem('resunest_theme') || 'dark')
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('resunest_analysis_history') || '[]')
    } catch {
      return []
    }
  })
  const { extractedSkills, matches, isLoading, error, analyzeResume, analyzePDFResume, loadSavedAnalysis } = useResumeAnalysis(jobsDataset)

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser())
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('resunest_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('results-active', showResults)
    return () => document.documentElement.classList.remove('results-active')
  }, [showResults])

  const handleLogin = (email) => {
    if (mockLogin(email)) {
      setUser(email)
      setIsLoggedIn(true)
      setCurrentPage('dashboard')
    }
  }

  const handleSignup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('uc_hackathon_users') || '[]')
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' }
    }
    
    users.push({ name, email, password })
    localStorage.setItem('uc_hackathon_users', JSON.stringify(users))
    
    return { success: true }
  }

  const handleLogout = () => {
    mockLogout()
    setUser(null)
    setIsLoggedIn(false)
    setShowResults(false)
    setSelectedJob(null)
    setCurrentPage('home')
  }

  const handleResumeSubmit = async (submission) => {
    // This safely handles both the raw string submission AND the new tabbed object submission
    let result = { skills: [], matches: [] }
    if (typeof submission === 'string') {
      result = await analyzeResume(submission)
    } else if (submission?.type === 'text') {
      result = await analyzeResume(submission.payload)
    } else if (submission?.type === 'skills') {
      result = await analyzeResume(submission.payload.skills, {
        experienceLevel: submission.payload.experienceLevel 
      })
    }
    saveAnalysis(result, 'Pasted resume')
    setShowResults(true)
    setSelectedJob(null)
  }

  const handlePDFUpload = async (file) => {
    const result = await analyzePDFResume(file)
    if (result.skills && result.skills.length > 0) {
      saveAnalysis(result, file.name || 'Uploaded PDF')
      setShowResults(true)
      setSelectedJob(null)
    }
  }

  const saveAnalysis = (result, label) => {
    if (!result.skills?.length) return

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label,
      createdAt: new Date().toISOString(),
      skills: result.skills,
      matches: (result.matches || []).slice(0, 6)
    }
    setAnalysisHistory(current => {
      const next = [entry, ...current].slice(0, 8)
      localStorage.setItem('resunest_analysis_history', JSON.stringify(next))
      return next
    })
  }

  const handleRestoreAnalysis = (entry) => {
    loadSavedAnalysis(entry)
    setShowResults(true)
    setSelectedJob(null)
  }

  const handleClearHistory = () => {
    localStorage.removeItem('resunest_analysis_history')
    setAnalysisHistory([])
  }

  const handleSelectJob = (job) => setSelectedJob(job)
  const handleBackToResults = () => setSelectedJob(null)
  
  const handleNavigate = (page) => {
    setCurrentPage(page)
    if (page !== 'dashboard') {
      setShowResults(false)
      setSelectedJob(null)
    }
  }

  const renderContent = () => {
    if (currentPage === 'about') {
      return <About />
    }

    if (currentPage === 'features') {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Features</h1>
            <p className="text-slate-600">Coming soon! More features are being developed.</p>
          </div>
        </div>
      )
    }

    if (!isLoggedIn) {
      return (
        <FlipWrapper>
          <Login onLogin={handleLogin} />
          <Signup onSwitchToLogin={() => setShowLogin(true)} onSignup={handleSignup} />
        </FlipWrapper>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* New Centered Hero Section */}
        {!showResults && (
          <div className="home-hero">
            <div className="hero-copy">
              <span className="hero-eyebrow">Your AI career companion</span>
              <h1>Bridge the Gap to Your <span>Dream Career</span></h1>
              <p className="hero-quote">“Success is where preparation and opportunity meet. Paste your resume or list your skills, and let AI uncover your next big opportunity.”</p>
              <div className="hero-points"><span>Skill insights</span><span>Role matches</span><span>Learning paths</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <img src={theme === 'light' ? '/career-hero-light.png' : '/career-hero.png'} alt="" />
            </div>
            <div className="hero-analysis">
              <ResumeInput 
                onSubmit={handleResumeSubmit} 
                isLoading={isLoading}
                onPDFUpload={handlePDFUpload}
                error={error}
              />
            </div>
            <div className="hero-history">
              <AnalysisHistory
                entries={analysisHistory}
                onRestore={handleRestoreAnalysis}
                onClear={handleClearHistory}
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && !selectedJob && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="results-skills-panel mb-8 p-5 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="results-skills-title font-semibold">Extracted Skills:</h2>
                <button 
                  onClick={() => setShowResults(false)}
                  className="analyze-another-btn text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  Analyze Another
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map(skill => (
                  <span key={skill} className="results-skill-tag px-3 py-1.5 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-slate-800">Top Job Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.filter(job => job.matchScore > 0).map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  userSkills={extractedSkills} 
                  matchScore={job.matchScore} 
                  onClick={() => handleSelectJob(job)} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Job Details Section */}
        {showResults && selectedJob && (
          <div className="animate-in fade-in duration-300">
            <button 
              onClick={handleBackToResults}
              className="mb-6 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              ← Back to all jobs
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.job_title}</h2>
              <div className="mb-8 flex items-center gap-3">
                <span className="text-lg font-semibold text-slate-600">Match Score: </span>
                <span className="text-2xl text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">{selectedJob.matchScore}%</span>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SkillGapChart 
                  missingSkills={selectedJob.missingSkills} 
                  jobTitle={selectedJob.job_title}
                />

                <Recommendations 
                  missingSkills={selectedJob.missingSkills} 
                  learningMap={learningMap}
                />
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-b-blue-600 mb-4"></div>
            <p className="text-lg font-medium text-slate-800">Analyzing with AI...</p>
            <p className="text-sm text-slate-500 mt-2">Extracting skills and finding the perfect match</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={handleNavigate} theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}>
      {renderContent()}
    </Layout>
  )
}

export default App
