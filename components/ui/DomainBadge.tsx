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
    <span className={clsx('inline-flex items-center text-xs text-subtle font-ui', className)}>
      {domainRaw ?? config.label}
    </span>
  )
}
