import { useState } from 'react'
import { extractSkillsWithGemini, processPDFResume } from '../services/SkillExtractor'
import { getAllJobs, matchJobs } from '../services/jobMatcher'

export const useResumeAnalysis = (jobsDataset) => {
  const [extractedSkills, setExtractedSkills] = useState([])
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState(null)

  const analyzeResume = async (resumeText) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const allJobs = getAllJobs()
      const skills = await extractSkillsWithGemini(resumeText)
      setExtractedSkills(skills)
      
      const matchResults = matchJobs(skills, allJobs)
      setMatches(matchResults)
      
      return { skills, matches: matchResults }
    } catch (err) {
      setError(err.message)
      return { skills: [], matches: [] }
    } finally {
      setIsLoading(false)
    }
  }

  const analyzePDFResume = async (file) => {
    setIsLoading(true)
    setError(null)
    setUploadedFileName(file.name)
    
    try {
      const result = await processPDFResume(file, true)
      
      if (!result.success) {
        setError(result.error)
        return { skills: [], matches: [] }
      }
      
      const allJobs = getAllJobs()
      setExtractedSkills(result.skills)
      
      const matchResults = matchJobs(result.skills, allJobs)
      setMatches(matchResults)
      
      return { 
        skills: result.skills, 
        matches: matchResults,
        extractedText: result.text 
      }
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
    uploadedFileName,
    analyzeResume,
    analyzePDFResume
  }
}