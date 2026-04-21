// Mock skills for when API fails
export const MOCK_SKILLS = [
  "Python", "JavaScript", "React", "SQL", "Git", 
  "Communication", "Project Management", "Excel"
]

export const getMockSkills = () => {
  return [...MOCK_SKILLS]
}

export const getMockMatches = (userSkills) => {
  return {
    success: true,
    skills: userSkills,
    message: "Using fallback mode - API rate limit reached"
  }
}