import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'About | Justin Chang'
const description =
  'Learn how Justin Chang combines product thinking, technical execution, stakeholder collaboration, and trustworthy AI.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
