import { getAllJobs } from './jobStorage'

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

// UPDATED: Match against combined job pool
export const matchJobs = (userSkills, hardcodedJobs, filters = {}) => {
  // Get all jobs (hardcoded + client-posted)
  const allJobs = getAllJobs(hardcodedJobs)
  
  // Apply filters
  let filteredJobs = [...allJobs]
  
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.job_title.toLowerCase().includes(term) ||
      job.skills_required.some(skill => skill.toLowerCase().includes(term))
    )
  }
  
  if (filters.remoteOnly) {
    filteredJobs = filteredJobs.filter(job => job.isRemote === true)
  }
  
  if (filters.minSalary && filters.minSalary !== 'any') {
    // Simple salary filter logic
    filteredJobs = filteredJobs.filter(job => {
      if (!job.salaryRange || job.salaryRange === 'Not specified') return true
      const minSalary = parseInt(job.salaryRange.split('-')[0]) || 0
      return minSalary >= parseInt(filters.minSalary)
    })
  }
  
  const results = filteredJobs.map(job => {
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
      totalRequired: job.skills_required.length,
      isRemote: job.isRemote || false,
      location: job.location || 'On-site',
      salaryRange: job.salaryRange || 'Not specified',
      postedBy: job.postedBy || null,
      postedByName: job.postedByName || 'System'
    }
  })
  
  // Sort by match score (highest first)
  return results.sort((a, b) => b.matchScore - a.matchScore)
}