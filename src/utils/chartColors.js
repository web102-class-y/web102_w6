// Reference palette (light mode) — see dataviz skill references/palette.md
export const CHART_SURFACE = '#fcfcfb'
export const INK_PRIMARY = '#0b0b0b'
export const INK_SECONDARY = '#52514e'
export const INK_MUTED = '#898781'
export const GRIDLINE = '#e1e0d9'
export const BASELINE = '#c3c2b7'

export const SEQUENTIAL_BLUE = '#2a78d6'

// Categorical slots, fixed order — color follows entity, never rank.
export const CATEGORICAL = {
  blue: '#2a78d6',
  green: '#008300',
  magenta: '#e87ba4',
  yellow: '#eda100',
  aqua: '#1baf7a',
  violet: '#4a3aa7',
  red: '#e34948',
}

// Fixed status -> hue mapping so filtering never repaints survivors.
export const STATUS_COLORS = {
  Alive: CATEGORICAL.green,
  Dead: CATEGORICAL.red,
  unknown: CATEGORICAL.violet,
}

export function colorForStatus(status) {
  return STATUS_COLORS[status] || INK_MUTED
}
