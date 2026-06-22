import type { Metadata } from 'next'
import { BarChart2 } from 'lucide-react'
export const metadata: Metadata = { title: 'Evidence Dashboard' }
export default function EvidencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <BarChart2 size={40} className="text-olive mx-auto mb-6 opacity-50" />
      <h1 className="font-heading text-2xl font-semibold text-text mb-3">Evidence Dashboard</h1>
      <p className="text-subtle max-w-md mx-auto font-body">To be added:Global CO2, temperature anomaly, sea-level rise, and public opinion data.</p>
    </div>
  )
}
