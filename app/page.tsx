import { Hero } from '@/components/hero/Hero'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <CareerSection/>
      <ContactSection />
    </main>
  )
}
