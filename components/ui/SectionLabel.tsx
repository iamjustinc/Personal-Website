import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.1em]',
        className,
      )}
      style={{ color: '#A8C5D1' }}
    >
      {children}
    </p>
  )
}
