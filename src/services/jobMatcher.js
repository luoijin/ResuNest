import { jobsDataset } from '../data/jobsDataset'

const SKILL_ALIASES = {
  'mixology': 'bartending',
  'cocktail mixing': 'cocktail preparation',
  'cocktails': 'cocktail preparation',
  'drink preparation': 'cocktail preparation',
  'customer support': 'customer service',
  'customer relations': 'customer service',
  'pos': 'pos systems',
  'point of sale': 'pos systems',
  'cashier': 'cash handling',
  'cash management': 'cash handling',
  'inventory': 'inventory management',
  'bar inventory': 'inventory management',
  'sanitation and safety': 'food safety',
  'food sanitation': 'food safety',
  'sanitation': 'food safety',
  'collaboration': 'teamwork',
  'formative assessment': 'student assessment',
  'communicated with parents': 'parent communication'
}

const normalizeSkill = (skill) => {
  const normalized = String(skill).toLowerCase().trim().replace(/\.$/, '')
  return SKILL_ALIASES[normalized] || normalized
}

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
    const requiredSkills = job.skills_required.map(normalizeSkill)
    const userSkillsLower = userSkills.map(normalizeSkill)
    
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
      isClientPosted: Boolean(job.isClientPosted)
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
