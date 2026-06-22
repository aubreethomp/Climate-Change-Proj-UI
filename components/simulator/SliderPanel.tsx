'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { SimulationInput, SimulationScenario } from '@/lib/api'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface SliderConfig {
  key:         keyof Omit<SimulationInput, 'scenario_slug' | 'save_run'>
  label:       string
  description: string
  lowLabel:    string   // what the low end means
  highLabel:   string   // what the high end means
  invertColor: boolean  // true = low is bad (resilience), false = high is bad (misinfo)
  lottiePath:  string
}

const SLIDERS: SliderConfig[] = [
  {
    key:         'misinformation',
    label:       'Misinformation Exposure',
    description: 'How much false or misleading climate information is circulating in public discourse.',
    lowLabel:    'Accurate information',
    highLabel:   'Widespread misinformation',
    invertColor: false,
    lottiePath:  '/animations/misinformation.json',
  },
  {
    key:         'media_literacy',
    label:       'Media Literacy',
    description: 'How well the public can identify, evaluate, and counter misleading climate claims.',
    lowLabel:    'Low literacy',
    highLabel:   'High literacy',
    invertColor: true,
    lottiePath:  '/animations/literacy.json',
  },
  {
    key:         'public_trust',
    label:       'Public Trust',
    description: 'Baseline public trust in climate science and institutions reporting on it.',
    lowLabel:    'Collapsed trust',
    highLabel:   'Strong trust',
    invertColor: true,
    lottiePath:  '/animations/trust.json',
  },
  {
    key:         'policy_speed',
    label:       'Policy Response Speed',
    description: 'How quickly governments and institutions enact meaningful climate policy.',
    lowLabel:    'Stalled',
    highLabel:   'Rapid action',
    invertColor: true,
    lottiePath:  '/animations/policy.json',
  },
  {
    key:         'emissions',
    label:       'Emissions Pressure',
    description: 'Current level of greenhouse gas emissions relative to safe levels.',
    lowLabel:    'Near zero',
    highLabel:   'Extreme',
    invertColor: false,
    lottiePath:  '/animations/emissions.json',
  },
  {
    key:         'resilience',
    label:       'Ecosystem Resilience',
    description: 'The combined capacity of ecosystems and communities to absorb and recover from stress.',
    lowLabel:    'Fragile',
    highLabel:   'Resilient',
    invertColor: true,
    lottiePath:  '/animations/resilience.json',
  },
]

function getSliderColor(value: number, invert: boolean): string {
  const effective = invert ? 100 - value : value
  if (effective < 30) return '#A8C5A0'
  if (effective < 60) return '#D4845A'
  return '#D84F23'
}

interface SliderRowProps {
  config:   SliderConfig
  value:    number
  onChange: (key: keyof Omit<SimulationInput, 'scenario_slug' | 'save_run'>, val: number) => void
}

function SliderRow({ config, value, onChange }: SliderRowProps) {
  const color = getSliderColor(value, config.invertColor)

  return (
    <div
      style={{
        background:   '#FFFAF8',
        border:       '1px solid #F2D9CF',
        borderRadius: 10,
        padding:      '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>

        {/* Lottie icon — 44x44 */}
        <div style={{ flexShrink: 0, width: 44, height: 44 }}>
          <LottieIcon path={config.lottiePath} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Label + value */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <p className="font-ui font-semibold text-text text-sm">{config.label}</p>
            <span
              className="font-ui font-bold text-sm"
              style={{ color, transition: 'color 0.2s ease', flexShrink: 0, marginLeft: 8 }}
            >
              {value}
            </span>
          </div>

          {/* Description */}
          <p className="font-body text-muted text-xs leading-snug mb-3">
            {config.description}
          </p>

          {/* Slider */}
          <div style={{ position: 'relative' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={e => onChange(config.key, Number(e.target.value))}
              style={{
                width:          '100%',
                accentColor:    color,
                cursor:         'pointer',
                height:         4,
              }}
            />
            {/* Low / high labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <span className="font-ui text-muted" style={{ fontSize: '0.625rem' }}>
                {config.lowLabel}
              </span>
              <span className="font-ui text-muted" style={{ fontSize: '0.625rem' }}>
                {config.highLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Lottie icon with graceful fallback
function LottieIcon({ path }: { path: string }) {
  const [data, setData] = useState<object | null>(null)

  useEffect(() => {
    fetch(path)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
  }, [path])

  if (!data) {
    return (
      <div
        style={{
          width:        44,
          height:       44,
          borderRadius: 8,
          background:   '#F2D9CF',
        }}
      />
    )
  }

  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: 44, height: 44 }}
    />
  )
}

// Scenario preset pills
interface ScenarioPillsProps {
  scenarios: SimulationScenario[]
  onSelect:  (s: SimulationScenario) => void
  active:    string | null
}

function ScenarioPills({ scenarios, onSelect, active }: ScenarioPillsProps) {
  return (
    <div>
      <p className="font-ui text-xs uppercase tracking-widest text-muted mb-2">
        Preset scenarios
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(scenarios ?? []).map(s => (
          <button
            key={s.slug}
            onClick={() => onSelect(s)}
            style={{
              padding:       '6px 14px',
              borderRadius:  9999,
              border:        `1px solid ${active === s.slug ? '#8B8E25' : '#EDD5C8'}`,
              background:    active === s.slug ? 'rgba(139,142,37,0.1)' : '#FFFAF8',
              color:         active === s.slug ? '#8B8E25' : '#8B6355',
              fontSize:      '0.8125rem',
              fontFamily:    "'Space Grotesk', sans-serif",
              fontWeight:    500,
              cursor:        'pointer',
              transition:    'all 0.15s ease',
              whiteSpace:    'nowrap',
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  )
}

interface Props {
  values:    Omit<SimulationInput, 'scenario_slug' | 'save_run'>
  scenarios: SimulationScenario[]
  loading:   boolean
  onChangeSlider: (key: keyof Omit<SimulationInput, 'scenario_slug' | 'save_run'>, val: number) => void
  onSelectScenario: (s: SimulationScenario) => void
  onRun:     () => void
  activeScenario: string | null
}

export function SliderPanel({
  values,
  scenarios,
  loading,
  onChangeSlider,
  onSelectScenario,
  onRun,
  activeScenario,
}: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Scenario presets */}
      <div
        style={{
          background:   '#FFFAF8',
          border:       '1px solid #F2D9CF',
          borderRadius: 10,
          padding:      '14px 16px',
        }}
      >
        <ScenarioPills
          scenarios={scenarios}
          onSelect={onSelectScenario}
          active={activeScenario}
        />
      </div>

      {/* Sliders */}
      {SLIDERS.map(config => (
        <SliderRow
          key={config.key}
          config={config}
          value={values[config.key]}
          onChange={onChangeSlider}
        />
      ))}

      {/* Run button */}
      <button
        onClick={onRun}
        disabled={loading}
        style={{
          width:         '100%',
          padding:       '14px',
          borderRadius:  10,
          border:        'none',
          background:    loading ? '#EDD5C8' : '#D84F23',
          color:         loading ? '#C4A090' : '#FFFAF8',
          fontSize:      '0.9375rem',
          fontFamily:    "'Space Grotesk', sans-serif",
          fontWeight:    600,
          cursor:        loading ? 'not-allowed' : 'pointer',
          transition:    'background 0.2s ease, transform 0.1s ease',
          letterSpacing: '0.02em',
          transform:     loading ? 'none' : undefined,
        }}
        onMouseDown={e => { if (!loading) (e.target as HTMLButtonElement).style.transform = 'scale(0.98)' }}
        onMouseUp={e => { (e.target as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        {loading ? 'Running simulation…' : 'Run Simulation'}
      </button>

      {/* Disclaimer */}
      <p className="font-body text-muted text-xs text-center leading-relaxed">
        This is an educational simulation, not a predictive climate model.
        Results illustrate cascading relationships, not forecasts.
      </p>
    </div>
  )
}
