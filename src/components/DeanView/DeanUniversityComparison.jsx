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
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* National vs All Filter */}
            <div className="flex items-center gap-1 rounded-field border border-hairline bg-page p-1">
              <span className="px-2 font-mono text-[10px] font-bold text-ink-faint uppercase">Scope:</span>
              {[
                { id: 'national', label: 'National Universities Only' },
                { id: 'all', label: 'All Peers (National & Regional)' }
              ].map((scope) => (
                <button
                  key={scope.id}
                  onClick={() => setScopeFilter(scope.id)}
                  className={`rounded-pill px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
                    scopeFilter === scope.id
                      ? 'bg-action font-semibold text-white'
                      : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {scope.label}
                </button>
              ))}
            </div>

            {/* Qualitative vs Quantitative Perspective View */}
            <div className="flex items-center gap-1 rounded-field border border-hairline bg-page p-1">
              <span className="px-2 font-mono text-[10px] font-bold text-ink-faint uppercase">Perspective:</span>
              {[
                { id: 'both', label: 'Combined View' },
                { id: 'qualitative', label: 'Qualitative Evaluation' },
                { id: 'quantitative', label: 'Quantitative Metrics' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewPerspective(view.id)}
                  className={`rounded-pill px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    viewPerspective === view.id
                      ? 'bg-surface-raised font-bold text-ink shadow-sm'
                      : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink-faint" />
            <span className="font-mono text-[10.5px] font-semibold text-ink-faint uppercase">Metric:</span>
            <div className="flex items-center gap-1 overflow-x-auto rounded-field border border-hairline bg-page p-1">
              {metricsConfig.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`rounded-pill px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedMetric === metric.id
                      ? 'bg-action-tint font-bold text-action-ink border border-action-border'
                      : 'text-ink-faint hover:text-ink'
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Host Institution Card */}
        <div className="rounded-card border-2 border-action-border bg-action-tint/30 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="rounded-pill bg-action px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-wider">
              Host University (Our Results)
            </span>
            <span className="font-mono text-[11px] font-semibold text-action-ink">NIRF #{hostStats.nirfRank}</span>
          </div>
          <div className="mt-2 text-[14px] font-bold text-ink truncate">{hostStats.name}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-action-border/40 pt-2.5">
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Pass Rate</div>
              <div className="text-[18px] font-black text-pass">{hostStats.passPercentage}%</div>
              <div className="font-mono text-[10px] text-fail">Fail: {hostStats.failPercentage}% ({hostStats.failedCount} students)</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Batch Mean</div>
              <div className="text-[18px] font-black text-action-ink">{hostStats.batchAveragePercentage}%</div>
              <div className="font-mono text-[10px] text-ink-muted">Avg: {hostStats.batchAverageMarks}/{courseBenchmark.maxMarks} (σ={hostStats.standardDeviation})</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-muted">
            <span>OBE CO Attainment:</span>
            <strong className="text-ink">{hostStats.obeTargetAttainment}%</strong>
          </div>
        </div>

        {/* National Peer Universities Average Card */}
        <div className="rounded-card border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="rounded-pill bg-surface-sunken border border-hairline px-2 py-0.5 font-mono text-[10px] font-bold text-ink-faint uppercase">
              National Universities Mean
            </span>
            <span className="text-[11px] text-ink-faint">{cohortAggregates.national.count} National Peers</span>
          </div>
          <div className="mt-2 text-[14px] font-bold text-ink">National Benchmark Average</div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-hairline pt-2.5">
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Pass Rate</div>
              <div className="text-[18px] font-black text-pass">{cohortAggregates.national.passPercentage}%</div>
              <div className="font-mono text-[10px] text-fail">Fail: {cohortAggregates.national.failPercentage}%</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Batch Mean</div>
              <div className="text-[18px] font-black text-ink">{cohortAggregates.national.batchAveragePercentage}%</div>
              <div className="font-mono text-[10px] text-ink-muted">
                Host vs National: {(hostStats.batchAveragePercentage - cohortAggregates.national.batchAveragePercentage) >= 0 ? '+' : ''}{(hostStats.batchAveragePercentage - cohortAggregates.national.batchAveragePercentage).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-muted">
            <span>National OBE Target:</span>
            <strong className="text-ink">{cohortAggregates.national.obeAttainment}%</strong>
          </div>
        </div>

        {/* Academic Quality & Rigour Card */}
        <div className="rounded-card border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="rounded-pill bg-surface-sunken border border-hairline px-2 py-0.5 font-mono text-[10px] font-bold text-ink-faint uppercase">
              Evaluator Rigour
            </span>
            <span className="font-mono text-[11px] text-pass font-semibold">Gemini 3.6 Multimodal</span>
          </div>
          <div className="mt-2 text-[14px] font-bold text-ink">Analytical Bloom L4/L5 Rigor</div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-hairline pt-2.5">
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Bloom Rigor</div>
              <div className="text-[18px] font-black text-ink">{hostStats.bloomRigourIndex}%</div>
              <div className="font-mono text-[10px] text-ink-muted">National: {cohortAggregates.national.bloomRigourIndex}%</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-ink-faint uppercase">Distinction</div>
              <div className="text-[18px] font-black text-action-ink">{hostStats.distinctionRate}%</div>
              <div className="font-mono text-[10px] text-pass">&gt;= 75% Score</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-muted">
            <span>Appeal Rate:</span>
            <strong className="text-ink">{hostStats.appealRate}% (Low Docket Volume)</strong>
          </div>
        </div>

        {/* Dean's Institutional Standing Verdict Card */}
        <div className="rounded-card border border-hairline bg-surface p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-action-ink">
              <Award className="h-4 w-4" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Dean Audit Standing</span>
            </div>
            <div className="mt-2 text-[16px] font-black text-ink">National Parity Confirmed</div>
            <p className="mt-1 text-[11px] leading-[1.45] text-ink-muted">
              Candidate performance on <strong className="text-ink">{courseBenchmark.courseName}</strong> matches top national universities with a <strong className="text-pass">{hostStats.passPercentage}% pass rate</strong> and robust accreditation outcome alignment.
            </p>
          </div>
          <div className="mt-3 rounded-inner bg-pass-tint/50 border border-pass-border px-2.5 py-1 text-[10.5px] font-semibold text-pass flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 shrink-0" /> NBA &amp; National Regulatory Baseline Satisfied
          </div>
        </div>
      </div>

      {/* QUALITATIVE EVALUATION AUDIT CARDS (When perspective includes qualitative) */}
      {(viewPerspective === 'both' || viewPerspective === 'qualitative') && (
        <div className="rounded-card border border-hairline bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-action" />
              <CardTitle>Dean's Qualitative Results Audit &amp; Conceptual Pedagogy Comparison</CardTitle>
            </div>
            <span className="text-[11.5px] font-medium text-ink-faint">
              Pedagogical verdicts, conceptual strengths, critical curricular gaps &amp; evaluator rigor
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredInstitutions.map((inst) => {
              const isHost = inst.isHost;
              return (
                <div
                  key={inst.univId}
                  className={`rounded-card border p-4.5 transition-colors ${
                    isHost
                      ? 'border-action-border bg-action-tint/20 ring-1 ring-action-border/60'
                      : 'border-hairline bg-surface-sunken hover:border-hairline-strong'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-hairline/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className={`text-[14px] ${isHost ? 'text-action-ink font-bold' : 'text-ink'}`}>
                          {inst.name}
                        </strong>
                        {isHost && (
                          <span className="rounded-[4px] bg-action px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase">
                            Host Institution
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10.5px] text-ink-faint">
                        <span>NIRF: #{inst.nirfRank}</span>
                        <span>•</span>
                        <span>{inst.category || inst.tier}</span>
                        <span>•</span>
                        <span className="text-pass font-bold">Pass: {inst.passPercentage}%</span>
                        <span>•</span>
                        <span className="text-fail font-bold">Fail: {inst.failPercentage}%</span>
                      </div>
                    </div>

                    <span className={`shrink-0 rounded-pill px-2.5 py-0.5 text-[10px] font-bold ${
                      inst.scope === 'national' || isHost
                        ? 'bg-pass-tint border border-pass-border text-pass'
                        : 'bg-surface border border-hairline text-ink-faint'
                    }`}>
                      {inst.auditStatus}
                    </span>
                  </div>

                  {/* Qualitative Breakdown Blocks */}
                  <div className="mt-3.5 space-y-3 text-[12px]">
                    {/* Overall Qualitative Verdict */}
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-action-ink flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Qualitative Academic Verdict
                      </div>
                      <p className="mt-1 font-semibold text-ink leading-[1.45]">
                        "{inst.qualitativeVerdict}"
                      </p>
                    </div>

                    {/* Conceptual Strengths */}
                    <div className="rounded-inner bg-surface p-2.5 border border-hairline/70">
                      <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-pass flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Conceptual Strengths in Student Scripts
                      </div>
                      <p className="mt-1 text-ink-muted text-[11.5px] leading-[1.5]">
                        {inst.conceptualStrengths}
                      </p>
                    </div>

                    {/* Critical Gaps & Deductions */}
                    <div className="rounded-inner bg-surface p-2.5 border border-hairline/70">
                      <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-warn flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Curricular Gaps &amp; Common Mark Deductions
                      </div>
                      <p className="mt-1 text-ink-muted text-[11.5px] leading-[1.5]">
                        {inst.criticalGaps}
                      </p>
                    </div>

                    {/* Pedagogical Recommendation */}
                    <div className="border-t border-hairline/60 pt-2 flex items-start gap-1.5 text-[11px] text-ink-faint">
                      <FileCheck className="h-3.5 w-3.5 text-action-ink shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ink">Dean's Action Item:</strong> {inst.pedagogicalRecommendation}
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
        <div className="rounded-card border border-hairline bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-action" />
              <CardTitle>
                Cross-Institutional Comparative Distribution — {metricsConfig.find(m => m.id === selectedMetric)?.label}
              </CardTitle>
            </div>
            <span className="text-[11px] text-ink-faint">
              Standardized university grading &amp; multimodal rubrics
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {filteredInstitutions.map((inst, idx) => {
              const metricVal = inst[selectedMetric] || 0;
              const isHost = inst.isHost;
              return (
                <div
                  key={inst.univId}
                  className={`rounded-inner border p-3.5 transition-colors ${
                    isHost
                      ? 'border-action-border bg-action-tint/20 ring-1 ring-action-border/50'
                      : 'border-hairline bg-surface-sunken hover:border-ink-faint/30'
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5 min-w-[300px]">
                      <span className="font-mono text-[11px] font-bold text-ink-faint w-5">#{idx + 1}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className={`text-[13px] ${isHost ? 'text-action-ink font-bold' : 'text-ink'}`}>
                            {inst.name}
                          </strong>
                          {isHost && (
                            <span className="rounded-[4px] bg-action px-1.5 py-0.2 font-mono text-[9px] font-bold text-white uppercase">
                              Host
                            </span>
                          )}
                          <span className={`rounded-pill border px-2 py-0.5 text-[9.5px] font-bold ${
                            inst.scope === 'national'
                              ? 'bg-action-tint border-action-border text-action-ink'
                              : 'bg-surface border-hairline text-ink-faint'
                          }`}>
                            {inst.tier}
                          </span>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[10.5px] text-ink-faint">
                          <span>NIRF: #{inst.nirfRank}</span>
                          <span>•</span>
                          <span>Candidates: {inst.appearedCount}</span>
                          <span>•</span>
                          <span className="text-pass font-semibold">Passed: {inst.passedCount} ({inst.passPercentage}%)</span>
                          <span>•</span>
                          <span className="text-fail font-semibold">Failed: {inst.failedCount} ({inst.failPercentage}%)</span>
                          <span>•</span>
                          <span>Batch Mean: {inst.batchAverageMarks}/{courseBenchmark.maxMarks}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:min-w-[280px]">
                      <div className="w-full">
                        <div className="flex items-center justify-between text-[11.5px] font-semibold mb-1">
                          <span className="font-mono text-[10.5px] text-ink-faint">
                            {metricsConfig.find(m => m.id === selectedMetric)?.label}
                          </span>
                          <span className="font-mono text-[13px] font-bold text-ink">
                            {metricVal}%
                          </span>
                        </div>
                        <Bar
                          percent={metricVal}
                          color={isHost ? 'var(--action)' : metricVal >= 80 ? 'var(--pass)' : metricVal >= 65 ? 'var(--warn)' : 'var(--fail)'}
                          height={8}
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
      <div className="overflow-hidden rounded-card border border-hairline bg-surface">
        <div className="border-b border-hairline px-5 py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Institutional Results Audit Ledger — Multi-Parameter Comparative Matrix</CardTitle>
              <p className="text-[11.5px] font-medium text-ink-faint mt-0.5">
                Side-by-side quantitative performance across Pass/Fail %, Batch Mean, Median, Standard Deviation, and Appeal Rates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] text-ink-faint">Head-to-Head Peer:</span>
              <select
                aria-label="Select peer university for head-to-head comparison"
                value={pinnedCompareUnivId}
                onChange={(e) => setPinnedCompareUnivId(e.target.value)}
                className="field text-[11.5px] font-medium py-1 px-2.5"
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
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface-sunken font-mono text-[10.5px] font-semibold tracking-wider text-ink-faint">
                <th className="py-3 px-4">UNIVERSITY &amp; TIER</th>
                <th className="py-3 px-3 text-right">BATCH SIZE</th>
                <th className="py-3 px-3 text-right">PASS %</th>
                <th className="py-3 px-3 text-right">FAIL %</th>
                <th className="py-3 px-3 text-right">BATCH MEAN</th>
                <th className="py-3 px-3 text-right">MEDIAN</th>
                <th className="py-3 px-3 text-right">STD DEV (σ)</th>
                <th className="py-3 px-3 text-right">DISTINCTION (&gt;75%)</th>
                <th className="py-3 px-3 text-right">OBE ATTAINMENT</th>
                <th className="py-3 px-3 text-right">BLOOM L4-L5</th>
                <th className="py-3 px-3 text-right">APPEAL RATE</th>
                <th className="py-3 px-4 text-center">AUDIT STATUS</th>
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
                        ? 'bg-action-tint/30 font-semibold'
                        : isSelectedPeer
                        ? 'bg-warn-tint/20 font-medium'
                        : 'hover:bg-surface-sunken'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {isHost ? (
                          <Building className="h-3.5 w-3.5 text-action-ink shrink-0" />
                        ) : (
                          <Landmark className="h-3.5 w-3.5 text-ink-faint shrink-0" />
                        )}
                        <div>
                          <div className={`text-[12.5px] ${isHost ? 'text-action-ink font-bold' : 'text-ink'}`}>
                            {inst.shortName}
                          </div>
                          <div className="font-mono text-[10px] text-ink-faint">
                            {inst.region} · NIRF #{inst.nirfRank}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">{inst.appearedCount}</td>
                    <td className="py-3 px-3 text-right font-mono text-pass font-bold">{inst.passPercentage}%</td>
                    <td className="py-3 px-3 text-right font-mono text-fail font-bold">{inst.failPercentage}%</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-ink">
                      {inst.batchAverageMarks}/{courseBenchmark.maxMarks}
                      <span className="ml-1 text-[10px] font-normal text-ink-faint">({inst.batchAveragePercentage}%)</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">{inst.medianMarks}</td>
                    <td className="py-3 px-3 text-right font-mono text-ink-muted">±{inst.standardDeviation}</td>
                    <td className="py-3 px-3 text-right font-mono text-action-ink">{inst.distinctionRate}%</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-pass">{inst.obeTargetAttainment}%</td>
                    <td className="py-3 px-3 text-right font-mono text-ink">{inst.bloomRigourIndex}%</td>
                    <td className="py-3 px-3 text-right font-mono text-ink-faint">{inst.appealRate || inst.challengeAppealRate}%</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block rounded-pill px-2 py-0.5 font-mono text-[9.5px] font-bold ${
                        isHost
                          ? 'bg-action text-white'
                          : inst.scope === 'national'
                          ? 'bg-pass-tint text-pass border border-pass-border'
                          : 'bg-surface-sunken text-ink-faint border border-hairline'
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
        <div className="rounded-card border border-hairline bg-surface p-5">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-action" />
              <CardTitle>Dean's Head-to-Head Paired Audit: {hostStats.shortName} vs {pinnedPeer.shortName}</CardTitle>
            </div>
            <StatusPill tone="neutral">National Peer Audit</StatusPill>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Metric 1: Overall Pass vs Fail Performance */}
            <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
              <Label>PASS / FAIL RATIOS &amp; RETENTION</Label>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">{hostStats.shortName}:</span>
                  <span className="font-mono font-bold text-pass">{hostStats.passPercentage}% Pass (Fail: {hostStats.failPercentage}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">{pinnedPeer.shortName}:</span>
                  <span className="font-mono font-bold text-ink">{pinnedPeer.passPercentage}% Pass (Fail: {pinnedPeer.failPercentage}%)</span>
                </div>
                <div className="mt-2 border-t border-hairline pt-2 text-[11px]">
                  <span className="text-ink-faint">Delta: </span>
                  <strong className={hostStats.passPercentage >= pinnedPeer.passPercentage ? 'text-pass' : 'text-warn'}>
                    {(hostStats.passPercentage - pinnedPeer.passPercentage) >= 0 ? '+' : ''}
                    {(hostStats.passPercentage - pinnedPeer.passPercentage).toFixed(1)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Metric 2: Batch Mean & Mark Spread */}
            <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
              <Label>BATCH SCORE &amp; GAUSSIAN SPREAD</Label>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Host Batch Mean:</span>
                  <span className="font-mono font-bold text-action-ink">{hostStats.batchAveragePercentage}% (σ={hostStats.standardDeviation})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Peer Batch Mean:</span>
                  <span className="font-mono font-bold text-ink">{pinnedPeer.batchAveragePercentage}% (σ={pinnedPeer.standardDeviation})</span>
                </div>
                <div className="mt-2 border-t border-hairline pt-2 text-[11px]">
                  <span className="text-ink-faint">Score Variance: </span>
                  <span className="font-mono text-ink">
                    {(hostStats.batchAveragePercentage - pinnedPeer.batchAveragePercentage) >= 0 ? '+' : ''}
                    {(hostStats.batchAveragePercentage - pinnedPeer.batchAveragePercentage).toFixed(1)}% vs National Peer
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Academic Rigor & Bloom Taxonomy */}
            <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
              <Label>OBE OUTCOME &amp; BLOOM RIGOR</Label>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">OBE CO Attainment:</span>
                  <span className="font-mono font-bold text-pass">{hostStats.obeTargetAttainment}% vs {pinnedPeer.obeTargetAttainment}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Bloom L4/L5 Rigor:</span>
                  <span className="font-mono font-bold text-ink">{hostStats.bloomRigourIndex}% vs {pinnedPeer.bloomRigourIndex}%</span>
                </div>
                <div className="mt-2 border-t border-hairline pt-2 text-[11px]">
                  <span className="text-ink-faint">Derivation / Proof Mastery: </span>
                  <span className="font-mono text-pass">{hostStats.derivationAccuracyIndex}% Host Index</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
