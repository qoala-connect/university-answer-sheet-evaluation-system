import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, MessageSquare, Download, XCircle, AlertTriangle, CheckCircle2, EyeOff
} from 'lucide-react';
import ChallengeEvaluationModal from './ChallengeEvaluationModal';
import { gradePill, pct } from '../../utils/grade';
import { CardTitle, Label, Bar } from '../Common/Primitives';

/**
 * Works out which of this student's answers physically sit on a given page.
 * Rich scripts (turbomachinery, linear algebra) carry a real `pages` array per
 * answer; simpler scripts don't, so their questions are split evenly instead.
 */
function questionsForPage(answers, pageIndex, totalPages) {
  const pageNo = pageIndex + 1;
  const hasPageMap = answers.some((a) => Array.isArray(a.pages) && a.pages.length);

  if (hasPageMap) {
    return answers.filter((a) => Array.isArray(a.pages) && a.pages.includes(pageNo));
  }

  return answers.filter((_, idx) => {
    const assignedPage = Math.min(totalPages - 1, Math.floor((idx / answers.length) * totalPages));
    return assignedPage === pageIndex;
  });
}

/** Every point the AI deducted on one answer, as a standalone overlay card. */
function mistakesForAnswer(ans) {
  const lost = Number(((ans.maxMarks || 0) - (ans.awardedMarks || 0)).toFixed(2));
  if (lost <= 0) return [];

  if (ans.mistakesInline?.length) {
    return ans.mistakesInline.map((m) => ({
      qNo: ans.qNo,
      quote: m.text,
      note: m.note,
      delta: m.penalty,
      awarded: ans.awardedMarks,
      max: ans.maxMarks,
    }));
  }

  return [{
    qNo: ans.qNo,
    quote: ans.studentInput,
    note: ans.aiFeedback,
    delta: -lost,
    awarded: ans.awardedMarks,
    max: ans.maxMarks,
  }];
}

export default function AnnotatedScriptInspector({ student, activeCourse, onSubmitIssue }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const [contestedQuestion, setContestedQuestion] = useState(null);
  const [expandedModel, setExpandedModel] = useState({});
  const [overlayOn, setOverlayOn] = useState(true);

  if (!student) {
    return (
      <div className="p-8 text-center text-body-sm font-medium text-ink-faint">
        No candidate script selected.
      </div>
    );
  }

  const pages = student.scriptPages?.length 
    ? student.scriptPages 
    : [student.scriptImage || '/answer_sheet_1.jpg'];

  const totalPages = pages.length;
  const answers = student.answers || [];
  const pageQuestions = questionsForPage(answers, currentPage, totalPages);
  const mistakeCards = pageQuestions.flatMap(mistakesForAnswer);
  const cleanQuestions = pageQuestions.filter((a) => (a.awardedMarks || 0) >= (a.maxMarks || 0));
  const withDeductions = answers.filter((a) => a.awardedMarks < a.maxMarks).length;

  return (
    <div className="space-y-3 pb-8">
      {/* Reference Score Band */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-hairline bg-surface px-6 py-[22px]">
        <div className="animate-rise">
          <Label>
            {(activeCourse?.name || 'COURSE').toUpperCase()} · {student.usn || student.rollNo || student.id}
          </Label>

          <div className="mt-3 flex flex-wrap items-end gap-[22px]">
            <div className="flex items-baseline gap-[7px]">
              <span className="tabular text-[48px] font-bold leading-none tracking-[-2px] text-ink">
                {student.totalMarks}
              </span>
              <span className="text-[19px] font-medium text-ink-faint">
                / {student.maxMarks || 75}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pb-[5px]">
              <span className={`rounded-chip border px-3 py-1.5 text-[13px] font-bold ${gradePill(student.percentage)}`}>
                Grade {student.grade?.split(' ')[0] || 'S'}
              </span>
              <span className="tabular rounded-chip bg-surface-raised px-3 py-1.5 text-[13px] font-semibold text-ink">
                {student.percentage}%
              </span>
              <span className="rounded-chip bg-surface-raised px-3 py-1.5 text-[13px] font-medium text-ink-muted">
                Rank #{student.cohortRank || student.classRank || 1}
              </span>
              <span className="rounded-chip bg-surface-raised px-3 py-1.5 text-[13px] font-medium text-ink-muted">
                CGPA {student.cgpa || 9.2}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-[11px]">
          <span className="text-meta font-medium text-ink-faint">
            Evaluated {student.evaluatedAt || 'Today'} · Gemini 3.6 Multimodal
          </span>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="btn btn-secondary cursor-pointer">
              <Download className="h-3.5 w-3.5" strokeWidth={2.2} /> Download report
            </button>
            <button
              onClick={() => setContestedQuestion(
                (student.answers || []).find((a) => a.awardedMarks < a.maxMarks) || student.answers?.[0]
              )}
              className="btn btn-primary cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" strokeWidth={2.2} /> Raise an objection
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Split View */}
      <div className="grid grid-cols-1 items-start gap-3 px-6 xl:grid-cols-[minmax(0,1fr)_560px]">
        
        {/* Left Column: Script Viewer Canvas (Sticky) */}
        <div className="overflow-hidden rounded-card border border-hairline bg-surface xl:sticky xl:top-[78px]">
          <div className="flex items-center justify-between border-b border-hairline px-[18px] py-[15px]">
            <CardTitle>Your answer booklet</CardTitle>
            <div className="flex items-center gap-2.5">
              <span className="tabular font-mono text-micro font-medium text-ink-faint">
                PAGE {currentPage + 1} / {totalPages}
              </span>
              <span className="flex gap-[5px]">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  aria-label="Previous page"
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-pill border border-hairline-strong text-ink-muted disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="h-3 w-3" strokeWidth={2.4} />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next page"
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-pill border border-hairline-strong text-ink-muted disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3" strokeWidth={2.4} />
                </button>
              </span>
            </div>
          </div>

          <div className="p-[18px]">
            <div className="relative h-[620px] overflow-hidden rounded-inner border border-hairline bg-surface-raised flex items-center justify-center">
              {pages[currentPage] ? (
                <img
                  src={pages[currentPage]}
                  alt={`Answer sheet page ${currentPage + 1}`}
                  className="block h-full w-full object-contain"
                />
              ) : (
                <div className="text-body-sm font-medium text-ink-faint">
                  No scan available for this page.
                </div>
              )}

              {/* AI mistake call-outs — always visible, one card per deduction */}
              {overlayOn && mistakeCards.map((m, idx) => {
                const severe = Math.abs(m.delta) >= 1;
                const palette = severe
                  ? { bg: 'rgba(32,10,12,.94)', border: 'rgba(248,113,113,.55)', accent: 'text-red-400', tint: 'border-red-500/30 bg-red-500/15 text-red-100' }
                  : { bg: 'rgba(30,22,4,.94)', border: 'rgba(251,191,36,.5)', accent: 'text-amber-400', tint: 'border-amber-500/30 bg-amber-500/15 text-amber-100' };
                const Icon = severe ? XCircle : AlertTriangle;

                return (
                  <div
                    key={`mistake-${m.qNo}-${idx}`}
                    className="animate-rise absolute z-20 rounded-field border p-3 shadow-2xl backdrop-blur-sm"
                    style={{
                      top: `${50 + idx * 172}px`,
                      left: '4%',
                      width: 'min(420px, 80%)',
                      background: palette.bg,
                      borderColor: palette.border,
                      animationDelay: `${idx * 90}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <Icon className={`h-4 w-4 shrink-0 ${palette.accent}`} strokeWidth={2.4} />
                        <span className="truncate text-[12.5px] font-bold text-white">
                          {m.qNo} <span className={`font-mono ${palette.accent}`}>({m.delta > 0 ? '+' : ''}{m.delta} mark)</span>
                        </span>
                      </div>
                      <span className="tabular shrink-0 font-mono text-[12.5px] font-bold text-white">
                        {m.awarded} / {m.max}
                      </span>
                    </div>

                    {m.quote && (
                      <p className="mt-1.5 line-clamp-2 text-[11px] italic leading-snug text-slate-300">
                        Student wrote: "{m.quote}"
                      </p>
                    )}

                    {m.note && (
                      <div className={`mt-2 line-clamp-3 rounded-[7px] border px-2.5 py-2 text-[11px] leading-snug ${palette.tint}`}>
                        <span className="font-bold">AI Note: </span>{m.note}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Full-credit questions — compact pins so the sheet stays readable */}
              {overlayOn && cleanQuestions.map((ans, idx) => (
                <div
                  key={`clean-${ans.qNo}`}
                  className="absolute z-20"
                  style={{ top: `${50 + idx * 38}px`, right: '12px' }}
                >
                  <button
                    onClick={() => setActiveAnnotation(activeAnnotation === ans.qNo ? null : ans.qNo)}
                    className="flex items-center gap-1.5 rounded-full bg-pass-fill px-2 py-1 text-[10px] font-mono font-bold text-white shadow-lg ring-2 ring-pass-border transition-transform hover:scale-110 cursor-pointer"
                  >
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.8} />
                    {ans.qNo}
                  </button>

                  {activeAnnotation === ans.qNo && (
                    <div className="animate-rise absolute right-0 top-8 z-30 w-60 rounded-field border border-hairline bg-surface p-2.5 text-[11.5px] shadow-2xl">
                      <div className="mb-1 font-bold text-ink">
                        {ans.qNo} · Full credit ({ans.awardedMarks} / {ans.maxMarks})
                      </div>
                      <p className="text-ink-muted">{ans.aiFeedback}</p>
                    </div>
                  )}
                </div>
              ))}

              {overlayOn && pageQuestions.length === 0 && (
                <span className="rounded-field border border-hairline bg-surface px-3 py-2 text-[11.5px] font-medium text-ink-faint">
                  No graded questions linked to this page.
                </span>
              )}

              <span
                className="absolute left-3 top-3 z-30 rounded-pill px-2.5 py-[5px] font-mono text-[10.5px] font-semibold text-white"
                style={{ background: 'rgba(15,23,42,.82)' }}
              >
                PAGE {currentPage + 1} OF {totalPages}
              </span>

              <button
                onClick={() => setOverlayOn((v) => !v)}
                className={`absolute right-3 top-3 z-30 flex items-center gap-1.5 rounded-pill border px-2.5 py-[5px] font-mono text-[10.5px] font-semibold transition-colors cursor-pointer ${
                  overlayOn
                    ? 'border-action-border bg-action-tint text-action-ink'
                    : 'border-hairline bg-surface text-ink-faint'
                }`}
              >
                {overlayOn ? (
                  <>
                    <span className="block h-1.5 w-1.5 animate-slowPulse rounded-full bg-action" />
                    AI OVERLAY ON
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3" strokeWidth={2.4} />
                    AI OVERLAY OFF
                  </>
                )}
              </button>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center gap-4">
              <Legend color="bg-pass-fill" text="Full marks" />
              <Legend color="bg-amber-500" text="Minor deduction (< 1 mark)" />
              <Legend color="bg-red-500" text="Mark deduction" />
            </div>
          </div>
        </div>

        {/* Right Column: Marks & Feedback */}
        <div className="overflow-hidden rounded-card border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-[18px] py-[15px]">
            <CardTitle>Marks &amp; feedback</CardTitle>
            <span className="text-meta font-medium text-ink-faint">
              {(student.answers || []).length} questions · {withDeductions} with deductions
            </span>
          </div>

          {(student.answers || []).map((ans) => {
            const percent = pct(ans.awardedMarks, ans.maxMarks);
            const fullMarks = ans.maxMarks > 0 && ans.awardedMarks === ans.maxMarks;
            const lost = Number((ans.maxMarks - ans.awardedMarks).toFixed(2));

            return (
              <div key={ans.qNo} className="border-b border-track px-[18px] py-[15px]">
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[13px] font-bold text-ink">{ans.qNo}</span>
                    <span className="font-mono text-micro font-medium text-ink-faint">
                      {ans.co || ans.type || 'Course Outcome'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-[58px]">
                      <Bar percent={percent} color={fullMarks ? 'bg-pass-fill' : 'bg-action-bar'} delay={250} />
                    </span>
                    <span className="tabular font-mono text-[13px] font-bold text-ink">
                      {ans.awardedMarks} / {ans.maxMarks}
                    </span>
                  </div>
                </div>

                <div className="font-semibold text-[12px] text-ink mb-1">
                  {ans.title || `Problem Assessment ${ans.qNo}`}
                </div>

                <p className="pretty text-body-sm font-medium text-ink-muted">
                  {ans.aiFeedback}
                </p>

                {/* Deduction strip if not full marks */}
                {!fullMarks && (
                  <div className="mt-2.5 flex items-center justify-between gap-3 rounded-field border border-bad-border bg-bad-tint px-3 py-2.5">
                    <span className="pretty text-[12px] font-medium leading-[1.45] text-ink-muted">
                      <span className="font-mono font-bold text-bad">−{lost} </span>
                      {ans.mistakesInline?.[0]?.note || 'Intermediate step or notation slip recorded.'}
                    </span>
                    <button
                      onClick={() => setContestedQuestion(ans)}
                      className="btn btn-secondary shrink-0 !px-2.5 !py-1 !text-[11.5px] cursor-pointer"
                    >
                      Contest
                    </button>
                  </div>
                )}

                {/* Model answer expansion */}
                <button
                  onClick={() => setExpandedModel((prev) => ({ ...prev, [ans.qNo]: !prev[ans.qNo] }))}
                  className="mt-2.5 text-[11.5px] font-semibold text-action-ink hover:underline cursor-pointer block"
                >
                  {expandedModel[ans.qNo] ? 'Hide model solution' : 'Compare with official rubric solution'}
                </button>

                {expandedModel[ans.qNo] && (
                  <div className="animate-fade mt-2 rounded-field border border-hairline bg-page p-3">
                    <Label>MODEL ANSWER &amp; RUBRIC ATTAINMENT</Label>
                    <p className="pretty mt-2 text-body-sm font-medium text-ink-muted">
                      {ans.studentInput || 'Rigorous theoretical derivation and coordinate system alignment required according to University syllabus guidelines.'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="px-[18px] py-[15px] text-[12px] font-medium text-ink-faint">
            Academic petitions are reviewed under University Moderation Ordinance 4.2 within 48 hours.
          </div>
        </div>
      </div>

      {/* Challenge Evaluation Modal */}
      {contestedQuestion && (
        <ChallengeEvaluationModal
          question={contestedQuestion}
          student={student}
          activeCourse={activeCourse}
          onClose={() => setContestedQuestion(null)}
          onSubmit={(newIssue) => {
            onSubmitIssue(newIssue);
            setContestedQuestion(null);
            alert(`🎉 Petition #${newIssue.id} submitted to CoE board!`);
          }}
        />
      )}
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <span className="flex items-center gap-[7px] text-micro font-medium text-ink-muted">
      <span className={`block h-2.5 w-2.5 rounded-[3px] ${color}`} />
      {text}
    </span>
  );
}
