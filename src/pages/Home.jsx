import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ClipboardList, DraftingCompass, Cog, Factory, Truck, ShieldCheck } from 'lucide-react'
import CustomersMarquee from '../components/CustomersMarquee.jsx'


export default function Home(){
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-machinery bg-cover-center bg-fixed-smart bg-overlay-blue hero-vignette">
        <div className="wrap section-content py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="wrap py-20 md:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                BVTronix Ltd.
              </h1>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-500">
                Mechanical Design and Manufacturing Solutions
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                Retrofits, automation and custom modifications for your production machines — delivered with precision and reliability.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium
                            border border-slate-300 text-slate-800 transition-colors duration-200
                            hover:bg-slate-800 hover:text-white hover:border-slate-800
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  See Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="relative bg-white bg-watermark-blueprint" >
        <div className="wrap py-16 section-content">
          <h2 className="text-2xl md:text-3xl font-bold text-center">What we do</h2>

          {/* data */}
          {/*
            Icons:
            - Project Management -> ClipboardList
            - Design & Development -> DraftingCompass
            - Product Engineering -> Cog
            - Production Support -> Factory
            - Procurement & Logistics -> Truck
            - Quality Management -> ShieldCheck
          */}
          {(() => {
            const services = [
              {
                t: 'Project Management',
                d: 'From idea to delivery — we manage every stage of your engineering project, keeping timelines, quality, and communication on track.',
                icon: ClipboardList
              },
              {
                t: 'Design and Development',
                d: 'We turn concepts into reality with efficient, high-quality product design tailored to your business and market.',
                icon: DraftingCompass
              },
              {
                t: 'Product Engineering',
                d: 'End-to-end engineering for mechanics, electronics, and plastics — planned for reliability and performance.',
                icon: Cog
              },
              {
                t: 'Production Support',
                d: 'Smooth handoff from prototype to full production with trials, QA, and access to advanced manufacturing.',
                icon: Factory
              },
              {
                t: 'Procurement and Logistics',
                d: 'Smart sourcing, supplier management, and streamlined logistics to keep costs low and progress steady.',
                icon: Truck
              },
              {
                t: 'Quality Management',
                d: 'ISO-driven processes and expert oversight to ensure every deliverable meets global quality standards.',
                icon: ShieldCheck
              },
            ]

            return (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map(({ t, d, icon: Icon }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative p-6 rounded-xl border border-slate-200 bg-white
                              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                              hover:bg-slate-800 hover:border-slate-700 focus-within:ring-2
                              focus-within:ring-slate-400 text-center"
                    tabIndex={0} // keyboard focus styles apply
                  >
                    <div className="flex justify-center">
                      <Icon
                        className="h-10 w-10 text-slate-700 transition-colors duration-300 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="text-lg font-semibold transition-colors duration-300 group-hover:text-white">
                        {t}
                      </div>
                      <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 group-hover:text-slate-200">
                        {d}
                      </p>
                    </div>

                    {/* optional subtle focus ring for keyboard users */}
                    <span className="absolute inset-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-slate-400" />
                  </motion.div>
                ))}
              </div>

            )
          })()}
        </div>
      </section>
      
      <section className="relative bg-texture-brushed bg-cover-center">
        <div className="absolute inset-0 bg-white/85" />
        <div className="wrap py-14 section-content">
          <CustomersMarquee />
        </div>
      </section>
      


      {/* CTA */}
      <section className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(135deg, rgba(11,74,144,.06), rgba(244,207,40,.04)]" />
        <div className="wrap py-16 section-content flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Need to upgrade or modify a machine?</h3>
            <p className="text-slate-600 mt-2">Tell us your goal — we’ll design the solution.</p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-3 rounded-md bg-black text-white text-sm font-medium
                      transition-colors duration-200 hover:bg-slate-800
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 w-max"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  )
}
