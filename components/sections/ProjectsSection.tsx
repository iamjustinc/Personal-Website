'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Max grid cards shown on homepage before "View all" link appears
const MAX_GRID = 6

/**
 * Projects section — scaffold.
 * Featured card gets full-width two-column treatment.
 * Grid cards are secondary; scale from 2-up to 3-up as library grows.
 *
 * VideoPreview is not yet wired — PlaceholderImage stands in for all media.
 */
export function ProjectsSection() {
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  const featuredProject = projects.find(p => p.featured && p.visible) ?? null
  const gridProjects = projects
    .filter(p => p.visible && p.homepageVisible && p.slug !== featuredProject?.slug)
    .sort((a, b) => a.order - b.order)

  const visibleGrid = gridProjects.slice(0, MAX_GRID)
  const hasMore     = gridProjects.length > MAX_GRID

  return (
    <Section id="projects">
      {/* Heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionLabel>Work</SectionLabel>
        <h2 className="font-display text-h2 text-text-base mt-2">Selected Projects</h2>
      </motion.div>

      <div className="mt-12 flex flex-col gap-6">

        {/* ── Featured project ──────────────────────────────────────────────── */}
        {featuredProject && (
          <motion.div
            variants={up}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className={cn(
              'bg-surface rounded-card shadow-card overflow-hidden',
              'transition-all duration-300 ease-premium',
              'hover:shadow-card-hover hover:-translate-y-0.5',
            )}
          >
            <div className="grid md:grid-cols-2">
              {/* Left: content */}
              <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                <div className="flex gap-2 flex-wrap">
                  {featuredProject.tags.slice(0, 3).map(tag => (
                    <Tag key={tag} label={tag} variant="category" />
                  ))}
                </div>

                <h3 className="font-display text-h2 text-text-base mt-3">
                  {featuredProject.name}
                </h3>
                <p className="font-sans text-lg text-accent mt-2 leading-snug">
                  {featuredProject.tagline}
                </p>
                <p className="font-sans text-sm text-text-muted mt-3 leading-relaxed line-clamp-3">
                  {featuredProject.summary}
                </p>

                {/* Outcome badge */}
                <div className="mt-4">
                  <span className="inline-flex items-center bg-surface-muted rounded-tag px-3 py-1.5 font-sans text-sm font-medium text-text-base">
                    → {featuredProject.outcome}
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 mt-8 flex-wrap">
                  <Button
                    variant="primary"
                    href={`/projects/${featuredProject.slug}`}
                    icon={<ArrowRight size={16} />}
                  >
                    View project
                  </Button>
                  {featuredProject.githubUrl && (
                    <Button
                      variant="ghost"
                      href={featuredProject.githubUrl}
                      target="_blank"
                    >
                      GitHub ↗
                    </Button>
                  )}
                </div>
              </div>

              {/* Right: media */}
              <div className="order-1 md:order-2 overflow-hidden min-h-[240px] md:min-h-0
                              rounded-t-card md:rounded-t-none md:rounded-r-card">
                <PlaceholderImage
                  projectName={featuredProject.name}
                  accentColor={featuredProject.panelAccentColor}
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Project grid ──────────────────────────────────────────────────── */}
        {visibleGrid.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className={cn(
              'grid gap-6',
              visibleGrid.length === 1 && 'sm:grid-cols-1 max-w-[560px]',
              visibleGrid.length >= 2 && 'sm:grid-cols-2',
              visibleGrid.length >= 5 && 'xl:grid-cols-3',
            )}
          >
            {visibleGrid.map(project => (
              <motion.div
                key={project.slug}
                variants={up}
                className={cn(
                  'bg-surface rounded-card shadow-card overflow-hidden flex flex-col',
                  'transition-all duration-300 ease-premium',
                  'hover:shadow-card-hover hover:-translate-y-1',
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden rounded-t-card">
                  <PlaceholderImage
                    projectName={project.name}
                    accentColor={project.panelAccentColor}
                    className="w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.slice(0, 2).map(tag => (
                      <Tag key={tag} label={tag} variant="category" />
                    ))}
                  </div>
                  <h3 className="font-display text-h3 text-text-base mt-2">
                    {project.name}
                  </h3>
                  <p className="font-sans text-sm text-text-muted mt-1.5 line-clamp-2">
                    {project.tagline}
                  </p>
                  <p className="font-sans text-sm font-medium text-accent mt-3">
                    → {project.outcome}
                  </p>

                  {/* Footer — pinned to bottom */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      View project →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Overflow link — appears when library grows past MAX_GRID */}
        {hasMore && (
          <div className="mt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Empty state */}
        {!featuredProject && visibleGrid.length === 0 && (
          <p className="font-sans text-sm text-text-muted">No projects yet.</p>
        )}
      </div>
    </Section>
  )
}
