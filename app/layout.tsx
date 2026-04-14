import type { Metadata } from 'next'
import { dmSerifDisplay, plusJakartaSans, jetbrainsMono } from '@/lib/fonts'
import { Nav } from '@/components/nav/Nav'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { ShootingStar } from '@/components/ui/ShootingStar'
import { siteConfig } from '@/data/site'
import './globals.css'

export const metadata: Metadata = {
  title: `${siteConfig.name} — Portfolio`,
  description: siteConfig.heroStatement,
  openGraph: {
    title: `${siteConfig.name} — Portfolio`,
    description: siteConfig.heroStatement,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text-base font-sans antialiased">

        {/* ── Global atmosphere ─────────────────────────────────────────────
            Fixed layer — persists across all sections during scroll.
            Stars are intentionally visible but never distracting.        */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>

          {/* Layered gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 75% 55% at 15% 8%, rgba(15,122,122,0.12) 0%, transparent 60%),
                radial-gradient(ellipse 55% 45% at 88% 85%, rgba(74,159,174,0.07) 0%, transparent 55%),
                linear-gradient(170deg, #0D1E35 0%, #0A1628 45%, #08121E 100%)
              `,
            }}
          />

          {/* Primary watermark star — upper right, clockwise, more visible */}
          <div className="absolute top-[-10%] right-[-6%]">
            <WatermarkStar size={860} color="#0F7A7A" direction={1}  duration={250} opacity={0.065} />
          </div>

          {/* Secondary watermark star — lower left, CCW, larger */}
          <div className="absolute bottom-[-20%] left-[-14%]">
            <WatermarkStar size={1060} color="#4A9FAE" direction={-1} duration={310} opacity={0.038} />
          </div>

          {/* Tertiary star — mid-page right, small, slow */}
          <div className="absolute top-[42%] right-[2%]">
            <WatermarkStar size={280} color="#C4974A" direction={1}  duration={180} opacity={0.055} />
          </div>

          {/* Shooting stars — negative delays phase each into its cycle immediately.
              Stars 1+3 fire on load; stars 2, 4, 5 fire within ~4-5 seconds.    */}
          <div className="absolute inset-0">
            <ShootingStar startX="7%"  startY="16%" angle={30} duration={12} delay={-2}  />
            <ShootingStar startX="68%" startY="9%"  angle={28} duration={14} delay={-10} />
            <ShootingStar startX="22%" startY="6%"  angle={32} duration={16} delay={-4}  />
            <ShootingStar startX="52%" startY="22%" angle={25} duration={11} delay={-7}  />
            <ShootingStar startX="85%" startY="14%" angle={34} duration={18} delay={-13} />
          </div>
        </div>

        <div className="relative z-10">
          <Nav />
          {children}
        </div>

      </body>
    </html>
  )
}
