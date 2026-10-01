import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export const EVALUATION_MODES = [
  { id: 'all', label: 'All Modes', icon: '🌐' },
  { id: 'Assignment', label: 'Assignment', icon: '📝' },
  { id: 'Quiz', label: 'Quiz', icon: '⚡' },
  { id: 'Examination', label: 'Examination', icon: '🏛️' }
];

export default function DepartmentCourseSelector({ 
  courses = [], 
  activeCourseId, 
  onChangeCourse,
  activeEvaluationMode = 'all',
  onChangeEvaluationMode,
  modeCounts = {}
}) {
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0] || {};

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Left: Reference SubjectSwitcher Dropdown */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <div className="flex items-center gap-2.5 rounded-field border border-hairline bg-page px-3 py-[7px] cursor-pointer hover:border-hairline-strong transition-colors">
            <span className="text-[14px] leading-none">{activeCourse.icon || '📚'}</span>
            <span className="font-mono text-[10.5px] font-semibold text-ink-faint">COURSE</span>
            <span className="text-[13px] font-semibold text-ink max-w-[220px] sm:max-w-none truncate">
              {activeCourse.name}
            </span>
            <span className="font-mono text-[11px] text-ink-faint hidden md:inline">({activeCourse.code})</span>
            <ChevronDown className="h-[13px] w-[13px] text-ink-faint" strokeWidth={2.2} />
          </div>

          <select
            aria-label="Active subject course"
            value={activeCourseId}
            onChange={(e) => onChangeCourse(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id} className="bg-surface text-ink py-1">
                {course.icon || '📚'} {course.name} ({course.code}) — {course.semester || 'Semester III'}
              </option>
            ))}
          </select>
        </div>

        {/* Course Meta Chips */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="font-mono text-[11px] font-semibold text-ink-faint rounded-field border border-hairline bg-surface px-2.5 py-1">
            {activeCourse.maxMarks || 75} MARKS
          </span>
          <span className="text-[11.5px] font-medium text-ink-faint rounded-field border border-hairline bg-surface px-2.5 py-1">
            {activeCourse.department || 'Computing & Engg'}
          </span>
          {activeCourse.isAiCreated && (
            <span className="flex items-center gap-1 rounded-badge bg-action-tint border border-action-border px-2 py-0.5 font-mono text-[10px] font-bold text-action-ink">
              <Sparkles className="h-3 w-3 text-action" /> AI DISCOVERED
            </span>
          )}
        </div>
      </div>

      {/* Right: Evaluation Modes Selector */}
      <div className="flex items-center rounded-field border border-hairline bg-page p-[3px]">
        {EVALUATION_MODES.map(mode => {
          const isSelected = activeEvaluationMode === mode.id;
          const count = modeCounts[mode.id] ?? 0;
          return (
            <button
              key={mode.id}
              onClick={() => onChangeEvaluationMode && onChangeEvaluationMode(mode.id)}
              className={`flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[12px] transition-all cursor-pointer ${
                isSelected
                  ? 'bg-action font-semibold text-white shadow-sm'
                  : 'font-medium text-ink-faint hover:text-ink hover:bg-surface-raised'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
              {mode.id !== 'all' && (
                <span className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-surface-raised text-ink-muted'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
