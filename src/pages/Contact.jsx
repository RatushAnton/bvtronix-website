export default function Contact(){
  return (
    <section className="container py-14">
      <h1 className="text-3xl font-bold">Contact</h1>
      <form className="mt-6 grid gap-4 max-w-xl">
        <input className="border rounded px-3 py-2" placeholder="Name" />
        <input className="border rounded px-3 py-2" placeholder="Email" />
        <input className="border rounded px-3 py-2" placeholder="Company" />
        <textarea className="border rounded px-3 py-2" rows="5" placeholder="Tell us about your machine / goal..." />
        <button type="button" className="px-5 py-3 rounded bg-black text-white w-max">Send</button>
      </form>
      <p className="text-slate-600 text-sm mt-4">Hook this form to your backend or EmailJS later.</p>
    </section>
  )
}
