'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ArrowLeft, Check, Instagram, Facebook, Youtube,
  Phone, Mail, MapPin, Star, Menu, X, MessageCircle, Move, Sparkles
} from 'lucide-react'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'
import { useQuiz } from '@/components/QuizProvider'
import { AREA_PAGES } from '@/lib/content'
import Image from 'next/image'

// Slug map \u2014 area display name \u2192 URL slug. Only include areas with pages.
const AREA_SLUG_MAP = AREA_PAGES.reduce((acc, a) => { acc[a.name] = a.slug; return acc }, {})

const IMG = {
  studio:    '/images/interiors/studio-interior.jpg',
  service1:  '/images/interiors/service-full-home.jpg',
  service2:  '/images/interiors/service-kitchen.jpg',
  service3:  '/images/interiors/service-bedroom.jpg',
  service4:  '/images/interiors/service-office.jpg',
  p1:        '/images/interiors/portfolio-1.jpg',
  p2:        '/images/interiors/portfolio-2.jpg',
  p3:        '/images/interiors/portfolio-3.jpg',
  p4:        '/images/interiors/portfolio-4.1.jpg',
  p5:        '/images/interiors/portfolio-5.jpg',
  p6:        '/images/interiors/govoffice.jpg',
  ba1before: '/images/interiors/ba-before-1.jpg',
  ba1after:  '/images/interiors/ba-after-1.jpg',
  ba2before: '/images/interiors/ba-before-2.jpg',
  ba2after:  '/images/interiors/ba-after-2.jpg',
}

const HERO_VIDEO = 'https://assets.mixkit.co/videos/4148/4148-720.mp4'

/* Word-by-word reveal */
function SplitReveal({ children, className = '', stagger = 0.05, delay = 0 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const words = String(children).split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-line mr-[0.22em]">
          <motion.span initial={{ y: '110%' }} animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}>{w}</motion.span>
        </span>
      ))}
    </span>
  )
}

/* Magnetic Button */
function MagneticButton({ children, className = '', onClick, href }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  const Comp = href ? 'a' : 'button'
  return <Comp ref={ref} onClick={onClick} href={href} data-cursor="link"
    className={`inline-flex items-center justify-center transition-transform duration-200 ${className}`}>{children}</Comp>
}

/* Navbar */
function Navbar({ onCta }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['Services', '#services'], ['Portfolio', '#portfolio'], ['Process', '#process'], ['Pricing', '#pricing'], ['Contact', '#contact']]
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/85 backdrop-blur-md border-b border-black/5' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-20">
          <a href="#top" data-cursor="link">
            <div className={`font-serif-display text-2xl md:text-3xl ${scrolled ? 'text-[#1E1E1E]' : 'text-cream'}`}>
              <span>3</span><span className="text-[#F47B20] italic">Bricks</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map(([l, h]) => (
              <a key={l} href={h} data-cursor="link" className={`text-sm tracking-wide hover:text-[#F47B20] transition-colors ${scrolled ? 'text-[#1E1E1E]' : 'text-cream'}`}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <MagneticButton onClick={onCta} className="hidden md:inline-flex bg-[#F47B20] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#D9631A]">
              Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
            <button onClick={() => setOpen(true)} className="md:hidden" data-cursor="link">
              <Menu className={`h-7 w-7 ${scrolled ? 'text-[#1E1E1E]' : 'text-cream'}`} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-[#1E1E1E] text-cream flex flex-col"
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <div className="flex justify-between items-center px-6 h-20">
              <div className="font-serif-display text-2xl"><span>3</span><span className="text-[#F47B20] italic">Bricks</span></div>
              <button onClick={() => setOpen(false)}><X className="h-8 w-8" /></button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6 px-8">
              {links.map(([l, h], i) => (
                <motion.a key={l} href={h} onClick={() => setOpen(false)}
                  initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                  className="font-serif-display text-5xl italic hover:text-[#F47B20]">{l}</motion.a>
              ))}
              <button onClick={() => { setOpen(false); onCta?.() }} className="mt-8 self-start bg-[#F47B20] rounded-full px-6 py-3 text-white text-sm">Book Free Consultation →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* Hero */
function Hero() {
  const router = useRouter()
  return (
    <section id="top" data-cursor-theme="dark" className="relative h-[100svh] w-full overflow-hidden bg-[#1E1E1E] text-cream">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline
        poster="/images/interiors/studio-interior.jpg">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-cream/80 mb-6">Interior Design Studio · Pune</motion.div>
        <h1 className="font-serif-display text-[16vw] md:text-[7.5vw] leading-[0.95] max-w-6xl px-4">
          <div><SplitReveal>Spaces That</SplitReveal></div>
          <div className="italic text-[#F47B20]"><SplitReveal delay={0.3}>Tell Your Story</SplitReveal></div>
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 max-w-xl text-base md:text-lg text-cream/85">
          Boutique interior design for Pune's new homeowners. Personal. Precise. On time.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }}>
          <MagneticButton onClick={() => router.push('/design-ideas')} className="mt-10 bg-[#F47B20] text-white rounded-full px-8 py-4 min-h-[48px] text-sm md:text-base tracking-wide hover:bg-[#D9631A] w-[85vw] max-w-xs md:w-auto">
            Explore Our Work <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

/* Fixed Scroll Indicator (bottom-left, permanent while at top) */
function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const on = () => {
      const near = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200
      setHidden(near)
    }
    window.addEventListener('scroll', on, { passive: true }); on()
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className={`fixed left-4 md:left-8 bottom-6 md:bottom-10 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-none transition-opacity duration-500 ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-[10px] tracking-[0.35em] uppercase text-white mix-blend-difference" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</div>
      <div className="w-[1px] h-16 relative overflow-hidden bg-white/25 mix-blend-difference">
        <motion.div className="absolute inset-x-[-1px] top-0 h-3 bg-[#F47B20]" animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
    </div>
  )
}

/* Marquee — replaced with a clean static single-line info ticker (no animation). */
function Marquee() {
  return (
    <div data-cursor-theme="dark" className="bg-[#1E1E1E] text-cream/85 py-4 px-6">
      <div className="max-w-[1400px] mx-auto text-center truncate" style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Interior Design · Pune · Residential · Commercial · Government Projects · Baner · Wakad · Kharadi · Hinjewadi
      </div>
    </div>
  )
}

/* Studio */
function StudioStatement() {
  const imgRef = useRef(null)
  const router = useRouter()
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 })
    if (imgRef.current) io.observe(imgRef.current)
    return () => io.disconnect()
  }, [])
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5" ref={imgRef}>
          <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => router.push('/design-ideas')}>
            <motion.img src={IMG.studio} alt="Interior" className="absolute inset-0 w-full h-full object-cover"
              initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              data-cursor="image" data-cursor-label="View" />
          </div>
        </div>
        <div className="md:col-span-7 md:pt-10">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6">— The Studio</div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-balance">
            <SplitReveal>A boutique studio that</SplitReveal><br />
            <span className="italic text-[#F47B20]"><SplitReveal delay={0.15}>puts you first — always.</SplitReveal></span>
          </h2>
          <p className="mt-8 max-w-xl text-black/70 text-lg leading-relaxed">
            We are not a catalogue. We are a team of designers who listen before we design. No rotating staff. No surprise bills. No missed deadlines. Just beautiful homes, delivered the way they were promised.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[['150+','Projects'],['8+','Years'],['98%','On-Time']].map(([n,l]) => (
              <div key={l}>
                <div className="font-serif-display text-3xl md:text-4xl text-[#F47B20]">{n}</div>
                <div className="text-xs text-black/60 mt-1 tracking-wide">{l}</div>
              </div>
            ))}
          </div>
          <a href="/about" data-cursor="link" className="mt-10 inline-flex items-center gap-2 text-sm border-b border-black/30 pb-1 hover:text-[#F47B20] hover:border-[#F47B20] transition-colors">
            Our Story <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* Services Sticky */
const SERVICES = [
  { n: '01', name: 'Full Home Interiors', desc: 'Complete end-to-end transformation. From bare walls to a home that feels like you.', img: IMG.service1 },
  { n: '02', name: 'Modular Kitchen', desc: 'Kitchens built around how you cook — not how they look in a showroom.', img: IMG.service2 },
  { n: '03', name: 'Bedroom & Living Room', desc: 'Spaces that feel like rest. Spaces that feel like life.', img: IMG.service3 },
  { n: '04', name: 'Office & Commercial', desc: 'We also handle government tenders and corporate office renovations across Pune.', img: IMG.service4 },
]
// Services list rendered inside sticky pin + mobile stack
// Both hover states use "View" cursor label; clicking navigates to /design-ideas.
function ServicesSticky() {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])
  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / total))
      const idx = Math.min(SERVICES.length - 1, Math.floor(progress * SERVICES.length))
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  // Mobile: stacked services \u2014 each image is a link.
  if (isMobile) {
    return (
      <section id="services" className="bg-cream py-20 px-6">
        <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— What we do</div>
        <h2 className="font-serif-display text-4xl mb-10">Our <span className="italic text-[#F47B20]">Services</span></h2>
        <div className="space-y-10">
          {SERVICES.map((s) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}>
              <div onClick={() => router.push('/design-ideas')} className="relative w-full aspect-[4/3] overflow-hidden rounded-md mb-5 cursor-pointer" data-cursor="image" data-cursor-label="View">
                <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="font-serif-display text-[#F47B20] italic text-4xl">{s.n}</div>
              <h3 className="font-serif-display text-3xl mt-2">{s.name}</h3>
              <p className="text-black/70 mt-3">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="services" ref={wrapRef} className="relative" style={{ height: `${SERVICES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full bg-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full grid md:grid-cols-2 gap-8 px-6 md:px-10 items-center">
          <div className="relative z-10">
            <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6">— What we do</div>
            <div className="relative h-[280px] md:h-[380px]">
              {SERVICES.map((s, i) => (
                <motion.div key={s.n} className="absolute inset-0" initial={false}
                  animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 30 }} transition={{ duration: 0.6 }}>
                  <div className="font-serif-display text-[#F47B20] italic text-6xl md:text-7xl">{s.n}</div>
                  <h3 className="font-serif-display text-4xl md:text-6xl mt-4 leading-tight">{s.name}</h3>
                  <p className="text-black/70 mt-6 max-w-md text-lg">{s.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              {SERVICES.map((_, i) => (
                <div key={i} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-12 bg-[#F47B20]' : 'w-6 bg-black/20'}`} />
              ))}
            </div>
          </div>
          <div onClick={() => router.push('/design-ideas')} className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-md cursor-pointer" data-cursor="image" data-cursor-label="View">
            {SERVICES.map((s, i) => (
              <motion.img key={s.n} src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover"
                initial={false} animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.1 }} transition={{ duration: 0.9 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Stats */
function useCountUp(target, inView, duration = 1800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step); else setV(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return v
}
function StatItem({ value, suffix, label, inView }) {
  const v = useCountUp(value, inView)
  return (
    <div>
      <div className="font-serif-display text-[#F47B20] text-6xl md:text-7xl leading-none">{v}{suffix}</div>
      <div className="text-cream/70 mt-3 text-sm tracking-wide">{label}</div>
    </div>
  )
}
function StatsBand() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="bg-[#1E1E1E] text-cream py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <StatItem value={150} suffix="+" label="Happy Homeowners" inView={inView} />
        <StatItem value={8} suffix="+" label="Years in Pune" inView={inView} />
        <StatItem value={15} suffix="+" label="Government Projects" inView={inView} />
        <StatItem value={98} suffix="%" label="On-Time Delivery" inView={inView} />
      </div>
    </section>
  )
}

/* Portfolio */
const PROJECTS = [
  { title: '3BHK Contemporary Home', area: 'Baner', budget: '₹24L', type: 'Full Home', img: IMG.p1 },
  { title: 'Modular Kitchen', area: 'Wakad', budget: '₹6.5L', type: 'Kitchen', img: IMG.p2 },
  { title: 'Japandi Living Room', area: 'Kharadi', budget: '₹8L', type: 'Living', img: IMG.p3 },
  { title: 'Master Bedroom Suite', area: 'Hinjewadi', budget: '₹7L', type: 'Bedroom', img: IMG.p4 },
  { title: 'Corporate Office', area: 'Viman Nagar', budget: '₹18L', type: 'Commercial', img: IMG.p5 },
  { title: 'Government Office Renovation', area: 'Pune', budget: '₹35L', type: 'Government', img: IMG.p6 },
]
function TiltCard({ project }) {
  const ref = useRef(null)
  const router = useRouter()
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)' }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} onClick={() => router.push('/design-ideas')}
      className="tilt-card group relative flex-shrink-0 w-[70vw] md:w-[36vw] h-[68vh] rounded-md overflow-hidden bg-neutral-800 cursor-pointer"
      data-cursor="image" data-cursor-label="View">
      <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute top-4 left-4 z-10 bg-cream/90 text-[#1E1E1E] rounded-full px-3 py-1 text-xs tracking-wide">{project.type}</div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
        <h3 className="font-serif-display text-white text-2xl md:text-3xl">{project.title}</h3>
        <div className="flex items-center gap-3 mt-2 text-cream/80 text-sm">
          <span>{project.area}</span>
          <span className="w-1 h-1 rounded-full bg-[#F47B20]" />
          <span className="text-[#F47B20]">{project.budget}</span>
        </div>
      </div>
    </div>
  )
}
function PortfolioHorizontal() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [tx, setTx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  useEffect(() => {
    if (isMobile) { setTx(0); return }
    const onScroll = () => {
      const el = wrapRef.current; const track = trackRef.current
      if (!el || !track) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / total))
      const distance = track.scrollWidth - window.innerWidth + 40
      setTx(-progress * distance)
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  // Mobile: simple vertical stack with horizontal snap-scroll
  if (isMobile) {
    return (
      <section id="portfolio" className="bg-cream py-20">
        <div className="px-6 mb-8">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Selected Work</div>
          <h2 className="font-serif-display text-4xl">Our <span className="italic text-[#F47B20]">Work</span></h2>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-4">
          {PROJECTS.map((p, i) => (
            <div key={i} className="snap-center shrink-0"><TiltCard project={p} /></div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" ref={wrapRef} className="relative bg-cream" style={{ height: '340vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8 md:mb-12 w-full">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Selected Work</div>
              <h2 className="font-serif-display text-5xl md:text-7xl">Our <span className="italic text-[#F47B20]">Work</span></h2>
            </div>
            <div className="hidden md:block text-sm text-black/50">Scroll →</div>
          </div>
        </div>
        <div ref={trackRef} className="flex gap-6 md:gap-8 px-6 md:px-10 will-change-transform" style={{ transform: `translateX(${tx}px)` }}>
          {PROJECTS.map((p, i) => <TiltCard key={i} project={p} />)}
        </div>
      </div>
    </section>
  )
}

/* Process */
const STEPS = [
  ['Free Site Visit', 'We come to you. Listen first. Design later.'],
  ['3D Design Proposal', 'Full 3D render + itemised cost breakdown in 7 days.'],
  ['Execution', 'Procurement, vendors, supervision. Weekly photo updates to you.'],
  ['Handover', 'A thorough walkthrough. Not a single item missed.'],
]
function Process() {
  const ref = useRef(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 })
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [])
  return (
    <section id="process" ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— How we work</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl mb-16">The <span className="italic text-[#F47B20]">Process</span></h2>
        <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
          <div className="hidden md:block absolute top-6 left-8 right-8 h-[1px] bg-black/15" />
          {STEPS.map(([title, desc], i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }} className="relative group">
              <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center bg-cream group-hover:border-[#F47B20] group-hover:shadow-[0_0_0_6px_rgba(244,123,32,0.15)] transition-all duration-300 mb-6 relative z-10">
                <span className="font-serif-display italic text-lg text-[#F47B20]">0{i+1}</span>
              </div>
              <h3 className="font-serif-display text-2xl md:text-3xl mb-3">{title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Before/After */
function BeforeAfter({ before, after, title, area, budget, days }) {
  const [pos, setPos] = useState(50)
  const wrapRef = useRef(null)
  const dragging = useRef(false)
  const setFromEvent = (clientX) => {
    const el = wrapRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }
  useEffect(() => {
    const move = (e) => { if (dragging.current) setFromEvent(e.touches ? e.touches[0].clientX : e.clientX) }
    const up = () => { dragging.current = false }
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move); window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up)
      window.removeEventListener('touchmove', move); window.removeEventListener('touchend', up)
    }
  }, [])
  return (
    <div>
      <div ref={wrapRef} className="ba-wrap relative aspect-[4/3] rounded-md overflow-hidden"
        onMouseDown={(e) => { dragging.current = true; setFromEvent(e.clientX) }}
        onTouchStart={(e) => { dragging.current = true; setFromEvent(e.touches[0].clientX) }}
        data-cursor="image" data-cursor-label="Drag">
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="ba-after" style={{ width: `${pos}%` }}>
          <div style={{ width: '100vw', height: '100%' }} className="relative">
            <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: wrapRef.current ? `${wrapRef.current.offsetWidth}px` : '100%' }} draggable={false} />
          </div>
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs z-20">Before</div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F47B20] text-white text-xs z-20">After ✨</div>
        <div className="ba-handle" style={{ left: `${pos}%` }}>
          <div className="ba-knob"><Move className="h-5 w-5" /></div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-cream/90">
        <div>
          <div className="font-serif-display text-2xl">{title}</div>
          <div className="text-sm text-cream/60 mt-1">{area}</div>
        </div>
        <div className="text-right text-sm">
          <div className="text-[#F47B20] font-medium">{budget}</div>
          <div className="text-cream/60">{days}</div>
        </div>
      </div>
    </div>
  )
}
function BeforeAfterSection() {
  return (
    <section className="bg-[#1E1E1E] text-cream py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">— The Transformation</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl mb-16">The 3 Bricks <span className="italic text-[#F47B20]"> Difference </span></h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <BeforeAfter before={IMG.ba1before} after={IMG.ba1after} title="3BHK Living · Baner" area="Contemporary · 1450 sqft" budget="₹24L" days="65 days" />
          <BeforeAfter before={IMG.ba2before} after={IMG.ba2after} title="Modular Kitchen · Wakad" area="L-shape · 120 sqft" budget="₹6.5L" days="28 days" />
        </div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    name: 'Rohan & Priya Desai',
    location: '3BHK Full Interior · Baner, Pune',
    initial: 'R',
    stars: 5,
    text: 'We had a terrible experience with a large branded company — delayed by 3 months, upselling at every step. 3 Bricks was the complete opposite. Timeline was met, budget respected, and the designer was always reachable.',
  },
  {
    name: 'Anjali Kulkarni',
    location: 'Modular Kitchen · Wakad, Pune',
    initial: 'A',
    stars: 5,
    text: 'The modular kitchen is exactly what I wanted — and they actually listened when I said I hate deep cabinets. Small thing, but nobody else asked. Quality of materials is noticeably better than what the big companies showed us.',
  },
  {
    name: 'Sameer Joshi',
    location: 'Full Home · Kharadi, Pune',
    initial: 'S',
    stars: 5,
    text: 'Got possession in March, moved in by June. That was the plan and they stuck to it. The Japandi theme came out exactly like the 3D render. Very happy with the whole experience.',
  },
  {
    name: 'Mehta Family',
    location: '2BHK Interiors · Hinjewadi, Pune',
    initial: 'M',
    stars: 5,
    text: 'Ryan and team were professional throughout. The false ceiling and lighting design especially came out beautifully. Would recommend 3 Bricks to anyone getting possession in Hinjewadi.',
  },
  {
    name: 'Prashant Nair',
    location: 'Office Interior · Viman Nagar, Pune',
    initial: 'P',
    stars: 5,
    text: 'Got our startup office done in 21 days. Clean modern design, within budget, zero delays. Our team loves the space. 3 Bricks delivered exactly what they promised.',
  },
  {
    name: 'Sunita & Vikram',
    location: '3BHK Full Interior · Balewadi, Pune',
    initial: 'S',
    stars: 5,
    text: 'We were nervous about hiring a local studio over a big brand but 3 Bricks completely changed our mind. Personal attention, honest pricing, beautiful result. Could not be happier.',
  },
]

function Testimonials() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  // Clone cards for seamless infinite loop
  const cards = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const cardWidth = 380 + 24 // card width + gap
    const totalWidth = cardWidth * TESTIMONIALS.length
    const speed = 0.6 // px per frame — adjust for faster/slower

    const animate = () => {
      if (!pausedRef.current && !isDragging.current) {
        posRef.current += speed
        // Reset position seamlessly when one full set has scrolled
        if (posRef.current >= totalWidth) {
          posRef.current -= totalWidth
        }
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Pause on hover
  const handleMouseEnter = () => { pausedRef.current = true }
  const handleMouseLeave = () => {
    if (!isDragging.current) pausedRef.current = false
  }

  // Mouse drag
  const handleMouseDown = (e) => {
    isDragging.current = true
    pausedRef.current = true
    dragStartX.current = e.clientX
    dragStartPos.current = posRef.current
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.clientX
    posRef.current = dragStartPos.current + diff
    const track = trackRef.current
    if (track) track.style.transform = `translateX(-${posRef.current}px)`
  }

  const handleMouseUp = () => {
    isDragging.current = false
    pausedRef.current = false
  }

  // Touch drag
  const handleTouchStart = (e) => {
    isDragging.current = true
    pausedRef.current = true
    dragStartX.current = e.touches[0].clientX
    dragStartPos.current = posRef.current
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.touches[0].clientX
    posRef.current = dragStartPos.current + diff
    const track = trackRef.current
    if (track) track.style.transform = `translateX(-${posRef.current}px)`
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    pausedRef.current = false
  }

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto mb-12">
        <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">— Client Stories</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl">
          What Pune <span className="italic text-[#F47B20]">homeowners say</span>
        </h2>
      </div>

      {/* Carousel */}
      <div
        className="relative select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content', transform: 'translateX(0px)' }}
        >
          {cards.map((t, i) => (
            <div
              key={i}
              className="w-[380px] flex-shrink-0 border border-black/8 rounded-2xl p-8 bg-white hover:border-[#F47B20]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <span key={si} className="text-[#F47B20] text-base">★</span>
                ))}
              </div>
              {/* Quote mark */}
              <div className="font-serif-display text-6xl text-[#F47B20]/15 leading-none mb-2">"</div>
              {/* Text */}
              <p className="text-black/65 text-sm leading-relaxed italic mb-6">{t.text}</p>
              {/* Divider */}
              <div className="border-t border-black/8 pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F47B20] to-[#D9631A] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1E1E1E]">{t.name}</div>
                  <div className="text-xs text-black/50 mt-0.5">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Areas */
const AREAS = ['Baner','Wakad','Hinjewadi','Kharadi','Viman Nagar','Balewadi','Undri','Hadapsar','Aundh','Koregaon Park','Magarpatta','Kalyani Nagar','Pashan','Pimple Saudagar','Sus Road','NIBM Road']
function AreasSection() {
  // Convert display name \u2192 slug URL. Falls back to /areas-we-serve if the area
  // doesn't have its own dedicated landing page yet.
  const areaHref = (name) => {
    const slug = AREA_SLUG_MAP[name]
    return slug ? `/interior-designer-${slug}-pune` : '/areas-we-serve'
  }
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-cream">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Coverage</div>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-6xl mb-12">Wherever you got possession — <span className="italic text-[#F47B20]">we are there.</span></h2>
        <div className="flex flex-wrap justify-center gap-3">
          {AREAS.map((a, i) => (
            <motion.div key={a}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}>
              <Link href={areaHref(a)} data-cursor="link"
                className="px-5 py-2.5 rounded-full border border-black/15 text-sm hover:bg-[#F47B20] hover:text-white hover:border-[#F47B20] hover:shadow-[0_0_18px_rgba(244,123,32,0.35)] transition-all cursor-pointer inline-block min-h-[44px] flex items-center">{a}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Pricing */
const TIERS = [
  {
    label: 'Smart & Functional',
    name: 'Essential',
    price: '₹4.5L',
    note: 'starting from',
    feats: [
      'Kitchen + Wardrobes',
      'Basic lighting design',
      'Standard finishes',
      '45–55 day delivery',
    ],
  },
  {
    label: 'Elevated & Customised',
    name: 'Signature',
    price: '₹5.8L',
    note: 'starting from',
    feats: [
      'Everything in Essential',
      'Full home 3D + moodboard',
      'Premium finishes',
      'Custom carpentry',
      'Dedicated designer',
    ],
    featured: true,
  },
  {
    label: 'Luxury & Bespoke',
    name: 'Premium',
    price: '₹6.8L',
    note: 'starting from',
    feats: [
      'Everything in Signature',
      'Imported hardware',
      'Bespoke furniture',
      'Smart home wiring',
      'Site manager onsite',
    ],
  },
]
function Pricing({ onCta }) {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-4">— Pricing</div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl">Honest <span className="italic text-[#F47B20]">Pricing</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TIERS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative rounded-lg p-8 md:p-10 border transition-all duration-500 hover:-translate-y-2 ${t.featured ? 'border-[#F47B20] shadow-[0_0_0_1px_rgba(244,123,32,0.4),0_20px_60px_-20px_rgba(244,123,32,0.35)] bg-cream' : 'border-black/10 hover:shadow-xl bg-white'}`}
              data-cursor="link">
              {t.featured && (<div className="absolute -top-3 left-8 bg-[#F47B20] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">Most Popular in Pune</div>)}
              <div className="text-xs tracking-[0.3em] uppercase text-black/50">{t.label}</div>
              <div className="font-serif-display text-4xl md:text-5xl mt-2">{t.name}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif-display text-5xl text-[#F47B20]">{t.price}</span>
                <span className="text-sm text-black/50">{t.note}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {t.feats.map(f => (<li key={f} className="flex gap-3 text-sm"><Check className="h-4 w-4 mt-0.5 text-[#F47B20] shrink-0" />{f}</li>))}
              </ul>
              <button onClick={onCta} className={`mt-10 w-full rounded-full py-3 text-sm font-medium transition-colors ${t.featured ? 'bg-[#F47B20] text-white hover:bg-[#D9631A]' : 'bg-[#1E1E1E] text-white hover:bg-[#F47B20]'}`}>
                Get My Free Quote →
              </button>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-black/50 mt-10">Final quote after your free site visit. No hidden costs. Ever.</p>
      </div>
    </section>
  )
}

/* Contact */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', project_type: '', area: '', budget: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const submit = async (e) => {
    e.preventDefault(); setError('')
    if (!form.name || !form.phone || !form.project_type || !form.area || !form.budget) return setError('Please fill all fields.')
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) return setError('Please enter a valid phone number.')
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setError(data.error || 'Something went wrong'); return }
      setStatus('success')
      setForm({ name: '', phone: '', project_type: '', area: '', budget: '', website: '' })
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-10 bg-gradient-to-br from-[#F47B20] via-[#E36615] to-[#B84A0C] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.3), transparent 60%)' }} />
      <div className="max-w-[1400px] mx-auto relative grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">— Let's talk</div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.02]">Just got possession? <br /><span className="italic">Let's make it yours.</span></h2>
          <p className="mt-6 max-w-md text-white/90">Book a free 60-minute site visit. We'll walk your space, talk what you love, and put together a real proposal.</p>
          <div className="mt-10 space-y-4 text-white/95">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5" /> +91 9545250565 </div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5" /> hello@3bricksinteriors.com</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /> Studio · Camp, Pune</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-white text-[#1E1E1E] rounded-lg p-8 md:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form key="form" onSubmit={submit} className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }}>
                <h3 className="font-serif-display text-3xl mb-1">Get My Free Consultation</h3>
                <p className="text-sm text-black/60 mb-4">We call you — you don't have to chase us.</p>
                <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
                <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/15 rounded-md px-4 py-3 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20 transition" />
                <input required placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-black/15 rounded-md px-4 py-3 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20 transition" />
                <select required value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} className="w-full border border-black/15 rounded-md px-4 py-3 bg-white">
                  <option value="">Project type</option>
                  <option>Full Home Interior</option>
                  <option>Modular Kitchen</option>
                  <option>Bedroom / Living</option>
                  <option>Commercial / Office</option>
                </select>
                <select required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full border border-black/15 rounded-md px-4 py-3 bg-white">
                  <option value="">Area in Pune</option>
                  {AREAS.map(a => <option key={a}>{a}</option>)}<option>Other</option>
                </select>
                <select required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full border border-black/15 rounded-md px-4 py-3 bg-white">
                  <option value="">Approximate budget</option>
                  <option>Under ₹5L</option><option>₹5L – ₹10L</option><option>₹10L – ₹20L</option><option>₹20L – ₹40L</option><option>₹40L+</option>
                </select>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <button type="submit" disabled={status === 'loading'} className="w-full bg-[#F47B20] text-white rounded-full py-3.5 mt-2 font-medium hover:bg-[#D9631A] transition disabled:opacity-60">
                  {status === 'loading' ? 'Submitting…' : 'Get My Free Consultation →'}
                </button>
                <p className="text-xs text-black/50 text-center pt-2">🔒 No spam. We call you — you don't have to chase us.</p>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="mx-auto w-16 h-16 rounded-full bg-[#F47B20] flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-serif-display text-3xl mt-6">Thank you!</h3>
                <p className="text-black/70 mt-3">We'll call you within 2 hours. 🎉</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm border-b border-black/30 hover:text-[#F47B20] hover:border-[#F47B20]">Submit another →</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* Footer */
function Footer() {
  return (
    <footer className="bg-[#141414] text-cream pt-20 pb-8 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif-display text-3xl mb-4"><span>3</span><span className="text-[#F47B20] italic">Bricks</span></div>
          <p className="text-sm text-cream/60 max-w-xs">Boutique interior design studio. Pune's homes. Delivered on time, with taste.</p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" data-cursor="link" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center hover:border-[#F47B20] hover:text-[#F47B20]"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {['Full Home Interiors','Modular Kitchen','Bedroom & Living','Office & Commercial'].map(x => <li key={x}><a href="#services" data-cursor="link" className="hover:text-[#F47B20]">{x}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">Areas</div>
          <ul className="space-y-2 text-sm">
            {['Baner','Wakad','Kharadi','Hinjewadi','Viman Nagar','Aundh'].map(a => <li key={a}><a href="#contact" data-cursor="link" className="hover:text-[#F47B20]">{a}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>+91 95452 50565</li><li>hello@3bircksinteriors</li><li>Studio · Camp, Pune</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream/50">
        <div>© {new Date().getFullYear()} 3 Bricks. All rights reserved.</div>
        <div>Made with <span className="text-[#F47B20]">♥</span> for Pune homeowners</div>
      </div>
    </footer>
  )
}

/* WhatsApp */
function WhatsApp() {
  const msg = encodeURIComponent("Hi, I'm interested in interior design for my home in Pune.")
  return (
    <a href={`https://wa.me/919876543210?text=${msg}`} target="_blank" rel="noopener noreferrer" className="wa-btn" data-cursor="link" aria-label="WhatsApp">
      <div className="ring" />
      <div className="relative w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl">
        <MessageCircle className="h-7 w-7 text-white" />
      </div>
    </a>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const { openQuiz } = useQuiz()

  // Any CTA on the page routes to the estimate quiz \u2014 the highest-value flow.
  const onCta = useCallback(() => openQuiz('homepage_cta'), [openQuiz])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <SiteChrome>
      <div className="bg-cream text-[#1E1E1E]">
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="fixed inset-0 z-[9998] bg-[#F8F5F0] flex flex-col items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/brand/logo.png"
                alt="3 Bricks"
                width={200}
                height={80}
                priority
                className="h-16 w-auto"
              />
              <div className="mt-6 w-40 h-[2px] bg-black/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-[#F47B20]"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <ScrollIndicator />
        <SiteNav />
        <Hero onCta={onCta} />
        <Marquee />
        <StudioStatement />
        <ServicesSticky />
        <StatsBand />
        <PortfolioHorizontal />
        <Process />
        <BeforeAfterSection />
        <Testimonials />
        <AreasSection />
        <Pricing onCta={onCta} />
        <Contact />
        <SiteFooter />
      </div>
    </SiteChrome>
  )
}

export default App
