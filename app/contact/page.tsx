import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: siteConfig.contactDescription,
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: siteConfig.contactDescription,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${siteConfig.name}`,
    description: siteConfig.contactDescription,
  },
}

export default function ContactPage() {
  return (
    <main className="pt-16 min-h-screen">
      <ContactSection mode="page" />
    </main>
  )
}
