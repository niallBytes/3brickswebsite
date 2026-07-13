'use client'

// =============================================================================
// Refer a Friend page — form to create a unique referral link + reward table.
// =============================================================================

import { useState } from 'react'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { Copy, CheckCircle2, Gift, Share2, Users, ArrowRight } from 'lucide-react'

export default function ReferPage() {
  const [form, setForm] = useState({ referrer_name: '', referrer_phone: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [ref, setRef] = useState(null)
  const [copied, setCopied] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.referrer_name.trim()) return setError('Please enter your name')
    if (!/^[0-9]{10}$/.test(form.referrer_phone)) return setError('Please enter a valid 10-digit phone number')
    setStatus('loading')
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, referrer_phone: '+91' + form.referrer_phone }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setError(data.error || 'Something went wrong'); return }
      setRef(data.referral); setStatus('success')
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  const link = ref && typeof window !== 'undefined' ? `${window.location.origin}/ref/${ref.unique_code}` : ''
  const copy = () => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-28 md:pt-32 pb-24">
        <section className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <div className="h-16 w-16 rounded-full bg-[#F47B20]/10 flex items-center justify-center mx-auto"><Gift className="h-7 w-7 text-[#F47B20]" /></div>
          <h1 className="font-serif-display text-4xl md:text-6xl leading-tight mt-6">Refer a Friend — Earn <span className="italic text-[#F47B20]">₹5,000</span></h1>
          <p className="mt-4 text-black/60 text-lg">Know someone building a home in Pune? Send them our way and get rewarded.</p>
        </section>

        {/* How it works */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-10 mt-14 grid md:grid-cols-3 gap-6">
          {[
            [Share2, 'Share your link', 'Get your unique referral link below.'],
            [Users, 'Friend books with us', 'They complete a paid site visit or sign up.'],
            [Gift, 'You earn ₹5,000', 'Amazon voucher delivered to your inbox.'],
          ].map(([Icon, t, d], i) => (
            <div key={i} className="bg-white border border-black/5 rounded-lg p-6">
              <div className="h-10 w-10 rounded-full bg-[#F47B20]/10 flex items-center justify-center mb-3"><Icon className="h-5 w-5 text-[#F47B20]" /></div>
              <div className="font-serif-display text-2xl">{t}</div>
              <div className="text-sm text-black/60 mt-2">{d}</div>
            </div>
          ))}
        </section>

        {/* Rewards table */}
        <section className="max-w-[700px] mx-auto px-6 md:px-10 mt-14">
          <h2 className="font-serif-display text-2xl md:text-3xl mb-4">Reward tiers</h2>
          <div className="bg-white rounded-lg border border-black/5 overflow-hidden text-sm">
            <div className="flex justify-between px-5 py-3 border-b border-black/5 bg-black/[0.02]"><span>1st successful referral</span><span className="font-medium">₹5,000 Amazon voucher</span></div>
            <div className="flex justify-between px-5 py-3"><span>2nd referral onwards</span><span className="font-medium text-[#F47B20]">₹7,500 Amazon voucher</span></div>
          </div>
        </section>

        {/* Form OR result */}
        <section className="max-w-[700px] mx-auto px-6 md:px-10 mt-14">
          {status !== 'success' ? (
            <form onSubmit={submit} className="bg-white rounded-2xl border border-black/5 p-8 shadow-lg space-y-3">
              <h3 className="font-serif-display text-2xl mb-2">Generate my unique referral link</h3>
              <input value={form.referrer_name} onChange={(e) => setForm({ ...form, referrer_name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-black/15 px-4 py-3 min-h-[44px] focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20" />
              <div className="flex">
                <div className="flex items-center px-3 rounded-l-lg border border-r-0 border-black/15 bg-black/[0.04] text-sm text-black/60">+91</div>
                <input value={form.referrer_phone} onChange={(e) => setForm({ ...form, referrer_phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile" className="flex-1 rounded-r-lg border border-black/15 px-4 py-3 min-h-[44px] focus:border-[#F47B20] focus:outline-none" />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full py-3 text-sm font-medium min-h-[48px] disabled:opacity-60">
                {status === 'loading' ? 'Generating…' : 'Generate My Referral Link →'}
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-2xl border border-black/5 p-8 shadow-lg text-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
              <div className="font-serif-display text-2xl mt-4">Your unique link is ready!</div>
              <div className="mt-4 flex items-stretch gap-2">
                <input readOnly value={link} className="flex-1 rounded-lg border border-black/15 px-4 py-3 text-sm bg-black/[0.02]" />
                <button onClick={copy} className="bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-lg px-4 min-h-[44px] flex items-center gap-2 text-sm"><Copy className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy'}</button>
              </div>
              <p className="text-xs text-black/50 mt-4">Share this link with friends building a home in Pune. Every successful booking is a reward for you.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}
