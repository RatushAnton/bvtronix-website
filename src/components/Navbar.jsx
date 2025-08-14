import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const nav = [
  {to:'/', label:'Home'},
  {to:'/about', label:'About'},
  {to:'/services', label:'Services'},
  {to:'/projects', label:'Projects'},
  {to:'/contact', label:'Contact'},
]

export default function Navbar(){
  const [open,setOpen]=useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="font-extrabold tracking-wide text-xl">BVTRONIX</div>
        <button className="lg:hidden p-2" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
          <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map(i=>(
            <NavLink key={i.to} to={i.to} className={({isActive})=>
              `text-sm hover:text-black ${isActive?'font-semibold text-black':'text-slate-600'}`
            }>{i.label}</NavLink>
          ))}
          <a href="/contact" className="px-4 py-2 rounded bg-black text-white text-sm">Get Quote</a>
        </nav>
      </div>
      {open && (
        <div className="lg:hidden border-t">
          <div className="container py-2 flex flex-col gap-2">
            {nav.map(i=>(
              <NavLink key={i.to} to={i.to} onClick={()=>setOpen(false)} className="py-2 text-slate-700">{i.label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
