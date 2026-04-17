'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const RESUME_FILE_PATH = '/RESUME.pdf'
const RESUME_DOWNLOAD_NAME = 'Justin-Chang-Resume.pdf'

type ResumeDownloadButtonProps = {
  children?: React.ReactNode
  className?: string
  ariaLabel?: string
}

export function ResumeDownloadButton({
  children = 'Download Resume',
  className,
  ariaLabel = 'Download resume PDF',
}: ResumeDownloadButtonProps) {
  return (
    <a
      href={RESUME_FILE_PATH}
      download={RESUME_DOWNLOAD_NAME}
      aria-label={ariaLabel}
      className={cn(className)}
    >
      {children}
    </a>
  )
}
