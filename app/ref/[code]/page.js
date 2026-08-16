'use client'

// =============================================================================
// Referral click tracker — /ref/<code> stores the code in localStorage then
// redirects to home. The referral banner picks up the code and shows the
// discount teaser.
// =============================================================================

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function RefCode() {
  const { code } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!code) return
    (async () => {
      try {
        const res = await fetch(`/api/referrals/${code}/click`, { method: 'POST' })
        const data = await res.json()
        if (data.ok) {
          localStorage.setItem('yf_referral_code', String(code))
          if (data.referrer_name) localStorage.setItem('yf_referral_name', data.referrer_name)
        }
      } catch {}
      router.replace('/')
    })()
  }, [code, router])

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="font-serif-display text-3xl"><Image
          src="/brand/logo.png"
          alt="3 Bricks Interiors"
          width={160}
          height={10}
          className="h-21 w-auto mb-4"
        /> </div>
        <p className="mt-3 text-black/60">Applying your referral discount…</p>
      </div>
    </div>
  )
}
