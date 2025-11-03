import { useTranslation } from 'react-i18next'

export default function LangSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language !== 'he'

  const toggle = () => {
    const next = isEN ? 'he' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 text-sm rounded border hover:bg-black hover:text-white transition ${className}`}
      aria-label="Switch language"
    >
      {isEN ? 'עברית' : 'English'}
    </button>
  )
}
