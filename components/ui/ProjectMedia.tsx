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
  /** Prioritize loading for above-the-fold images, such as a featured card. */
  priority?: boolean
  /** Image sizes hint for srcset. Defaults to a responsive 50vw/100vw split. */
  sizes?: string
  /** Product screenshots should usually preserve composition. Use cover only for true thumbnails. */
  fit?: 'contain' | 'cover'
}

/**
 * Unified project media component.
 * Renders a next/image when src is provided, falls back to PlaceholderImage.
 * Always fills its parent container. Parent must be relative and have defined dimensions.
 */
export function ProjectMedia({
  src,
  alt,
  accentColor,
  projectName,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  fit = 'contain',
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
        className={fit === 'cover' ? 'object-cover object-top' : 'object-contain object-center'}
        priority={priority}
      />
    </div>
  )
}
