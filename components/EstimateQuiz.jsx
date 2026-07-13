'use client'

// =============================================================================
// You First — 12-Step Estimate Quiz Modal
// Renders as a full-screen overlay. Users complete 12 steps, we compute an
// estimate range, POST everything to /api/leads, and show a results screen.
// =============================================================================

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowRight, ArrowLeft, Lightbulb, Search, Upload, CheckCircle2,
  Sparkles, ShieldCheck, Clock, UserCheck, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { AREAS } from '@/lib/content'
import { QUIZ_STEPS, calculateEstimate, formatLakh } from '@/lib/quiz'

// Small helper to render the light-blue info box under each question
function InfoBox({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#EEF2FB] border border-[#DCE4F5] px-4 py-3 text-sm text-[#3E4B70]">
      <Lightbulb className="h-4 w-4 mt-0.5 text-[#5A6BAA] shrink-0" />
      <div>{children}</div>
    </div>
  )
}

// Answer card component — reused for single/multi step types
function AnswerCard({ selected, onClick, icon, label, desc, recommended, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-[#F47B20] bg-[#FDECE0]'
          : 'border-transparent bg-[#FDEEE4]/60 hover:border-[#F47B20]/40 hover:bg-[#FDECE0]'
      } ${compact ? 'px-4 py-3' : 'px-5 py-4'} flex items-center gap-4 min-h-[56px]`}
    >
      {icon && (
        <div className={`text-2xl ${compact ? 'text-xl' : ''} shrink-0`}>{icon}</div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium text-[#1E1E1E]">{label}</div>
          {recommended && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-green-100 text-green-700 rounded-full px-2 py-0.5">Recommended</span>
          )}
        </div>
        {desc && <div className="text-xs text-black/60 mt-1">{desc}</div>}
      </div>
      {selected && <CheckCircle2 className="h-5 w-5 text-[#F47B20]" />}
    </button>
  )
}

// ==== Step-specific renderers ====
function LocationStep({ value, onChange }) {
  const v = value || { search: '', area: '', pincode: '' }
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
        <input
          value={v.search}
          onChange={(e) => onChange({ ...v, search: e.target.value })}
          placeholder="Search by area or society name"
          className="w-full rounded-lg border border-black/15 pl-11 pr-4 py-3.5 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20"
        />
      </div>
      <select
        value={v.area}
        onChange={(e) => onChange({ ...v, area: e.target.value })}
        className="w-full rounded-lg border border-black/15 px-4 py-3.5 bg-white focus:border-[#F47B20] focus:outline-none"
      >
        <option value="">Select your area in Pune</option>
        {AREAS.map(a => <option key={a}>{a}</option>)}
      </select>
      <input
        value={v.pincode}
        onChange={(e) => onChange({ ...v, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
        placeholder="Enter your pincode"
        inputMode="numeric"
        className="w-full rounded-lg border border-black/15 px-4 py-3.5 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20"
      />
    </div>
  )
}

function FloorPlanStep({ value, onChange }) {
  const v = value || { has: '', file: null }
  const inputRef = useRef(null)
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => onChange({ ...v, has: v.has === 'yes' ? '' : 'yes' })}
        className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${v.has === 'yes' ? 'border-[#F47B20] bg-[#FDECE0]' : 'border-transparent bg-[#FDEEE4]/60 hover:bg-[#FDECE0]'}`}
      >
        <div className="font-medium">Yes (Optional)</div>
        <div className="text-xs text-black/60 mt-1">I have a floor plan to share</div>
        {v.has === 'yes' && (
          <div className="mt-4">
            <div
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
              className="border-2 border-dashed border-[#F47B20]/40 rounded-lg py-8 text-center hover:bg-white/50 cursor-pointer"
            >
              <Upload className="h-6 w-6 mx-auto text-[#F47B20]" />
              <div className="mt-2 text-sm text-black/70">
                {v.file ? v.file.name : 'Drag & drop your file, or click to upload'}
              </div>
              <div className="mt-1 text-xs text-black/40">JPG, PNG, PDF · Max 10 MB</div>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => onChange({ ...v, file: e.target.files?.[0] || null })}
              className="hidden"
            />
          </div>
        )}
      </button>
      <button
        type="button"
        onClick={() => onChange({ has: 'no', file: null })}
        className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${v.has === 'no' ? 'border-[#F47B20] bg-[#FDECE0]' : 'border-transparent bg-[#FDEEE4]/60 hover:bg-[#FDECE0]'}`}
      >
        <div className="font-medium">No</div>
        <div className="text-xs text-black/60 mt-1">A professional can help you create a floor plan.</div>
      </button>
    </div>
  )
}

// 7-day pill picker + time slot grid
function ScheduleStep({ value, onChange, timeSlots }) {
  const v = value || { date: '', time: '' }
  const [weekOffset, setWeekOffset] = useState(0)
  const days = useMemo(() => {
    const arr = []
    const start = new Date()
    start.setDate(start.getDate() + weekOffset * 7)
    for (let i = 0; i < 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i)
      arr.push(d)
    }
    return arr
  }, [weekOffset])
  const iso = (d) => d.toISOString().slice(0, 10)
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-black/60">Select a date</div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setWeekOffset(o => Math.max(0, o - 1))} className="h-8 w-8 rounded-full border hover:border-[#F47B20]"><ChevronLeft className="h-4 w-4 mx-auto" /></button>
            <button type="button" onClick={() => setWeekOffset(o => o + 1)} className="h-8 w-8 rounded-full border hover:border-[#F47B20]"><ChevronRight className="h-4 w-4 mx-auto" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const sel = iso(d) === v.date
            return (
              <button
                type="button"
                key={iso(d)}
                onClick={() => onChange({ ...v, date: iso(d) })}
                className={`rounded-xl py-3 px-1 border-2 text-center min-h-[64px] transition ${sel ? 'border-[#F47B20] bg-[#FDECE0]' : 'border-black/10 hover:border-[#F47B20]/40 bg-white'}`}
              >
                <div className="text-[10px] uppercase tracking-wider text-black/50">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="font-serif-display text-xl leading-none mt-1">{d.getDate()}</div>
                <div className="text-[10px] text-black/50 mt-1">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <div className="text-sm text-black/60 mb-3">Select a time</div>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => onChange({ ...v, time: t })}
              className={`rounded-xl py-3 px-4 border-2 transition min-h-[52px] ${v.time === t ? 'border-[#F47B20] bg-[#F47B20] text-white' : 'border-black/10 hover:border-[#F47B20]/40 bg-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactStep({ value, onChange, error }) {
  const v = value || { name: '', phone: '', email: '', agree: false }
  return (
    <div className="space-y-4">
      <input
        autoFocus
        value={v.name}
        onChange={(e) => onChange({ ...v, name: e.target.value })}
        placeholder="Full Name"
        className="w-full rounded-lg border border-black/15 px-4 py-3.5 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20"
      />
      <div className="flex">
        <div className="flex items-center px-4 rounded-l-lg border border-r-0 border-black/15 bg-black/[0.04] text-sm text-black/60">+91</div>
        <input
          value={v.phone}
          onChange={(e) => onChange({ ...v, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          className="flex-1 rounded-r-lg border border-black/15 px-4 py-3.5 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20"
        />
      </div>
      <input
        type="email"
        value={v.email}
        onChange={(e) => onChange({ ...v, email: e.target.value })}
        placeholder="Email ID"
        className="w-full rounded-lg border border-black/15 px-4 py-3.5 focus:border-[#F47B20] focus:outline-none focus:ring-2 focus:ring-[#F47B20]/20"
      />
      <label className="flex items-start gap-3 text-sm text-black/70 cursor-pointer">
        <input
          type="checkbox"
          checked={v.agree}
          onChange={(e) => onChange({ ...v, agree: e.target.checked })}
          className="mt-1 h-4 w-4 accent-[#F47B20]"
        />
        <span>I agree to the <a className="underline" href="#">privacy policy</a> and <a className="underline" href="#">terms &amp; conditions</a>.</span>
      </label>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  )
}

// ==== Results Screen ====
function Results({ answers, estimate, onBookConsultation, onClose }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8 max-w-3xl mx-auto w-full">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-6 leading-tight">Here&rsquo;s your estimated budget range</h2>
        <div className="mt-8 rounded-2xl bg-white shadow-xl border border-black/5 p-8 md:p-10">
          <div className="font-serif-display text-5xl md:text-6xl font-bold text-green-700">
            {formatLakh(estimate.min)} – {formatLakh(estimate.max)}<span className="text-2xl align-super">*</span>
          </div>
          <p className="text-sm text-black/50 mt-4 italic">This isn&rsquo;t a final quote and can be customised to suit your needs.</p>
          <button onClick={() => setShowDetails(true)} className="mt-4 text-sm text-[#F47B20] underline">View detailed summary →</button>
        </div>

        <div className="mt-10 rounded-2xl bg-[#FDECE0] p-8">
          <h3 className="font-serif-display text-2xl mb-2">Want an accurate quote?</h3>
          <p className="text-sm text-black/60">Book a free site visit — our designer will meet you at your home.</p>
          <button onClick={onBookConsultation} className="mt-5 bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full px-8 py-3.5 text-sm font-medium min-h-[48px]">
            Book My Free Consultation →
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            [Clock, 'On-Time Delivery'],
            [ShieldCheck, 'Transparent Pricing'],
            [UserCheck, 'Dedicated Designer'],
            [Sparkles, '5-Year Warranty'],
          ].map(([Icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#F47B20]/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#F47B20]" />
              </div>
              <div className="text-black/70 text-xs md:text-sm text-center">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[10001] bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between">
              <h4 className="font-serif-display text-2xl">Your estimate summary</h4>
              <button onClick={() => setShowDetails(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-6 space-y-3 text-sm">
              <SummaryRow label="BHK Type" value={answers.bhk_type} />
              <SummaryRow label="Home Type" value={answers.home_type} />
              <SummaryRow label="Project Type" value={answers.project_type} />
              <SummaryRow label="Area" value={answers.area || answers.location?.area} />
              <SummaryRow label="Scope items" value={(answers.scope_items || []).join(', ') || '—'} />
              <SummaryRow label="Budget indicated" value={answers.budget_range} />
              <SummaryRow label="Package tier" value={estimate.packageTier} />
              <SummaryRow label="Possession" value={answers.possession_timeline} />
              <SummaryRow label="Language" value={answers.preferred_language} />
              <SummaryRow label="Consultation" value={answers.consultation_mode} />
              <SummaryRow label="Preferred date" value={answers.preferred_date} />
              <SummaryRow label="Preferred time" value={answers.preferred_time} />
              <SummaryRow label="Estimated range" value={`${formatLakh(estimate.min)} – ${formatLakh(estimate.max)}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-black/5">
      <div className="text-black/50">{label}</div>
      <div className="text-right text-black/85 font-medium">{value || '—'}</div>
    </div>
  )
}

// ==== Main Quiz component ====
export default function EstimateQuiz({ source = 'cta', onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [estimate, setEstimate] = useState(null)

  const total = QUIZ_STEPS.length
  const s = QUIZ_STEPS[step]
  const pct = done ? 100 : Math.round(((step) / total) * 100)

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])

  const setAnswer = (id, v) => setAnswers((a) => ({ ...a, [id]: v }))

  // Determine whether current step is answered (enable Continue)
  const canContinue = useMemo(() => {
    const v = answers[s.id]
    if (s.type === 'single' || s.type === 'pills') return !!v
    if (s.type === 'multi') return Array.isArray(v) && v.length > 0
    if (s.type === 'location') return v && v.area && v.pincode && v.pincode.length >= 4
    if (s.type === 'floorplan') return v && v.has
    if (s.type === 'schedule') return v && v.date && v.time
    if (s.type === 'contact') {
      if (!v) return false
      if (!v.name || v.name.trim().length < 2) return false
      if (!/^[0-9]{10}$/.test(v.phone || '')) return false
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) return false
      if (!v.agree) return false
      return true
    }
    return true
  }, [s, answers])

  const next = async () => {
    setError('')
    if (step < total - 1) { setStep(step + 1); return }
    // Final step — submit
    await submit()
  }
  const prev = () => { setError(''); if (step > 0) setStep(step - 1) }

  const submit = async () => {
    const contact = answers.contact || {}
    const location = answers.location || {}
    const floor = answers.floor_plan || {}
    const sched = answers.schedule || {}

    const payload = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      area: location.area || '',
      pincode: location.pincode || '',
      project_type: answers.project_type || '',
      home_type: answers.home_type || '',
      bhk_type: answers.bhk_type || '',
      scope_items: answers.scope_items || [],
      budget_range: answers.budget_range || '',
      possession_timeline: answers.possession_timeline || '',
      has_floor_plan: floor.has === 'yes',
      floor_plan_url: '', // TODO: wire up upload later
      preferred_language: answers.preferred_language || '',
      consultation_mode: answers.consultation_mode || '',
      preferred_date: sched.date || '',
      preferred_time: sched.time || '',
      source,
      page_url: typeof window !== 'undefined' ? window.location.pathname : '',
      referral_code: typeof window !== 'undefined' ? (localStorage.getItem('yf_referral_code') || '') : '',
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setSubmitting(false); return }
      // Prefer server-side estimate; fall back to local calc
      const est = data.estimate || calculateEstimate(payload)
      setEstimate(est)
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Render body per step type
  const body = (() => {
    if (s.type === 'single' || s.type === 'pills') {
      const isPills = s.type === 'pills'
      return (
        <div className={isPills ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3'}>
          {s.options.map((opt) => (
            <AnswerCard
              key={opt.value}
              selected={answers[s.id] === opt.value}
              onClick={() => setAnswer(s.id, opt.value)}
              icon={opt.icon}
              label={opt.label}
              desc={opt.desc}
              recommended={opt.recommended}
              compact={isPills}
            />
          ))}
        </div>
      )
    }
    if (s.type === 'multi') {
      const selected = answers[s.id] || []
      const toggle = (v) => {
        setAnswer(s.id, selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v])
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {s.options.map(o => (
            <AnswerCard
              key={o.value}
              selected={selected.includes(o.value)}
              onClick={() => toggle(o.value)}
              icon={o.icon}
              label={o.label}
            />
          ))}
        </div>
      )
    }
    if (s.type === 'location') return <LocationStep value={answers[s.id]} onChange={(v) => setAnswer(s.id, v)} />
    if (s.type === 'floorplan') return <FloorPlanStep value={answers[s.id]} onChange={(v) => setAnswer(s.id, v)} />
    if (s.type === 'schedule') return <ScheduleStep value={answers[s.id]} onChange={(v) => setAnswer(s.id, v)} timeSlots={s.timeSlots} />
    if (s.type === 'contact') return <ContactStep value={answers[s.id]} onChange={(v) => setAnswer(s.id, v)} error={error} />
    return null
  })()

  return (
    <div className="fixed inset-0 z-[10000] bg-white flex flex-col" style={{ cursor: 'auto' }}>
      {/* Progress bar (very top) */}
      <div className="h-1 w-full bg-black/5">
        <motion.div
          className="h-full bg-[#F47B20]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 h-16 border-b border-black/5">
        <div className="font-serif-display text-xl md:text-2xl">
          <span>YOU</span><span className="text-[#F47B20] italic">FIRST</span>
        </div>
        <div className="text-xs text-black/50">{done ? 'Complete' : `Step ${step + 1} of ${total}`}</div>
        <button onClick={onClose} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 rounded-full" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      {!done ? (
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto px-4 md:px-10 py-8 md:py-12"
            >
              {s.banner && (
                <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3">
                  {s.banner}
                </div>
              )}
              <h1 className="font-serif-display text-3xl md:text-5xl leading-tight mb-4">{s.title}</h1>
              <div className="mb-8"><InfoBox>{s.info}</InfoBox></div>
              {body}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <Results
          answers={{ ...answers, ...(answers.contact || {}), area: (answers.location || {}).area, preferred_date: (answers.schedule || {}).date, preferred_time: (answers.schedule || {}).time }}
          estimate={estimate}
          onBookConsultation={onClose}
          onClose={onClose}
        />
      )}

      {/* Footer buttons */}
      {!done && (
        <div className="border-t border-black/5 bg-white/95 backdrop-blur px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={prev}
            disabled={step === 0}
            className="text-sm text-black/60 hover:text-[#F47B20] disabled:opacity-30 inline-flex items-center gap-2 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={next}
            disabled={!canContinue || submitting}
            className="bg-[#F47B20] text-white rounded-full px-6 md:px-8 py-3 text-sm font-medium hover:bg-[#D9631A] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 min-h-[48px] min-w-[140px] justify-center"
          >
            {submitting ? 'Calculating…' : step === total - 1 ? 'Show My Estimate' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
