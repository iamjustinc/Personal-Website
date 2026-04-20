import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectDemo } from '@/components/projects/ProjectDemo'
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
      title: `${project.name} Demo Coming Soon | Justin Chang`,
      description: `${project.name} demo is being finalized and will be available soon.`,
    }
  }
  return {
    title: `${project.name} Demo | Justin Chang`,
    description: `Interactive demo and walkthrough of ${project.name}: ${project.tagline}`,
  }
}

export default function ProjectDemoPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug && p.visible)
  if (!project) notFound()
  if (project.launchStatus === 'comingSoon') {
    return <ProjectComingSoon project={project} surface="demo" />
  }
  return <ProjectDemo project={project} />
}
