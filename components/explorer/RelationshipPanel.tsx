import Link from 'next/link'
import { ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react'
import type { TippingPointRelationship } from '@/lib/types'
import { getRelationshipLabel } from '@/lib/tokens'

interface Props {
  outgoing: TippingPointRelationship[]
  incoming: TippingPointRelationship[]
}

function RelationshipRow({
  rel,
  direction,
}: {
  rel: TippingPointRelationship
  direction: 'outgoing' | 'incoming'
}) {
  const targetSlug = direction === 'outgoing' ? rel.target_slug : rel.source_slug
  const targetName = direction === 'outgoing' ? rel.target_name : rel.source_name
  const Icon = rel.is_bidirectional
    ? ArrowLeftRight
    : direction === 'outgoing' ? ArrowRight : ArrowLeft

  return (
    <Link
      href={`/explorer/${targetSlug}`}
      className="flex items-center gap-3 p-3 rounded-card bg-background border border-divider hover:border-olive/40 hover:bg-card transition-colors group"
    >
      <Icon
        size={14}
        className={direction === 'outgoing' ? 'text-terra flex-shrink-0' : 'text-olive flex-shrink-0'}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-heading text-text group-hover:text-olive transition-colors truncate">
          {targetName}
        </p>
        <p className="text-xs text-muted mt-0.5 font-ui">
          {getRelationshipLabel(rel.relationship_type)}
          {' · '}
          {'●'.repeat(rel.strength)}{'○'.repeat(5 - rel.strength)}
        </p>
      </div>
    </Link>
  )
}

export function RelationshipPanel({ outgoing, incoming }: Props) {
  if (outgoing.length === 0 && incoming.length === 0) return null

  return (
    <div className="space-y-6">
      {outgoing.length > 0 && (
        <div>
          <h3 className="text-xs font-ui uppercase tracking-widest text-terra mb-3 flex items-center gap-1.5">
            <ArrowRight size={12} aria-hidden="true" />
            Can trigger
          </h3>
          <div className="space-y-2">
            {outgoing.map(rel => (
              <RelationshipRow key={rel.id} rel={rel} direction="outgoing" />
            ))}
          </div>
        </div>
      )}
      {incoming.length > 0 && (
        <div>
          <h3 className="text-xs font-ui uppercase tracking-widest text-olive mb-3 flex items-center gap-1.5">
            <ArrowLeft size={12} aria-hidden="true" />
            Triggered by
          </h3>
          <div className="space-y-2">
            {incoming.map(rel => (
              <RelationshipRow key={rel.id} rel={rel} direction="incoming" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
