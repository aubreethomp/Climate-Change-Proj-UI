/**
 * lib/tokens.ts
 * 
 * SINGLE SOURCEfor all design tokens.
 *
 * To change the palette, edit ONLY this file.
 *
 * These values are used by:
 *   - tailwind.config.js  (theme.extend.colors)
 *   - globals.css         (via Tailwind classes)
 *   - components          (via TOKEN exports below)
 */

// Raw palette 
export const PALETTE = {
  // Backgrounds
  background:  '#FDF4F0',   // page background (cream with lightest pink blush)
  card:        '#FFFAF8',   // card surface (near white, warm)
  surface:     '#FAF0EB',   // navbar / elevated surface
  // Borders & dividers
  border:      '#F2D9CF',   // card borders (soft peach)
  divider:     '#EDD5C8',   // section dividers (pale peach)
  // Text
  text:        '#3D2314',   // primary text (deep warm brown)
  subtle:      '#8B6355',   // secondary text (mid warm brown)
  muted:       '#C4A090',   // placeholder / disabled (light warm brown)
  // Accents (from reference images)
  olive:       '#8B8E25',   // primary nature accent (moss/olive green)
  peach:       '#F2C4A8',   // warm secondary accent
  rose:        '#E8A4A4',   // dusty rose
  terra:       '#D84F23',   // terracotta (action / extreme severity)
  terraLight:  '#F2C4B0',   // light terracotta tint
  sage:        '#A8C5A0',   // soft sage green
  // Severity scale
  severityExtreme: '#D84F23',   // terracotta
  severityHigh:    '#D4845A',   // warm orange-brown
  severityMedium:  '#8B8E25',   // olive
  severityLow:     '#A8C5A0',   // sage
} as const


// Typography 
// Mirror of tailwind.config.js fontFamily (update both together)
export const FONTS = {
  wordmark: "'WoodenLog', 'Georgia', 'serif'",  // logo/wordmark only
  heading:  "'SafetyMedium', 'system-ui', 'sans-serif'",  // h1, h2, page titles
  body:     "'Bonny-Medium', 'Georgia', 'serif'",       // paragraphs
  ui:       "'Bonny-Medium', 'system-ui', 'sans-serif'", // badges, pills, labels
} as const

// Severity configuration
export type Severity = 'extreme' | 'high' | 'medium' | 'low'

export interface SeverityConfig {
  label:      string
  barColor:   string
  badgeClass: string
}

export const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  extreme: {
    label:      'Extreme',
    barColor:   PALETTE.severityExtreme,
    badgeClass: 'bg-terra/10 text-terra border-terra/30',
  },
  high: {
    label:      'High',
    barColor:   PALETTE.severityHigh,
    badgeClass: 'bg-peach/40 text-[#A0461A] border-peach',
  },
  medium: {
    label:      'Medium',
    barColor:   PALETTE.severityMedium,
    badgeClass: 'bg-olive/10 text-olive border-olive/30',
  },
  low: {
    label:      'Low',
    barColor:   PALETTE.severityLow,
    badgeClass: 'bg-sage/20 text-[#4A7A42] border-sage/50',
  },
}

export function getSeverityConfig(severity: Severity): SeverityConfig {
  return SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.medium
}

// Domain configuration and theme mapping
export type Domain =
  | 'cryosphere'
  | 'cryosphere_carbon_cycle'
  | 'biosphere_ocean'
  | 'biosphere'
  | 'ocean_atmosphere_circulation'
  | 'cryosphere_ocean'
  | 'cryosphere_water'
  | 'atmosphere_hydrology'
  | 'biosphere_hydrology'
  | 'biosphere_freshwater'
  | 'biosphere_food'
  | 'biosphere_coastal'

export interface DomainConfig {
  label:     string
  filterKey: string
}

export const DOMAIN_CONFIG: Record<Domain, DomainConfig> = {
  cryosphere:                   { label: 'Cryosphere',              filterKey: 'cryosphere' },
  cryosphere_carbon_cycle:      { label: 'Cryosphere / Carbon',     filterKey: 'cryosphere_carbon_cycle' },
  biosphere_ocean:              { label: 'Biosphere / Ocean',       filterKey: 'biosphere_ocean' },
  biosphere:                    { label: 'Biosphere',               filterKey: 'biosphere' },
  ocean_atmosphere_circulation: { label: 'Ocean Circulation',       filterKey: 'ocean_atmosphere_circulation' },
  cryosphere_ocean:             { label: 'Cryosphere / Ocean',      filterKey: 'cryosphere_ocean' },
  cryosphere_water:             { label: 'Cryosphere / Water',      filterKey: 'cryosphere_water' },
  atmosphere_hydrology:         { label: 'Atmosphere / Hydrology',  filterKey: 'atmosphere_hydrology' },
  biosphere_hydrology:          { label: 'Biosphere / Hydrology',   filterKey: 'biosphere_hydrology' },
  biosphere_freshwater:         { label: 'Biosphere / Freshwater',  filterKey: 'biosphere_freshwater' },
  biosphere_food:               { label: 'Biosphere / Food',        filterKey: 'biosphere_food' },
  biosphere_coastal:            { label: 'Biosphere / Coastal',     filterKey: 'biosphere_coastal' },
}

export function getDomainConfig(domain: Domain): DomainConfig {
  return DOMAIN_CONFIG[domain] ?? { label: domain, filterKey: domain }
}

// Scene theme/animation mapping
export type SceneTheme = 'grass' | 'polar' | 'ocean' | 'drought' | 'domino' | 'emissions'| 'energy' | 'literacy' | 'misinformation' | 'policy' | 'resilience' | 'trust'

export const DOMAIN_THEME_MAP: Record<Domain, SceneTheme> = {
  cryosphere:                   'polar',
  cryosphere_carbon_cycle:      'polar',
  cryosphere_ocean:             'polar',
  cryosphere_water:             'polar',
  biosphere:                    'grass',
  biosphere_hydrology:          'drought',
  biosphere_freshwater:         'ocean',
  biosphere_food:               'ocean',
  biosphere_coastal:            'ocean',
  biosphere_ocean:              'ocean',
  ocean_atmosphere_circulation: 'ocean',
  atmosphere_hydrology:         'drought',
}

export function getThemeForDomain(domain: Domain): SceneTheme {
  return DOMAIN_THEME_MAP[domain] ?? 'grass'
}

// Relationship labels 
export const RELATIONSHIP_LABELS: Record<string, string> = {
  carbon_feedback:           'Carbon feedback',
  freshwater_circulation:    'Freshwater / circulation',
  rainfall_recycling:        'Rainfall recycling',
  habitat_livelihood:        'Habitat / livelihood cascade',
  sea_level:                 'Sea-level cascade',
  temperature_amplification: 'Temperature amplification',
  ecosystem_cascade:         'Ecosystem cascade',
  ocean_chemistry:           'Ocean chemistry',
  albedo_feedback:           'Albedo feedback',
  monsoon_shift:             'Monsoon shift',
  other:                     'Interaction',
}

export function getRelationshipLabel(type: string): string {
  return RELATIONSHIP_LABELS[type] ?? type.replace(/_/g, ' ')
}
