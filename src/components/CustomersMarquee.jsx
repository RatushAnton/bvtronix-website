import React from 'react'

/** Prefer SVGs; keep transparent background for PNG/JPG */
const logos = [
  { name: 'Applied Materials', src: '/logos/Applied-Materials.svg', alt: 'Applied Materials' },
  { name: 'Avgol Nonwovens', src: '/logos/Avgol-Nonwovens.svg', alt: 'Avgol Nonwovens' },
  { name: 'Elbit Systems', src: '/logos/Elbit-Systems.svg', alt: 'Elbit Systems' },
  { name: 'Intel', src: '/logos/Intel.svg', alt: 'Intel' },
  { name: 'Memtech', src: '/logos/Memtech.svg', alt: 'Memtech' },
  { name: 'Minstech', src: '/logos/Minstech.svg', alt: 'Minstech' },
  { name: 'Orisol', src: '/logos/Orisol.svg', alt: 'Orisol' },
  { name: 'Taas', src: '/logos/Taas.svg', alt: 'Taas' },
  { name: 'Wolsely Canada', src: '/logos/Wolsely-Canada.svg', alt: 'Wolsely Canada' },
]

/** Single scrolling row; list duplicated for seamless loop */
function MarqueeRow({ items, duration = 40 }) {
  const track = [...items, ...items]
  return (
    // Full width container, edge-to-edge
    <div className="marquee relative overflow-hidden mask-fade-x w-full">
      <div className="marquee-track flex items-center" style={{ animationDuration: `${duration}s`, gap: '5rem' }}>
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="group relative h-40 flex items-center justify-center px-4"
            aria-label={logo.name}
          >
            <img
              src={logo.src}
              alt={logo.alt || logo.name}
              className="h-36 w-auto object-contain transition duration-300 group-hover:grayscale"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded px-2 py-1 text-sm md:text-base font-semibold bg-black/80 text-white shadow-lg">
                {logo.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CustomersMarquee() {
  if (!logos.length) return null
  return (
    <section className="wrap py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Our Customers</h2>
      <p className="text-center text-slate-600 mt-2 text-sm">
        We partner with leading manufacturers and innovators.
      </p>

      <div className="mt-8">
        <MarqueeRow items={logos} duration={40} />
        {/* Optional counter-row:
        <div className="mt-6 rotate-180">
          <div className="-rotate-180">
            <MarqueeRow items={logos} duration={36} />
          </div>
        </div>
        */}
      </div>
    </section>
  )
}
