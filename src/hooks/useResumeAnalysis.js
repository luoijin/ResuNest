import { useState } from 'react'
import { extractSkillsWithGemini } from '../services/SkillExtractor'
import { matchJobs } from '../services/jobMatcher'

export const useResumeAnalysis = (hardcodedJobs) => {
  const [extractedSkills, setExtractedSkills] = useState([])
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    searchTerm: '',
    remoteOnly: false,
    minSalary: 'any'
  })

  const analyzeResume = async (resumeText, userProfile = {}) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Extract skills using Gemini (or fallback)
      const skills = await extractSkillsWithGemini(resumeText)
      setExtractedSkills(skills)
      
      // Combine user skills with profile preferences
      const allUserSkills = [...skills]
      if (userProfile.languages) allUserSkills.push(...userProfile.languages)
      if (userProfile.additionalSkills) allUserSkills.push(...userProfile.additionalSkills)
      
      // Match against combined job pool with filters
      const matchResults = matchJobs([...new Set(allUserSkills)], hardcodedJobs, filters)
      setMatches(matchResults)
      
      return { skills, matches: matchResults }
    } catch (err) {
      console.error('Analysis failed:', err)
      setError(err.message)
      return { skills: [], matches: [] }
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    extractedSkills,
    matches,
    isLoading,
    error,
    filters,
    analyzeResume,
    updateFilters
  }
}