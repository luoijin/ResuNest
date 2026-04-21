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
  const { extractedSkills, matches, isLoading, analyzeResume, analyzePDFResume } = useResumeAnalysis(jobsDataset)

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser())
      setIsLoggedIn(true)
    }
  }, [])

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
    if (typeof submission === 'string') {
      await analyzeResume(submission)
    } else if (submission?.type === 'text') {
      await analyzeResume(submission.payload)
    } else if (submission?.type === 'skills') {
      await analyzeResume(submission.payload.skills, { 
        experienceLevel: submission.payload.experienceLevel 
      })
    }
    setShowResults(true)
    setSelectedJob(null)
  }

  const handlePDFUpload = async (file) => {
    const result = await analyzePDFResume(file)
    if (result.skills && result.skills.length > 0) {
      setShowResults(true)
      setSelectedJob(null)
    }
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
          <div className="flex flex-col items-center justify-center min-h-[75vh]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Bridge the Gap to Your <span className="text-blue-600">Dream Career</span>
              </h1>
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-4xl text-blue-200 font-serif">"</span>
                <p className="text-lg text-slate-600 italic px-6">
                  Success is where preparation and opportunity meet. Paste your resume or list your skills, and let AI uncover your next big opportunity.
                </p>
                <span className="absolute -bottom-4 -right-2 text-4xl text-blue-200 font-serif">"</span>
              </div>
            </div>
            
            <div className="w-full max-w-3xl">
              <ResumeInput 
                onSubmit={handleResumeSubmit} 
                isLoading={isLoading}
                onPDFUpload={handlePDFUpload}
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && !selectedJob && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-green-800">Extracted Skills:</h2>
                <button 
                  onClick={() => setShowResults(false)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm"
                >
                  Analyze Another
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-green-100 border border-green-200 text-green-800 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-slate-800">Top Job Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map(job => (
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
    <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  )
}

export default App