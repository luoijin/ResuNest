import { useState, useEffect } from 'react'
import { Download, Menu, X, Home, Users, Moon, Sun } from 'lucide-react'
import './Header.css'

const Header = ({ currentPage, onNavigate, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const captureInstallPrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const markInstalled = () => {
      setInstallPrompt(null)
      setIsInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
    window.addEventListener('appinstalled', markInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
      window.removeEventListener('appinstalled', markInstalled)
    }
  }, [])

  const navLinks = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'About', icon: Users, page: 'about' },
  ]

  const handleNavClick = (link) => {
    if (onNavigate) {
      onNavigate(link.page)
    }
  }

  const handleInstall = async () => {
    if (!installPrompt) {
      window.alert('Install is not ready yet. Refresh once after the site finishes loading, then try again. You can also use your browser menu and choose “Install ResuNest”.')
      return
    }
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
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
          {!isInstalled && (
            <button onClick={handleInstall} className="header-install-btn">
              <Download size={16} />
              <span>Install</span>
            </button>
          )}
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = currentPage === link.page
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
          {!isInstalled && (
            <button onClick={handleInstall} className="header-mobile-install-btn">
              <Download size={18} />
              <span>Install ResuNest</span>
            </button>
          )}
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.name}
                onClick={() => {
                  handleNavClick(link)
                  setIsMobileMenuOpen(false)
                }}
                className={`header-mobile-link ${currentPage === link.page ? 'header-mobile-link-active' : ''}`}
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
