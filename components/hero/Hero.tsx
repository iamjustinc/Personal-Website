import { HeroText } from './HeroText'
import { HeroFloatingPanels } from './HeroFloatingPanels'

/**
 * Hero section — full viewport, two-column on desktop.
 * Left: animated text + CTAs.
 * Right: floating UI panels (desktop only).
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh bg-bg flex items-center pt-16"
    >
      <div className="mx-auto max-w-[1200px] px-6 w-full py-16 md:py-24">
        <div className="grid md:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left: text content */}
          <HeroText />

          {/* Right: floating panels — desktop only */}
          <div className="hidden md:block">
            <HeroFloatingPanels />
          </div>
        </div>
      </div>
    </section>
  )
}
