'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EASING } from '@/lib/motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { label: 'Work',    href: '/#projects',  download: false },
  { label: 'About',   href: '/#about',     download: false },
  { label: 'Contact', href: '/#contact',   download: false },
  { label: 'Resume',  href: '/resume.pdf', download: true  },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: EASING }}
          className="fixed inset-0 z-40 bg-bg flex flex-col"
        >
          {/* Top bar — matches nav height */}
          <div className="h-16 flex items-center justify-between px-6">
            <span className="font-sans font-semibold text-[14px] tracking-tight text-text-base select-none">
              Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-1 text-text-muted hover:text-text-base transition-colors rounded-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-border" />

          {/* Links */}
          <nav className="flex flex-col flex-1 justify-center px-6 pb-16 gap-1">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.05, duration: 0.3, ease: EASING }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  download={link.download || undefined}
                  className={
                    link.download
                      ? 'block font-sans font-medium text-2xl text-text-muted hover:text-text-base transition-colors py-3'
                      : 'block font-sans font-medium text-2xl text-text-base hover:text-accent transition-colors py-3'
                  }
                >
                  {link.label}
                  {/* Small arrow for external/download links */}
                  {link.download && (
                    <span className="ml-2 text-base opacity-50">↓</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 pb-8">
            <p className="font-mono text-[11px] text-text-muted tracking-wider uppercase">
              SE + PM
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
