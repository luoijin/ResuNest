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
    'inventory management', 'inventory', 'food safety', 'sanitation', 'teamwork', 'hospitality', 'restaurant service',

    // Education
    'lesson planning', 'classroom management', 'student assessment', 'formative assessment', 'differentiated instruction',
    'parent communication', 'communicated with parents', 'educational technology', 'collaborative teaching', 'curriculum development',
    'special education', 'learning support', 'teaching', 'early childhood education', 'english as a second language',
    'esl', 'student counseling', 'behavior management', 'online teaching',

    // Healthcare
    'patient care', 'patient assessment', 'clinical assessment', 'clinical documentation', 'medical diagnosis',
    'medical records', 'electronic health records', 'ehr', 'infection control', 'health education', 'preventive care',
    'care coordination', 'patient communication', 'team collaboration', 'outpatient care', 'physical examinations',
    'specialist referrals', 'inpatient care', 'discharge planning', 'first aid', 'nursing', 'pharmacy',
    'laboratory testing', 'medical terminology',

    // Engineering
    'autocad', 'engineering design', 'technical drawing', 'safety compliance', 'quality control',
    'mathematics', 'electrical systems', 'mechanical systems', 'civil engineering', 'construction management',
    'structural analysis', 'environmental compliance', 'industrial processes', 'aerodynamics', 'solidworks', 'revit',

    // IT operations, infrastructure & support
    'it support', 'technical support', 'troubleshooting', 'network administration', 'system administration',
    'networking', 'windows', 'linux', 'cloud computing', 'azure', 'cybersecurity', 'database administration',
    'hardware support', 'software installation', 'incident management',

    // Aviation, maritime & service crew
    'cabin crew', 'flight attendant', 'emergency response', 'safety procedures', 'maritime safety',
    'navigation', 'seamanship', 'passenger service', 'crew coordination', 'ship operations', 'customer assistance',
    'baggage handling', 'ground operations', 'service crew'
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
