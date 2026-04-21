import { useState, useEffect, useRef } from 'react'
import { Menu, X, Code2, Home, Sparkles, Users, LogOut, ChevronDown } from 'lucide-react'
import './Header.css'

const handleNavClick = (link) => {
  console.log('Button clicked:', link.name, 'page:', link.page)
  console.log('onNavigate function exists:', typeof onNavigate)
  setActiveLink(link.name)
  if (onNavigate) {
    onNavigate(link.page)
  } else {
    console.error('onNavigate is undefined!')
  }
}
const Header = ({ isLoggedIn, onLogout, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Features', icon: Sparkles, page: 'features' },
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
            <Code2 className="header-logo-icon-svg" size={20} />
          </div>
          <div className="header-logo-text">
            <span className="header-logo-title">ResuNest</span>
            <span className="header-logo-subtitle">2026</span>
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
          {isLoggedIn && (
            <div className="header-user-menu" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="header-user-btn"
              >
                <div className="header-user-avatar">
                  <Users className="header-user-avatar-icon" size={12} />
                </div>
                <span className="header-user-name">User</span>
                <ChevronDown className={`header-user-chevron ${isUserMenuOpen ? 'header-user-chevron-rotated' : ''}`} size={14} />
              </button>

              <div className={`header-dropdown ${isUserMenuOpen ? 'header-dropdown-open' : ''}`}>
                <div className="header-dropdown-header">
                  <p className="header-dropdown-title">My Account</p>
                </div>
                <div className="header-dropdown-body">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      onLogout()
                    }}
                    className="header-logout-btn"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}

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
          
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="header-mobile-logout"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header