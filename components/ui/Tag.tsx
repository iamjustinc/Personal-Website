import { cn } from '@/lib/utils'

type TagVariant = 'category' | 'stack'

interface TagProps {
  label: string
  variant?: TagVariant
  className?: string
}

export function Tag({ label, variant = 'category', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-tag leading-none',
        variant === 'category'
          ? 'border border-accent/30 text-accent font-sans text-xs px-2.5 py-1'
          : 'bg-surface-muted text-text-muted font-mono text-[11px] px-2.5 py-1',
        className,
      )}
      style={
        variant === 'category'
          ? { background: 'rgba(240, 90, 40, 0.06)' }
          : undefined
      }
    >
      {label}
    </span>
  )
}
