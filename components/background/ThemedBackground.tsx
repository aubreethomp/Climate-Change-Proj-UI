'use client'

import { usePathname } from 'next/navigation'
import { SceneBackground } from './SceneBackground'
import type {SceneTheme } from '@/lib/tokens'

// Maps URL slug patterns to domains
// keeps layout decoupled from the API
const SLUG_THEME_OVERRIDES: Record<string, SceneTheme> = {
  'gis_collapse':                    'polar',
  'wais_collapse':                   'polar',
  'east_antarctic_subglacial_basins':'polar',
  'barents_sea_ice_loss':            'polar',
  'mountain_glacier_loss':           'polar',
  'abrupt_permafrost_thaw':          'polar',
  'permafrost_yedoma_carbon':        'polar',
  'amoc_collapse':                   'ocean',
  'labrador_irminger_convection':    'ocean',
  'southern_ocean_overturning':      'ocean',
  'warm_water_coral_reefs_dieoff':   'ocean',
  'mangrove_seagrass_dieoff':        'ocean',
  'fisheries_collapse':              'ocean',
  'amazon_rainforest_dieback':       'drought',
  'boreal_forest_southern_dieback':  'drought',
  'boreal_forest_northern_expansion':'grass',
  'sahel_greening':                  'grass',
  'lake_eutrophication':             'grass',
  'west_african_monsoon_shift':      'drought',
}

// Maps page paths to scenes
const PATH_THEMES: Record<string, SceneTheme> = {
  '/simulator': 'energy',
  '/lab':       'misinformation',
  '/evidence':  'emissions',
}

export function ThemedBackground() {
  const pathname = usePathname()

  // Check explicit path overrides first
  for (const [path, theme] of Object.entries(PATH_THEMES)) {
    if (pathname.startsWith(path)) return <SceneBackground theme={theme} />
  }

  // Check if we're on a detail page
  const match = pathname.match(/^\/explorer\/([^/]+)$/)
  const slug  = match?.[1]

  const theme: SceneTheme = slug
    ? (SLUG_THEME_OVERRIDES[slug] ?? 'grass')
    : 'grass'

  return <SceneBackground theme={theme} />
}