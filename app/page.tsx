import type { Metadata } from 'next'
import { Hero } from '@/components/hero/Hero'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { siteConfig } from '@/data/site'

const title = siteConfig.seoTitle
const description = siteConfig.seoDescription

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="-mt-16 md:-mt-20 lg:-mt-24">
        <ProjectsSection />
      </div>
      <AboutSection />
      <CareerSection/>
      <ContactSection />
    </main>
  )
}
