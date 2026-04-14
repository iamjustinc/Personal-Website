'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileMenu } from './MobileMenu'
import { HoverSparkle } from '@/components/ui/HoverSparkle'

const navLinks = [
  { label: 'Portfolio', href: '/work' },
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
        className="fixed top-5 left-0 right-0 z-50 px-5 pointer-events-none"
        aria-label="Site header"
      >
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[1180px]"
        >
          <div className="flex items-center justify-end gap-4">
            {/* Desktop nav on the right only */}
            <div className="hidden md:flex justify-end pointer-events-auto">
              <div
                className="relative rounded-3xl"
                style={navShellStyle}
              >
                <div className="relative px-7 lg:px-8 py-2 flex items-center justify-center">
                  <nav
                    className="flex items-center gap-6 lg:gap-7"
                    aria-label="Main navigation"
                  >
                    {navLinks.map(({ label, href }, idx) => {
                      const isActive = pathname === href

                      return (
                        <div key={label} className="flex items-center gap-6 lg:gap-7">
                          {idx > 0 && (
                            <span
                              aria-hidden
                              className="text-text-muted opacity-25 text-[14px] leading-none select-none"
                            >
                              |
                            </span>
                          )}

                          <HoverSparkle className="inline-flex">
                            <Link
                              href={href}
                              className={cn(
                                'relative group font-sans text-[14.5px] lg:text-[15px] font-medium tracking-[0.02em] transition-colors duration-200 pb-0.5',
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
                          </HoverSparkle>
                        </div>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden shrink-0 pointer-events-auto">
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