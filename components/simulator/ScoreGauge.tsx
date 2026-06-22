'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  label:     string
  value:     number        // 0-100
  invert?:   boolean       // true = high value is GOOD (trust score)
  size?:     number
}

// Returns color based on value and whether high=good or high=bad
function getColor(value: number, invert: boolean): string {
  const v = invert ? 100 - value : value
  if (v < 30) return '#A8C5A0'  // sage green — safe
  if (v < 55) return '#D4845A'  // warm orange — caution
  if (v < 75) return '#D84F23'  // terracotta — danger
  return '#8B1A00'              // deep red — critical
}

function getLabelColor(value: number, invert: boolean): string {
  const v = invert ? 100 - value : value
  if (v < 30) return '#4A7A42'
  if (v < 55) return '#A0461A'
  if (v < 75) return '#D84F23'
  return '#8B1A00'
}

export function ScoreGauge({ label, value, invert = false, size = 120 }: Props) {
  const [displayed, setDisplayed] = useState(0)
  const animRef = useRef<number | null>(null)

  // Animate the number counting up/down to the new value
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const start     = displayed
    const end       = value
    const duration  = 800
    const startTime = performance.now()

    function step(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(start + (end - start) * eased))
      if (progress < 1) animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [value])

  const radius      = (size - 16) / 2
  const cx          = size / 2
  const cy          = size / 2
  const circumference = Math.PI * radius  // half circle arc
  const strokeDash  = circumference
  // Arc goes from 180deg (left) to 0deg (right) — bottom half of circle
  const fillAmount  = (displayed / 100) * circumference
  const color       = getColor(displayed, invert)
  const labelColor  = getLabelColor(value, invert)

  // Critical pulse
  const isCritical = invert
    ? displayed < 25
    : displayed > 75

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: 'relative', width: size, height: size / 2 + 20 }}>
        <svg
          width={size}
          height={size / 2 + 8}
          viewBox={`0 0 ${size} ${size / 2 + 8}`}
          overflow="visible"
        >
          {/* Track arc — background */}
          <path
            d={`M 8 ${cy} A ${radius} ${radius} 0 0 1 ${size - 8} ${cy}`}
            fill="none"
            stroke="#EDD5C8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Value arc — animated */}
          <path
            d={`M 8 ${cy} A ${radius} ${radius} 0 0 1 ${size - 8} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${strokeDash}`}
            strokeDashoffset={strokeDash - fillAmount}
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease',
              filter: isCritical ? `drop-shadow(0 0 6px ${color})` : 'none',
            }}
          />
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map(tick => {
            const angle  = Math.PI - (tick / 100) * Math.PI
            const tx     = cx + radius * Math.cos(angle)
            const ty     = cy - radius * Math.sin(angle)
            const tx2    = cx + (radius - 10) * Math.cos(angle)
            const ty2    = cy - (radius - 10) * Math.sin(angle)
            return (
              <line
                key={tick}
                x1={tx} y1={ty} x2={tx2} y2={ty2}
                stroke="#C4A090"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {/* Center value */}
        <div
          style={{
            position:  'absolute',
            bottom:    0,
            left:      0,
            right:     0,
            textAlign: 'center',
          }}
        >
          <span
            className="font-ui font-bold"
            style={{
              fontSize:   size * 0.22,
              color:      labelColor,
              transition: 'color 0.4s ease',
              display:    'block',
              lineHeight: 1,
            }}
          >
            {displayed}
          </span>
          <span className="text-xs text-muted font-ui" style={{ fontSize: size * 0.1 }}>
            / 100
          </span>
        </div>
      </div>

      {/* Label */}
      <p
        className="text-xs font-ui uppercase tracking-widest text-center"
        style={{ color: labelColor, transition: 'color 0.4s ease', maxWidth: size }}
      >
        {label}
      </p>

      {/* Critical warning pulse */}
      {isCritical && (
        <p
          className="text-xs font-ui text-center animate-pulse"
          style={{ color, fontSize: '0.65rem' }}
        >
          {invert ? 'Critical low' : 'Critical high'}
        </p>
      )}
    </div>
  )
}
