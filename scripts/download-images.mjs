// =============================================================================
// 3 Bricks — Download all Unsplash images locally
// Run from project root: node scripts/download-images.mjs
// =============================================================================

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// Unique photo IDs with their local filename and highest quality needed
const IMAGES = [
  // photo-id                          local filename                    width
  ['1618221195710-dd6b41faaea6', 'studio-interior.jpg',               1920],
  ['1616047006789-b7af5afb8c20', 'service-full-home.jpg',             1600],
  ['1600489000022-c2086d79f9d4', 'service-kitchen.jpg',               1600],
  ['1615874959474-d609969a20ed', 'service-bedroom.jpg',               1600],
  ['1497366811353-6870744d04b2', 'service-office.jpg',                1600],
  ['1583847268964-b28dc8f51f92', 'portfolio-1.jpg',                   1200],
  ['1622372738946-62e02505feb3', 'portfolio-2.jpg',                   1200],
  ['1631679706909-1844bbd07221', 'portfolio-3.jpg',                   1200],
  ['1586023492125-27b2c045efd7', 'portfolio-4.jpg',                   1200],
  ['1503594384566-461fe158e797', 'ba-before-1.jpg',                   1200],
  ['1616486338812-3dadae4b4ace', 'ba-after-1.jpg',                    1200],
  ['1556909114-f6e7ad7d3136',    'ba-before-2.jpg',                   1200],
  ['1617228069096-4638a7ffc906', 'ba-after-2.jpg',                    1200],
  ['1600585154340-be6161a56a0c', 'arch-hero.jpg',                     2000],
  ['1487958449943-2429e8be8625', 'arch-intro.jpg',                     900],
  ['1486325212027-8081e485255e', 'arch-commercial.jpg',               1200],
  ['1416879595882-3373a0480b5b', 'arch-garden.jpg',                   1200],
  ['1558618666-fcd25c85cd64',    'arch-terrace.jpg',                   1200],
  ['1600566753086-00f18fb6b3ea', 'arch-interior-arch.jpg',            1200],
  ['1501854140801-50d01698950b', 'arch-commercial-landscape.jpg',     1200],
  ['1497366216548-37526070297c', 'arch-government.jpg',                900],
]

const DIR = join(process.cwd(), 'public', 'images', 'interiors')
mkdirSync(DIR, { recursive: true })
console.log(`📁 Saving to: ${DIR}\n`)

let success = 0, failed = 0

for (const [id, filename, width] of IMAGES) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`
  const dest = join(DIR, filename)
  try {
    console.log(`⬇️  Downloading ${filename}...`)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(dest, buf)
    console.log(`✅  Saved ${filename} (${(buf.length / 1024).toFixed(0)} KB)`)
    success++
  } catch (err) {
    console.error(`❌  Failed ${filename}: ${err.message}`)
    failed++
  }
}

console.log(`\n✨ Done — ${success} downloaded, ${failed} failed`)
console.log(`\nNext step: run the find-and-replace in your code files as instructed.`)
