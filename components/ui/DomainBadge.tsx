import clsx from 'clsx'
import type { Domain } from '@/lib/tokens'
import { getDomainConfig } from '@/lib/tokens'

interface Props {
  domain: Domain
  domainRaw?: string
  className?: string
}

export function DomainBadge({ domain, domainRaw, className }: Props) {
  const config = getDomainConfig(domain)
  return (
    <button
      type="button"
      className={clsx('badge-button domain-button', className)}
      style={{ fontFamily: 'var(--font-safety-medium)' }}
    >
      {domainRaw ?? config.label}
    </button>
  )
}
