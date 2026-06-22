import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
export const metadata: Metadata = { title: 'Media Literacy Lab' }
export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <BookOpen size={40} className="text-olive mx-auto mb-6 opacity-50" />
      <h1 className="font-heading text-2xl font-semibold text-text mb-3">Media Literacy Effects</h1>
      <p className="text-subtle max-w-md mx-auto font-body">To be added: Evaluate climate claims, spot misinformation techniques, and review evidence.</p>
    </div>
  )
}
