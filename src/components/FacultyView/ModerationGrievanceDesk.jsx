import React, { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShieldCheck, AlertCircle } from 'lucide-react';
import { Toolbar, StatusPill, Label, EmptyState, CardTitle } from '../Common/Primitives';

export default function ModerationGrievanceDesk({ issues = [], onResolveIssue, activeCourse }) {
  const pending = issues.filter((i) => i.status === 'Under Review' || i.status === 'Pending');
  const resolved = issues.filter((i) => i.status !== 'Under Review' && i.status !== 'Pending');

  const [selectedId, setSelectedId] = useState(pending[0]?.id || issues[0]?.id || null);
  const [note, setNote] = useState('');
  const [adjustment, setAdjustment] = useState(1.0);

  useEffect(() => {
    setSelectedId((current) => {
      if (issues.some((i) => i.id === current)) return current;
      return pending[0]?.id || issues[0]?.id || null;
    });
  }, [issues]);

  const selected = issues.find((i) => i.id === selectedId);

  const decide = (action) => {
    if (!selected) return;
    const finalAction = action === 'Approved' ? 'Approved by CoE' : 'Rejected by CoE';
    onResolveIssue(selected.id, finalAction, note, action === 'Approved' ? adjustment : 0);
    setNote('');
  };

  if (!issues.length) {
    return (
      <div className="space-y-3">
        <Toolbar title="Appeals &amp; Grievances" context={activeCourse?.name} />
        <div className="p-6">
          <EmptyState
            icon={CheckCircle2}
            title="No appeals raised"
            body="When a candidate contests a step-mark, the petition lands here with the Gemini 3.6 reasoning attached."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-8">
      {/* Standardized Toolbar */}
      <Toolbar
        title="Appeals &amp; Grievances"
        context={activeCourse?.name}
        pill={
          pending.length > 0 ? (
            <StatusPill tone="warn">{pending.length} PENDING</StatusPill>
          ) : (
            <StatusPill tone="pass">ALL RESOLVED</StatusPill>
          )
        }
      />

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        
        {/* Ticket queue */}
        <div className="flex flex-col gap-2.5">
          {issues.map((issue) => {
            const active = issue.id === selectedId;
            const isPending = issue.status === 'Under Review' || issue.status === 'Pending';

            return (
              <button
                key={issue.id}
                onClick={() => setSelectedId(issue.id)}
                className={`rounded-inner border px-[15px] py-3.5 text-left transition-colors cursor-pointer ${
                  active ? 'border-action-border bg-action-tint' : 'border-hairline bg-surface hover:bg-surface-sunken'
                } ${isPending ? '' : 'opacity-70'}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`font-mono text-[11px] font-semibold tracking-[.05em] ${isPending ? 'text-warn' : 'text-ink-faint'}`}>
                    {issue.id}
                  </span>
                  <span className="font-mono text-micro text-ink-faint">
                    {issue.submissionDate || issue.studentCommentDate || 'Active'}
                  </span>
                </div>

                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-[13.5px] font-semibold text-ink">{issue.studentName}</span>
                  <span className="font-mono text-micro text-ink-muted">{issue.usn || issue.rollNo}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-meta font-medium text-ink-muted">
                    {issue.qNo} · {issue.questionTitle}
                  </span>
                  <span className="tabular shrink-0 font-mono text-[12px] font-semibold text-ink">
                    {issue.currentScore} / {issue.maxMarks}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="pretty mt-1 rounded-inner border border-dashed border-hairline-strong px-3.5 py-3 text-[11.5px] font-medium leading-[1.55] text-ink-faint">
            Resolved appeals update the university master ledger and notify the scholar immediately.
            {resolved.length > 0 && ` ${resolved.length} resolved so far.`}
          </div>
        </div>

        {/* Detail Panel */}
        {selected ? (
          <div className="overflow-hidden rounded-card border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-[18px] py-[15px]">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-[15px] font-bold tracking-[-0.2px] text-ink">
                  {selected.id} · {selected.studentName}
                </span>
                <span className="font-mono text-[11.5px] text-ink-muted">
                  {selected.usn || selected.rollNo} · {selected.qNo}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-meta font-medium text-ink-faint">current</span>
                <span className="tabular font-mono text-[17px] font-semibold text-ink">
                  {selected.currentScore} / {selected.maxMarks}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
              <div className="bg-surface px-[18px] py-4">
                <Label>SCHOLAR'S PETITION</Label>
                <p className="pretty mt-2.5 text-[13px] leading-[1.6] text-ink-muted">
                  {selected.reason || selected.studentReason || 'Claiming partial credit for intermediate step derivation.'}
                </p>
              </div>
              <div className="bg-surface px-[18px] py-4">
                <Label>GEMINI 3.6 REASONING</Label>
                <p className="pretty mt-2.5 text-[13px] leading-[1.6] text-ink-muted">
                  {selected.aiRecommendation || selected.aiRationale || 'Deduction was applied based on unnormalized matrix substitution and notation slip on margin.'}
                </p>
              </div>
            </div>

            {selected.status === 'Under Review' || selected.status === 'Pending' ? (
              <div className="p-[18px] border-t border-track space-y-4">
                <div>
                  <Label>CHIEF EXAMINER / MODERATOR REMARK</Label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter official remark citing university moderation ordinance..."
                    className="field mt-2 w-full p-2.5 text-[12px] leading-[1.5]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline">
                  <div className="flex items-center gap-2">
                    <span className="text-meta font-medium text-ink-faint">Score adjustment:</span>
                    <span className="flex items-center rounded-pill border border-hairline bg-page p-0.5">
                      <button
                        onClick={() => setAdjustment((a) => Math.max(0.5, Number((a - 0.5).toFixed(1))))}
                        className="flex h-6 w-6 items-center justify-center rounded-pill text-ink-muted hover:text-ink cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="tabular px-2 font-mono text-[12.5px] font-bold text-ink">
                        +{adjustment}
                      </span>
                      <button
                        onClick={() => setAdjustment((a) => Math.min(5, Number((a + 0.5).toFixed(1))))}
                        className="flex h-6 w-6 items-center justify-center rounded-pill text-ink-muted hover:text-ink cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decide('Rejected')}
                      className="btn btn-secondary cursor-pointer"
                    >
                      Uphold original mark
                    </button>
                    <button
                      onClick={() => decide('Approved')}
                      className="btn btn-primary cursor-pointer"
                    >
                      Authorize +{adjustment} marks
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-[18px] border-t border-track bg-surface-sunken">
                <div className="flex items-center gap-2 text-pass font-semibold text-[13px]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Decision Rendered: {selected.status}</span>
                </div>
                {selected.facultyRemark && (
                  <p className="pretty mt-2 text-body-sm text-ink-muted">
                    <strong>Moderator Note:</strong> {selected.facultyRemark}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon={ShieldCheck}
            title="Select a petition"
            body="Choose a challenge petition from the queue on the left to review scholar claim and model reasoning."
          />
        )}
      </div>
    </div>
  );
}
