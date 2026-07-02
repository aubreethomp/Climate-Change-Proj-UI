'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clock10, RefreshCw, CloudFog, BookOpen } from 'lucide-react'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/explorer',  label: 'Tipping Point Explorer',  icon: Clock10     },
  { href: '/simulator', label: 'Domino Effect Simulator', icon: RefreshCw },
  { href: '/lab',       label: 'Media Literacy', icon: BookOpen     },
  { href: '/evidence',  label: 'Evidence Dashboard',  icon: CloudFog     },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-divider">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 min-h-[5.5rem] flex items-center justify-between gap-4">

        <Link href="/" className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <span className="font-display text-[1.05rem] sm:text-[1.2rem] font-semibold tracking-wide text-terra leading-tight">
            The Threshold
          </span>
          <span className="text-[0.72rem] sm:text-[0.8rem] font-ui font-medium uppercase tracking-[0.2em] text-subtle/90 leading-tight">
            Cause, Effects, and Relationships of Climate Tipping Points
          </span>
        </Link>

        <div className="flex items-center gap-1 flex-wrap justify-end ml-4 sm:ml-6">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium font-ui transition-colors whitespace-nowrap',
                  active
                    ? 'bg-card text-olive border border-border'
                    : 'text-subtle hover:text-text hover:bg-card',
                )}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
