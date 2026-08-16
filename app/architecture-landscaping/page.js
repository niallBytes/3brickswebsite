'use client'

// =============================================================================
// Architecture & Landscaping — standalone page for 3 Bricks
// Scroll-driven animations using Framer Motion + IntersectionObserver
// Matches existing site aesthetic: cream bg, charcoal, orange #F47B20
// Cormorant Garamond serif headings, Inter body
// =============================================================================

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Leaf, Building2, Compass, Layers, Sun, TreePine } from 'lucide-react'
import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'
import { useQuiz } from '@/components/QuizProvider'

// ─── Reusable word-by-word reveal (matches homepage) ─────────────────────────
function SplitReveal({ children, className = '', stagger = 0.06, delay = 0, as = 'span' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.15 })
    io.observe(el); return () => io.disconnect()
  }, [])
  const words = String(children).split(' ')
  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-line mr-[0.22em]">
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          >{w}</motion.span>
        </span>
      ))}
    </Tag>
  )
}

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.1 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  )
}

// ─── Clip reveal for images ───────────────────────────────────────────────────
function ImageReveal({ src, alt, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.1 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt}
        className="w-full h-full object-cover"
        initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.08 }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)', scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
        data-cursor="image" data-cursor-label="View"
      />
    </div>
  )
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '', inView }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / 1800)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step); else setV(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  return <span>{v}{suffix}</span>
}

// ─── Parallax hero ────────────────────────────────────────────────────────────
function ParallaxHero({ onCta }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} data-cursor-theme="dark"
      className="relative h-[100svh] w-full overflow-hidden bg-[#1A1A1A] text-white flex items-center justify-center">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        <img
          src="/images/interiors/arch-hero.jpg"
          alt="Architecture and Landscaping"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-white/70 mb-6"
        >
          3 Bricks · Architecture & Landscaping
        </motion.div>

        <h1 className="font-serif-display text-[13vw] md:text-[7vw] leading-[0.95] max-w-5xl mx-auto">
          <div><SplitReveal>Where Structure</SplitReveal></div>
          <div className="italic text-[#F47B20]"><SplitReveal delay={0.3}>Meets Nature</SplitReveal></div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 max-w-xl mx-auto text-base md:text-lg text-white/80 leading-relaxed"
        >
          From architectural blueprints to living landscapes — we design spaces that work from the ground up, inside and out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button onClick={onCta}
            className="bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-8 py-4 text-sm font-medium inline-flex items-center gap-2 min-h-[52px] transition-colors w-full sm:w-auto justify-center">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </button>
          <Link href="#services"
            className="border border-white/30 hover:border-white text-white rounded-full px-8 py-4 text-sm font-medium inline-flex items-center gap-2 min-h-[52px] transition-colors w-full sm:w-auto justify-center">
            Explore Services <ChevronDown className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute left-6 md:left-10 bottom-10 hidden md:flex flex-col items-center gap-3 pointer-events-none">
        <div className="text-[10px] tracking-[0.35em] uppercase text-white/60 mix-blend-difference"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</div>
        <div className="w-[1px] h-16 relative overflow-hidden bg-white/20">
          <motion.div className="absolute inset-x-0 top-0 h-4 bg-[#F47B20]"
            animate={{ y: ['-100%', '450%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </div>
    </section>
  )
}

// ─── Intro statement ──────────────────────────────────────────────────────────
function IntroStatement() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-[#F8F5F0]">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-7">
          <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">— Our Approach</div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            <SplitReveal>Building begins before the</SplitReveal>{' '}
            <span className="italic text-[#F47B20]"><SplitReveal delay={0.2}>first brick is laid.</SplitReveal></span>
          </h2>
          <FadeUp delay={0.3}>
            <p className="mt-8 text-black/65 text-lg leading-relaxed max-w-xl">
              Great architecture is not just about what you build — it is about how the structure lives and breathes
              within its environment. At 3 Bricks, our architecture and landscaping practice starts with a single question:
              how should this space feel?
            </p>
            <p className="mt-4 text-black/65 text-lg leading-relaxed max-w-xl">
              From detailed architectural drawings and structural planning to lush outdoor landscapes and terrace gardens —
              we handle the complete built environment so every element works in harmony.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-5">
          <ImageReveal
            src="/images/interiors/arch-intro.jpg"
            alt="Architecture design"
            className="aspect-[3/4] rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}

// ─── Services — sticky scroll ─────────────────────────────────────────────────
const ARCH_SERVICES = [
  {
    id: '01',
    category: 'Architecture',
    icon: Building2,
    title: 'Residential Architecture',
    desc: 'Custom home design from concept to construction drawings. We work with structural engineers to deliver complete architectural packages — floor plans, elevations, sections, and 3D visualisations — for approval and execution.',
    features: ['Floor plan & elevation drawings', 'BOQ and structural coordination', '3D architectural renders', 'Vastu-compliant layouts', 'Renovation & addition design'],
    img: '/images/interiors/arch-hero.jpg',
  },
  {
    id: '02',
    category: 'Architecture',
    icon: Compass,
    title: 'Commercial Architecture',
    desc: 'Office buildings, retail spaces, warehouses, and institutional buildings designed for functionality and aesthetics. We handle government tender architecture as well as private commercial projects across Pune.',
    features: ['Commercial floor planning', 'Government tender drawings', 'Building permit documentation', 'Structural and MEP coordination', 'Site supervision'],
    img: '/images/interiors/arch-commercial.jpg',
  },
  {
    id: '03',
    category: 'Landscaping',
    icon: Leaf,
    title: 'Garden & Outdoor Design',
    desc: 'Residential gardens, villa landscapes, and apartment common areas designed with seasonal plants, lighting, hardscaping, and water features. We create outdoor spaces that feel as intentional as your interiors.',
    features: ['Garden layout & planting plan', 'Hardscape — paths, patios, decks', 'Irrigation & drainage design', 'Outdoor lighting design', 'Low-maintenance native planting'],
    img: '/images/interiors/arch-garden.jpg',
  },
  {
    id: '04',
    category: 'Landscaping',
    icon: TreePine,
    title: 'Terrace & Balcony Gardens',
    desc: 'Transforming Pune\'s flat terraces and tiny balconies into green retreats. From vertical gardens and planters to full terrace landscaping with seating, shade, and lighting — we make every square foot count.',
    features: ['Terrace waterproofing coordination', 'Vertical garden systems', 'Container & planter design', 'Shade structures & pergolas', 'Balcony furniture planning'],
    img: '/images/interiors/arch-terrace.jpg',
  },
  {
    id: '05',
    category: 'Architecture',
    icon: Layers,
    title: 'Interior Architecture',
    desc: 'The bridge between pure interior design and structural architecture. We handle false ceilings, partition walls, mezzanine floors, custom staircases, and structural modifications that require architectural input.',
    features: ['False ceiling structural design', 'Partition & mezzanine planning', 'Custom staircase design', 'Structural wall modifications', 'Building regulation compliance'],
    img: '/images/interiors/arch-interior-arch.jpg',
  },
  {
    id: '06',
    category: 'Landscaping',
    icon: Sun,
    title: 'Commercial Landscaping',
    desc: 'Large-scale landscaping for housing societies, corporate campuses, hotels, and government institutions. We design and execute landscapes that handle high footfall, low maintenance, and Pune\'s climate throughout the year.',
    features: ['Society common area design', 'Corporate campus landscaping', 'Parking area greening', 'Annual maintenance plans', 'Government project landscaping'],
    img: '/images/interiors/arch-commercial-landscape.jpg',
  },
]

function ServicesSection() {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      const el = wrapRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / total))
      const idx = Math.min(ARCH_SERVICES.length - 1, Math.floor(progress * ARCH_SERVICES.length))
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="services" className="bg-white py-20 px-6">
        <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">— Services</div>
        <h2 className="font-serif-display text-4xl mb-10">What We <span className="italic text-[#F47B20]">Build</span></h2>
        <div className="space-y-14">
          {ARCH_SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6" data-cursor="image" data-cursor-label="View">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-[#F47B20] text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">{s.category}</div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#F47B20]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#F47B20]" />
                  </div>
                  <div className="font-serif-display text-[#F47B20] italic text-3xl">{s.id}</div>
                </div>
                <h3 className="font-serif-display text-3xl mb-3">{s.title}</h3>
                <p className="text-black/65 leading-relaxed mb-4 text-sm">{s.desc}</p>
                <ul className="space-y-1">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-black/60">
                      <CheckCircle2 className="h-4 w-4 text-[#F47B20] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section id="services" ref={wrapRef} className="relative" style={{ height: `${ARCH_SERVICES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full grid md:grid-cols-2 gap-0 items-center px-10">

          {/* Left — text content */}
          <div className="relative z-10 pr-8">
            <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-8">— What We Build</div>
            <div className="relative h-[420px] overflow-hidden">
              {ARCH_SERVICES.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div key={s.id} className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 30 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#F47B20]/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[#F47B20]" />
                      </div>
                      <div className="text-xs tracking-[0.2em] uppercase text-[#F47B20] font-semibold">{s.category}</div>
                    </div>
                    <div className="font-serif-display text-[#F47B20] italic text-6xl mb-2">{s.id}</div>
                    <h3 className="font-serif-display text-4xl md:text-5xl leading-tight mb-5">{s.title}</h3>
                    <p className="text-black/65 max-w-md leading-relaxed">{s.desc}</p>
                    <ul className="mt-6 space-y-2 relative z-10">
                      {s.features.map((f, fi) => (
                        <motion.li key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={i === active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, delay: fi * 0.07 }}
                          className="flex items-center gap-2 text-sm text-black/60">
                          <CheckCircle2 className="h-4 w-4 text-[#F47B20] shrink-0" />{f}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>

            {/* Progress dots */}
            <div className="mt-8 flex items-center gap-3">
              {ARCH_SERVICES.map((_, i) => (
                <div key={i} className={`h-[2px] rounded-full transition-all duration-500 ${i === active ? 'w-12 bg-[#F47B20]' : 'w-4 bg-black/15'}`} />
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative h-[85vh] overflow-hidden rounded-l-2xl" data-cursor="image" data-cursor-label="View">
            {ARCH_SERVICES.map((s, i) => (
              <motion.img key={s.id} src={s.img} alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
            ))}
            {/* Category badge */}
            <div className="absolute top-6 left-6 z-10">
              {ARCH_SERVICES.map((s, i) => (
                <motion.div key={s.id}
                  className="absolute top-0 left-0 bg-[#F47B20] text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.4 }}>
                  {s.category}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} data-cursor-theme="dark" className="bg-[#1E1E1E] text-white py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          [50, '+', 'Architecture Projects'],
          [30, '+', 'Landscaping Projects'],
          [15, '+', 'Government Tenders'],
          [8, '+', 'Years in Pune'],
        ].map(([n, s, l]) => (
          <FadeUp key={l}>
            <div className="font-serif-display text-5xl md:text-6xl text-[#F47B20]">
              <CountUp target={n} suffix={s} inView={inView} />
            </div>
            <div className="text-white/55 text-sm mt-2">{l}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

// ─── Portfolio grid ───────────────────────────────────────────────────────────
const PROJECTS = [
  { title: 'Residential Villa', area: 'Baner, Pune', type: 'Architecture', img: '/images/interiors/arch-hero.jpg' },
  { title: 'Society Garden', area: 'Wakad, Pune', type: 'Landscaping', img: '/images/interiors/arch-garden.jpg' },
  { title: 'Commercial Office', area: 'Kharadi, Pune', type: 'Architecture', img: '/images/interiors/arch-commercial.jpg' },
  { title: 'Terrace Garden', area: 'Viman Nagar, Pune', type: 'Landscaping', img: '/images/interiors/arch-terrace.jpg' },
  { title: 'Government Building', area: 'Camp, Pune', type: 'Architecture', img: '/images/interiors/arch-government.jpg' },
  { title: 'Corporate Landscape', area: 'Hinjewadi, Pune', type: 'Landscaping', img: '/images/interiors/arch-commercial-landscape.jpg' },
]

function PortfolioGrid() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Architecture', 'Landscaping']
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-[#F8F5F0]">
      <div className="max-w-[1200px] mx-auto">
        <FadeUp>
          <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">— Our Work</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl">
              Selected <span className="italic text-[#F47B20]">Projects</span>
            </h2>
            {/* Filter tabs */}
            <div className="flex gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[40px] ${
                    filter === f
                      ? 'bg-[#F47B20] text-white'
                      : 'bg-white border border-black/10 text-black/60 hover:border-[#F47B20] hover:text-[#F47B20]'
                  }`}
                  data-cursor="link">{f}</button>
              ))}
            </div>
          </div>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div key={filter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer bg-neutral-200"
                data-cursor="image" data-cursor-label="View">
                <img src={p.img} alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#F47B20] text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">{p.type}</div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-serif-display text-white text-xl">{p.title}</div>
                  <div className="text-white/65 text-xs mt-1">{p.area}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <FadeUp delay={0.2}>
          <p className="text-center text-sm text-black/40 mt-10 italic">
            {/* Replace with actual 3 Bricks project photos */}
            Placeholder images shown — actual project photography coming soon
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
const PROCESS = [
  { n: '01', title: 'Brief & Site Visit', desc: 'We visit your site, understand your requirements, and review any existing drawings or constraints.' },
  { n: '02', title: 'Concept Design', desc: 'Conceptual layouts, massing studies, and landscape sketches are prepared and presented for your feedback.' },
  { n: '03', title: 'Detailed Drawings', desc: 'Full architectural drawings, planting plans, and structural coordination are completed for approval.' },
  { n: '04', title: 'Execution & Supervision', desc: 'We oversee construction and landscaping execution, ensuring every detail matches the approved design.' },
]

function ProcessSection() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 })
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <FadeUp>
          <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">— How We Work</div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl mb-16">
            The <span className="italic text-[#F47B20]">Process</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-6 left-8 right-8 h-[1px] bg-black/10" />
          {PROCESS.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative group">
              <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center bg-white group-hover:border-[#F47B20] group-hover:shadow-[0_0_0_6px_rgba(244,123,32,0.12)] transition-all duration-300 mb-6 relative z-10">
                <span className="font-serif-display italic text-lg text-[#F47B20]">{s.n}</span>
              </div>
              <h3 className="font-serif-display text-2xl mb-3">{s.title}</h3>
              <p className="text-black/55 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why choose section ───────────────────────────────────────────────────────
function WhyChoose() {
  return (
    <section data-cursor-theme="dark" className="py-24 md:py-32 px-6 md:px-10 bg-[#1E1E1E] text-white">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <div>
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">— Why 3 Bricks</div>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-tight mb-8">
              Architecture and interiors <span className="italic text-[#F47B20]">under one roof.</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-6">
              Most architecture firms hand off to an interior designer. Most interior designers don't do architecture.
              At 3 Bricks, we do both — which means your space is designed with complete continuity from the structure
              to the finish, from the landscape to the living room.
            </p>
            <p className="text-white/65 leading-relaxed">
              One team. One vision. No gaps between the architect's plan and the designer's execution.
            </p>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[
            ['Integrated Design', 'Architecture, interiors, and landscaping in one seamless process — no coordination gaps.'],
            ['Pune-Based Team', 'We understand Pune\'s building regulations, climate, and residential context from years of local practice.'],
            ['Government Experience', 'Proven track record with government office tenders — strict timelines, complete documentation.'],
            ['Transparent Process', 'Detailed drawings, clear timelines, and regular site updates so you are never in the dark.'],
          ].map(([title, desc], i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="border border-white/10 rounded-lg p-5 hover:border-[#F47B20]/40 transition-colors duration-300">
                <div className="font-serif-display text-lg text-[#F47B20] mb-2">{title}</div>
                <div className="text-white/55 text-sm leading-relaxed">{desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA section ──────────────────────────────────────────────────────────────
function CTASection({ onCta }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-[#F47B20] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3), transparent 50%)' }} />
      <div className="max-w-[1000px] mx-auto relative">
        <div className="text-center mb-12">
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-white/70 mb-6">— Start Your Project</div>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl leading-[1.02] mb-6">
              Ready to build<br /><span className="italic">something lasting?</span>
            </h2>
            <p className="text-white/85 text-lg max-w-xl mx-auto">
              Free consultation. We visit your site, understand your vision, and put together an honest proposal with no obligation.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.2}>
          <LeadForm source="architecture_landscaping_cta" submitLabel="Book Free Consultation →" dark={false} />
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ArchitectureLandscapingPage() {
  const { openQuiz } = useQuiz()
  const onCta = useCallback(() => openQuiz('architecture_landscaping_hero'), [openQuiz])

  return (
    <SiteChrome>
      <SiteNav />
      <main>
        <ParallaxHero onCta={onCta} />
        <IntroStatement />
        <ServicesSection />
        <StatsBand />
        <PortfolioGrid />
        <ProcessSection />
        <WhyChoose />
        <CTASection onCta={onCta} />
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}