import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export const extractTextFromPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target.result)
        const pdf = await pdfjsLib.getDocument(typedarray).promise
        let fullText = ''
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          const pageText = textContent.items.map(item => item.str).join(' ')
          fullText += pageText + '\n'
        }
        
        resolve(fullText)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// Alternative: Simple mock for demo (if PDF.js causes issues)
export const mockExtractTextFromPDF = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        John Doe - Software Engineer Resume
        
        SKILLS:
        Python, JavaScript, React, Node.js, SQL, Git
        
        EXPERIENCE:
        Senior Developer at TechCorp (2021-Present)
        - Built React applications with 10k+ users
        - Implemented REST APIs using Node.js
        
        Full Stack Developer at WebSolutions (2019-2021)
        - Developed frontend components with React
        - Managed PostgreSQL databases
        
        EDUCATION:
        BS Computer Science, University of Technology (2019)
      `)
    }, 1000)
  })
}