import React from 'react';
import { Sparkles, ChevronDown, Sun, Moon, LogOut } from 'lucide-react';
import { initials } from '../../utils/grade';

/**
 * 62px header matching the reference design and screenshots exactly.
 * Wordmark + Subject switcher on the left; ThemeToggle + RoleChip + SignOut on the right.
 */

export function Wordmark() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-tile bg-action shadow-sm">
        <Sparkles className="h-[17px] w-[17px] text-white" fill="currentColor" strokeWidth={0} />
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[16px] font-bold tracking-[-0.3px] text-ink">AutoGrade</span>
        <span className="font-mono text-[11px] font-semibold text-action">AI</span>
      </div>
    </div>
  );
}

function SubjectSwitcher({ courses = [], activeCourseId, onChange }) {
  const active = courses.find((c) => c.id === activeCourseId) || courses[0] || {};

  return (
    <div className="relative">
      <div className="flex items-center gap-2.5 rounded-field border border-hairline bg-page px-3 py-[7px]">
        <span className="text-[13px] leading-none">{active.icon || '🏛️'}</span>
        <span className="font-mono text-[10.5px] font-medium text-ink-faint">COURSE</span>
        <span className="text-[13px] font-semibold text-ink max-w-[240px] truncate">{active.name}</span>
        <ChevronDown className="h-[13px] w-[13px] text-ink-faint shrink-0" strokeWidth={2.2} />
      </div>

      <select
        aria-label="Active subject"
        value={activeCourseId}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {courses.map((course) => (
          <option key={course.id} value={course.id} className="bg-surface text-ink py-1">
            {course.icon || '📚'} {course.name} ({course.code})
          </option>
        ))}
      </select>
    </div>
  );
}

export function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={onToggle}
      title={`Switch to ${nextTheme} theme`}
      aria-label={`Switch to ${nextTheme} theme`}
      className="flex h-8 w-8 items-center justify-center rounded-field border border-hairline bg-page text-ink-faint transition-colors hover:text-ink cursor-pointer"
    >
      {theme === 'dark' ? (
        <Sun className="h-[15px] w-[15px]" strokeWidth={2.2} />
      ) : (
        <Moon className="h-[15px] w-[15px]" strokeWidth={2.2} />
      )}
    </button>
  );
}

function RoleChip({ name, detail }) {
  return (
    <div className="flex items-center gap-2.5 rounded-role border border-hairline bg-page py-[5px] pl-1.5 pr-3.5">
      <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-action-tint text-[10.5px] font-bold text-action-ink">
        {initials(name)}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[12px] font-semibold leading-none text-ink">{name}</span>
        <span className="font-mono text-[10px] leading-none text-ink-faint">{detail}</span>
      </span>
    </div>
  );
}

export default function UniversityHeader({ 
  courses = [], 
  activeCourseId, 
  onCourseChange, 
  identity, 
  theme, 
  onToggleTheme, 
  onSignOut,
  showCourseSwitcher = true
}) {
  return (
    <header className="sticky top-0 z-40 flex h-[62px] items-center justify-between gap-4 border-b border-hairline bg-surface px-6 transition-colors">
      <div className="flex items-center gap-3">
        <Wordmark />
        {showCourseSwitcher && courses.length > 0 && (
          <>
            <span className="mx-1 hidden h-[22px] w-px bg-hairline md:block" />
            <div className="hidden md:block">
              <SubjectSwitcher
                courses={courses}
                activeCourseId={activeCourseId}
                onChange={onCourseChange}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {identity && (
          <div className="hidden sm:block">
            <RoleChip name={identity.name} detail={identity.detail} />
          </div>
        )}

        {onSignOut && (
          <button
            onClick={onSignOut}
            title="Sign out"
            aria-label="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded-field border border-hairline bg-page text-ink-faint transition-colors hover:text-ink cursor-pointer"
          >
            <LogOut className="h-[15px] w-[15px]" strokeWidth={2.2} />
          </button>
        )}
      </div>
    </header>
  );
}
