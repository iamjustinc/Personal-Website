import { AboutSection } from '@/components/sections/AboutSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { siteConfig } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.aboutStatements[0],
}

export default function AboutPage() {
  return (
    <main className="pt-28 min-h-screen">
      <AboutSection />
      <CareerSection />
    </main>
  )
}
