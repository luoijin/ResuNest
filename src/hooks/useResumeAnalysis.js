// src/hooks/useResumeAnalysis.js
import { useState } from 'react'
import { extractSkillsWithGemini } from '../services/SkillExtractor'
import { matchJobs } from '../services/jobMatcher'

export const useResumeAnalysis = (jobsDataset) => {
  const [extractedSkills, setExtractedSkills] = useState([])
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeResume = async (resumeText) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Extract skills using Gemini (or fallback)
      const skills = await extractSkillsWithGemini(resumeText)
      setExtractedSkills(skills)
      
      // Match against jobs
      const matchResults = matchJobs(skills, jobsDataset)
      setMatches(matchResults)
      
      return { skills, matches: matchResults }
    } catch (err) {
      setError(err.message)
      return { skills: [], matches: [] }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    extractedSkills,
    matches,
    isLoading,
    error,
    analyzeResume
  }
}