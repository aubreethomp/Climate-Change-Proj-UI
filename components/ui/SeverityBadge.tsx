import clsx from 'clsx'
import type { Severity } from '@/lib/tokens'
import { getSeverityConfig } from '@/lib/tokens'

interface Props {
  severity: Severity
  className?: string
}

export function SeverityBadge({ severity, className }: Props) {
  const config = getSeverityConfig(severity)
  return (
    <button
      type="button"
      className={clsx('badge-button severity-button severity-badge', config.badgeClass, className)}
      style={{ fontFamily: 'var(--font-safety-medium)' }}
    >
      {config.label}
    </button>
  )
}
