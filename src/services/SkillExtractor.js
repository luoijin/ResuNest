import { mockExtractTextFromPDF } from './pdfService'

// Mock skills for demo
const MOCK_SKILLS = ["Python", "JavaScript", "React", "SQL", "Git", "Node.js", "HTML", "CSS"]

// Make sure this is EXPORTED
export const extractSkillsWithGemini = async (resumeText) => {
  // Simple keyword matching for demo
  const skillsFound = []
  const skillKeywords = [
    'python', 'javascript', 'java', 'sql', 'excel', 'tableau', 'react', 'node.js',
    'html', 'css', 'git', 'docker', 'aws', 'mongodb', 'postgresql', 'typescript',
    'angular', 'vue', 'php', 'ruby', 'c++', 'csharp', 'data analysis', 'machine learning',
    'project management', 'agile', 'scrum', 'leadership', 'communication', 'figma',
    'photoshop', 'illustrator', 'wordpress', 'seo', 'marketing', 'sales', 'finance'
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

// Make sure this is EXPORTED
export const processPDFResume = async (file, useMock = true) => {
  try {
    let extractedText
    
    if (useMock) {
      extractedText = await mockExtractTextFromPDF(file)
    } else {
      extractedText = await mockExtractTextFromPDF(file)
    }
    
    const skills = await extractSkillsWithGemini(extractedText)
    
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