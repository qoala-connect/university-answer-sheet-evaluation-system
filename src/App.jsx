import React, { useState, useEffect } from 'react';
import UniversityHeader from './components/Common/UniversityHeader';
import Login from './auth/Login';
import { loadSession, saveSession, clearSession } from './auth/session';
import { useTheme } from './theme';

import FacultyDashboard from './components/FacultyView/FacultyDashboard';
import ScriptIngestionHub from './components/FacultyView/ScriptIngestionHub';
import CurriculumRubricConfig from './components/FacultyView/CurriculumRubricConfig';
import ModerationGrievanceDesk from './components/FacultyView/ModerationGrievanceDesk';

import CoEDashboard from './components/CoEView/CoEDashboard';
import DeanDashboard from './components/DeanView/DeanDashboard';

import AnnotatedScriptInspector from './components/StudentView/AnnotatedScriptInspector';
import AcademicPerformanceHub from './components/StudentView/AcademicPerformanceHub';

import { 
  UNIVERSITY_COURSES,
  DEFAULT_UNIVERSITY_SCHEMAS,
  UNIVERSITY_STUDENTS,
  UNIVERSITY_GRIEVANCES
} from './data/universityMockData';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [session, setSession] = useState(loadSession);

  const [courses, setCourses] = useState(UNIVERSITY_COURSES);
  const [activeCourseId, setActiveCourseId] = useState('me_617');
  
  // Tab states per role
  const [teacherTab, setTeacherTab] = useState('dashboard'); // 'dashboard' | 'ingest' | 'schema' | 'appeals'
  const [studentTab, setStudentTab] = useState('gradebook'); // 'gradebook' | 'performance'
  const [inspectingScript, setInspectingScript] = useState(null);

  // Shared Data State
  const [students, setStudents] = useState(UNIVERSITY_STUDENTS);
  const [schemas, setSchemas] = useState(DEFAULT_UNIVERSITY_SCHEMAS);
  const [issues, setIssues] = useState(UNIVERSITY_GRIEVANCES);

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];
  const courseStudents = students.filter((s) => s.courseId === activeCourseId);
  const currentStudentsList = courseStudents.length > 0 ? courseStudents : students;

  const schema = schemas[activeCourseId] || schemas['me_617'] || schemas['math_202'];
  const pendingIssuesCount = issues.filter(
    (i) => (i.courseId === activeCourseId) && (i.status === 'Under Review' || i.status === 'Pending')
  ).length;

  useEffect(() => {
    if (session) {
      saveSession(session);
    }
  }, [session]);

  const handleSignOut = () => {
    clearSession();
    setSession(null);
    setTeacherTab('dashboard');
    setStudentTab('gradebook');
    setInspectingScript(null);
  };

  const handleChangeCourse = (courseId) => {
    setActiveCourseId(courseId);
  };

  const handleAddStudent = (newStudent, detectedQpInfo) => {
    let targetCourseId = activeCourseId;
    if (detectedQpInfo && detectedQpInfo.subject) {
      const cleanSubj = detectedQpInfo.subject.trim();
      const cleanCode = (detectedQpInfo.subjectCode || 'SUBJ-101').trim();
      
      const existing = courses.find((c) => 
        c.code?.toLowerCase() === cleanCode.toLowerCase() ||
        c.name?.toLowerCase().includes(cleanSubj.toLowerCase())
      );

      if (existing) {
        targetCourseId = existing.id;
      }
    }

    const updatedStudent = {
      ...newStudent,
      courseId: targetCourseId
    };

    setStudents((prev) => [updatedStudent, ...prev]);
    setActiveCourseId(targetCourseId);
    setTeacherTab('dashboard');
  };

  const handleSaveSchema = (newSchema) => {
    setSchemas((prev) => ({ ...prev, [activeCourseId]: newSchema }));
  };

  const handleSubmitStudentIssue = (newIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
  };

  const handleResolveIssue = (issueId, action, note, scoreAdjustment = 0) => {
    setIssues((prev) => prev.map((issue) => {
      if (issue.id === issueId) {
        return {
          ...issue,
          status: action,
          facultyRemark: note || (action.includes('Approved') ? 'Marks adjustment authorized under ordinance.' : 'Score verified and sustained.'),
          moderatorActionDate: new Date().toLocaleTimeString()
        };
      }
      return issue;
    }));

    if (action.includes('Approved') && scoreAdjustment !== 0) {
      const targetIssue = issues.find((i) => i.id === issueId);
      if (targetIssue) {
        setStudents((prev) => prev.map((s) => {
          if (s.id === targetIssue.studentId || s.name === targetIssue.studentName || s.usn === targetIssue.usn) {
            const newTotal = Math.min(s.maxMarks || 75, s.totalMarks + scoreAdjustment);
            const newPct = Math.round((newTotal / (s.maxMarks || 75)) * 100);
            return {
              ...s,
              totalMarks: newTotal,
              percentage: newPct,
              answers: (s.answers || []).map((ans) => {
                if (ans.qNo === targetIssue.qNo) {
                  return { ...ans, awardedMarks: Math.min(ans.maxMarks, ans.awardedMarks + scoreAdjustment) };
                }
                return ans;
              })
            };
          }
          return s;
        }));
      }
    }
  };

  // If not signed in, show clean multi-role login window
  if (!session) {
    return (
      <Login
        students={students}
        onSignIn={setSession}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // Student resolution
  const signedInStudent = session.role === 'student'
    ? students.find((s) => s.id === session.studentId || s.usn === session.rollNo) || students[0]
    : null;

  // Tab definitions
  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ingest', label: 'Ingest sheets' },
    { id: 'schema', label: 'Marking schema' },
    { id: 'appeals', label: 'Appeals', count: pendingIssuesCount }
  ];

  const studentTabs = [
    { id: 'gradebook', label: 'My Answer Sheet' },
    { id: 'performance', label: 'My Performance' }
  ];

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col font-sans transition-colors selection:bg-action selection:text-white">
      
      {/* Reference 62px AppShell Header */}
      <UniversityHeader
        courses={courses}
        activeCourseId={activeCourseId}
        onCourseChange={handleChangeCourse}
        identity={{
          name: session.role === 'student' ? signedInStudent.name : session.name,
          detail: session.role === 'student' ? signedInStudent.usn : session.detail
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignOut={handleSignOut}
        showCourseSwitcher={session.role !== 'student'}
      />

      {/* Clean Inset Underline TabBar */}
      {session.role === 'teacher' && (
        <nav className="flex items-stretch overflow-x-auto border-b border-hairline bg-surface px-6">
          {teacherTabs.map((tab) => {
            const isActive = teacherTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setTeacherTab(tab.id);
                  setInspectingScript(null);
                }}
                className={`flex items-center gap-[7px] whitespace-nowrap px-3.5 py-3.5 text-[13px] transition-colors cursor-pointer ${
                  isActive ? 'font-semibold text-action-ink' : 'font-medium text-ink-faint hover:text-ink'
                }`}
                style={isActive ? { boxShadow: 'inset 0 -2px 0 var(--action)' } : undefined}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="rounded-[9px] bg-warn-tint px-[7px] py-0.5 font-mono text-[10.5px] font-semibold leading-[1.3] text-warn">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      )}

      {session.role === 'student' && (
        <nav className="flex items-stretch overflow-x-auto border-b border-hairline bg-surface px-6">
          {studentTabs.map((tab) => {
            const isActive = studentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStudentTab(tab.id)}
                className={`flex items-center gap-[7px] whitespace-nowrap px-4 py-3.5 text-[13px] transition-colors cursor-pointer ${
                  isActive ? 'font-semibold text-action-ink' : 'font-medium text-ink-faint hover:text-ink'
                }`}
                style={isActive ? { boxShadow: 'inset 0 -2px 0 var(--action)' } : undefined}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 w-full bg-page">
        
        {/* TEACHER ROLE */}
        {session.role === 'teacher' && (
          <>
            {inspectingScript ? (
              <div className="space-y-4">
                <div className="px-6 pt-4">
                  <button
                    onClick={() => setInspectingScript(null)}
                    className="btn btn-secondary btn-sm cursor-pointer"
                  >
                    ← Back to Class Dashboard
                  </button>
                </div>
                <AnnotatedScriptInspector
                  student={inspectingScript}
                  activeCourse={activeCourse}
                  onSubmitIssue={handleSubmitStudentIssue}
                />
              </div>
            ) : (
              <>
                {teacherTab === 'dashboard' && (
                  <FacultyDashboard
                    students={currentStudentsList}
                    schema={schema}
                    activeCourse={activeCourse}
                    onGoToUpload={() => setTeacherTab('ingest')}
                    onViewStudentScript={(stu) => setInspectingScript(stu)}
                  />
                )}

                {teacherTab === 'ingest' && (
                  <ScriptIngestionHub
                    onAddStudent={handleAddStudent}
                    activeCourse={activeCourse}
                    courses={courses}
                  />
                )}

                {teacherTab === 'schema' && (
                  <CurriculumRubricConfig
                    schema={schema}
                    onSaveSchema={handleSaveSchema}
                    activeCourse={activeCourse}
                  />
                )}

                {teacherTab === 'appeals' && (
                  <ModerationGrievanceDesk
                    issues={issues}
                    onResolveIssue={handleResolveIssue}
                    activeCourse={activeCourse}
                  />
                )}
              </>
            )}
          </>
        )}

        {/* STUDENT ROLE */}
        {session.role === 'student' && (
          <>
            {studentTab === 'gradebook' && (
              <AnnotatedScriptInspector
                student={signedInStudent}
                activeCourse={activeCourse}
                onSubmitIssue={handleSubmitStudentIssue}
              />
            )}

            {studentTab === 'performance' && (
              <AcademicPerformanceHub
                student={signedInStudent}
                activeCourse={activeCourse}
                issues={issues}
              />
            )}
          </>
        )}

        {/* DEAN ROLE */}
        {session.role === 'dean' && (
          <DeanDashboard
            students={currentStudentsList}
            courses={courses}
            activeCourse={activeCourse}
            issues={issues}
            onInspectStudentScript={(stu) => setInspectingScript(stu)}
            onSelectCourse={handleChangeCourse}
          />
        )}

        {/* COE ROLE */}
        {session.role === 'coe' && (
          <CoEDashboard
            students={currentStudentsList}
            issues={issues}
            activeCourse={activeCourse}
          />
        )}

      </main>

      {/* Minimal Clean Footer */}
      <footer className="border-t border-hairline bg-surface py-4 px-6 text-meta text-ink-faint flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">UniGrade AI</span>
          <span>•</span>
          <span>Automated Answer Sheet Evaluation System</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Signed in as <strong className="text-ink">{session.name}</strong></span>
        </div>
      </footer>

    </div>
  );
}
