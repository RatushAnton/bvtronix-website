import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import emailjs from "@emailjs/browser"
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const details = {
    officeAddress: "5 Kalman Bialer St., Rehovot, 7666115, Israel",
    factoryAddress: "5 Modi'in St., Lod, 7116002, Israel",
    phone: "+972-54-2040366",
    fax: "+972-77-6480641",
    email: "bvtronix@gmail.com",
    hours: [
      { label: "Sunday – Thursday", value: "08:00 – 18:00" },
      { label: "Friday", value: "08:00 – 12:00" },
      { label: "Saturday", value: "Closed" },
    ]
  }

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" })
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState({ type: "", text: "" })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    setNotice({ type: "", text: "" })

    // Honeypot (bots fill hidden field)
    if (form.company) {
      setNotice({ type: "error", text: "Submission blocked (spam detected)." })
      return
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotice({ type: "error", text: "Please fill in name, email, and message." })
      return
    }

    try {
      setSubmitting(true)

      const params = {
        name: form.name,
        email: form.email,
        phone: form.phone || "-",
        message: form.message,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )

      setForm({ name: "", email: "", phone: "", message: "", company: "" })
      setNotice({ type: "success", text: "Thanks! Your message has been sent." })
    } catch (err) {
      setNotice({ type: "error", text: "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="wrap py-14">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">{t('contact.title')}</h1>
        <p className="mt-3 text-slate-600">{t('contact.question')}</p>
        <p className="mt-3 text-slate-600">{t('contact.subtitle')}</p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* LEFT: FORM */}
        <div className="rounded-xl border bg-white p-6 md:p-8">
          <h2 className="text-xl font-semibold">{t('contact.form.title')}</h2>
          <p className="text-slate-600 text-sm mt-1">{t('contact.form.subtitle')}</p>

          {notice.text ? (
            <div
              className={`mt-4 rounded-md px-3 py-2 text-sm ${
                notice.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {notice.text}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            {/* Honeypot (hidden to humans) */}
            <input
              name="company"
              value={form.company}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block text-sm font-medium text-slate-700">{t('contact.form.name')} *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder={t('contact.form.full_name')}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('contact.form.email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('contact.form.phone')}</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  placeholder="+972…"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">{t('contact.form.message')} *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={6}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder={t('contact.form.message_body')}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium
                           bg-black text-white transition-colors duration-200 hover:bg-slate-800
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: CONTACT INFO + MAP */}
        <aside className="space-y-6">
          <div className="rounded-xl border bg-white p-6 md:p-8">
            <h2 className="text-xl font-semibold">{t('contact.contact_details')}</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">{t('contact.company.office')}</div>
                  <div className="text-sm">{details.officeAddress}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">{t('contact.company.factory')}</div>
                  <div className="text-sm">{details.factoryAddress}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-slate-600" />
                <div className="text-sm">
                  <a
                    href={`tel:${details.phone.replace(/[^+\d]/g, "")}`}
                    className="text-slate-700 hover:text-white hover:bg-slate-800 px-1 rounded transition-colors"
                  >
                    {details.phone}
                  </a>
                  <div className="text-slate-500">{t('contact.company.fax')}: {details.fax}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-slate-600" />
                <a
                  href={`mailto:${details.email}`}
                  className="text-sm text-slate-700 hover:text-white hover:bg-slate-800 px-1 rounded transition-colors"
                >
                  {details.email}
                </a>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-slate-600" />
                <div className="text-sm">
                  {details.hours.map((h) => (
                    <div key={h.label}>
                      <span className="text-slate-900">{h.label}:</span> {h.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border">
            <iframe
              title="BVTronix Location"
              src="https://www.google.com/maps?q=5%20Kalman%20Bialer%20St,%20Rehovot&output=embed"
              className="w-full h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

