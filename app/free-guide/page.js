'use client'

// =============================================================================
// Free Guide download page
// Simple lead-capture funnel: name + phone → POST /api/guide-downloads.
// TODO: Replace {GUIDE_PDF_URL} with the actual hosted PDF once ready.
// =============================================================================

import { useState } from 'react'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { CheckCircle2, Download, BookOpen } from 'lucide-react'

const GUIDE_PDF_URL = '/brand/free-guide.pdf' // TODO: Replace with actual PDF file once created

export default function FreeGuidePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Please enter your name')
    if (!/^[0-9]{10}$/.test(form.phone)) return setError('Please enter a valid 10-digit phone number')
    setStatus('loading')
    try {
      const res = await fetch('/api/guide-downloads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: '+91' + form.phone }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setError(data.error || 'Something went wrong'); return }
      setStatus('success')
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  return (
    <SiteChrome>
      <SiteNav variant="solid" />
      <main className="bg-cream text-[#1E1E1E] pt-28 md:pt-32 pb-20">
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-[#F47B20] mb-4">— Free Download</div>
            <h1 className="font-serif-display text-4xl md:text-6xl leading-tight">The Pune Homeowner’s <span className="italic text-[#F47B20]">Interior Design Guide 2026</span></h1>
            <p className="mt-5 text-black/70 text-lg max-w-lg">Everything you need to know before designing your home — timelines, costs, questions to ask, red flags to avoid. Free.</p>
            <ul className="mt-6 space-y-2 text-sm text-black/70">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#F47B20]" /> Realistic timelines from possession to move-in</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#F47B20]" /> Honest cost benchmarks for 1BHK, 2BHK, 3BHK</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#F47B20]" /> The 10 questions to ask any designer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#F47B20]" /> Red flags used by big brands</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-black/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-lg bg-[#F47B20]/10 flex items-center justify-center"><BookOpen className="h-6 w-6 text-[#F47B20]" /></div>
              <div>
                <div className="font-serif-display text-2xl">Get the PDF</div>
                <div className="text-sm text-black/60">Instant download after submit</div>
              </div>
            </div>
            {status !== 'success' ? (
              <form onSubmit={submit} className="space-y-3">
                <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full rounded-lg border border-black/15 px-4 py-3 min-h-[44px] focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20" />
                <div className="flex">
                  <div className="flex items-center px-3 rounded-l-lg border border-r-0 border-black/15 bg-black/[0.04] text-sm text-black/60">+91</div>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile" className="flex-1 rounded-r-lg border border-black/15 px-4 py-3 min-h-[44px] focus:border-[#F47B20] focus:outline-none" />
                </div>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email ID (optional)" className="w-full rounded-lg border border-black/15 px-4 py-3 min-h-[44px] focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20" />
                {error && <div className="text-sm text-red-600">{error}</div>}
                <button type="submit" disabled={status === 'loading'} className="w-full bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full py-3 mt-2 text-sm font-medium min-h-[48px] disabled:opacity-60">
                  {status === 'loading' ? 'Submitting…' : 'Download Free Guide →'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
                <div className="font-serif-display text-2xl mt-4">Thank you!</div>
                <p className="text-sm text-black/60 mt-2">Your guide is ready.</p>
                <a href={GUIDE_PDF_URL} className="mt-5 inline-flex items-center gap-2 bg-[#F47B20] text-white rounded-full px-5 py-3 text-sm font-medium min-h-[44px]"><Download className="h-4 w-4" /> Download PDF</a>
                <p className="text-xs text-black/40 mt-3">If the download doesn’t start, we’ll SMS you the link.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteChrome>
  )
}
