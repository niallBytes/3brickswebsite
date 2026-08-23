import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Terms & Conditions · 3 Bricks · Pune',
  description: 'Terms and conditions for using the 3 Bricks Interior Design website and services.',
}

const SECTIONS = [
  {
    title: '1. Use of This Website',
    content: `This website is operated by 3 Bricks Interior Design, a boutique interior design studio based in Pune, Maharashtra, India.

By accessing and using this website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use this website.

This website is intended for informational purposes and to facilitate enquiries about our interior design services. It is not intended for use by minors under the age of 18 without parental consent.`
  },
  {
    title: '2. Estimate Calculator',
    content: `The "Get Free Estimate" calculator on this website provides indicative pricing based on the information you enter.

All estimates generated are:

- Approximate and indicative only — not final quotes
- Based on typical project spends for the selected BHK type, scope, and package
- Subject to change based on actual site conditions, material selections, finish quality, civil work required, and specific design requirements

A final, itemised quote will be provided only after a site visit by our designer. 3 Bricks Interior Design accepts no liability for any decisions made based solely on the estimate calculator output.`
  },
  {
    title: '3. Free Consultations',
    content: `Free site visits and consultations offered through this website are subject to:

- Designer availability in your area and on your preferred date
- Your property being located within our service area in Pune
- Confirmation by our team via phone or WhatsApp after you submit your details

A free consultation is an opportunity for our designer to understand your space and requirements. It does not constitute a commitment to proceed with any project, by either party.`
  },
  {
    title: '4. Intellectual Property',
    content: `All content on this website — including text, images, design concepts, layout, graphics, and project photographs — is the intellectual property of 3 Bricks Interior Design unless otherwise stated.

You may not reproduce, copy, distribute, or use any content from this website without prior written permission from 3 Bricks Interior Design.

Placeholder images sourced from third-party providers (such as Unsplash) are used under their respective licences and will be replaced with actual project photography over time.`
  },
  {
    title: '5. Limitation of Liability',
    content: `3 Bricks Interior Design makes every effort to ensure the accuracy of information on this website. However, we do not guarantee that all information is current, complete, or error-free.

We accept no liability for:

- Decisions made based on information or estimates from this website
- Any loss or damage arising from use of this website
- Third-party links or content referenced on this website
- Temporary unavailability of the website due to maintenance or technical issues`
  },
  {
    title: '6. Referral Programme',
    content: `Our referral programme allows existing clients and users to share a unique link and earn rewards when referred individuals complete a project with us.

Referral rewards are:
- Subject to the referred individual completing a paid project with 3 Bricks Interior Design
- Issued as Amazon vouchers or equivalent at our discretion
- Non-transferable and have no cash value
- Valid for 12 months from the date of issue

3 Bricks reserves the right to modify, suspend, or terminate the referral programme at any time.`
  },
  {
    title: '7. Changes to These Terms',
    content: `We reserve the right to update these terms and conditions at any time. Changes will be posted on this page with an updated date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.`
  },
  {
    title: '8. Governing Law',
    content: `These terms and conditions are governed by the laws of India. Any disputes arising from the use of this website or our services shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.`
  },
  {
    title: '9. Contact Us',
    content: `For any questions about these terms, please contact us:

3 Bricks Interior Design
Office No. 404, 4th Floor, 1MG Road,
beside George Restaurant, Camp,
Pune, Maharashtra 411001

Phone: +91 95452 50565
Instagram: @3bricksinteriors`
  },
]

export default function TermsPage() {
  return (
    <SiteChrome>
      <SiteNav />
      <main className="bg-[#F8F5F0] pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-[#1E1E1E] text-white">
          <div className="max-w-[800px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">— Legal</div>
            <h1 className="font-serif-display text-5xl md:text-7xl mb-4">Terms & Conditions</h1>
            <p className="text-white/60 text-sm">Last updated: August 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="max-w-[800px] mx-auto">
            <p className="text-black/70 leading-relaxed mb-12 text-lg">
              Please read these terms and conditions carefully before using the
              3 Bricks website or services. By accessing our website,
              you accept these terms in full.
            </p>
            <div className="space-y-12">
              {SECTIONS.map((s) => (
                <div key={s.title}>
                  <h2 className="font-serif-display text-2xl md:text-3xl text-[#1E1E1E] mb-4">
                    {s.title}
                  </h2>
                  <div className="text-black/65 leading-relaxed whitespace-pre-line text-[15px]">
                    {s.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </SiteChrome>
  )
}