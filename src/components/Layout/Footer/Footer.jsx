import { Code2, Code, MessageCircle, Briefcase, Mail, Heart, MapPin, Phone } from 'lucide-react'
import './Footer.css'

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
    { icon: Code, href: '#', label: 'GitHub', hoverClass: 'social-github' },
    { icon: MessageCircle, href: '#', label: 'Twitter', hoverClass: 'social-twitter' },
    { icon: Briefcase, href: '#', label: 'LinkedIn', hoverClass: 'social-linkedin' },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Code2 className="footer-logo-svg" size={20} />
              </div>
              <div>
                <span className="footer-logo-title">Hackathon</span>
                <span className="footer-logo-subtitle">2026</span>
              </div>
            </div>
            <p className="footer-description">
              University of Cebu's premier hackathon event. Building innovative solutions with AI and modern web technologies.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className={`footer-social-link ${social.hoverClass}`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              {resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>University of Cebu, Cebu City, Philippines</span>
              </li>
              <li>
                <a href="mailto:team@hackathon2026.com" className="footer-contact-link">
                  <Mail size={16} className="footer-contact-icon" />
                  <span>team@hackathon2026.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+639123456789" className="footer-contact-link">
                  <Phone size={16} className="footer-contact-icon" />
                  <span>+63 912 345 6789</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            <span>© 2026 University of Cebu Hackathon. Made with</span>
            <Heart size={14} className="footer-heart" />
            <span>by Team UC</span>
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer