import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/common.json'
import he from './locales/he/common.json'

// Persist language between visits (optional but recommended)
const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
const initial = saved || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he }
    },
    lng: initial,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
