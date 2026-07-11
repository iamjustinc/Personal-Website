import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Resume | Justin Chang'
const description =
  "View Justin Chang's experience across product development, Salesforce, AI systems, workflow design, analytics, and stakeholder collaboration."

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

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return children
}
