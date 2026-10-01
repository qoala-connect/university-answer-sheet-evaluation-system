import React, { useState } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import { Label } from '../Common/Primitives';

export default function ChallengeEvaluationModal({ question, student, activeCourse, onClose, onSubmit }) {
  const [appealCategory, setAppealCategory] = useState('Step Credit & Notation Re-Check');
  const [reason, setReason] = useState('');
  const [claimedMarks, setClaimedMarks] = useState(question.maxMarks);
  const [feeAgreed, setFeeAgreed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim() || !feeAgreed) return;

    const newIssue = {
      id: `UNIGR-2026-${activeCourse?.code?.replace('-', '') || 'CS301'}-${Math.floor(100 + Math.random() * 900)}`,
      courseId: activeCourse?.id || 'cs_301',
      studentId: student.id,
      studentName: student.name,
      usn: student.usn,
      department: student.department,
      semester: student.semester,
      qNo: question.qNo,
      questionTitle: `Evaluation Appeal on ${question.qNo}`,
      currentScore: question.awardedMarks,
      maxMarks: question.maxMarks,
      claimedScore: Number(claimedMarks),
      appealType: appealCategory,
      reason: reason.trim(),
      submissionDate: new Date().toLocaleString(),
      feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
      status: 'Under Review',
      aiRecommendation: 'AI Audit: Petition received. Initial OCR check indicates student derivation warrants step-marking verification by Chief Examiner panel.',
      facultyRemark: '',
      moderatorActionDate: null
    };

    onSubmit(newIssue);
  };

  return (
    <div
      className="animate-fade fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: 'rgba(0, 0, 0, 0.65)' }}
    >
      <div className="animate-rise w-full max-w-xl space-y-5 rounded-card border border-hairline bg-surface p-6 shadow-2xl sm:p-7">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-hairline pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] font-semibold tracking-[.06em] text-warn">
              <ShieldAlert className="h-3.5 w-3.5" strokeWidth={2.2} /> UNIVERSITY CHALLENGE EVALUATION DESK
            </div>
            <h3 className="mt-1 text-[18px] font-bold tracking-[-0.3px] text-ink">
              File official grade petition
            </h3>
            <p className="mt-0.5 text-body-sm font-medium text-ink-muted">
              Candidate: <strong className="text-ink">{student.name}</strong> · USN <span className="font-mono text-action-ink">{student.usn}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-field border border-hairline text-ink-faint hover:bg-surface-sunken hover:text-ink cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Question Details Banner */}
        <div className="flex items-center justify-between rounded-inner border border-hairline bg-surface-sunken px-4 py-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13.5px] font-bold text-ink">{question.qNo}</span>
              {question.co && (
                <span className="rounded-badge border border-action-border bg-action-tint px-2 py-0.5 font-mono text-[10px] font-bold text-action-ink">
                  {question.co}
                </span>
              )}
            </div>
            <span className="mt-0.5 block text-[11px] font-medium text-ink-faint">
              Current awarded marks: <strong className="tabular font-mono text-action-ink">{question.awardedMarks} / {question.maxMarks}</strong>
            </span>
          </div>

          <div className="text-right">
            <Label>COURSE</Label>
            <div className="text-[13.5px] font-bold text-ink">{activeCourse?.code || 'CS-301'}</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-ink">
                Challenge petition category
              </label>
              <select
                value={appealCategory}
                onChange={(e) => setAppealCategory(e.target.value)}
                className="field w-full px-3 py-2 text-[12.5px]"
              >
                <option value="Step Credit & Notation Re-Check">Step Credit & Notation Re-Check</option>
                <option value="Alternate Valid Algorithmic Path">Alternate Valid Algorithmic Path</option>
                <option value="Mathematical Re-totalling Error">Mathematical Re-totalling Error</option>
                <option value="Rubric Misinterpretation">Rubric Misinterpretation</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-ink">
                Claimed marks requested (max {question.maxMarks})
              </label>
              <input
                type="number"
                step="0.5"
                min={question.awardedMarks}
                max={question.maxMarks}
                value={claimedMarks}
                onChange={(e) => setClaimedMarks(e.target.value)}
                className="field tabular w-full px-3 py-2 font-mono text-[12.5px] font-bold text-action-ink"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-body-sm font-semibold text-ink">
              Specific derivation line &amp; justification grounds
            </label>
            <textarea
              rows={4}
              required
              placeholder="Cite the exact derivation step or formula line in your booklet where credit was omitted..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="field w-full p-3 text-[12.5px] leading-relaxed"
            />
          </div>

          {/* Fee & Ordinance Agreement */}
          <div className="flex items-start gap-2.5 rounded-inner border border-warn-border bg-warn-tint px-3.5 py-3">
            <input
              type="checkbox"
              id="fee-agree"
              checked={feeAgreed}
              onChange={(e) => setFeeAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[var(--warn-fill)]"
            />
            <label htmlFor="fee-agree" className="pretty cursor-pointer text-[11.5px] font-medium leading-snug text-ink-muted">
              I acknowledge the Institutional Challenge Fee of <strong className="text-ink">INR 500</strong>. I certify that my claim references verified mathematical steps in my scanned booklet.
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-2.5 border-t border-hairline pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary cursor-pointer">
              Cancel
            </button>

            <button
              type="submit"
              disabled={!reason.trim() || !feeAgreed}
              className="btn btn-primary cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" /> Submit challenge petition docket
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
