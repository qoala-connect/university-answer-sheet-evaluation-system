import React, { useState, useMemo } from 'react';
import {
  Globe2, Building, TrendingUp, Award, BarChart3,
  SlidersHorizontal, CheckCircle2, ChevronRight,
  Sparkles, Layers, Landmark, BookOpen, AlertCircle,
  FileCheck, HelpCircle, ShieldCheck
} from 'lucide-react';
import {
  BENCHMARK_UNIVERSITIES,
  INTER_UNIVERSITY_COURSE_BENCHMARKS
} from '../../data/deanUniversityBenchmarks';
import { StatusPill, CardTitle, Label, Bar } from '../Common/Primitives';

export default function DeanUniversityComparison({
  activeCourse,
  courses = [],
  onSelectCourse
}) {
  const [scopeFilter, setScopeFilter] = useState('national'); // 'all' | 'national' | 'regional'
  const [selectedMetric, setSelectedMetric] = useState('passPercentage'); // 'passPercentage' | 'batchAveragePercentage' | 'obeTargetAttainment' | 'bloomRigourIndex' | 'distinctionRate'
  const [pinnedCompareUnivId, setPinnedCompareUnivId] = useState('iit_m');
  const [viewPerspective, setViewPerspective] = useState('both'); // 'both' | 'qualitative' | 'quantitative'

  const activeCourseId = activeCourse?.id || 'me_617';

  // Get benchmark data for the active course (fallback to me_617 or math_202)
  const courseBenchmark = useMemo(() => {
    return INTER_UNIVERSITY_COURSE_BENCHMARKS[activeCourseId] ||
      INTER_UNIVERSITY_COURSE_BENCHMARKS['me_617'] ||
      INTER_UNIVERSITY_COURSE_BENCHMARKS['math_202'];
  }, [activeCourseId]);

  // Combine institutional stats with university metadata
  const institutions = useMemo(() => {
    return courseBenchmark.institutionalStats.map((stat) => {
      const meta = BENCHMARK_UNIVERSITIES.find((u) => u.id === stat.univId) || {
        name: stat.univId,
        shortName: stat.univId,
        tier: 'Peer University',
        nirfRank: '-',
        region: 'National',
        accreditation: 'Accredited'
      };
      return {
        ...stat,
        ...meta
      };
    });
  }, [courseBenchmark]);

  // Filtered by regional / national scope
  const filteredInstitutions = useMemo(() => {
    if (scopeFilter === 'all') return institutions;
    return institutions.filter((inst) => inst.isHost || inst.scope === scopeFilter);
  }, [institutions, scopeFilter]);

  // Find host institution stats for relative comparison
  const hostStats = useMemo(() => {
    return institutions.find((inst) => inst.isHost) || institutions[0];
  }, [institutions]);

  // Pinned comparison peer
  const pinnedPeer = useMemo(() => {
    return institutions.find((inst) => inst.univId === pinnedCompareUnivId) || institutions.find(i => !i.isHost) || institutions[1];
  }, [institutions, pinnedCompareUnivId]);

  // Calculate cohort aggregates (National Peer Universities vs Host)
  const cohortAggregates = useMemo(() => {
    const national = institutions.filter((i) => i.scope === 'national');
    const regional = institutions.filter((i) => i.scope === 'regional');

    const calcAvg = (arr, key) => arr.length ? (arr.reduce((s, x) => s + (x[key] || 0), 0) / arr.length).toFixed(1) : 0;

    return {
      national: {
        passPercentage: calcAvg(national, 'passPercentage'),
        failPercentage: calcAvg(national, 'failPercentage'),
        batchAveragePercentage: calcAvg(national, 'batchAveragePercentage'),
        obeAttainment: calcAvg(national, 'obeTargetAttainment'),
        bloomRigourIndex: calcAvg(national, 'bloomRigourIndex'),
        totalAppeared: national.reduce((s, x) => s + (x.appearedCount || 0), 0),
        count: national.length
      },
      regional: {
        passPercentage: calcAvg(regional, 'passPercentage'),
        failPercentage: calcAvg(regional, 'failPercentage'),
        batchAveragePercentage: calcAvg(regional, 'batchAveragePercentage'),
        obeAttainment: calcAvg(regional, 'obeTargetAttainment'),
        totalAppeared: regional.reduce((s, x) => s + (x.appearedCount || 0), 0)
      }
    };
  }, [institutions]);

  const metricsConfig = [
    { id: 'passPercentage', label: 'Pass Rate (%)', unit: '%', desc: 'Candidates meeting statutory pass cutoff' },
    { id: 'batchAveragePercentage', label: 'Batch Avg Score (%)', unit: '%', desc: 'Overall mean cohort performance' },
    { id: 'obeTargetAttainment', label: 'OBE CO Attainment (%)', unit: '%', desc: 'Course outcomes met (NBA/ABET)' },
    { id: 'bloomRigourIndex', label: 'Bloom L4/L5 Rigour', unit: '%', desc: 'Analytical proof & synthesis score' },
    { id: 'distinctionRate', label: 'Distinction Rate (>75%)', unit: '%', desc: 'Candidates securing >= 75%' }
  ];

  return (
    <div className="space-y-4">
      {/* Executive Header & Course Switcher */}
      <div className="rounded-card border border-hairline bg-surface p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-tile bg-action-tint text-action-ink">
                <Globe2 className="h-4 w-4" />
              </span>
              <CardTitle>Dean's National University Results Comparison Console</CardTitle>
              <span className="rounded-pill bg-action-tint border border-action-border px-2 py-0.5 font-mono text-[10px] font-bold text-action-ink uppercase">
                Dean-Exclusive
              </span>
            </div>
            <p className="mt-1 text-body-sm font-medium text-ink-muted">
              Qualitative and quantitative benchmark of host university candidate scripts against top-tier <strong>National Universities</strong> across all collegiate technical and non-technical disciplines for <strong className="text-ink">{courseBenchmark.courseName}</strong>.
            </p>
          </div>

          {/* Quick Course Switcher for Dean */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-field border border-hairline bg-page px-3 py-1.5 text-[11.5px] font-medium text-ink-faint">
              <Layers className="h-3.5 w-3.5 text-action-ink" />
              <span>Discipline:</span>
              <strong className="text-ink">{courseBenchmark.discipline || courseBenchmark.courseType}</strong>
            </div>

            {onSelectCourse && courses.length > 0 && (
              <select
                aria-label="Select course to benchmark"
                value={activeCourseId}
                onChange={(e) => onSelectCourse(e.target.value)}
                className="field text-[12px] font-semibold py-1.5 px-3"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon || '📚'} {c.code}: {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

      {/* Filters, View Perspective & Metric Selector Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* National vs All Filter */}
            <div className="flex items-center gap-1.5 rounded-xl border border-hairline bg-page p-1.5 shadow-sm">
              <span className="px-2.5 text-[11px] font-bold tracking-wider text-ink-muted uppercase">Scope:</span>
              {[
                { id: 'national', label: 'National Universities Only' },
                { id: 'all', label: 'All Peers (National & Regional)' }
              ].map((scope) => (
                <button
                  key={scope.id}
                  onClick={() => setScopeFilter(scope.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition-all cursor-pointer ${
                    scopeFilter === scope.id
                      ? 'bg-action font-bold text-white shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-surface'
                  }`}
                >
                  {scope.label}
                </button>
              ))}
            </div>

            {/* Qualitative vs Quantitative Perspective View */}
            <div className="flex items-center gap-1.5 rounded-xl border border-hairline bg-page p-1.5 shadow-sm">
              <span className="px-2.5 text-[11px] font-bold tracking-wider text-ink-muted uppercase">View:</span>
              {[
                { id: 'both', label: 'Combined View' },
                { id: 'qualitative', label: 'Qualitative Evaluation' },
                { id: 'quantitative', label: 'Quantitative Metrics' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewPerspective(view.id)}
                  className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${
                    viewPerspective === view.id
                      ? 'bg-surface-raised font-bold text-ink shadow-sm ring-1 ring-hairline'
                      : 'text-ink-muted hover:text-ink hover:bg-surface'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-ink-muted" />
            <span className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Benchmark Metric:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-hairline bg-page p-1.5 shadow-sm">
              {metricsConfig.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all cursor-pointer ${
                    selectedMetric === metric.id
                      ? 'bg-action-tint font-bold text-action-ink border border-action-border shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-surface'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Strip (Host vs National Premier Peers) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Host Institution Card */}
        <div className="rounded-2xl border-2 border-action-border bg-action-tint/30 p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-action px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
              Host University (Our Results)
            </span>
            <span className="text-[12px] font-bold text-action-ink">NIRF #{hostStats.nirfRank}</span>
          </div>
          <div className="mt-3 text-[16px] font-extrabold text-ink truncate leading-tight">{hostStats.name}</div>
          <div className="mt-3.5 grid grid-cols-2 gap-3 border-t border-action-border/40 pt-3">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Pass Rate</div>
              <div className="text-[22px] font-black text-pass leading-tight mt-0.5">{hostStats.passPercentage}%</div>
              <div className="text-[11.5px] font-medium text-fail mt-0.5">Fail: {hostStats.failPercentage}% ({hostStats.failedCount} students)</div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Batch Mean</div>
              <div className="text-[22px] font-black text-action-ink leading-tight mt-0.5">{hostStats.batchAveragePercentage}%</div>
              <div className="text-[11.5px] font-medium text-ink-muted mt-0.5">Avg: {hostStats.batchAverageMarks}/{courseBenchmark.maxMarks} (σ={hostStats.standardDeviation})</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-ink-muted border-t border-action-border/30 pt-2.5">
            <span>OBE Outcome Attainment:</span>
            <strong className="text-ink font-bold text-[13px]">{hostStats.obeTargetAttainment}%</strong>
          </div>
        </div>

        {/* National Peer Universities Average Card */}
        <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-surface-raised border border-hairline px-2.5 py-1 text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              National Universities Mean
            </span>
            <span className="text-[12px] font-semibold text-ink-faint">{cohortAggregates.national.count} National Peers</span>
          </div>
          <div className="mt-3 text-[16px] font-extrabold text-ink leading-tight">National Benchmark Average</div>
          <div className="mt-3.5 grid grid-cols-2 gap-3 border-t border-hairline pt-3">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Pass Rate</div>
              <div className="text-[22px] font-black text-pass leading-tight mt-0.5">{cohortAggregates.national.passPercentage}%</div>
              <div className="text-[11.5px] font-medium text-fail mt-0.5">Fail: {cohortAggregates.national.failPercentage}%</div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Batch Mean</div>
              <div className="text-[22px] font-black text-ink leading-tight mt-0.5">{cohortAggregates.national.batchAveragePercentage}%</div>
              <div className="text-[11.5px] font-medium text-ink-muted mt-0.5">
                Host vs National: {(hostStats.batchAveragePercentage - cohortAggregates.national.batchAveragePercentage) >= 0 ? '+' : ''}{(hostStats.batchAveragePercentage - cohortAggregates.national.batchAveragePercentage).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-ink-muted border-t border-hairline pt-2.5">
            <span>National Target Benchmark:</span>
            <strong className="text-ink font-bold text-[13px]">{cohortAggregates.national.obeAttainment}%</strong>
          </div>
        </div>

        {/* Academic Quality & Rigour Card */}
        <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-surface-raised border border-hairline px-2.5 py-1 text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              Evaluator Rigour
            </span>
            <span className="text-[12px] text-pass font-bold">Gemini 3.6 Multimodal</span>
          </div>
          <div className="mt-3 text-[16px] font-extrabold text-ink leading-tight">Analytical Bloom L4/L5 Rigor</div>
          <div className="mt-3.5 grid grid-cols-2 gap-3 border-t border-hairline pt-3">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Bloom Rigor</div>
              <div className="text-[22px] font-black text-ink leading-tight mt-0.5">{hostStats.bloomRigourIndex}%</div>
              <div className="text-[11.5px] font-medium text-ink-muted mt-0.5">National: {cohortAggregates.national.bloomRigourIndex}%</div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Distinction Rate</div>
              <div className="text-[22px] font-black text-action-ink leading-tight mt-0.5">{hostStats.distinctionRate}%</div>
              <div className="text-[11.5px] font-semibold text-pass mt-0.5">&gt;= 75% Marks</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-ink-muted border-t border-hairline pt-2.5">
            <span>Student Appeal Rate:</span>
            <strong className="text-ink font-bold text-[13px]">{hostStats.appealRate}% (Low Dockets)</strong>
          </div>
        </div>

        {/* Dean's Institutional Standing Verdict Card */}
        <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-action-ink">
              <Award className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Dean Audit Standing</span>
            </div>
            <div className="mt-2 text-[18px] font-extrabold text-ink leading-snug">National Parity Confirmed</div>
            <p className="mt-1.5 text-[12.5px] leading-[1.55] text-ink-muted">
              Candidate performance on <strong className="text-ink">{courseBenchmark.courseName}</strong> matches top national universities with a <strong className="text-pass font-bold">{hostStats.passPercentage}% pass rate</strong> and verified accreditation outcomes.
            </p>
          </div>
          <div className="mt-3.5 rounded-xl bg-pass-tint/60 border border-pass-border px-3 py-1.5 text-[11.5px] font-semibold text-pass flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> NBA &amp; National Baseline Satisfied
          </div>
        </div>
      </div>

      {/* QUALITATIVE EVALUATION AUDIT CARDS (When perspective includes qualitative) */}
      {(viewPerspective === 'both' || viewPerspective === 'qualitative') && (
        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-action-tint text-action-ink">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-[17px]">Dean's Qualitative Results Audit &amp; Conceptual Pedagogy Comparison</CardTitle>
                <p className="mt-0.5 text-[12.5px] font-medium text-ink-muted">
                  Clear academic verdicts, student script strengths, common deductions, and pedagogical action items
                </p>
              </div>
            </div>
            <StatusPill tone="action">Curricular Audit Active</StatusPill>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredInstitutions.map((inst) => {
              const isHost = inst.isHost;
              return (
                <div
                  key={inst.univId}
                  className={`rounded-2xl border p-5 transition-all shadow-sm ${
                    isHost
                      ? 'border-action-border bg-action-tint/25 ring-2 ring-action-border/60'
                      : 'border-hairline bg-surface hover:border-hairline-strong'
                  }`}
                >
                  {/* University Title & Scope Badges */}
                  <div className="flex flex-wrap items-start justify-between gap-2.5 border-b border-hairline/80 pb-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-[15.5px] font-extrabold tracking-tight ${isHost ? 'text-action-ink' : 'text-ink'}`}>
                          {inst.name}
                        </h4>
                        {isHost && (
                          <span className="rounded-md bg-action px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                            Host Institution
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2.5 text-[12px] text-ink-muted">
                        <span className="font-semibold text-ink">NIRF #{inst.nirfRank}</span>
                        <span>•</span>
                        <span>{inst.category || inst.tier}</span>
                        <span>•</span>
                        <span className="text-pass font-bold text-[12.5px]">Pass: {inst.passPercentage}%</span>
                        <span>•</span>
                        <span className="text-fail font-bold text-[12.5px]">Fail: {inst.failPercentage}%</span>
                      </div>
                    </div>

                    <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${
                      inst.scope === 'national' || isHost
                        ? 'bg-pass-tint border border-pass-border text-pass'
                        : 'bg-surface-raised border border-hairline text-ink-muted'
                    }`}>
                      {inst.auditStatus}
                    </span>
                  </div>

                  {/* Qualitative Breakdown Blocks with Generous Spacing and High Contrast */}
                  <div className="mt-4 space-y-3.5">
                    {/* Overall Qualitative Verdict */}
                    <div className="rounded-xl border border-action-border/40 bg-surface/80 p-3.5">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-action-ink flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" /> Qualitative Academic Verdict
                      </div>
                      <p className="mt-1.5 text-[13.5px] font-bold text-ink leading-relaxed">
                        "{inst.qualitativeVerdict}"
                      </p>
                    </div>

                    {/* Conceptual Strengths */}
                    <div className="rounded-xl border border-pass-border/60 bg-surface/90 p-3.5">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-pass flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Conceptual Strengths in Student Scripts
                      </div>
                      <p className="mt-1.5 text-[12.5px] font-medium text-ink-muted leading-[1.65]">
                        {inst.conceptualStrengths}
                      </p>
                    </div>

                    {/* Critical Gaps & Deductions */}
                    <div className="rounded-xl border border-warn-border/60 bg-surface/90 p-3.5">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-warn flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5" /> Curricular Gaps &amp; Common Mark Deductions
                      </div>
                      <p className="mt-1.5 text-[12.5px] font-medium text-ink-muted leading-[1.65]">
                        {inst.criticalGaps}
                      </p>
                    </div>

                    {/* Pedagogical Recommendation */}
                    <div className="rounded-xl border border-hairline bg-surface-raised/70 p-3 flex items-start gap-2 text-[12px] text-ink-muted">
                      <FileCheck className="h-4 w-4 text-action-ink shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-ink font-bold">Dean's Action Item:</strong> {inst.pedagogicalRecommendation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUANTITATIVE GRAPH & DISTRIBUTION (When perspective includes quantitative) */}
      {(viewPerspective === 'both' || viewPerspective === 'quantitative') && (
        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-action-tint text-action-ink">
                <BarChart3 className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-[17px]">
                  Cross-Institutional Comparative Distribution — {metricsConfig.find(m => m.id === selectedMetric)?.label}
                </CardTitle>
                <p className="mt-0.5 text-[12.5px] font-medium text-ink-muted">
                  Calibrated to standardized university grading ordinances &amp; multimodal marking rubrics
                </p>
              </div>
            </div>
            <span className="text-[12px] font-medium text-ink-faint">
              Displaying {filteredInstitutions.length} institutions
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {filteredInstitutions.map((inst, idx) => {
              const metricVal = inst[selectedMetric] || 0;
              const isHost = inst.isHost;
              return (
                <div
                  key={inst.univId}
                  className={`rounded-xl border p-4 transition-all shadow-sm ${
                    isHost
                      ? 'border-action-border bg-action-tint/25 ring-2 ring-action-border/60'
                      : 'border-hairline bg-surface hover:border-hairline-strong'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 min-w-[320px]">
                      <span className="font-bold text-[13px] text-ink-muted w-6">#{idx + 1}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className={`text-[14.5px] ${isHost ? 'text-action-ink font-extrabold' : 'text-ink font-bold'}`}>
                            {inst.name}
                          </strong>
                          {isHost && (
                            <span className="rounded-md bg-action px-2 py-0.5 text-[9.5px] font-bold text-white uppercase tracking-wider shadow-sm">
                              Host
                            </span>
                          )}
                          <span className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold ${
                            inst.scope === 'national'
                              ? 'bg-action-tint border-action-border text-action-ink'
                              : 'bg-surface border-hairline text-ink-muted'
                          }`}>
                            {inst.tier}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11.5px] text-ink-muted">
                          <span className="font-semibold text-ink">NIRF: #{inst.nirfRank}</span>
                          <span>•</span>
                          <span>Candidates: <strong className="text-ink">{inst.appearedCount}</strong></span>
                          <span>•</span>
                          <span className="text-pass font-bold">Passed: {inst.passedCount} ({inst.passPercentage}%)</span>
                          <span>•</span>
                          <span className="text-fail font-bold">Failed: {inst.failedCount} ({inst.failPercentage}%)</span>
                          <span>•</span>
                          <span>Batch Mean: <strong className="text-ink">{inst.batchAverageMarks}/{courseBenchmark.maxMarks}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:min-w-[280px]">
                      <div className="w-full">
                        <div className="flex items-center justify-between text-[12px] font-semibold mb-1.5">
                          <span className="text-ink-muted font-bold">
                            {metricsConfig.find(m => m.id === selectedMetric)?.label}
                          </span>
                          <span className="text-[14px] font-black text-ink">
                            {metricVal}%
                          </span>
                        </div>
                        <Bar
                          percent={metricVal}
                          color={isHost ? 'var(--action)' : metricVal >= 80 ? 'var(--pass)' : metricVal >= 65 ? 'var(--warn)' : 'var(--fail)'}
                          height={9}
                          delay={idx * 50}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULL QUANTITATIVE AUDIT LEDGER TABLE */}
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm">
        <div className="border-b border-hairline px-6 py-4.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-[17px]">Institutional Results Audit Ledger — Multi-Parameter Comparative Matrix</CardTitle>
              <p className="text-[12.5px] font-medium text-ink-muted mt-0.5">
                Side-by-side quantitative performance across Pass/Fail %, Batch Mean, Median, Standard Deviation, and Appeal Rates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-bold text-ink-muted uppercase tracking-wider">Head-to-Head Peer:</span>
              <select
                aria-label="Select peer university for head-to-head comparison"
                value={pinnedCompareUnivId}
                onChange={(e) => setPinnedCompareUnivId(e.target.value)}
                className="field text-[12.5px] font-semibold py-1.5 px-3 rounded-xl"
              >
                {institutions.filter(i => !i.isHost).map((inst) => (
                  <option key={inst.univId} value={inst.univId}>
                    {inst.shortName} ({inst.tier})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px] border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface-raised text-[11px] font-bold tracking-wider text-ink-muted uppercase">
                <th className="py-3.5 px-5">UNIVERSITY &amp; TIER</th>
                <th className="py-3.5 px-3 text-right">BATCH SIZE</th>
                <th className="py-3.5 px-3 text-right">PASS %</th>
                <th className="py-3.5 px-3 text-right">FAIL %</th>
                <th className="py-3.5 px-3 text-right">BATCH MEAN</th>
                <th className="py-3.5 px-3 text-right">MEDIAN</th>
                <th className="py-3.5 px-3 text-right">STD DEV (σ)</th>
                <th className="py-3.5 px-3 text-right">DISTINCTION (&gt;75%)</th>
                <th className="py-3.5 px-3 text-right">OBE ATTAINMENT</th>
                <th className="py-3.5 px-3 text-right">BLOOM L4-L5</th>
                <th className="py-3.5 px-3 text-right">APPEAL RATE</th>
                <th className="py-3.5 px-5 text-center">AUDIT STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredInstitutions.map((inst) => {
                const isHost = inst.isHost;
                const isSelectedPeer = inst.univId === pinnedCompareUnivId;
                return (
                  <tr
                    key={inst.univId}
                    className={`transition-colors ${
                      isHost
                        ? 'bg-action-tint/35 font-semibold'
                        : isSelectedPeer
                        ? 'bg-warn-tint/25 font-medium'
                        : 'hover:bg-surface-raised/60'
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        {isHost ? (
                          <Building className="h-4 w-4 text-action-ink shrink-0" />
                        ) : (
                          <Landmark className="h-4 w-4 text-ink-muted shrink-0" />
                        )}
                        <div>
                          <div className={`text-[13px] ${isHost ? 'text-action-ink font-bold' : 'text-ink font-semibold'}`}>
                            {inst.shortName}
                          </div>
                          <div className="text-[11px] text-ink-muted">
                            {inst.region} · NIRF #{inst.nirfRank}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium">{inst.appearedCount}</td>
                    <td className="py-3.5 px-3 text-right text-pass font-bold text-[13px]">{inst.passPercentage}%</td>
                    <td className="py-3.5 px-3 text-right text-fail font-bold text-[13px]">{inst.failPercentage}%</td>
                    <td className="py-3.5 px-3 text-right font-bold text-ink text-[13px]">
                      {inst.batchAverageMarks}/{courseBenchmark.maxMarks}
                      <span className="ml-1 text-[11px] font-normal text-ink-muted">({inst.batchAveragePercentage}%)</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium">{inst.medianMarks}</td>
                    <td className="py-3.5 px-3 text-right text-ink-muted font-medium">±{inst.standardDeviation}</td>
                    <td className="py-3.5 px-3 text-right text-action-ink font-bold">{inst.distinctionRate}%</td>
                    <td className="py-3.5 px-3 text-right font-bold text-pass text-[13px]">{inst.obeTargetAttainment}%</td>
                    <td className="py-3.5 px-3 text-right text-ink font-semibold">{inst.bloomRigourIndex}%</td>
                    <td className="py-3.5 px-3 text-right text-ink-muted">{inst.appealRate || inst.challengeAppealRate}%</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                        isHost
                          ? 'bg-action text-white shadow-sm'
                          : inst.scope === 'national'
                          ? 'bg-pass-tint text-pass border border-pass-border'
                          : 'bg-surface-raised text-ink-muted border border-hairline'
                      }`}>
                        {inst.auditStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Head-to-Head Comparative Analytical Breakdown (Host vs Selected Peer) */}
      {pinnedPeer && (
        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-action-tint text-action-ink">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-[17px]">Dean's Head-to-Head Paired Audit: {hostStats.shortName} vs {pinnedPeer.shortName}</CardTitle>
                <p className="mt-0.5 text-[12.5px] font-medium text-ink-muted">
                  Direct paired benchmarking across pass ratios, batch score distributions, and proof mastery
                </p>
              </div>
            </div>
            <StatusPill tone="neutral">National Peer Audit</StatusPill>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Metric 1: Overall Pass vs Fail Performance */}
            <div className="rounded-xl border border-hairline bg-surface-raised/60 p-4.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-muted">PASS / FAIL RATIOS &amp; RETENTION</div>
              <div className="mt-3.5 space-y-2.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">{hostStats.shortName}:</span>
                  <span className="font-bold text-pass">{hostStats.passPercentage}% Pass (Fail: {hostStats.failPercentage}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">{pinnedPeer.shortName}:</span>
                  <span className="font-bold text-ink">{pinnedPeer.passPercentage}% Pass (Fail: {pinnedPeer.failPercentage}%)</span>
                </div>
                <div className="mt-3 border-t border-hairline pt-2.5 text-[12px] flex items-center justify-between">
                  <span className="text-ink-muted font-semibold">Net Pass Delta: </span>
                  <strong className={`text-[13px] ${hostStats.passPercentage >= pinnedPeer.passPercentage ? 'text-pass font-bold' : 'text-warn font-bold'}`}>
                    {(hostStats.passPercentage - pinnedPeer.passPercentage) >= 0 ? '+' : ''}
                    {(hostStats.passPercentage - pinnedPeer.passPercentage).toFixed(1)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Metric 2: Batch Mean & Mark Spread */}
            <div className="rounded-xl border border-hairline bg-surface-raised/60 p-4.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-muted">BATCH SCORE &amp; GAUSSIAN SPREAD</div>
              <div className="mt-3.5 space-y-2.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">Host Batch Mean:</span>
                  <span className="font-bold text-action-ink">{hostStats.batchAveragePercentage}% (σ={hostStats.standardDeviation})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">Peer Batch Mean:</span>
                  <span className="font-bold text-ink">{pinnedPeer.batchAveragePercentage}% (σ={pinnedPeer.standardDeviation})</span>
                </div>
                <div className="mt-3 border-t border-hairline pt-2.5 text-[12px] flex items-center justify-between">
                  <span className="text-ink-muted font-semibold">Score Variance: </span>
                  <span className="font-bold text-ink text-[13px]">
                    {(hostStats.batchAveragePercentage - pinnedPeer.batchAveragePercentage) >= 0 ? '+' : ''}
                    {(hostStats.batchAveragePercentage - pinnedPeer.batchAveragePercentage).toFixed(1)}% vs National Peer
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Academic Rigor & Bloom Taxonomy */}
            <div className="rounded-xl border border-hairline bg-surface-raised/60 p-4.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-muted">OBE OUTCOME &amp; BLOOM RIGOR</div>
              <div className="mt-3.5 space-y-2.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">OBE CO Attainment:</span>
                  <span className="font-bold text-pass">{hostStats.obeTargetAttainment}% vs {pinnedPeer.obeTargetAttainment}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted font-medium">Bloom L4/L5 Rigor:</span>
                  <span className="font-bold text-ink">{hostStats.bloomRigourIndex}% vs {pinnedPeer.bloomRigourIndex}%</span>
                </div>
                <div className="mt-3 border-t border-hairline pt-2.5 text-[12px] flex items-center justify-between">
                  <span className="text-ink-muted font-semibold">Proof Mastery: </span>
                  <span className="font-bold text-pass text-[13px]">{hostStats.derivationAccuracyIndex}% Host Index</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
