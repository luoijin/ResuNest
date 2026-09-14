import { Brain, Briefcase, Database, Download, FileUp, History, ShieldCheck } from 'lucide-react'

const features = [
  { icon: FileUp, title: 'PDF resume analysis', description: 'Upload a text-based resume PDF and receive skill insights in moments.' },
  { icon: Brain, title: 'Protected AI extraction', description: 'Gemini analysis runs through a server-side API, keeping credentials private.' },
  { icon: Briefcase, title: 'Find your strongest field', description: 'Explore career fields that align with your experience, skills, and strengths.' },
  { icon: Download, title: 'Downloadable reports', description: 'Save your current skills and job matches as a clear PDF report.' },
  { icon: History, title: 'Private local history', description: 'Reopen recent analyses on the same browser and device.' },
  { icon: ShieldCheck, title: 'Built for the community', description: 'Anyone can explore career direction, with five PDF analyses every three hours.' }
]

const About = () => (
  <div className="about-page min-h-screen py-12">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-transparent">
          <img src="/logo.png" alt="ResuNest Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About ResuNest</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Helping people discover the career field where they can do their best work.</p>
      </div>

      <section className="about-card rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Career direction for everyone</h2>
        <p className="text-slate-600 leading-relaxed mb-4">ResuNest helps people turn a resume into clearer career direction. Upload a PDF, review the strengths it contains, and discover the fields and roles that best fit your experience.</p>
        <p className="text-slate-600 leading-relaxed">It is for students, graduates, career changers, and anyone looking for a clearer learning path. Matches are starting points for exploration, not hiring decisions.</p>
      </section>

      <section className="about-card rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">What you can do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div className="flex items-start space-x-3" key={title}>
              <Icon className="text-blue-900 mt-1 shrink-0" size={20} />
              <div><h3 className="font-semibold text-slate-900">{title}</h3><p className="text-sm text-slate-500">{description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-card rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Built with privacy in mind</h2>
        <p className="text-slate-600 leading-relaxed">ResuNest does not require an account. Your recent history stays in your browser, while the uploaded PDF stays on your device. Only extracted text is sent to the protected analysis service. Anonymous PDF limits are stored in MongoDB using a salted hash, not a raw IP address.</p>
      </section>

      <section className="about-card rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Technology</h2>
        <div className="flex flex-wrap gap-3">
          {['React', 'Vite', 'Express', 'MongoDB Atlas', 'Google Gemini', 'PDF.js', 'Render'].map(item => <span className="about-tech-chip px-4 py-2 rounded-full text-sm font-medium" key={item}>{item}</span>)}
        </div>
        <div className="flex items-center gap-2 mt-6 text-sm text-slate-500"><Database size={16} /> Public access, protected server credentials, and MongoDB-backed usage controls.</div>
      </section>

      <div className="text-center text-slate-400 text-sm"><p>© 2026 ResuNest. All rights reserved.</p></div>
    </div>
  </div>
)

export default About
