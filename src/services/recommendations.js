// learning resource mappings
const RESOURCE_MAP = {
  'python': { platform: 'Python.org', url: 'https://docs.python.org/3/tutorial/' },
  'javascript': { platform: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  'sql': { platform: 'W3Schools', url: 'https://www.w3schools.com/sql/' },
  'excel': { platform: 'Excel Easy', url: 'https://www.excel-easy.com/' },
  'data visualization': { platform: 'Tableau', url: 'https://www.tableau.com/learn/training' },
  'react': { platform: 'React Docs', url: 'https://react.dev/learn' },
  'node.js': { platform: 'Node.js Docs', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
  'mongodb': { platform: 'MongoDB University', url: 'https://learn.mongodb.com/' },
  'git': { platform: 'Git SCM', url: 'https://git-scm.com/doc' },
  'docker': { platform: 'Docker Docs', url: 'https://docs.docker.com/get-started/' },
  'aws': { platform: 'AWS Training', url: 'https://aws.amazon.com/training/' },
  'machine learning': { platform: 'Google AI', url: 'https://developers.google.com/machine-learning/crash-course' },
  'pandas': { platform: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
  'numpy': { platform: 'NumPy Docs', url: 'https://numpy.org/learn/' },
  'communication': { platform: 'Coursera', url: 'https://www.coursera.org/learn/wharton-communication-skills' },
  'leadership': { platform: 'Mind Tools', url: 'https://www.mindtools.com/pages/article/newLDR_41.htm' },
  'agile': { platform: 'Atlassian', url: 'https://www.atlassian.com/agile' },
  'scrum': { platform: 'Scrum Guide', url: 'https://www.scrum.org/resources/what-is-scrum' },
  'html': { platform: 'W3Schools', url: 'https://www.w3schools.com/html/' },
  'css': { platform: 'W3Schools', url: 'https://www.w3schools.com/css/' },
  'tailwind': { platform: 'Tailwind Docs', url: 'https://tailwindcss.com/docs' },
  'figma': { platform: 'Figma', url: 'https://www.figma.com/resources/learn-design/' },
  'tensorflow': { platform: 'TensorFlow', url: 'https://www.tensorflow.org/learn' }
}

export const getRecommendations = (missingSkills) => {
  if (!missingSkills || missingSkills.length === 0) return []
  
  return missingSkills.map(skill => {
    const key = skill.toLowerCase()
    const resource = RESOURCE_MAP[key]
    
    if (resource) {
      return {
        skill: skill,
        platform: resource.platform,
        url: resource.url
      }
    }
    
    // Fallback: YouTube search
    return {
      skill: skill,
      platform: 'YouTube',
      url: `https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skill)}`
    }
  })
}