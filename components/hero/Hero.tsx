import { HeroText } from './HeroText'
import { HeroVisual } from './HeroVisual'
import { StarMark } from '@/components/ui/StarMark'

/**
 * Hero section — cinematic dark opening.
 * Left: editorial text stack + CTAs.
 * Right: Kestrel large frame + Quail/Chirpie secondary tiles.
 *
 * Ambient stars on the left side add depth without visual noise.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh flex items-center pt-20 pb-16 relative"
    >
      {/* Subtle ambient stars — left-side atmosphere only */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] left-[2%] text-accent opacity-[0.08]">
          <StarMark size="md" />
        </div>
        <div className="absolute bottom-[20%] left-[6%] opacity-[0.06]" style={{ color: '#C4974A' }}>
          <StarMark size="sm" />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 w-full">
        <div className="grid md:grid-cols-[52fr_48fr] gap-14 lg:gap-20 items-center">
          <HeroText />
          <div className="hidden md:block">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
