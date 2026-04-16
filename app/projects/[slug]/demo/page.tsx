import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectDemo } from '@/components/projects/ProjectDemo'

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
  return {
    title: `${project.name} Demo — Justin Chang`,
    description: `Interactive demo and walkthrough of ${project.name}: ${project.tagline}`,
  }
}

export default function ProjectDemoPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug && p.visible)
  if (!project) notFound()
  return <ProjectDemo project={project} />
}
