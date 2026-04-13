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
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'group inline-flex items-center gap-2.5 cursor-pointer',
        'font-sans font-medium text-xl',
        'transition-colors duration-200',
        className,
      )}
      style={{ color: copied ? '#4A9FAE' : '#E8F4F8' }}
      title={copied ? 'Copied!' : 'Click to copy email'}
    >
      <span>{copied ? 'Copied!' : email}</span>
      <span
        className="transition-colors duration-200"
        style={{ color: copied ? '#4A9FAE' : 'rgba(168,197,209,0.55)' }}
      >
        {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={14} />}
      </span>
    </button>
  )
}
