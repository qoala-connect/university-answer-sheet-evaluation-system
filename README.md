# 🏛️ UniGrade AI • University Examination & Evaluation System

An institutional AI-powered web platform designed for automated, fair, and transparent evaluation of university-level handwritten examination booklets. Tailored for higher education institutions, autonomous universities, and engineering faculties, **UniGrade AI** integrates **Multimodal Vision Intelligence (Gemini 2.5 Flash / 1.5 Pro)** with **Outcome-Based Education (OBE)** to assess complex mathematical derivations, algorithms, and system design proofs against rigorous university academic ordinances.

---

## 🌟 University-Grade Features

### 👨‍🏫 1. Faculty / Chief Examiner Perspective
- **Cohort Ledger & Analytics Dashboard**: Class average, pass rates, Gaussian letter-grade distribution curve (S, A, B, C, D, F), and candidate roll search by USN.
- **Outcome-Based Education (OBE) Radar**: Live tracking of Course Outcomes (CO1 through CO4) and Bloom’s Taxonomy levels (Understand, Apply, Analyze, Evaluate) compliant with ABET Tier-1 and NBA accreditation guidelines.
- **Booklet Ingestion & Vision Extraction Hub**: Automated barcode / USN reading, deskewing, and multimodal OCR for handwritten derivations, mathematical matrices (e.g., Banker's Algorithm), and POSIX concurrency pseudocode.
- **Curricular Rubric & Ordinance Configurator**: Fine-tune LaTeX math verification strictness, diagram credit weightage, step-marking credit, and moderation variance tolerance (±5%).
- **Re-Evaluation & Grievance Desk**: Adjudicate formal candidate challenge evaluation petitions with dual-evaluator moderation deltas, AI recommendations, and live score adjustment updating the institutional ledger.

### 🏛️ 2. Controller of Examinations (CoE) Executive Perspective
- **Institutional Moderation Console**: Monitor dual-evaluator score variance, inspect borderline pass/fail candidates, and review regulatory audit compliance.
- **Academic Moderation Curve Adjuster**: Apply institutional grace moderation offsets under University Ordinance Section 12(b).
- **Official Ledger Certification & Seal**: Formal digital certification and result publishing with confetti validation.

### 🧑‍🎓 3. University Scholar / Student Perspective
- **Annotated Booklet Script Inspector**: Inspect scanned handwritten answer scripts with inline AI optical verification tags, step-marking credit justifications, and deduction breakdowns.
- **Academic Performance & OBE Proficiency Hub**: View personal Course Outcome mastery vs cohort averages and minimum ABET targets.
- **Formal Challenge Evaluation Petition Desk**: Submit official re-assessment appeals citing specific mathematical step lines, docket generation, and institutional fee confirmation tracking.

---

## 💻 Curricular Content Included
- **Course**: `CS-301: Operating Systems & Distributed Architecture` (4 Credits, Semester V, B.Tech Honors)
- **Examination Blueprint (75 Marks)**:
  - **Part A (15 Marks)**: Conceptual & Architectural Proofs (Coffman Deadlock Conditions, Belady’s Anomaly & Stack Algorithms, Mode Switch vs Context Switch Hardware Registers).
  - **Part B (30 Marks)**: Analytical Derivations & Algorithmic Problem Solving (Banker’s Deadlock Avoidance Safety Matrices, POSIX Semaphore Producer-Consumer Deadlock Proof, 2-Level Paging EMAT with TLB Hit Ratio Derivation).
  - **Part C (30 Marks)**: Comprehensive System Design (Demand Paging & Inverted Page Table Trap Lifecycle, Raft Distributed Consensus & Split-Brain Quorum Safety).

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Data Visualization**: [Recharts 2](https://recharts.org/) (Gaussian curves, OBE Radars, comparative bar charts)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: `canvas-confetti`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- npm or yarn

### Installation & Launch

1. Navigate to the university project directory:
   ```bash
   cd university-evaluation-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server (configured for port **3005** to avoid port collision):
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:3005
   ```

---

## 📂 Project Structure

```
university-evaluation-system/
├── public/
│   ├── answer_sheet_1.jpg          # Sample handwritten university booklet
│   ├── answer_sheet_2.jpg          # Sample candidate script with deductions
│   └── question_paper_1.jpg        # Master university exam paper blueprint
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── UniversityHeader.jsx          # Institutional header & accreditation tags
│   │   │   ├── PerspectiveToggle.jsx         # Faculty / CoE / Student 3-way toggle
│   │   │   └── DepartmentCourseSelector.jsx  # Department & course switcher
│   │   ├── FacultyView/
│   │   │   ├── FacultyDashboard.jsx          # Cohort ledger, Gaussian curve, OBE radar
│   │   │   ├── ScriptIngestionHub.jsx        # Booklet ingestion, barcode OCR, batch mode
│   │   │   ├── CurriculumRubricConfig.jsx    # University rubric & AI model rules
│   │   │   └── ModerationGrievanceDesk.jsx   # Challenge petition arbitration
│   │   ├── CoEView/
│   │   │   └── CoEDashboard.jsx              # Institutional moderation & certification
│   │   └── StudentView/
│   │       ├── AnnotatedScriptInspector.jsx  # Scanned booklet deep inspector
│   │       ├── AcademicPerformanceHub.jsx    # OBE attainment & petition tracking
│   │       └── ChallengeEvaluationModal.jsx  # Formal petition filing modal
│   ├── data/
│   │   └── universityMockData.js             # Higher-ed data store (OBE, students, rubrics)
│   ├── App.jsx                               # Multi-perspective state orchestrator
│   ├── main.jsx                              # React mount entry
│   └── index.css                             # Institutional styling & animations
├── index.html                                # University portal HTML shell
├── package.json                              # Configured for port 3005
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```
