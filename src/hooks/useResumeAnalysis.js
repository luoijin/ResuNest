import { useState } from 'react'
import { extractSkillsFromText, processPDFResume } from '../services/SkillExtractor'
import { extractSkillsWithGemini } from '../services/geminiService'
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
      let skills
      try {
        skills = await extractSkillsWithGemini(resumeText)
      } catch (aiError) {
        console.warn('Gemini analysis unavailable; using keyword fallback.', aiError)
        skills = extractSkillsFromText(resumeText)
      }
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
      const result = await processPDFResume(file)
      
      if (!result.success) {
        setError(result.error)
        return { skills: [], matches: [] }
      }
      
      const allJobs = getAllJobs()
      let skills
      try {
        skills = await extractSkillsWithGemini(result.text)
      } catch (aiError) {
        console.warn('Gemini analysis unavailable; using keyword fallback.', aiError)
        skills = result.skills
      }
      setExtractedSkills(skills)
      
      const matchResults = matchJobs(skills, allJobs)
      setMatches(matchResults)
      
      return { 
        skills,
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

  const loadSavedAnalysis = ({ skills, matches: savedMatches }) => {
    setExtractedSkills(skills || [])
    setMatches(savedMatches || [])
    setError(null)
  }

  return {
    extractedSkills,
    matches,
    isLoading,
    error,
    uploadedFileName,
    analyzeResume,
    analyzePDFResume,
    loadSavedAnalysis
  }
}
