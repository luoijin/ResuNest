import { useState, useEffect } from 'react'
import { Menu, X, Home, Users, Moon, Sun } from 'lucide-react'
import './Header.css'

const Header = ({ onNavigate, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'About', icon: Users, page: 'about' },
  ]

  const handleNavClick = (link) => {
    setActiveLink(link.name)
    if (onNavigate) {
      onNavigate(link.page)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <nav className="header-nav">
        <div className="header-logo" onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>
          <div className="header-logo-icon">
            <img 
              src="/logo.png" 
              alt="ResuNest Logo" 
              className="header-logo-image"
            />
          </div>
          <div className="header-logo-text">
            <span className="header-logo-title">ResuNest</span>
          </div>
        </div>

        <div className="header-nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeLink === link.name
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`header-nav-link ${isActive ? 'header-nav-link-active' : ''}`}
              >
                <Icon size={16} />
                <span>{link.name}</span>
              </button>
            )
          })}
        </div>

        <div className="header-actions">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="header-mobile-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className={`header-mobile-menu ${isMobileMenuOpen ? 'header-mobile-menu-open' : ''}`}>
        <div className="header-mobile-links">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.name}
                onClick={() => {
                  handleNavClick(link)
                  setIsMobileMenuOpen(false)
                }}
                className={`header-mobile-link ${activeLink === link.name ? 'header-mobile-link-active' : ''}`}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </button>
            )
          })}
          
        </div>
      </div>
    </header>
  )
}

export default Header
