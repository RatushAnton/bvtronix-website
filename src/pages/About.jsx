import { useEffect, useMemo, useRef, useState } from "react"

export default function About() {
  // === Config ===
  const startYear = 2000 // <-- set your founding year here
  const customers = [
    { name: "Applied Materials", src: "/logos/Applied-Materials.svg", alt: "Applied Materials" },
    { name: "Avgol Nonwovens",  src: "/logos/Avgol-Nonwovens.svg",   alt: "Avgol Nonwovens" },
    { name: "Elbit Systems",    src: "/logos/Elbit-Systems.svg",     alt: "Elbit Systems" },
    { name: "Intel",            src: "/logos/Intel.svg",             alt: "Intel" },
    { name: "MemTech",          src: "/logos/Memtech.svg",           alt: "MemTech" },
    { name: "Minstech",         src: "/logos/Minstech.svg",          alt: "Minstech" },
    { name: "Orisol",           src: "/logos/Orisol.svg",            alt: "Orisol" },
    { name: "Taas",             src: "/logos/Taas.svg",              alt: "Taas" },
    { name: "Wolseley Canada",  src: "/logos/Wolsely-Canada.svg",    alt: "Wolseley Canada" },
  ]

  // === Dynamic years counter ===
  const targetYears = useMemo(() => Math.max(0, new Date().getFullYear() - startYear), [startYear])
  const [years, setYears] = useState(0)
  useEffect(() => {
    let raf = 0
    const duration = 700 // ms
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setYears(Math.round(targetYears * (0.2 + 0.8 * p))) // quick ramp
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [targetYears])

  // === Simple one-logo slider (no deps) ===
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % customers.length)
    }, 2500)
    return () => clearInterval(intervalRef.current)
  }, [paused, customers.length])

  return (
    <section className="wrap py-14">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">About BVTronix</h1>

      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Left: Company summary */}
        <div className="md:col-span-2 space-y-5 text-slate-700 leading-relaxed">
          <p>
            BVTronix Ltd. delivers design and development solutions for machinery and mechanical products.
            We help manufacturers modernize production lines, upgrade legacy equipment, and bring new
            products to market—safely, efficiently, and on schedule.
          </p>
          <p>
            The company was founded by Boris Gorodnitsky, a Certified Quality Engineer (CQE) with a degree
            in Industrial & Mechanical Engineering and over two decades of hands-on experience in project
            management, engineering, and manufacturing.
          </p>
          <p>
            Our capabilities span the full lifecycle: concept and engineering design, prototyping,
            manufacturing and assembly, quality management, procurement, and logistics. We also collaborate
            with a trusted network of subcontractors and subject-matter experts to scale quickly when needed.
          </p>
          <p>
            We’re committed to a fast, flexible process and uncompromising quality—so you get reliable
            results with clear communication at every step.
          </p>
        </div>

        {/* Right: Customers slider, years counter, certificate */}
        <aside className="space-y-8">
          {/* Customers */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-center md:text-left">Our Customers</h2>

            {/* Slider viewport */}
            <div
              className="relative overflow-hidden rounded-lg border bg-white"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Track */}
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {customers.map((c) => (
                  <div
                    key={c.name}
                    className="min-w-full flex items-center justify-center p-8"
                  >
                    <div className="group relative">
                      <img
                        src={c.src}
                        alt={c.alt || c.name}
                        className="h-20 md:h-24 w-auto object-contain transition duration-300 group-hover:grayscale"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <span className="rounded px-2 py-1 text-sm md:text-base font-semibold bg-black/80 text-white shadow">
                          {c.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {customers.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-6 bg-slate-800" : "w-3 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* Years in the industry */}
          <div className="text-center">
            <div className="text-5xl font-extrabold text-slate-800">{years}</div>
            <div className="text-lg font-semibold text-slate-700">Years in the Industry</div>
            <div className="text-xs text-slate-500 mt-1">Since {startYear}</div>
          </div>

          {/* Certificate placeholder */}
          <div className="rounded-lg border p-2 bg-white">
            <div className="aspect-[4/3] w-full bg-slate-100 grid place-items-center rounded">
              <span className="text-slate-500 text-sm">Certificate Placeholder</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
