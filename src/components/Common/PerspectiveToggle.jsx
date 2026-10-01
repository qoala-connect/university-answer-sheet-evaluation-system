import React from 'react';
import { GraduationCap, UserCheck, ShieldAlert, Building2 } from 'lucide-react';

export default function PerspectiveToggle({ activePerspective, onChange, pendingIssueCount = 0 }) {
  const roles = [
    {
      id: 'faculty',
      label: 'Faculty',
      fullLabel: 'Faculty Examiner',
      icon: UserCheck,
    },
    {
      id: 'dean',
      label: 'Dean',
      fullLabel: 'Dean of Department',
      icon: Building2,
    },
    {
      id: 'coe',
      label: 'CoE',
      fullLabel: 'Controller of Exams',
      icon: ShieldAlert,
      count: pendingIssueCount
    },
    {
      id: 'student',
      label: 'Student',
      fullLabel: 'University Scholar',
      icon: GraduationCap,
    }
  ];

  return (
    <div className="flex items-center gap-1 rounded-role border border-hairline bg-page p-1">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = activePerspective === role.id;
        return (
          <button
            key={role.id}
            onClick={() => onChange(role.id)}
            className={`flex items-center gap-1.5 rounded-[16px] px-3 py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${
              isActive
                ? 'bg-action text-white shadow-sm'
                : 'text-ink-faint hover:text-ink hover:bg-surface-raised'
            }`}
            title={role.fullLabel}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={isActive ? 2.5 : 2} />
            <span>{role.label}</span>
            {role.count > 0 && (
              <span className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                isActive ? 'bg-white text-action-ink' : 'bg-warn-tint text-warn border border-warn-border'
              }`}>
                {role.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
