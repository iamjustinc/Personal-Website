import type { Metadata } from 'next'
import { dmSerifDisplay, plusJakartaSans, jetbrainsMono } from '@/lib/fonts'
import { Nav } from '@/components/nav/Nav'
import { siteConfig } from '@/data/site'
import './globals.css'

export const metadata: Metadata = {
  title: `${siteConfig.name} — Portfolio`,
  description: siteConfig.heroStatement,
  openGraph: {
    title: `${siteConfig.name} — Portfolio`,
    description: siteConfig.heroStatement,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text-base font-sans antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
