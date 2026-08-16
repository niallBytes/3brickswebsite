import SiteChrome from '@/components/SiteChrome'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Privacy Policy · 3 Bricks · Pune',
  description: 'Privacy policy for 3 Bricks Interior Design, Pune. How we collect, use and protect your personal information.',
}

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `When you use our website or fill out any form, we may collect the following information:
    
- Your name, phone number, and email address
- Your property details — BHK type, area in Pune, approximate budget
- Project preferences — rooms to design, scope of work, possession timeline
- Floor plan files if you choose to upload them
- Your preferred consultation date, time, and mode

We collect this information only when you voluntarily provide it by filling out a form or using our estimate calculator.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information you provide solely to:

- Contact you regarding your interior design enquiry
- Schedule a free consultation or site visit at your home
- Send you relevant design ideas, portfolio updates, or project updates
- Prepare a design proposal specific to your home and requirements

We do not use your information for any purpose unrelated to your interior design project.`
  },
  {
    title: '3. We Do Not Sell Your Data',
    content: `Your personal information is never sold, rented, or shared with third parties for marketing purposes.

We may share your information only in the following limited circumstances:

- With our own design team members who are working on your project
- If required by law or a valid legal order

We will never share your data with advertisers, data brokers, or unrelated businesses.`
  },
  {
    title: '4. Data Storage and Security',
    content: `Your information is stored securely in our database. We take reasonable technical and organisational measures to protect your data against unauthorised access, loss, or misuse.

Floor plan files you upload are stored on our secure servers and are accessible only to our design team for the purpose of preparing your project proposal.

We retain your data for as long as is necessary to fulfil the purposes outlined in this policy, or as required by applicable law.`
  },
  {
    title: '5. Cookies',
    content: `Our website may use basic cookies to improve your browsing experience. These cookies do not collect personally identifiable information and are used only to remember your preferences during your visit.

You can choose to disable cookies through your browser settings. This will not affect your ability to use the core features of our website.`
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:

- Request a copy of the personal information we hold about you
- Request correction of any inaccurate information
- Request deletion of your personal information from our records
- Withdraw consent for us to contact you at any time

To exercise any of these rights, please contact us at the details below.`
  },
  {
    title: '7. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:

3 Bricks Interior Design
Office No. 404, 4th Floor, 1MG Road,
beside George Restaurant, Camp,
Pune, Maharashtra 411001

Phone: +91 95452 50565
Instagram: @3bricksinteriors`
  },
]

export default function PrivacyPolicyPage() {
  return (
    <SiteChrome>
      <SiteNav />
      <main className="bg-[#F8F5F0] pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-[#1E1E1E] text-white">
          <div className="max-w-[800px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">— Legal</div>
            <h1 className="font-serif-display text-5xl md:text-7xl mb-4">Privacy Policy</h1>
            <p className="text-white/60 text-sm">Last updated: August 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="max-w-[800px] mx-auto">
            <p className="text-black/70 leading-relaxed mb-12 text-lg">
              At 3 Bricks, we take your privacy seriously.
              This policy explains what information we collect, how we use it,
              and how we protect it. By using our website or submitting any form,
              you agree to the practices described below.
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