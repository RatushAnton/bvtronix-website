import { useEffect, useMemo, useState } from "react"

// 1) Auto-import every image in src/assets/projects (subfolders allowed)
const files = import.meta.glob("../assets/projects/**/*.{png,jpg,jpeg,webp,gif,svg}", { eager: true })

// 2) Build a list [{ src, title, category }]
function buildGallery() {
  return Object.entries(files).map(([path, mod]) => {
    const src = mod.default
    // Derive title from filename (e.g., "cutter-retrofit_2023.jpg" -> "Cutter Retrofit 2023")
    const filename = path.split("/").pop() || ""
    const raw = filename.replace(/\.[^.]+$/, "")
    const title = raw
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase())

    // Optional: treat top-level subfolder as a category (e.g., projects/retrofits/img.jpg -> "Retrofits")
    const parts = path.split("/")
    const maybeCatIndex = parts.findIndex((p) => p === "projects")
    const category = parts[maybeCatIndex + 1] && !/\./.test(parts[maybeCatIndex + 1])
      ? parts[maybeCatIndex + 1].replace(/[_-]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
      : "General"

    return { src, title, category }
  }).sort((a,b) => a.title.localeCompare(b.title))
}

export default function Projects() {
  const allItems = useMemo(buildGallery, [])
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allItems.map(i => i.category)))],
    [allItems]
  )
  const [activeCat, setActiveCat] = useState("All")
  const items = useMemo(
    () => (activeCat === "All" ? allItems : allItems.filter(i => i.category === activeCat)),
    [activeCat, allItems]
  )

  // Lightbox state
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    function onKey(e) {
      if (!open) return
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % items.length)
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, items.length])

  return (
    <section className="wrap py-14">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Projects</h1>
      <p className="text-center text-slate-600 mt-3">
        A selection of retrofits, upgrades, and custom mechanisms we’ve delivered.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-200
                        ${activeCat === cat
                          ? "bg-slate-800 text-white"
                          : "border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            onClick={() => { setIdx(i); setOpen(true); }}
            className="group relative overflow-hidden rounded-lg border bg-white text-left"
          >
            <img
              src={it.src}
              alt={it.title}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <div className="text-white text-sm font-medium">{it.title}</div>
              <div className="text-white/80 text-xs">{it.category}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox (no deps) */}
      {open && items.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[idx].src}
              alt={items[idx].title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-3 flex items-center justify-between text-white/90 text-sm">
              <div className="font-medium">{items[idx].title}</div>
              <div>{idx + 1} / {items.length}</div>
            </div>

            {/* Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={() => setIdx(i => (i - 1 + items.length) % items.length)}
                className="m-2 rounded-md bg-white/10 p-3 hover:bg-white/20 transition"
                aria-label="Previous"
              >‹</button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={() => setIdx(i => (i + 1) % items.length)}
                className="m-2 rounded-md bg-white/10 p-3 hover:bg-white/20 transition"
                aria-label="Next"
              >›</button>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 rounded-full bg-white text-slate-900 w-8 h-8 shadow"
              aria-label="Close"
            >✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
