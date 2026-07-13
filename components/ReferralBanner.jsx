'use client'

// =============================================================================
// ReferralBanner — tiny bar below the navbar shown when a referral code is
// stored in localStorage. Shows referrer's name and a discount teaser.
// =============================================================================

import { useEffect, useState } from 'react'
import { Gift, X } from 'lucide-react'

export default function ReferralBanner() {
  const [info, setInfo] = useState(null)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const code = localStorage.getItem('yf_referral_code')
    const name = localStorage.getItem('yf_referral_name')
    if (code) setInfo({ code, name })
  }, [])

  if (!info || closed) return null
  return (
    <div className="fixed top-20 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto bg-[#1E1E1E] text-cream rounded-full pl-4 pr-2 py-2 shadow-2xl flex items-center gap-3 text-sm max-w-full">
        <Gift className="h-4 w-4 text-[#F47B20]" />
        <span className="truncate">You were referred by <span className="text-[#F47B20]">{info.name || info.code}</span> — get ₹2,000 off your first project!</span>
        <button onClick={() => setClosed(true)} className="h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center"><X className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  )
}
