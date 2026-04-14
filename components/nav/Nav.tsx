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
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navShellStyle = {
    background: 'rgba(10,24,44,0.82)',
    backdropFilter: 'blur(36px) saturate(180%)',
    WebkitBackdropFilter: 'blur(36px) saturate(180%)',
    border: '1px solid rgba(15,122,122,0.28)',
    boxShadow:
      '0 8px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(15,122,122,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 24px rgba(15,122,122,0.05)',
  } as const

  return (
    <>
      <div
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5 pointer-events-none"
        aria-label="Site header"
      >
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1120px] pointer-events-auto"
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            {/* Logo — outside the nav bar */}
            <motion.div
              whileHover={{ scale: 1.06, opacity: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="shrink-0 z-10 flex items-center"
            >
              <Link
                href="/"
                aria-label={`${siteConfig.name} — home`}
                className="relative block h-10 w-[118px] overflow-visible"
              >
                {siteConfig.logoSrc ? (
                  <Image
                    src={siteConfig.logoSrc}
                    alt="Justin logo"
                    fill
                    className="object-contain object-left scale-[2.2] origin-left"
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

            {/* Desktop nav bar */}
            <div className="hidden md:flex justify-center">
              <div
                className="relative w-full max-w-[860px] rounded-3xl"
                style={navShellStyle}
              >
                <div className="relative px-8 py-2 flex items-center justify-center">
                  <nav
                    className="flex items-center gap-8 lg:gap-10"
                    aria-label="Main navigation"
                  >
                    {navLinks.map(({ label, href }, idx) => {
                      const isActive = pathname === href

                      return (
                        <div key={label} className="flex items-center gap-8 lg:gap-10">
                          {idx > 0 && (
                            <span
                              aria-hidden
                              className="text-text-muted opacity-30 text-[15px] leading-none select-none"
                            >
                              |
                            </span>
                          )}

                          <Link
                            href={href}
                            className={cn(
                              'relative group font-sans text-[15px] lg:text-[15.5px] font-medium tracking-[0.02em] transition-colors duration-200 pb-0.5',
                              isActive
                                ? 'text-text-base'
                                : 'text-text-muted hover:text-text-base',
                            )}
                          >
                            {label}

                            <span
                              className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-300"
                              style={{
                                background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left',
                                opacity: isActive ? 1 : 0,
                              }}
                            />

                            <span
                              className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-200 opacity-0 group-hover:opacity-35"
                              style={{
                                background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                              }}
                            />
                          </Link>
                        </div>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Desktop spacer to keep nav perfectly centered */}
            <div className="hidden md:block w-[118px] h-10 shrink-0" aria-hidden />

            {/* Mobile hamburger */}
            <div className="md:hidden z-10 flex justify-end">
              <div className="rounded-2xl" style={navShellStyle}>
                <button
                  className="p-2.5 text-text-muted hover:text-text-base transition-colors rounded-btn"
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