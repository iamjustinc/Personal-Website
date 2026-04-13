import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'angular'
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
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
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
  style,
  type = 'button',
  disabled,
}: ButtonProps) {

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)', color: '#fff' }
      : variant === 'angular'
      ? { background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)', color: '#fff', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }
      : variant === 'secondary'
      ? { background: 'transparent', border: '1px solid rgba(15,122,122,0.28)', color: '#A8C5D1' }
      : { background: 'transparent', color: '#A8C5D1' } // ghost

  const base = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-btn font-sans font-medium',
    'transition-all duration-200 ease-out cursor-pointer select-none whitespace-nowrap',
    variant === 'angular' ? '' : 'rounded-btn',
    disabled && 'opacity-50 pointer-events-none',
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  const mergedStyle = { ...variantStyle, ...style }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || download
    if (isExternal) {
      return (
        <a href={href} download={download} target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={base} style={mergedStyle}>
          {content}
        </a>
      )
    }
    return <Link href={href} className={base} style={mergedStyle}>{content}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base} style={mergedStyle}>
      {content}
    </button>
  )
}
