export const matchJobs = (userSkills, jobs) => {
  return jobs.map(job => {
    const requiredSkills = job.skills_required.map(s => s.toLowerCase())
    const userSkillsLower = userSkills.map(s => s.toLowerCase())
    
    const matchedSkills = requiredSkills.filter(skill => 
      userSkillsLower.includes(skill)
    )
    
    const missingSkills = requiredSkills.filter(skill => 
      !userSkillsLower.includes(skill)
    )
    
    const matchScore = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    )
    
    return {
      id: job.id,
      jobTitle: job.job_title,
      matchScore,
      matchedSkills,
      missingSkills,
      totalRequired: requiredSkills.length
    }
  }).sort((a, b) => b.matchScore - a.matchScore)
}