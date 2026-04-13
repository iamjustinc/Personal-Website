import { Hero } from '@/components/hero/Hero'
import { CapabilityStrip } from '@/components/sections/CapabilityStrip'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CareerSection } from '@/components/sections/CareerSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { siteConfig } from '@/data/site'

export default function Home() {
  return (
    <main>
      <Hero />
      {siteConfig.showCapabilityStrip && <CapabilityStrip />}
      <ProjectsSection />
      <CareerSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
