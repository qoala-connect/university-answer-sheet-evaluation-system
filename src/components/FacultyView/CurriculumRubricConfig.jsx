import React, { useState } from 'react';
import { Check, Save, Cpu, ShieldCheck } from 'lucide-react';
import { AI_MODELS } from '../../data/universityMockData';
import { Toolbar, StatusPill, CardTitle, Label } from '../Common/Primitives';

const STRICTNESS_LEVELS = ['Lenient', 'Moderate', 'Strict', 'Pedantic'];

export default function CurriculumRubricConfig({ schema, onSaveSchema, activeCourse }) {
  const [activeModel, setActiveModel] = useState(schema?.selectedModel || 'gemini-3.6-flash');
  const [strictness, setStrictness] = useState(schema?.strictness || 'Moderate');
  const [stepMarking, setStepMarking] = useState(schema?.stepMarkingEnabled ?? true);
  const [latexMathCheck, setLatexMathCheck] = useState(schema?.latexMathVerification ?? true);
  const [diagramCredit, setDiagramCredit] = useState(schema?.diagramCreditPercent || 25);
  const [directive, setDirective] = useState(schema?.customDirective || '');
  const [isSaved, setIsSaved] = useState(false);

  const sections = schema?.sections || [];
  const questions = sections.flatMap((s) => s.questions || []);
  const keyed = questions.filter((q) => q.modelAnswer || q.correctAnswer);
  const allocated = questions.reduce((sum, q) => sum + (q.maxMarks || 0), 0) || schema?.maxTotalMarks || 75;
  const selectedModel = AI_MODELS.find((m) => m.id === activeModel) || AI_MODELS[0];

  const handleSave = () => {
    onSaveSchema({
      ...schema,
      selectedModel: activeModel,
      strictness,
      stepMarkingEnabled: stepMarking,
      latexMathVerification: latexMathCheck,
      diagramCreditPercent: diagramCredit,
      customDirective: directive,
      sections,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-3 pb-8">
      {/* Standardized Toolbar */}
      <Toolbar
        title="Marking schema"
        context={`${activeCourse?.name || 'Course'} · ${allocated} marks`}
        pill={
          questions.length === 0 ? (
            <StatusPill tone="warn">NO KEY</StatusPill>
          ) : keyed.length < questions.length ? (
            <StatusPill tone="warn">DRAFT</StatusPill>
          ) : (
            <StatusPill tone="pass">COMPLETE</StatusPill>
          )
        }
      >
        <button onClick={handleSave} className="btn btn-primary cursor-pointer">
          {isSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {isSaved ? 'Saved & Certified' : 'Save & lock'}
        </button>
      </Toolbar>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        
        {/* Left rail: Model & Rigor */}
        <div className="flex flex-col gap-3">
          
          {/* Evaluation Model */}
          <div className="rounded-card border border-hairline bg-surface px-[18px] py-4">
            <CardTitle className="!text-[13px]">Evaluation model</CardTitle>

            <div className="mt-3.5 space-y-[7px]">
              {AI_MODELS.map((model) => {
                const active = model.id === activeModel;
                return (
                  <button
                    key={model.id}
                    onClick={() => setActiveModel(model.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-field border px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                      active ? 'border-action-border bg-action-tint' : 'border-hairline hover:bg-surface-sunken'
                    }`}
                  >
                    <span>
                      <span className="block text-body-sm font-semibold text-ink">{model.name}</span>
                      <span className="mt-0.5 block font-mono text-micro text-ink-faint">
                        {model.speed} · {model.accuracy}
                      </span>
                    </span>
                    {active && <Check className="h-3.5 w-3.5 shrink-0 text-action-ink" strokeWidth={2.6} />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-hairline pt-3.5">
              {selectedModel.capabilities.map((cap) => (
                <span key={cap} className="rounded-badge bg-surface-raised px-2 py-1 font-mono text-[10px] font-medium text-ink-muted">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Grading Rigor */}
          <div className="rounded-card border border-hairline bg-surface px-[18px] py-4 space-y-3">
            <CardTitle className="!text-[13px]">Grading rigor</CardTitle>

            <div className="flex rounded-chip bg-surface-raised p-[3px]">
              {STRICTNESS_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setStrictness(level)}
                  className={`flex-1 rounded-[5px] py-1.5 text-center text-[11.5px] transition-colors cursor-pointer ${
                    strictness === level ? 'bg-action font-semibold text-white' : 'font-medium text-ink-faint hover:text-ink'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <Switch
              label="Step-by-step marking"
              hint="Partial marks for intermediate derivation steps"
              checked={stepMarking}
              onChange={setStepMarking}
            />

            <Switch
              label="LaTeX formula check"
              hint="Verify symbolic math equivalence"
              checked={latexMathCheck}
              onChange={setLatexMathCheck}
            />

            <div className="border-t border-track pt-3">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-body-sm font-medium text-ink">Diagram weightage</span>
                <span className="tabular font-mono text-[12.5px] font-semibold text-action-ink">{diagramCredit}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={diagramCredit}
                onChange={(e) => setDiagramCredit(Number(e.target.value))}
                className="w-full cursor-pointer accent-[var(--action)]"
              />
            </div>
          </div>
        </div>

        {/* Right column: Directive & Answer Key */}
        <div className="flex flex-col gap-3">
          
          {/* Directive Textarea */}
          <div className="rounded-card border border-hairline bg-surface px-[18px] py-4">
            <div className="mb-1.5 flex items-baseline justify-between">
              <CardTitle className="!text-[13px]">Chief Examiner directive</CardTitle>
              <span className="tabular font-mono text-micro text-ink-faint">{directive.length} / 2000</span>
            </div>
            <p className="mb-2.5 text-meta font-medium text-ink-faint">
              Guidance for handwriting tolerance, unit check requirements, diagram labels, and partial step marks.
            </p>
            <textarea
              rows={3}
              maxLength={2000}
              value={directive}
              onChange={(e) => setDirective(e.target.value)}
              placeholder="Award full step credit for verified algebraic reduction. Deduct 0.5 for notation slips on margins. Accept any standard textbook derivation..."
              className="field w-full p-3 font-mono text-[12px] leading-[1.6]"
            />
          </div>

          {/* Answer Key & Rubrics Table */}
          <div className="overflow-hidden rounded-card border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-[18px] py-3.5">
              <CardTitle className="!text-[13px]">Answer key &amp; rubrics</CardTitle>
              <span className="text-meta font-medium text-ink-faint">
                {keyed.length} of {questions.length} questions keyed · {allocated} marks allocated
              </span>
            </div>

            {questions.length === 0 ? (
              <div className="px-[18px] py-10 text-center">
                <p className="text-body-sm font-medium text-ink-muted">
                  No questions found in this rubric schema.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-[56px_minmax(0,1fr)_180px_72px_86px] bg-surface-sunken px-[18px] py-2.5 font-mono text-[10.5px] font-semibold tracking-[.06em] text-ink-faint">
                    <div>Q</div>
                    <div>EXPECTED ANSWER / TOPIC</div>
                    <div>RUBRIC SPLIT</div>
                    <div className="text-right">MARKS</div>
                    <div className="text-right">STATUS</div>
                  </div>

                  {sections.map((section, sIdx) => (
                    <div key={section.sectionName || sIdx}>
                      <div className="border-t border-track bg-surface-sunken px-[18px] py-2">
                        <Label>{(section.sectionName || `SECTION ${sIdx + 1}`).toUpperCase()}</Label>
                      </div>

                      {(section.questions || []).map((q) => {
                        const isKeyed = Boolean(q.modelAnswer || q.correctAnswer || q.title);
                        const split = q.rubricBreakdown?.length
                          ? q.rubricBreakdown.map((r) => `${r.points}m ${r.criteria.split(' ').slice(0, 2).join(' ')}`).join(' + ')
                          : `${q.maxMarks}m total`;

                        return (
                          <div
                            key={q.qNo}
                            className="grid grid-cols-[56px_minmax(0,1fr)_180px_72px_86px] items-center border-t border-track px-[18px] py-3.5"
                          >
                            <div className="font-mono text-[12px] font-semibold text-ink-faint">{q.qNo}</div>
                            <div className="pretty pr-4 text-body-sm font-medium text-ink-muted">
                              <span className="font-semibold text-ink">{q.title || q.qNo}: </span>
                              {q.modelAnswer || 'Step-by-step rigorous technical solution expected.'}
                            </div>
                            <div className="truncate font-mono text-micro text-ink-faint" title={split}>
                              {split}
                            </div>
                            <div className="tabular text-right font-mono text-[13px] font-semibold text-ink">
                              {q.maxMarks}
                            </div>
                            <div className="text-right">
                              <span className={`rounded-badge px-2 py-0.5 font-mono text-[10px] font-bold ${
                                isKeyed ? 'bg-pass-tint text-pass border border-pass-border' : 'bg-warn-tint text-warn border border-warn-border'
                              }`}>
                                {isKeyed ? 'KEYED' : 'MISSING'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Switch({ label, hint, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-track py-2.5">
      <div>
        <div className="text-body-sm font-medium text-ink">{label}</div>
        <div className="text-micro font-medium text-ink-faint">{hint}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`flex h-[19px] w-[34px] shrink-0 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          checked ? 'justify-end bg-action-bar' : 'justify-start bg-hairline-strong'
        }`}
      >
        <span className="block h-[15px] w-[15px] rounded-full bg-white shadow-sm" />
      </button>
    </div>
  );
}
