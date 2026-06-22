'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import clsx from 'clsx'
import type { TippingPointCard as TippingPointCardType } from '@/lib/types'
import { TippingPointCard } from './TippingPointCard'
import { DomainFilter } from './DomainFilter'

interface Props {
  tippingPoints: TippingPointCardType[]
}

const DOMAIN_FILTER_MAP: Record<string, (domain: string) => boolean> = {
  all:                          ()  => true,
  cryosphere:                   (d) => d.startsWith('cryosphere'),
  biosphere:                    (d) => d.startsWith('biosphere'),
  ocean_atmosphere_circulation: (d) => d === 'ocean_atmosphere_circulation',
}

export function ExplorerGrid({ tippingPoints }: Props) {
  const [search,         setSearch]         = useState('')
  const [domainFilter,   setDomainFilter]   = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [showFilters,    setShowFilters]    = useState(true)

  const filtered = useMemo(() => {
    return tippingPoints.filter(tp => {
      if (!(DOMAIN_FILTER_MAP[domainFilter]?.(tp.domain) ?? true)) return false
      if (severityFilter !== 'all' && tp.severity !== severityFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          tp.name.toLowerCase().includes(q) ||
          tp.app_card_summary.toLowerCase().includes(q) ||
          tp.domain_raw.toLowerCase().includes(q) ||
          tp.near_term_status.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [tippingPoints, domainFilter, severityFilter, search])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="search"
              placeholder="Search tipping points…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
              aria-label="Search tipping points"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'flex items-center gap-2 px-3 py-[0.625rem] rounded-lg border text-sm font-ui transition-colors',
              showFilters
                ? 'bg-card border-olive/40 text-olive'
                : 'bg-card border-border text-subtle hover:text-text',
            )}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-card border border-border rounded-card p-4 animate-fade-up">
            <DomainFilter
              activeFilter={domainFilter}
              onChange={setDomainFilter}
              severityFilter={severityFilter}
              onSeverityChange={setSeverityFilter}
            />
          </div>
        )}

        <p className="text-xs text-muted font-ui">
          Showing{' '}
          <span className="text-olive font-semibold">{filtered.length}</span>
          {' '}of{' '}
          <span className="text-subtle">{tippingPoints.length}</span>{' '}
          tipping points
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-heading text-lg font-semibold text-text mb-1">No results</p>
          <p className="text-subtle text-sm font-body mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tp, i) => (
            <TippingPointCard
              key={tp.slug}
              tp={tp}
              style={{ animationDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
