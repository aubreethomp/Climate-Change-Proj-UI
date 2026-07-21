'use client'

import { useState, useCallback } from 'react'
import type { SimulationInput, SimulationResult, SimulationScenario } from '@/lib/api'
import { runSimulation } from '@/lib/api'
import { SliderPanel }  from './SliderPanel'
import { ResultsPanel } from './ResultsPanel'

const DEFAULT_VALUES: Omit<SimulationInput, 'scenario_slug' | 'save_run'> = {
  misinformation: 50,
  media_literacy: 50,
  public_trust:   50,
  policy_speed:   50,
  emissions:      50,
  resilience:     50,
}

type Tab = 'sliders' | 'results'

interface Props {
  scenarios: SimulationScenario[]
}

export function SimulatorClient({ scenarios }: Props) {
  const [values,          setValues]          = useState(DEFAULT_VALUES)
  const [result,          setResult]          = useState<SimulationResult | null>(null)
  const [loading,         setLoading]         = useState(false)
  const [error,           setError]           = useState<string | null>(null)
  const [activeScenario,  setActiveScenario]  = useState<string | null>(null)
  const [activeTab,       setActiveTab]       = useState<Tab>('sliders')

  const handleSliderChange = useCallback(
    (key: keyof typeof DEFAULT_VALUES, val: number) => {
      setValues(prev => ({ ...prev, [key]: val }))
      setActiveScenario(null)
    },
    [],
  )

  const handleScenarioSelect = useCallback((s: SimulationScenario) => {
    setValues({
      misinformation: s.default_misinformation,
      media_literacy: s.default_media_literacy,
      public_trust:   s.default_public_trust,
      policy_speed:   s.default_policy_speed,
      emissions:      s.default_emissions,
      resilience:     s.default_resilience,
    })
    setActiveScenario(s.slug)
  }, [])

  const handleRun = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await runSimulation({ ...values, save_run: false })
      setResult(res)
      // On mobile, auto-switch to results tab after running
      setActiveTab('results')
    } catch (e) {
      setError('Could not reach the simulation server. Make sure Django is running.')
    } finally {
      setLoading(false)
    }
  }, [values])

  return (
    <div>
      {/*  Mobile tab switcher */}
      <div
        className="lg:hidden"
        style={{
          display:       'flex',
          gap:           0,
          marginBottom:  20,
          background:    '#FFFAF8',
          border:        '1px solid #F2D9CF',
          borderRadius:  10,
          overflow:      'hidden',
        }}
      >
        {(['sliders', 'results'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex:        1,
              padding:     '10px 0',
              border:      'none',
              background:  activeTab === tab ? '#D84F23' : 'transparent',
              color:       activeTab === tab ? '#FFFAF8' : '#8B6355',
              fontFamily:  "'Space Grotesk', sans-serif",
              fontWeight:  600,
              fontSize:    '0.875rem',
              cursor:      'pointer',
              transition:  'all 0.15s ease',
              letterSpacing: '0.02em',
            }}
          >
            {tab === 'sliders' ? 'Adjust Conditions' : `Results${result ? ` · ${result.risk_level.toUpperCase()}` : ''}`}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            background:   'rgba(216,79,35,0.08)',
            border:       '1px solid #D84F23',
            borderRadius: 10,
            padding:      '12px 16px',
            marginBottom: 16,
          }}
        >
          <p className="font-body text-terra text-sm">{error}</p>
        </div>
      )}

      {/* Desktop: two columns / Mobile: tabs*/}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr',
          gap:                 24,
        }}
        className="lg:grid-cols-[480px_1fr]"
      >
        {/* Left panel (sliders) */}
        <div className={activeTab === 'results' ? 'hidden lg:block' : ''}>
          <p className="font-ui text-xs uppercase tracking-widest text-navy mb-3 hidden lg:block">
            Adjust conditions
          </p>
          <SliderPanel
            values={values}
            scenarios={scenarios}
            loading={loading}
            onChangeSlider={handleSliderChange}
            onSelectScenario={handleScenarioSelect}
            onRun={handleRun}
            activeScenario={activeScenario}
          />
        </div>

        {/* Right panel (results) */}
        <div className={activeTab === 'sliders' ? 'hidden lg:block' : ''}>
          <p className="font-ui text-xs uppercase tracking-widest text-subtle mb-3 hidden lg:block">
            Live results
          </p>
          <ResultsPanel result={result} loading={loading} />

          {/* Mobile run button (when on results tab with no result) */}
          {!result && !loading && (
            <div className="lg:hidden mt-4">
              <button
                onClick={() => setActiveTab('sliders')}
                style={{
                  width:       '100%',
                  padding:     '12px',
                  borderRadius: 10,
                  border:      '1px solid #D84F23',
                  background:  'transparent',
                  color:       '#D84F23',
                  fontFamily:  "'Space Grotesk', sans-serif",
                  fontWeight:  600,
                  fontSize:    '0.875rem',
                  cursor:      'pointer',
                }}
              >
                Go to sliders
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
