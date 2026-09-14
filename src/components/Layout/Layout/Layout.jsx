import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

const Layout = ({ children, currentPage, onNavigate, onFooterAction, theme, onToggleTheme }) => {
  return (
    <div className="layout">
      <Header currentPage={currentPage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="layout-main">
        {children}
      </main>
      <Footer onAction={onFooterAction} />
    </div>
  )
}

export default Layout
