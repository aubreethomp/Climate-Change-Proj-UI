// lib/types.ts
// Mirrors Django serializer output shapes.
// Domain and Severity types are now imported from tokens.ts — do not redefine here.

export type { Severity, Domain } from './tokens'

export interface TippingPointCard {
  id: number
  slug: string
  name: string
  domain: import('./tokens').Domain
  domain_raw: string
  scale: string
  icon_emoji: string
  icon_label: string
  severity: import('./tokens').Severity
  near_term_status: string
  app_card_summary: string
  misinformation_angle: string
  display_order: number
}

export interface SourceReference {
  id: number
  url: string
  title: string
  notes: string
}

export interface TippingPointRelationship {
  id: number
  source_slug: string
  source_name: string
  target_slug: string
  target_name: string
  relationship_type: string
  description: string
  strength: number
  is_bidirectional: boolean
}

export interface TippingPointDetail extends TippingPointCard {
  warming_context: string
  primary_causes: string
  effects: string
  interactions: string
  domino_summary: string
  suggested_ui: string
  source_urls: string
  source_references: SourceReference[]
  outgoing_relationships: TippingPointRelationship[]
  incoming_relationships: TippingPointRelationship[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DomainGroup {
  domain: import('./tokens').Domain
  domain_raw: string
  count: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface GraphNode {
  slug: string
  name: string
  domain: import('./tokens').Domain
  icon_emoji: string
  severity: import('./tokens').Severity
}

export interface GraphEdge {
  source: string
  target: string
  type: string
  strength: number
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
