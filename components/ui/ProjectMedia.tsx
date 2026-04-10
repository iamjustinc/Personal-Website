import Image from 'next/image'
import { PlaceholderImage } from './PlaceholderImage'
import { cn } from '@/lib/utils'

interface ProjectMediaProps {
  /** Path to the real screenshot/thumbnail. Falls back to PlaceholderImage when absent. */
  src?: string
  alt: string
  accentColor: string
  projectName: string
  className?: string
  /** Prioritize loading — use true for above-the-fold images (featured card). */
  priority?: boolean
  /** Image sizes hint for srcset. Defaults to a responsive 50vw/100vw split. */
  sizes?: string
}

/**
 * Unified project media component.
 * Renders a next/image when src is provided, falls back to PlaceholderImage.
 * Always fills its parent container — parent must be relative + have defined dimensions.
 */
export function ProjectMedia({
  src,
  alt,
  accentColor,
  projectName,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ProjectMediaProps) {
  if (!src) {
    return (
      <PlaceholderImage
        projectName={projectName}
        accentColor={accentColor}
        className={cn('w-full h-full', className)}
      />
    )
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
        priority={priority}
      />
    </div>
  )
}
