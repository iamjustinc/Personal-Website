import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Product Work | Justin Chang'
const description =
  'Explore harmonIQ and Kestrel: products focused on CRM data readiness, AI decision support, explainability, and human-centered AI.'

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

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children
}
