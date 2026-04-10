import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-bg min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted mb-4">
          404
        </p>
        <h1 className="font-display text-h1 text-text-base">Project not found.</h1>
        <p className="font-sans text-base text-text-muted mt-4">
          This project doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors mt-8"
        >
          ← Back to work
        </Link>
      </div>
    </main>
  )
}
