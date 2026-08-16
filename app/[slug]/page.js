'use client'

// =============================================================================
// Area landing page — dynamic top-level route.
// Handles URLs like /interior-designer-baner-pune by looking up the area slug
// in AREA_PAGES from content.js. Any other unknown slug returns 404.
// =============================================================================

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'
import { AREA_PAGES, unsplash, PRICING } from '@/lib/content'
import { useQuiz } from '@/components/QuizProvider'
import { Check, ArrowRight, Star } from 'lucide-react'

// Return the matching area or null. Slugs are shaped:
//   interior-designer-<area>-pune
function matchAreaSlug(slug) {
  if (!slug || !slug.startsWith('interior-designer-') || !slug.endsWith('-pune')) return null
  const middle = slug.slice('interior-designer-'.length, slug.length - '-pune'.length)
  return AREA_PAGES.find(a => a.slug === middle) || null
}

export default function AreaPage() {
  const { slug } = useParams()
  const area = matchAreaSlug(slug)
  const { openQuiz } = useQuiz()
  if (!area) return notFound()

  const others = AREA_PAGES.filter(a => a.slug !== area.slug).slice(0, 6)
  const portfolio = ['1618221195710-dd6b41faaea6', '1583847268964-b28dc8f51f92', '1616047006789-b7af5afb8c20', '1631679706909-1844bbd07221', '1586023492125-27b2c045efd7', '1615874959474-d609969a20ed']

  const faqs = [
    { q: `How much does interior design cost in ${area.name}?`, a: `Interior design in ${area.name} typically ranges from ₹4.5L for a Studio/1BHK Essential package to ₹18L+ for a 3BHK Premium package, depending on scope and finishes.` },
    { q: `Which builders in ${area.name} do you work with?`, a: `We are familiar with ${area.builders.slice(0, 3).join(', ')} and other major builders in the area.` },
    { q: `How long does a project take in ${area.name}?`, a: `Most 2BHK projects wrap in 45–65 days from design sign-off. 3BHK projects take 60–85 days.` },
    { q: `Do you handle end-to-end execution?`, a: `Yes. From 3D design to procurement, vendor coordination, site supervision and final handover — all under one roof.` },
    { q: `Can I see recent ${area.name} projects?`, a: `Absolutely. Book a free site visit and we’ll walk you through recent projects nearby.` },
  ]

  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-24">
        {/* Sticky top form band */}
        <div className="sticky top-20 z-30 bg-[#1E1E1E] text-cream border-y border-cream/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
            <div className="text-sm text-cream/80 truncate">Interior design in {area.name} — free consultation available this week</div>
            <button onClick={() => openQuiz(`area_page_form_${area.slug}`)} className="bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-5 py-2 text-sm font-medium min-h-[40px] whitespace-nowrap">Book Now <ArrowRight className="inline h-4 w-4 ml-1" /></button>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Local Design Studio</div>
              <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.05]">Interior Designer in <span className="italic text-[#F47B20]">{area.name}</span>, Pune</h1>
              <p className="mt-5 text-black/70 text-lg leading-relaxed max-w-lg">{area.hook}</p>
              <button onClick={() => openQuiz(`area_hero_${area.slug}`)} className="mt-8 bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-8 py-4 text-sm font-medium min-h-[48px]">Get Free Estimate <ArrowRight className="inline h-4 w-4 ml-2" /></button>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src={unsplash(portfolio[0], 1400)} alt={`Interior design in ${area.name}`} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Why area residents choose us */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Why <span className="italic text-[#F47B20]">{area.name}</span> homeowners choose 3 Bricks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {area.points.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-black/5 rounded-lg p-5">
                <div className="h-8 w-8 rounded-full bg-[#F47B20]/10 flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-[#F47B20]" /></div>
                <div className="text-black/80">{p}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-black/60">
            <span className="font-medium text-black/80">Major builders we work with in {area.name}:</span> {area.builders.join(' · ')}
          </div>
        </section>

        {/* Portfolio */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Recent <span className="italic text-[#F47B20]">{area.name}</span> Projects</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {portfolio.map((id, i) => (
              <div key={i} className="relative aspect-[4/5] rounded-lg overflow-hidden group" data-cursor="image">
                <img src={unsplash(id, 800)} alt={`${area.name} project ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent text-white text-sm">{area.name} · Project {i+1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing snapshot */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Pricing in <span className="italic text-[#F47B20]">{area.name}</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map(t => (
              <div key={t.key} className={`rounded-lg p-6 border ${t.featured ? 'border-[#F47B20] bg-cream' : 'border-black/10 bg-white'}`}>
                <div className="text-xs tracking-[0.3em] uppercase text-black/50">{t.label}</div>
                <div className="font-serif-display text-3xl mt-2">{t.name}</div>
                <div className="mt-4 flex items-baseline gap-2"><span className="font-serif-display text-3xl text-[#F47B20]">{t.price}</span><span className="text-sm text-black/50">{t.note}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-cream border-y border-black/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 text-center">
            <div className="flex justify-center gap-1 mb-4">{[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-[#F47B20] text-[#F47B20]" />)}</div>
            <p className="font-serif-display italic text-2xl md:text-3xl max-w-3xl mx-auto text-black/80">“3 Bricks delivered our {area.name} apartment on time, with weekly updates and a designer who actually listened. Rare in Pune.”</p>
            <div className="mt-4 text-sm text-black/60">A 3 Bricks client — {area.name}</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[900px] mx-auto px-6 md:px-10 py-14">
          <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Frequently Asked <span className="italic text-[#F47B20]">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white border border-black/5 rounded-lg px-5 py-4 group">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium"><span>{f.q}</span><span className="text-[#F47B20] text-2xl group-open:rotate-45 transition">+</span></summary>
                <div className="mt-3 text-black/70 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Full CTA */}
        <section className="bg-[#F47B20] text-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif-display text-3xl md:text-5xl leading-tight">Just got possession in {area.name}?</h3>
              <p className="text-white/85 mt-2">Let’s make it yours — book your free site visit.</p>
            </div>
            <LeadForm source={`area_page_form_${area.slug}`} submitLabel="Book Free Consultation →" compact />
          </div>
        </section>

        {/* Also serving nearby */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <h2 className="font-serif-display text-3xl md:text-4xl mb-8">Also serving <span className="italic text-[#F47B20]">nearby areas</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {others.map(a => (
              <Link key={a.slug} href={`/interior-designer-${a.slug}-pune`} className="px-4 py-3 rounded-full border border-black/15 hover:border-[#F47B20] hover:text-[#F47B20] text-sm text-center">{a.name}</Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}
