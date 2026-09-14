import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

const Layout = ({ children, onNavigate, theme, onToggleTheme }) => {
  return (
    <div className="layout">
      <Header onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
