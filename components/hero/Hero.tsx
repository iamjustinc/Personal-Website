import { HeroText } from './HeroText'
import { HeroFloatingPanels } from './HeroFloatingPanels'
import { StarMark } from '@/components/ui/StarMark'

/**
 * Hero section — full viewport, left-aligned two-column on desktop.
 * Left: animated editorial text stack + CTAs.
 * Right: floating UI panels composition (desktop only).
 *
 * Ambient star marks are scattered at low opacity — present as texture,
 * never competing with the content hierarchy.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh bg-bg flex items-center pt-16 relative overflow-hidden"
    >
      {/* ── Ambient star decorations ──────────────────────────────────────── */}
      {/* These are purely decorative. opacity keeps them as texture, not feature. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
        {/* Top-right corner — large, very faint */}
        <div className="absolute top-[12%] right-[8%] text-accent opacity-[0.12]">
          <StarMark size="lg" />
        </div>
        {/* Mid-left — medium, slightly warmer gold */}
        <div className="absolute top-[55%] left-[3%] opacity-[0.10]" style={{ color: '#C4974A' }}>
          <StarMark size="md" />
        </div>
        {/* Bottom-right — small, teal */}
        <div className="absolute bottom-[14%] right-[3%] text-accent opacity-[0.09]">
          <StarMark size="sm" />
        </div>
        {/* Upper-left — tiny, gold */}
        <div className="absolute top-[28%] left-[14%] opacity-[0.08]" style={{ color: '#C4974A' }}>
          <StarMark size="xs" />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 w-full py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-[55fr_45fr] gap-16 lg:gap-20 items-center">

          {/* Left: text */}
          <HeroText />

          {/* Right: floating panels — desktop only, hidden on mobile */}
          <div className="hidden md:block" aria-hidden>
            <HeroFloatingPanels />
          </div>

        </div>
      </div>
    </section>
  )
}
