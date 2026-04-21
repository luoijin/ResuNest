import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

const Layout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div className="layout">
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout