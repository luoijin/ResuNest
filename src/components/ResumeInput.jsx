  import { useState } from 'react'
  import { FileText, Upload, Loader2 } from 'lucide-react'

  const ResumeInput = ({ onSubmit, isLoading }) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      if (text.trim()) {
        onSubmit(text)
      }
    }

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
            <FileText className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Paste Your Resume</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume text here...&#10;&#10;Example:&#10;Experienced data analyst with Python, SQL, and Excel. Skilled in data visualization and communication."
            rows={8}
            className="w-full p-4 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
          />
          
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
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