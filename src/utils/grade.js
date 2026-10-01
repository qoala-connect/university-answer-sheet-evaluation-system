// Grade colour follows the band, everywhere.
// Three tints only, driven by percentage — the same values on the grade pill,
// the roster row bar, and the stat card.

/** 'pass' (>= 85%), 'action' (55-84%) or 'warn' (< 55%). */
export function band(percent) {
  if (percent >= 85) return 'pass';
  if (percent >= 55) return 'action';
  return 'warn';
}

const PILL = {
  pass: 'bg-pass-tint border-pass-border text-pass',
  action: 'bg-action-tint border-action-border text-action-ink',
  warn: 'bg-warn-tint border-warn-border text-warn',
};

const BAR = {
  pass: 'bg-pass-fill',
  action: 'bg-action-bar',
  warn: 'bg-warn-fill',
};

const TEXT = {
  pass: 'text-pass',
  action: 'text-action-ink',
  warn: 'text-warn',
};

/** Classes for a grade pill: tint background, band border, band text. */
export function gradePill(percent) {
  return PILL[band(percent)] || PILL.action;
}

/** Fill colour for a progress bar in the same band. */
export function gradeBar(percent) {
  return BAR[band(percent)] || BAR.action;
}

/** Text colour alone, for a figure that carries the band without a chip. */
export function gradeText(percent) {
  return TEXT[band(percent)] || TEXT.action;
}

/** Percentage of a score, guarding a zero-mark question. */
export function pct(awarded, max) {
  return max ? Math.round((awarded / max) * 100) : 0;
}

/** Up to two initials, for the neutral avatar chip. */
export function initials(name) {
  return (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}
