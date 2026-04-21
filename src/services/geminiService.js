const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

export async function extractSkillsWithGemini(resumeText) {
  // Mock fallback for demo/rate limits
  const MOCK_SKILLS = ["Python", "SQL", "JavaScript", "React", "Node.js", "Git", "Tailwind"]
  
  try {
    const prompt = `Extract technical and professional skills from this resume. Return ONLY a JSON array of skill strings (max 10 skills). Example: ["Python", "SQL", "Leadership"]. Resume: ${resumeText.substring(0, 3000)}`
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0, responseMimeType: "application/json" }
      })
    })
    
    if (!response.ok) throw new Error('API request failed')
    
    const data = await response.json()
    const skillsText = data.candidates[0].content.parts[0].text
    return JSON.parse(skillsText)
  } catch (error) {
    console.warn("Gemini failed, using mock:", error)
    return MOCK_SKILLS
  }
}