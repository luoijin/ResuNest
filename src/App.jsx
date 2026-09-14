import { useState, useEffect } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { jsPDF } from 'jspdf'
import Layout from './components/Layout/Layout'
import ResumeInput from './components/ResumeInput'
import JobCard from './components/JobCard'
import SkillGapChart from './components/SkillGapChart'
import Recommendations from './components/Recommendations'
import About from './components/About'
import AnalysisHistory from './components/AnalysisHistory'
import { jobsDataset } from './data/jobsDataset'
import { learningMap } from './data/learningMap'
import { useResumeAnalysis } from './hooks/useResumeAnalysis'

const ACTIVE_ANALYSIS_KEY = 'resunest_active_analysis'

function App() {
  const [showResults, setShowResults] = useState(() => Boolean(sessionStorage.getItem(ACTIVE_ANALYSIS_KEY)))
  const [selectedJob, setSelectedJob] = useState(null)
  const [isResultsMenuOpen, setIsResultsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#about') return 'about'
    return sessionStorage.getItem('resunest_current_page') || 'home'
  })
  const [theme, setTheme] = useState(() => localStorage.getItem('resunest_theme') || 'light')
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('resunest_analysis_history') || '[]')
    } catch {
      return []
    }
  })
  const { extractedSkills, matches, isLoading, error, analyzePDFResume, loadSavedAnalysis } = useResumeAnalysis(jobsDataset)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('resunest_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('results-active', showResults)
    return () => document.documentElement.classList.remove('results-active')
  }, [showResults])

  useEffect(() => {
    const restoreRoute = () => setCurrentPage(window.location.hash === '#about' ? 'about' : 'home')
    window.addEventListener('hashchange', restoreRoute)
    return () => window.removeEventListener('hashchange', restoreRoute)
  }, [])

  useEffect(() => {
    sessionStorage.setItem('resunest_current_page', currentPage)
  }, [currentPage])

  useEffect(() => {
    try {
      const savedAnalysis = JSON.parse(sessionStorage.getItem(ACTIVE_ANALYSIS_KEY) || 'null')
      if (savedAnalysis?.skills?.length) {
        loadSavedAnalysis(savedAnalysis)
        setShowResults(true)
      }
    } catch {
      sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
      setShowResults(false)
    }
  }, [])

  const handlePDFUpload = async (file) => {
    const result = await analyzePDFResume(file)
    if (result.skills && result.skills.length > 0) {
      const entry = saveAnalysis(result, file.name || 'Uploaded PDF')
      sessionStorage.setItem(ACTIVE_ANALYSIS_KEY, JSON.stringify(entry))
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
    return entry
  }

  const handleRestoreAnalysis = (entry) => {
    loadSavedAnalysis(entry)
    sessionStorage.setItem(ACTIVE_ANALYSIS_KEY, JSON.stringify(entry))
    setShowResults(true)
    setSelectedJob(null)
  }

  const handleClearHistory = () => {
    localStorage.removeItem('resunest_analysis_history')
    sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
    setAnalysisHistory([])
  }

  const handleRemoveHistoryEntry = (entryId) => {
    try {
      const activeAnalysis = JSON.parse(sessionStorage.getItem(ACTIVE_ANALYSIS_KEY) || 'null')
      if (activeAnalysis?.id === entryId) sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
    } catch {
      sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
    }
    setAnalysisHistory(current => {
      const next = current.filter(entry => entry.id !== entryId)
      localStorage.setItem('resunest_analysis_history', JSON.stringify(next))
      return next
    })
  }

  const handleDownloadAnalysis = () => {
    const generatedAt = new Date().toLocaleString()
    const rankedMatches = matches.filter(job => job.matchScore > 0)
    const document = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageWidth = document.internal.pageSize.getWidth()
    const pageHeight = document.internal.pageSize.getHeight()
    const margin = 18
    const contentWidth = pageWidth - margin * 2
    let y = 24

    const addPage = () => {
      document.addPage()
      y = 22
    }
    const addText = (text, { size = 10, color = [35, 56, 80], weight = 'normal', gap = 5 } = {}) => {
      document.setFont('helvetica', weight)
      document.setFontSize(size)
      document.setTextColor(...color)
      const lines = document.splitTextToSize(String(text), contentWidth)
      const lineHeight = size * 0.48
      if (y + lines.length * lineHeight > pageHeight - 20) addPage()
      document.text(lines, margin, y)
      y += lines.length * lineHeight + gap
    }
    const addSection = (title) => {
      if (y > pageHeight - 34) addPage()
      document.setDrawColor(191, 217, 240)
      document.line(margin, y, pageWidth - margin, y)
      y += 6
      addText(title.toUpperCase(), { size: 11, color: [27, 105, 169], weight: 'bold', gap: 4 })
    }

    document.setFillColor(12, 37, 69)
    document.rect(0, 0, pageWidth, 14, 'F')
    document.setFont('helvetica', 'bold')
    document.setFontSize(11)
    document.setTextColor(255, 255, 255)
    document.text('ResuNest', margin, 9)
    addText('Career Analysis Report', { size: 20, color: [18, 43, 71], weight: 'bold', gap: 3 })
    addText(`Generated ${generatedAt}`, { size: 9, color: [92, 112, 136], gap: 10 })

    addSection('Extracted skills')
    addText(extractedSkills.length ? extractedSkills.join('  |  ') : 'No skills were extracted.')

    addSection('Top job matches')
    if (rankedMatches.length) {
      rankedMatches.forEach((job, index) => {
        addText(`${index + 1}. ${job.job_title} - ${job.matchScore}% match`, { size: 11, color: [18, 43, 71], weight: 'bold', gap: 2 })
        addText(`Matched skills: ${(job.matchedSkills || []).join(', ') || 'No matched skills listed'}`, { size: 9, color: [83, 103, 128], gap: 5 })
      })
    } else {
      addText('No job matches were found.')
    }

    const pageCount = document.getNumberOfPages()
    for (let page = 1; page <= pageCount; page += 1) {
      document.setPage(page)
      document.setFont('helvetica', 'normal')
      document.setFontSize(8)
      document.setTextColor(115, 133, 154)
      document.text(`ResuNest analysis - Page ${page} of ${pageCount}`, margin, pageHeight - 10)
    }
    const filenameDate = new Date().toISOString().slice(0, 10)
    document.save(`resunest-analysis-${filenameDate}.pdf`)
  }

  const handleSelectJob = (job) => {
    setSelectedJob(job)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToResults = () => {
    setSelectedJob(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnalyzeAnother = () => {
    sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
    setShowResults(false)
    setIsResultsMenuOpen(false)
  }
  
  const handleNavigate = (page) => {
    setCurrentPage(page)
    const hash = page === 'about' ? '#about' : ''
    if (window.location.hash !== hash) window.location.hash = hash
    if (page !== 'dashboard') {
      sessionStorage.removeItem(ACTIVE_ANALYSIS_KEY)
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
                isLoading={isLoading}
                onPDFUpload={handlePDFUpload}
                error={error}
              />
            </div>
            <div className="hero-history">
              <AnalysisHistory
                entries={analysisHistory}
                onRestore={handleRestoreAnalysis}
                onRemove={handleRemoveHistoryEntry}
                onClear={handleClearHistory}
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && !selectedJob && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="results-skills-panel mb-8 p-5 rounded-xl">
              <div className="results-skills-header flex justify-between items-center mb-3">
                <h2 className="results-skills-title font-semibold">Extracted Skills:</h2>
                <div className={`results-panel-actions ${isResultsMenuOpen ? 'results-panel-actions-open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setIsResultsMenuOpen(open => !open)}
                    className="results-actions-menu-btn"
                    aria-label="Open analysis actions"
                    aria-expanded={isResultsMenuOpen}
                  >
                    {isResultsMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </button>
                  <div className="results-panel-actions-list">
                    <button
                      onClick={() => {
                        handleDownloadAnalysis()
                        setIsResultsMenuOpen(false)
                      }}
                      className="download-analysis-btn text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Download size={15} />
                      Download PDF
                    </button>
                    <button
                      onClick={() => {
                        handleAnalyzeAnother()
                      }}
                      className="analyze-another-btn text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Analyze Another
                    </button>
                  </div>
                </div>
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
    <Layout currentPage={currentPage} onNavigate={handleNavigate} theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}>
      {renderContent()}
    </Layout>
  )
}

export default App
