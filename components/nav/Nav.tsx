'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileMenu } from './MobileMenu'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { StarMark } from '@/components/ui/StarMark'

type NavLink = {
  label: string
  href: string
  projects?: { label: string; href: string; status?: 'comingSoon' }[]
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/#hero' },
  {
    label: 'Portfolio',
    href: '/work',
    projects: [
      { label: 'Kestrel', href: '/projects/kestrel' },
      { label: 'Chirpie', href: '/projects/chirpie', status: 'comingSoon' },
      { label: 'Quail',   href: '/projects/quail',   status: 'comingSoon' },
    ],
  },
  { label: 'About',   href: '/about'   },
  { label: 'Resume',  href: '/resume'  },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [openDropdown,  setOpenDropdown]  = useState<string | null>(null)
  const pathname = usePathname()

  const navShellStyle = {
    background: 'rgba(10,24,44,0.82)',
    backdropFilter: 'blur(22px) saturate(150%)',
    WebkitBackdropFilter: 'blur(22px) saturate(150%)',
    border: '1px solid rgba(15,122,122,0.28)',
    boxShadow:
      '0 8px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(15,122,122,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 24px rgba(15,122,122,0.05)',
  } as const

  const dropdownShellStyle = {
    background: 'rgba(8,20,38,0.97)',
    backdropFilter: 'blur(22px) saturate(150%)',
    WebkitBackdropFilter: 'blur(22px) saturate(150%)',
    border: '1px solid rgba(15,122,122,0.22)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(15,122,122,0.06) inset',
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

            {/* ── Desktop nav ───────────────────────────────────────────── */}
            <div className="hidden md:flex justify-end pointer-events-auto">
              <div className="relative rounded-3xl" style={navShellStyle}>
                <div className="relative px-7 lg:px-8 py-2 flex items-center justify-center">
                  <nav
                    className="flex items-center gap-6 lg:gap-7"
                    aria-label="Main navigation"
                  >
                    {navLinks.map(({ label, href, projects }, idx) => {
                      // Active state: Home matches '/', Portfolio matches /work or any /projects/*
                      const isActive =
                        href === '/#hero'
                          ? pathname === '/'
                          : projects
                          ? pathname === href || pathname.startsWith('/projects/')
                          : pathname === href

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

                          {projects ? (
                            // ── Portfolio — clickable link + hover dropdown ──
                            <div
                              className="relative"
                              onMouseEnter={() => setOpenDropdown(label)}
                              onMouseLeave={() => setOpenDropdown(null)}
                              onFocus={() => setOpenDropdown(label)}
                              onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                  setOpenDropdown(null)
                                }
                              }}
                            >
                              <HoverSparkle className="inline-flex">
                                <Link
                                  href={href}
                                  className={cn(
                                    'relative group flex items-center gap-0.5 font-sans text-[14.5px] lg:text-[15px] font-medium tracking-[0.02em] transition-colors duration-200 pb-0.5',
                                    isActive
                                      ? 'text-text-base'
                                      : 'text-text-muted hover:text-text-base',
                                  )}
                                >
                                  {label}
                                  <ChevronDown
                                    size={11}
                                    aria-hidden
                                    className={cn(
                                      'transition-transform duration-200 opacity-40 mt-px',
                                      openDropdown === label ? 'rotate-180' : 'rotate-0',
                                    )}
                                  />

                                  {/* Active underline */}
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
                                </Link>
                              </HoverSparkle>

                              {/* ── Dropdown panel ─────────────────────────── */}
                              <AnimatePresence>
                                {openDropdown === label && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                                    exit={{    opacity: 0, y: -6, scale: 0.97 }}
                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute left-1/2 -translate-x-1/2 z-50"
                                    style={{ top: 'calc(100% + 14px)' }}
                                  >
                                    <div
                                      className="rounded-2xl py-1.5 px-1.5"
                                      style={dropdownShellStyle}
                                    >
                                      {projects.map((proj, i) => (
                                        <div key={proj.label}>
                                          {i > 0 && (
                                            <div
                                              className="mx-2 my-1 h-px"
                                              style={{ background: 'rgba(15,122,122,0.12)' }}
                                            />
                                          )}
                                          <Link
                                            href={proj.href}
                                            onClick={() => setOpenDropdown(null)}
                                            className={cn(
                                              'flex items-center gap-2 px-3 py-2 rounded-xl font-sans text-[13px] font-medium tracking-[0.01em] transition-colors duration-150 whitespace-nowrap hover:bg-white/[0.04]',
                                              pathname === proj.href
                                                ? 'text-text-base'
                                                : 'text-text-muted hover:text-text-base',
                                            )}
                                          >
                                            <StarMark
                                              size="xs"
                                              color="#0F7A7A"
                                              className="opacity-40 shrink-0"
                                            />
                                            <span>{proj.label}</span>
                                            {proj.status === 'comingSoon' && (
                                              <span
                                                className="rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em]"
                                                style={{
                                                  background: 'rgba(196,151,74,0.08)',
                                                  border: '1px solid rgba(196,151,74,0.22)',
                                                  color: '#D8B76E',
                                                }}
                                              >
                                                Soon
                                              </span>
                                            )}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            // ── Regular link ───────────────────────────────
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
                          )}
                        </div>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* ── Mobile hamburger ──────────────────────────────────────── */}
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
