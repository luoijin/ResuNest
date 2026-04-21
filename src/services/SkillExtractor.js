// Skill keywords for fallback matching
const SKILL_KEYWORDS = [
  'python', 'javascript', 'java', 'sql', 'excel', 'tableau', 'power bi',
  'react', 'node.js', 'html', 'css', 'data visualization', 'machine learning',
  'pandas', 'numpy', 'tensorflow', 'git', 'docker', 'aws', 'figma', 
  'photoshop', 'communication', 'project management', 'agile', 'scrum', 
  'leadership', 'typescript', 'angular', 'vue', 'mongodb', 'postgresql',
  'firebase', 'kotlin', 'swift', 'flutter', 'graphql', 'rest api'
]

// Fallback: keyword-based extraction (no API call)
const extractSkillsWithKeywords = (text) => {
  const lowerText = text.toLowerCase()
  const foundSkills = []
  
  SKILL_KEYWORDS.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill)
    }
  })
  
  return [...new Set(foundSkills)] // remove duplicates
}

// Gemini API extraction (with fallback)
export const extractSkillsWithGemini = async (resumeText) => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  
  // If no API key, use keyword matching
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('No Gemini API key found. Using keyword matching fallback.')
    return extractSkillsWithKeywords(resumeText)
  }

  try {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
    
    const prompt = `Extract technical and professional skills from this resume. 
Return ONLY a JSON array of skill strings (max 10 skills). 
Use standard skill names like: Python, JavaScript, React, SQL, Excel, Project Management, etc.
Do not include any explanation or additional text.

Resume: ${resumeText.substring(0, 3000)}`

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0, 
          responseMimeType: "application/json" 
        }
      })
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    const skillsText = data.candidates[0].content.parts[0].text
    const skills = JSON.parse(skillsText)
    
    return Array.isArray(skills) ? skills.slice(0, 10) : extractSkillsWithKeywords(resumeText)
    
  } catch (error) {
    console.warn('Gemini API failed, using keyword fallback:', error)
    return extractSkillsWithKeywords(resumeText)
  }
}