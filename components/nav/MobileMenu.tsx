'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EASING } from '@/lib/motion'
import { StarMark } from '@/components/ui/StarMark'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Home',      href: '/#hero'   },
  {
    label: 'Portfolio', href: '/work',
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

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Flat animation index — primary links + sub-links each get their own stagger slot
  let animIdx = 0

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
            {navItems.map((item) => {
              const primaryIdx = animIdx++
              const isActive =
                item.href === '/#hero'
                  ? pathname === '/'
                  : item.projects
                  ? pathname === item.href || pathname.startsWith('/projects/')
                  : pathname === item.href

              return (
                <div key={item.label}>
                  {/* Primary link */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: primaryIdx * 0.05 + 0.06, duration: 0.3, ease: EASING }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block font-sans font-medium text-2xl py-3 transition-colors duration-200',
                        isActive ? 'text-text-base' : 'text-text-muted hover:text-text-base',
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>

                  {/* Sub-links (project pages under Portfolio) */}
                  {item.projects?.map((proj) => {
                    const subIdx = animIdx++
                    const isSubActive = pathname === proj.href
                    return (
                      <motion.div
                        key={proj.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIdx * 0.05 + 0.06, duration: 0.3, ease: EASING }}
                      >
                        <Link
                          href={proj.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-2 pl-4 py-1.5 font-sans font-medium text-lg transition-colors duration-200',
                            isSubActive ? 'text-text-base' : 'text-text-muted hover:text-text-base',
                          )}
                        >
                          <StarMark size="xs" color="#0F7A7A" className="opacity-40 shrink-0" />
                          <span>{proj.label}</span>
                          {proj.status === 'comingSoon' && (
                            <span
                              className="rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em]"
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
                      </motion.div>
                    )
                  })}
                </div>
              )
            })}
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
