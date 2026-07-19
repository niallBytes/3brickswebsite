'use client'

// =============================================================================
// You First — Reusable inline Lead Form
// Clean, responsive lead-capture card:
//   Desktop: 2-column grid (Name + Phone on row 1, Email + Area on row 2)
//   Mobile: single column, everything full-width
// Area dropdown is explicit width:100% with overflow visible so it never clips.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { AREAS } from '@/lib/content'

const SHORT_AREAS = ['Baner', 'Wakad', 'Kharadi', 'Hinjewadi', 'Viman Nagar', 'Balewadi', 'Undri', 'Hadapsar', 'Other']

export default function LeadForm({
  source,
  submitLabel = 'Book Free Consultation →',
  packageInterest = '',
  dark = false,           // dark variant on charcoal / orange backgrounds
  autoFocus = false,
  onSuccess,
  areas = SHORT_AREAS,
  maxWidth = 700,         // max card width on desktop
  className = '',
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', area: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  useEffect(() => { if (autoFocus && nameRef.current) nameRef.current.focus() }, [autoFocus])

  // Client-side validation before hitting the API.
  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name'
    if (!/^[0-9]{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email'
    if (!form.area) return 'Select your area in Pune'
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const v = validate(); if (v) { setError(v); return }
    setError(''); setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: '+91' + form.phone,
          source,
          package_interest: packageInterest,
          page_url: typeof window !== 'undefined' ? window.location.pathname : '',
          referral_code: typeof window !== 'undefined' ? (localStorage.getItem('yf_referral_code') || '') : '',
        }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setError(data.error || 'Something went wrong'); return }
      setStatus('success')
      onSuccess?.(form)
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  // Card wrapper styling — white card with subtle shadow, mobile-first.
  const cardCls = dark
    ? 'bg-white/95 text-[#1E1E1E] rounded-xl p-6 shadow-2xl'
    : 'bg-white text-[#1E1E1E] rounded-xl p-6 shadow-lg border border-black/5'

  // Success state — replaces the form entirely.
  if (status === 'success') {
    return (
      <div className={`${cardCls} text-center ${className}`} style={{ maxWidth, margin: '0 auto', width: '100%' }}>
        <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
        <div className="font-serif-display text-2xl">Thank you {form.name || 'there'}!</div>
        <div className="text-sm text-black/60 mt-2">We&rsquo;ll call you within 2 hours.</div>
      </div>
    )
  }

  const inputCls = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 min-h-[44px] text-[#1E1E1E] focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20 transition'
  const labelCls = 'block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider'

  return (
    <form onSubmit={submit} className={`${cardCls} ${className}`} style={{ maxWidth, margin: '0 auto', width: '100%' }} noValidate>
      {/* Honeypot */}
      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor={`yf-name-${source}`}>Full Name</label>
          <input ref={nameRef} id={`yf-name-${source}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor={`yf-phone-${source}`}>Phone Number</label>
          <div className="flex">
            <div className="flex items-center px-3 rounded-l-lg border border-r-0 border-black/15 bg-black/[0.04] text-sm text-black/60">+91</div>
            <input id={`yf-phone-${source}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile" inputMode="numeric" className={inputCls + ' rounded-l-none'} />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor={`yf-email-${source}`}>Email ID</label>
          <input id={`yf-email-${source}`} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className={inputCls} />
        </div>
        <div style={{ overflow: 'visible' }}>
          <label className={labelCls} htmlFor={`yf-area-${source}`}>Area in Pune</label>
          <select id={`yf-area-${source}`} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputCls} style={{ width: '100%' }}>
            <option value="">Select your area</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 mt-3">{error}</div>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`mt-5 w-full rounded-full px-6 py-3 text-sm font-medium min-h-[48px] inline-flex items-center justify-center gap-2 transition ${dark ? 'bg-[#1E1E1E] text-white hover:bg-[#F47B20]' : 'bg-[#F47B20] text-white hover:bg-[#D9631A]'} disabled:opacity-60`}
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'loading' ? 'Submitting…' : submitLabel}
      </button>
      <p className="text-xs text-black/40 text-center mt-3">🔒 We call you — you don&rsquo;t have to chase us.</p>
    </form>
  )
}
