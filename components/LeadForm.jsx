'use client'

// =============================================================================
// You First — Reusable inline Lead Form
// The same tiny 4-field form used everywhere: hero card, exit intent popup,
// footer band, WhatsApp callback, blog sidebar, etc.
// Every submission passes a `source` string so the admin can see where the
// lead came from.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { AREAS } from '@/lib/content'

const SHORT_AREAS = ['Baner', 'Wakad', 'Kharadi', 'Hinjewadi', 'Viman Nagar', 'Balewadi', 'Undri', 'Hadapsar', 'Other']

export default function LeadForm({
  source,
  submitLabel = 'Book Free Consultation →',
  packageInterest = '',
  compact = false,       // horizontal layout when true
  dark = false,          // dark card style
  autoFocus = false,
  onSuccess,
  areas = SHORT_AREAS,
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', area: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    if (autoFocus && nameRef.current) nameRef.current.focus()
  }, [autoFocus])

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name'
    if (!/^[0-9]{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email'
    if (!form.area) return 'Select your area in Pune'
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError(''); setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch {
      setStatus('error'); setError('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-xl ${dark ? 'bg-white/10 text-white' : 'bg-green-50 text-green-800 border border-green-200'} px-5 py-6 text-center`}>
        <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
        <div className="font-medium">Thank you {form.name || 'there'}!</div>
        <div className="text-sm mt-1 opacity-80">We&rsquo;ll call you within 2 hours.</div>
      </div>
    )
  }

  const inputCls = `w-full rounded-lg border px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/30 ${dark ? 'bg-white text-black border-white/20' : 'border-black/15 bg-white'}`
  return (
    <form onSubmit={submit} className={compact ? 'grid grid-cols-1 md:grid-cols-5 gap-3' : 'space-y-3'}>
      {/* honeypot */}
      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

      <input ref={nameRef} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className={inputCls} />
      <div className="flex">
        <div className={`flex items-center px-3 rounded-l-lg border border-r-0 text-sm ${dark ? 'bg-white/90 border-white/20 text-black/60' : 'bg-black/[0.04] border-black/15 text-black/60'}`}>+91</div>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile" inputMode="numeric" className={inputCls + ' rounded-l-none'} />
      </div>
      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email ID" className={inputCls} />
      <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputCls}>
        <option value="">Area in Pune</option>
        {areas.map(a => <option key={a}>{a}</option>)}
      </select>
      <button type="submit" disabled={status === 'loading'} className={`rounded-full px-6 py-3 text-sm font-medium min-h-[48px] inline-flex items-center justify-center gap-2 transition ${dark ? 'bg-white text-[#1E1E1E] hover:bg-[#F47B20] hover:text-white' : 'bg-[#F47B20] text-white hover:bg-[#D9631A]'} disabled:opacity-60`}>
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'loading' ? 'Submitting…' : submitLabel}
      </button>
      {error && <div className={`text-sm ${dark ? 'text-red-300' : 'text-red-600'} md:col-span-5`}>{error}</div>}
    </form>
  )
}
