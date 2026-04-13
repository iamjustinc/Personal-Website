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

        {/* ── Global dark atmosphere ─────────────────────────────────────── */}
        {/* Fixed so it persists across all sections during scroll */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>

          {/* Layered radial gradients — depth without heavy GPU cost */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 20% 10%, rgba(15,122,122,0.10) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 85% 80%, rgba(74,159,174,0.06) 0%, transparent 60%),
                linear-gradient(165deg, #0D1E35 0%, #0A1628 50%, #081422 100%)
              `,
            }}
          />

          {/* Watermark star — upper right, large, very slow clockwise */}
          <div className="absolute top-[-12%] right-[-8%]">
            <WatermarkStar size={820} color="#0F7A7A" direction={1}  duration={260} opacity={0.042} />
          </div>

          {/* Watermark star — lower left, counter-clockwise, slightly larger */}
          <div className="absolute bottom-[-18%] left-[-12%]">
            <WatermarkStar size={1000} color="#4A9FAE" direction={-1} duration={320} opacity={0.030} />
          </div>

          {/* Shooting stars — two instances, long delays so they feel rare */}
          <div className="overflow-hidden absolute inset-0">
            <ShootingStar startX="8%"  startY="18%" angle={30} duration={16} delay={2}  />
            <ShootingStar startX="72%" startY="10%" angle={28} duration={18} delay={10} />
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
