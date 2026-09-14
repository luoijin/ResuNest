import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Serve the worker from Vite instead of requesting a versioned CDN file.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export const extractTextFromPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target.result)
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise
        let fullText = ''
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          const pageText = textContent.items.map(item => item.str).join(' ')
          fullText += pageText + '\n'
        }
        
        if (!fullText.trim()) {
          throw new Error('No selectable text was found in this PDF. Please paste the resume text manually.')
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
