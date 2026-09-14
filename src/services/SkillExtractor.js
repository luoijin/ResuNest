import { extractTextFromPDF } from './pdfService'

// Make sure this is EXPORTED
export const extractSkillsFromText = (resumeText) => {
  // Simple keyword matching for demo
  const skillsFound = []
  const skillKeywords = [
    'python', 'javascript', 'java', 'sql', 'excel', 'tableau', 'react', 'node.js',
    'html', 'css', 'git', 'docker', 'aws', 'mongodb', 'postgresql', 'typescript',
    'angular', 'vue', 'php', 'ruby', 'c++', 'csharp', 'data analysis', 'machine learning',
    'project management', 'agile', 'scrum', 'leadership', 'communication', 'figma',
    'photoshop', 'illustrator', 'wordpress', 'seo', 'marketing', 'sales', 'finance',
    'bartending', 'cocktail preparation', 'cocktails', 'customer service', 'pos systems', 'pos', 'cash handling',
    'inventory management', 'inventory', 'food safety', 'sanitation', 'teamwork', 'hospitality', 'restaurant service'
  ]
  
  const lowerText = resumeText.toLowerCase()
  
  skillKeywords.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      skillsFound.push(skill)
    }
  })
  
  // Remove duplicates
  return [...new Set(skillsFound)]
}

// Legacy alias retained for modules that still import the original name.
export const extractSkillsWithGemini = extractSkillsFromText

// Make sure this is EXPORTED
export const processPDFResume = async (file) => {
  try {
    const extractedText = await extractTextFromPDF(file)
    
    const skills = extractSkillsFromText(extractedText)
    
    return {
      success: true,
      text: extractedText,
      skills: skills,
      fileName: file.name
    }
  } catch (error) {
    console.error("PDF processing failed:", error)
    return {
      success: false,
      error: error.message,
      skills: []
    }
  }
}
