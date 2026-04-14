'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StarMark } from '@/components/ui/StarMark'
import { MobileMenu } from './MobileMenu'
import { siteConfig } from '@/data/site'

const navLinks = [
  { label: 'Work',    href: '/#projects', sectionId: 'projects' },
  { label: 'About',   href: '/#about',    sectionId: 'about'    },
  { label: 'Resume',  href: siteConfig.resumeUrl, sectionId: '', download: true },
  { label: 'Contact', href: '/#contact',  sectionId: 'contact'  },
]

export function Nav() {
  const [activeId, setActiveId]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navLinks.forEach(({ sectionId }) => {
      if (!sectionId) return
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
          <div className="relative px-5 py-2.5 flex items-center justify-between">

            {/* ── Brand — logo only, no box, no text ─────────────────────── */}
            <motion.div
              whileHover={{ scale: 1.06, opacity: 0.85 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="shrink-0 z-10"
            >
              <Link href="/#hero" aria-label={`${siteConfig.name} — home`}>
                {siteConfig.logoSrc ? (
                  <Image
                    src={siteConfig.logoSrc}
                    alt={`${siteConfig.name} logo`}
                    width={52}
                    height={52}
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)' }}
                  >
                    <StarMark size="sm" color="white" />
                  </div>
                )}
              </Link>
            </motion.div>

            {/* ── Nav links — absolutely centered ────────────────────────── */}
            <nav
              className="hidden md:flex absolute left-1/2 top-1/2 items-center gap-8"
              style={{ transform: 'translate(-50%, -50%)' }}
              aria-label="Main navigation"
            >
              {navLinks.map(({ label, href, sectionId, download }) => {
                const isActive = !!sectionId && activeId === sectionId
                return (
                  <a
                    key={label}
                    href={href}
                    download={download || undefined}
                    className={cn(
                      'relative group font-sans text-[13.5px] font-medium transition-colors duration-200 pb-0.5',
                      isActive ? 'text-text-base' : 'text-text-muted hover:text-text-base',
                    )}
                  >
                    {label}
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
                      className="absolute -bottom-px left-0 right-0 h-px rounded-full transition-all duration-200 opacity-0 group-hover:opacity-40"
                      style={{
                        background: 'linear-gradient(90deg, #0F7A7A, #4A9FAE)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                      }}
                    />
                  </a>
                )
              })}
            </nav>

            {/* ── Right: mobile hamburger only on mobile ─────────────────── */}
            <div className="shrink-0 z-10 flex items-center">
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

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
