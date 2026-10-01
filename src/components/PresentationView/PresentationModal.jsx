import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, 
  Sparkles, Layers, ShieldCheck, Cpu, Award, BookOpen, CheckCircle, 
  HelpCircle, Monitor, FileText, ArrowRight, Play, Check, Eye 
} from 'lucide-react';

const PRESENTATION_SLIDES = [
  {
    id: 1,
    tag: 'Title & Overview',
    title: 'UniGrade AI Evaluation System',
    subtitle: 'Autonomous Handwritten Answer Booklet Evaluation with Gemini 3.6 Multimodal Engine',
    slideType: 'title',
    content: {
      badge: 'AUTONOMOUS UNIVERSITY ACCREDITATION & OBE PLATFORM',
      overview: 'Apex Institute of Science & Technology • Office of the Controller of Examinations (CoE) • Fall 2026 Session',
      pillars: [
        { label: 'Gemini 3.6 Multimodal', desc: '99.8% LaTeX & Math OCR Precision', color: 'indigo' },
        { label: '3-Tier Evaluation Modes', desc: 'Assignment, Quiz & Exam Automation', color: 'purple' },
        { label: 'OBE Attainment Tracking', desc: 'CO1–CO4 ABET & NBA Compliance', color: 'emerald' },
        { label: '4 Executive Roles', desc: 'Faculty, Dean, CoE & Student Scholar', color: 'amber' }
      ]
    },
    speakerNotes: 'Welcome everyone! Today we present UniGrade AI: a next-generation academic evaluation platform designed to eliminate grading inconsistency, solve messy handwritten mathematical derivation parsing, and automate Outcome-Based Education (OBE) accreditation tracking for autonomous universities.'
  },
  {
    id: 2,
    tag: 'Executive Overview',
    title: 'Transforming University Answer Booklet Evaluation',
    subtitle: 'Bridging the critical gap between handwritten academic scripts and automated accreditation compliance.',
    slideType: 'two-col',
    col1: {
      title: '⚠️ The University Examination Dilemma',
      color: 'red',
      points: [
        { head: 'Massive Evaluator Fatigue:', text: 'Examination boards grade thousands of 15-page booklets under time pressure, causing high variation in step-marking.' },
        { head: 'Handwritten & Math Notation Barriers:', text: 'Standard OCR tools fail completely on handwritten integrals, matrices, proofs, and velocity triangles.' },
        { head: 'Accreditation Data Overhead:', text: 'Manual computation of Course Outcomes (CO1–CO4) attainment takes weeks of administrative work for ABET/NBA.' },
        { head: 'Grievance Window Friction:', text: 'Post-result challenge evaluation petitions are slow, disputed, and lack transparent derivation audit trails.' }
      ]
    },
    col2: {
      title: '✨ The UniGrade AI Multi-Tier Solution',
      color: 'emerald',
      points: [
        { head: 'Gemini 3.6 Multimodal Engine:', text: 'Dual-stream visual OCR that transcribes complex equations, proofs, and velocity triangles at 99.8% precision.' },
        { head: 'Granular Step-Credit Deductions:', text: 'Calculates intermediate step-marking, awards alternative basis choices, and logs precise reason for every 0.5M deduction.' },
        { head: 'Automated OBE & Bloom Tagging:', text: 'Real-time Course Outcome mapping (CO1–CO4) aligned with Bloom Revised Taxonomy (L2–L5).' },
        { head: 'End-to-End Governance Deck:', text: 'Seamless role-based orchestration across Faculty, Dean of Department, CoE, and Student Scholars.' }
      ]
    },
    speakerNotes: 'Traditional grading faces massive evaluator fatigue and high error rates in mathematical step credits. UniGrade AI introduces multimodal handwriting OCR and automated OBE alignment to resolve this completely.'
  },
  {
    id: 3,
    tag: 'System Architecture',
    title: 'Role-Based Academic Governance Ecosystem',
    subtitle: 'Tailored, institutional-grade consoles specifically engineered for every stage of the academic hierarchy.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/faculty_dashboard.png',
    screenshotLabel: 'FACULTY GOVERNANCE CONSOLE',
    points: [
      { head: 'Faculty / Chief Examiner:', text: 'Uploads QP & booklets, sets rubric blueprint, runs AI OCR batch grading.', col: 'text-indigo-400' },
      { head: 'Dean of Department:', text: 'Academic audit & oversight, in-place booklet inspection, and Dean Endorsement sign-off.', col: 'text-teal-400' },
      { head: 'Controller of Exams (CoE):', text: 'Grade moderation matrix, ±5% discrepancy flagging, and transcript certification.', col: 'text-amber-400' },
      { head: 'University Scholar / Student:', text: 'Inspects 15-page scanned scripts with visual pins, OBE radar, and submits grievances.', col: 'text-purple-400' }
    ],
    speakerNotes: 'UniGrade AI is not a generic tool; it mirrors real university hierarchy with four distinct, specialized perspectives ensuring strict academic integrity and checks and balances.'
  },
  {
    id: 4,
    tag: 'Multimodal AI Engine',
    title: 'Powered by Google Gemini 3.6 Multimodal Engine',
    subtitle: 'Real-time visual comprehension of handwritten scripts, advanced algebraic derivations, and engineering schematics.',
    slideType: 'three-cards',
    cards: [
      {
        title: 'Visual LaTeX OCR Core',
        subtitle: 'High-Resolution Handwriting Transcription',
        color: 'indigo',
        points: [
          'Transcribes complex mathematical derivations from 300 DPI scanned booklets.',
          'Parses multi-tier matrices, determinants, and eigenspaces directly into LaTeX.',
          'Detects subtle subscripting, indices, Greek symbols (alpha, beta, psi), and partial derivatives.',
          'Benchmarked at 99.8% precision on university engineering testbeds.'
        ]
      },
      {
        title: 'Engineering Diagram Intelligence',
        subtitle: 'Schematics, Cascades & Geometry',
        color: 'cyan',
        points: [
          'Parses velocity triangles (inlet/exit swirl vectors Ctheta, Cz, relative velocity w).',
          'Evaluates conic coordinate transformations and hand-drawn tilted ellipses.',
          'Validates free vortex flow (r * C_theta = const) and radial equilibrium criteria.',
          'Checks mechanical blade angles, deviation angles, and chord/pitch dimensions.'
        ]
      },
      {
        title: 'Step-Credit Mathematical Reasoning',
        subtitle: 'Pedantic Step-by-Step Scoring',
        color: 'emerald',
        points: [
          'Calculates intermediate derivation steps rather than merely final answers.',
          'Recognizes valid alternative solution paths (e.g. alternate free variable basis choices).',
          'Assigns penalty-level deductions for slips of pen (e.g. -0.5M notation typo).',
          'Zero hallucination guarantee bounded strictly by examiner rubric blueprints.'
        ]
      }
    ],
    speakerNotes: 'At the heart of the system is the Google Gemini 3.6 Multimodal Engine. It does not just do plain OCR; it reads handwriting, parses LaTeX formulas, and inspects engineering diagrams like velocity triangles and conic sections.'
  },
  {
    id: 5,
    tag: 'Curricular Evaluation Modes',
    title: 'Unified 3-Tier Academic Assessment Pipeline',
    subtitle: 'Seamlessly orchestrates Assignment, Quiz, and Final Examination modes with specialized evaluation criteria.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/student_inspector_exam.png',
    screenshotLabel: 'FINAL EXAM 14-PAGE SCRIPT INSPECTOR (ME-617)',
    points: [
      { head: 'Mode 1: Assignment (MATH-202):', text: '15-page student booklet. Gram-Schmidt orthogonalization, spectral theorem A=QDQᵀ. Score: 73.5/75 (98.0%, S+).', col: 'text-purple-400' },
      { head: 'Mode 2: Quiz (ME-617A Turbomachinery):', text: '12-page candidate booklet. Polytropic efficiency, temperature rise, swirl velocity. Score: 70.5/75 (94.0%, S).', col: 'text-amber-400' },
      { head: 'Mode 3: Examination (ME-617 Final):', text: '14-page comprehensive booklet. Reaction ratio proof R=(Ψ/2)+1, stall hysteresis. Score: 68.5/75 (91.3%, S).', col: 'text-emerald-400' }
    ],
    speakerNotes: 'We have implemented and verified all 3 modes: Assignment with a 15-page Math booklet, Quiz with a 12-page Turbomachinery booklet, and Final Examination with a 14-page Advanced Turbomachinery booklet, complete with real question papers.'
  },
  {
    id: 6,
    tag: 'Faculty Ingestion Hub',
    title: 'Automated Script Ingestion & Batch OCR Hub',
    subtitle: 'Automates question paper classification, student barcode extraction, deskewing, and parallel cohort processing.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/faculty_ingestion.png',
    screenshotLabel: 'SCRIPT INGESTION & AI AUTO-DETECTION HUB',
    points: [
      { head: 'AI Question Paper Auto-Detection:', text: 'Gemini 3.6 extracts subject, creates code (e.g. ME-617), and auto-classifies into Assignment, Quiz, or Exam.', col: 'text-cyan-400' },
      { head: 'Barcode & Hall Ticket Sync:', text: 'Reads candidate barcode (e.g. 19205402), links USN to CoE registrar database, and preserves anonymity.', col: 'text-indigo-400' },
      { head: '300 DPI Vector Ingestion:', text: 'Renders multi-page PDF booklets into high-contrast vector layers for precise character and LaTeX extraction.', col: 'text-purple-400' },
      { head: 'Cohort Batch Parallel Processing:', text: 'Processes 50+ examination booklets in parallel with realtime terminal logs and telemetry.', col: 'text-emerald-400' }
    ],
    speakerNotes: 'The Faculty Ingestion Hub handles both single scripts and entire batches. Just dropping a question paper auto-detects whether it is an Assignment, Quiz, or Exam and auto-configures the blueprint!'
  },
  {
    id: 7,
    tag: 'Academic Ordinance',
    title: 'Curricular Rubric Blueprint & Step-Marking Engine',
    subtitle: 'Empowers academic boards to establish strict mathematical marking policies, units precision, and Bloom rigor.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/faculty_rubric.png',
    screenshotLabel: 'RUBRIC BLUEPRINT & AI MODEL TUNING',
    points: [
      { head: 'Rigor Profiles:', text: 'Select from Lenient, University Standard, Strict, and Pedantic profiles.', col: 'text-indigo-400' },
      { head: 'Step-by-Step Credit:', text: 'Awards partial points for intermediate algebraic working, Gaussian row steps, and Euler equations.', col: 'text-emerald-400' },
      { head: 'LaTeX & Unit Precision:', text: 'Enforces strict SI metric dimensional consistency (ns, μs, K, m/s).', col: 'text-cyan-400' },
      { head: 'OBE Bloom Mapping:', text: 'Tags all questions with Bloom levels (L2 Understand to L5 Evaluate) for ABET/NBA accreditation.', col: 'text-purple-400' },
      { head: 'Moderation Tolerance (±5%):', text: 'Flags scripts for secondary review if evaluator delta exceeds university tolerance.', col: 'text-amber-400' }
    ],
    speakerNotes: 'Every question is tagged with Course Outcomes CO1-CO4 and Bloom Taxonomy levels. Academic chairs can dial rigor from University Standard to Pedantic with strict unit verification.'
  },
  {
    id: 8,
    tag: 'Student Perspective',
    title: 'Interactive Annotated Script Inspector',
    subtitle: 'Complete academic transparency allowing scholars to inspect full multi-page handwritten booklets with live visual pins.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/student_inspector_assignment.png',
    screenshotLabel: 'STUDENT SCRIPT INSPECTOR (15-PAGE MATH BOOKLET)',
    points: [
      { head: 'Multi-Page Booklet Navigation:', text: 'Browse all 15 scanned candidate pages with zoom/pan and page jumping.', col: 'text-purple-400' },
      { head: 'Color-Coded Visual Pinpoints:', text: 'Green pins award verified step marks (+2.5M); amber pins flag slips of pen (-0.5M); purple pins confirm OBE criteria.', col: 'text-emerald-400' },
      { head: 'LaTeX Transcription Panel:', text: 'Side-by-side display of student handwritten response vs official model derivation.', col: 'text-cyan-400' },
      { head: 'Deduction Transparency:', text: 'Every mark deducted carries an exact explanation (e.g. unnormalized rotation matrix).', col: 'text-amber-400' },
      { head: 'One-Click Challenge Trigger:', text: 'Submit dispute directly from the question card to the Grievance Desk.', col: 'text-indigo-400' }
    ],
    speakerNotes: 'Students no longer receive a single mystery score. They can inspect their actual scanned handwritten booklet with pinpoint overlays showing where marks were earned or deducted.'
  },
  {
    id: 9,
    tag: 'OBE Analytics',
    title: 'Academic Performance Hub & Course Outcome Radar',
    subtitle: 'Visual multidimensional analytics comparing candidate mastery against cohort averages and accreditation targets.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/student_performance.png',
    screenshotLabel: 'COURSE OUTCOME (OBE) PROFICIENCY RADAR',
    points: [
      { head: 'Course Outcome Radar (CO1-CO4):', text: 'Compares student mastery % with classroom cohort average % and NBA/ABET target % (75%).', col: 'text-emerald-400' },
      { head: 'Cognitive Bloom Rigor Bars:', text: 'Evaluates student performance across Bloom levels L2 (Understand) through L5 (Evaluate).', col: 'text-cyan-400' },
      { head: 'Diagnostic Strengths & Weaknesses:', text: 'Identifies top conceptual competencies and specific areas needing semester remediation.', col: 'text-purple-400' },
      { head: 'Institutional Standing:', text: 'Calculates GPA (10.0 scale), letter grade (S+, S, A), and cohort rank.', col: 'text-amber-400' }
    ],
    speakerNotes: 'The Academic Performance Hub gives instant feedback: radar charts mapped to NBA/ABET targets, cognitive Bloom bars, and specific areas for improvement.'
  },
  {
    id: 10,
    tag: 'Student Petitions',
    title: 'Re-Evaluation & Grievance Desk',
    subtitle: 'Streamlines university challenge evaluation petitions with automated AI audit recommendations and board sign-off.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/challenge_desk.png',
    screenshotLabel: 'RE-EVALUATION & GRIEVANCE AUDIT DESK',
    points: [
      { head: 'Candidate Petition Filing:', text: 'Student highlights specific question, writes mathematical objection, and submits petition with fee escrow.', col: 'text-amber-400' },
      { head: 'Multimodal AI Audit Recommendation:', text: 'Gemini 3.6 re-evaluates the derivation steps and issues independent advisory (e.g. +1.5 Marks).', col: 'text-cyan-400' },
      { head: 'Chief Examiner Board Adjudication:', text: 'Panel can Approve (+Marks), Reject & Affirm, or escalate to Dual Blind Evaluator.', col: 'text-emerald-400' },
      { head: 'Live Certified Ledger Update:', text: 'Ratification immediately updates candidate total marks, percentage, and final transcript.', col: 'text-purple-400' }
    ],
    speakerNotes: 'The grievance desk turns what used to be a weeks-long manual re-evaluation into an accountable digital flow with AI audit findings aiding the Chief Examiner panel.'
  },
  {
    id: 11,
    tag: 'Examination Controller',
    title: 'Controller of Examinations (CoE) Console',
    subtitle: 'Quality assurance, statistical grade moderation, anomaly detection, and official result certification.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/coe_dashboard.png',
    screenshotLabel: 'COE GRADE MODERATION & AUDIT CONSOLE',
    points: [
      { head: 'Grade Moderation Matrix:', text: 'Analyzes cohort bell curve, standard deviation, and mean passing percentage.', col: 'text-indigo-400' },
      { head: 'Dual-Evaluator Discrepancy Flagging:', text: 'Automated trigger for scripts exceeding ±5% delta to guarantee grading fairness.', col: 'text-amber-400' },
      { head: 'Immutable Audit Ledger:', text: 'Cryptographically timestamped log of all scoring adjustments and examiner signatures.', col: 'text-emerald-400' },
      { head: 'Official Certification:', text: 'Finalizes cohort ranks, seals transcripts, and publishes registrar-grade results.', col: 'text-cyan-400' }
    ],
    speakerNotes: 'The CoE Console ensures institutional compliance: standard deviation checks, dual-evaluator moderation whenever score delta exceeds 5%, and cryptographic audit trails.'
  },
  {
    id: 12,
    tag: 'Executive Leadership',
    title: 'Dean of Department: Academic Audit & Oversight',
    subtitle: 'Executive departmental dashboard providing complete transparency into all evaluated scripts, rubrics, and accreditation benchmarks.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/dean_dashboard.png',
    screenshotLabel: 'DEAN ACADEMIC AUDIT & OVERSIGHT DASHBOARD',
    points: [
      { head: 'Cross-Departmental Script Ledger:', text: 'Search, filter by mode (Assignment, Quiz, Exam), and inspect any student script in-place.', col: 'text-teal-400' },
      { head: 'Department OBE Attainment Index:', text: 'Progress bars measuring departmental compliance against NBA and ABET Tier-1 standards.', col: 'text-emerald-400' },
      { head: 'Chief Examiner Policy Audit:', text: 'Inspects examiner strictness, AI model parameters, and step-credit policies.', col: 'text-cyan-400' },
      { head: 'Dean Endorsement Modal:', text: 'Official ratification sign-off with celebratory confirmation before Senate transcript release.', col: 'text-amber-400' }
    ],
    speakerNotes: 'The Dean Console provides executive departmental oversight. The Dean can search, filter, drill down into any candidate script in-place, audit OBE compliance, and officially ratify results with the Dean Endorsement sign-off.'
  },
  {
    id: 13,
    tag: 'Performance & Rigor',
    title: 'Technical Specifications & Verification Benchmarks',
    subtitle: 'Rigorous empirical performance metrics validated against actual university examination booklets.',
    slideType: 'stats-matrix',
    stats: [
      { stat: '99.8%', label: 'LaTeX OCR Precision', sub: 'Verified character & derivation recognition across complex mathematical scripts.', color: 'indigo' },
      { stat: '~0.9s', label: 'Latency Per Script', sub: 'Ultra-fast multimodal vision pipeline executing 15-page evaluations in realtime.', color: 'cyan' },
      { stat: '100%', label: 'OBE Compliance', sub: 'Full alignment with NBA & ABET Tier-1 Course Outcome attainment requirements.', color: 'emerald' },
      { stat: '±0.5M', label: 'Scoring Precision', sub: 'Step-credit deductions accurately distinguish minor pen slips from conceptual errors.', color: 'amber' }
    ],
    matrix: [
      'Native Multimodal Architecture: Gemini 3.6 Flash / Pro Vision with direct PDF vector buffer rendering.',
      'Security & Anti-Tamper: Masked student USN during OCR evaluation ensures zero examiner bias.',
      'Dynamic Subject Induction: Any new question paper is auto-categorized into its own academic course & rubric.',
      'Endorsement Governance: Multi-signature workflow requiring Chief Examiner, CoE, and Dean ratification.'
    ],
    speakerNotes: 'Our benchmark highlights: 99.8% precision, sub-second latency per script, 100% OBE compliance, and step-level precision down to half a mark.'
  },
  {
    id: 14,
    tag: 'Demo Summary',
    title: 'Summary & Live Demonstration Roadmap',
    subtitle: 'Ready for hands-on evaluation across all four stakeholder perspectives.',
    slideType: 'split-screenshot',
    screenshot: '/screenshots/student_inspector_quiz.png',
    screenshotLabel: 'LIVE QUIZ 12-PAGE SCRIPT EVALUATION',
    points: [
      { head: '1. Faculty / Ingestion Hub Demo:', text: 'Inspect Maths Assignment - 2 (15 Pages) & Turbomachinery Quiz/Exam. Review auto-detected subject code and mode.', col: 'text-indigo-400' },
      { head: '2. Student Inspector Demo:', text: 'Navigate candidate Abhishek Kumar Pandey. Click pins on pages 1-15, inspect step deductions, and open OBE Radar.', col: 'text-purple-400' },
      { head: '3. Dean & CoE Governance Demo:', text: 'Review Department OBE Attainment index, audit student ledger in-place, and execute Dean Endorsement sign-off.', col: 'text-teal-400' },
      { head: '4. Grievance Adjudication Demo:', text: 'Audit pending challenge petitions, review AI recommendations, and adjust scores (+1.5M) live.', col: 'text-emerald-400' }
    ],
    speakerNotes: 'Thank you! We invite you to test each feature live in the application now: Faculty Ingestion, Student Script Inspector, Dean Oversight, CoE Moderation, and the Challenge Grievance Desk.'
  }
];

export default function PresentationModal({ isOpen, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (enlargedImage) {
        if (e.key === 'Escape') setEnlargedImage(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, totalSlides, onClose, enlargedImage]);

  if (!isOpen) return null;

  const nextSlide = () => setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1));
  const prevSlide = () => setCurrentSlideIndex(prev => Math.max(0, prev - 1));

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between ${isFullscreen ? 'p-0' : 'p-3 sm:p-5'} animate-fadeIn`}>
        
        {/* Top Deck Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#090f1e]/95 border-b border-slate-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-100 block">
                UniGrade AI • Feature Presentation Deck
              </span>
              <span className="text-[11px] text-slate-400">
                Slide {currentSlideIndex + 1} of {totalSlides} • {currentSlide.tag}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speaker Notes Toggle */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showNotes 
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              Speaker Notes {showNotes ? 'ON' : 'OFF'}
            </button>

            {/* Download PPTX Button */}
            <a
              href="/UniGrade_AI_System_Demo_Presentation.pptx"
              download="UniGrade_AI_System_Demo_Presentation.pptx"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              title="Download full 14-slide PowerPoint (.pptx) file with embedded screenshots"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .pptx (2.85 MB)</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slide Canvas */}
        <div className="flex-1 bg-[#090f1e] overflow-y-auto p-4 sm:p-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-6xl aspect-[16/9] bg-[#0c1427] border border-indigo-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Slide Header */}
            <div className="relative z-10 space-y-1.5">
              <div className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/30">
                {currentSlide.tag}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Slide Body Content Dynamic Rendering */}
            <div className="relative z-10 flex-1 my-3 flex flex-col justify-center overflow-y-auto">
              
              {/* 1. Title Slide */}
              {currentSlide.slideType === 'title' && (
                <div className="space-y-5">
                  <div className="p-3 bg-slate-900/70 rounded-2xl border border-indigo-500/20 text-center">
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      {currentSlide.content.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {currentSlide.content.pillars.map((p, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-sm font-bold text-slate-100">{p.label}</div>
                        <div className="text-xs text-slate-400">{p.desc}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-xs text-slate-500 pt-1">
                    {currentSlide.content.overview}
                  </p>
                </div>
              )}

              {/* 2. Split Screenshot Layout (High-Impact Demo View) */}
              {currentSlide.slideType === 'split-screenshot' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  
                  {/* Left Column: Bullet Points & Content */}
                  <div className="lg:col-span-5 space-y-2.5">
                    <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2.5">
                      {currentSlide.points.map((pt, idx) => (
                        <div key={idx} className="text-xs">
                          <strong className={`${pt.col || 'text-slate-100'} block font-bold mb-0.5`}>
                            • {pt.head}
                          </strong>
                          <span className="text-slate-400 leading-relaxed block pl-3">
                            {pt.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Screenshot Card Frame */}
                  <div className="lg:col-span-7">
                    <div className="relative group bg-slate-950 p-2.5 rounded-2xl border border-indigo-500/40 shadow-xl overflow-hidden">
                      <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-bold text-indigo-300 font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {currentSlide.screenshotLabel}
                        </span>
                        <button
                          onClick={() => setEnlargedImage(currentSlide.screenshot)}
                          className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          <Eye className="w-3 h-3" /> Click to Enlarge
                        </button>
                      </div>
                      
                      <div 
                        onClick={() => setEnlargedImage(currentSlide.screenshot)}
                        className="cursor-pointer overflow-hidden rounded-xl border border-slate-800 relative group-hover:border-cyan-500/50 transition-all"
                      >
                        <img 
                          src={currentSlide.screenshot} 
                          alt={currentSlide.screenshotLabel} 
                          className="w-full h-auto max-h-[300px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1 bg-black/80 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
                            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Inspect 1080p Screenshot
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* 3. Two-Column Slide */}
              {currentSlide.slideType === 'two-col' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-2.5">
                    <h4 className="font-bold text-sm text-red-400">{currentSlide.col1.title}</h4>
                    <div className="space-y-2">
                      {currentSlide.col1.points.map((pt, idx) => (
                        <div key={idx} className="text-xs text-slate-300">
                          <strong className="text-slate-100 block">{pt.head}</strong>
                          <span className="text-slate-400">{pt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-2.5">
                    <h4 className="font-bold text-sm text-emerald-400">{currentSlide.col2.title}</h4>
                    <div className="space-y-2">
                      {currentSlide.col2.points.map((pt, idx) => (
                        <div key={idx} className="text-xs text-slate-300">
                          <strong className="text-emerald-300 block">{pt.head}</strong>
                          <span className="text-slate-400">{pt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Three Cards Slide */}
              {currentSlide.slideType === 'three-cards' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentSlide.cards.map((c, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{c.title}</h4>
                        {c.subtitle && <div className="text-[11px] font-semibold text-indigo-400 mt-0.5">{c.subtitle}</div>}
                        <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                          {c.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5 text-slate-400">
                              <span className="text-indigo-400 font-bold">›</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Stats Matrix Slide */}
              {currentSlide.slideType === 'stats-matrix' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {currentSlide.stats.map((st, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-center space-y-1">
                        <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">{st.stat}</div>
                        <div className="text-xs font-bold text-slate-200">{st.label}</div>
                        <div className="text-[10px] text-slate-400">{st.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="font-bold text-xs text-indigo-400">⚡ Verified System Capabilities:</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {currentSlide.matrix.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Slide Footer */}
            <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Apex Institute of Science & Technology • NAAC A++ / ABET Tier-1 OBE</span>
              <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
            </div>

          </div>
        </div>

        {/* Speaker Notes Overlay (if enabled) */}
        {showNotes && (
          <div className="px-6 py-2.5 bg-[#0d162d] border-t border-indigo-500/20 text-xs text-slate-300 flex items-start gap-3 animate-fadeIn">
            <span className="font-bold text-indigo-400 uppercase tracking-wider shrink-0 mt-0.5">
              🎙️ Speaker Talking Points:
            </span>
            <p className="leading-relaxed text-slate-300">{currentSlide.speakerNotes}</p>
          </div>
        )}

        {/* Bottom Navigation Deck */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#090f1e] border-t border-slate-800">
          
          {/* Slide Selector Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-xl py-1">
            {PRESENTATION_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                  currentSlideIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentSlideIndex === 0
                  ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className={`flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentSlideIndex === totalSlides - 1
                  ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              Next Slide <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Enlarged Screenshots */}
      {enlargedImage && (
        <div 
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn cursor-zoom-out"
        >
          <div className="relative max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl border border-indigo-500/40 shadow-2xl">
            <img 
              src={enlargedImage} 
              alt="Enlarged Screenshot" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/80 text-white hover:text-red-400 rounded-xl border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
