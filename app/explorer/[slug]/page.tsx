import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Zap, GitMerge, BookOpen, ExternalLink, Info } from 'lucide-react'
import { getTippingPointBySlug, getAllTippingPointSlugs } from '@/lib/api'
import { getSeverityConfig, getDomainConfig, getThemeForDomain } from '@/lib/tokens'
import { parseSourceUrls } from '@/lib/utils'
import { SeverityThermometer } from '@/components/ui/SeverityThermometer'
import { DomainBadge } from '@/components/ui/DomainBadge'
import { DominoChain } from '@/components/explorer/DominoChain'
import { RelationshipPanel } from '@/components/explorer/RelationshipPanel'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const slugs = await getAllTippingPointSlugs()
    return slugs.map(slug => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const tp = await getTippingPointBySlug(params.slug)
    return { title: tp.name, description: tp.app_card_summary }
  } catch {
    return { title: 'Tipping Point' }
  }
}

// Section wrapper
function Section({
  icon: Icon,
  title,
  children,
  accent = 'olive',
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accent?: 'olive' | 'terra' | 'peach' | 'sage' | 'navy'
}) {
  const accentClass: Record<string, string> = {
    olive: 'text-olive',
    terra: 'text-terra',
    peach: 'text-[#D4845A]',
    sage:  'text-[#4A7A42]',
    navy:  'text-navy',
  }
  return (
    <section className="mb-8">
      <h2 className={`flex items-center gap-2 text-xs font-ui uppercase tracking-widest mb-4 ${accentClass[accent]}`}>
        <Icon size={13} aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  )
}

// Prose block
function ProseBlock({ text }: { text: string }) {
  const parts = text.split(';').map(s => s.trim()).filter(Boolean)
  if (parts.length <= 1) {
    return <p className="text-subtle text-sm leading-relaxed font-body">{text}</p>
  }
  return (
    <ul className="space-y-1.5">
      {parts.map((part, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-subtle font-body">
          <span className="text-navy mt-1 flex-shrink-0" aria-hidden="true">·</span>
          <span className="leading-relaxed">{part}</span>
        </li>
      ))}
    </ul>
  )
}

// Page
export default async function TippingPointDetailPage({ params }: { params: { slug: string } }) {
  let tp
  try {
    tp = await getTippingPointBySlug(params.slug)
  } catch {
    notFound()
  }

  const severityConfig = getSeverityConfig(tp.severity)
  const domainConfig   = getDomainConfig(tp.domain)
  const theme          = getThemeForDomain(tp.domain)
  const sourceUrls     = parseSourceUrls(tp.source_urls)

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Back nav */}
        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-olive transition-colors mb-8 font-ui"
        >
          <ArrowLeft size={14} />
          Back to Explorer
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Main column */}
          <div>

            {/* Hero header */}
            <div className="relative bg-card border border-border rounded-card p-6 mb-8 overflow-hidden">
              <div
                className="severity-bar"
                style={{ backgroundColor: severityConfig.barColor }}
                aria-hidden="true"
              />
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none"
                style={{ backgroundColor: severityConfig.barColor }}
                aria-hidden="true"
              />
              <div className="relative pl-3">
                <div className="flex items-center gap-3 mb-4">
                  <DomainBadge domain={tp.domain} domainRaw={tp.domain_raw} />
                  <SeverityThermometer severity={tp.severity} />
                </div>

                {/* heading*/}
                <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text leading-tight mb-3">
                  {tp.name}
                </h1>

                <p className="text-subtle text-base leading-relaxed max-w-2xl font-body">
                  {tp.app_card_summary}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-surface border border-divider text-xs text-muted font-ui">
                  <Info size={11} aria-hidden="true" />
                  {tp.scale}
                </div>
              </div>
            </div>

            {/* Near-term status */}
            <div className="bg-card border border-divider rounded-card px-5 py-4 mb-8 flex items-start gap-3">
              <AlertTriangle size={16} className="text-[#D4845A] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-ui uppercase tracking-widest text-[#D4845A] mb-1">
                  Near-term status
                </p>
                <p className="text-sm text-text leading-relaxed font-body">{tp.near_term_status}</p>
              </div>
            </div>

            <Section icon={Info} title="Scientific context">
              <div className="bg-card border border-divider rounded-card p-5">
                <p className="text-subtle text-sm leading-relaxed font-body">{tp.warming_context}</p>
              </div>
            </Section>

            <Section icon={Zap} title="Primary causes" accent="terra">
              <div className="bg-card border border-divider rounded-card p-5">
                <ProseBlock text={tp.primary_causes} />
              </div>
            </Section>

            <Section icon={GitMerge} title="Effects if tipped" accent="peach">
              <div className="bg-card border border-divider rounded-card p-5">
                <ProseBlock text={tp.effects} />
              </div>
            </Section>

            <Section icon={GitMerge} title="System interactions" accent="sage">
              <div className="bg-card border border-divider rounded-card p-5">
                <ProseBlock text={tp.interactions} />
              </div>
            </Section>

            <Section icon={AlertTriangle} title="Common misinformation" accent="terra">
              <div className="bg-card border border-terra/15 rounded-card p-5">
                <p className="text-sm text-subtle leading-relaxed font-body">
                  {tp.misinformation_angle}
                </p>
              </div>
            </Section>

            {sourceUrls.length > 0 && (
              <Section icon={BookOpen} title="Sources">
                <div className="space-y-2">
                  {sourceUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-olive hover:text-terra transition-colors group font-ui"
                    >
                      <ExternalLink size={12} className="flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">{url}</span>
                    </a>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">

            <div className="bg-card border border-border rounded-card p-5">
              <h2 className="text-xs font-ui uppercase tracking-widest text-olive mb-4">
                Domino chain
              </h2>
              <DominoChain summary={tp.domino_summary} />
            </div>

            {(tp.outgoing_relationships.length > 0 || tp.incoming_relationships.length > 0) && (
              <div className="bg-card border border-border rounded-card p-5">
                <h2 className="text-xs font-ui uppercase tracking-widest text-olive mb-4">
                  Connected systems
                </h2>
                <RelationshipPanel
                  outgoing={tp.outgoing_relationships}
                  incoming={tp.incoming_relationships}
                />
              </div>
            )}

            <Link
              href={`/simulator?tipping_point=${tp.slug}`}
              className="block w-full text-center bg-olive/10 border border-olive/30 hover:bg-olive/20 hover:border-olive/50 transition-colors rounded-card px-4 py-3 text-sm font-ui text-olive"
            >
              Run domino simulation
            </Link>
          </aside>
        </div>
      </div>
  )
}
