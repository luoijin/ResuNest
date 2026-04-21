import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/features/Dashboard'
<<<<<<< Updated upstream
import ResumeInput from './components/ResumeInput'
import JobCard from './components/JobCard'
import SkillGapChart from './components/SkillGapChart'
import Recommendations from './components/Recommendations'

// Your data files (Member 3)
import { jobsDataset } from './data/jobsDataset'
import { learningMap } from './data/learningMap'

// Your auth utils (Member 3)
import { mockLogin, mockLogout, getCurrentUser, isAuthenticated } from './utils/auth'

// Member 1's hook
import { useResumeAnalysis } from './hooks/useResumeAnalysis'
=======
import FlipWrapper from './components/auth/FlipWrapper/FlipWrapper'
>>>>>>> Stashed changes

function App() {
  // Auth state (using your mock auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
<<<<<<< Updated upstream
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)
  
  // Resume analysis state
  const [showResults, setShowResults] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  
  // Member 1's hook
  const { extractedSkills, matches, isLoading, analyzeResume } = useResumeAnalysis(jobsDataset)
  
  // Check for existing session on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setIsLoggedIn(true)
    }
  }, [])
  
  // Handlers for auth (using your mock auth)
  const handleLogin = (email) => {
    if (mockLogin(email)) {
      setUser(email)
      setIsLoggedIn(true)
    }
  }
  
  const handleLogout = () => {
    mockLogout()
    setUser(null)
    setIsLoggedIn(false)
    setShowResults(false)
    setSelectedJob(null)
  }
  
  // Resume analysis handler
  const handleResumeSubmit = async (resumeText) => {
    await analyzeResume(resumeText)
    setShowResults(true)
    setSelectedJob(null)
  }
  
  const handleSelectJob = (job) => setSelectedJob(job)
  const handleBackToResults = () => setSelectedJob(null)
  
  // If logged in, show either Resume Input or Results
  const renderContent = () => {
    if (!isLoggedIn) {
      return showLogin ? (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setShowLogin(false)} 
        />
=======

  return (
    <Layout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}>
      {!isLoggedIn ? (
        <FlipWrapper>
          <Login onLogin={() => setIsLoggedIn(true)} />
          <Signup />
        </FlipWrapper>
>>>>>>> Stashed changes
      ) : (
        <Signup 
          onSwitchToLogin={() => setShowLogin(true)} 
        />
      )
    }
    
    // Logged in - show resume analysis flow
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Show input if no results yet */}
        {!showResults && (
          <ResumeInput 
            onSubmit={handleResumeSubmit} 
            isLoading={isLoading} 
          />
        )}
        
        {/* Show results grid */}
        {showResults && !selectedJob && (
          <>
            {/* Extracted skills badges */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="font-semibold text-green-800">Extracted Skills:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {extractedSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Job matches */}
            <h2 className="text-xl font-bold mb-4">Top Job Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </>
        )}
        
        {/* Detailed view for selected job */}
        {showResults && selectedJob && (
          <>
            <button 
              onClick={handleBackToResults}
              className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Back to all jobs
            </button>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedJob.job_title}</h2>
              <div className="mb-4">
                <span className="text-lg font-semibold">Match Score: </span>
                <span className="text-blue-600 font-bold">{selectedJob.matchScore}%</span>
              </div>
              
              <SkillGapChart 
                missingSkills={selectedJob.missingSkills} 
                jobTitle={selectedJob.job_title}
              />
              
              <Recommendations 
                missingSkills={selectedJob.missingSkills} 
                learningMap={learningMap}
              />
            </div>
          </>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Analyzing your resume with AI...</p>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  )
}

export default App
//TEST