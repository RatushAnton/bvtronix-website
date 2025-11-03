// scripts/make-brand-assets.mjs
import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const SRC = "src/assets_src/BVT-logo.png"
const OUT = "public/brand"
await fs.mkdir(OUT, { recursive: true })

// 1) Load + trim any solid background automatically
let img = sharp(SRC).trim() // trims based on top-left pixel
const meta = await img.metadata()

// 2) Write full-color UI sizes (PNG + WebP)
const SIZES = [1024, 512, 256, 128, 64]
for (const size of SIZES) {
  await img
    .resize({ width: size, height: size, fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .png()
    .toFile(path.join(OUT, `logo-color-${size}.png`))

  await img
    .resize({ width: size, height: size, fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, `logo-color-${size}.webp`))
}

// 3) White silhouette (✅ FIX: use .raw() to get uncompressed channel bytes)
const { data: alphaRaw, info: alphaInfo } = await sharp(SRC)
  .ensureAlpha()
  .extractChannel("alpha")
  .raw()                                 // <-- IMPORTANT
  .toBuffer({ resolveWithObject: true }) // returns { data, info }

const whiteMask = await sharp({
  create: {
    width: alphaInfo.width,
    height: alphaInfo.height,
    channels: 4,
    background: "#ffffff"
  }
})
  .composite([
    {
      input: alphaRaw,
      raw: { width: alphaInfo.width, height: alphaInfo.height, channels: 1 },
      blend: "dest-in"
    }
  ])
  .png()
  .toBuffer()

for (const size of SIZES) {
  await sharp(whiteMask)
    .resize({ width: size, height: size, fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .png()
    .toFile(path.join(OUT, `logo-white-${size}.png`))

  await sharp(whiteMask)
    .resize({ width: size, height: size, fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, `logo-white-${size}.webp`))
}

// 4) Favicons (ICO + PNG 180 for iOS)
await sharp(path.join(OUT, "logo-color-256.png")).toFile(path.join(OUT, "favicon-256.png"))
await sharp(path.join(OUT, "logo-color-64.png")).toFile(path.join(OUT, "favicon-64.png"))
// apple-touch-icon (180x180)
try {
  await sharp(path.join(OUT, "logo-color-180.png")).toFile(path.join(OUT, "apple-touch-icon.png"))
} catch {
  await sharp(path.join(OUT, "logo-color-256.png"))
    .resize(180, 180)
    .toFile(path.join(OUT, "apple-touch-icon.png"))
}

// 5) Open Graph (1200×630)
const OG_W = 1200, OG_H = 630
const logo512 = await sharp(path.join(OUT, "logo-color-512.png")).toBuffer()
await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: "#ffffff" } })
  .composite([{ input: logo512, gravity: "center" }])
  .png()
  .toFile(path.join(OUT, "og-1200x630.png"))

console.log("✓ Brand assets written to", OUT)
