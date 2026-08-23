'use client'

// =============================================================================
// Blog post page — dynamic route rendered from BLOG_POSTS in content.js.
// Includes: featured image, TOC sidebar (desktop), sticky lead form sidebar,
// share buttons, related posts, end-of-article CTA.
// =============================================================================

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { Copy, Facebook, MessageCircle, ArrowRight } from 'lucide-react'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'
import { BLOG_POSTS } from '@/lib/content'
import { useQuiz } from '@/components/QuizProvider'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  const { openQuiz } = useQuiz()
  const [copied, setCopied] = useState(false)

  if (!post) return notFound()

  const toc = useMemo(() => post.sections.filter(s => s.type === 'h2').map((s, i) => ({ id: `h-${i}`, text: s.text })), [post])
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  const share = (net) => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    const text = encodeURIComponent(post.title + ' — ' + url)
    if (net === 'wa') window.open(`https://wa.me/?text=${text}`, '_blank')
    if (net === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    if (net === 'copy') { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  }

  let h2Idx = -1

  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-24">
        <article className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-[#F47B20] my-6">{post.category}</div>
            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-6xl leading-tight">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-black/50">
              <div>By 3 Bricks Design Team</div><span>·</span>
              <div>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div><span>·</span>
              <div>{post.readTime} min read</div>
            </div>
          </div>

          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-lg">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10">
            {/* Left rail: TOC + share */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                {toc.length > 0 && (
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-3">In this article</div>
                    <ul className="space-y-2 text-sm">
                      {toc.map(t => (<li key={t.id}><a href={`#${t.id}`} className="text-black/70 hover:text-[#F47B20]">{t.text}</a></li>))}
                    </ul>
                  </div>
                )}
                <div>
                  <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-3">Share</div>
                  <div className="flex gap-2">
                    <button onClick={() => share('wa')} aria-label="WhatsApp" className="h-9 w-9 rounded-full border border-black/10 hover:border-[#25D366] hover:text-[#25D366] flex items-center justify-center"><MessageCircle className="h-4 w-4" /></button>
                    <button onClick={() => share('fb')} aria-label="Facebook" className="h-9 w-9 rounded-full border border-black/10 hover:border-[#1877F2] hover:text-[#1877F2] flex items-center justify-center"><Facebook className="h-4 w-4" /></button>
                    <button onClick={() => share('copy')} aria-label="Copy Link" className="h-9 w-9 rounded-full border border-black/10 hover:border-[#F47B20] hover:text-[#F47B20] flex items-center justify-center"><Copy className="h-4 w-4" /></button>
                  </div>
                  {copied && <div className="text-xs text-green-600 mt-2">Link copied!</div>}
                </div>
              </div>
            </aside>

            {/* Main body */}
            <div className="lg:col-span-6 max-w-none">
              {post.sections.map((s, i) => {
                if (s.type === 'h2') { h2Idx++; return <h2 key={i} id={`h-${h2Idx}`} className="font-serif-display text-2xl md:text-3xl mt-10 mb-4">{s.text}</h2> }
                if (s.type === 'h3') return <h3 key={i} className="font-serif-display text-xl md:text-2xl mt-6 mb-3">{s.text}</h3>
                if (s.type === 'p') return <p key={i} className="text-black/80 leading-relaxed text-base md:text-lg mb-4">{s.text}</p>
                if (s.type === 'img') return (
                  <figure key={i} className="my-8">
                    <img src={s.src} alt={s.caption || ''} className="w-full rounded-lg" />
                    {s.caption && <figcaption className="text-sm text-black/50 mt-2">{s.caption}</figcaption>}
                  </figure>
                )
                if (s.type === 'cta') return (
                  <div key={i} className="my-8 rounded-2xl bg-[#FDECE0] p-6 md:p-8 text-center">
                    <div className="font-serif-display text-2xl md:text-3xl mb-3">Planning your Pune home interiors?</div>
                    <button onClick={() => openQuiz(`blog_cta_${post.slug}`)} className="bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-6 py-3 text-sm font-medium min-h-[44px]">{s.label || 'Get a free estimate →'}</button>
                  </div>
                )
                return null
              })}

              {/* Mobile CTA — always visible after content */}
              <div className="my-10 lg:hidden rounded-2xl bg-white border border-black/5 p-6">
                <div className="font-serif-display text-xl">Planning your Pune home?</div>
                <div className="text-sm text-black/60 mt-1">Get a free estimate in 2 minutes.</div>
                <button onClick={() => openQuiz(`blog_sidebar_form_${post.slug}`)} className="mt-4 w-full bg-[#F47B20] text-white rounded-full py-3 text-sm font-medium min-h-[44px]">Get Free Estimate →</button>
              </div>
            </div>

            {/* Right rail: sticky lead form */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 rounded-2xl bg-white border border-black/5 p-6 shadow-lg">
                <div className="font-serif-display text-2xl leading-tight">Planning your Pune home?</div>
                <div className="text-sm text-black/60 mt-1 mb-4">Get a free estimate in 2 minutes.</div>
                <button onClick={() => openQuiz(`blog_sidebar_form_${post.slug}`)} className="w-full bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full py-3 text-sm font-medium min-h-[44px]">Get Free Estimate →</button>
                <div className="text-[11px] text-black/40 mt-3 text-center">No spam. Personal attention.</div>
              </div>
            </aside>
          </div>

          {/* Related posts */}
          <section className="mt-20">
            <h2 className="font-serif-display text-3xl md:text-4xl mb-8">Related <span className="italic text-[#F47B20]">Reads</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-lg overflow-hidden border border-black/5 hover:shadow-xl transition">
                  <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                  <div className="p-5">
                    <div className="text-xs tracking-wider uppercase text-[#F47B20]">{p.category}</div>
                    <div className="font-serif-display text-xl mt-2 line-clamp-2">{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}
