import React, { useState } from 'react';
import {
  Building2, Award, TrendingUp, CheckCircle2,
  AlertTriangle, Eye, Search, Sliders, FileText, Sparkles, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AnnotatedScriptInspector from '../StudentView/AnnotatedScriptInspector';
import { gradePill, gradeBar } from '../../utils/grade';
import { Toolbar, StatusPill, StatCard, CardTitle, Label, Bar, Note } from '../Common/Primitives';

const MODE_FILTERS = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'Assignment', label: 'Assign', icon: '📝' },
  { id: 'Quiz', label: 'Quiz', icon: '⚡' },
  { id: 'Examination', label: 'Exam', icon: '🏛️' }
];

const MODE_TINT = {
  Assignment: 'bg-action-tint border-action-border text-action-ink',
  Quiz: 'bg-warn-tint border-warn-border text-warn',
  Examination: 'bg-pass-tint border-pass-border text-pass',
};

export default function DeanDashboard({
  students = [],
  courses = [],
  activeCourse,
  issues = [],
  onInspectStudentScript
}) {
  const [deanTab, setDeanTab] = useState('ledger'); // 'ledger' | 'obe' | 'grievances' | 'faculty_audit'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModeFilter, setSelectedModeFilter] = useState('all'); // 'all' | 'Assignment' | 'Quiz' | 'Examination'
  const [inspectingStudent, setInspectingStudent] = useState(null);
  const [isDepartmentCertified, setIsDepartmentCertified] = useState(false);
  const [deanEndorsementNote, setDeanEndorsementNote] = useState('');
  const [showEndorsementModal, setShowEndorsementModal] = useState(false);

  // Filter students across the active course (or all courses in this department)
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMode = selectedModeFilter === 'all' || s.evaluationMode === selectedModeFilter;
    return matchesSearch && matchesMode;
  });

  const totalEvaluated = filteredStudents.length;
  const avgScore = totalEvaluated > 0
    ? (filteredStudents.reduce((acc, s) => acc + s.totalMarks, 0) / totalEvaluated).toFixed(1)
    : '0';
  const avgPercentage = totalEvaluated > 0
    ? ((avgScore / 75) * 100).toFixed(1)
    : '0';

  const pendingPetitions = issues.filter(i => i.status === 'Under Review');

  // CO domain data for active course in Dean's view
  const isTurbo = activeCourse?.id === 'me_617';
  const isMath = activeCourse?.id === 'math_202';

  const coAttainmentData = isTurbo ? [
    { co: 'CO1: Cascade Aerodynamics', target: 75, achieved: 85.2, compliance: '113.6% (Exceeded)' },
    { co: 'CO2: Stage Work & Reaction', target: 70, achieved: 88.0, compliance: '125.7% (Exceeded)' },
    { co: 'CO3: Stall & Surge Instabilities', target: 72, achieved: 81.4, compliance: '113.0% (Exceeded)' },
    { co: 'CO4: Hydraulic Reaction Turbines', target: 65, achieved: 78.5, compliance: '120.7% (Exceeded)' }
  ] : isMath ? [
    { co: 'CO1: Gaussian Elimination & Subspaces', target: 75, achieved: 85.6, compliance: '114.1% (Exceeded)' },
    { co: 'CO2: Gram-Schmidt & Distances', target: 70, achieved: 82.4, compliance: '117.7% (Exceeded)' },
    { co: 'CO3: Spectral Decomposition QDQᵀ', target: 72, achieved: 79.8, compliance: '110.8% (Exceeded)' },
    { co: 'CO4: Quadratic Forms & Conic Geometry', target: 65, achieved: 74.2, compliance: '114.1% (Exceeded)' }
  ] : [
    { co: 'CO1: Concurrency & Semaphores', target: 75, achieved: 83.5, compliance: '111.3% (Exceeded)' },
    { co: 'CO2: Deadlock Safety & Bankers', target: 70, achieved: 78.2, compliance: '111.7% (Exceeded)' },
    { co: 'CO3: Virtual Memory & Multi-tier Paging', target: 72, achieved: 75.6, compliance: '105.0% (Target Met)' },
    { co: 'CO4: Distributed Raft Consensus', target: 65, achieved: 69.4, compliance: '106.7% (Target Met)' }
  ];

  const handleCertifyDepartment = () => {
    setIsDepartmentCertified(true);
    setShowEndorsementModal(false);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    alert(`Dean's Quality Ratification confirmed for ${activeCourse?.department || 'Department'}. Evaluation integrity and rubric compliance certified.`);
  };

  const deanTabs = [
    { id: 'ledger', label: 'Scripts ledger', icon: FileText, count: totalEvaluated },
    { id: 'obe', label: 'OBE attainment', icon: TrendingUp },
    { id: 'grievances', label: 'Petitions', icon: AlertTriangle, count: issues.length },
    { id: 'faculty_audit', label: 'Rubric policy audit', icon: Sliders },
  ];

  return (
    <>
      <Toolbar
        title={`${activeCourse?.department || 'Department'} evaluation audit`}
        context="Office of the Dean · Academic & evaluation quality oversight"
        pill={
          isDepartmentCertified ? (
            <StatusPill tone="pass">RATIFIED</StatusPill>
          ) : (
            <StatusPill tone="neutral">AWAITING RATIFICATION</StatusPill>
          )
        }
      >
        <button
          onClick={() => setShowEndorsementModal(true)}
          disabled={isDepartmentCertified}
          className="btn btn-primary cursor-pointer"
        >
          {isDepartmentCertified ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Award className="h-3.5 w-3.5" />}
          {isDepartmentCertified ? 'Academic rigor certified by Dean' : 'Ratify evaluation quality'}
        </button>
      </Toolbar>

      <div className="space-y-3 p-6">

        <Note tone="action">
          As Dean of the Department, inspect all candidate answer scripts across <strong className="text-ink">Assignments</strong>, <strong className="text-ink">Quizzes</strong>, and <strong className="text-ink">Examinations</strong>. Audit rubric adherence, examine Course Outcome (OBE) compliance, and ratify marking rigor for <strong className="text-ink">{activeCourse?.name}</strong>.
        </Note>

        {/* Dean KPI Metric Summary Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            index={0}
            icon={Building2}
            label="EVALUATED SCRIPTS AUDITED"
            value={totalEvaluated}
            percent={100}
            barColor="bg-pass-fill"
            caption="All pages OCR verified by Gemini 3.6"
          />
          <StatCard
            index={1}
            icon={TrendingUp}
            iconClass="text-pass"
            label="DEPARTMENTAL MEAN SCORE"
            value={avgScore}
            denominator={75}
            percent={Number(avgPercentage)}
            barColor="bg-pass-fill"
            caption={`${avgPercentage}% · healthy normal distribution`}
          />
          <StatCard
            index={2}
            icon={Award}
            iconClass="text-action"
            label="OBE ACCREDITATION INDEX"
            value="4 / 4"
            percent={100}
            barColor="bg-action-bar"
            caption="ABET / NBA Tier-1 · outcomes met"
          />
          <StatCard
            index={3}
            icon={AlertTriangle}
            iconClass={pendingPetitions.length > 0 ? 'text-warn' : 'text-ink-faint'}
            label="RE-EVALUATION PETITIONS"
            value={issues.length}
            percent={issues.length ? Math.round((pendingPetitions.length / issues.length) * 100) : 0}
            barColor="bg-warn-fill"
            caption={`${pendingPetitions.length} pending audit · fee docket confirmed`}
          />
        </div>

        {/* Dean Sub-Navigation Tabs */}
        <div className="flex items-stretch overflow-x-auto rounded-card border border-hairline bg-surface px-2">
          {deanTabs.map((tab) => {
            const isActive = deanTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setDeanTab(tab.id)}
                className={`flex items-center gap-[7px] whitespace-nowrap px-3.5 py-3.5 text-[13px] transition-colors cursor-pointer ${
                  isActive ? 'font-semibold text-action-ink' : 'font-medium text-ink-faint hover:text-ink'
                }`}
                style={isActive ? { boxShadow: 'inset 0 -2px 0 var(--action)' } : undefined}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="rounded-[9px] bg-warn-tint px-[7px] py-0.5 font-mono text-[10.5px] font-semibold leading-[1.3] text-warn">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Comprehensive Script Inspection Ledger */}
        {deanTab === 'ledger' && (
          <div className="overflow-hidden rounded-card border border-hairline bg-surface">
            <div className="flex flex-col gap-4 border-b border-hairline px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Departmental candidate examination scripts ledger</CardTitle>
                <p className="mt-0.5 text-[11.5px] font-medium text-ink-faint">
                  Click <strong className="text-ink-muted">Inspect</strong> on any candidate to review their original handwritten pages, question-by-question scoring, and AI derivation checks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex w-full items-center gap-2.5 rounded-field border border-hairline bg-page px-3 py-2 sm:w-[240px]">
                  <Search className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={2.2} />
                  <input
                    type="text"
                    placeholder="Search name, USN, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-[12px] font-medium text-ink outline-none placeholder:text-ink-faint"
                  />
                </div>

                <div className="flex items-center rounded-field border border-hairline bg-page p-[3px]">
                  {MODE_FILTERS.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedModeFilter(mode.id)}
                      className={`rounded-pill px-2.5 py-1 text-[11.5px] transition-colors cursor-pointer ${
                        selectedModeFilter === mode.id
                          ? 'bg-action font-semibold text-white'
                          : 'font-medium text-ink-faint hover:text-ink'
                      }`}
                    >
                      {mode.icon} {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.3fr)_128px_110px_84px_74px_90px_112px] gap-x-3 bg-surface-sunken px-5 py-2.5 font-mono text-[10.5px] font-semibold tracking-[.06em] text-ink-faint">
                  <div>CANDIDATE &amp; USN</div>
                  <div>EVALUATION</div>
                  <div>MODE</div>
                  <div className="text-right">SCORE</div>
                  <div className="text-right">PERCENT</div>
                  <div className="text-right">GRADE</div>
                  <div>PAGES</div>
                  <div className="text-right">ACTION</div>
                </div>

                {filteredStudents.map((stu, index) => (
                  <div
                    key={stu.id}
                    className="animate-rise grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.3fr)_128px_110px_84px_74px_90px_112px] gap-x-3 items-center border-t border-track px-5 py-3.5 transition-colors hover:bg-surface-sunken"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-center gap-[11px]">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="h-9 w-9 shrink-0 rounded-tile border border-hairline object-cover"
                      />
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-[13.5px] font-semibold text-ink">{stu.name}</span>
                        <span className="truncate font-mono text-[11px] font-medium text-ink-faint">USN: {stu.usn}</span>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-body-sm font-semibold text-ink">{stu.title || activeCourse?.name}</div>
                      <div className="truncate text-[10.5px] font-medium text-ink-faint">
                        Evaluated by: {stu.evaluator ? stu.evaluator.split('&')[0] : 'Chief Examiner'}
                      </div>
                    </div>

                    <div>
                      <span className={`rounded-pill border px-2.5 py-1 text-[10px] font-bold ${MODE_TINT[stu.evaluationMode] || 'bg-surface-raised border-hairline text-ink-muted'}`}>
                        {stu.evaluationMode === 'Assignment' ? '📝 Assignment' : stu.evaluationMode === 'Quiz' ? '⚡ Quiz' : '🏛️ Examination'}
                      </span>
                    </div>

                    <div className="tabular text-right text-[15px] font-bold text-ink">
                      {stu.totalMarks}<span className="text-[11px] font-medium text-ink-faint"> / 75</span>
                    </div>

                    <div className="tabular text-right font-mono text-[13px] font-semibold text-ink-muted">
                      {stu.percentage}%
                    </div>

                    <div className="text-right">
                      <span className={`min-w-[32px] rounded-pill border px-2 py-1 text-center text-[11px] font-bold leading-[1.2] ${gradePill(stu.percentage)}`}>
                        {stu.grade?.split(' ')[0] || 'S'}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] font-medium text-ink-faint">
                      {stu.scriptPages?.length || 1} pages
                    </div>

                    <div className="text-right">
                      <button
                        onClick={() => {
                          if (onInspectStudentScript) {
                            onInspectStudentScript(stu);
                          } else {
                            setInspectingStudent(stu);
                          }
                        }}
                        className="btn btn-secondary btn-sm ml-auto cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" /> Inspect
                      </button>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="px-5 py-10 text-center text-body-sm font-medium text-ink-faint">
                    No candidate matches the current search or mode filter.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: OBE & Accreditation Attainment Analysis */}
        {deanTab === 'obe' && (
          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-card border border-hairline bg-surface px-5 py-4">
              <div className="mb-1 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-action" strokeWidth={2.2} />
                <CardTitle>Department Course Outcome (CO) attainment audit</CardTitle>
              </div>
              <p className="mb-4 text-body-sm font-medium text-ink-muted">
                Measured against statutory NBA Tier-1 and ABET Computing accreditation baselines for <strong className="text-ink">{activeCourse?.name}</strong>.
              </p>

              <div className="space-y-4">
                {coAttainmentData.map((item, idx) => (
                  <div key={idx} className="rounded-inner border border-hairline bg-surface-sunken p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-body-sm font-semibold text-ink">{item.co}</span>
                      <span className="tabular font-mono text-[12px] font-semibold text-action-ink">
                        {item.achieved}% <span className="text-ink-faint">(target {item.target}%)</span>
                      </span>
                    </div>
                    <Bar percent={item.achieved} color={gradeBar(item.achieved)} height={7} delay={idx * 70} />
                    <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-ink-faint">
                      <span className="flex items-center gap-1 text-pass">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {item.compliance}
                      </span>
                      <span>Direct assessment weight: 25%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-card border border-hairline bg-surface px-5 py-4">
                <div className="mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-warn" strokeWidth={2.2} />
                  <CardTitle>Dean's academic quality verdict</CardTitle>
                </div>
                <Note tone="pass">
                  <span className="font-bold">All accreditation thresholds satisfied.</span> The cohort demonstrates superior mastery across conceptual derivations, free vortex flow physics, and formal proofs. Evaluation step-credits adhere strictly to institutional ordinances.
                </Note>
              </div>

              <div className="rounded-card border border-hairline bg-surface px-5 py-4">
                <Label>AUDITED EVALUATION PARAMETERS</Label>
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-ink-muted">LaTeX notation rigor</span>
                    <strong className="text-ink">99.1% compliance</strong>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-ink-muted">Step-marking variance</span>
                    <strong className="text-pass">&lt; 1.5% across cohort</strong>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-ink-muted">Bloom Taxonomy L4/L5 rigor</span>
                    <strong className="text-ink">55% of max marks</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Grievances & Moderation Quality Review */}
        {deanTab === 'grievances' && (
          <div className="overflow-hidden rounded-card border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
              <div>
                <CardTitle>Student challenge petitions &amp; quality moderation audit</CardTitle>
                <p className="mt-0.5 text-[11.5px] font-medium text-ink-faint">
                  Review formal student re-evaluation petitions, candidate appeals, and AI audit recommendations.
                </p>
              </div>
              <StatusPill tone={pendingPetitions.length > 0 ? 'warn' : 'pass'}>
                {pendingPetitions.length} PENDING DEAN REVIEW
              </StatusPill>
            </div>

            <div className="divide-y divide-hairline">
              {issues.map((issue) => (
                <div key={issue.id} className="space-y-3 px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded-badge border border-warn-border bg-warn-tint px-2.5 py-1 font-mono text-[11px] font-bold text-warn">
                        Docket #{issue.id}
                      </span>
                      <div>
                        <strong className="text-[13.5px] font-semibold text-ink">{issue.studentName}</strong>
                        <span className="ml-2 font-mono text-[11px] text-ink-faint">({issue.usn})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11.5px] font-medium text-ink-faint">
                        {issue.qNo} · Current: <strong className="tabular font-mono text-warn">{issue.currentScore}/{issue.maxMarks}</strong> → Claimed: <strong className="tabular font-mono text-pass">{issue.claimedScore}/{issue.maxMarks}</strong>
                      </span>
                      <span className={`rounded-pill border px-2.5 py-0.5 text-[10px] font-bold ${
                        issue.status === 'Approved by CoE' ? 'bg-pass-tint border-pass-border text-pass' : 'bg-warn-tint border-warn-border text-warn'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-px overflow-hidden rounded-inner bg-hairline md:grid-cols-2">
                    <div className="bg-surface-sunken p-3.5">
                      <Label>CANDIDATE'S GROUNDS FOR APPEAL</Label>
                      <p className="pretty mt-2 text-[12.5px] leading-[1.6] text-ink-muted">{issue.reason}</p>
                    </div>
                    <div className="bg-surface-sunken p-3.5">
                      <Label className="flex items-center gap-1 !text-action-ink">
                        <Sparkles className="h-3 w-3" /> AI EVALUATION RE-AUDIT RECOMMENDATION
                      </Label>
                      <p className="pretty mt-2 text-[12.5px] leading-[1.6] text-ink-muted">{issue.aiRecommendation}</p>
                    </div>
                  </div>
                </div>
              ))}

              {issues.length === 0 && (
                <div className="px-5 py-10 text-center text-body-sm font-medium text-ink-faint">
                  No challenge petitions have been raised for this department yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Chief Examiner & Rubric Policy Audit */}
        {deanTab === 'faculty_audit' && (
          <div className="rounded-card border border-hairline bg-surface px-5 py-4">
            <div className="mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-action" strokeWidth={2.2} />
              <CardTitle>Examiner rubric policy &amp; model rigor audit</CardTitle>
            </div>
            <p className="mb-4 -mt-2 text-body-sm font-medium text-ink-muted">
              Review active evaluation parameters established by the Chief Examiner for <strong className="text-ink">{activeCourse?.name}</strong>.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
                <Label>CHIEF EXAMINER</Label>
                <div className="mt-1.5 text-[14px] font-bold text-ink">{activeCourse?.chiefExaminer || 'Prof. Dr. Gilbert Strang'}</div>
                <div className="mt-0.5 text-[11px] font-medium text-pass">Accredited by Senate</div>
              </div>

              <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
                <Label>EVALUATOR MODEL</Label>
                <div className="mt-1.5 text-[14px] font-bold text-ink">Gemini 3.6 Multimodal Engine</div>
                <div className="mt-0.5 text-[11px] font-medium text-pass">99.8% LaTeX multimodal accuracy</div>
              </div>

              <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
                <Label>STANDARD STRICTNESS</Label>
                <div className="mt-1.5 text-[14px] font-bold text-ink">University Standard</div>
                <div className="mt-0.5 text-[11px] font-medium text-action-ink">Step-credit deductions enforced</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* In-Modal Answer Script Inspector for Dean */}
      {inspectingStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgba(0, 0, 0, 0.65)' }}
          onClick={() => setInspectingStudent(null)}
        >
          <div
            className="animate-rise max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-card border border-hairline bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-action" strokeWidth={2.2} />
                <h3 className="text-[15px] font-bold tracking-[-0.2px] text-ink">
                  Dean inspection: {inspectingStudent.name} ({inspectingStudent.usn})
                </h3>
              </div>
              <button
                onClick={() => setInspectingStudent(null)}
                className="flex h-8 w-8 items-center justify-center rounded-field border border-hairline text-ink-faint hover:bg-surface-sunken hover:text-ink cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnnotatedScriptInspector
              student={inspectingStudent}
              activeCourse={activeCourse}
              onSubmitIssue={() => {}}
            />
          </div>
        </div>
      )}

      {/* Dean Endorsement Modal */}
      {showEndorsementModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgba(0, 0, 0, 0.65)' }}
          onClick={() => setShowEndorsementModal(false)}
        >
          <div
            className="animate-rise w-full max-w-lg space-y-4 rounded-card border border-hairline bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-[13px] font-bold text-action-ink">
              <Award className="h-4 w-4" /> Formal Dean endorsement &amp; quality ratification
            </div>
            <p className="text-body-sm font-medium text-ink-muted">
              Confirm that you have reviewed the evaluation scripts, step-credit allocations, and Course Outcome attainment for <strong className="text-ink">{activeCourse?.department}</strong>.
            </p>

            <textarea
              rows={3}
              placeholder="Enter Dean's academic oversight remarks (optional)..."
              value={deanEndorsementNote}
              onChange={(e) => setDeanEndorsementNote(e.target.value)}
              className="field w-full p-3 text-[12.5px] leading-[1.55]"
            />

            <div className="flex items-center justify-end gap-2.5 border-t border-hairline pt-4">
              <button
                onClick={() => setShowEndorsementModal(false)}
                className="btn btn-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCertifyDepartment}
                className="btn btn-primary cursor-pointer"
              >
                Certify &amp; sign endorsement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
