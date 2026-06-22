'use client'

import clsx from 'clsx'

const DOMAIN_GROUPS = [
  { key: 'all',                          label: 'All' },
  { key: 'cryosphere',                   label: 'Cryosphere' },
  { key: 'biosphere',                    label: 'Biosphere' },
  { key: 'ocean_atmosphere_circulation', label: 'Ocean & Circulation' },
] as const

const SEVERITY_OPTIONS = [
  { key: 'all',     label: 'All severity' },
  { key: 'extreme', label: 'Extreme' },
  { key: 'high',    label: 'High' },
  { key: 'medium',  label: 'Medium' },
] as const

interface Props {
  activeFilter: string
  onChange: (key: string) => void
  severityFilter: string
  onSeverityChange: (sev: string) => void
}

export function DomainFilter({ activeFilter, onChange, severityFilter, onSeverityChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted font-ui uppercase tracking-widest mb-2">Domain</p>
        <div className="flex flex-wrap gap-2">
          {DOMAIN_GROUPS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={clsx('filter-pill', activeFilter === key && 'active')}
              aria-pressed={activeFilter === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted font-ui uppercase tracking-widest mb-2">Severity</p>
        <div className="flex flex-wrap gap-2">
          {SEVERITY_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onSeverityChange(key)}
              className={clsx('filter-pill', severityFilter === key && 'active')}
              aria-pressed={severityFilter === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
