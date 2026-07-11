import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy'
import { ProjectComingSoon } from '@/components/projects/ProjectComingSoon'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.visible && p.detailPageEnabled !== false)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project || project.detailPageEnabled === false) return {}
  if (project.launchStatus === 'comingSoon') {
    return {
      title: `${project.name} Preview | Justin Chang`,
      description: `${project.name} is being finalized and will be available soon.`,
      openGraph: {
        title: `${project.name} Preview | Justin Chang`,
        description: `${project.name} is being finalized and will be available soon.`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.name} Preview | Justin Chang`,
        description: `${project.name} is being finalized and will be available soon.`,
      },
    }
  }
  return {
    title: `${project.name} | Case Study | Justin Chang`,
    description: project.summary,
    openGraph: {
      title: `${project.name} | Case Study | Justin Chang`,
      description: project.summary,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Case Study | Justin Chang`,
      description: project.summary,
    },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find(
    (p) => p.slug === params.slug && p.visible && p.detailPageEnabled !== false,
  )
  if (!project) notFound()
  if (project.launchStatus === 'comingSoon') {
    return <ProjectComingSoon project={project} />
  }
  return <ProjectCaseStudy project={project} />
}
