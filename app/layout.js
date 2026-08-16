import './globals.css'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Providers } from './providers'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  style: ['normal','italic'],
  variable: '--font-serif',
  display: 'swap'
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata = {
  title: '3 Bricks · Boutique Interior Design Studio · Pune',
  description: 'Boutique interior design for Pune homeowners. Personal. Precise. On time. Full home interiors, modular kitchens, bedrooms and commercial projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
