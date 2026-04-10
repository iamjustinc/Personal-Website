'use client'

import { FloatingPanel } from './FloatingPanel'
import { siteConfig } from '@/data/site'

/**
 * Panel composition rules:
 *
 * Three panels arranged in a loose diagonal — top-right to bottom-center-right.
 * They overlap to create genuine depth, not just a spread layout.
 *
 * Depth hierarchy (visual "closeness"):
 *   Panel A (lg, z-30) → deepest shadow, first in z-stack, feels nearest
 *   Panel B (md, z-20) → standard shadow, partially behind A
 *   Panel C (sm, z-10) → lightest shadow, background, feels farthest
 *
 * Float animations use different speeds and phase offsets so they
 * never move in sync — which would look mechanical.
 *
 * Entrance delays are staggered so panels reveal sequentially
 * rather than all appearing at once.
 */
export function HeroFloatingPanels() {
  const panels = siteConfig.heroFloatingPanels
  if (!panels?.length) return null

  return (
    <div className="relative w-full h-[500px]">

      {/* Panel A — large, top right, closest to viewer */}
      {panels[0] && (
        <FloatingPanel
          projectName={panels[0].projectName}
          accentColor={panels[0].accentColor}
          imageSrc={panels[0].imageSrc}
          size="lg"
          animClass="animate-float1"
          shadowClass="shadow-panel-deep"
          className="top-2 right-0 z-30"
          delay={0.4}
        />
      )}

      {/* Panel B — medium, mid-left, overlaps A slightly at its bottom edge */}
      {panels[1] && (
        <FloatingPanel
          projectName={panels[1].projectName}
          accentColor={panels[1].accentColor}
          imageSrc={panels[1].imageSrc}
          size="md"
          animClass="animate-float2"
          shadowClass="shadow-panel"
          className="top-[32%] left-[4%] z-20"
          delay={0.55}
        />
      )}

      {/* Panel C — small, lower right, reads as background element */}
      {panels[2] && (
        <FloatingPanel
          projectName={panels[2].projectName}
          accentColor={panels[2].accentColor}
          imageSrc={panels[2].imageSrc}
          size="sm"
          animClass="animate-float3"
          shadowClass="shadow-panel-sm"
          className="bottom-[4%] right-[16%] z-10"
          delay={0.7}
        />
      )}

    </div>
  )
}
