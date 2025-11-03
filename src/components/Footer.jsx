import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative">
      <div className="wrap py-10 grid gap-8 text-sm text-slate-700 sm:text-center md:text-left md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-bold text-lg tracking-tight">{t('home.hero_title_1')}</div>
          <p className="mt-2 text-slate-600">
            {t('home.hero_title_2')}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-2">{t('footer.quick_links')}</div>
          <ul className="space-y-1 text-slate-600">
            <li>
              <a href="/projects" className="hover:text-slate-900 transition-colors">
                {t('nav.projects')}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-slate-900 transition-colors">
                {t('nav.about')}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-slate-900 transition-colors">
                {t('nav.contact')}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold mb-2">{t('contact.title')}</div>
          <address className="not-italic space-y-2 text-slate-600">
            <p>
              <span className="font-medium text-slate-800">{t('contact.company.factory')}:</span><br />
              {t('footer.office_address')}
            </p>
            <p>
              <span className="font-medium text-slate-800">{t('contact.company.phone')}:</span>{' '}
              <a href="tel:+972542040366" className="hover:text-slate-900 transition-colors">+972-54-2040366</a>
            </p>
            <p>
              <span className="font-medium text-slate-800">{t('contact.company.fax')}:</span>{' '}
              <span>+972-77-6480641</span>
            </p>
            <p>
              <span className="font-medium text-slate-800">{t('contact.company.email')}:</span>{' '}
              <a href="mailto:bvtronix@gmail.com" className="hover:text-slate-900 transition-colors">
                bvtronix@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Top */}
      

      {/* Bottom bar */}
      <div className="border-t">
        <div className="wrap py-4 text-xs text-slate-500 text-center">
          &copy; {year} BVTronix. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
