const STORAGE_KEY = 'resunest_client_jobs'

// Get all jobs (hardcoded + client-posted)
export const getAllJobs = (hardcodedJobs) => {
  const clientJobs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return [...hardcodedJobs, ...clientJobs]
}

// Get only client-posted jobs for a specific client
export const getClientJobs = (clientId) => {
  const allClientJobs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return allClientJobs.filter(job => job.postedBy === clientId)
}

// Post a new job
export const postJob = (jobData, clientId, clientName) => {
  const clientJobs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  
  const newJob = {
    id: Date.now(),
    job_title: jobData.title,
    skills_required: jobData.skills.split(',').map(s => s.trim()),
    postedBy: clientId,
    postedByName: clientName,
    postedAt: new Date().toISOString(),
    isRemote: jobData.isRemote || false,
    location: jobData.location || 'On-site',
    salaryRange: jobData.salaryRange || 'Not specified'
  }
  
  clientJobs.push(newJob)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientJobs))
  
  return newJob
}

// Delete a job post (optional)
export const deleteJob = (jobId, clientId) => {
  const clientJobs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const filtered = clientJobs.filter(job => job.id !== jobId || job.postedBy !== clientId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}