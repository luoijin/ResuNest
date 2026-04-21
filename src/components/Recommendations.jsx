import { BookOpen, ExternalLink } from 'lucide-react'

const Recommendations = ({ missingSkills, learningMap }) => {
  if (!missingSkills || missingSkills.length === 0) {
    return null
  }

  const getRecommendation = (skill) => {
    const lowerSkill = skill.toLowerCase()
    const resource = learningMap[lowerSkill] || learningMap[skill]
    
    if (resource) {
      return resource
    }
    
    // Fallback YouTube search
    return `https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skill)}`
  }

  const getPlatformName = (url) => {
    if (url.includes('youtube')) return 'YouTube'
    if (url.includes('coursera')) return 'Coursera'
    if (url.includes('w3schools')) return 'W3Schools'
    if (url.includes('docs')) return 'Documentation'
    if (url.includes('github')) return 'GitHub'
    return 'Learn More'
  }

  return (
    <div className="mt-6 pt-4 border-t border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen size={18} className="text-blue-900" />
        <h3 className="font-semibold text-slate-900">Recommended Learning Resources</h3>
      </div>
      
      <div className="space-y-3">
        {missingSkills.map((skill, index) => {
          const url = getRecommendation(skill)
          const platform = getPlatformName(url)
          
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div>
                <span className="font-medium text-blue-900">{skill}</span>
                <span className="text-xs text-blue-600 ml-2">({platform})</span>
              </div>
              <ExternalLink size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Recommendations