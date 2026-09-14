const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export async function extractSkillsWithGemini(resumeText, sourceType = 'pdf') {
  const response = await fetch(`${API_BASE_URL}/api/analysis/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, sourceType })
  })
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(payload.message || `Analysis request failed (${response.status})`)
    error.status = response.status
    throw error
  }

  return payload.skills || []
}
