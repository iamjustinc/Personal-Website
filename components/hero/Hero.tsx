import { HeroText } from './HeroText'
import { HeroFloatingPanels } from './HeroFloatingPanels'

/**
 * Hero section — full viewport, left-aligned two-column on desktop.
 * Left: animated editorial text stack + CTAs.
 * Right: floating UI panels composition (desktop only).
 *
 * Padding is generous — the hero needs air to feel premium.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh bg-bg flex items-center pt-16"
    >
      <div className="mx-auto max-w-[1200px] px-6 w-full py-20 md:py-28">
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
