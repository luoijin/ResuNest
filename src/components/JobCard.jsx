import { Briefcase } from 'lucide-react'

const JobCard = ({ job, userSkills, matchScore, onClick }) => {
  const matchedSkills = job.matchedSkills || []
  
  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-white border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Briefcase size={18} className="text-blue-900" />
          <h3 className="font-bold text-slate-900">{job.job_title}</h3>
        </div>
        <span className="text-xs text-slate-400">{job.totalRequired || job.skills_required?.length || 0} skills</span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-slate-700">Match Score</span>
          <span className={`font-bold ${matchScore >= 60 ? 'text-green-600' : 'text-red-600'}`}>
            {matchScore}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ${
              matchScore >= 80 ? 'bg-green-500' : matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>
      
      {matchedSkills.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-slate-500 mb-1">Matched Skills:</p>
          <div className="flex flex-wrap gap-1">
            {matchedSkills.slice(0, 3).map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                {skill}
              </span>
            ))}
            {matchedSkills.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{matchedSkills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobCard