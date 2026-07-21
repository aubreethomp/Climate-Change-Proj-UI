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
      <nav className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-[5.5rem]">

        <Link href="/" className="relative z-10 flex min-w-0 w-[14rem] sm:w-[18rem] lg:w-[22rem] flex-shrink-0 flex-col items-start gap-0.1 pr-6 pt-5">
          <span className="font-display text-[1.5rem] sm:text-[1.9rem] font-semibold tracking-wide text-text leading-tight">
            The Threshold
          </span>
          <span className="text-[0.45rem] sm:text-[0.50rem] font-ui font-medium uppercase tracking-[0.1em] text-subtle/90 leading-tight">
            Cause, Effects, and Relationships of Climate Tipping Points
          </span>
        </Link>

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-end gap-1 flex-wrap sm:right-6 lg:right-8">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-[0.6rem] sm:text-[0.60rem] font-medium font-ui transition-colors whitespace-nowrap',
                  active
                    ? 'bg-card text-olive border border-border'
                    : 'text-subtle hover:text-text hover:bg-card',
                )}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
