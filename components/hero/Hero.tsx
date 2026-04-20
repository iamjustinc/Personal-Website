import { HeroText } from './HeroText'
import { HeroVisual } from './HeroVisual'
import { StarMark } from '@/components/ui/StarMark'
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
import { Starburst } from '@/components/ui/Starburst'
import { ShootingStar } from '@/components/ui/ShootingStar'

/**
 * Hero section: cinematic dark opening.
 * Left: editorial text stack + CTAs.
 * Right: orbital portrait + floating panels.
 *
 * PERF NOTE — compositor layer budget:
 *   ShootingStars (4)  × will-change:transform,opacity  =  4 layers
 *   Twinkling stars (3) — no will-change on tiny spans   =  0 promoted
 *   Starbursts (3) — opacity-only pulse, no will-change  =  0 promoted
 *   Constellations + arc SVG — fully static              =  0
 *   Depth glow pools — static CSS backgrounds            =  0
 *   ──────────────────────────────────────────────────────────────────
 *   Hero-specific layers: 4  (vs 20+ before)
 *
 * Shooting stars were cut from 12 → 4. Visual density is compensated
 * by richer static elements: more StarField pinpoints, two depth glow
 * pools, and a second Constellation in the lower-left.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh flex items-center pt-20 pb-16 relative"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none overflow-hidden">

        {/* ── Depth glow pools ────────────────────────────────────────────
            Completely static radial gradients. Zero animation, zero cost.
            These give the empty dark corners atmospheric cosmic depth. */}
        <div
          className="absolute hidden lg:block"
          style={{
            right: '-8%',
            top: '-12%',
            width: 560,
            height: 440,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(74,159,174,0.060) 0%, rgba(15,122,122,0.028) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute hidden md:block"
          style={{
            left: '-10%',
            bottom: '-4%',
            width: 420,
            height: 340,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(196,151,74,0.040) 0%, rgba(15,122,122,0.018) 42%, transparent 70%)',
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            left: '30%',
            top: '-8%',
            width: 340,
            height: 260,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(126,231,242,0.030) 0%, transparent 68%)',
          }}
        />

        {/* ── Shooting stars ──────────────────────────────────────────────
            Trimmed to 4 from 12. Each has will-change:transform,opacity
            so every instance costs a compositor layer. 4 is the right
            balance: active night-sky feeling without GPU pressure.
            Kept the 3 most opaque always-visible + 1 right-side on sm+. */}
        <div className="absolute inset-0">
          <ShootingStar
            startX="4%"  startY="18%" angle={27} duration={13.5} delay={-3.4}
            scale={0.86}  opacity={0.62}
          />
          <ShootingStar
            startX="38%" startY="8%"  angle={31} duration={17}   delay={-10.2}
            scale={1.08}  opacity={0.50}
          />
          <ShootingStar
            startX="55%" startY="20%" angle={34} duration={15.5} delay={-1.2}
            scale={0.78}  opacity={0.46}
          />
          <ShootingStar
            startX="82%" startY="14%" angle={36} duration={19}   delay={-15.6}
            scale={0.72}  opacity={0.42}
            className="hidden sm:block"
          />
        </div>

        {/* ── Star field ──────────────────────────────────────────────────
            26 pinpoints in three deliberate clusters. Only 3 twinkle (no
            will-change on tiny spans = zero compositor promotion). The
            rest are static — they add density at zero runtime cost.

            Cluster A — left side (11 stars)
            Cluster B — upper-center to right (8 stars)
            Cluster C — bottom band + far edges (7 stars)            */}
        <StarField
          stars={[
            /* ─ Cluster A: left atmosphere ─ */
            { x: '4%',  y: '22%', size: 1.5, color: '#F4D58D', opacity: 0.50, halo: 1.9 },
            { x: '6%',  y: '8%',  size: 1.8, color: '#F4D58D', opacity: 0.52, halo: 2.0 },
            { x: '7%',  y: '54%', size: 1.2, color: '#7EE7F2', opacity: 0.42, halo: 1.4,
              twinkle: true, delay: 0.4, duration: 4.8 },
            { x: '10%', y: '73%', size: 2.2, color: '#7EE7F2', opacity: 0.44, halo: 2.4 },
            { x: '12%', y: '40%', size: 1.2, color: '#E6EEF2', opacity: 0.28, halo: 1.1 },
            { x: '16%', y: '29%', size: 1.0, color: '#A8C5D1', opacity: 0.34, halo: 1.2 },
            { x: '19%', y: '62%', size: 1.5, color: '#F4D58D', opacity: 0.30, halo: 1.3 },
            { x: '24%', y: '18%', size: 1.5, color: '#7EE7F2', opacity: 0.42, halo: 1.5 },
            { x: '27%', y: '48%', size: 1.0, color: '#7EE7F2', opacity: 0.26, halo: 1.0 },
            { x: '33%', y: '80%', size: 1.0, color: '#E6EEF2', opacity: 0.32, halo: 1.2 },
            { x: '3%',  y: '88%', size: 1.5, color: '#7EE7F2', opacity: 0.36, halo: 1.4 },

            /* ─ Cluster B: upper center + right ─ */
            { x: '41%', y: '38%', size: 1.2, color: '#F4D58D', opacity: 0.36, halo: 1.5 },
            { x: '44%', y: '12%', size: 1.0, color: '#E6EEF2', opacity: 0.30, halo: 1.1 },
            { x: '58%', y: '17%', size: 1.0, color: '#E6EEF2', opacity: 0.28, halo: 1.1 },
            { x: '62%', y: '43%', size: 1.2, color: '#7EE7F2', opacity: 0.24, halo: 1.0 },
            { x: '70%', y: '28%', size: 1.8, color: '#7EE7F2', opacity: 0.34, halo: 1.6 },
            { x: '84%', y: '19%', size: 1.2, color: '#F4D58D', opacity: 0.40, halo: 1.8,
              twinkle: true, delay: 3.1, duration: 6.0 },
            { x: '96%', y: '14%', size: 1.5, color: '#E6EEF2', opacity: 0.40, halo: 1.6 },

            /* ─ Cluster C: lower band + far edges ─ */
            { x: '48%', y: '70%', size: 1.0, color: '#7EE7F2', opacity: 0.30, halo: 1.2 },
            { x: '52%', y: '94%', size: 1.0, color: '#A8C5D1', opacity: 0.28, halo: 1.0 },
            { x: '75%', y: '88%', size: 1.2, color: '#C4974A', opacity: 0.32, halo: 1.3 },
            { x: '76%', y: '55%', size: 1.0, color: '#A8C5D1', opacity: 0.28, halo: 1.1 },
            { x: '79%', y: '70%', size: 1.4, color: '#F4D58D', opacity: 0.24, halo: 1.1 },
            { x: '89%', y: '45%', size: 1.0, color: '#7EE7F2', opacity: 0.30, halo: 1.1 },
            { x: '91%', y: '30%', size: 1.3, color: '#E6EEF2', opacity: 0.24, halo: 1.1,
              twinkle: true, delay: 1.7, duration: 5.8 },
            { x: '94%', y: '73%', size: 1.5, color: '#E6EEF2', opacity: 0.28, halo: 1.3 },
          ]}
        />

        {/* Ambient StarMark accents (very faint, no animation) */}
        <div className="absolute top-[20%] left-[2%] text-accent opacity-[0.08]">
          <StarMark size="md" />
        </div>
        <div className="absolute bottom-[20%] left-[6%] opacity-[0.06]" style={{ color: '#C4974A' }}>
          <StarMark size="sm" />
        </div>

        {/* ── Starbursts ──────────────────────────────────────────────────
            3 total: one per major empty zone.
            Pulse is now opacity-only (no scale) so no compositor layer. */}
        <div className="absolute left-[10%] top-[33%] hidden sm:block">
          <Starburst size="md" color="#F4D58D" opacity={0.54} pulse delay={0.4} duration={6.5} />
        </div>
        <div className="absolute right-[14%] top-[16%] hidden lg:block">
          <Starburst size="sm" color="#7EE7F2" haloColor="#4A9FAE" opacity={0.48} pulse delay={2.1} duration={7.2} />
        </div>
        <div className="absolute right-[7%] bottom-[22%] hidden lg:block">
          <Starburst size="sm" color="#E6EEF2" haloColor="#7EE7F2" opacity={0.34} />
        </div>

        {/* ── Orbital arc traces ──────────────────────────────────────────
            Two faint dashed curves. Completely static SVG — zero cost.
            Upper-right: echoes the portrait orbit language.
            Slightly wider spread to fill more of the negative space.    */}
        <svg
          className="absolute right-[2%] top-[20%] hidden h-[320px] w-[520px] opacity-[0.28] lg:block"
          viewBox="0 0 520 320"
          fill="none"
        >
          <path
            d="M28 218 C128 104 268 50 492 82"
            stroke="rgba(126,231,242,0.52)"
            strokeWidth="1"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          <path
            d="M124 266 C228 160 344 132 508 168"
            stroke="rgba(196,151,74,0.36)"
            strokeWidth="1"
            strokeDasharray="1 14"
            strokeLinecap="round"
          />
          {/* Third faint inner arc for extra depth */}
          <path
            d="M72 176 C188 96 298 72 500 116"
            stroke="rgba(74,159,174,0.22)"
            strokeWidth="0.75"
            strokeDasharray="1.5 18"
            strokeLinecap="round"
          />
        </svg>

        {/* ── Constellations ──────────────────────────────────────────────
            Two intentional star maps, one per empty quadrant.
            Top-right (teal, 5-point) + bottom-left (gold, 4-point).
            Mirror each other compositionally — asymmetric but balanced. */}

        {/* Top-right constellation */}
        <div className="absolute right-[12%] top-[31%] hidden lg:block">
          <Constellation
            width={210}
            height={116}
            color="#7EE7F2"
            lineOpacity={0.26}
            pointOpacity={0.78}
            points={[
              { x: 12,  y: 82, size: 1.3 },
              { x: 52,  y: 42, size: 1.9, twinkle: true, delay: 0.8 },
              { x: 104, y: 28, size: 1.5 },
              { x: 152, y: 56, size: 1.2 },
              { x: 198, y: 22, size: 1.6 },
            ]}
            connections={[[0, 1], [1, 2], [2, 3], [3, 4]]}
          />
        </div>

        {/* Bottom-left constellation — gold tone, 4 points */}
        <div className="absolute left-[6%] bottom-[20%] hidden lg:block">
          <Constellation
            width={112}
            height={64}
            color="#C4974A"
            lineOpacity={0.22}
            pointOpacity={0.68}
            points={[
              { x: 8,   y: 48, size: 1.3 },
              { x: 40,  y: 18, size: 1.7, twinkle: true, delay: 2.4 },
              { x: 76,  y: 36, size: 1.3 },
              { x: 104, y: 10, size: 1.1 },
            ]}
            connections={[[0, 1], [1, 2], [2, 3]]}
          />
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
