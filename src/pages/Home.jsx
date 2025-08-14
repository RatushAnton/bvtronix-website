import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Industrial Engineering & <span className="text-slate-500">Machine Solutions</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Retrofits, automation and custom modifications for your production machines — delivered with precision and reliability.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/services" className="px-5 py-3 rounded bg-black text-white">Our Services</Link>
              <Link to="/projects" className="px-5 py-3 rounded border">See Projects</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold">What we do</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {t:'Machine Retrofits', d:'Add new functions, controls and safety to legacy equipment.'},
            {t:'Custom Mechanisms', d:'Design & fabricate attachments for unique operations.'},
            {t:'Controls & PLC', d:'Integrate sensors, PLCs and HMIs for reliability.'},
          ].map((it,i)=>(
            <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              className="p-6 border rounded-lg hover:shadow-sm">
              <div className="font-semibold">{it.t}</div>
              <p className="mt-2 text-slate-600 text-sm">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50">
        <div className="container py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Need to upgrade or modify a machine?</h3>
            <p className="text-slate-600 mt-2">Tell us your goal — we’ll design the solution.</p>
          </div>
          <Link to="/contact" className="px-5 py-3 rounded bg-black text-white w-max">Get a Quote</Link>
        </div>
      </section>
    </>
  )
}
