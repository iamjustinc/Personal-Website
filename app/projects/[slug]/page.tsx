import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/data/projects'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects
    .filter(p => p.visible)
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.name} — Justin C.`,
    description: project.tagline,
  }
}

/**
 * Project detail page — scaffold.
 * Full ProjectDetail component will be implemented in Phase 3.
 */
export default function ProjectPage({ params }: Props) {
  const project = projects.find(p => p.slug === params.slug && p.visible)
  if (!project) notFound()

  return (
    <main className="bg-bg min-h-screen pt-16">
      <div className="mx-auto max-w-[800px] px-6 py-12">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-sans text-sm text-text-muted hover:text-text-base transition-colors duration-200 mb-8"
        >
          ← Back
        </Link>

        {/* Header */}
        <h1 className="font-display text-h1 text-text-base">{project.name}</h1>
        <p className="font-sans text-xl text-accent mt-2">{project.tagline}</p>
        <p className="font-sans text-sm text-text-muted mt-3">
          {project.role} · {project.year} · {project.stack.join(' / ')}
        </p>

        {/* Placeholder body */}
        <div className="mt-12 bg-surface-muted rounded-card p-8 text-center">
          <p className="font-sans text-sm text-text-muted">
            Full project detail page coming in Phase 3.
          </p>
        </div>
      </div>
    </main>
  )
}
