export const calculateMatchScore = (userSkills, jobRequiredSkills) => {
  if (!jobRequiredSkills || jobRequiredSkills.length === 0) return 0
  if (!userSkills || userSkills.length === 0) return 0
  
  const userSkillsLower = userSkills.map(s => s.toLowerCase())
  const requiredLower = jobRequiredSkills.map(s => s.toLowerCase())
  
  const matchedCount = requiredLower.filter(req => 
    userSkillsLower.includes(req)
  ).length
  
  return Math.round((matchedCount / jobRequiredSkills.length) * 100)
}

export const findMissingSkills = (userSkills, jobRequiredSkills) => {
  if (!userSkills || userSkills.length === 0) return jobRequiredSkills || []
  if (!jobRequiredSkills || jobRequiredSkills.length === 0) return []
  
  const userSkillsLower = userSkills.map(s => s.toLowerCase())
  
  return jobRequiredSkills.filter(req => 
    !userSkillsLower.includes(req.toLowerCase())
  )
}

export const matchJobs = (userSkills, jobsDataset) => {
  if (!jobsDataset || jobsDataset.length === 0) return []
  
  const results = jobsDataset.map(job => {
    const matchedSkills = job.skills_required.filter(skill =>
      userSkills.some(us => us.toLowerCase() === skill.toLowerCase())
    )
    
    const missingSkills = job.skills_required.filter(skill =>
      !userSkills.some(us => us.toLowerCase() === skill.toLowerCase())
    )
    
    const matchScore = calculateMatchScore(userSkills, job.skills_required)
    
    return {
      id: job.id,
      job_title: job.job_title,
      skills_required: job.skills_required,
      matchedSkills: matchedSkills,
      missingSkills: missingSkills,
      matchScore: matchScore,
      totalRequired: job.skills_required.length
    }
  })
  
  // Sort by match score (highest first)
  return results.sort((a, b) => b.matchScore - a.matchScore)
}