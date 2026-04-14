import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `Résumé for ${siteConfig.name} — ${siteConfig.roleTag}`,
}

export default function ResumePage() {
  return (
    <main className="pt-28 min-h-screen">
      <Section>
        <div className="max-w-[760px] mx-auto">

          {/* Header */}
          <div className="mb-12 pb-8" style={{ borderBottom: '1px solid rgba(15,122,122,0.14)' }}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: 'rgba(15,122,122,0.08)', border: '1px solid rgba(15,122,122,0.22)' }}
            >
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                Résumé
              </span>
            </div>

            <h1 className="font-display text-h1 text-text-base leading-tight">
              {siteConfig.name}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-wider mt-2" style={{ color: '#4A9FAE' }}>
              {siteConfig.roleTag}
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                {siteConfig.email}
              </a>
              <span style={{ color: 'rgba(168,197,209,0.25)' }}>·</span>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                LinkedIn
              </a>
              <span style={{ color: 'rgba(168,197,209,0.25)' }}>·</span>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                GitHub
              </a>
              <span style={{ color: 'rgba(168,197,209,0.25)' }}>·</span>
              <a
                href={siteConfig.resumeUrl}
                download
                className="font-mono text-[11px] uppercase tracking-wider transition-colors hover:text-text-base"
                style={{ color: '#4A9FAE' }}
              >
                Download PDF ↓
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-12">
            <SectionLabel>Summary</SectionLabel>
            <p className="font-sans text-base leading-relaxed mt-4" style={{ color: '#A8C5D1' }}>
              {siteConfig.heroStatement}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <SectionLabel>Core Skills</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mt-4">
              {siteConfig.aboutHighlights?.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <StarMark size="xs" color="#0F7A7A" className="opacity-60 shrink-0" />
                  <span className="font-sans text-sm" style={{ color: '#7AABB8' }}>{h}</span>
                </div>
              ))}
              {siteConfig.capabilities.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <StarMark size="xs" color="#0F7A7A" className="opacity-60 shrink-0" />
                  <span className="font-sans text-sm" style={{ color: '#7AABB8' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          {siteConfig.career && siteConfig.career.length > 0 && (
            <div className="mb-12">
              <SectionLabel>Experience</SectionLabel>
              <div className="flex flex-col gap-7 mt-5">
                {siteConfig.career.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(15,42,61,0.45)',
                      border: `1px solid ${item.current ? 'rgba(196,151,74,0.18)' : 'rgba(15,122,122,0.12)'}`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <StarMark size="xs" color={item.current ? '#C4974A' : '#4A9FAE'} className="opacity-75" />
                          <h3 className="font-display text-h3 text-text-base">{item.role}</h3>
                          {item.current && (
                            <span
                              className="font-mono text-[9px] uppercase tracking-wider rounded-full px-2 py-0.5"
                              style={{
                                background: 'rgba(196,151,74,0.10)',
                                border: '1px solid rgba(196,151,74,0.25)',
                                color: '#C4974A',
                              }}
                            >
                              Now
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm mt-0.5" style={{ color: '#4A9FAE' }}>
                          {item.company}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] tracking-wider shrink-0" style={{ color: 'rgba(168,197,209,0.50)' }}>
                        {item.period}
                      </span>
                    </div>
                    <p className="font-sans text-sm leading-relaxed mt-3" style={{ color: '#8DAFC0' }}>
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-btn"
                            style={{
                              background: 'rgba(15,42,61,0.80)',
                              border: '1px solid rgba(15,122,122,0.14)',
                              color: '#6A9BAA',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            className="mt-4 pt-6 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
          >
            <p className="font-sans text-xs" style={{ color: 'rgba(168,197,209,0.40)' }}>
              © {new Date().getFullYear()} {siteConfig.copyrightName}
            </p>
            <a
              href={siteConfig.resumeUrl}
              download
              className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-text-base"
              style={{ color: 'rgba(74,159,174,0.60)' }}
            >
              Download PDF ↓
            </a>
          </div>

        </div>
      </Section>
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 max-w-[28px]" style={{ background: 'rgba(15,122,122,0.40)' }} />
      <h2 className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#4A9FAE' }}>
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: 'rgba(15,122,122,0.14)' }} />
    </div>
  )
}
