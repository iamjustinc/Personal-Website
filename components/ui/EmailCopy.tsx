'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailCopyProps {
  email: string
  className?: string
}

export function EmailCopy({ email, className }: EmailCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API not available — fall back to mailto
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'group inline-flex items-center gap-2',
        'font-sans font-medium text-xl text-text-base',
        'transition-colors duration-200 hover:text-accent',
        'cursor-pointer',
        className,
      )}
      title={copied ? 'Copied!' : 'Click to copy email'}
    >
      <span className="transition-colors duration-200">
        {copied ? 'Copied!' : email}
      </span>
      <span className="text-text-muted group-hover:text-accent transition-colors duration-200">
        {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={14} />}
      </span>
    </button>
  )
}
