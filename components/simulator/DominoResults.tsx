'use client'

import { useEffect, useState } from 'react'
import type { ActivatedNode } from '@/lib/api'

interface Props {
  nodes: ActivatedNode[]
}

const DOMAIN_LABELS: Record<string, string> = {
  cryosphere:                   'Cryosphere',
  cryosphere_carbon_cycle:      'Cryosphere / Carbon',
  biosphere_ocean:              'Biosphere / Ocean',
  biosphere:                    'Biosphere',
  ocean_atmosphere_circulation: 'Ocean Circulation',
  cryosphere_ocean:             'Cryosphere / Ocean',
  cryosphere_water:             'Cryosphere / Water',
  atmosphere_hydrology:         'Atmosphere / Hydrology',
  biosphere_hydrology:          'Biosphere / Hydrology',
  biosphere_freshwater:         'Biosphere / Freshwater',
  biosphere_food:               'Biosphere / Food',
  biosphere_coastal:            'Biosphere / Coastal',
}

function ActivationBar({ score }: { score: number }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(score * 100), 50)
    return () => clearTimeout(t)
  }, [score])

  const color = score > 0.75 ? '#8B1A00'
    : score > 0.5 ? '#D84F23'
    : score > 0.3 ? '#D4845A'
    : '#A8C5A0'

  return (
    <div style={{ background: '#EDD5C8', borderRadius: 4, height: 4, overflow: 'hidden', marginTop: 4 }}>
      <div
        style={{
          height:           '100%',
          width:            `${width}%`,
          backgroundColor:  color,
          borderRadius:     4,
          transition:       'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  )
}

export function DominoResults({ nodes }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)

  // One node every 400ms like dominoes falling
  useEffect(() => {
    setVisibleCount(0)
    if (nodes.length === 0) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= nodes.length) clearInterval(interval)
    }, 400)

    return () => clearInterval(interval)
  }, [nodes])

  if (nodes.length === 0) {
    return (
      <div
        style={{
          background:   '#FFFAF8',
          border:       '1px solid #EDD5C8',
          borderRadius: 10,
          padding:      '24px 16px',
          textAlign:    'center',
        }}
      >
        <p className="font-heading text-text text-base mb-1">No tipping points activated</p>
        <p className="font-body text-subtle text-sm">
          Under these conditions, cascading effects appear limited.
          Try increasing emissions or decreasing resilience.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="font-ui text-xs uppercase tracking-widest text-muted mb-3">
        {nodes.length} tipping point{nodes.length !== 1 ? 's' : ''} activated
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {nodes.map((node, i) => {
          const isVisible = i < visibleCount
          const isCascade = node.triggered_by.length > 0

          return (
            <div key={node.slug}>
              {/* Node card */}
              <div
                style={{
                  background:   '#FFFAF8',
                  border:       '1px solid #F2D9CF',
                  borderRadius: 10,
                  padding:      '12px 14px',
                  opacity:      isVisible ? 1 : 0,
                  transform:    isVisible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
                  transition:   'opacity 0.35s ease, transform 0.35s ease',
                  position:     'relative',
                  overflow:     'hidden',
                }}
              >
                {/* Activation strength left bar */}
                <div
                  style={{
                    position:        'absolute',
                    left:            0,
                    top:             0,
                    bottom:          0,
                    width:           3,
                    backgroundColor: node.activation_score > 0.7 ? '#D84F23'
                      : node.activation_score > 0.4 ? '#D4845A'
                      : '#A8C5A0',
                    borderRadius:    '10px 0 0 10px',
                  }}
                />

                <div style={{ paddingLeft: 10 }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div>
                      <p className="font-heading text-text text-sm font-semibold leading-snug">
                        {node.name}
                      </p>
                      <p className="font-ui text-muted text-xs mt-0.5">
                        {DOMAIN_LABELS[node.domain] ?? node.domain}
                        {isCascade && (
                          <span style={{ color: '#D84F23', marginLeft: 6 }}>
                            · cascade triggered
                          </span>
                        )}
                      </p>
                    </div>
                    <span
                      className="font-ui font-bold text-xs flex-shrink-0"
                      style={{
                        color: node.activation_score > 0.7 ? '#D84F23'
                          : node.activation_score > 0.4 ? '#D4845A'
                          : '#4A7A42',
                      }}
                    >
                      {Math.round(node.activation_score * 100)}%
                    </span>
                  </div>

                  {/* Activation strength bar */}
                  {isVisible && <ActivationBar score={node.activation_score} />}

                  {/* Cascade source */}
                  {isCascade && node.triggered_by.length > 0 && (
                    <p className="font-body text-xs text-muted mt-2">
                      Triggered by: {node.triggered_by.join(', ').replace(/_/g, ' ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow connector between nodes */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    display:        'flex',
                    justifyContent: 'center',
                    padding:        '4px 0',
                    opacity:        i + 1 < visibleCount ? 1 : 0,
                    transition:     'opacity 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                    <div style={{ width: 1, height: 10, backgroundColor: '#EDD5C8' }} />
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M6 8L0 0h12L6 8z" fill="#C4A090" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
