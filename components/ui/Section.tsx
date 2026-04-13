import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'

type PaddingY = 'default' | 'sm' | 'lg'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
  paddingY?: PaddingY
  withContainer?: boolean
  style?: React.CSSProperties
}

const paddingMap: Record<PaddingY, string> = {
  default: 'py-24',
  sm: 'py-16',
  lg: 'py-32',
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  paddingY = 'default',
  withContainer = true,
  style,
}: SectionProps) {
  return (
    <section id={id} className={cn(paddingMap[paddingY], className)} style={style}>
      {withContainer ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  )
}
