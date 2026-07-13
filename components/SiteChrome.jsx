'use client'

// =============================================================================
// SiteChrome — client-only page chrome shared by every route.
// Handles: Lenis smooth scroll, custom cursor, referral tracking,
// exit intent popup, and the WhatsApp floating button.
// Wrap page bodies with <SiteChrome>...</SiteChrome>.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import ExitIntent from './ExitIntent'
import WhatsAppButton from './WhatsAppButton'

// Reusable smooth cursor — same look/behaviour as before, in a shared spot.
function CustomCursor() {
  const ref = useRef(null)
  const [state, setState] = useState('')
  const [label, setLabel] = useState('View')
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current; if (!el) return
    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let tx = x, ty = y
    const move = (e) => { tx = e.clientX; ty = e.clientY }
    let raf
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move); raf = requestAnimationFrame(loop)
    const over = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) { setState(''); return }
      const c = t.getAttribute('data-cursor')
      setLabel(t.getAttribute('data-cursor-label') || 'View')
      setState(c === 'image' ? 'hover-image' : 'hover-link')
    }
    document.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className={`yf-cursor ${state}`}><span className="label">{label}</span></div>
}

export default function SiteChrome({ children }) {
  const pathname = usePathname()

  // Referral code capture — URL like /ref/CODE has already stored it, but also
  // pick up a ?ref=CODE query param for convenience.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const q = url.searchParams.get('ref')
    if (q) localStorage.setItem('yf_referral_code', q)
  }, [pathname])

  // Lenis smooth scroll
  useEffect(() => {
    let lenis; let raf
    ;(async () => {
      const mod = await import('lenis')
      const Lenis = mod.default
      lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
    })()
    return () => { if (lenis) lenis.destroy(); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <CustomCursor />
      {children}
      <ExitIntent />
      <WhatsAppButton />
    </>
  )
}
