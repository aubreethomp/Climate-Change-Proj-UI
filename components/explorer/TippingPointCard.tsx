import Link from 'next/link'
import type { TippingPointCard } from '@/lib/types'
import { getSeverityConfig, getDomainConfig } from '@/lib/tokens'
import { SeverityThermometer } from '@/components/ui/SeverityThermometer'
import { truncate } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface Props {
  tp: TippingPointCard
  style?: React.CSSProperties
}

export function TippingPointCard({ tp, style }: Props) {
  const severityConfig = getSeverityConfig(tp.severity)
  const domainConfig   = getDomainConfig(tp.domain)

  return (
    <Link
      href={`/explorer/${tp.slug}`}
      className="tp-card block group"
      style={style}
      aria-label={`${tp.name} — ${severityConfig.label} severity`}
    >
      {/* Severity left bar */}
      <div
        className="severity-bar"
        style={{ backgroundColor: severityConfig.barColor }}
        aria-hidden="true"
      />

      <div className="pl-5 pr-4 pt-4 pb-4">

        {/* Domain label + severity badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-xs text-muted font-ui uppercase tracking-wide">
            {domainConfig.label}
          </span>
          <SeverityThermometer severity={tp.severity} />
        </div>

        {/* Card title — Lora */}
        <h3 className="font-heading font-semibold text-[0.9375rem] leading-snug text-text mb-2 group-hover:text-olive transition-colors">
          {tp.name}
        </h3>

        {/* Summary — Inter */}
        <p className="text-subtle text-sm leading-relaxed mb-4 font-body">
          {truncate(tp.app_card_summary, 120)}
        </p>

        {/* Near-term status */}
        <div className="border-t border-divider pt-3">
          <p className="text-xs text-muted leading-snug font-body">
            <span className="text-olive font-ui font-medium">Status: </span>
            {truncate(tp.near_term_status, 90)}
          </p>
        </div>

        {/* Hover CTA */}
        <div className="flex items-center gap-1 mt-3 text-xs text-muted group-hover:text-olive transition-colors">
          <span className="font-ui">Explore domino chain</span>
          <ChevronRight size={12} />
        </div>
      </div>
    </Link>
  )
}
