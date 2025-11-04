import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative -mt-2 bg-footer-cad bg-cover-center text-slate-100">
      <div className="wrap py-10 grid gap-8 text-sm sm:text-center md:text-left md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-bold text-lg tracking-tight">{t('home.hero_title_1')}</div>
          <p className="mt-2 text-slate-200">
            {t('home.hero_title_2')}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-2">{t('footer.quick_links')}</div>
          <ul className="space-y-1 text-slate-200/80">
            <li>
              <a href="/projects" className="hover:text-white transition-colors">
                {t('nav.projects')}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                {t('nav.about')}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                {t('nav.contact')}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold mb-2">{t('contact.title')}</div>
          <address className="not-italic space-y-2 text-slate-200/80">
            <p>
              <span className="font-medium text-white">{t('contact.company.factory')}:</span><br />
              {t('footer.office_address')}
            </p>
            <p>
              <span className="font-medium text-white">{t('contact.company.phone')}:</span>{' '}
              <a href="tel:+972542040366" className="hover:text-white transition-colors">+972-54-2040366</a>
            </p>
            <p>
              <span className="font-medium text-white">{t('contact.company.fax')}:</span>{' '}
              <span>+972-77-6480641</span>
            </p>
            <p>
              <span className="font-medium text-white">{t('contact.company.email')}:</span>{' '}
              <a href="mailto:bvtronix@gmail.com" className="hover:text-white transition-colors">
                bvtronix@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="wrap py-4 text-xs text-slate-300 text-center">
          &copy; {year} BVTronix. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
