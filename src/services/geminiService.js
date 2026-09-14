const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const configuredModel = import.meta.env.VITE_GEMINI_MODEL
const GEMINI_MODELS = [...new Set([configuredModel, 'gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'].filter(Boolean))]

const parseSkills = (text) => {
  const json = text.trim().replace(/^```json\s*|\s*```$/g, '')
  const skills = JSON.parse(json)
  if (!Array.isArray(skills)) throw new Error('Gemini returned an invalid skills response')

  return [...new Set(skills
    .filter((skill) => typeof skill === 'string')
    .map((skill) => skill.trim())
    .filter(Boolean))]
    .slice(0, 15)
}

const requestSkills = async (model, prompt) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, responseMimeType: 'application/json' }
    })
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

export async function extractSkillsWithGemini(resumeText) {
  if (!GEMINI_API_KEY) throw new Error('Missing VITE_GEMINI_API_KEY')

  const prompt = `Extract the candidate's technical, professional, and domain skills from the resume below. Return only a valid JSON array of concise, standardized skill names. Include at most 15 skills. Do not add explanations, markdown, or any text outside the JSON array.\n\nResume:\n${String(resumeText).slice(0, 12000)}`
  let lastError

  for (const model of GEMINI_MODELS) {
    try {
      return await requestSkills(model, prompt)
    } catch (error) {
      lastError = error
      console.warn(`Gemini model ${model} was unavailable.`, error)
    }
  }

  throw lastError || new Error('No configured Gemini model was available')
}
