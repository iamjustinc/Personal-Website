'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASING } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { siteConfig } from '@/data/site'

const navLinks = [
  { label: 'Work',    href: '/#projects', sectionId: 'projects' },
  { label: 'About',   href: '/#about',    sectionId: 'about' },
  { label: 'Contact', href: '/#contact',  sectionId: 'contact' },
]

export function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [activeId, setActiveId]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    // Check immediately in case page loads mid-scroll
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <motion.header
        // Single entrance on mount — nav slides down and fades in
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASING, delay: 0.05 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16',
          'transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
          scrolled
            ? 'bg-bg/88 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="mx-auto max-w-[1200px] px-6 h-full flex items-center justify-between">

          {/* Brand */}
          <Link
            href="/#hero"
            className={cn(
              'font-sans font-semibold text-[14px] tracking-tight text-text-base',
              'hover:text-accent transition-colors duration-200',
            )}
          >
            {siteConfig.name}
          </Link>

          {/* Center links — desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ label, href, sectionId }) => {
              const isActive = activeId === sectionId
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    'relative font-sans text-[13px] pb-px',
                    'transition-colors duration-200',
                    isActive
                      ? 'text-text-base font-medium'
                      : 'text-text-muted font-normal hover:text-text-base',
                  )}
                >
                  {label}
                  {/* Accent underline — scales in from left on active */}
                  <span
                    className={cn(
                      'absolute -bottom-px left-0 right-0 h-[1.5px] bg-accent rounded-full',
                      'transition-transform duration-250 ease-premium origin-left',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              )
            })}
          </nav>

          {/* Resume CTA — desktop */}
          <div className="hidden md:flex">
            <Button
              variant="secondary"
              size="sm"
              href={siteConfig.resumeUrl}
              download
              className={cn(
                'text-[13px] transition-all duration-200',
                // Slightly more visible border when scrolled
                scrolled ? 'border-text-muted/40' : 'border-border',
              )}
            >
              Resume ↓
            </Button>
          </div>

          {/* Hamburger — mobile, larger touch target */}
          <button
            className="md:hidden p-2 -mr-1 text-text-base hover:text-accent transition-colors rounded-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
