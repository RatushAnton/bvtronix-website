import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout({children}){
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}
