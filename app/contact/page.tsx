import { ContactSection } from '@/components/sections/ContactSection'
import { siteConfig } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: siteConfig.currentlyOpen,
}

export default function ContactPage() {
  return (
    <main className="pt-16 min-h-screen flex items-start">
      <ContactSection />
    </main>
  )
}
