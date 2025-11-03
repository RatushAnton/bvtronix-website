export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative">
      <div className="wrap py-10 grid gap-8 text-sm text-slate-700 sm:text-center md:text-left md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-bold text-lg tracking-tight">BVTronix</div>
          <p className="mt-2 text-slate-600">
            Machine Design and Manufacturing Solutions
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1 text-slate-600">
            <li>
              <a href="/services" className="hover:text-slate-900 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-slate-900 transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-slate-900 transition-colors">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold mb-2">Contact Us</div>
          <address className="not-italic space-y-2 text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Factory Address:</span><br />
              5 Modi&apos;in St., Lod, 7116002
            </p>
            <p>
              <span className="font-medium text-slate-800">Phone:</span>{' '}
              <a href="tel:+972542040366" className="hover:text-slate-900 transition-colors">+972-54-2040366</a>
            </p>
            <p>
              <span className="font-medium text-slate-800">Fax:</span>{' '}
              <span>+972-77-6480641</span>
            </p>
            <p>
              <span className="font-medium text-slate-800">Email:</span>{' '}
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
          &copy; {year} BVTronix. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
