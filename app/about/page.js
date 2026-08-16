import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LeadForm from '@/components/LeadForm'

export const metadata = {
  title: 'About Us · 3 Bricks · Pune',
  description: '3 Bricks is a boutique interior design studio based in Camp, Pune. We do residential interiors, modular kitchens, commercial spaces, government projects, architecture and landscaping.',
}

export default function AboutPage() {
  return (
    <SiteChrome>
      <SiteNav />
      <main className="bg-[#F8F5F0] pt-20">

        {/* Hero */}
        <section className="py-24 md:py-36 px-6 md:px-10 bg-[#1E1E1E] text-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">— About Us</div>
            <h1 className="font-serif-display text-5xl sm:text-6xl md:text-8xl leading-[1.02] mb-8">
              A studio that puts<br />
              <span className="italic text-[#F47B20]">you first — always.</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
              We are not a catalogue. We are a team of designers who listen before we design.
              No rotating staff. No surprise bills. No missed deadlines.
              Just beautiful spaces, delivered the way they were promised.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 md:py-28 px-6 md:px-10">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6">— Our Story</div>
              <h2 className="font-serif-display text-4xl md:text-5xl mb-6 leading-tight">
                Founded on one belief
              </h2>
              <p className="text-black/70 leading-relaxed mb-5">
                3 Bricks was built because Ryan and Akash believed the interior design industry in Pune was broken.
                Big brands promised beautiful homes and delivered assembly-line products. Clients were passed between
                rotating designers, surprised by hidden costs, and left waiting months past promised deadlines.
              </p>
              <p className="text-black/70 leading-relaxed mb-5">
                So they started a different kind of studio. One where every client gets a single dedicated designer
                from day one to handover. Where pricing is transparent and in writing before a single nail goes in.
                Where deadlines are real commitments — not estimates.
              </p>
              <p className="text-black/70 leading-relaxed">
                Based out of Camp, Pune — we work across the city's fastest-growing residential pockets:
                Baner, Wakad, Kharadi, Hinjewadi, Viman Nagar, and beyond. From 1BHK fit-outs to government
                office renovations, the standard never changes.
              </p>
            </div>
            <div className="bg-[#E8E4DE] rounded-lg aspect-[4/5] flex items-center justify-center">
              {/* Replace with actual studio/team photo */}
              <p className="text-black/30 text-sm text-center px-6">Studio photo coming soon</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6 text-center">— What We Stand For</div>
            <h2 className="font-serif-display text-4xl md:text-5xl text-center mb-14">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Personal Attention',
                  desc: 'One dedicated designer throughout your entire project. The same person who heard your vision is the same person who delivers it.'
                },
                {
                  icon: '💰',
                  title: 'Transparent Pricing',
                  desc: 'Every rupee is accounted for before work begins. No surprise additions at the end. What we quote is what you pay.'
                },
                {
                  icon: '📅',
                  title: 'On-Time Delivery',
                  desc: 'We set realistic timelines and we stick to them. Deadline extensions are the #1 complaint with big interior brands. Not here.'
                },
              ].map((v) => (
                <div key={v.title} className="text-center p-8 rounded-lg border border-black/8 hover:border-[#F47B20]/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-serif-display text-2xl mb-3">{v.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-[#1E1E1E] text-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-serif-display text-4xl md:text-5xl text-center mb-14">
              In <span className="italic text-[#F47B20]">Numbers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                ['150+', 'Projects Delivered'],
                ['8+', 'Years in Pune'],
                ['98%', 'On-Time Delivery'],
                ['15+', 'Government Projects'],
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="font-serif-display text-5xl md:text-6xl text-[#F47B20]">{num}</div>
                  <div className="text-white/60 text-sm mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 md:py-28 px-6 md:px-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6">— Our Services</div>
            <h2 className="font-serif-display text-4xl md:text-5xl mb-10">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Residential Interiors', desc: 'Full home design for apartments, villas, and independent houses across Pune. From bare shell to move-in ready.' },
                { title: 'Modular Kitchen & Wardrobe', desc: 'Functional, beautiful kitchens and wardrobes designed around how you actually live — not just how they look in a showroom.' },
                { title: 'Commercial & Cafe Interiors', desc: 'Offices, co-working spaces, cafes, and retail — we design commercial spaces that work hard and look great.' },
                { title: 'Government Office Renovation', desc: 'We have successfully delivered multiple government tender projects across Pune. Strict timelines, clean paperwork, zero wobbles.' },
                { title: 'Architecture', desc: 'From concept to completion — structural and architectural design services for residential and commercial projects.' },
                { title: 'Landscaping', desc: 'Outdoor spaces deserve as much attention as indoor ones. Gardens, terraces, and landscape design for homes and commercial properties.' },
              ].map((s) => (
                <div key={s.title} className="p-6 rounded-lg border border-black/8 hover:border-[#F47B20]/40 hover:shadow-md transition-all duration-300">
                  <h3 className="font-serif-display text-xl mb-2 text-[#F47B20]">{s.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Details */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-start">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-black/50 mb-6">— Visit Us</div>
              <h2 className="font-serif-display text-4xl md:text-5xl mb-8">Our Studio</h2>
              <div className="space-y-4 text-black/70">
                <div>
                  <div className="text-xs uppercase tracking-wider text-black/40 mb-1">Address</div>
                  <div>Office No. 404, 4th Floor, 1MG Road,<br />beside George Restaurant, Camp,<br />Pune, Maharashtra 411001</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-black/40 mb-1">Phone</div>
                  <a href="tel:+919545250565" className="hover:text-[#F47B20] transition-colors">+91 95452 50565</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-black/40 mb-1">Instagram</div>
                  <a href="https://www.instagram.com/_you_1st_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F47B20] transition-colors">@3bricksinteriors</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-black/40 mb-1">Working Hours</div>
                  <div>Monday – Saturday: 10:00 AM – 7:00 PM<br />Sunday: By Appointment Only</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="tel:+919545250565"
                  className="bg-[#F47B20] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#D9631A] transition-colors">
                  Call Us Now
                </a>
                <a href="https://wa.me/919545250565?text=Hi, I'm interested in interior design for my home in Pune."
                  target="_blank" rel="noopener noreferrer"
                  className="border border-black/20 text-black px-6 py-3 rounded-full text-sm font-medium hover:border-[#F47B20] hover:text-[#F47B20] transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-80 md:h-96">
              <iframe
                src="https://maps.google.com/maps?q=Office+No.404,+4th+Floor,+1MG+Road,+beside+George+Restaurant,+Camp,+Pune,+Maharashtra+411001&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="3 Bricks Studio Location"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-[#F47B20] text-white">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-serif-display text-4xl md:text-6xl mb-6">
              Ready to start your project?
            </h2>
            <p className="text-white/85 mb-10 text-lg">
              Free site visit. Honest quote. No pressure.
            </p>
            <LeadForm source="about_page_form" submitLabel="Book Free Consultation →" dark={false} />
          </div>
        </section>

      </main>
      <SiteFooter />
    </SiteChrome>
  )
}