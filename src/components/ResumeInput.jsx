import { useRef, useState } from 'react'
import { AlertCircle, CheckCircle, FileText, FileUp, X } from 'lucide-react'

const ResumeInput = ({ isLoading, onPDFUpload, error }) => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setUploadedFile(file)
    await onPDFUpload?.(file)
  }

  const clearFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-6 md:p-8 text-left">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <FileText className="text-white" size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Upload Your Resume</h2>
      </div>

      {error && (
        <div className="resume-input-error mb-5" role="alert">
          <AlertCircle size={17} />
          <span>{error}</span>
        </div>
      )}

      <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition bg-slate-50">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,application/pdf"
          className="hidden"
          id="pdf-upload"
          disabled={isLoading}
        />
        <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center space-y-2">
          <FileUp size={32} className="text-blue-900" />
          <span className="text-sm font-medium text-blue-900">
            {isLoading ? 'Analyzing your resume...' : 'Click to upload and analyze a PDF'}
          </span>
          <span className="text-xs text-slate-500">5 PDF analyses per 3 hours per visitor</span>
        </label>
      </div>

      {uploadedFile && (
        <div className="mt-3 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 min-w-0">
            <CheckCircle size={16} className="text-green-600 shrink-0" />
            <span className="text-sm font-medium text-green-800 truncate">{uploadedFile.name}</span>
          </div>
          <button type="button" onClick={clearFile} className="text-red-400 hover:text-red-600 transition-colors p-1" aria-label="Remove uploaded PDF">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ResumeInput
