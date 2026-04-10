'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
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

  // Frosted glass after 80px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(sectionId) },
        { threshold: 0.4 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-bg/85 backdrop-blur-md border-b border-border/60'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-[1200px] px-6 h-full flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/#hero"
            className="font-sans font-medium text-[15px] text-text-base hover:text-accent transition-colors duration-200"
          >
            {siteConfig.name}
          </Link>

          {/* Center links — desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ label, href, sectionId }) => (
              <a
                key={label}
                href={href}
                className={cn(
                  'relative font-sans text-sm pb-0.5 transition-colors duration-200',
                  activeId === sectionId
                    ? 'text-text-base'
                    : 'text-text-muted hover:text-text-base',
                )}
              >
                {label}
                {/* Accent underline for active state */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent rounded-full',
                    'transition-transform duration-200 ease-premium origin-left',
                    activeId === sectionId ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            ))}
          </nav>

          {/* Resume CTA — desktop */}
          <div className="hidden md:flex">
            <Button variant="secondary" size="sm" href={siteConfig.resumeUrl} download>
              Resume ↓
            </Button>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-1 text-text-base hover:text-accent transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
