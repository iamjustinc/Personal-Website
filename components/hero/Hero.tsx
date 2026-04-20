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
      {/* Hero atmosphere: richest star density on the site, kept behind content */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0">
          <ShootingStar
            startX="4%"
            startY="18%"
            angle={27}
            duration={13.5}
            delay={-3.4}
            scale={0.86}
            opacity={0.62}
          />
          <ShootingStar
            startX="38%"
            startY="8%"
            angle={31}
            duration={17}
            delay={-10.2}
            scale={1.08}
            opacity={0.50}
          />
          <ShootingStar
            startX="82%"
            startY="14%"
            angle={36}
            duration={19}
            delay={-15.6}
            scale={0.72}
            opacity={0.42}
            className="hidden sm:block"
          />
          <ShootingStar
            startX="13%"
            startY="6%"
            angle={29}
            duration={21}
            delay={-7.8}
            scale={0.64}
            opacity={0.38}
            className="hidden sm:block"
          />
          <ShootingStar
            startX="55%"
            startY="20%"
            angle={34}
            duration={15.5}
            delay={-1.2}
            scale={0.78}
            opacity={0.46}
          />
          <ShootingStar
            startX="72%"
            startY="4%"
            angle={25}
            duration={23}
            delay={-18.4}
            scale={0.56}
            opacity={0.34}
            className="hidden md:block"
          />
          <ShootingStar
            startX="28%"
            startY="30%"
            angle={38}
            duration={18}
            delay={-12.9}
            scale={0.68}
            opacity={0.36}
            className="hidden lg:block"
          />
          <ShootingStar
            startX="6%"
            startY="9%"
            angle={33}
            duration={24}
            delay={-20.5}
            scale={0.52}
            opacity={0.30}
            className="hidden md:block"
          />
          <ShootingStar
            startX="46%"
            startY="2%"
            angle={28}
            duration={20}
            delay={-5.7}
            scale={0.60}
            opacity={0.34}
            className="hidden sm:block"
          />
          <ShootingStar
            startX="66%"
            startY="31%"
            angle={39}
            duration={22}
            delay={-16.1}
            scale={0.58}
            opacity={0.32}
            className="hidden lg:block"
          />
          <ShootingStar
            startX="90%"
            startY="7%"
            angle={30}
            duration={26}
            delay={-9.3}
            scale={0.48}
            opacity={0.28}
            className="hidden md:block"
          />
          <ShootingStar
            startX="18%"
            startY="24%"
            angle={35}
            duration={19}
            delay={-2.6}
            scale={0.54}
            opacity={0.31}
            className="hidden lg:block"
          />
        </div>

        <StarField
          className="opacity-95"
          stars={[
            { x: '4%', y: '22%', size: 1.5, color: '#F4D58D', opacity: 0.50, halo: 1.9 },
            { x: '7%', y: '54%', size: 1, color: '#7EE7F2', opacity: 0.40, halo: 1.4, twinkle: true, delay: 0.4, duration: 4.8 },
            { x: '10%', y: '73%', size: 2.2, color: '#7EE7F2', opacity: 0.44, halo: 2.4 },
            { x: '12%', y: '40%', size: 1.2, color: '#E6EEF2', opacity: 0.28, halo: 1.1 },
            { x: '16%', y: '29%', size: 1, color: '#A8C5D1', opacity: 0.34, halo: 1.2 },
            { x: '19%', y: '62%', size: 1.5, color: '#F4D58D', opacity: 0.30, halo: 1.3 },
            { x: '24%', y: '18%', size: 1.5, color: '#7EE7F2', opacity: 0.42, halo: 1.5 },
            { x: '27%', y: '48%', size: 1, color: '#7EE7F2', opacity: 0.26, halo: 1, twinkle: true, delay: 4.1, duration: 6.4 },
            { x: '33%', y: '80%', size: 1, color: '#E6EEF2', opacity: 0.32, halo: 1.2 },
            { x: '41%', y: '38%', size: 1.2, color: '#F4D58D', opacity: 0.36, halo: 1.5 },
            { x: '48%', y: '70%', size: 1, color: '#7EE7F2', opacity: 0.30, halo: 1.2, twinkle: true, delay: 2.2, duration: 5.4 },
            { x: '58%', y: '17%', size: 1, color: '#E6EEF2', opacity: 0.28, halo: 1.1 },
            { x: '62%', y: '43%', size: 1.2, color: '#7EE7F2', opacity: 0.24, halo: 1 },
            { x: '70%', y: '28%', size: 1.8, color: '#7EE7F2', opacity: 0.34, halo: 1.6 },
            { x: '76%', y: '55%', size: 1, color: '#A8C5D1', opacity: 0.28, halo: 1.1 },
            { x: '79%', y: '70%', size: 1.4, color: '#F4D58D', opacity: 0.24, halo: 1.1 },
            { x: '84%', y: '19%', size: 1.2, color: '#F4D58D', opacity: 0.40, halo: 1.8, twinkle: true, delay: 3.1, duration: 6 },
            { x: '89%', y: '45%', size: 1, color: '#7EE7F2', opacity: 0.30, halo: 1.1 },
            { x: '91%', y: '30%', size: 1.3, color: '#E6EEF2', opacity: 0.24, halo: 1.1, twinkle: true, delay: 1.7, duration: 5.8 },
            { x: '94%', y: '73%', size: 1.5, color: '#E6EEF2', opacity: 0.28, halo: 1.3 },
          ]}
        />

        <div className="absolute top-[20%] left-[2%] text-accent opacity-[0.08]">
          <StarMark size="md" />
        </div>
        <div className="absolute bottom-[20%] left-[6%] opacity-[0.06]" style={{ color: '#C4974A' }}>
          <StarMark size="sm" />
        </div>

        <div className="absolute left-[10%] top-[33%] hidden sm:block">
          <Starburst size="md" color="#F4D58D" opacity={0.54} pulse delay={0.4} duration={6.5} />
        </div>
        <div className="absolute right-[14%] top-[16%] hidden lg:block">
          <Starburst size="sm" color="#7EE7F2" haloColor="#4A9FAE" opacity={0.48} pulse delay={2.1} duration={7.2} />
        </div>
        <div className="absolute right-[7%] bottom-[22%] hidden lg:block">
          <Starburst size="sm" color="#E6EEF2" haloColor="#7EE7F2" opacity={0.34} />
        </div>

        <svg
          className="absolute right-[3%] top-[23%] hidden h-[280px] w-[460px] opacity-[0.24] lg:block"
          viewBox="0 0 460 280"
          fill="none"
        >
          <path
            d="M24 190 C112 92 235 44 428 72"
            stroke="rgba(126,231,242,0.48)"
            strokeWidth="1"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          <path
            d="M112 226 C202 138 304 116 444 146"
            stroke="rgba(196,151,74,0.34)"
            strokeWidth="1"
            strokeDasharray="1 14"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute right-[12%] top-[31%] hidden lg:block">
          <Constellation
            width={210}
            height={116}
            color="#7EE7F2"
            lineOpacity={0.24}
            pointOpacity={0.76}
            points={[
              { x: 12, y: 82, size: 1.3 },
              { x: 52, y: 42, size: 1.9, twinkle: true, delay: 0.8 },
              { x: 104, y: 28, size: 1.5 },
              { x: 152, y: 56, size: 1.2 },
              { x: 198, y: 22, size: 1.6 },
            ]}
            connections={[
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
            ]}
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
