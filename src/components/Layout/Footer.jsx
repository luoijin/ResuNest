 import { Code2, Code, MessageCircle, Briefcase, Mail, Heart, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Challenges', href: '#' },
    { name: 'Teams', href: '#' },
    { name: 'Leaderboard', href: '#' },
  ]

  const resources = [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Guidelines', href: '#' },
    { name: 'FAQ', href: '#' },
  ]

  const socialLinks = [
    { icon: Code, href: '#', label: 'GitHub', hoverClass: 'hover:bg-blue-900 hover:text-white' },
    { icon: MessageCircle, href: '#', label: 'Twitter', hoverClass: 'hover:bg-blue-500 hover:text-white' },
    { icon: Briefcase, href: '#', label: 'LinkedIn', hoverClass: 'hover:bg-blue-700 hover:text-white' },
  ]

  return (
    <footer className="bg-white border-t border-blue-100">
      <div className="container mx-auto px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                <Code2 className="text-white" size={20} />
              </div>
              <div>
                <span className="text-slate-900 font-bold text-lg block leading-tight">Hackathon</span>
                <span className="text-blue-900 text-xs font-medium">2026</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              University of Cebu's premier hackathon event. Building innovative solutions with AI and modern web technologies.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 bg-slate-50 border border-blue-100 rounded-xl flex items-center justify-center text-slate-500 ${social.hoverClass} transition-colors`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-blue-900 font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-blue-900 text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-blue-900 font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-blue-900 text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-blue-900 font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-500 text-sm">
                <MapPin size={16} className="text-blue-900 mt-0.5 shrink-0" />
                <span>University of Cebu, Cebu City, Philippines</span>
              </li>
              <li>
                <a href="mailto:team@hackathon2026.com" className="flex items-center space-x-3 text-slate-500 hover:text-blue-900 text-sm transition-colors">
                  <Mail size={16} className="text-blue-900 shrink-0" />
                  <span>team@hackathon2026.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+639123456789" className="flex items-center space-x-3 text-slate-500 hover:text-blue-900 text-sm transition-colors">
                  <Phone size={16} className="text-blue-900 shrink-0" />
                  <span>+63 912 345 6789</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-100 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm flex items-center space-x-1">
            <span>© 2026 University of Cebu Hackathon. Made with</span>
            <Heart size={14} className="text-blue-900 fill-blue-900" />
            <span>by Team UC</span>
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-blue-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-blue-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
