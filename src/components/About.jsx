import { Code2, Sparkles, Users, Brain, Briefcase, BookOpen, CheckCircle, Rocket } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-2xl mb-6">
            <Code2 size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About ResuNest
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            AI-Powered Job Matching & Skill Gap Analyzer
          </p>
        </div>

        {/* Project Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is ResuNest?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            ResuNest is an intelligent platform that helps job seekers find their ideal career matches 
            by analyzing their resumes and identifying skill gaps. Built for the University of Cebu 
            Hackathon 2026, our mission is to bridge the gap between job seekers and employers through 
            AI-powered insights.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you're a fresh graduate or an experienced professional, ResuNest provides 
            personalized job recommendations and learning resources to help you grow your career.
          </p>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Brain className="text-blue-900 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-slate-900">AI Skill Extraction</h3>
                <p className="text-sm text-slate-500">Powered by Google Gemini API</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Briefcase className="text-blue-900 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-slate-900">Job Matching</h3>
                <p className="text-sm text-slate-500">15+ job listings to match with</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BookOpen className="text-blue-900 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-slate-900">Learning Resources</h3>
                <p className="text-sm text-slate-500">Personalized recommendations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="text-blue-900 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-slate-900">Two User Roles</h3>
                <p className="text-sm text-slate-500">Freelancer & Client dashboards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">React</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">Vite</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">Google Gemini API</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">Lucide Icons</span>
          </div>
        </div>

        {/* Hackathon Info */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-lg p-8 mb-8 text-white text-center">
          <Rocket size={40} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">University of Cebu Hackathon 2026</h2>
          <p className="text-blue-200 mb-4">8-Hour Sprint | 3-Person Team</p>
          <p className="text-blue-100">
            Built with passion for the future of work
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 ResuNest. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for University of Cebu Hackathon</p>
        </div>
      </div>
    </div>
  )
}

export default About