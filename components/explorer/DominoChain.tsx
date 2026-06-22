import { parseDominoChain } from '@/lib/utils'
import { ArrowDown } from 'lucide-react'

interface Props {
  summary: string
}

export function DominoChain({ summary }: Props) {
  const steps = parseDominoChain(summary)
  if (steps.length === 0) return null

  return (
    <div className="space-y-0" role="list" aria-label="Domino chain">
      {steps.map((step, i) => (
        <div key={i} role="listitem">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center">
              <span className="text-xs font-ui font-semibold text-olive">{i + 1}</span>
            </div>
            <div className="bg-background border border-divider rounded-card px-4 py-2.5 flex-1">
              <p className="text-sm text-text leading-snug font-body">{step}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center gap-3 my-0.5" aria-hidden="true">
              <div className="flex-shrink-0 w-7 flex justify-center">
                <div className="w-px h-5 bg-divider" />
              </div>
              <ArrowDown size={12} className="text-olive ml-1" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
