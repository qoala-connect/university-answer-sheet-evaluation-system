import React, { useMemo, useState } from 'react';
import { 
  TrendingUp, Award, AlertTriangle, CheckCircle2, Search, X, FileText 
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { classStats, topicMastery } from '../../utils/analytics';
import { gradePill, gradeBar, pct } from '../../utils/grade';
import { Toolbar, StatCard, ScoreBand, CardTitle, Label, Bar, Avatar, Note, EmptyState } from '../Common/Primitives';

export default function FacultyDashboard({ 
  students = [], 
  schema, 
  activeCourse, 
  onGoToUpload, 
  onViewStudentScript 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const stats = classStats(students, schema);
  const mastery = topicMastery(students, schema);

  const weakestTopic = mastery.reduce(
    (worst, topic) => (worst === null || topic.avgPercent < worst.avgPercent ? topic : worst),
    null
  );

  // Sorted by rank: 1, 2, 3, 4
  const ranked = useMemo(
    () => [...students].sort((a, b) => (a.classRank || 0) - (b.classRank || 0)),
    [students]
  );

  const visible = ranked.filter(
    (s) =>
      (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.rollNo || s.usn || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const radarData = (stu) => {
    if (!stu) return [];
    if (stu.coAttainment) {
      return Object.entries(stu.coAttainment).map(([co, val]) => ({
        topic: co,
        score: val
      }));
    }
    return (stu?.answers || []).map((ans) => ({ 
      topic: ans.qNo, 
      score: pct(ans.awardedMarks, ans.maxMarks) 
    }));
  };

  if (!students.length) {
    return (
      <>
        <Toolbar title="Class performance" context={activeCourse?.name} />
        <div className="p-6">
          <EmptyState
            icon={FileText}
            title={`Nothing graded for ${activeCourse?.name || 'this subject'} yet`}
            body="Set a marking schema first, then upload the class's sheets. Grading a full class takes a few minutes."
          >
            {onGoToUpload && (
              <button onClick={onGoToUpload} className="btn btn-primary btn-sm cursor-pointer">
                Ingest sheets
              </button>
            )}
          </EmptyState>
        </div>
      </>
    );
  }

  return (
    <>
      <Toolbar
        title="Class performance"
        context={`${activeCourse?.name} · ${stats.count} script${stats.count === 1 ? '' : 's'} · ${stats.maxMarks} marks`}
      />

      <div className="space-y-3 p-6">
        
        {/* Four Stat Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            index={0}
            icon={TrendingUp}
            label="CLASS AVERAGE"
            value={stats.average}
            denominator={stats.maxMarks}
            percent={stats.averagePercent}
            barColor={gradeBar(stats.averagePercent)}
            caption={`${stats.averagePercent}% proficiency`}
          />
          <StatCard
            index={1}
            icon={Award}
            iconClass="text-pass"
            label="HIGHEST"
            value={stats.highest}
            denominator={stats.maxMarks}
            percent={pct(stats.highest, stats.maxMarks)}
            barColor="bg-pass-fill"
            caption={stats.topper ? `${stats.topper.name} - ${stats.topper.grade?.split(' ')[0] || 'A+'}` : '—'}
          />
          <StatCard
            index={2}
            icon={AlertTriangle}
            iconClass="text-warn"
            label="LOWEST"
            value={stats.lowest}
            denominator={stats.maxMarks}
            percent={pct(stats.lowest, stats.maxMarks)}
            barColor="bg-warn-fill"
            caption={`${stats.passRate}% of the class passing`}
          />
          <StatCard
            index={3}
            icon={CheckCircle2}
            label="SCRIPTS EVALUATED"
            value={stats.count}
            denominator={stats.count}
            percent={100}
            barColor="bg-action-bar"
            caption={activeCourse?.name || 'Current paper'}
          />
        </div>

        {/* Score Band + Topic Mastery: 1.35fr / 1fr */}
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">

          {/* Where the class landed */}
          <div className="rounded-card border border-hairline bg-surface px-5 pb-[22px] pt-[18px]">
            <div className="mb-[26px] flex items-baseline justify-between">
              <CardTitle>Where the class landed</CardTitle>
              <span className="text-[11.5px] font-medium text-ink-faint">
                {stats.count} script{stats.count === 1 ? '' : 's'} · {stats.maxMarks} marks
              </span>
            </div>

            <ScoreBand students={ranked} maxMarks={stats.maxMarks} average={stats.average} />

            {weakestTopic && (
              <div className="mt-5">
                <Note tone="warn">
                  <span className="font-bold">Watch {weakestTopic.qNo}.</span>{' '}
                  Lowest in the class at {weakestTopic.avgPercent}%. That is one reteach,
                  not {stats.count} separate corrections.
                </Note>
              </div>
            )}
          </div>

          {/* Topic mastery */}
          <div className="rounded-card border border-hairline bg-surface px-5 pb-5 pt-[18px]">
            <div className="mb-4 flex items-baseline justify-between">
              <CardTitle>Topic mastery</CardTitle>
              <span className="text-[11.5px] font-medium text-ink-faint">class %</span>
            </div>

            {mastery.map((topic, index) => (
              <div key={topic.qNo} className="grid grid-cols-[30px_minmax(0,1fr)_44px] items-center gap-2.5 py-[7px]">
                <span className="font-mono text-[11px] font-semibold text-ink-faint">{topic.qNo}</span>
                <div>
                  <div className="mb-1.5 truncate text-body-sm font-medium text-ink-muted" title={topic.topic}>
                    {topic.topic.replace(/^Q\d+:\s*/, '')}
                  </div>
                  <Bar percent={topic.avgPercent} color={gradeBar(topic.avgPercent)} delay={index * 60 + 200} />
                </div>
                <span className="tabular text-right font-mono text-[12.5px] font-semibold text-ink">
                  {topic.avgPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Roster */}
        <div className="overflow-hidden rounded-card border border-hairline bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
            <CardTitle>Student roster</CardTitle>
            <div className="flex w-full items-center gap-2.5 rounded-field border border-hairline bg-page px-3 py-2 sm:w-[268px]">
              <Search className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={2.2} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name or roll number"
                className="w-full bg-transparent text-[12px] font-medium text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[52px_minmax(0,1fr)_108px_96px_84px_148px_112px] bg-surface-sunken px-5 py-2.5 font-mono text-[10.5px] font-semibold tracking-[.06em] text-ink-faint">
                <div>RANK</div>
                <div>STUDENT</div>
                <div>ROLL NO</div>
                <div className="text-right">MARKS</div>
                <div className="text-right">PERCENT</div>
                <div className="pl-5">DISTRIBUTION</div>
                <div className="text-right">GRADE</div>
              </div>

              {visible.map((stu, index) => (
                <div
                  key={stu.id}
                  className="animate-rise grid grid-cols-[52px_minmax(0,1fr)_108px_96px_84px_148px_112px] items-center border-t border-track px-5 py-3.5 transition-colors hover:bg-surface-sunken"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="tabular font-mono text-[12.5px] font-semibold text-ink-faint">
                    #{stu.classRank}
                  </div>

                  <div className="flex items-center gap-[11px]">
                    <Avatar name={stu.name} />
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[13.5px] font-semibold text-ink">{stu.name}</span>
                        {stu.classRank === 1 && (
                          <span className="flex shrink-0 items-center gap-1 rounded-[5px] border border-pass-border bg-pass-tint px-[7px] py-0.5 font-mono text-[9.5px] font-bold tracking-[.04em] text-pass">
                            <Award className="h-[9px] w-[9px]" strokeWidth={3} />TOPPER
                          </span>
                        )}
                      </div>
                      <span className="truncate text-[11px] font-medium text-ink-faint">Evaluated {stu.evaluatedAt}</span>
                    </div>
                  </div>

                  <div className="font-mono text-[12.5px] font-medium text-ink-muted">
                    {stu.rollNo || stu.usn}
                  </div>

                  <div className="tabular text-right text-[17px] font-bold text-ink">
                    {stu.totalMarks}
                    <span className="text-[12px] font-medium text-ink-faint"> / {stu.maxMarks || stats.maxMarks}</span>
                  </div>

                  <div className="tabular text-right font-mono text-[13px] font-semibold text-ink-muted">
                    {stu.percentage}%
                  </div>

                  <div className="pl-5">
                    <Bar percent={stu.percentage} color={gradeBar(stu.percentage)} height={6} delay={index * 80 + 240} />
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <span className={`min-w-[36px] rounded-pill border px-2 py-1 text-center text-[12px] font-bold leading-[1.2] ${gradePill(stu.percentage)}`}>
                      {stu.grade?.split(' ')[0] || 'A'}
                    </span>
                    <button
                      onClick={() => onViewStudentScript ? onViewStudentScript(stu) : setSelectedStudent(stu)}
                      className="text-[12px] font-semibold text-action-ink hover:underline cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}

              {visible.length === 0 && (
                <div className="px-5 py-10 text-center text-body-sm font-medium text-ink-faint">
                  No student matches “{searchTerm}”.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <StudentInspector 
          student={selectedStudent} 
          radarData={radarData(selectedStudent)} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </>
  );
}

/** Per-student audit modal inspector */
function StudentInspector({ student, radarData, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: 'rgba(0, 0, 0, 0.65)' }}
      onClick={onClose}
    >
      <div
        className="animate-rise max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-card border border-hairline bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <Avatar name={student.name} size={44} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-ink">{student.name}</h3>
                <span className={`rounded-pill border px-2 py-0.5 text-[11px] font-bold ${gradePill(student.percentage)}`}>
                  {student.grade}
                </span>
                {student.classRank === 1 && (
                  <span className="rounded-badge border border-pass-border bg-pass-tint px-2 py-0.5 font-mono text-[10px] font-bold text-pass">
                    TOPPER
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-3 font-mono text-micro text-ink-faint">
                <span>Roll: {student.rollNo || student.usn}</span>
                <span>•</span>
                <span>Rank #{student.classRank}</span>
                <span>•</span>
                <span>Evaluated: {student.evaluatedAt}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-field border border-hairline text-ink-faint hover:bg-surface-sunken hover:text-ink cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Breakdown & Radar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
              <Label>SCORE SUMMARY</Label>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="tabular text-[36px] font-bold text-ink">{student.totalMarks}</span>
                <span className="text-[16px] text-ink-faint">/ {student.maxMarks}</span>
                <span className="ml-auto font-mono text-[18px] font-semibold text-action-ink">
                  {student.percentage}%
                </span>
              </div>
              <div className="mt-3">
                <Bar percent={student.percentage} color={gradeBar(student.percentage)} height={7} />
              </div>
            </div>

            {student.strongestTopics && student.strongestTopics.length > 0 && (
              <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
                <Label>KEY STRENGTHS</Label>
                <div className="mt-2 space-y-1.5">
                  {student.strongestTopics.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-body-sm text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-pass" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {student.weakestTopics && student.weakestTopics.length > 0 && (
              <div className="rounded-inner border border-hairline bg-surface-sunken p-4">
                <Label>AREAS FOR IMPROVEMENT</Label>
                <div className="mt-2 space-y-1.5">
                  {student.weakestTopics.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-body-sm text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-warn" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-inner border border-hairline bg-surface-sunken p-4 flex flex-col items-center justify-center">
            <Label className="self-start mb-2">QUESTION PROFICIENCY RADAR</Label>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--hairline-strong)" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="topic" stroke="var(--ink-faint)" tick={{ fontSize: 11, fill: 'var(--ink-faint)' }} />
                  <PolarRadiusAxis domain={[0, 100]} stroke="var(--hairline-strong)" tick={{ fontSize: 9, fill: 'var(--ink-faint)' }} />
                  <Radar
                    name="Score %"
                    dataKey="score"
                    stroke="var(--action)"
                    fill="var(--action)"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Question Scores */}
        <div className="mt-6 border-t border-hairline pt-5">
          <Label className="mb-3 block">STEP-LEVEL EVALUATION RECORD</Label>
          <div className="space-y-3">
            {student.answers?.map((ans) => (
              <div key={ans.qNo} className="rounded-inner border border-hairline bg-surface-sunken p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] font-bold text-ink">{ans.qNo}</span>
                    {ans.type && <span className="text-[11px] text-ink-faint">({ans.type})</span>}
                  </div>
                  <div className="tabular font-mono text-[13px] font-bold text-ink">
                    {ans.awardedMarks} <span className="text-ink-faint">/ {ans.maxMarks}</span>
                  </div>
                </div>
                {ans.studentInput && (
                  <p className="mt-2 text-body-sm font-medium text-ink-muted italic">
                    "{ans.studentInput}"
                  </p>
                )}
                {ans.aiFeedback && (
                  <p className="mt-1.5 text-body-sm text-ink-faint">
                    {ans.aiFeedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
