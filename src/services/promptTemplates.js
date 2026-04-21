 export const SKILL_EXTRACTION_PROMPT = `
Extract technical and professional skills from the resume below.
Return ONLY a JSON array of skill strings.
Use standard skill names like: Python, JavaScript, React, SQL, Excel, Project Management, etc.
Limit to maximum 10 skills.
Do not include any explanation or additional text.
`

export const JOB_MATCHING_PROMPT = `
Given the user's skills and a job description, determine:
1. Match percentage (0-100)
2. Missing skills
3. Learning recommendations

Return as JSON with keys: matchScore, matchedSkills, missingSkills, recommendations
`