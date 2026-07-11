import type { Metadata } from 'next'
import { Hero } from '@/components/hero/Hero'
import { RecruiterSnapshotSection } from '@/components/sections/RecruiterSnapshotSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

const title = 'Justin Chang | Aspiring Associate Product Manager'
const description =
  'Justin Chang is an early-career product builder creating AI-native products across CRM, Salesforce, enterprise workflows, and data systems.'

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
        <RecruiterSnapshotSection />
        <ProjectsSection />
      </div>
      <AboutSection />
      <CareerSection/>
      <ContactSection />
    </main>
  )
}
