'use client'

// =============================================================================
// You First — Enhanced Floating WhatsApp Button
// On click, shows a small popup with two options:
//   1) Chat on WhatsApp (opens wa.me)
//   2) Request a Callback (inline mini lead form)
// =============================================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone } from 'lucide-react'
import LeadForm from './LeadForm'
import { BRAND } from '@/lib/content'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('menu') // menu | callback
  const waLink = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(BRAND.whatsappMsg)}`
  return (
    <div className="fixed right-4 md:right-5 bottom-4 md:bottom-5 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-[72px] right-0 w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
            style={{ cursor: 'auto' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 bg-[#F5F1EB]">
              <div className="font-medium text-sm">Talk to You First</div>
              <button onClick={() => { setOpen(false); setTab('menu') }} className="h-7 w-7 rounded-full hover:bg-black/5 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4">
              {tab === 'menu' && (
                <div className="space-y-2">
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 px-4 py-3 transition">
                    <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center"><MessageCircle className="h-4 w-4 text-white" /></div>
                    <div><div className="font-medium text-sm">Chat on WhatsApp</div><div className="text-xs text-black/60">Instant reply during work hours</div></div>
                  </a>
                  <button onClick={() => setTab('callback')} className="w-full flex items-center gap-3 rounded-xl bg-[#F47B20]/10 hover:bg-[#F47B20]/20 px-4 py-3 transition text-left">
                    <div className="h-9 w-9 rounded-full bg-[#F47B20] flex items-center justify-center"><Phone className="h-4 w-4 text-white" /></div>
                    <div><div className="font-medium text-sm">Request a Callback</div><div className="text-xs text-black/60">We call you within 2 hours</div></div>
                  </button>
                </div>
              )}
              {tab === 'callback' && (
                <div>
                  <button onClick={() => setTab('menu')} className="text-xs text-black/60 mb-3 hover:text-[#F47B20]">← Back</button>
                  <LeadForm source="whatsapp_callback_form" submitLabel="Request Callback →" autoFocus />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="WhatsApp / Callback"
        className="relative w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-105 transition"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <MessageCircle className="h-7 w-7 text-white relative z-10" />
      </button>
    </div>
  )
}
