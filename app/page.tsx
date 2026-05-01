import { Hero } from '@/components/hero/Hero'
import { RecruiterSnapshotSection } from '@/components/sections/RecruiterSnapshotSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

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
