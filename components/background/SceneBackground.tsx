'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import type { SceneTheme } from '@/lib/tokens'

interface Props {
  theme?: SceneTheme
}

const ANIMATION_PATHS: Record<SceneTheme, string> = {
  grass:   '/animations/grass.json',
  polar:    '/animations/polar.json',
  drought: '/animations/drought.json',
  ocean:   '/animations/ocean.json',
  domino:  '/animations/domino.json',
  emissions: '/animations/emissions.json',
  energy: '/animations/energy.json',
  literacy: '/animations/literacy.json',
  misinformation: '/animations/misinformation.json',
  policy: '/animations/policy.json',
  resilience: '/animations/resilience.json',
  trust: '/animations/trust.json',
}

function Scene({ path, opacity }: { path: string; opacity: number }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    if (opacity === 0) return  // don't fetch hidden scenes
    fetch(path)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {})  // silently ignore missing files
  }, [path, opacity])

  if (!animationData || opacity === 0) return null

  return (
    <div
      style={{
        position:      'absolute',
        inset:         0,
        opacity,
        transition:    'opacity 0.8s ease',
        pointerEvents: 'none',
      }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
    </div>
  )
}

export function SceneBackground({ theme = 'grass' }: Props) {
  return (
    <div className="bg-scene" aria-hidden="true">
      <Scene
        key={theme}
        path={ANIMATION_PATHS[theme]}
        opacity={0.35}
      />
    </div>
  )
}