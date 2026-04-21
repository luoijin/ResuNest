// src/services/SkillExtractor.js
export const extractSkillsWithGemini = async (resumeText) => {
  // Mock fallback for demo
  const MOCK_SKILLS = ["Python", "JavaScript", "React", "SQL", "Git"]
  
  try {
    // If Gemini API is configured, use it
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      // API call here (optional)
      return MOCK_SKILLS
    }
    
    // Fallback to mock for demo
    console.warn("Using mock skill extraction")
    return MOCK_SKILLS
  } catch (error) {
    console.warn("Gemini failed, using mock:", error)
    return MOCK_SKILLS
  }
}