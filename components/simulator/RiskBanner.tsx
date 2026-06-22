'use client'

import { useEffect, useState } from 'react'

type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

const RISK_CONFIG: Record<RiskLevel, {
  label:       string
  description: string
  bg:          string
  border:      string
  text:        string
  pulse:       boolean
}> = {
  low: {
    label:       'LOW RISK',
    description: 'Cascading tipping-point interactions appear limited under these conditions.',
    bg:          'rgba(168,197,160,0.15)',
    border:      '#A8C5A0',
    text:        '#4A7A42',
    pulse:       false,
  },
  moderate: {
    label:       'MODERATE RISK',
    description: 'Several tipping points are approaching their thresholds. Sustained action can prevent escalation.',
    bg:          'rgba(212,132,90,0.12)',
    border:      '#D4845A',
    text:        '#A0461A',
    pulse:       false,
  },
  high: {
    label:       'HIGH RISK',
    description: 'Multiple tipping-point cascades are active and reinforcing each other.',
    bg:          'rgba(216,79,35,0.12)',
    border:      '#D84F23',
    text:        '#D84F23',
    pulse:       true,
  },
  critical: {
    label:       'CRITICAL',
    description: 'Widespread tipping-point activation — a cascade state. Immediate intervention is essential.',
    bg:          'rgba(139,26,0,0.12)',
    border:      '#8B1A00',
    text:        '#8B1A00',
    pulse:       true,
  },
}

interface Props {
  riskLevel: RiskLevel
}

export function RiskBanner({ riskLevel }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [riskLevel])

  const cfg = RISK_CONFIG[riskLevel]

  return (
    <div
      style={{
        background:    cfg.bg,
        border:        `1px solid ${cfg.border}`,
        borderRadius:  10,
        padding:       '12px 16px',
        opacity:       visible ? 1 : 0,
        transform:     visible ? 'translateY(0)' : 'translateY(6px)',
        transition:    'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Pulsing dot for high/critical */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width:        12,
              height:       12,
              borderRadius: '50%',
              backgroundColor: cfg.border,
              animation:    cfg.pulse ? 'risk-pulse 1.5s ease-in-out infinite' : 'none',
            }}
          />
          <style>{`
            @keyframes risk-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50%       { transform: scale(1.4); opacity: 0.6; }
            }
          `}</style>
        </div>
        <div>
          <p className="font-ui font-bold tracking-widest text-xs" style={{ color: cfg.text }}>
            {cfg.label}
          </p>
          <p className="text-sm font-body text-subtle mt-0.5">{cfg.description}</p>
        </div>
      </div>
    </div>
  )
}
