import { useState } from 'react'
import { postJob, getClientJobs, deleteJob } from '../services/jobStorage'

export const useJobPosting = (currentUser) => {
  const [postedJobs, setPostedJobs] = useState([])
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadMyJobs = () => {
    if (currentUser) {
      const jobs = getClientJobs(currentUser.id)
      setPostedJobs(jobs)
    }
  }

  const submitJob = async (jobData) => {
    setIsPosting(true)
    setError('')
    setSuccess('')
    
    try {
      const newJob = postJob(jobData, currentUser.id, currentUser.name)
      setSuccess('Job posted successfully!')
      loadMyJobs() // Refresh the list
      return newJob
    } catch (err) {
      setError('Failed to post job')
      return null
    } finally {
      setIsPosting(false)
    }
  }

  const removeJob = (jobId) => {
    deleteJob(jobId, currentUser.id)
    loadMyJobs()
  }

  return {
    postedJobs,
    isPosting,
    error,
    success,
    submitJob,
    removeJob,
    loadMyJobs
  }
}