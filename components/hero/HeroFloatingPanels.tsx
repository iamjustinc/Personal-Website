'use client'

import { FloatingPanel } from './FloatingPanel'
import { siteConfig } from '@/data/site'

/**
 * Three floating UI panels that frame the hero section on desktop.
 * Panel positions, sizes, and float animations are fixed layout decisions.
 * Panel content is driven by siteConfig.heroFloatingPanels.
 */
export function HeroFloatingPanels() {
  const panels = siteConfig.heroFloatingPanels
  if (!panels?.length) return null

  return (
    <div className="relative w-full h-[480px]">
      {/* Panel A — large, top right */}
      {panels[0] && (
        <FloatingPanel
          projectName={panels[0].projectName}
          accentColor={panels[0].accentColor}
          imageSrc={panels[0].imageSrc}
          size="lg"
          animClass="animate-float1"
          className="top-0 right-0"
          delay={0.5}
        />
      )}

      {/* Panel B — medium, center left, slightly overlaps A */}
      {panels[1] && (
        <FloatingPanel
          projectName={panels[1].projectName}
          accentColor={panels[1].accentColor}
          imageSrc={panels[1].imageSrc}
          size="md"
          animClass="animate-float2"
          className="top-[15%] left-[-5%]"
          delay={0.65}
        />
      )}

      {/* Panel C — small, bottom right */}
      {panels[2] && (
        <FloatingPanel
          projectName={panels[2].projectName}
          accentColor={panels[2].accentColor}
          imageSrc={panels[2].imageSrc}
          size="sm"
          animClass="animate-float3"
          className="bottom-[5%] right-[8%]"
          delay={0.8}
        />
      )}
    </div>
  )
}
