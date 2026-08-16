// =============================================================================
// Design Ideas hub page — grid of 14 category cards
// =============================================================================

import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { DESIGN_CATEGORIES } from '@/lib/content'

export const metadata = {
  title: 'Design Ideas & Inspiration for Pune Homes | 3 Bricks',
  description: 'Browse hundreds of interior design ideas across kitchens, wardrobes, bedrooms, living rooms and more — curated for Pune homeowners.',
}

export default function DesignIdeasHub() {
  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-28 md:pt-32">
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-14">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Inspiration</div>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl">Get Inspired. <span className="italic text-[#F47B20]">Design Your Dream Home.</span></h1>
          <p className="mt-4 text-black/60 max-w-2xl text-lg">Explore hand-picked ideas across every room in the home — all suited to Pune apartments and villas.</p>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {DESIGN_CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/design-ideas/${c.slug}`} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-800" data-cursor="image" data-cursor-label={c.short}>
                {/* Replace with actual 3 Bricks project photos */}
                <img src={c.hero} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-serif-display text-xl md:text-2xl text-white leading-tight">{c.name}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-[#F47B20] opacity-0 group-hover:opacity-100 transition">Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}
