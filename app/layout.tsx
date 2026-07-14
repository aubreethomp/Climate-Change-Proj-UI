import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { ThemedBackground } from '@/components/background/ThemedBackground'
import { getThemeForDomain } from '@/lib/tokens'

const woodenLog = localFont({
  src: '../public/fonts/WoodenLog.ttf',
  variable: '--font-wooden-log',
  display: 'swap',
})

const safetyMedium = localFont({
  src: '../public/fonts/SafetyMedium.otf',
  variable: '--font-safety-medium',
  display: 'swap',
})

const bonnyMedium = localFont({
  src: '../public/fonts/BonnyMedium.woff2',
  variable: '--font-bonny-medium',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Focusing on Climate Change',
    template: '%s | Focusing on Climate Change',
  },
  description:
    'Explore how climate tipping points, misinformation, and delayed action create cascading domino effects across ecosystems and communities.',
  keywords: ['climate change', 'tipping points', 'climate science', 'domino effect', 'media literacy'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${woodenLog.variable} ${safetyMedium.variable} ${bonnyMedium.variable}`}>
      <body className="bg-background text-text font-body min-h-screen">
        {/* Fixed animated background — vines by default; detail pages override */}
        <ThemedBackground />

        {/* All content sits above the scene */}
        <div className="content-layer">
          <Navbar />
          <main className="min-h-[calc(100dvh-64px)]">
            {children}
          </main>
          <footer className="border-t border-divider mt-16 py-8 text-center text-subtle text-sm font-body">
            <p>
              This is an educational simulation.{' '}
              <span className="text-text">Not a predictive climate model.</span>
            </p>
            <p className="mt-1 text-text text-xs">
              Data sourced from{' '}
              <a
                href="https://global-tipping-points.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive hover:underline"
              >
                Global Tipping Points Report
              </a>{' '}
              and IPCC AR6.
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
