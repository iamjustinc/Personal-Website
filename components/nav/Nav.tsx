'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASING } from '@/lib/motion'
import { StarMark } from '@/components/ui/StarMark'
import { MobileMenu } from './MobileMenu'
import { siteConfig } from '@/data/site'

const navLinks = [
  { label: 'Work',    href: '/#projects', sectionId: 'projects' },
  { label: 'About',   href: '/#about',    sectionId: 'about'    },
  { label: 'Contact', href: '/#contact',  sectionId: 'contact'  },
]

export function Nav() {
  const [activeId, setActiveId]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(sectionId) },
        { threshold: 0.30 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[1160px]"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="relative rounded-2xl"
          style={{
            background: 'rgba(10,24,44,0.82)',
            backdropFilter: 'blur(36px) saturate(180%)',
            WebkitBackdropFilter: 'blur(36px) saturate(180%)',
            border: '1px solid rgba(15,122,122,0.28)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(15,122,122,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 24px rgba(15,122,122,0.05)',
          }}
        >
          <div className="px-5 py-3 flex items-center justify-between">

            {/* ── Brand lockup ────────────────────────────────────────── */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Link href="/#hero" className="flex items-center gap-3">
                {siteConfig.logoSrc ? (
                  /* Justin-logo.png — larger, more prominent icon tile */
                  <div
                    className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0D2A3D, #0F3A50)',
                      border: '1px solid rgba(15,122,122,0.40)',
                      boxShadow: '0 2px 16px rgba(15,122,122,0.28), 0 0 0 1px rgba(15,122,122,0.08) inset',
                    }}
                  >
                    <Image
                      src={siteConfig.logoSrc}
                      alt={`${siteConfig.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  /* Fallback: teal icon tile with star */
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)' }}
                  >
                    <StarMark size="xs" color="white" />
                  </div>
                )}
                <div className="leading-tight">
                  <div className="font-sans font-semibold text-[14px] text-text-base tracking-tight">
                    {siteConfig.name}
                  </div>
                  <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: '#4A9FAE' }}>
                    SE · PM
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ── Desktop links ────────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {navLinks.map(({ label, href, sectionId }) => {
                const isActive = activeId === sectionId
                return (
                  <a
                    key={label}
                    href={href}
                    className={cn(
                      'relative group font-sans text-[13px] transition-colors duration-200 pb-0.5',
                      isActive ? 'text-text-base' : 'text-text-muted hover:text-text-base',
                    )}
                  >
                    {label}
                    {/* Gradient underline indicator */}
                    <span
                      className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-300 ease-premium"
                      style={{
                        background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    <span
                      className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-200 ease-premium"
                      style={{
                        background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                        transform: !isActive ? 'scaleX(0)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        opacity: 0.45,
                      }}
                    />
                  </a>
                )
              })}
            </nav>

            {/* ── Angular resume CTA ──────────────────────────────────── */}
            <div className="hidden md:flex items-center">
              <motion.a
                href={siteConfig.resumeUrl}
                download
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="font-sans text-[13px] font-medium text-white select-none"
              >
                <span
                  className="block px-5 py-2 btn-angular transition-shadow duration-300 hover:shadow-glow"
                  style={{ background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)' }}
                >
                  Resume ↓
                </span>
              </motion.a>
            </div>

            {/* ── Mobile hamburger ─────────────────────────────────────── */}
            <button
              className="md:hidden p-2 -mr-1 text-text-muted hover:text-text-base transition-colors rounded-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
