'use client'

// =============================================================================
// You First — Exit Intent + Timed Popup
// Shows once per session. Triggered by:
//   - Desktop: mouse leaving through the top of the viewport
//   - Mobile: after 40 seconds on page
// Also skips itself if the quiz modal is open, to avoid popup collisions.
// =============================================================================

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import LeadForm from './LeadForm'
import { useQuiz } from './QuizProvider'

export default function ExitIntent() {
  const [open, setOpen] = useState(false)
  const { isOpen: quizOpen } = useQuiz()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('yf_exit_shown')) return

    let shown = false
    const trigger = () => {
      if (shown) return
      if (sessionStorage.getItem('yf_exit_shown')) return
      if (document.body.style.overflow === 'hidden') return // quiz open
      shown = true
      sessionStorage.setItem('yf_exit_shown', '1')
      setOpen(true)
    }

    const isMobile = window.innerWidth < 768
    let timeoutId

    if (isMobile) {
      // Time-based on mobile: 40 seconds
      timeoutId = setTimeout(trigger, 40 * 1000)
    } else {
      const onMouseOut = (e) => {
        if (e.clientY <= 0 && !e.relatedTarget) trigger()
      }
      document.addEventListener('mouseout', onMouseOut)
      return () => document.removeEventListener('mouseout', onMouseOut)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  // Do not render if quiz is open (never two overlays at once)
  if (quizOpen) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9995] bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          style={{ cursor: 'auto' }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
          >
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-black/5 flex items-center justify-center">
              <X className="h-4 w-4" />
            </button>
            <div className="text-center mb-6">
              <h3 className="font-serif-display text-3xl md:text-4xl leading-tight">Wait — before you go!</h3>
              <p className="text-black/60 mt-3 text-sm">Get a free estimate for your Pune home. Takes 2 minutes.</p>
            </div>
            <LeadForm source="exit_intent_popup" submitLabel="Get My Free Estimate →" autoFocus />
            <p className="text-center text-xs text-black/40 mt-4">No spam. No calls unless you want them.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
