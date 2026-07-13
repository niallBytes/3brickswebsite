'use client'

// =============================================================================
// SiteNav — shared navbar with mega menu (Design Ideas), Areas dropdown,
// mobile accordion hamburger. Used on every page.
// =============================================================================

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { DESIGN_CATEGORIES, AREA_PAGES } from '@/lib/content'
import { useQuiz } from './QuizProvider'

export default function SiteNav({ variant = 'transparent-on-top' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ideasOpen, setIdeasOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)
  const [mIdeas, setMIdeas] = useState(false)
  const [mAreas, setMAreas] = useState(false)
  const { openQuiz } = useQuiz()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])

  const isTransparent = variant === 'transparent-on-top' && !scrolled
  const textCls = isTransparent ? 'text-cream' : 'text-[#1E1E1E]'
  const bgCls = isTransparent ? 'bg-transparent' : 'bg-cream/85 backdrop-blur-md border-b border-black/5'

  const half = Math.ceil(DESIGN_CATEGORIES.length / 2)
  const col1 = DESIGN_CATEGORIES.slice(0, half)
  const col2 = DESIGN_CATEGORIES.slice(half)

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${bgCls}`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-20">
          <Link href="/" data-cursor="link" className={`font-serif-display text-2xl md:text-3xl ${textCls}`}>
            <span>YOU</span><span className="text-[#F47B20] italic">FIRST</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {/* Design Ideas mega dropdown */}
            <div className="relative" onMouseEnter={() => setIdeasOpen(true)} onMouseLeave={() => setIdeasOpen(false)}>
              <button className={`flex items-center gap-1 text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Design Ideas <ChevronDown className="h-4 w-4" /></button>
              <AnimatePresence>
                {ideasOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-white text-[#1E1E1E] rounded-lg shadow-2xl border border-black/5 p-6 grid grid-cols-2 gap-x-8 gap-y-1">
                    {[col1, col2].map((col, ci) => (
                      <div key={ci} className="space-y-1">
                        {col.map(c => (
                          <Link key={c.slug} href={`/design-ideas/${c.slug}`} className="block px-3 py-2 rounded hover:bg-[#F47B20]/10 hover:text-[#F47B20] text-sm" data-cursor="link">{c.name}</Link>
                        ))}
                      </div>
                    ))}
                    <Link href="/design-ideas" className="col-span-2 border-t border-black/5 pt-3 mt-2 text-sm text-[#F47B20] hover:underline">View all design ideas →</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className={`text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Blog</Link>
            <Link href="/#portfolio" className={`text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Portfolio</Link>
            <Link href="/#pricing" className={`text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Pricing</Link>

            {/* Areas dropdown */}
            <div className="relative" onMouseEnter={() => setAreasOpen(true)} onMouseLeave={() => setAreasOpen(false)}>
              <button className={`flex items-center gap-1 text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Areas We Serve <ChevronDown className="h-4 w-4" /></button>
              <AnimatePresence>
                {areasOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-[280px] bg-white text-[#1E1E1E] rounded-lg shadow-2xl border border-black/5 p-4">
                    {AREA_PAGES.map(a => (
                      <Link key={a.slug} href={`/interior-designer-${a.slug}-pune`} className="block px-3 py-2 rounded hover:bg-[#F47B20]/10 hover:text-[#F47B20] text-sm" data-cursor="link">Interior Designer in {a.name}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/#contact" className={`text-sm hover:text-[#F47B20] ${textCls}`} data-cursor="link">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openQuiz('nav_cta')}
              className="hidden md:inline-flex bg-[#F47B20] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#D9631A] items-center min-h-[44px]"
              data-cursor="link"
            >
              Get Free Estimate <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button onClick={() => setOpen(true)} className="lg:hidden" data-cursor="link" aria-label="Menu">
              <Menu className={`h-7 w-7 ${textCls}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-[#1E1E1E] text-cream flex flex-col" style={{ cursor: 'auto' }}
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            <div className="flex justify-between items-center px-6 h-20">
              <div className="font-serif-display text-2xl"><span>YOU</span><span className="text-[#F47B20] italic">FIRST</span></div>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-8 w-8" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              <div className="space-y-1 pt-4">
                {/* Design Ideas accordion */}
                <button onClick={() => setMIdeas(!mIdeas)} className="w-full flex items-center justify-between py-4 border-b border-cream/10">
                  <span className="font-serif-display text-3xl italic">Design Ideas</span>
                  <ChevronDown className={`h-6 w-6 transition-transform ${mIdeas ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mIdeas && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="py-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        {DESIGN_CATEGORIES.map(c => (
                          <Link key={c.slug} href={`/design-ideas/${c.slug}`} onClick={() => setOpen(false)} className="text-sm text-cream/80 hover:text-[#F47B20] py-1">{c.short}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/blog" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Blog</Link>
                <Link href="/#portfolio" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Portfolio</Link>
                <Link href="/#pricing" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Pricing</Link>

                {/* Areas accordion */}
                <button onClick={() => setMAreas(!mAreas)} className="w-full flex items-center justify-between py-4 border-b border-cream/10">
                  <span className="font-serif-display text-3xl italic">Areas We Serve</span>
                  <ChevronDown className={`h-6 w-6 transition-transform ${mAreas ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mAreas && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="py-3 space-y-2">
                        {AREA_PAGES.map(a => (
                          <Link key={a.slug} href={`/interior-designer-${a.slug}-pune`} onClick={() => setOpen(false)} className="block text-sm text-cream/80 hover:text-[#F47B20] py-1">Interior Designer in {a.name}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/free-guide" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Free Guide</Link>
                <Link href="/refer-a-friend" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Refer a Friend</Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="block py-4 border-b border-cream/10 font-serif-display text-3xl italic">Contact</Link>
              </div>
              <button onClick={() => { setOpen(false); openQuiz('mobile_menu') }} className="mt-8 w-full bg-[#F47B20] rounded-full py-4 text-white text-sm font-medium min-h-[48px]">Get Free Estimate →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
