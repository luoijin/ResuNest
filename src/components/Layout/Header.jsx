import { useState, useEffect, useRef } from 'react'
import { Menu, X, Code2, Home, Sparkles, Users, LogOut, ChevronDown } from 'lucide-react'

const Header = ({ isLoggedIn, onLogout }) => {
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
    { name: 'Home', icon: Home },
    { name: 'Features', icon: Sparkles },
    { name: 'About', icon: Users },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b ${isScrolled ? 'shadow-sm border-blue-100' : 'border-transparent'}`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
              <Code2 className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-bold text-lg leading-tight">Hackathon</span>
              <span className="text-blue-900 text-xs font-medium">2026</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1 ml-auto mr-4">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeLink === link.name
              return (
                <button
                  key={link.name}
                  onClick={() => setActiveLink(link.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'text-blue-900 bg-blue-50' : 'text-slate-500 hover:text-blue-900'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {isLoggedIn && (
              <div className="hidden md:block relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 border border-blue-200 rounded-full px-3 py-1.5 bg-white hover:bg-blue-50"
                >
                  <div className="w-7 h-7 bg-blue-900 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={12} />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">User</span>
                  <ChevronDown className={`text-blue-900 ${isUserMenuOpen ? 'rotate-180' : ''}`} size={14} />
                </button>

                <div className={`absolute right-0 mt-2 w-48 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden ${
                  isUserMenuOpen ? 'block' : 'hidden'
                }`}>
                  <div className="px-4 py-2 border-b border-blue-50">
                    <p className="text-sm font-medium text-slate-900">My Account</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        onLogout()
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
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
              className="md:hidden text-blue-900 p-2"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveLink(link.name)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                    activeLink === link.name ? 'bg-blue-50 text-blue-900' : 'text-slate-500'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              )
            })}
            
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
