import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteConfig } from '@/data/site'

const title = 'Resume | Justin Chang'
const description =
  `View ${siteConfig.name}'s experience across AI product projects, applied ML, workflow design, Databricks training, and stakeholder-ready analytics.`

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
