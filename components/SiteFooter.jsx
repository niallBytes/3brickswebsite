'use client'

// =============================================================================
// SiteFooter — Livspace-style SEO-rich footer with 5 columns + pre-footer form.
// data-cursor-theme="dark" flips the custom cursor to light so it's visible.
// =============================================================================

import Link from 'next/link'
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import LeadForm from './LeadForm'
import Image from 'next/image'
import { BRAND, AREA_PAGES, DESIGN_CATEGORIES } from '@/lib/content'

export default function SiteFooter() {
  // Services links — every service now points to a real page or a homepage anchor.
  const services = [
    ['Full Home Interiors', '/design-ideas/living-room'],
    ['Modular Kitchen', '/design-ideas/modular-kitchen'],
    ['Wardrobe Design', '/design-ideas/wardrobe'],
    ['Living Room', '/design-ideas/living-room'],
    ['Bedroom Design', '/design-ideas/master-bedroom'],
    ['Bathroom Design', '/design-ideas/bathroom'],
    ['False Ceiling', '/design-ideas/false-ceiling'],
    ['Wall Panelling', '/design-ideas/wall-decor'],
    ['Office Interiors', '/#services'],
    ['Government Projects', '/#services'],
  ]

  const company = [
    ['About Us', '/about'],
    ['Blog', '/blog'],
    ['Portfolio', '/design-ideas'],
    ['How It Works', '/#process'],
    ['Pricing', '/#pricing'],
    ['Refer a Friend', '/refer-a-friend'],
    ['Free Guide', '/free-guide'],
    ['Contact Us', '/#contact'],
    ['Privacy Policy', '/privacy-policy'],
    ['Terms & Conditions', '/terms-and-conditions'],
  ]

  const ideas = DESIGN_CATEGORIES.slice(0, 7)

  return (
    <footer data-cursor-theme="dark" className="bg-[#141414] text-cream">
      {/* Pre-footer lead form band */}
      <section className="border-b border-cream/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif-display text-3xl md:text-5xl leading-tight">Let&rsquo;s design your <span className="italic text-[#F47B20]">home</span> together.</h3>
            <p className="text-cream/70 mt-3 text-sm max-w-md">Drop your details and we&rsquo;ll reach out within 2 hours.</p>
          </div>
          <div><LeadForm source="footer_form" submitLabel="Let&rsquo;s Talk →" dark /></div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Image
  src="/brand/logo.png"
  alt="3 Bricks Interiors"
  width={160}
  height={10}
  className="h-21 w-auto mb-4"
/>
            <p className="text-sm text-cream/60">{BRAND.tagline}</p>
            <div className="mt-4 text-sm text-cream/80 space-y-1">
              <div><a href={`tel:${BRAND.phoneTel}`} data-cursor="link" className="hover:text-[#F47B20]">{BRAND.phone}</a></div>
              <div><a href={`mailto:${BRAND.email}`} data-cursor="link" className="hover:text-[#F47B20]">{BRAND.email}</a></div>
              <div className="text-cream/60 text-xs mt-2 leading-relaxed">{BRAND.address}</div>
            </div>
            <div className="flex gap-3 mt-6">
              <a href={BRAND.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-cursor="link" className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-[#F47B20] hover:text-[#F47B20]"><Instagram className="h-4 w-4" /></a>
              <a href={BRAND.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-cursor="link" className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-[#F47B20] hover:text-[#F47B20]"><Facebook className="h-4 w-4" /></a>
              <a href={BRAND.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-cursor="link" className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-[#F47B20] hover:text-[#F47B20]"><Youtube className="h-4 w-4" /></a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-cursor="link" className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366]"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>

          <FooterCol title="Services" items={services.map(([l, h]) => ({ label: l, href: h }))} />
          <FooterCol title="Design Ideas" items={ideas.map(c => ({ label: c.short, href: `/design-ideas/${c.slug}` })).concat([{ label: 'View All →', href: '/design-ideas' }])} />
          <FooterCol title="Areas in Pune" items={AREA_PAGES.map(a => ({ label: a.name, href: `/interior-designer-${a.slug}-pune` }))} />
          <FooterCol title="Company" items={company.map(([l, h]) => ({ label: l, href: h }))} />
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream/50">
          <div>© {new Date().getFullYear()} 3 Bricks Interior Design, Pune. All rights reserved.</div>
          <div>Made with <span className="text-[#F47B20]">♥</span> for Pune homeowners</div>
        </div>

        {/* SEO keyword strip */}
        <div className="mt-6 text-[11px] text-cream/30 leading-relaxed">
          Interior Designer in Pune · Interior Design Baner · Interior Design Wakad · Modular Kitchen Pune · 2BHK Interior Design Pune · 3BHK Interior Design Pune · False Ceiling Designs Pune · Bedroom Interior Design Pune · Living Room Design Pune · Home Interior Cost Pune · Wardrobe Design Pune · Best Interior Designer Kharadi · Interior Designer Hinjewadi
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i}><Link href={it.href} data-cursor="link" className="text-cream/75 hover:text-[#F47B20]">{it.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
