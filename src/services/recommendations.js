const RESOURCE_MAP = {
  'python': { platform: 'Python.org', url: 'https://docs.python.org/3/tutorial/' },
  'sql': { platform: 'W3Schools', url: 'https://www.w3schools.com/sql/' },
  'excel': { platform: 'Excel Easy', url: 'https://www.excel-easy.com/' },
  'data visualization': { platform: 'Tableau', url: 'https://www.tableau.com/learn/training' },
  'javascript': { platform: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  'react': { platform: 'React Docs', url: 'https://react.dev/learn' },
}

export const getRecommendations = (missingSkills) => {
  return missingSkills.map(skill => {
    const resource = RESOURCE_MAP[skill.toLowerCase()] || 
      { platform: 'YouTube', url: `https://www.youtube.com/results?search_query=learn+${skill}` }
    
    return {
      skill: skill,
      platform: resource.platform,
      url: resource.url
    }
  })
}