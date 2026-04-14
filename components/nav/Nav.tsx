'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StarMark } from '@/components/ui/StarMark'
import { MobileMenu } from './MobileMenu'
import { siteConfig } from '@/data/site'

const navLinks = [
  { label: 'Work',    href: '/work',    download: false },
  { label: 'About',   href: '/about',   download: false },
  { label: 'Resume',  href: siteConfig.resumeUrl, download: true  },
  { label: 'Contact', href: '/contact', download: false },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* ── Fixed centering wrapper — owns position, never animated ──────── */}
      <div
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5 pointer-events-none"
        aria-label="Site header"
      >
        {/* ── Motion element — owns animation only, no positioning transform */}
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1160px] pointer-events-auto"
        >
          <div
            className="relative rounded-3xl"
            style={{
              background: 'rgba(10,24,44,0.82)',
              backdropFilter: 'blur(36px) saturate(180%)',
              WebkitBackdropFilter: 'blur(36px) saturate(180%)',
              border: '1px solid rgba(15,122,122,0.28)',
              boxShadow:
                '0 8px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(15,122,122,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 24px rgba(15,122,122,0.05)',
            }}
          >
            <div className="relative px-5 py-1.5 flex items-center justify-between">

              {/* ── Brand — bare logo, no box, no text ─────────────────── */}
              <motion.div
                whileHover={{ scale: 1.06, opacity: 0.85 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="shrink-0 z-10"
              >
                <Link href="/" aria-label={`${siteConfig.name} — home`}>
                  {siteConfig.logoSrc ? (
                    <Image
                      src={siteConfig.logoSrc}
                      alt={`${siteConfig.name} logo`}
                      width={100}
                      height={100}
                      className="object-contain"
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
              </motion.div>

              {/* ── Nav links — absolutely centered in the pill ─────────── */}
              <nav
                className="hidden md:flex absolute left-1/2 top-1/2 items-center gap-5"
                style={{ transform: 'translate(-50%, -50%)' }}
                aria-label="Main navigation"
              >
                {navLinks.map(({ label, href, download }, idx) => {
                  const isActive = !download && pathname === href
                  return (
                    <div key={label} className="flex items-center gap-5">
                      {idx > 0 && (
                        <span aria-hidden className="text-text-muted opacity-20">
                          <StarMark size="xs" color="rgba(15,122,122,0.35)" />
                        </span>
                      )}
                      <a
                        href={href}
                        download={download || undefined}
                        className={cn(
                          'relative group font-sans text-[13.5px] font-medium transition-colors duration-200 pb-0.5',
                          isActive
                            ? 'text-text-base'
                            : 'text-text-muted hover:text-text-base',
                        )}
                      >
                        {label}
                        {/* Active underline indicator */}
                        <span
                          className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-300"
                          style={{
                            background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            opacity: isActive ? 1 : 0,
                          }}
                        />
                        {/* Hover underline */}
                        <span
                          className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-200 opacity-0 group-hover:opacity-35"
                          style={{
                            background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                          }}
                        />
                      </a>
                    </div>
                  )
                })}
              </nav>

              {/* ── Mobile hamburger (hidden md+) ──────────────────────── */}
              <div className="shrink-0 z-10">
                <button
                  className="md:hidden p-2 -mr-1 text-text-muted hover:text-text-base transition-colors rounded-btn"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open navigation menu"
                >
                  <Menu size={20} />
                </button>
              </div>

            </div>
          </div>
        </motion.header>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
