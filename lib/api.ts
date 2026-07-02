// lib/api.ts
// All server-side and client-side API calls.

import type {
  TippingPointCard,
  TippingPointDetail,
  PaginatedResponse,
} from './types'

const API_BASE = 
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:8000'

async function apiFetch<T>(
  path: string,
  options: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {},
): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status} for ${url}`)
  return res.json() as Promise<T>
}

// Tipping Points
export async function getTippingPoints(params?: {
  domain?: string
  severity?: string
  search?: string
  page?: number
}): Promise<PaginatedResponse<TippingPointCard>> {
  const qs = new URLSearchParams()
  if (params?.domain)   qs.set('domain',   params.domain)
  if (params?.severity) qs.set('severity', params.severity)
  if (params?.search)   qs.set('search',   params.search)
  if (params?.page)     qs.set('page',     String(params.page))
  const query = qs.toString() ? `?${qs.toString()}` : ''
  return apiFetch<PaginatedResponse<TippingPointCard>>(
    `/api/tipping-points/${query}`,
    { next: { revalidate: 3600, tags: ['tipping-points'] } },
  )
}

export async function getTippingPointBySlug(slug: string): Promise<TippingPointDetail> {
  return apiFetch<TippingPointDetail>(
    `/api/tipping-points/${slug}/`,
    { next: { revalidate: 3600, tags: [`tipping-point-${slug}`] } },
  )
}

export async function getAllTippingPointSlugs(): Promise<string[]> {
  const data = await getTippingPoints()
  return data.results.map(tp => tp.slug)
}

// Simulator
export interface SimulationScenario {
  id: number
  slug: string
  name: string
  description: string
  is_featured: boolean
  default_misinformation: number
  default_media_literacy: number
  default_public_trust: number
  default_policy_speed: number
  default_emissions: number
  default_resilience: number
}

export interface SimulationInput {
  misinformation: number
  media_literacy: number
  public_trust:   number
  policy_speed:   number
  emissions:      number
  resilience:     number
  scenario_slug?: string
  save_run?:      boolean
}

export interface ActivatedNode {
  slug:             string
  name:             string
  domain:           string
  activation_score: number
  triggered_by:     string[]
}

export interface SimulationResult {
  trust_score:      number
  delay_risk:       number
  climate_pressure: number
  activated_nodes:  ActivatedNode[]
  interventions:    string[]
  narrative:        string
  risk_level:       'low' | 'moderate' | 'high' | 'critical'
  run_id:           number | null
}

export async function getScenarios(): Promise<SimulationScenario[]> {
  const data = await apiFetch<{ results: SimulationScenario[] } | SimulationScenario[]>(
    '/api/simulator/scenarios/',
    { next: { revalidate: 86400 } },
  )
  return Array.isArray(data) ? data : data.results
}

export async function runSimulation(input: SimulationInput): Promise<SimulationResult> {
  return apiFetch<SimulationResult>('/api/simulator/run/', {
    method: 'POST',
    body:   JSON.stringify(input),
  })
}