export default function Footer(){
  return (
    <footer className="border-t">
      <div className="container py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-bold text-lg">BVTronix</div>
          <p className="text-slate-600 mt-2">Machine solutions, retrofits & custom engineering.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1 text-slate-600">
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <p className="text-slate-600">info@bvtronix.com<br/>+972-00-000-0000</p>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 text-xs text-slate-500">&copy; {new Date().getFullYear()} BVTronix. All rights reserved.</div>
      </div>
    </footer>
  )
}
