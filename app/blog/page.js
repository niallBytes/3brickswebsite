'use client'

// =============================================================================
// Blog hub page — filter tabs + card grid
// =============================================================================

import { useState } from 'react'
import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/content'

export default function BlogHub() {
  const [active, setActive] = useState('All')
  const posts = active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === active)
  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-28 md:pt-32">
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-10">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— The Journal</div>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl">Design Ideas &amp; <span className="italic text-[#F47B20]">Expert Advice</span> for Pune Homeowners</h1>
        </section>

        {/* Filter tabs */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-10">
          <div className="flex gap-2 flex-wrap">
            {BLOG_CATEGORIES.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 rounded-full border text-sm transition min-h-[40px] ${active === c ? 'bg-[#1E1E1E] text-white border-[#1E1E1E]' : 'border-black/15 hover:border-[#F47B20]'}`}>{c}</button>
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-lg overflow-hidden border border-black/5 hover:shadow-xl transition" data-cursor="link">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="text-xs tracking-wider uppercase text-[#F47B20]">{p.category}</div>
                  <div className="font-serif-display text-xl md:text-2xl mt-2 leading-tight">{p.title}</div>
                  <div className="text-sm text-black/60 mt-2 line-clamp-2">{p.excerpt}</div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-black/40">
                    <span>{new Date(p.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{p.readTime} min read</span>
                  </div>
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
