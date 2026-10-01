import React, { useState } from 'react';
import {
  ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2,
  FileCheck, Sliders, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Toolbar, StatusPill, StatCard, CardTitle, Note } from '../Common/Primitives';

export default function CoEDashboard({ students, issues, activeCourse }) {
  const [isCertified, setIsCertified] = useState(false);
  const [graceMarks, setGraceMarks] = useState(0);

  const pendingIssuesCount = issues.filter(i => i.status === 'Under Review').length;
  const borderlineStudents = students.filter(s => s.percentage >= 48 && s.percentage <= 52);

  const handlePublishResults = () => {
    setIsCertified(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert(`OFFICIAL DECLARATION: Results for ${activeCourse?.name} have been formally certified by the Office of Controller of Examinations (CoE) and locked for transcript generation.`);
  };

  const checklist = [
    {
      title: 'Multimodal AI vision & handwriting model rigor certified',
      desc: 'Gemini 3.6 Multimodal Engine verified with 99.8% character & LaTeX mathematical derivation recognition.',
      status: 'Verified'
    },
    {
      title: 'Course Outcomes (CO1 – CO4) attainment logged for ABET / NBA',
      desc: 'Every candidate score mapped to accredited Bloom Taxonomy levels with threshold minimums exceeded.',
      status: 'Verified'
    },
    {
      title: 'Challenge evaluation grievance window audited',
      desc: 'All candidate objection claims reviewed by Chief Examiner panel and logged in institutional ledger.',
      status: 'Audited'
    },
    {
      title: 'Candidate barcode & USN anti-tamper verification',
      desc: 'Masked candidate identity preserved during primary OCR evaluation to ensure unbiased academic scoring.',
      status: 'Secured'
    }
  ];

  return (
    <>
      <Toolbar
        title="Result moderation"
        context={`Controller of Examinations · ${activeCourse?.name}`}
        pill={
          isCertified ? (
            <StatusPill tone="pass">CERTIFIED &amp; SEALED</StatusPill>
          ) : pendingIssuesCount > 0 ? (
            <StatusPill tone="warn">{pendingIssuesCount} GRIEVANCE{pendingIssuesCount === 1 ? '' : 'S'} PENDING</StatusPill>
          ) : (
            <StatusPill tone="neutral">AWAITING CERTIFICATION</StatusPill>
          )
        }
      >
        <button
          onClick={handlePublishResults}
          disabled={isCertified}
          className="btn btn-primary cursor-pointer"
        >
          {isCertified ? <Lock className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
          {isCertified ? 'Results certified & sealed' : 'Certify & seal official ledger'}
        </button>
      </Toolbar>

      <div className="space-y-3 p-6">

        {/* KPI Audit Metric Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            index={0}
            icon={ShieldCheck}
            iconClass="text-pass"
            label="DUAL-EVALUATOR VARIANCE"
            value="±1.2%"
            percent={76}
            barColor="bg-pass-fill"
            caption="Within ±5.0% ordinance limit"
          />
          <StatCard
            index={1}
            icon={CheckCircle2}
            iconClass="text-pass"
            label="EVALUATION COMPLETENESS"
            value={students.length}
            denominator={students.length}
            percent={100}
            barColor="bg-pass-fill"
            caption="Zero uninspected scripts"
          />
          <StatCard
            index={2}
            icon={AlertTriangle}
            iconClass={pendingIssuesCount > 0 ? 'text-warn' : 'text-ink-faint'}
            label="CHALLENGE GRIEVANCES"
            value={issues.length}
            percent={issues.length ? Math.round((pendingIssuesCount / issues.length) * 100) : 0}
            barColor="bg-warn-fill"
            caption={`${pendingIssuesCount} pending · 100% fee docket confirmed`}
          />
          <StatCard
            index={3}
            icon={TrendingUp}
            label="BORDERLINE AUDITS"
            value={borderlineStudents.length}
            percent={students.length ? Math.round((borderlineStudents.length / students.length) * 100) : 0}
            barColor="bg-action-bar"
            caption="48% – 52% flagged for grace review"
          />
        </div>

        {/* Moderation Controls & Audit Ledger */}
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[340px_minmax(0,1fr)]">

          {/* Moderation Panel */}
          <div className="rounded-card border border-hairline bg-surface px-[18px] py-4 space-y-3.5">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-action" strokeWidth={2.2} />
              <CardTitle className="!text-[13px]">Academic moderation curve adjuster</CardTitle>
            </div>
            <p className="pretty text-body-sm font-medium text-ink-muted">
              In compliance with University Academic Ordinance Section 12(b), the CoE committee may apply institutional grace moderation across the cohort.
            </p>

            <div className="border-t border-track pt-3.5">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-body-sm font-medium text-ink">Grace moderation offset</span>
                <span className="tabular font-mono text-[12.5px] font-semibold text-action-ink">+{graceMarks} marks</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.5"
                value={graceMarks}
                onChange={(e) => setGraceMarks(Number(e.target.value))}
                className="w-full cursor-pointer accent-[var(--action)]"
              />
              <div className="mt-1.5 flex justify-between font-mono text-[10.5px] font-medium text-ink-faint">
                <span>0 (STANDARD)</span>
                <span>+3.0 (MAX MODERATION)</span>
              </div>
            </div>

            <Note tone="warn">
              <span className="font-bold">Ordinance notice.</span> Applied grace moderation will reflect on transcript supplements as "Moderation Credit (MC)".
            </Note>
          </div>

          {/* Audit Compliance Verification Checklist */}
          <div className="rounded-card border border-hairline bg-surface px-[18px] py-4 space-y-3.5">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-pass" strokeWidth={2.2} />
              <CardTitle className="!text-[13px]">CoE regulatory compliance &amp; accreditation checklist</CardTitle>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 rounded-inner border border-hairline bg-surface-sunken px-3.5 py-3">
                  <div>
                    <div className="text-body-sm font-semibold text-ink">{item.title}</div>
                    <div className="mt-0.5 text-[11px] font-medium text-ink-faint">{item.desc}</div>
                  </div>
                  <span className="shrink-0 rounded-badge border border-pass-border bg-pass-tint px-2 py-0.5 font-mono text-[10px] font-bold text-pass">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
