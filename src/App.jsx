import { useState } from 'react';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';
import { jobsDataset } from './data/jobsDataset';
import { learningMap } from './data/learningMap';
import { isAuthenticated, mockLogin, mockLogout, getCurrentUser } from './utils/auth';

// Import components (Member 2 will create these)
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ResumeInput from './components/ResumeInput';
import JobCard from './components/JobCard';
import SkillGapChart from './components/SkillGapChart';
import Recommendations from './components/Recommendations';

function App() {
  // State management
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'dashboard'
  const [user, setUser] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Hook from Member 1
  const { extractedSkills, matches, isLoading, analyzeResume } = useResumeAnalysis(jobsDataset);
  
  // Check auth on mount
  useState(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser());
      setCurrentView('dashboard');
    }
  }, []);
  
  // Handlers
  const handleGetStarted = () => {
    setCurrentView('login');
  };
  
  const handleLogin = (email) => {
    if (mockLogin(email)) {
      setUser(email);
      setCurrentView('dashboard');
    }
  };
  
  const handleLogout = () => {
    mockLogout();
    setUser(null);
    setShowResults(false);
    setSelectedJob(null);
    setCurrentView('landing');
  };
  
  const handleResumeSubmit = async (resumeText) => {
    await analyzeResume(resumeText);
    setShowResults(true);
    setSelectedJob(null);
  };
  
  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };
  
  const handleBackToResults = () => {
    setSelectedJob(null);
  };
  
  // Render based on current view
  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }
  
  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }
  
  // Dashboard view (logged in)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ResuNest</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user}</span>
            <button 
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Show input if no results yet */}
        {!showResults && (
          <ResumeInput onTextSubmit={handleResumeSubmit} isLoading={isLoading} />
        )}
        
        {/* Show results */}
        {showResults && !selectedJob && (
          <div>
            {/* Extracted skills summary */}
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
            
            {/* Job matches grid */}
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
          </div>
        )}
        
        {/* Show detailed view for selected job */}
        {showResults && selectedJob && (
          <div>
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
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Analyzing your resume with AI...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;