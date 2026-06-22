import type { Metadata } from 'next'
import { getTippingPoints } from '@/lib/api'
import { ExplorerGrid } from '@/components/explorer/ExplorerGrid'
import { Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tipping Point Explorer',
  description: 'Browse and filter 19 climate tipping points by domain, severity, and near-term risk.',
}

export default async function ExplorerPage() {
  const data = await getTippingPoints()
  const tippingPoints = data.results

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-olive text-sm font-ui mb-3">
          <Activity size={14} />
          <span>Tipping Point Explorer</span>
        </div>

        {/* Page title */}
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          <span className="text-terra">19 critical and dismissed tipping points are listed below.</span>{' '}
          <span className="text-text">If we continue on our current path of ignorance and inaction, the effects could lead to an inhabitable Earth and mass extinction. </span>
        </h1>

        <p className="text-subtle text-base max-w-2xl leading-relaxed font-body">
          These tipping points are breaking points for Earth's systems, caused by human activities, such as greenhouse gas emissions, deforestation, overconsumption, and ocean acidification. 
          Once these thresholds are crossed, and a system shifts to a new state, it is impossible to reverse. Furthermore, they often engage in feedback loops, accelerating the process, as well as creating a cascade of effects, including triggering other tipping points. 
          Explore each one, understand what causes it, and trace the domino chain it can trigger.
        </p>

        {/* Severity legend */}
        <div className="flex flex-wrap items-center gap-4 mt-5">
          {[
            { color: '#D84F23', label: 'Extreme' },
            { color: '#D4845A', label: 'High'    },
            { color: '#8B8E25', label: 'Medium'  },
            { color: '#A8C5A0', label: 'Low'     },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
              <span className="text-xs text-subtle font-ui">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <ExplorerGrid tippingPoints={tippingPoints} />
    </div>
  )
}
