import React, { useState } from 'react';
import { 
  GraduationCap, School, Building2, ShieldAlert, ArrowLeft, ArrowRight, 
  Sparkles, CheckCircle2, User, Key, Lock, Sun, Moon 
} from 'lucide-react';
import { signInAsRole, TEACHER_CREDENTIALS, DEAN_CREDENTIALS, COE_CREDENTIALS } from './session';

export default function Login({ students = [], onSignIn, theme, onToggleTheme }) {
  const [role, setRole] = useState(null); // null | 'teacher' | 'student' | 'dean' | 'coe'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const defaultUnivStudent = students.find(s => s.courseId === 'me_617' || s.courseId === 'math_202') || students[0];
  const [selectedStudentId, setSelectedStudentId] = useState(defaultUnivStudent?.id || '');
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'teacher') {
      setUsername(TEACHER_CREDENTIALS.username);
      setPassword(TEACHER_CREDENTIALS.password);
    } else if (selectedRole === 'dean') {
      setUsername(DEAN_CREDENTIALS.username);
      setPassword(DEAN_CREDENTIALS.password);
    } else if (selectedRole === 'coe') {
      setUsername(COE_CREDENTIALS.username);
      setPassword(COE_CREDENTIALS.password);
    } else if (selectedRole === 'student') {
      const preferred = students.find(s => s.courseId === 'me_617' || s.courseId === 'math_202') || students[0];
      setSelectedStudentId(preferred?.id || '');
    }
  };

  const handleBack = () => {
    setRole(null);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'student') {
      const student = students.find(s => s.id === selectedStudentId) || students[0];
      if (!student) {
        setError('Please select a student record.');
        return;
      }
      const session = signInAsRole('student', { student });
      onSignIn(session);
    } else {
      if (!username.trim()) {
        setError('Please enter username.');
        return;
      }
      const session = signInAsRole(role);
      onSignIn(session);
    }
  };

  const handleQuickDemoSignIn = (roleKey, customStudent = null) => {
    if (roleKey === 'student') {
      const target = customStudent || students.find(s => s.courseId === 'me_617' || s.courseId === 'math_202') || students[0];
      const session = signInAsRole('student', { student: target });
      onSignIn(session);
    } else {
      const session = signInAsRole(roleKey);
      onSignIn(session);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-page text-ink selection:bg-action selection:text-white transition-colors">
      
      {/* Clean Minimal Header */}
      <header className="flex h-[62px] items-center justify-between border-b border-hairline bg-surface px-6 sm:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-action shadow-sm shadow-indigo-500/20 text-white">
            <Sparkles className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[17px] font-bold tracking-tight text-ink">UniGrade</span>
            <span className="font-mono text-[11px] font-semibold text-action">AI</span>
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-hairline bg-surface-raised text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[540px]">
          
          {role === null ? (
            /* Role Selection Screen */
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  Sign in to UniGrade
                </h1>
                <p className="text-body-sm text-ink-muted max-w-sm mx-auto">
                  Select your role to access your dedicated evaluation workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <RoleCard
                  icon={School}
                  iconColor="bg-indigo-500/10 text-action"
                  title="I'm a Teacher / Faculty"
                  body="Upload answer booklets, set rubrics, verify OCR, and grade the class."
                  onClick={() => handleRoleSelect('teacher')}
                />

                <RoleCard
                  icon={GraduationCap}
                  iconColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  title="I'm a Student / Scholar"
                  body="View your evaluated answer booklet, step marks, feedback, and contest a mark."
                  onClick={() => handleRoleSelect('student')}
                />

                <RoleCard
                  icon={Building2}
                  iconColor="bg-teal-500/10 text-teal-600 dark:text-teal-400"
                  title="I'm the Dean of Department"
                  body="Comprehensive academic ledger, outcome attainment, and quality oversight."
                  onClick={() => handleRoleSelect('dean')}
                />

                <RoleCard
                  icon={ShieldAlert}
                  iconColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  title="I'm the Controller of Exams (CoE)"
                  body="Executive moderation ordinances, re-evaluation appeals, and result certification."
                  onClick={() => handleRoleSelect('coe')}
                />
              </div>

              {/* 1-Click Fast Demo Launchers */}
              <div className="rounded-2xl border border-hairline bg-surface p-4 text-center space-y-2">
                <span className="font-mono text-micro font-semibold text-ink-faint uppercase tracking-wider block">
                  Quick 1-Click Demo Launch
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handleQuickDemoSignIn('teacher')}
                    className="btn btn-secondary !py-1 !px-2.5 !text-[11.5px] cursor-pointer"
                  >
                    Teacher Portal
                  </button>
                  <button
                    onClick={() => handleQuickDemoSignIn('student')}
                    className="btn btn-secondary !py-1 !px-2.5 !text-[11.5px] cursor-pointer"
                  >
                    Student Portal
                  </button>
                  <button
                    onClick={() => handleQuickDemoSignIn('dean')}
                    className="btn btn-secondary !py-1 !px-2.5 !text-[11.5px] cursor-pointer"
                  >
                    Dean Portal
                  </button>
                  <button
                    onClick={() => handleQuickDemoSignIn('coe')}
                    className="btn btn-secondary !py-1 !px-2.5 !text-[11.5px] cursor-pointer"
                  >
                    CoE Portal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Dedicated Role Login Form */
            <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8 shadow-sm space-y-5">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-meta font-medium text-ink-faint hover:text-ink transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to role selection
              </button>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-ink tracking-tight">
                  {role === 'teacher' && 'Teacher Portal Sign In'}
                  {role === 'student' && 'Student Portal Sign In'}
                  {role === 'dean' && 'Dean of Department Sign In'}
                  {role === 'coe' && 'Controller of Examinations Sign In'}
                </h2>
                <p className="text-meta text-ink-muted">
                  {role === 'teacher' && 'Access grading ledger, booklet ingestion, and schema configuration.'}
                  {role === 'student' && 'Access your marked answer script, step credit, and feedback.'}
                  {role === 'dean' && 'Review department OBE attainment and ratify academic quality.'}
                  {role === 'coe' && 'Manage moderation ordinances and certify official results.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {role === 'student' ? (
                  <div className="space-y-2">
                    <label htmlFor="studentSelect" className="block text-meta font-semibold text-ink">
                      Select Student Account / USN
                    </label>
                    <div className="relative">
                      <select
                        id="studentSelect"
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="field w-full px-3.5 py-2.5 text-[13px] font-medium text-ink bg-surface cursor-pointer rounded-xl"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id} className="bg-surface text-ink py-1">
                            {s.name} ({s.usn || s.rollNo}) — Score: {s.totalMarks}/75 ({s.grade?.split(' ')[0] || 'Grade'})
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-micro text-ink-faint font-medium">
                      Select a scholar from the cohort roster to inspect their personal script and marks.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="username" className="block text-meta font-semibold text-ink">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="field w-full px-3.5 py-2.5 text-[13px] text-ink rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="password" className="block text-meta font-semibold text-ink">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="field w-full px-3.5 py-2.5 text-[13px] text-ink rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-bad-border bg-bad-tint p-3 text-micro font-medium text-bad">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full !py-2.5 !text-[13px] cursor-pointer"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Demo Hint */}
              <div className="rounded-xl border border-hairline bg-surface-sunken p-3 text-center space-y-1">
                <span className="font-mono text-micro text-ink-faint block">
                  DEMO CREDENTIALS PRE-FILLED
                </span>
                <span className="text-micro text-ink-muted font-medium block">
                  Click "Sign In" to enter as {role === 'teacher' ? 'Dr. Aris Thorne' : role === 'dean' ? 'Dr. Eleanor Vance' : role === 'coe' ? 'Prof. Marcus Brody' : 'Scholar'}.
                </span>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function RoleCard({ icon: Icon, iconColor, title, body, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 sm:p-5 text-left transition-all hover:border-action hover:shadow-md hover:bg-surface-sunken cursor-pointer"
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconColor}`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] sm:text-[15px] font-bold text-ink">{title}</span>
        <span className="mt-0.5 block text-meta text-ink-muted font-medium">{body}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
    </button>
  );
}
