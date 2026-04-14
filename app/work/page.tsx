import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { siteConfig } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: 'Projects built at the intersection of technical systems and real human workflows.',
}

export default function WorkPage() {
  return (
    <main className="pt-28 min-h-screen">
      <ProjectsSection />
    </main>
  )
}
