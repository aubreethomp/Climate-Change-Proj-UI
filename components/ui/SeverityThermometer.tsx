import clsx from 'clsx'
import type { Severity } from '@/lib/tokens'
import { getSeverityConfig } from '@/lib/tokens'

interface Props {
  severity: Severity
  className?: string
}

// How full the mercury column is for each severity level
const FILL_FRACTION: Record<Severity, number> = {
  low: 0.28,
  medium: 0.55,
  high: 0.8,
  extreme: 1,
}

// Stem geometry, in SVG units (viewBox is 0 0 11 21)
const STEM_TOP = 1
const STEM_BOTTOM = 14
const STEM_HEIGHT = STEM_BOTTOM - STEM_TOP

export function SeverityThermometer({ severity, className }: Props) {
  const config = getSeverityConfig(severity)
  const fraction = FILL_FRACTION[severity] ?? 0.5
  const fillY = STEM_BOTTOM - STEM_HEIGHT * fraction

  return (
    <span
      className={clsx('inline-flex items-center gap-1.5', className)}
      aria-label={`${config.label} severity`}
    >
      <svg width="11" height="21" viewBox="0 0 11 21" aria-hidden="true">
        {/* Bulb outline + faint tinted fill */}
        <circle
          cx="5.5" cy="16.5" r="3.6"
          stroke={config.barColor} strokeWidth="1.1"
          fill={`${config.barColor}1A`}
        />
        {/* Stem outline + faint tinted fill */}
        <rect
          x="3.5" y={STEM_TOP} width="4" height={STEM_HEIGHT} rx="2"
          stroke={config.barColor} strokeWidth="1.1"
          fill={`${config.barColor}1A`}
        />
        {/* Mercury column — height set by severity, bleeds down into the bulb */}
        <rect
          x="4.4" y={fillY} width="2.2" height={STEM_BOTTOM - fillY + 4} rx="1.1"
          fill={config.barColor}
        />
        {/* Bulb reservoir — always full, drawn last so it stays crisp */}
        <circle cx="5.5" cy="16.5" r="2.3" fill={config.barColor} />
        {/* Degree ticks */}
        <line x1="8.3" y1="3.5"  x2="9.4" y2="3.5"  stroke={config.barColor} strokeWidth="0.7" strokeOpacity="0.55" />
        <line x1="8.3" y1="7.5"  x2="9.4" y2="7.5"  stroke={config.barColor} strokeWidth="0.7" strokeOpacity="0.55" />
        <line x1="8.3" y1="11.5" x2="9.4" y2="11.5" stroke={config.barColor} strokeWidth="0.7" strokeOpacity="0.55" />
      </svg>
      <span
        className="font-semibold uppercase"
        style={{
          color: config.barColor,
          fontSize: '0.6875rem',
          letterSpacing: '0.05em',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {config.label}
      </span>
    </span>
  )
}
