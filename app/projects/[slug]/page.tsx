import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy'
import { ProjectComingSoon } from '@/components/projects/ProjectComingSoon'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.visible)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  if (project.launchStatus === 'comingSoon') {
    return {
      title: `${project.name} Coming Soon | Justin Chang`,
      description: `${project.name} is being finalized and will be available soon.`,
    }
  }
  return {
    title: `${project.name} | Case Study | Justin Chang`,
    description: project.tagline,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug && p.visible)
  if (!project) notFound()
  if (project.launchStatus === 'comingSoon') {
    return <ProjectComingSoon project={project} />
  }
  return <ProjectCaseStudy project={project} />
}
