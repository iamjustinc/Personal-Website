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
        'inline-flex items-center rounded-full leading-none',
        variant === 'category'
          ? 'border font-sans text-xs px-2.5 py-1'
          : 'font-mono text-[10.5px] px-2.5 py-1 rounded-btn',
        className,
      )}
      style={
        variant === 'category'
          ? {
              background: 'rgba(15,122,122,0.10)',
              borderColor: 'rgba(15,122,122,0.25)',
              color: '#4A9FAE',
            }
          : {
              background: 'rgba(15,42,61,0.80)',
              border: '1px solid rgba(15,122,122,0.14)',
              color: '#A8C5D1',
            }
      }
    >
      {label}
    </span>
  )
}
