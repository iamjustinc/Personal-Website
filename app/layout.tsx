import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/next'
import { dmSerifDisplay, plusJakartaSans, jetbrainsMono } from '@/lib/fonts'
import { Nav } from '@/components/nav/Nav'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarMark } from '@/components/ui/StarMark'
import { StarField } from '@/components/ui/StarField'
import { GlobalStarCursor } from '@/components/ui/GlobalStarCursor'
import { siteConfig } from '@/data/site'
import './globals.css'

export const metadata: Metadata = {
  title: `${siteConfig.name} | Portfolio`,
  description: siteConfig.heroStatement,
  icons: {
    icon: [{ url: '/star.png', type: 'image/png' }],
    shortcut: '/star.png',
    apple: '/star.png',
  },
  openGraph: {
    title: `${siteConfig.name} | Portfolio`,
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
            Fixed layer persists across all sections during scroll.
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

          <StarField
            className="opacity-75"
            stars={[
              { x: '5%', y: '18%', size: 1.5, color: '#F4D58D', opacity: 0.34, halo: 1.5 },
              { x: '12%', y: '48%', size: 1, color: '#7EE7F2', opacity: 0.30, halo: 1.2, twinkle: true, delay: 1.1, duration: 5.8 },
              { x: '18%', y: '78%', size: 1.5, color: '#A8C5D1', opacity: 0.24, halo: 1.1 },
              { x: '31%', y: '12%', size: 1, color: '#7EE7F2', opacity: 0.28, halo: 1.2 },
              { x: '44%', y: '68%', size: 1.5, color: '#E6EEF2', opacity: 0.22, halo: 1 },
              { x: '58%', y: '24%', size: 1, color: '#C4974A', opacity: 0.28, halo: 1.3 },
              { x: '67%', y: '84%', size: 1.5, color: '#7EE7F2', opacity: 0.26, halo: 1.2, twinkle: true, delay: 2.8, duration: 6.2 },
              { x: '82%', y: '36%', size: 1, color: '#E6EEF2', opacity: 0.24, halo: 1 },
              { x: '92%', y: '72%', size: 1.5, color: '#F4D58D', opacity: 0.30, halo: 1.4 },
            ]}
          />

          {/* Primary watermark star: upper right, clockwise, more visible */}
          <div className="absolute top-[-10%] right-[-6%]">
            <WatermarkStar size={860} color="#0F7A7A" direction={1} duration={250} opacity={0.065} />
          </div>

          {/* Deep-sky watermark: low left, quiet depth while scrolling */}
          <div className="absolute bottom-[-28%] left-[-20%]">
            <WatermarkStar size={760} color="#4A9FAE" direction={-1} duration={320} opacity={0.032} />
          </div>

          {/* Tertiary star: mid-page right, small, slow */}
          <div className="absolute top-[42%] right-[2%]">
            <WatermarkStar size={280} color="#C4974A" direction={1} duration={180} opacity={0.055} />
          </div>
        </div>

        <div className="relative z-10">
          {/* Global logo: non-floating, appears on every page */}
          <div className="absolute top-5 left-0 right-0 z-20 pointer-events-none">
            <div className="mx-auto flex w-full max-w-[1180px] px-5">
              <Link
                href="/"
                aria-label={`${siteConfig.name} home`}
                className="pointer-events-auto relative block h-12 w-[148px] overflow-visible"
              >
                {siteConfig.logoSrc ? (
                  <Image
                    src={siteConfig.logoSrc}
                    alt="Justin logo"
                    fill
                    sizes="400px"
                    quality={82}
                    className="object-contain object-left scale-[2.7] origin-left"
                    priority
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)' }}
                  >
                    <StarMark size="sm" color="white" />
                  </div>
                )}
              </Link>
            </div>
          </div>

          <GlobalStarCursor />
          <Nav />
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  )
}
