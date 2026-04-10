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
  { label: 'Work',    href: '/#projects' },
  { label: 'About',   href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Resume',  href: '/resume.pdf', download: true },
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
          className="fixed inset-0 z-40 bg-bg flex flex-col"
        >
          {/* Close */}
          <div className="flex justify-end px-6 pt-5">
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-base transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-start justify-center flex-1 px-8 pb-16 gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: EASING }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  download={link.download}
                  className="block font-sans font-medium text-3xl text-text-base hover:text-accent transition-colors py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
