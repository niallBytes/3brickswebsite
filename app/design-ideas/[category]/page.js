'use client'

// =============================================================================
// Design Ideas category page — dynamic route based on slug.
// Renders: hero, sticky "Get Free Estimate" CTA, 16-image masonry grid,
// inline lead form every 8 images, related categories, related blog posts.
// =============================================================================

import { useState } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'
import { DESIGN_CATEGORIES, unsplash, BLOG_POSTS } from '@/lib/content'
import { useQuiz } from '@/components/QuizProvider'

export default function CategoryPage() {
  const { category } = useParams()
  const cat = DESIGN_CATEGORIES.find(c => c.slug === category)
  const [lightbox, setLightbox] = useState(null)
  const { openQuiz } = useQuiz()

  if (!cat) return notFound()

  const related = DESIGN_CATEGORIES.filter(c => c.slug !== cat.slug).slice(0, 4)
  const relatedPosts = BLOG_POSTS.slice(0, 3)

  // Chunk images into groups of 8 with CTA strips in between
  const chunks = []
  for (let i = 0; i < cat.imgs.length; i += 8) chunks.push(cat.imgs.slice(i, i + 8))

  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-24">
        {/* Sticky Get Free Estimate bar */}
        <div className="sticky top-20 z-30 bg-[#1E1E1E] text-cream backdrop-blur border-y border-cream/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
            <div className="text-sm text-cream/80 truncate">Love these {cat.short.toLowerCase()}? Get one for your Pune home.</div>
            <button onClick={() => openQuiz(`design_ideas_${cat.slug}`)} className="bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-5 py-2 text-sm font-medium min-h-[40px] whitespace-nowrap">
              Get Free Estimate <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— {cat.short}</div>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl">{cat.name} for <span className="italic text-[#F47B20]">Pune Homes</span></h1>
          <p className="mt-5 text-black/70 max-w-3xl text-lg leading-relaxed">{cat.intro}</p>
        </section>

        {/* Masonry grid + CTA strips */}
        {chunks.map((chunk, ci) => (
          <div key={ci}>
            <section className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 [column-fill:_balance]">
                {chunk.map((id, i) => (
                  <button key={ci + '-' + i} onClick={() => setLightbox(unsplash(id, 1800))} className="group relative break-inside-avoid mb-4 md:mb-6 w-full block rounded-lg overflow-hidden bg-neutral-800" data-cursor="image" data-cursor-label="View">
                    {/* Replace with actual You First project photos */}
                    <img src={unsplash(id, 800)} alt={cat.short} loading="lazy" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-4">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1">Get Inspired <ArrowRight className="h-3.5 w-3.5" /></span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* CTA strip between chunks */}
            <section className="my-14 md:my-20 bg-[#F47B20] text-white">
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-10 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="font-serif-display text-2xl md:text-3xl leading-tight">Love this style? Get it for your home in Pune.</div>
                  <div className="text-white/80 text-sm mt-1">Free consultation. Honest quote. On-time delivery.</div>
                </div>
                <LeadForm source={`design_ideas_form_${cat.slug}`} submitLabel="Get Free Estimate →" compact />
              </div>
            </section>
          </div>
        ))}

        {/* Related Categories */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <h2 className="font-serif-display text-3xl md:text-4xl mb-8">Related <span className="italic text-[#F47B20]">Categories</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(r => (
              <Link key={r.slug} href={`/design-ideas/${r.slug}`} className="group relative aspect-[3/4] rounded-lg overflow-hidden" data-cursor="image" data-cursor-label={r.short}>
                <img src={r.hero} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 font-serif-display text-lg text-white">{r.short}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related blog posts */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <h2 className="font-serif-display text-3xl md:text-4xl mb-8">Explore <span className="italic text-[#F47B20]">More</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-lg overflow-hidden border border-black/5 hover:shadow-xl transition" data-cursor="link">
                <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                <div className="p-5">
                  <div className="text-xs tracking-wider uppercase text-[#F47B20]">{p.category}</div>
                  <div className="font-serif-display text-xl mt-2">{p.title}</div>
                  <div className="text-sm text-black/60 mt-2">{p.readTime} min read</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[9990] bg-black/90 flex items-center justify-center p-4" style={{ cursor: 'auto' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><X className="h-5 w-5" /></button>
            <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteChrome>
  )
}
