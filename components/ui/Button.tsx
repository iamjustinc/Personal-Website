import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  download?: boolean
  target?: string
  rel?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover',
  secondary:
    'border border-border text-text-base hover:border-text-muted bg-transparent',
  ghost:
    'text-text-base bg-transparent hover:underline underline-offset-2',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  download,
  target,
  rel,
  icon,
  iconPosition = 'right',
  children,
  onClick,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-btn font-sans font-medium',
    'transition-all duration-200 ease-out',
    'cursor-pointer select-none whitespace-nowrap',
    disabled && 'opacity-50 pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || download
    if (isExternal) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={base}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {content}
    </button>
  )
}
