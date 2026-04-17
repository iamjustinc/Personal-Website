'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarMark } from '@/components/ui/StarMark'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils'

type ProjectFloatingScreenshotsProps = {
  project: Pick<Project, 'name' | 'thumbnail' | 'screenshots' | 'panelAccentColor'>
  priority?: boolean
  imageSizes?: string
  showWatermark?: boolean
  className?: string
}

/**
 * Shared project screenshot composition for cards and case-study heroes.
 * The screenshot assets are landscape product UIs, so wrappers stay close to
 * their natural ratio and the images contain instead of hard-cropping.
 */
export function ProjectFloatingScreenshots({
  project,
  priority = false,
  imageSizes = '(max-width: 1024px) 100vw, 560px',
  showWatermark = false,
  className,
}: ProjectFloatingScreenshotsProps) {
  const landingShot = project.screenshots?.[0] || project.thumbnail
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 25%, ${project.panelAccentColor}10 0%, transparent 52%)`,
        }}
      />

      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
            style={{ opacity: 0.028 }}
          >
            <StarMark size="2xl" color={project.panelAccentColor} />
          </motion.div>
        </div>
      )}

      {landingShot && (
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-1.4, -0.45, -1.4] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[1%] top-[8%] w-[94%] aspect-[1.86/1] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 22px 58px rgba(0,0,0,0.48)' }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing view`}
            fill
            sizes={imageSizes}
            className="object-contain object-center"
            priority={priority}
          />
        </motion.div>
      )}

      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 9, 0], rotate: [1.8, 0.8, 1.8] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-[1%] bottom-[7%] z-10 w-[90%] aspect-[1.86/1] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 28px 66px rgba(0,0,0,0.54)' }}
        >
          <Image
            src={interfaceShot}
            alt={`${project.name} interface view`}
            fill
            sizes={imageSizes}
            className="object-contain object-center"
          />
        </motion.div>
      )}

      <div
        className="absolute right-[8%] bottom-[2%] h-8 w-[42%] blur-2xl rounded-full pointer-events-none"
        style={{ background: `${project.panelAccentColor}20` }}
      />

      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-35" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-30" />
      </div>
    </div>
  )
}
