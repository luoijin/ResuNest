import { useState, useRef } from 'react'
import { FileText, Upload, Loader2, FileUp, X, CheckCircle } from 'lucide-react'

const ResumeInput = ({ onSubmit, isLoading, onPDFUpload, isPDFLoading }) => {
  const [text, setText] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      if (onPDFUpload) {
        await onPDFUpload(file)
      }
    } else {
      alert('Please upload a PDF file')
    }
  }

  const clearFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <FileText className="text-white" size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Upload or Paste Your Resume</h2>
      </div>
      
      {/* PDF Upload Section */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <FileUp size={32} className="text-blue-900" />
            <span className="text-sm font-medium text-blue-900">Click to upload PDF</span>
            <span className="text-xs text-slate-400">or drag and drop</span>
          </label>
        </div>
        
        {uploadedFile && (
          <div className="mt-3 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-700">{uploadedFile.name}</span>
            </div>
            <button onClick={clearFile} className="text-red-400 hover:text-red-600">
              <X size={16} />
            </button>
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-slate-400">OR</span>
        </div>
      </div>
      
      {/* Text Input Section */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume text here...&#10;&#10;Example:&#10;Experienced data analyst with Python, SQL, and Excel. Skilled in data visualization and communication."
          rows={6}
          className="w-full p-4 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
        />
        
        <button
          type="submit"
          disabled={isLoading || (!text.trim() && !uploadedFile)}
          className="mt-4 w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <><Loader2 size={18} className="animate-spin" /><span>Analyzing...</span></>
          ) : (
            <><Upload size={18} /><span>Analyze Skills</span></>
          )}
        </button>
      </form>
    </div>
  )
}

export default ResumeInput