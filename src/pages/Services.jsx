export default function Services(){
  const services = [
    {t:'Machine Retrofits', d:'Mechanical upgrades, drives, guards, and safety.'},
    {t:'Control Systems', d:'PLC/HMI, sensors, wiring, and commissioning.'},
    {t:'Custom Fixtures', d:'Purpose-built mechanisms and tooling.'},
    {t:'Integration', d:'Conveyors, feeders, inspection systems.'},
  ]
  return (
    <section className="container py-14">
      <h1 className="text-3xl font-bold">Services</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s,i)=>(
          <div key={i} className="p-6 border rounded">
            <div className="font-semibold">{s.t}</div>
            <p className="text-slate-600 text-sm mt-2">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
