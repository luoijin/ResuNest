const MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash'

const parseSkills = (text) => {
  const json = text.trim().replace(/^```json\s*|\s*```$/g, '')
  const skills = JSON.parse(json)
  if (!Array.isArray(skills)) throw new Error('Gemini returned an invalid skills response')
  return [...new Set(skills.filter(skill => typeof skill === 'string').map(skill => skill.trim()).filter(Boolean))].slice(0, 15)
}

export async function extractSkillsWithGemini(resumeText) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Gemini service is not configured')

  const prompt = `Extract the candidate's technical, professional, and domain skills from the resume below. Return only a valid JSON array of concise, standardized skill names. Include at most 15 skills. Do not add explanations, markdown, or any text outside the JSON array.\n\nResume:\n${String(resumeText).slice(0, 12000)}`
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, responseMimeType: 'application/json' } })
  })
  if (!response.ok) {
    const details = await response.json().catch(() => null)
    throw new Error(details?.error?.message || `Gemini request failed (${response.status})`)
  }

  const data = await response.json()
  const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!responseText) throw new Error('Gemini returned no skill data')
  return parseSkills(responseText)
}
