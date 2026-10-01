import React from 'react';
import { 
  BarChart, Bar as RBar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Toolbar, StatusPill, CardTitle, Label, Bar, Note, EmptyState } from '../Common/Primitives';
import { gradeBar, pct } from '../../utils/grade';

export default function AcademicPerformanceHub({ student, activeCourse, issues = [] }) {
  if (!student) {
    return (
      <div className="p-8 text-center text-body-sm font-medium text-ink-faint">
        No candidate data available.
      </div>
    );
  }

  const myIssues = issues.filter(
    (i) => i.studentId === student.id || i.studentName === student.name || i.usn === student.usn
  );

  const isTurbo = activeCourse?.id === 'me_617' || student?.courseId === 'me_617';
  const isMath = !isTurbo && (activeCourse?.id === 'math_202' || student?.courseId === 'math_202');

  const comparativeData = isTurbo ? [
    { topic: 'CO1', fullTopic: 'Cascade Aerodynamics', 'Your Score %': student.coAttainment?.CO1 || 93, 'Class Avg %': 82, 'Target %': 75 },
    { topic: 'CO2', fullTopic: 'Stage Work & Reaction', 'Your Score %': student.coAttainment?.CO2 || 94, 'Class Avg %': 80, 'Target %': 70 },
    { topic: 'CO3', fullTopic: 'Stall & Surge Physics', 'Your Score %': student.coAttainment?.CO3 || 96, 'Class Avg %': 76, 'Target %': 72 },
    { topic: 'CO4', fullTopic: 'Turbines & Deflection', 'Your Score %': student.coAttainment?.CO4 || 88, 'Class Avg %': 73, 'Target %': 65 },
  ] : isMath ? [
    { topic: 'CO1', fullTopic: 'Subspaces & Gaussian', 'Your Score %': student.coAttainment?.CO1 || 96, 'Class Avg %': 85, 'Target %': 75 },
    { topic: 'CO2', fullTopic: 'Gram-Schmidt Distances', 'Your Score %': student.coAttainment?.CO2 || 100, 'Class Avg %': 82, 'Target %': 70 },
    { topic: 'CO3', fullTopic: 'Spectral Decomposition', 'Your Score %': student.coAttainment?.CO3 || 98, 'Class Avg %': 79, 'Target %': 72 },
    { topic: 'CO4', fullTopic: 'Conic Canonical Axes', 'Your Score %': student.coAttainment?.CO4 || 95, 'Class Avg %': 74, 'Target %': 65 },
  ] : [
    { topic: 'CO1', fullTopic: 'Process Concurrency', 'Your Score %': student.coAttainment?.CO1 || 85, 'Class Avg %': 83, 'Target %': 75 },
    { topic: 'CO2', fullTopic: 'Deadlock Safety', 'Your Score %': student.coAttainment?.CO2 || 88, 'Class Avg %': 78, 'Target %': 70 },
    { topic: 'CO3', fullTopic: 'Memory & TLB', 'Your Score %': student.coAttainment?.CO3 || 78, 'Class Avg %': 75, 'Target %': 72 },
    { topic: 'CO4', fullTopic: 'Distributed Raft', 'Your Score %': student.coAttainment?.CO4 || 80, 'Class Avg %': 67, 'Target %': 65 },
  ];

  const deductions = (student.answers || []).filter(a => a.awardedMarks < a.maxMarks);

  return (
    <div className="space-y-3 pb-8">
      {/* Standardized Toolbar */}
      <Toolbar
        title="Your performance"
        context={`${activeCourse?.name || 'Course'} · Rank #${student.cohortRank || 1} in Cohort`}
        pill={
          <StatusPill tone="action">
            {student.percentage}% Total Attainment
          </StatusPill>
        }
      />

      <div className="space-y-3 px-6">
        
        {/* Strengths and Gaps */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-card border border-hairline bg-surface px-5 pb-5 pt-[18px]">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <CardTitle>Strongest Outcomes</CardTitle>
              <span className="text-meta font-medium text-ink-faint">Full score attainment</span>
            </div>
            <div className="space-y-2">
              {(student.strongestAreas || ['Theoretical derivation rigor', 'Boundary conditions verification']).map((t, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="block h-2.5 w-2.5 shrink-0 rounded-[3px] bg-pass-fill" />
                  <span className="text-body-sm font-medium text-ink-muted">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-hairline bg-surface px-5 pb-5 pt-[18px]">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <CardTitle>Needs Work</CardTitle>
              <span className="text-meta font-medium text-ink-faint">Step deductions &amp; slips</span>
            </div>
            <div className="space-y-2">
              {(student.weakestAreas || ['Intermediate notation check on margin', 'Unnormalized rotation matrix normalization']).map((t, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="block h-2.5 w-2.5 shrink-0 rounded-[3px] bg-warn-fill" />
                  <span className="text-body-sm font-medium text-ink-muted">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* You Against the Class (Recharts Bar Chart) */}
        <div className="rounded-card border border-hairline bg-surface px-5 pb-5 pt-[18px]">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <CardTitle>You against the class (Outcome Mastery)</CardTitle>
            <span className="text-meta font-medium text-ink-faint">
              Course Outcome percentage vs Class average
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativeData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--track)" vertical={false} />
                <XAxis dataKey="fullTopic" tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={{ stroke: 'var(--hairline)' }} tickLine={false} />
                <YAxis tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} unit="%" domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'var(--surface-sunken)' }}
                  contentStyle={{
                    background: 'var(--surface)',
                    border: '1px solid var(--hairline)',
                    borderRadius: 10,
                    fontSize: 12,
                    color: 'var(--ink)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--ink-faint)' }} />
                <RBar isAnimationActive={false} dataKey="Your Score %" fill="var(--action-bar)" radius={[4, 4, 0, 0]} />
                <RBar isAnimationActive={false} dataKey="Class Avg %" fill="var(--hairline-strong)" radius={[4, 4, 0, 0]} />
                <RBar isAnimationActive={false} dataKey="Target %" fill="var(--pass-fill)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* What to Revise (Study Plan) */}
        <div className="rounded-card border border-hairline bg-surface px-5 pb-5 pt-[18px]">
          <CardTitle>What to revise</CardTitle>

          {deductions.length === 0 ? (
            <p className="mt-3 text-body-sm font-medium text-ink-muted">
              You scored full marks on every question in this paper. Nothing to revise here!
            </p>
          ) : (
            <div className="mt-3.5 space-y-3">
              {deductions.map((item) => {
                const percent = pct(item.awardedMarks, item.maxMarks);
                const lost = Number((item.maxMarks - item.awardedMarks).toFixed(2));

                return (
                  <div key={item.qNo} className="grid grid-cols-[40px_minmax(0,1fr)_70px] items-start gap-3 border-t border-track pt-3 first:border-t-0 first:pt-0">
                    <span className="font-mono text-micro font-semibold text-ink-faint">{item.qNo}</span>
                    <div className="min-w-0">
                      <div className="text-body-sm font-semibold text-ink">{item.title || item.qNo}</div>
                      <p className="pretty mt-1 text-[12px] font-medium leading-[1.5] text-ink-muted">
                        {item.mistakesInline?.[0]?.note || item.aiFeedback}
                      </p>
                      <div className="mt-2 max-w-[220px]">
                        <Bar percent={percent} color={gradeBar(percent)} />
                      </div>
                    </div>
                    <span className="tabular text-right font-mono text-[12.5px] font-semibold text-warn">
                      −{lost}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Objections Tracker */}
        <div className="overflow-hidden rounded-card border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <CardTitle>Your challenge petitions</CardTitle>
            <span className="text-meta font-medium text-ink-faint">
              {myIssues.filter((i) => i.status === 'Under Review' || i.status === 'Pending').length} awaiting board review
            </span>
          </div>

          {myIssues.length === 0 ? (
            <div className="p-5">
              <EmptyState
                icon={ShieldCheck}
                title="No petitions filed"
                body="If you believe a step mark was overlooked, contest it from your answer booklet view."
              />
            </div>
          ) : (
            myIssues.map((issue) => (
              <div key={issue.id} className="border-b border-track px-5 py-4 last:border-b-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-micro font-semibold tracking-[.05em] text-ink-faint">
                    {issue.id} · {issue.qNo}
                  </span>
                  <span className={`rounded-pill border px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                    issue.status === 'Approved by CoE' ? 'border-pass-border bg-pass-tint text-pass'
                      : issue.status === 'Rejected by CoE' ? 'border-bad-border bg-bad-tint text-bad'
                      : 'border-warn-border bg-warn-tint text-warn'
                  }`}>
                    {issue.status.toUpperCase()}
                  </span>
                </div>

                <p className="pretty mt-2 text-body-sm font-medium text-ink-muted">{issue.reason}</p>

                {issue.facultyRemark && (
                  <div className="mt-2.5">
                    <Note tone="action">
                      <span className="font-semibold">Board Remark:</span> {issue.facultyRemark}
                    </Note>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
