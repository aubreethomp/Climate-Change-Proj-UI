'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import type { SimulationResult } from '@/lib/api'
import { ScoreGauge }   from './ScoreGauge'
import { RiskBanner }   from './RiskBanner'
import { DominoResults } from './DominoResults'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

function DominoLottie({ size = 56 }: { size?: number }) {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    fetch('/animations/domino.json')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
  }, [])

  if (!data) return null
  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  )
}

interface Props {
  result:  SimulationResult | null
  loading: boolean
}

const INTERVENTION_ICONS: Record<string, string> = {
  'media literacy':  'Read widely and verify sources.',
  'trust':           'Engage with local community science programs.',
  'policy':          'Contact elected representatives about climate timelines.',
  'emissions':       'Support rapid transition to clean energy.',
  'resilience':      'Protect and restore natural ecosystems.',
  'manageable':      'Maintain current efforts — progress is real.',
}

export function ResultsPanel({ result, loading }: Props) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p className="font-ui text-xs uppercase tracking-widest text-muted mb-1">
          Running simulation…
        </p>
        {[120, 80, 200, 300].map((h, i) => (
          <div
            key={i}
            style={{
              height:       h,
              background:   '#FFFAF8',
              border:       '1px solid #F2D9CF',
              borderRadius: 10,
              animation:    'pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </div>
    )
  }

  if (!result) {
    return (
      <div
        style={{
          background:   '#FFFAF8',
          border:       '1px dashed #EDD5C8',
          borderRadius: 10,
          padding:      '16px',
          display:      'flex',
          alignItems:   'center',
          gap:          12,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <DominoLottie size={82} />
          <div style={{ textAlign: 'center' }}></div>
        </div>
        <p className="font-body text-muted text-sm leading-relaxed">
          Set the sliders or choose a preset, then click{' '}
          <span className="font-ui font-semibold text-terra">Run Simulation</span>{' '}
          to see which tipping points cascade.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Risk banner */}
      <RiskBanner riskLevel={result.risk_level} />

      {/* Score gauges */}
      <div
        style={{
          background:     '#FFFAF8',
          border:         '1px solid #F2D9CF',
          borderRadius:   10,
          padding:        '20px 16px',
        }}
      >
        <p className="font-ui text-xs uppercase tracking-widest text-muted mb-4">
          System indicators
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <ScoreGauge
            label="Trust Score"
            value={result.trust_score}
            invert={true}
          />
          <ScoreGauge
            label="Delay Risk"
            value={result.delay_risk}
          />
          <ScoreGauge
            label="Climate Pressure"
            value={result.climate_pressure}
          />
        </div>
      </div>

      {/* Narrative */}
      <div
        style={{
          background:   '#FFFAF8',
          border:       '1px solid #F2D9CF',
          borderRadius: 10,
          padding:      '16px',
        }}
      >
        <p className="font-ui text-xs uppercase tracking-widest text-muted mb-2">
          Scenario narrative
        </p>
        <p className="font-body text-text text-sm leading-relaxed">
          {result.narrative}
        </p>
      </div>

      {/* Activated domino chain */}
      <div
        style={{
          background:   '#FFFAF8',
          border:       '1px solid #F2D9CF',
          borderRadius: 10,
          padding:      '16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <DominoLottie size={80} />
          <div style={{ textAlign: 'center' }}>
            <p className="font-ui text-xs uppercase tracking-widest text-muted">
              Cascade chain
            </p>
            <p className="font-heading text-text text-sm font-semibold">
              Activated tipping points
            </p>
          </div>
        </div>
        <DominoResults nodes={result.activated_nodes} />
      </div>

      {/* Interventions */}
      {/*
        VISUAL OPPORTUNITY:
        Use your sustainable wind energy Lottie as a small icon on each
        intervention card*/}
      {result.interventions.length > 0 && (
        <div
          style={{
            background:   '#FFFAF8',
            border:       '1px solid #A8C5A0',
            borderRadius: 10,
            padding:      '16px',
          }}
        >
          <p className="font-ui text-xs uppercase tracking-widest text-[#4A7A42] mb-3">
            Suggested interventions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.interventions.map((intervention, i) => (
              <div
                key={i}
                style={{
                  display:      'flex',
                  alignItems:   'flex-start',
                  gap:          10,
                  background:   'rgba(168,197,160,0.1)',
                  border:       '1px solid rgba(168,197,160,0.4)',
                  borderRadius: 8,
                  padding:      '10px 12px',
                  opacity:      0,
                  animation:    `fade-in 0.4s ease ${i * 0.15 + 0.5}s forwards`,
                }}
              >
                {/* Green dot indicator */}
                <div
                  style={{
                    width:           8,
                    height:          8,
                    borderRadius:    '50%',
                    backgroundColor: '#A8C5A0',
                    flexShrink:      0,
                    marginTop:       4,
                  }}
                />
                <p className="font-body text-text text-sm leading-relaxed">
                  {intervention}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
