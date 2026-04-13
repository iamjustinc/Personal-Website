'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EASING } from '@/lib/motion'
import { StarMark } from '@/components/ui/StarMark'

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
          transition={{ duration: 0.2, ease: EASING }}
          className="fixed inset-0 z-40 flex flex-col"
          style={{ background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(24px)' }}
        >
          {/* Top bar */}
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <StarMark size="xs" color="#0F7A7A" />
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-1 text-text-muted hover:text-text-base transition-colors rounded-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mx-6 h-px" style={{ background: 'rgba(15,122,122,0.15)' }} />

          {/* Links */}
          <nav className="flex flex-col flex-1 justify-center px-6 pb-16 gap-1">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.06, duration: 0.3, ease: EASING }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  download={link.download || undefined}
                  className={cn(
                    'block font-sans font-medium text-2xl py-3 transition-colors duration-200',
                    link.download
                      ? 'text-text-muted hover:text-text-base'
                      : 'text-text-base hover:text-accent-bright',
                  )}
                >
                  {link.label}
                  {link.download && <span className="ml-2 text-base opacity-40">↓</span>}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 pb-8 flex items-center gap-2">
            <StarMark size="xs" color="#C4974A" className="opacity-50" />
            <p className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
              SE + PM
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// cn used inline — import at top
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
