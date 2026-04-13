'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      {/* Floating pill nav — always translucent, never full-width flush */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[1160px]"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="relative rounded-2xl border backdrop-blur-2xl"
          style={{
            background: 'rgba(13,30,53,0.82)',
            borderColor: 'rgba(15,122,122,0.20)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.40), 0 0 0 1px rgba(15,122,122,0.05) inset',
          }}
        >
          <div className="px-6 py-3.5 flex items-center justify-between">

            {/* Brand mark */}
            <Link href="/#hero" className="flex items-center gap-2.5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:shadow-glow"
                style={{
                  background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)',
                }}
              >
                <StarMark size="xs" color="white" className="opacity-90" />
              </div>
              <div className="leading-tight">
                <div className="font-sans font-semibold text-[13px] text-text-base tracking-tight">
                  {siteConfig.name}
                </div>
                <div className="font-mono text-[9.5px] text-accent-bright tracking-wider uppercase">
                  SE · PM
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {navLinks.map(({ label, href, sectionId }) => {
                const isActive = activeId === sectionId
                return (
                  <a
                    key={label}
                    href={href}
                    className={cn(
                      'relative group font-sans text-[13px] transition-colors duration-200',
                      isActive ? 'text-text-base' : 'text-text-muted hover:text-text-base',
                    )}
                  >
                    {label}
                    <span
                      className={cn(
                        'absolute -bottom-px left-0 right-0 h-px rounded-full',
                        'transition-all duration-300 ease-premium',
                        'bg-gradient-to-r from-accent to-accent-bright',
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100',
                      )}
                      style={{ transformOrigin: 'left' }}
                    />
                  </a>
                )
              })}
            </nav>

            {/* Angular resume CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href={siteConfig.resumeUrl}
                download
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative font-sans text-[13px] font-medium text-white"
              >
                <span
                  className="block px-5 py-2 btn-angular"
                  style={{
                    background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)',
                  }}
                >
                  Resume ↓
                </span>
              </motion.a>
            </div>

            {/* Hamburger — mobile */}
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
