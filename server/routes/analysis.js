import { extractSkillsWithGemini } from '../services/geminiService.js'
import { consumePdfUsage } from './usage.js'

export async function analyzeSkills(request, response) {
  const { resumeText, sourceType } = request.body || {}
  if (typeof resumeText !== 'string' || !resumeText.trim()) return response.status(400).json({ message: 'Resume text is required.' })

  try {
    const usage = sourceType === 'pdf' ? await consumePdfUsage(request) : null
    const skills = await extractSkillsWithGemini(resumeText)
    return response.json({ skills, usage })
  } catch (error) {
    if (error.status === 429) return response.status(429).json({ message: error.message, resetAt: error.resetAt })
    console.error('Gemini analysis error:', error.message)
    return response.status(502).json({ message: 'AI analysis is temporarily unavailable.' })
  }
}
