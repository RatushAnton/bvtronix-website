export default function Projects(){
  const projects = [
    {t:'Cutter Retrofit', d:'New drive and safety interlocks'},
    {t:'Packaging Line Upgrade', d:'PLC, HMI and sensors'},
    {t:'Custom Indexing Table', d:'Mechanism + controls'},
  ]
  return (
    <section className="container py-14">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p,i)=>(
          <div key={i} className="border rounded overflow-hidden">
            <div className="aspect-video bg-slate-100" />
            <div className="p-5">
              <div className="font-semibold">{p.t}</div>
              <p className="text-slate-600 text-sm mt-1">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
