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
    <span className={clsx('severity-badge', config.badgeClass, className)}>
      {config.label}
    </span>
  )
}
