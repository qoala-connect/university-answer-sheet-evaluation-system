import React from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { initials as toInitials } from '../../utils/grade';
import { PASS_PERCENTAGE } from '../../utils/analytics';

/**
 * Shared building blocks from the reference design system.
 *
 * Sizes, weights and radii: labels are 10.5px/600 mono with .06em tracking,
 * card titles 15px/700 at -0.2px, and numeric scale 48 / 30 / 17 / 13 by role.
 */

/* -------------------------------------------------------------------------- */
/* Text                                                                       */
/* -------------------------------------------------------------------------- */

/** Uppercase mono eyebrow. Mono is for data and column headers only. */
export function Label({ children, className = '' }) {
  return (
    <span className={`font-mono text-[10.5px] font-semibold tracking-[.06em] text-ink-faint ${className}`}>
      {children}
    </span>
  );
}

/** 15px/700 card heading with the design's negative tracking. */
export function CardTitle({ children, className = '' }) {
  return (
    <span className={`text-[15px] font-bold tracking-[-0.2px] text-ink ${children && typeof children === 'string' ? '' : ''} ${className}`}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Chrome                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Standardized one-line toolbar across all views.
 */
export function Toolbar({ title, context, pill, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface px-6 py-4">
      <div className="flex flex-wrap items-baseline gap-3.5">
        <h2 className="text-[18px] font-bold tracking-[-0.45px] text-ink">{title}</h2>
        {context && <span className="text-body-sm font-medium text-ink-faint">{context}</span>}
        {pill}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/** Small status chip for the toolbar. Tone maps to the semantic accents. */
export function StatusPill({ tone = 'action', children, live = false }) {
  const tones = {
    action: 'bg-action-tint border-action-border text-action-ink',
    pass: 'bg-pass-tint border-pass-border text-pass',
    warn: 'bg-warn-tint border-warn-border text-warn',
    neutral: 'bg-surface-raised border-hairline text-ink-muted',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-role border px-3 py-1.5 text-[12px] font-semibold ${tones[tone] || tones.action}`}>
      {live && <span className="block h-[7px] w-[7px] rounded-full bg-current animate-livePulse" />}
      {children}
    </span>
  );
}

/** Neutral initials chip. */
export function Avatar({ name, size = 32, className = '' }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-tile border border-hairline bg-surface-raised font-bold text-ink-muted ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      aria-hidden="true"
    >
      {toInitials(name)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Data display                                                               */
/* -------------------------------------------------------------------------- */

/**
 * A progress bar on a flat track.
 */
export function Bar({ percent = 0, color = 'bg-action-bar', height = 5, delay = 0, animate = true }) {
  return (
    <span className="block overflow-hidden rounded-full bg-track" style={{ height }}>
      <span
        className={`block origin-left rounded-full ${color} ${animate ? 'animate-grow' : ''}`}
        style={{ height, width: `${Math.max(0, Math.min(100, percent))}%`, animationDelay: `${delay}ms` }}
      />
    </span>
  );
}

/**
 * One of the KPI stat cards: mono label, 30px value with a muted denominator,
 * a 5px band-coloured bar, and an 11.5px caption.
 */
export function StatCard({ icon: Icon, iconClass = 'text-action', label, value, denominator, percent, barColor, caption, index = 0 }) {
  return (
    <div
      className="animate-rise rounded-card border border-hairline bg-surface p-4 px-[17px]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className={`h-[15px] w-[15px] shrink-0 ${iconClass}`} strokeWidth={2.2} />}
        <Label>{label}</Label>
      </div>

      <div className="mt-[11px] flex items-baseline gap-1.5">
        <span className="tabular text-[30px] font-bold leading-none tracking-[-1px] text-ink">{value}</span>
        {denominator !== undefined && <span className="text-[14px] font-medium text-ink-faint">/ {denominator}</span>}
      </div>

      <div className="mt-2.5">
        <Bar percent={percent ?? 100} color={barColor} delay={250 + index * 70} />
      </div>

      {caption && <div className="mt-2 text-[11.5px] font-medium text-ink-muted">{caption}</div>}
    </div>
  );
}

/**
 * Visual Score band: every student plotted on a 0-to-total band with average and pass marked.
 */
export function ScoreBand({ students = [], maxMarks = 75, average = 0 }) {
  const positionOf = (marks) => (maxMarks ? Math.max(0, Math.min(100, (marks / maxMarks) * 100)) : 0);
  const passMark = Number(((maxMarks * PASS_PERCENTAGE) / 100).toFixed(1));

  return (
    <div>
      <div className="relative mx-2.5 h-[66px]">
        <div className="absolute inset-x-0 top-[31px] h-[7px] rounded-[4px]" style={{ background: 'var(--band-gradient)' }} />

        {students.length > 0 && (
          <>
            <div
              className="absolute bottom-[14px] top-[15px] w-[2px] bg-ink-muted"
              style={{ left: `${positionOf(average)}%` }}
            />
            <div
              className="tabular absolute top-[-3px] -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] font-semibold text-ink-muted"
              style={{ left: `${positionOf(average)}%` }}
            >
              AVG {average}
            </div>
          </>
        )}

        {students.map((student, index) => (
          <div
            key={student.id || index}
            className="absolute top-[22px] flex -translate-x-1/2 flex-col items-center gap-[7px]"
            style={{ left: `${positionOf(student.totalMarks)}%` }}
            title={`${student.name} — ${student.totalMarks} / ${maxMarks}`}
          >
            <span
              className="animate-popIn flex h-[25px] w-[25px] items-center justify-center rounded-full border-[2.5px] border-action bg-surface text-[9px] font-bold text-action-ink shadow-avatar"
              style={{ animationDelay: `${index * 90 + 300}ms` }}
            >
              {toInitials(student.name)}
            </span>
            <span className="tabular font-mono text-[11px] font-semibold text-ink-muted">{student.totalMarks}</span>
          </div>
        ))}
      </div>

      <div className="mx-2.5 mt-2 flex justify-between font-mono text-[10.5px] font-medium text-ink-faint">
        <span>0</span>
        <span>PASS {passMark}</span>
        <span>{maxMarks}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

/** Inline note for feedback/alerts. */
export function Note({ tone = 'warn', children }) {
  const tones = {
    warn: { wrap: 'bg-warn-tint border-warn-border', icon: 'text-warn', Icon: AlertTriangle },
    pass: { wrap: 'bg-pass-tint border-pass-border', icon: 'text-pass', Icon: CheckCircle2 },
    bad: { wrap: 'bg-bad-tint border-bad-border', icon: 'text-bad', Icon: AlertTriangle },
    action: { wrap: 'bg-action-tint border-action-border', icon: 'text-action-ink', Icon: Info },
  };
  const { wrap, icon, Icon } = tones[tone] || tones.warn;

  return (
    <div className={`flex items-start gap-2.5 rounded-inner border px-3.5 py-3 ${wrap}`}>
      <Icon className={`mt-px h-4 w-4 shrink-0 ${icon}`} strokeWidth={2.2} />
      <div className="pretty text-body-sm font-medium text-ink-muted">{children}</div>
    </div>
  );
}

/** Standardized empty state. */
export function EmptyState({ icon: Icon, title, body, children }) {
  return (
    <div className="flex flex-col items-center gap-[11px] rounded-card border border-hairline bg-surface px-5 py-[26px] text-center">
      <span className="flex h-[50px] w-[50px] items-center justify-center rounded-[14px] border border-hairline bg-surface-raised">
        <Icon className="h-6 w-6 text-ink-faint" strokeWidth={1.8} />
      </span>
      <div className="text-[14px] font-bold leading-[1.3] text-ink">{title}</div>
      <div className="pretty max-w-[340px] text-body-sm font-medium text-ink-muted">{body}</div>
      {children && <div className="mt-1 flex gap-2">{children}</div>}
    </div>
  );
}
