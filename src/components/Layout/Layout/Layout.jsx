import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

const Layout = ({ children, isLoggedIn, onLogout, onNavigate }) => {
  return (
    <div className="layout">
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} onNavigate={onNavigate} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout