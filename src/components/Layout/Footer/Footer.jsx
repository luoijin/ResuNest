import { Mail } from 'lucide-react'
import './Footer.css'

const Footer = ({ onAction }) => {
  const quickLinks = [
    { name: 'Home', action: 'home' },
    { name: 'Analyze Resume', action: 'analyze' },
    { name: 'Job Matches', action: 'matches' },
    { name: 'Learning Paths', action: 'learning' },
  ]

  const resources = [
    { name: 'Documentation', href: '/documentation.html' },
    { name: 'Skill Guide', href: 'https://www.mynextmove.org/' },
    { name: 'Career Tips', href: 'https://www.careeronestop.org/' },
    { name: 'FAQ', href: '/faq.html' },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <img 
                  src="/logo.png" 
                  alt="ResuNest Logo" 
                  className="footer-logo-image"
                />
              </div>
              <div>
                <span className="footer-logo-title">ResuNest</span>
              </div>
            </div>
            <p className="footer-description">
              Your calm, focused space for turning experience into your next career opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button type="button" className="footer-link footer-link-button" onClick={() => onAction?.(link.action)}>
                    {link.name}
                  </button>
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
                  <a href={link.href} className="footer-link" target="_blank" rel="noopener noreferrer">
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
              <li>
                <a href="mailto:aloraine.cs@gmail.com" className="footer-contact-link">
                  <Mail size={16} className="footer-contact-icon" />
                  <span>aloraine.cs@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="mailto:ninobacalso@gmail.com" className="footer-contact-link">
                  <Mail size={16} className="footer-contact-icon" />
                  <span>ninobacalso@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="mailto:janninobansag@gmail.com" className="footer-contact-link">
                  <Mail size={16} className="footer-contact-icon" />
                  <span>janninobansag@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="/privacy.html" className="footer-legal-link">Privacy Policy</a>
            <a href="/terms.html" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
