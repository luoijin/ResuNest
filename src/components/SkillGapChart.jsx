import { AlertCircle } from 'lucide-react'

const SkillGapChart = ({ missingSkills, jobTitle }) => {
  if (!missingSkills || missingSkills.length === 0) {
    return (
      <div className="text-center py-4 text-green-600 bg-green-50 rounded-lg">
        ✓ You have all required skills for {jobTitle}!
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-slate-900 mb-3">Missing Skills for {jobTitle}</h3>
      <div className="space-y-2">
        {missingSkills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-red-700 font-medium">{skill}</span>
            </div>
            <span className="text-xs text-red-500">Required</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillGapChart