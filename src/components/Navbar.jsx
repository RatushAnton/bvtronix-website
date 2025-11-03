import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher.jsx';
import BrandLogo from "./BrandLogo.jsx";

const nav = [
  { to: '/', key:'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  // Base style shared by all top nav links (desktop)
  const baseLink =
    'text-sm px-3 py-2 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400'

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="wrap flex items-center justify-between h-16">
        <BrandLogo size={28} variant="color" />

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {nav.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                [
                  baseLink,
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ].join(' ')
              }
            >
              {t(i.key)}
            </NavLink>
          ))}

          {/* Get Quote button */}
          <a
            href="/contact"
            className="ml-2 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm
                       bg-black text-white transition-colors duration-200 hover:bg-slate-800
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {t('nav.get_quote')}
          </a>
          <LangSwitcher />
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t">
          <div className="wrap py-2 flex flex-col gap-2">
            {nav.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'px-3 py-2 rounded-md transition-colors duration-200',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-700 hover:bg-slate-800 hover:text-white',
                  ].join(' ')
                }
              >
                {t(i.key)}
              </NavLink>
            ))}
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md bg-black text-white text-sm text-center
                         transition-colors duration-200 hover:bg-slate-800"
            >
              {t('nav.get_quote')}
            </a>
            <LangSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
