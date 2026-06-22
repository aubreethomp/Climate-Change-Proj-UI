// lib/utils.ts
// Utility helpers — all design logic delegates to tokens.ts

export {
  getSeverityConfig,
  getDomainConfig,
  getRelationshipLabel,
  getThemeForDomain,
} from './tokens'

// ── Domino chain parsing ──────────────────────────────────────────────────────
export function parseDominoChain(summary: string): string[] {
  return summary.split('->').map(s => s.trim()).filter(Boolean)
}

// ── Source URL parsing ────────────────────────────────────────────────────────
export function parseSourceUrls(raw: string): string[] {
  return raw.split('|').map(u => u.trim()).filter(Boolean)
}

// ── Truncation ────────────────────────────────────────────────────────────────
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}
