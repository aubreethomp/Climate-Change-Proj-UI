import type { Metadata } from 'next'
import { getScenarios, SimulationScenario } from '@/lib/api'
import { SimulatorClient } from '@/components/simulator/SimulatorClient'

export const dynamic = 'force-dynamic' 

export const metadata: Metadata = {
  title: 'Domino Simulator',
  description: 'Adjust conditions and watch climate tipping points cascade in real time.',
}

export default async function SimulatorPage() {
  // get preset scenarios server-side
  let scenarios: SimulationScenario[] = []
  try {
    scenarios = await getScenarios()
  } catch {
    // if backend not running simulator still works, just no presets
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Page header */}
      <div className="mb-8">
        <p className="font-ui text-xs uppercase text-navy tracking-widest mb-2">
          Simulate How Societal Conditions Effect Climate Tipping Points
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-text mb-3">
          Climate Change Domino Simulator
        </h1>
        <p className="font-body text-text text-base max-w-2xl leading-relaxed">
          Adjust the following six societal conditions: misinformation, trust, policy speed, emissions,
          and ecosystem resilience, to see which climate tipping points activate
          and cascade into each other. 
          *This is an educational tool, not a forecast.
        </p>

        {/* What each slider controls. info cards */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap:                 12,
            marginTop:           20,
          }}
        >
          {[
            {
              title: 'Misinformation',
              body:  'False or misleading climate claims erode trust and delay action.',
            },
            {
              title: 'Media literacy',
              body:  'An informed public can evaluate claims and pressure for policy.',
            },
            {
              title: 'Public trust',
              body:  'Trust in institutions determines how quickly action translates to policy.',
            },
            {
              title: 'Policy speed',
              body:  'Delayed action allows emissions to compound, raising system pressure.',
            },
            {
              title: 'Emissions',
              body:  'Direct driver of climate pressure and the starting force in the chain.',
            },
            {
              title: 'Resilience',
              body:  'Healthy ecosystems buffer stress while degraded ones tip more easily.',
            },
          ].map(card => (
            <div
              key={card.title}
              style={{
                background:   '#FFFAF8',
                border:       '1px solid #F2D9CF',
                borderRadius: 10,
                padding:      '12px 14px',
              }}
            >
              <p className="font-ui font-semibold text-text text-xs mb-1">{card.title}</p>
              <p className="font-body text-muted text-xs leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* Main simulator */}
      <SimulatorClient scenarios={scenarios} />
    </div>
  )
}

