import { jobsDataset } from '../data/jobsDataset'

// Get all jobs (seed + client-posted)
export const getAllJobs = () => {
  // Get seed jobs (read-only from dataset)
  const seedJobs = jobsDataset
  
  // Get client-posted jobs from localStorage
  const clientJobs = JSON.parse(localStorage.getItem('client_jobs') || '[]')
  
  // Combine both
  return [...seedJobs, ...clientJobs]
}

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
      job_title: job.job_title,
      matchScore,
      matchedSkills,
      missingSkills,
      totalRequired: requiredSkills.length,
      isClientPosted: !job.id || job.id > 15
    }
  }).sort((a, b) => b.matchScore - a.matchScore)
}

// Legacy function for backward compatibility
export const calculateMatchScore = (userSkills, jobRequiredSkills) => {
  const matched = userSkills.filter(skill => 
    jobRequiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
  )
  return Math.round((matched.length / jobRequiredSkills.length) * 100)
}

export const findMissingSkills = (userSkills, jobRequiredSkills) => {
  return jobRequiredSkills.filter(req => 
    !userSkills.some(skill => skill.toLowerCase() === req.toLowerCase())
  )
}