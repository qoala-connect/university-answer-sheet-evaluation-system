// Central Data Store for University Examination & Evaluation System (UniGrade AI)

export const UNIVERSITY_INFO = {
  name: "Apex Institute of Science & Technology",
  subtitle: "Autonomous Institution • Established by Act of Legislature",
  accreditation: "NAAC A++ Accredited • ABET Computing Commission Aligned • NBA Tier-1",
  session: "End-Semester Examinations — Autumn / Fall 2026",
  office: "Office of the Controller of Examinations (CoE)"
};

export const UNIVERSITY_DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science & Engineering', code: 'CSE' },
  { id: 'ece', name: 'Electronics & Communication Engineering', code: 'ECE' },
  { id: 'aids', name: 'Artificial Intelligence & Data Science', code: 'AI&DS' },
  { id: 'mech', name: 'Mechanical & Aerospace Engineering', code: 'MAE' }
];

export const UNIVERSITY_COURSES = [
  { 
    id: 'physics_motion', 
    name: 'Physics: Motion (Grade 9)', 
    code: 'PHY-M1', 
    departmentId: 'basic_sciences',
    department: 'Department of Physics',
    credits: 3, 
    semester: 'Grade 9',
    degree: 'Secondary Sciences',
    icon: '🏃',
    maxMarks: 25,
    examDate: 'Final Assessment (Evaluated)',
    chiefExaminer: 'Class Teacher'
  },
  { 
    id: 'math_12', 
    name: 'Mathematics (Grade 12)', 
    code: 'MTH-201', 
    departmentId: 'math',
    department: 'Department of Mathematics',
    credits: 4, 
    semester: 'Grade 12',
    degree: 'Higher Secondary',
    icon: '📐',
    maxMarks: 50,
    examDate: 'Board Prep Exam',
    chiefExaminer: 'Senior Faculty'
  },
  { 
    id: 'chem_11', 
    name: 'Chemistry (Grade 11)', 
    code: 'CHM-102', 
    departmentId: 'chem',
    department: 'Department of Chemistry',
    credits: 4, 
    semester: 'Grade 11',
    degree: 'Higher Secondary',
    icon: '🧪',
    maxMarks: 50,
    examDate: 'Midterm Assessment',
    chiefExaminer: 'Faculty Chem'
  },
  { 
    id: 'math_202', 
    name: 'MATH-202: Linear Algebra and Matrix Theory', 
    code: 'MATH-202', 
    departmentId: 'cse',
    department: 'Mathematics & Computing',
    credits: 4, 
    semester: 'Semester III',
    degree: 'B.Tech (Hons)',
    icon: '📐',
    maxMarks: 75,
    examDate: 'Assignment - 2 (Evaluated)',
    chiefExaminer: 'Prof. Dr. Gilbert Strang / Chair Ramanujan'
  },
  { 
    id: 'me_617', 
    name: 'ME-617: Advanced Theory of Turbomachinery', 
    code: 'ME-617', 
    departmentId: 'mech',
    department: 'Mechanical & Aerospace Engineering',
    credits: 4, 
    semester: 'Semester VI',
    degree: 'B.Tech / M.Tech (Dual)',
    icon: '🌀',
    maxMarks: 75,
    examDate: 'Quiz 2 & Final Exam (Evaluated)',
    chiefExaminer: 'Prof. Dr. Turbomachinery Chair & Gemini 3.6 Multimodal Engine'
  },
  { 
    id: 'cs_301', 
    name: 'CS-301: Operating Systems & Distributed Architecture', 
    code: 'CS-301', 
    departmentId: 'cse',
    department: 'Computer Science & Engg',
    credits: 4, 
    semester: 'Semester V',
    degree: 'B.Tech (Hons)',
    icon: '💻',
    maxMarks: 75,
    examDate: 'Oct 24, 2026',
    chiefExaminer: 'Prof. Dr. Arvind Krishnamurthy, Ph.D.'
  },
  { 
    id: 'cs_304', 
    name: 'CS-304: Design & Analysis of Algorithms', 
    code: 'CS-304', 
    departmentId: 'cse',
    department: 'Computer Science & Engg',
    credits: 4, 
    semester: 'Semester V',
    degree: 'B.Tech (Hons)',
    icon: '⚡',
    maxMarks: 75,
    examDate: 'Oct 28, 2026',
    chiefExaminer: 'Dr. Meenakshi Sundaram'
  },
  { 
    id: 'ai_402', 
    name: 'AI-402: Deep Learning & Neural Architectures', 
    code: 'AI-402', 
    departmentId: 'aids',
    department: 'AI & Data Science',
    credits: 4, 
    semester: 'Semester VII',
    degree: 'B.Tech (Hons)',
    icon: '🧠',
    maxMarks: 75,
    examDate: 'Nov 02, 2026',
    chiefExaminer: 'Dr. Rajeshwari Swaminathan'
  },
  { 
    id: 'ee_204', 
    name: 'EE-204: Signals and Linear Systems', 
    code: 'EE-204', 
    departmentId: 'ece',
    department: 'Electronics & Communication',
    credits: 3, 
    semester: 'Semester IV',
    degree: 'B.Tech (Hons)',
    icon: '📡',
    maxMarks: 75,
    examDate: 'Nov 06, 2026',
    chiefExaminer: 'Prof. K. Venkatesh'
  }
];

export const COURSE_OUTCOMES = [
  { id: 'CO1', code: 'CO1', desc: 'Process Scheduling, Concurrency & Thread Synchronization', bloomLevel: 'L3 - Apply', targetAttainment: 75 },
  { id: 'CO2', code: 'CO2', desc: 'Deadlock Avoidance, Banker\'s Algorithm & Resource Allocation', bloomLevel: 'L4 - Analyze', targetAttainment: 70 },
  { id: 'CO3', code: 'CO3', desc: 'Virtual Memory, Multi-tier Paging & TLB Hit Calculations', bloomLevel: 'L4 - Analyze', targetAttainment: 72 },
  { id: 'CO4', code: 'CO4', desc: 'Distributed File Systems & Raft Consensus Architecture', bloomLevel: 'L5 - Evaluate', targetAttainment: 65 }
];

export const AI_MODELS = [
  { 
    id: 'gemini-3.6-flash', 
    name: 'Gemini 3.6 Multimodal Flash (Recommended)', 
    provider: 'Google DeepMind',
    speed: 'Ultra Fast (~0.9s/script)', 
    accuracy: '99.8%',
    capabilities: [
      'Gemini 3.6 Native Multimodal Vision Engine',
      'High-Speed Handwritten OCR & LaTeX Transcription', 
      'Mathematical Derivation & Step-Credit Verification', 
      'Engineering Schematics & Cascade Diagram Recognition',
      'OBE Course Outcome Mapping & Bloom Level Tagging'
    ],
    defaultRigor: 'University Standard'
  },
  { 
    id: 'gemini-3.6-pro', 
    name: 'Gemini 3.6 Pro Academic Rigor', 
    provider: 'Google DeepMind',
    speed: 'Deep Multimodal Reasoning (~1.8s/script)', 
    accuracy: '99.9%',
    capabilities: [
      'Gemini 3.6 Deep Multimodal Reasoning',
      'Formal Mathematical Proof & Tensor Derivations', 
      'Thermodynamic Cascades & Velocity Triangle Parsing', 
      'Strict Step-Credit Deductions & Dual Moderation Audit', 
      'Dean Quality Assurance & ABET Attainment Ledger'
    ],
    defaultRigor: 'Pedantic'
  },
  { 
    id: 'deepeval-uni-v3', 
    name: 'UniGrade DeepEval-v3 (Fine-Tuned for Engineering)', 
    provider: 'Institutional Cluster Model',
    speed: 'Realtime (~0.7s/script)', 
    accuracy: '98.4%',
    capabilities: [
      'Automated Barcode/USN Extraction', 
      'Deterministic Rubric Matching', 
      'Fast Cohort Batch Ingestion'
    ],
    defaultRigor: 'Strict'
  }
];

export const DEFAULT_UNIVERSITY_SCHEMAS = {
  'physics_motion': {
    courseId: 'physics_motion',
    selectedModel: 'gemini-3.6-flash',
    strictness: 'Moderate',
    stepMarkingEnabled: true,
    spellingPenalty: false,
    diagramCreditPercent: 30,
    customDirective: `Evaluate Grade 9 motion answers with focus on:
1. Correct definitions using precise physics terminology.
2. Formulas written explicitly before substitution.
3. Proper SI units attached to final numerical answers.
4. Conceptual clarity over exact textbook phrasing.`,
    maxTotalMarks: 25,
    sections: [
      {
        sectionName: 'Section A: Short Definitions (10 Marks)',
        questions: [
          {
            qNo: 'Q1',
            question: 'Define uniform motion.',
            type: 'Descriptive',
            maxMarks: 2,
            modelAnswer: 'Motion in which an object covers equal distances in equal intervals of time.',
            rubricBreakdown: [
              { criteria: 'States equal distances', points: 1 },
              { criteria: 'States equal intervals of time', points: 1 }
            ]
          },
          {
            qNo: 'Q2',
            question: 'Distinguish between speed and velocity.',
            type: 'Descriptive',
            maxMarks: 2,
            modelAnswer: 'Speed = distance/time (scalar); Velocity = displacement/time and includes direction (vector).',
            rubricBreakdown: [
              { criteria: 'Speed defined as distance over time', points: 1 },
              { criteria: 'Velocity defined with direction / displacement', points: 1 }
            ]
          },
          {
            qNo: 'Q3',
            question: 'What does an odometer measure?',
            type: 'Descriptive',
            maxMarks: 2,
            modelAnswer: 'The total distance travelled by a vehicle.',
            rubricBreakdown: [
              { criteria: 'Identifies distance travelled', points: 1 },
              { criteria: 'Specifies total distance by a vehicle', points: 1 }
            ]
          },
          {
            qNo: 'Q4',
            question: 'Define uniform circular motion.',
            type: 'Descriptive',
            maxMarks: 2,
            modelAnswer: 'Motion of an object along a circular path at constant speed.',
            rubricBreakdown: [
              { criteria: 'Mentions circular path', points: 1 },
              { criteria: 'Mentions constant speed', points: 1 }
            ]
          },
          {
            qNo: 'Q5',
            question: 'Define acceleration and state its SI unit.',
            type: 'Descriptive',
            maxMarks: 2,
            modelAnswer: 'Acceleration is the rate of change of velocity with time. SI unit = m/s².',
            rubricBreakdown: [
              { criteria: 'Rate of change of velocity', points: 1 },
              { criteria: 'SI unit stated as m/s²', points: 1 }
            ]
          }
        ]
      },
      {
        sectionName: 'Section B: Numerical Problems (15 Marks)',
        questions: [
          {
            qNo: 'Q6',
            question: 'A farmer walks 10 m east and 10 m north. Calculate his displacement.',
            type: 'Numerical',
            maxMarks: 5,
            modelAnswer: 'Displacement = √(10² + 10²) = √200 = 14.14 m (north-east).',
            rubricBreakdown: [
              { criteria: 'Applies Pythagoras to perpendicular legs', points: 2 },
              { criteria: 'Correct substitution and arithmetic', points: 2 },
              { criteria: 'Final answer 14.14 m with unit', points: 1 }
            ]
          },
          {
            qNo: 'Q7',
            question: 'An odometer reads 2000 km then 2400 km over 8 hours. Calculate the average speed in m/s.',
            type: 'Numerical',
            maxMarks: 5,
            modelAnswer: 'Average speed = total distance / total time = 400 km / 8 h = 50 km/h = 13.9 m/s.',
            rubricBreakdown: [
              { criteria: 'Average speed formula stated', points: 2 },
              { criteria: 'Correct distance (400 km) and time (8 h)', points: 2 },
              { criteria: 'Converted to 13.9 m/s with unit', points: 1 }
            ]
          },
          {
            qNo: 'Q8',
            question: 'A body changes velocity uniformly. Calculate its acceleration.',
            type: 'Numerical',
            maxMarks: 5,
            modelAnswer: 'a = (v - u)/t = 0.0185 m/s².',
            rubricBreakdown: [
              { criteria: 'Acceleration formula a = (v - u)/t stated', points: 2 },
              { criteria: 'Correct substitution of initial and final velocity', points: 2 },
              { criteria: 'Final answer 0.0185 m/s² with unit', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  'math_202': {
    courseId: 'math_202',
    selectedModel: 'gemini-3.6-flash',
    strictness: 'University Standard',
    stepMarkingEnabled: true,
    latexMathVerification: true,
    diagramCreditPercent: 30,
    moderationTolerancePercent: 5,
    customDirective: `Evaluate University Linear Algebra Assignment Scripts adhering strictly to:
1. Matrix transformations, Gaussian elimination row steps, and rank computation carry 30% weight.
2. Gram-Schmidt orthogonalization inner products, norm derivations, and orthogonal complement distances carry 30% weight.
3. Characteristic polynomial roots, algebraic vs geometric multiplicity, and spectral decomposition A = Q D Q^T carry 20% weight.
4. Quadratic form coordinate transformations y = Bx, principal axes, canonical form of conics, and hand-drawn geometric sketches carry 20% weight.
5. Award full step marks for legitimate alternative basis paths (e.g. choice of free variables). Deduct 0.5 - 1.0 mark for omitted units or normalization factors.`,
    maxTotalMarks: 75,
    sections: [
      {
        sectionName: 'Question 1: Gaussian Elimination, Fundamental Subspaces & Gram-Schmidt Distances (25 Marks)',
        questions: [
          {
            qNo: 'Q1(a)',
            co: 'CO1',
            bloom: 'L3',
            question: 'Given the 3x3 matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Using Gaussian elimination, find the rank, null space, column space, and left null space of matrix A, along with their respective dimensions and bases.',
            type: 'Matrix Subspace Derivation',
            maxMarks: 12,
            modelAnswer: '1. Gaussian elimination reduces A to RREF [1, 0, -1; 0, 1, 2; 0, 0, 0]. Rank(A) = 2.\n2. Row Space: Basis {[1, 0, -1]ᵀ, [0, 1, 2]ᵀ}, Dim = 2.\n3. Null Space N(A): x1 - x3 = 0, x2 + 2x3 = 0 => Basis {[1, -2, 1]ᵀ}, Dim = 1.\n4. Column Space C(A): Row reduce Aᵀ to find pivot rows/columns. Basis {[1, 0, -1]ᵀ, [0, 1, 2]ᵀ}, Dim = 2.\n5. Left Null Space N(Aᵀ): Basis {[1, -2, 1]ᵀ}, Dim = 1.',
            rubricBreakdown: [
              { criteria: 'Row operations and RREF derivation', points: 3 },
              { criteria: 'Rank and row space basis & dimension', points: 3 },
              { criteria: 'Null space basis & dimension calculation', points: 3 },
              { criteria: 'Column space and left null space bases & dimensions', points: 3 }
            ]
          },
          {
            qNo: 'Q1(b)',
            co: 'CO2',
            bloom: 'L4',
            question: 'Consider the point P = (1, 3, 2) in ℝ³. Using the Gram-Schmidt orthogonalization process on the basis vectors of the row space, compute the orthogonal and orthonormal basis vectors, and find the perpendicular distance of point P from the row space and the null space of A.',
            type: 'Gram-Schmidt & Distance Proof',
            maxMarks: 13,
            modelAnswer: '1. Gram-Schmidt on row basis u1=(1, 0, -1), u2=(0, 1, 2):\n- v1 = (1, 0, -1), ||v1||² = 2\n- v2 = u2 - [(u2·v1)/||v1||²]v1 = (0, 1, 2) - [(-2)/2](1, 0, -1) = (1, 1, 1). Check: v1·v2 = 0.\n- Orthonormal: e1 = (1/√2)(1, 0, -1), e2 = (1/√3)(1, 1, 1).\n2. Distance from Row Space: proj_Row(P) = (-1/2)(1, 0, -1) + 2(1, 1, 1) = (3/2, 2, 5/2).\nNormal vector v3 = P - proj = (-1/2, 1, -1/2).\nd1 = ||v3|| = √(1/4 + 1 + 1/4) = √(3/2) ≈ 1.2247.\n3. Distance from N(A): Proj on (1, -2, 1) gives normal v4 = (3/2, 2, 5/2).\nd2 = ||v4|| = √(50/4) = 5√2/2 ≈ 3.5355.\nNotice d1² + d2² = 3/2 + 50/4 = 14 = ||P||² (Orthogonal decomposition holds).',
            rubricBreakdown: [
              { criteria: 'Gram-Schmidt orthogonal vectors v1, v2', points: 4 },
              { criteria: 'Orthonormal vectors e1, e2', points: 2 },
              { criteria: 'Perpendicular distance from row space d1 = √(3/2) = 1.2247', points: 4 },
              { criteria: 'Perpendicular distance from null space d2 = √(50/4) = 3.5355', points: 3 }
            ]
          }
        ]
      },
      {
        sectionName: 'Question 2: Symmetric Matrices, Eigenspaces & Spectral Decomposition (25 Marks)',
        questions: [
          {
            qNo: 'Q2(a)',
            co: 'CO3',
            bloom: 'L4',
            question: 'Given the symmetric 3x3 matrix A = [[3, 2, 4], [2, 0, 2], [4, 2, 3]]. Find the characteristic equation, eigenvalues, and the corresponding eigenvectors of matrix A.',
            type: 'Spectral Eigen-Analysis',
            maxMarks: 12,
            modelAnswer: '1. Characteristic Equation: det(A - λI) = -λ³ + 6λ² + 15λ + 8 = 0 => (λ + 1)²(λ - 8) = 0.\nEigenvalues: λ1 = -1 (multiplicity 2), λ2 = 8 (multiplicity 1).\n2. Eigenspace for λ = -1: [A + I]x = 0 => 2x1 + x2 + 2x3 = 0. Basis: {[1, -2, 0]ᵀ, [0, -2, 1]ᵀ}, Dim = 2.\n3. Eigenspace for λ = 8: [A - 8I]x = 0 => Eigenvector [2, 1, 2]ᵀ (orthogonal to E(-1)).',
            rubricBreakdown: [
              { criteria: 'Characteristic equation expansion -λ³ + 6λ² + 15λ + 8 = 0', points: 4 },
              { criteria: 'Eigenvalues λ = -1 (multiplicity 2) and λ = 8', points: 3 },
              { criteria: 'Linearly independent eigenvectors for repeated eigenvalue -1', points: 3 },
              { criteria: 'Eigenvector for λ = 8', points: 2 }
            ]
          },
          {
            qNo: 'Q2(b)',
            co: 'CO3',
            bloom: 'L4',
            question: 'Apply the Gram-Schmidt process to find an orthonormal set of eigenvectors, and express the matrix A in its spectral/diagonalized decomposition form A = QDQᵀ.',
            type: 'Orthonormal Spectral Decomposition',
            maxMarks: 13,
            modelAnswer: '1. Gram-Schmidt on eigenspace vectors: α1 = (1, -2, 0), α2 = (2, 1, 2), α3 = (-4/5, -2/5, 1).\n2. Normalization gives columns of Q: q1 = (1/√5)[1, -2, 0]ᵀ, q2 = (1/3)[2, 1, 2]ᵀ, q3 = (1/(3√5))[-4, -2, 5]ᵀ.\n3. Diagonal matrix D = diag(-1, 8, -1).\n4. Spectral product verification: Q D Qᵀ = [[3, 2, 4], [2, 0, 2], [4, 2, 3]] = A.',
            rubricBreakdown: [
              { criteria: 'Gram-Schmidt orthogonalization on eigenspace E(-1)', points: 4 },
              { criteria: 'Normalization of all 3 eigenvectors to unit length', points: 3 },
              { criteria: 'Construction of orthogonal matrix Q and diagonal D', points: 3 },
              { criteria: 'Verification of spectral decomposition identity A = QDQᵀ', points: 3 }
            ]
          }
        ]
      },
      {
        sectionName: 'Question 3: Quadratic Form Transformations, Conic Sections & Principal Axes (25 Marks)',
        questions: [
          {
            qNo: 'Q3(a)',
            co: 'CO4',
            bloom: 'L4',
            question: 'Let a quadratic curve be defined by xᵀAx = C. Show that under a linear transformation given by y = Bx, the transformed equation of the curve becomes yᵀPy = C, where P = (B⁻¹)ᵀAB⁻¹.',
            type: 'Linear Transformation Proof',
            maxMarks: 8,
            modelAnswer: '1. Given: xᵀAx = C and y = Bx => x = B⁻¹y.\n2. Transpose identity: xᵀ = (B⁻¹y)ᵀ = yᵀ(B⁻¹)ᵀ.\n3. Substitute into curve: [yᵀ(B⁻¹)ᵀ] A [B⁻¹y] = C => yᵀ[(B⁻¹)ᵀAB⁻¹]y = C.\n4. Setting P = (B⁻¹)ᵀAB⁻¹ gives yᵀPy = C (Q.E.D.).',
            rubricBreakdown: [
              { criteria: 'Inverse transformation substitution x = B⁻¹y', points: 2 },
              { criteria: 'Transpose rule application (B⁻¹y)ᵀ = yᵀ(B⁻¹)ᵀ', points: 2 },
              { criteria: 'Substitution into quadratic matrix form', points: 2 },
              { criteria: 'Formal definition of matrix P and conclusion', points: 2 }
            ]
          },
          {
            qNo: 'Q3(b)-Part 1',
            co: 'CO4',
            bloom: 'L5',
            question: 'Consider the unit circle equation xᵀx = 1 in ℝ² transformed by B = [[2, 2], [2, -1]]. 1. Find the resulting quadratic equation in canonical/standard form.',
            type: 'Quadratic Equation Derivation',
            maxMarks: 8,
            modelAnswer: '1. Circle: xᵀx = 1 => A = I_2, C = 1.\n2. B = [[2, 2], [2, -1]], det(B) = -6 => B⁻¹ = [[1/6, 1/3], [1/3, -1/3]].\n3. P = (B⁻¹)ᵀ I B⁻¹ = [[5/36, -1/18], [-1/18, 2/9]].\n4. Transformed equation: yᵀPy = 1 => (5/36)y1² + (2/9)y2² - (2/18)y1y2 = 1 => 5y1² + 8y2² - 4y1y2 = 36.',
            rubricBreakdown: [
              { criteria: 'Inverse matrix B⁻¹ computation', points: 3 },
              { criteria: 'Matrix product P = (B⁻¹)ᵀ B⁻¹', points: 3 },
              { criteria: 'Standard transformed quadratic equation 5y1² + 8y2² - 4y1y2 = 36', points: 2 }
            ]
          },
          {
            qNo: 'Q3(b)-Part 2',
            co: 'CO4',
            bloom: 'L5',
            question: '2. Determine the principal axes (eigenvectors and eigenvalues) of the resulting conic section (ellipse), and sketch the geometric transformation showing the original circle and the transformed ellipse.',
            type: 'Principal Axis & Geometric Diagram',
            maxMarks: 9,
            modelAnswer: '1. Symmetric matrix A\\\' = [[5, -2], [-2, 8]], characteristic equation λ² - 13λ + 36 = 0 => λ1 = 9, λ2 = 4.\\n2. Principal Axes: Eigenvector [1, -2]ᵀ for λ=9 (line y2 = -2y1); Eigenvector [2, 1]ᵀ for λ=4 (line y1 = 2y2).\\n3. Canonical form: 9z1² + 4z2² = 36 => z1²/4 + z2²/9 = 1 => z1²/2² + z2²/3² = 1 (Semi-axes a=3 along y1=2y2, b=2 along y2=-2y1).\\n4. Geometric Sketch: Tilted ellipse centered at origin with principal axes labeled along lines y1=2y2 and y2=-2y1, enclosing original unit circle.',
            rubricBreakdown: [
              { criteria: 'Eigenvalues λ1 = 9, λ2 = 4 of quadratic form matrix', points: 2 },
              { criteria: 'Principal axes directions y1 = 2y2 and y2 = -2y1', points: 2 },
              { criteria: 'Canonical ellipse equation z1²/4 + z2²/9 = 1', points: 2 },
              { criteria: 'Semi-axes dimensions (a=3, b=2) and hand-drawn geometric transformation sketch', points: 3 }
            ]
          }
        ]
      }
    ]
  },
  'cs_301': {
    courseId: 'cs_301',
    selectedModel: 'gemini-3.6-flash',
    strictness: 'University Standard', // Lenient, University Standard, Strict, Pedantic
    stepMarkingEnabled: true,
    latexMathVerification: true,
    diagramCreditPercent: 25,
    moderationTolerancePercent: 5,
    customDirective: `Evaluate University Engineering Answer Scripts adhering strictly to:
1. Mathematical notation & step-by-step state matrices must carry 60% of question marks.
2. For algorithms (e.g. Banker's, Semaphores), verify race condition safety and termination proofs.
3. In multi-level paging calculations, deduct 1.0 mark for omitted units (nanoseconds/microseconds) or unsimplified fractions.
4. Award full step marks if student employs valid alternate mathematical safe sequence paths.
5. Map awarded scores to designated Course Outcomes (CO1-CO4) for ABET accreditation records.`,
    maxTotalMarks: 75,
    sections: [
      {
        sectionName: 'Part A: Architectural Foundations & Conceptual Proofs (Answer all 3)',
        questions: [
          {
            qNo: 'Q1',
            co: 'CO2',
            bloom: 'L2',
            question: 'Enumerate the four Coffman conditions necessary and sufficient for Deadlock occurrence. State how breaking Circular Wait prevents deadlocks.',
            type: 'Technical Short Answer',
            maxMarks: 5,
            modelAnswer: 'Four Coffman conditions:\n1. Mutual Exclusion: At least one resource must be non-shareable.\n2. Hold and Wait: A process holds at least one resource and is waiting to acquire additional resources held by other processes.\n3. No Preemption: Resources cannot be forcibly preempted; only released voluntarily.\n4. Circular Wait: A closed chain of processes exists where each process waits for a resource held by the next process.\nPrevention: Imposing a strict linear total ordering of all resource types and requiring processes to request resources in strictly increasing enumeration order guarantees absence of circular wait cycles.',
            rubricBreakdown: [
              { criteria: 'Correctly listing 4 Coffman conditions with precise definitions', points: 3 },
              { criteria: 'Explanation of linear resource ordering mechanism to break Circular Wait', points: 2 }
            ]
          },
          {
            qNo: 'Q2',
            co: 'CO3',
            bloom: 'L3',
            question: 'Define Belady\'s Anomaly in Virtual Memory Page Replacement. Identify which page replacement algorithms are immune to this anomaly and why.',
            type: 'Technical Short Answer',
            maxMarks: 5,
            modelAnswer: 'Belady\'s Anomaly is the phenomenon where increasing the number of allocated physical page frames results in an increase in the number of page faults for a given reference string.\nOccurrence: Predominantly observed in FIFO (First-In, First-Out) page replacement.\nImmunity: Stack Algorithms (such as LRU - Least Recently Used, and Optimal) are mathematically immune because the set of pages in an n-frame memory is always a strict subset of the set of pages in an (n+1)-frame memory at any time t.',
            rubricBreakdown: [
              { criteria: 'Accurate definition of Belady\'s Anomaly (faults increase with more frames)', points: 2 },
              { criteria: 'Identification of Stack Algorithms (LRU, Optimal) as immune', points: 2 },
              { criteria: 'Subset property mathematical inclusion property explanation', points: 1 }
            ]
          },
          {
            qNo: 'Q3',
            co: 'CO1',
            bloom: 'L2',
            question: 'Distinguish between a Process Context Switch and a CPU Mode Switch. What hardware state components must be preserved in the PCB?',
            type: 'Technical Short Answer',
            maxMarks: 5,
            modelAnswer: 'A Mode Switch switches the execution privilege between User Mode and Kernel Mode without changing the active process address space (e.g. during a system call). A Context Switch switches the CPU from executing one process to another, requiring invalidation/flushing of TLB and reloading page tables.\nPCB Hardware State Preserved: Program Counter (PC), CPU registers (General purpose, SP), Processor Status Word (flags), Page Table Base Register (CR3 in x86).',
            rubricBreakdown: [
              { criteria: 'Clear conceptual differentiation (Privilege switch vs Process change)', points: 2 },
              { criteria: 'Enumeration of saved hardware state (PC, SP, Regs, CR3/PTBR)', points: 3 }
            ]
          }
        ]
      },
      {
        sectionName: 'Part B: Analytical Derivations & Algorithmic Problem Solving (3 x 10 = 30 Marks)',
        questions: [
          {
            qNo: 'Q4',
            co: 'CO2',
            bloom: 'L4',
            question: 'A system has 5 processes (P0-P4) and 3 resource types (A:10, B:5, C:7). Given Allocation Matrix [P0:0,1,0; P1:2,0,0; P2:3,0,2; P3:2,1,1; P4:0,0,2] and Max Matrix [P0:7,5,3; P1:3,2,2; P2:9,0,2; P3:2,2,2; P4:4,3,3]. Derive Need Matrix, calculate Available vector, and determine whether the system is in a Safe State using Banker\'s Algorithm. Provide complete safety sequence.',
            type: 'Algorithmic Derivation',
            maxMarks: 10,
            modelAnswer: '1. Available Vector Calculation:\nTotal Allocated: A = 0+2+3+2+0 = 7; B = 1+0+0+1+0 = 2; C = 0+0+2+1+2 = 5.\nAvailable = Total - Allocated = (10-7, 5-2, 7-5) = (3, 3, 2).\n\n2. Need Matrix [Need = Max - Allocation]:\nP0: (7-0, 5-1, 3-0) = (7, 4, 3)\nP1: (3-2, 2-0, 2-0) = (1, 2, 2)\nP2: (9-3, 0-0, 2-2) = (6, 0, 0)\nP3: (2-2, 2-1, 2-1) = (0, 1, 1)\nP4: (4-0, 3-0, 3-2) = (4, 3, 1)\n\n3. Safety Algorithm Execution:\n- Step 1: P1 Need (1,2,2) <= Available (3,3,2) -> P1 finishes. New Available = (3,3,2) + (2,0,0) = (5, 3, 2).\n- Step 2: P3 Need (0,1,1) <= (5,3,2) -> P3 finishes. New Available = (5,3,2) + (2,1,1) = (7, 4, 3).\n- Step 3: P4 Need (4,3,1) <= (7,4,3) -> P4 finishes. New Available = (7,4,3) + (0,0,2) = (7, 4, 5).\n- Step 4: P0 Need (7,4,3) <= (7,4,5) -> P0 finishes. New Available = (7,4,5) + (0,1,0) = (7, 5, 5).\n- Step 5: P2 Need (6,0,0) <= (7,5,5) -> P2 finishes. New Available = (7,5,5) + (3,0,2) = (10, 5, 7).\nSafe Sequence: <P1, P3, P4, P0, P2> (Alternate valid sequence: <P3, P1, P4, P0, P2>).\nSystem is certified SAFE.',
            rubricBreakdown: [
              { criteria: 'Accurate derivation of Available vector (3, 3, 2)', points: 2 },
              { criteria: 'Accurate computation of full Need Matrix', points: 3 },
              { criteria: 'Step-by-step vector inequality checks & resource return per step', points: 3 },
              { criteria: 'Final valid safety sequence & state verification conclusion', points: 2 }
            ]
          },
          {
            qNo: 'Q5',
            co: 'CO1',
            bloom: 'L4',
            question: 'Design a deadlock-free and starvation-free synchronization solution for the Bounded-Buffer Producer-Consumer Problem using POSIX Semaphores. Provide C/pseudocode for both producer and consumer, explain initialization values for mutex, empty, and full semaphores, and prove why swapping wait(empty) and wait(mutex) causes deadlock.',
            type: 'Concurrency Proof & Code',
            maxMarks: 10,
            modelAnswer: '1. Semaphore Initialization:\nsem_t mutex; sem_init(&mutex, 0, 1); // Binary semaphore for mutual exclusion\nsem_t empty; sem_init(&empty, 0, BUFFER_SIZE); // Counting semaphore for empty slots\nsem_t full; sem_init(&full, 0, 0); // Counting semaphore for filled items\n\n2. Producer Code:\nwhile(1) {\n  item = produce_item();\n  wait(&empty);\n  wait(&mutex);\n  buffer[in] = item; in = (in + 1) % BUFFER_SIZE;\n  signal(&mutex);\n  signal(&full);\n}\n\n3. Consumer Code:\nwhile(1) {\n  wait(&full);\n  wait(&mutex);\n  item = buffer[out]; out = (out + 1) % BUFFER_SIZE;\n  signal(&mutex);\n  signal(&empty);\n  consume_item(item);\n}\n\n4. Deadlock Proof on Swapped Calls:\nIf a producer executes wait(mutex) first when the buffer is full (empty = 0):\n- Producer acquires mutex lock.\n- Producer blocks on wait(empty) since empty == 0.\n- Consumer now attempts to read, but blocks on wait(mutex) held by the blocked producer.\n- Both processes wait forever -> DEADLOCK.',
            rubricBreakdown: [
              { criteria: 'Correct semaphore initializations (mutex=1, empty=N, full=0)', points: 2 },
              { criteria: 'Producer and Consumer critical section synchronization pseudocode', points: 4 },
              { criteria: 'Rigorous formal proof of deadlock upon wait order inversion', points: 4 }
            ]
          },
          {
            qNo: 'Q6',
            co: 'CO3',
            bloom: 'L4',
            question: 'Consider a 2-level paging virtual memory system where Main Memory access time is 80 ns and Translation Lookaside Buffer (TLB) search time is 15 ns. (a) Derive the Effective Memory Access Time (EMAT) formula assuming a TLB Hit Ratio of 94%. (b) What minimum TLB Hit Ratio is required to maintain EMAT under 110 ns?',
            type: 'Mathematical Derivation',
            maxMarks: 10,
            modelAnswer: '(a) EMAT Formula for 2-Level Paging:\nIn a 2-level paging system, a TLB hit requires:\nTime_hit = TLB_search + Memory_access = 15 + 80 = 95 ns.\nA TLB miss requires accessing Level 1 Page Table, Level 2 Page Table, and physical memory operand (3 memory accesses total):\nTime_miss = TLB_search + (3 * Memory_access) = 15 + (3 * 80) = 15 + 240 = 255 ns.\nEMAT = [h * Time_hit] + [(1 - h) * Time_miss]\nFor h = 0.94:\nEMAT = [0.94 * 95] + [0.06 * 255] = 89.3 + 15.3 = 104.6 ns.\n\n(b) Required Hit Ratio for EMAT <= 110 ns:\n95h + 255(1 - h) <= 110\n95h + 255 - 255h <= 110\n-160h <= 110 - 255\n-160h <= -145 => h >= 145 / 160 => h >= 0.90625 (or 90.63% minimum hit ratio).',
            rubricBreakdown: [
              { criteria: 'Deriving hit time (95 ns) and 2-level miss time (3 memory lookups = 255 ns)', points: 4 },
              { criteria: 'Correct EMAT calculation for 94% hit ratio = 104.6 ns', points: 3 },
              { criteria: 'Inequality formulation and exact computation of required h >= 90.63%', points: 3 }
            ]
          }
        ]
      },
      {
        sectionName: 'Part C: Comprehensive System Architecture & Engineering Case Study (2 x 15 = 30 Marks)',
        questions: [
          {
            qNo: 'Q7',
            co: 'CO3',
            bloom: 'L5',
            question: 'Architect an end-to-end Demand Paging Virtual Memory Subsystem. Illustrate with a detailed architectural diagram the sequence of hardware trap operations during a Page Fault from operand reference to process resumption. Detail the roles of Dirty Bit (modify bit), Valid-Invalid bit, and secondary disk swap space.',
            type: 'System Design & Proof',
            maxMarks: 15,
            modelAnswer: '1. Page Fault Handling Sequence (6 Steps):\n(i) CPU executes memory operand instruction; MMU consults page table and detects Valid-Invalid bit = 0 (invalid/not in RAM).\n(ii) Hardware generates Page Fault Trap to OS kernel; CPU saves process registers and state in PCB.\n(iii) OS Kernel inspects internal table to verify valid reference; finds free physical memory frame (executing page replacement like LRU if needed).\n(iv) If victim frame has Dirty Bit = 1, write modified contents back to secondary swap partition on disk. If Dirty Bit = 0, overwrite directly without disk write.\n(v) Issue asynchronous disk I/O read to fetch desired page into allocated frame; process placed in Wait queue.\n(vi) Disk controller issues interrupt; OS updates page table (sets valid bit = 1, frame index, resets dirty bit); restores process state and restarts faulted instruction.\n\n2. Hardware Status Bits Significance:\n- Valid-Invalid Bit: Protects address space; triggers immediate trap if page is unmapped or on swap.\n- Dirty Bit: Reduces page-fault latency by 50% on clean pages by bypassing disk write-back.',
            rubricBreakdown: [
              { criteria: 'Complete 6-stage page fault execution cycle explanation', points: 6 },
              { criteria: 'Dirty bit disk optimization mechanism explanation', points: 3 },
              { criteria: 'Valid-invalid bit security & memory protection role', points: 3 },
              { criteria: 'Restarting instruction idempotency & atomic memory handling', points: 3 }
            ]
          },
          {
            qNo: 'Q8',
            co: 'CO4',
            bloom: 'L5',
            question: 'Explain the Raft Consensus Algorithm for replicated state machines in distributed operating systems. Detail Leader Election, Log Replication, and Safety Invariants during network partitioning (Split-Brain scenario).',
            type: 'System Design & Proof',
            maxMarks: 15,
            modelAnswer: '1. Raft Roles: Leader, Follower, Candidate.\n2. Election & Split-Brain Handling: Randomized election timeouts (150-300ms) prevent split votes. A candidate requires majority quorum (floor(N/2)+1) votes to claim leadership.\nIn a network partition of 5 nodes into [2 nodes] and [3 nodes]:\n- The minority partition (2 nodes) cannot achieve quorum (requires 3 votes), so cannot elect leader or commit logs.\n- The majority partition (3 nodes) continues electing leader and committing log entries.\n- When partition heals, the term number and longer committed log of majority overrides stale leader entries, maintaining linearizability.',
            rubricBreakdown: [
              { criteria: 'Core roles and randomized timeout election mechanism', points: 5 },
              { criteria: 'Log replication sequence and 2-phase commit commitIndex', points: 5 },
              { criteria: 'Network partition / Split-Brain quorum safety proof', points: 5 }
            ]
          }
        ]
      }
    ]
  },
  'me_617': {
    courseId: 'me_617',
    selectedModel: 'gemini-3.6-flash',
    strictness: 'University Standard',
    stepMarkingEnabled: true,
    latexMathVerification: true,
    diagramCreditPercent: 30,
    moderationTolerancePercent: 5,
    customDirective: `Evaluate University Turbomachinery Examination & Quiz Scripts adhering strictly to:
1. Velocity triangle vectors, Euler turbine work equations, and swirl velocity derivations carry 40% weight.
2. Free vortex flow (r * C_theta = const) and radial equilibrium criteria at tip/root carry 25% weight.
3. Rotating stall vs surge physical mechanics, Day-Cumpsty hysteresis criteria, and degree of reaction proofs carry 20% weight.
4. Hydraulic reaction turbine heads, efficiency relations, and cascade circulation/lift calculations carry 15% weight.
5. Deduct 1.0 - 1.5 marks for fluid property slips (e.g. using water density for gas cascade or isentropic vs actual outlet temp).`,
    maxTotalMarks: 75,
    sections: [
      {
        sectionName: 'Assessment Module: Axial Compressors, Turbines & Aerodynamics (75 Marks)',
        questions: [
          {
            qNo: 'Q1',
            co: 'CO2',
            bloom: 'L4',
            question: 'Axial compressor stage flow, free vortex swirl, and tip lift coefficient / relative blade angles.',
            type: 'Aerodynamic Derivation & Design',
            maxMarks: 20,
            modelAnswer: 'Determine axial velocity Cz, blade speeds, mean and tip swirl components, degree of reaction Rt, flow angles, and tip lift coefficient CL.',
            rubricBreakdown: [
              { criteria: 'Axial velocity Cz & blade speeds Um, Ut', points: 5 },
              { criteria: 'Free vortex swirl velocities Cθ1, Cθ2 at mean & tip', points: 5 },
              { criteria: 'Degree of reaction derivation Rt', points: 5 },
              { criteria: 'Mean flow angles αm, βm & tip lift coefficient CL', points: 5 }
            ]
          },
          {
            qNo: 'Q2',
            co: 'CO3',
            bloom: 'L5',
            question: 'Rotating stall, hysteresis loop, surge comparison, and degree of reaction R = (Ψ/2) + 1 derivation.',
            type: 'Theoretical Exposition & Proof',
            maxMarks: 20,
            modelAnswer: 'Explain adverse pressure gradient boundary layer separation, stall cell rotation, Day-Cumpsty blockage recovery, compare stall vs surge, and derive R = (Ψ/2) + 1 from velocity triangles assuming Cθ2 = 0.',
            rubricBreakdown: [
              { criteria: 'Rotating stall & hysteresis loop mechanism', points: 7 },
              { criteria: 'Stall vs Surge comprehensive comparison table', points: 6 },
              { criteria: 'Rigorous mathematical derivation of R = (Ψ/2) + 1', points: 7 }
            ]
          },
          {
            qNo: 'Q3',
            co: 'CO4',
            bloom: 'L4',
            question: 'Hydraulic reaction turbine power, effective head, flow angles, and required blade heights.',
            type: 'Hydraulic Engineering Problem',
            maxMarks: 18,
            modelAnswer: 'Calculate hydraulic efficiency ηh = ηo / ηm, effective head H, absolute velocity C1, blade speeds U1, U2, flow angles α1, β1, β2, and blade heights h1, h2.',
            rubricBreakdown: [
              { criteria: 'Hydraulic efficiency ηh, power Phy, and effective head H', points: 6 },
              { criteria: 'Peripheral blade speeds & velocity angles α1, β1, β2', points: 6 },
              { criteria: 'Blade heights h1, h2 via continuity equation', points: 6 }
            ]
          },
          {
            qNo: 'Q4',
            co: 'CO1',
            bloom: 'L4',
            question: 'Turbine cascade stagger, exit angle, power output, and Kutta-Joukowski lift coefficient derivation.',
            type: 'Cascade Aerodynamics & Proof',
            maxMarks: 17,
            modelAnswer: 'Determine exit absolute angle α2 from stagger and camber, axial velocity Cz, swirl components, power output W, and derive CL = 2(s/c)(tan α2 - tan α1)cos αm from circulation Γ = s(Cθ2 - Cθ1).',
            rubricBreakdown: [
              { criteria: 'Exit angle α2, axial velocity Cz, and swirl components', points: 6 },
              { criteria: 'Cascade power / work done W', points: 5 },
              { criteria: 'Circulation Γ, lift force, and CL expression derivation', points: 6 }
            ]
          }
        ]
      }
    ]
  }
};

export const UNIVERSITY_STUDENTS = [
  {
    id: 'STU-103',
    name: 'Rohan Verma',
    usn: '9-A-18',
    rollNo: '9-A-18',
    courseId: 'physics_motion',
    department: 'Department of Physics',
    classRank: 1,
    totalMarks: 23,
    maxMarks: 25,
    percentage: 92,
    grade: 'A+',
    status: 'Evaluated',
    evaluatedAt: '25 Jul 2026, 10:05 AM',
    evaluatedBy: 'gemini-3.6-flash',
    scriptPages: ['/answer_sheet_1.jpg', '/answer_sheet_2.jpg'],
    scriptImage: '/answer_sheet_1.jpg',
    questionPaperImage: '/samples/question_paper_1.jpg',
    strongestTopics: ['Numerical problem solving', 'Definitions with SI units'],
    weakestTopics: ['Minor unit slips under time pressure'],
    answers: [
      { qNo: 'Q1', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Motion in which an object covers equal distances in equal intervals of time.', aiFeedback: 'Textbook-accurate definition.' },
      { qNo: 'Q2', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Speed is distance/time and is scalar. Velocity is displacement/time and is a vector with direction.', aiFeedback: 'Both elements plus scalar/vector distinction. Full marks.' },
      { qNo: 'Q3', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'An odometer measures the total distance travelled by a vehicle.', aiFeedback: 'Correct.' },
      { qNo: 'Q4', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Motion along a circular path with constant speed.', aiFeedback: 'Correct.' },
      { qNo: 'Q5', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Acceleration is the rate of change of velocity with time. SI unit is m/s².', aiFeedback: 'Definition and unit both correct.' },
      { qNo: 'Q6', type: 'Numerical', maxMarks: 5, awardedMarks: 5, studentInput: 'Displacement = √(10² + 10²) = √200 = 14.14 m towards north-east.', aiFeedback: 'Complete with direction. Full marks.' },
      { qNo: 'Q7', type: 'Numerical', maxMarks: 5, awardedMarks: 4, studentInput: 'Average speed = 400 km / 8 h = 50 km/h = 13.8 m/s', aiFeedback: 'Method fully correct; final conversion rounded to 13.8 instead of 13.9 m/s.' },
      { qNo: 'Q8', type: 'Numerical', maxMarks: 5, awardedMarks: 4, studentInput: 'a = (v-u)/t = 0.0185 m/s²', aiFeedback: 'Correct answer with unit; working shown was slightly abbreviated.' }
    ]
  },
  {
    id: 'STU-101',
    name: 'Aarav Kumar',
    usn: '9-A-04',
    rollNo: '9-A-04',
    courseId: 'physics_motion',
    department: 'Department of Physics',
    classRank: 2,
    totalMarks: 19.5,
    maxMarks: 25,
    percentage: 78,
    grade: 'B+',
    status: 'Evaluated',
    evaluatedAt: '25 Jul 2026, 10:15 AM',
    evaluatedBy: 'gemini-3.6-flash',
    scriptPages: ['/answer_sheet_1.jpg', '/answer_sheet_2.jpg'],
    scriptImage: '/answer_sheet_1.jpg',
    questionPaperImage: '/samples/question_paper_1.jpg',
    strongestTopics: ['Uniform motion', 'Uniform circular motion'],
    weakestTopics: ['Odometer / distance measurement', 'SI units in final answers'],
    answers: [
      { qNo: 'Q1', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'An object in moving or covers in equal distance in the equal intervals of time is called uniform motion.', aiFeedback: 'Both rubric points met: equal distances and equal time intervals are stated.' },
      { qNo: 'Q2', type: 'Descriptive', maxMarks: 2, awardedMarks: 1.5, studentInput: 'Speed: A rate of the object that covers a distance. Velocity: Velocity is the rate of an object moving in the definite direction.', aiFeedback: 'Velocity correctly linked to direction. Half credit on speed definition.' },
      { qNo: 'Q3', type: 'Descriptive', maxMarks: 2, awardedMarks: 0, studentInput: '', aiFeedback: 'No response found for this question on the answer sheet.' },
      { qNo: 'Q4', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'When an object covers distance in the circular path in the uniform motion is called uniform circular motion.', aiFeedback: 'Circular path and constant speed both conveyed. Full marks.' },
      { qNo: 'Q5', type: 'Descriptive', maxMarks: 2, awardedMarks: 1, studentInput: 'It is the changes in velocity from intial points to final points in the time is called acceleration.', aiFeedback: 'Definition is acceptable, but the SI unit (m/s²) was never stated.' },
      { qNo: 'Q6', type: 'Numerical', maxMarks: 5, awardedMarks: 5, studentInput: 'Displacement = √(10² + 10²) = √200 = 14.14 m', aiFeedback: 'Pythagoras applied correctly with the final unit attached. Full marks.' },
      { qNo: 'Q7', type: 'Numerical', maxMarks: 5, awardedMarks: 5, studentInput: 'Average speed = 400/8 = 50 km/h = 13.9 m/s', aiFeedback: 'Formula, substitution and unit conversion all correct.' },
      { qNo: 'Q8', type: 'Numerical', maxMarks: 5, awardedMarks: 3, studentInput: 'a = (v-u)/t = 0.0185', aiFeedback: 'Formula and substitution correct, but the final answer carries no unit.' }
    ]
  },
  {
    id: 'STU-102',
    name: 'Priya Patel',
    usn: '9-A-12',
    rollNo: '9-A-12',
    courseId: 'physics_motion',
    department: 'Department of Physics',
    classRank: 3,
    totalMarks: 15,
    maxMarks: 25,
    percentage: 60,
    grade: 'B',
    status: 'Evaluated',
    evaluatedAt: '25 Jul 2026, 10:22 AM',
    evaluatedBy: 'gemini-3.6-flash',
    scriptPages: ['/answer_sheet_1.jpg', '/answer_sheet_2.jpg'],
    scriptImage: '/answer_sheet_2.jpg',
    questionPaperImage: '/samples/question_paper_2.jpg',
    strongestTopics: ['Average speed calculation', 'Speed vs velocity'],
    weakestTopics: ['Displacement using Pythagoras', 'Uniform circular motion'],
    answers: [
      { qNo: 'Q1', type: 'Descriptive', maxMarks: 2, awardedMarks: 1, studentInput: 'Motion which is uniform and does not change.', aiFeedback: 'Circular definition. Missing equal distances or intervals.' },
      { qNo: 'Q2', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Speed = distance/time. Velocity = displacement/time with direction.', aiFeedback: 'Both rubric lines satisfied precisely.' },
      { qNo: 'Q3', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'It measures the total distance travelled by a vehicle.', aiFeedback: 'Exact match to the model answer.' },
      { qNo: 'Q4', type: 'Descriptive', maxMarks: 2, awardedMarks: 0.5, studentInput: 'Motion in a circle.', aiFeedback: 'Circular path mentioned but constant speed omitted.' },
      { qNo: 'Q5', type: 'Descriptive', maxMarks: 2, awardedMarks: 1.5, studentInput: 'Rate of change of velocity. Unit is m/s.', aiFeedback: 'Definition correct, but the unit given was m/s rather than m/s².' },
      { qNo: 'Q6', type: 'Numerical', maxMarks: 5, awardedMarks: 1, studentInput: 'Displacement = 10 + 10 = 20 m', aiFeedback: 'Added the legs instead of applying Pythagoras.' },
      { qNo: 'Q7', type: 'Numerical', maxMarks: 5, awardedMarks: 5, studentInput: 'u = 2000, v = 2400, t = 8h. Average speed = total distance/total time = 400/8 = 50 km/h = 13.9 m/s', aiFeedback: 'Correct method and conversion throughout.' },
      { qNo: 'Q8', type: 'Numerical', maxMarks: 5, awardedMarks: 2, studentInput: 'v = u + at, s = ut + ½at²', aiFeedback: 'Wrote the kinematic equations but never substituted values.' }
    ]
  },
  {
    id: 'STU-104',
    name: 'Sneha Roy',
    usn: '9-A-21',
    rollNo: '9-A-21',
    courseId: 'physics_motion',
    department: 'Department of Physics',
    classRank: 4,
    totalMarks: 11.5,
    maxMarks: 25,
    percentage: 46,
    grade: 'C',
    status: 'Evaluated',
    evaluatedAt: '25 Jul 2026, 10:40 AM',
    evaluatedBy: 'gemini-3.6-flash',
    scriptPages: ['/answer_sheet_1.jpg', '/answer_sheet_2.jpg'],
    scriptImage: '/answer_sheet_2.jpg',
    questionPaperImage: '/samples/question_paper_2.jpg',
    strongestTopics: ['Basic definitions'],
    weakestTopics: ['All numerical problems', 'SI units', 'Formula recall'],
    answers: [
      { qNo: 'Q1', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'When an object covers equal distance in equal time it is uniform motion.', aiFeedback: 'Both rubric points present.' },
      { qNo: 'Q2', type: 'Descriptive', maxMarks: 2, awardedMarks: 1, studentInput: 'Speed and velocity are both how fast something moves.', aiFeedback: 'Failed to distinguish the two.' },
      { qNo: 'Q3', type: 'Descriptive', maxMarks: 2, awardedMarks: 2, studentInput: 'Distance travelled by vehicle.', aiFeedback: 'Correct.' },
      { qNo: 'Q4', type: 'Descriptive', maxMarks: 2, awardedMarks: 1, studentInput: 'Going round in a circle.', aiFeedback: 'Needs constant speed to earn full marks.' },
      { qNo: 'Q5', type: 'Descriptive', maxMarks: 2, awardedMarks: 1, studentInput: 'Speeding up of an object.', aiFeedback: 'Informal definition; rate of change of velocity not stated.' },
      { qNo: 'Q6', type: 'Numerical', maxMarks: 5, awardedMarks: 1.5, studentInput: 'He walked 20 m total.', aiFeedback: 'Computed distance rather than displacement.' },
      { qNo: 'Q7', type: 'Numerical', maxMarks: 5, awardedMarks: 3, studentInput: 'Speed = 400/8 = 50 km/h', aiFeedback: 'Correct average speed in km/h but not converted to m/s.' },
      { qNo: 'Q8', type: 'Numerical', maxMarks: 5, awardedMarks: 0, studentInput: '', aiFeedback: 'No response found for this question on the answer sheet.' }
    ]
  },
  {
    id: 'STU-TURBO-QUIZ-19205402',
    name: 'Abhishek Kumar Pandey',
    usn: '19205402',
    courseId: 'me_617',
    evaluationMode: 'Quiz',
    department: 'Mechanical & Aerospace Engineering',
    semester: 'Semester VI',
    degree: 'B.Tech / M.Tech (Dual)',
    cgpa: 9.85,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    totalMarks: 70.5,
    maxMarks: 75,
    percentage: 94.0,
    grade: 'S (Outstanding)',
    gradePoint: 10,
    cohortRank: 1,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 09:10 IST',
    evaluator: 'Prof. Dr. Turbomachinery Chair & Gemini 3.6 Multimodal Engine',
    title: 'Quiz - 2 (ME 617A): Turbomachinery',
    scriptImage: '/turbomachinery/quiz/ans_page_1.jpg',
    scriptPages: [
      '/turbomachinery/quiz/ans_page_1.jpg',
      '/turbomachinery/quiz/ans_page_2.jpg',
      '/turbomachinery/quiz/ans_page_3.jpg',
      '/turbomachinery/quiz/ans_page_4.jpg',
      '/turbomachinery/quiz/ans_page_5.jpg',
      '/turbomachinery/quiz/ans_page_6.jpg',
      '/turbomachinery/quiz/ans_page_7.jpg',
      '/turbomachinery/quiz/ans_page_8.jpg',
      '/turbomachinery/quiz/ans_page_9.jpg',
      '/turbomachinery/quiz/ans_page_10.jpg',
      '/turbomachinery/quiz/ans_page_11.jpg',
      '/turbomachinery/quiz/ans_page_12.jpg'
    ],
    questionPaperImage: '/turbomachinery/quiz/qp_page_1.jpg',
    questionPaperPages: [
      '/turbomachinery/quiz/qp_page_1.jpg',
      '/turbomachinery/quiz/qp_page_2.jpg'
    ],
    coAttainment: {
      CO1: 95,
      CO2: 98,
      CO3: 92,
      CO4: 91
    },
    strongestAreas: [
      'Polytropic Efficiency & Stage Work (100%)',
      'Mean Radius 50% Reaction Blade Angles (100%)',
      'Free Vortex Radial Equilibrium Formulation (93%)'
    ],
    weakestAreas: [
      'Isentropic vs Actual Outlet Temperature (-1.5 Marks)',
      'Gas Constant Precision Slip (-0.5 Mark)'
    ],
    answers: [
      {
        qNo: 'Q1',
        co: 'CO2',
        title: 'Polytropic Efficiency, Stage Temperature Rise & Relative Blade Angles',
        maxMarks: 20,
        awardedMarks: 20.0,
        startPage: 1,
        pages: [1, 2, 3],
        studentInput: 'Given: N=10 stages, r_p = P₀₂/P₀₁ = 5, η_isen = 0.87, T₀₁ = 288 K, λ = 1.0, R = 0.5, U = 210 m/s, Cz = 170 m/s.\\nFlow coeff φ = Cz/U = 170/210 = 0.809.\\nR = 0.5 => tan β₁ + tan β₂ = 1.236 (Eq 1).\\nPolytropic efficiency: η_isen = [ (r_p)^((γ-1)/γ) - 1 ] / [ (r_p)^((γ-1)/(η_p γ)) - 1 ] => 5^(0.285/η_p) = 1.6687 => η_p = 0.895.\\nStage temperature rise: r_p^((γ-1)/(η_p γ)) = 1 + N·ΔT₀s / T₀₁ => 5^(0.285/0.895) = 1 + 10·ΔT₀s / 288 => ΔT₀s = 19.342 K.\\nFrom Euler work: ΔT₀s = (λ U Cz / Cp)(tan β₁ - tan β₂) => tan β₁ - tan β₂ = 0.544 (Eq 2).\\nSolving (1) & (2): β₁ = 41.677°, β₂ = 19.085°, α₁ = 19.085°, α₂ = 41.677°.',
        aiFeedback: 'Exceptional mathematical rigor. Student derived polytropic efficiency η_p = 0.895, calculated exact stage temperature rise ΔT₀s = 19.342 K, and solved simultaneous velocity equations for relative blade angles without any error.',
        mistakesInline: []
      },
      {
        qNo: 'Q2',
        co: 'CO2',
        title: 'Axial Velocity, Compressor Stagnation Temperatures & Inlet Relative Mach Number',
        maxMarks: 20,
        awardedMarks: 18.0,
        startPage: 3,
        pages: [3, 4, 5],
        studentInput: 'Given: r_p = 4, η_isen = 0.85, T₀ = 290 K, α₁ = 10°, α₂ = 45°, U = 220 m/s, λ = 0.86, R = 284.6 J/kg·K, γ = 1.4.\\nCz = U / (tan β₁ + tan β₂) = 220 / (tan 45° + tan 10°) = 220 / 1.176 = 187.074 m/s.\\nC₁ = Cz / cos 10° = 189.959 m/s.\\nΔT₀s = (0.86 × 220 × 187.074 / 1005)(tan 45° - tan 10°) = 29.008 K.\\nTotal inlet temperature: T₀₁ = T₀ + C₁² / (2 Cp) = 290 + (189.959)² / (2 × 1005) = 307.952 K.\\nOutlet temperature: T₀₂ / T₀₁ = 4^(0.4/1.4) => T₀₂ = 457.615 K.\\nTotal temperature rise: ΔT_total = 149.663 K.\\nNumber of stages: N = 149.663 / 29.008 = 5.159 => N ≈ 6 stages.\\nRelative velocity: w₁ = Cz / cos 45° = 264.562 m/s.\\nInlet relative Mach: M₁ = w₁ / √(γ R T₀) = 264.562 / √(1.4 × 284.6 × 290) = 0.778.\\nPolytropic efficiency: η_p = 0.875.',
        aiFeedback: 'Solid working across all parts. Deducted 1.5 marks because candidate evaluated isentropic exit temperature T₀₂\' = 457.615 K instead of applying isentropic efficiency η_isen = 0.85 to compute actual outlet temperature T₀₂ = T₀₁ + ΔT\' / 0.85 = 484.02 K. Minor 0.5 mark deduction for writing R = 284.6 instead of standard 287 J/kg·K.',
        mistakesInline: [
          { text: 'T₀₂ / T₀₁ = (P₀₂ / P₀₁)^((γ-1)/γ) = 457.615 K', type: 'warning', note: 'Computed isentropic exit temperature instead of actual total outlet temperature (omitted η_isen division).', penalty: -1.5 },
          { text: 'R = 284.6 J/kg·K', type: 'warning', note: 'Slip of pen for air gas constant (287 J/kg·K specified in QP).', penalty: -0.5 }
        ]
      },
      {
        qNo: 'Q3',
        co: 'CO4',
        title: 'Multi-Stage Compressor Pressure Ratios, Rotor Blade Angle & Last Stage Height',
        maxMarks: 20,
        awardedMarks: 18.5,
        startPage: 5,
        pages: [5, 6, 7, 8],
        studentInput: 'Given: m_dot = 3 kg/s, r_p = 4, η_p = 0.88, P₀ = 1.01 bar, T₀ = 288 K, ΔT₀s = 25 K, (C₁)_last = 165 m/s, α₁ = 20° = β₂, λ = 0.83, dm = 18 cm.\\n(1 + N·ΔT₀s / T₀)^(η_p γ / (γ-1)) = 4 => (1 + N·25 / 288)^(0.88 × 3.5) = 4 => N = 6.548 ≈ 7 stages.\\n1st stage pressure ratio: (1 + 0.88 × 25 / 288)^3.5 = 1.293.\\n7th stage inlet temp: T₆ = 288 + 6 × 25 = 438 K => 7th stage pressure ratio = (1 + 0.88 × 25 / 438)^3.5 = 1.187.\\nCz = C₁ cos 20° = 165 cos 20° = 155.049 m/s.\\nΔT₀s = (λ Cz² / Cp)(tan²β₁ - tan²β₂) => 25 = (0.83 × 155.049² / 1005)(tan²β₁ - tan²20°) => β₁ = 49.69° = α₂.\\nU = Cz(tan β₁ + tan β₂) = 155.049(tan 49.69° + tan 20°) = 239.196 m/s.\\nRotational speed: ω = U / rm = 239.196 / 0.09 = 2657.734 rad/s.\\nP₀₇ = 4.04 bar, P₀₆ = 4.04 / 1.187 = 3.4035 bar.\\nDensity: ρ = P₀₆ / (R T₆) = 3.4035 × 10⁵ / (284.6 × 438) = 2.73 kg/m³.\\nContinuity: m_dot = ρ A Cz = ρ (π dm l) Cz => 3 = 2.73 × π × 0.18 × l × 155.049 => blade height l = 0.039 m = 3.9 cm.',
        aiFeedback: 'Thorough and well-structured execution. Consequential carry-forward credit awarded for blade angle and rotational speed calculations. Deducted 1.0 mark because candidate interpreted 165 m/s as C₁ rather than Cz as worded in the prompt. Deducted 0.5 mark for gas constant notation.',
        mistakesInline: [
          { text: 'Cz = C₁ cos α₁ = 165 cos 20° = 155.049 m/s', type: 'warning', note: 'Question paper stated axial velocity Cz = 165 m/s directly; candidate read it as absolute velocity.', penalty: -1.0 },
          { text: 'R = 284.6 J/kg·K', type: 'warning', note: 'Substituted 284.6 instead of standard 287 J/kg·K.', penalty: -0.5 }
        ]
      },
      {
        qNo: 'Q4',
        co: 'CO1',
        title: 'Free Vortex Design, Velocity Triangles & Root/Tip Reaction Variations',
        maxMarks: 15,
        awardedMarks: 14.0,
        startPage: 8,
        pages: [8, 9, 10, 11, 12],
        studentInput: 'Given: Ur = 150 m/s (written), Um = 200 m/s, Ut = 250 m/s, ΔT₀s = 20 K, Cz = 150 m/s, λ = 0.93.\\nAt mean radius: tan β₁m - tan β₂m = 0.7204, tan β₁m + tan β₂m = 200/150 = 1.33 => β₁m = 45.712°, β₂m = 16.95°, α₁m = 16.95°, α₂m = 45.712°, Rm = 0.5.\\nMean swirl: Cθ1m = 150 tan 16.95° = 45.72 m/s, Cθ2m = 150 tan 45.712° = 153.775 m/s.\\nFree vortex constants: k₁ = rm Cθ1m = 9144/ω, k₂ = rm Cθ2m = 30755/ω.\\nAt tip (Ut = 250 m/s): Cθ1t = 9144/250 = 36.576 m/s, Cθ2t = 30755/250 = 123.02 m/s.\\nwθ1t = 250 - 36.576 = 213.424 m/s, wθ2t = 250 - 123.02 = 126.98 m/s.\\nAngles: α₁t = 13.70°, β₁t = 54.89°, α₂t = 39.35°, β₂t = 40.249°.\\nDegree of reaction at tip: Rt = (Cz / 2Ut)(tan β₁t + tan β₂t) = 0.68.\\nAt root (Ur = 150 m/s): Cθ1r = 60.96 m/s, Cθ2r = 205.033 m/s, wθ1r = 89.04 m/s, wθ2r = -55.033 m/s.\\nRoot angles: α₁r = 22.116°, β₁r = 30.69°, α₂r = 53.81°, β₂r = -20.147°.\\nDegree of reaction at root: Rr = (150 / 300)(tan 30.69° + tan(-20.147°)) = 0.1133.',
        aiFeedback: 'Superb free vortex mathematical physics. The student accurately identified the negative relative blade angle β₂r = -20.147° at the root and verified root stability (Rr = 0.1133 > 0). Deducted 1.0 mark because candidate noted Ur = 150 m/s instead of Ur = 180 m/s as given in the paper header.',
        mistakesInline: [
          { text: 'Ur = 150 m/s', type: 'warning', note: 'Used Ur = 150 m/s instead of given Ur = 180 m/s. All vortex equilibrium derivations were performed correctly.', penalty: -1.0 }
        ]
      }
    ]
  },
  {
    id: 'STU-TURBO-EXAM-19205402',
    name: 'Abhishek Kumar Pandey',
    usn: '19205402',
    courseId: 'me_617',
    evaluationMode: 'Examination',
    department: 'Mechanical & Aerospace Engineering',
    semester: 'Semester VI',
    degree: 'B.Tech / M.Tech (Dual)',
    cgpa: 9.85,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    totalMarks: 68.5,
    maxMarks: 75,
    percentage: 91.3,
    grade: 'S (Outstanding)',
    gradePoint: 10,
    cohortRank: 1,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 09:25 IST',
    evaluator: 'Prof. Dr. Turbomachinery Chair & Gemini 3.6 Multimodal Engine',
    title: 'Online Exam-II (Paper Code-D) (ME-617): Advanced Theory of Turbomachinery',
    scriptImage: '/turbomachinery/exam/ans_page_1.jpg',
    scriptPages: [
      '/turbomachinery/exam/ans_page_1.jpg',
      '/turbomachinery/exam/ans_page_2.jpg',
      '/turbomachinery/exam/ans_page_3.jpg',
      '/turbomachinery/exam/ans_page_4.jpg',
      '/turbomachinery/exam/ans_page_5.jpg',
      '/turbomachinery/exam/ans_page_6.jpg',
      '/turbomachinery/exam/ans_page_7.jpg',
      '/turbomachinery/exam/ans_page_8.jpg',
      '/turbomachinery/exam/ans_page_9.jpg',
      '/turbomachinery/exam/ans_page_10.jpg',
      '/turbomachinery/exam/ans_page_11.jpg',
      '/turbomachinery/exam/ans_page_12.jpg',
      '/turbomachinery/exam/ans_page_13.jpg',
      '/turbomachinery/exam/ans_page_14.jpg'
    ],
    questionPaperImage: '/turbomachinery/exam/qp_page_1.jpg',
    questionPaperPages: [
      '/turbomachinery/exam/qp_page_1.jpg',
      '/turbomachinery/exam/qp_page_2.jpg'
    ],
    coAttainment: {
      CO1: 91,
      CO2: 88,
      CO3: 100,
      CO4: 86
    },
    strongestAreas: [
      'Rotating Stall, Surge & Degree of Reaction Proof R = (Ψ/2) + 1 (100%)',
      'Cascade Circulation & Kutta-Joukowski Lift Proof (91%)',
      'Free Vortex Tip Reaction Derivation (88%)'
    ],
    weakestAreas: [
      'Conflated Hydraulic and Mechanical Efficiency (-2.0 Marks)',
      'Chord vs Blade Height in Annular Flow Area (-1.5 Marks)',
      'Density Parameter in Turbine Cascade Power (-1.5 Marks)'
    ],
    answers: [
      {
        qNo: 'Q1',
        co: 'CO2',
        title: 'Axial Compressor Flow, Free Vortex & Tip Lift Coefficient',
        maxMarks: 20,
        awardedMarks: 17.5,
        startPage: 1,
        pages: [1, 2, 3, 4, 5],
        studentInput: 'Given: Dh = 30 cm, Dt = 60 cm, N = 6000 rpm, Q = 500 m³/min, Ψ = 0.4, Rm = 0.5, c = 6 cm, n = 20 blades.\\nDm = (30 + 60)/2 = 45 cm.\\nQ = π Dm c Cz => Cz = 98.243 m/s.\\nUm = π Dm N / 60 = 141.372 m/s.\\nRm = 0.5 => wθ1m + wθ2m = 141.372 (Eq 1).\\nΨ = 0.4 => wθ1m - wθ2m = 56.548 (Eq 2).\\nwθ1m = 98.96 m/s, wθ2m = 42.412 m/s.\\nCθ1m = 42.412 m/s, Cθ2m = 98.96 m/s.\\nFree vortex (r·Cθ = const): Cθ1t = (45/60)·42.412 = 31.809 m/s, Cθ2t = (45/60)·98.96 = 74.22 m/s.\\nUt = π Dt N / 60 = 188.495 m/s.\\nwθ1t = 188.495 - 31.809 = 156.686 m/s, wθ2t = 188.495 - 74.22 = 114.275 m/s.\\nRt = (wθ1t + wθ2t) / (2 Ut) = 0.718.\\nFlow angles at tip: tan α₁ = 0.3237, tan α₂ = 0.7554 => αm = 28.34°.\\ntan β₁ = 1.595, tan β₂ = 1.163 => βm = 54.052°.\\nPitch at hub s = π Dh / n = 4.71 cm.\\nCL = 2 (s/c)(tan β₁ - tan β₂) cos βm = 0.398.',
        aiFeedback: 'Impressive analysis of free vortex mechanics and swirl components at tip and mean radius. Deducted 1.5 marks because the student used chord c = 6 cm instead of blade height h = (Dt - Dh)/2 = 15 cm in the volumetric flow equation Q = π Dm h Cz. Deducted 1.0 mark for computing pitch s using hub diameter rather than tip diameter.',
        mistakesInline: [
          { text: 'Q = π Dm · c · Cz = 500/60', type: 'warning', note: 'Used chord c = 6 cm instead of annular blade height h = (Dt - Dh)/2 = 15 cm in flow area.', penalty: -1.5 },
          { text: 's = π Dh / n = 4.71 cm (at tip)', type: 'warning', note: 'Pitch evaluated at hub diameter (Dh = 30 cm) instead of tip diameter (Dt = 60 cm).', penalty: -1.0 }
        ]
      },
      {
        qNo: 'Q2',
        co: 'CO3',
        title: 'Rotating Stall, Hysteresis, Surge Comparison & Degree of Reaction Proof',
        maxMarks: 20,
        awardedMarks: 20.0,
        startPage: 10,
        pages: [10, 11, 12, 13, 14],
        studentInput: '1. Rotating Stall and Hysteresis:\\nAdverse pressure gradient on suction surface promotes boundary layer growth and separation. Axisymmetric flow breaks down into rotating stall cells moving at a fraction of rotor speed. Day and Cumpsty demonstrated hysteresis loop where compressor recovery requires blockage coefficient < 50%.\\n2. Differences between Rotating Stall and Surge:\\n- Spatial: Local circumferential disturbance in blading vs full compression system disturbance.\\n- Unsteadiness: Time-steady with circumferential mass deficit vs time-unsteady but circumferentially uniform.\\n- Operating Regime: Dominant at low shaft speeds vs high shaft speeds.\\n3. Derivation of R = (Ψ/2) + 1:\\nΨ = (wθ1 - wθ2)/U = (Cθ2 - Cθ1)/U.\\nR = (w₁² - w₂²)/(2 U (Cθ2 - Cθ1)) = [(wθ1² + Cz²) - (wθ2² + Cz²)] / [2 U (Cθ2 - Cθ1)].\\nAssuming axial exit Cθ2 = 0 => Ψ = -Cθ1 / U => -Cθ1 = Ψ U.\\nSubstituting U = wθ2 into denominator: R = (1 / 2Ψ)(wθ1² - wθ2²) / wθ2².\\nFrom Ψ = (wθ1 - wθ2)/wθ2 => wθ1/wθ2 = 1 + Ψ.\\nR = (1 / 2Ψ)[ (1 + Ψ)² - 1 ] = (1 / 2Ψ)(Ψ² + 2Ψ) = (Ψ/2) + 1. (Q.E.D.)',
        aiFeedback: 'Masterful theoretical exposition and formal mathematical proof. The physical explanation of Day-Cumpsty hysteresis and the three-tier stall vs surge distinction are textbook perfect. Full 20 marks awarded.',
        mistakesInline: []
      },
      {
        qNo: 'Q3',
        co: 'CO4',
        title: 'Hydraulic Reaction Turbine Effective Head, Flow Angles & Blade Heights',
        maxMarks: 18,
        awardedMarks: 15.5,
        startPage: 5,
        pages: [5, 6, 7],
        studentInput: 'Given: N = 350 rpm, Pact = 450 kW, Q = 90 m³/min = 1.5 m³/s, ηo = 0.82, ηm = 0.87, D₁ = 0.9 m, D₂ = 0.45 m, Cm = 9 m/s.\\nEquated ηh = 0.87 => Phy = 450 / 0.87 = 517.241 kW.\\nPhy = ρ g Q H => 517241 = 9810 × 1.5 × H => H = 35.15 m.\\nC₁ = √(2 g H) = 26.26 m/s.\\nBlade speeds: U₁ = π D₁ N / 60 = 16.49 m/s, U₂ = π D₂ N / 60 = 8.246 m/s.\\nVelocity triangles drawn.\\nsin α₁ = Cm / C₁ = 9 / 26.26 => α₁ = 20.043°.\\nCθ1 = C₁ cos α₁ = 24.66 m/s, wθ1 = Cθ1 - U₁ = 8.179 m/s => β₁ = 47.736°.\\ntan β₂ = Cm / U₂ = 9 / 8.246 => β₂ = 47.50°.\\nBlade heights from continuity: Q = π D₁ h₁ Cm => 1.5 = π × 0.9 × h₁ × 9 => h₁ = 0.0589 m = 5.89 cm.\\nQ = π D₂ h₂ Cm => 1.5 = π × 0.45 × h₂ × 9 => h₂ = 0.1178 m = 11.78 cm.',
        aiFeedback: 'Accurate continuity derivations for blade heights and clear vector diagrams. Deducted 2.0 marks because the candidate set ηh = ηm = 0.87, whereas hydraulic efficiency is ηh = ηo / ηm = 0.82 / 0.87 = 0.9425, leading to an artificially lower effective head H. Deducted 0.5 mark for consequential angle impact.',
        mistakesInline: [
          { text: 'ηh = Pact / Phy = 0.87', type: 'error', note: 'Conflated mechanical efficiency (ηm = 0.87) with hydraulic efficiency (ηh = ηo / ηm = 0.82 / 0.87 = 0.9425).', penalty: -2.0 },
          { text: 'H = 35.15 m', type: 'warning', note: 'Underestimated effective head due to incorrect efficiency substitution.', penalty: -0.5 }
        ]
      },
      {
        qNo: 'Q4',
        co: 'CO1',
        title: 'Turbine Cascade Camber, Stagger, Circulation & Lift Coefficient Derivation',
        maxMarks: 17,
        awardedMarks: 15.5,
        startPage: 8,
        pages: [8, 9, 10],
        studentInput: '1. Lift Coefficient Derivation:\\nCirculation around blade Γ = k s = s (Cθ2 - Cθ1).\\nLift force L = ρ Cm Γ = ρ Cm s (Cθ2 - Cθ1).\\nCL = L / (0.5 ρ Cm² c) = 2 (s/c)[(Cθ2 - Cθ1)/Cm].\\nSince Cθ1 = Cz tan α₁, Cθ2 = Cz tan α₂, and Cz/Cm = cos αm:\\nCL = 2 (s/c)(tan α₂ - tan α₁) cos αm.\\n2. Numerical Cascade Computation:\\nC₁ = 18 m/s, α₁ = 60°, s/c = 0.6, λ = 70°, U = 30 m/s, c = 1.8 m, δ = 3°, θ₁ = θ₂ = 13°.\\nBlade angles: α₁\' = λ - θ₁ = 57°, α₂\' = λ + θ₂ = 83°.\\nExit flow angle: α₂ = α₂\' - δ = 80°.\\nCz = C₁ cos 60° = 9 m/s.\\nCθ1 = 18 sin 60° = 15.588 m/s, Cθ2 = 9 tan 80° = 51.042 m/s.\\nWork done: W = ρ U (Cθ2 - Cθ1) = 1000 × 30 × (51.042 - 15.588) = 1063.606 kW.',
        aiFeedback: 'Complete cascade derivation from first principles using Kutta-Joukowski theorem and vector projection. Deducted 1.5 marks because candidate substituted water density ρ = 1000 kg/m³ for a gas turbine cascade work formula instead of air density ρ ≈ 1.2 kg/m³ or stating specific work in kJ/kg.',
        mistakesInline: [
          { text: 'W = ρ U (Cθ2 - Cθ1) = 1000 × 30 × ...', type: 'warning', note: 'Substituted water density (1000 kg/m³) instead of aerodynamic gas density (~1.2 kg/m³) or specific work.', penalty: -1.5 }
        ]
      }
    ]
  },
  {
    id: 'STU-MATH-19205402',
    name: 'Abhishek Kumar Pandey',
    usn: '19205402',
    courseId: 'math_202',
    evaluationMode: 'Assignment',
    department: 'Computer Science & Engineering',
    semester: 'Semester III',
    degree: 'B.Tech (Honors)',
    cgpa: 9.85,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    totalMarks: 73.5,
    maxMarks: 75,
    percentage: 98.0,
    grade: 'S+ (Outstanding)',
    gradePoint: 10,
    cohortRank: 1,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 08:15 IST',
    evaluator: 'Prof. Dr. Gilbert Strang & Gemini 3.6 Multimodal Engine',
    scriptImage: '/maths/ans_page_1.jpg',
    scriptPages: [
      '/maths/ans_page_1.jpg',
      '/maths/ans_page_2.jpg',
      '/maths/ans_page_3.jpg',
      '/maths/ans_page_4.jpg',
      '/maths/ans_page_5.jpg',
      '/maths/ans_page_6.jpg',
      '/maths/ans_page_7.jpg',
      '/maths/ans_page_8.jpg',
      '/maths/ans_page_9.jpg',
      '/maths/ans_page_10.jpg',
      '/maths/ans_page_11.jpg',
      '/maths/ans_page_12.jpg',
      '/maths/ans_page_13.jpg',
      '/maths/ans_page_14.jpg',
      '/maths/ans_page_15.jpg'
    ],
    questionPaperImage: '/maths/qp_page_1.jpg',
    questionPaperPages: [
      '/maths/qp_page_1.jpg',
      '/maths/qp_page_2.jpg'
    ],
    coAttainment: {
      CO1: 96,
      CO2: 100,
      CO3: 98,
      CO4: 95
    },
    strongestAreas: [
      'Gram-Schmidt Orthogonalization (100%)',
      'Spectral Theorem & Eigenspaces (100%)',
      'Coordinate Transformation Proof (100%)'
    ],
    weakestAreas: [
      'Intermediate Orthogonal Normalization Factor in Conic Section (-1.0 Mark)'
    ],
    answers: [
      {
        qNo: 'Q1(a)',
        co: 'CO1',
        title: 'Rank, Null Space, Column Space, Left Null Space of Matrix A',
        maxMarks: 12,
        awardedMarks: 11.5,
        startPage: 1,
        pages: [1, 2, 3],
        studentInput: 'Row reduced matrix A via Gaussian elimination: Rank = 2. Row space basis = {[1, 0, -1]ᵀ, [0, 1, 2]ᵀ}, Dim = 2. Null space basis = {[1, -2, 1]ᵀ}, Dim = 1. Column space basis via Aᵀ reduction = {[1, 0, -1]ᵀ, [0, 1, 2]ᵀ}, Dim = 2. Left null space basis = {[1, -2, 1]ᵀ}, Dim = 1.',
        aiFeedback: 'Accurate Gaussian elimination steps and correct fundamental subspace bases. Minor annotation note: labeled operation as -R₂/2 on the margin while correctly computing [0, 1, 2]. 0.5 mark deduction.',
        mistakesInline: [
          { text: 'R₂ → -R₂/2 (margin note)', type: 'warning', note: 'Slip of pen in notation on margin (-R₂/3 intended)', penalty: -0.5 }
        ]
      },
      {
        qNo: 'Q1(b)',
        co: 'CO2',
        title: 'Gram-Schmidt Orthogonalization & Perpendicular Distances of P(1, 3, 2)',
        maxMarks: 13,
        awardedMarks: 13.0,
        startPage: 4,
        pages: [3, 4, 5],
        studentInput: 'Applied Gram-Schmidt on row space basis: v₁ = (1, 0, -1), v₂ = (1, 1, 1). Computed projection of P(1, 3, 2) and normal vector v₃ = (-1/2, 1, -1/2). Distance from row space d₁ = ||v₃|| = √(3/2) = 1.2247. Computed distance from null space N(A) vector (1, -2, 1): normal vector v₄ = (3/2, 2, 5/2), distance d₂ = √(50/4) = 3.5355.',
        aiFeedback: 'Exemplary solution! Beautiful application of Gram-Schmidt orthogonalization. Both perpendicular distances are calculated with high precision. Verified d₁² + d₂² = 1.5 + 12.5 = 14 = ||P||² (Pythagorean Theorem on orthogonal complements holds exactly).',
        mistakesInline: []
      },
      {
        qNo: 'Q2(a)',
        co: 'CO3',
        title: 'Characteristic Equation, Eigenvalues & Eigenspaces of Symmetric Matrix A',
        maxMarks: 12,
        awardedMarks: 12.0,
        startPage: 6,
        pages: [6, 7],
        studentInput: 'Characteristic determinant |A - λI| = 0 expanded to -λ³ + 6λ² + 15λ + 8 = 0. Factored to find eigenvalues λ = -1 (multiplicity 2) and λ = 8. For λ = -1: eigenspace has dimension 2 with basis {[1, -2, 0]ᵀ, [0, -2, 1]ᵀ}. For λ = 8: eigenvector [2, 1, 2]ᵀ.',
        aiFeedback: 'Full marks awarded. Accurate expansion of characteristic polynomial and correct determination of the 2-dimensional eigenspace for repeated eigenvalue -1.',
        mistakesInline: []
      },
      {
        qNo: 'Q2(b)',
        co: 'CO3',
        title: 'Orthonormal Set via Gram-Schmidt & Spectral Decomposition A = QDQᵀ',
        maxMarks: 13,
        awardedMarks: 13.0,
        startPage: 8,
        pages: [7, 8, 9, 10],
        studentInput: 'Gram-Schmidt applied to eigenspace vectors: α₁ = (1, -2, 0), α₂ = (2, 1, 2) (already orthogonal), α₃ = (-4/5, -2/5, 1). Normalized to obtain orthonormal columns v₁, v₂, v₃. Formed orthogonal matrix Q, diagonal matrix D = diag(-1, 8, -1), and verified A = Q D Qᵀ = original matrix.',
        aiFeedback: 'Outstanding mathematical rigor. The student explicitly normalized vectors, constructed Q and D, and multiplied Q D Qᵀ back to verify the original symmetric matrix A.',
        mistakesInline: []
      },
      {
        qNo: 'Q3(a)',
        co: 'CO4',
        title: 'Linear Transformation of Quadratic Curve Proof yᵀPy = C',
        maxMarks: 8,
        awardedMarks: 8.0,
        startPage: 10,
        pages: [10],
        studentInput: 'Given xᵀAx = C and y = Bx => x = B⁻¹y, xᵀ = yᵀ(B⁻¹)ᵀ. Substituted into quadratic form: yᵀ(B⁻¹)ᵀAB⁻¹y = C. Defined P = (B⁻¹)ᵀAB⁻¹ => yᵀPy = C.',
        aiFeedback: 'Complete and elegant proof of coordinate change for quadratic forms under general linear transformations.',
        mistakesInline: []
      },
      {
        qNo: 'Q3(b)-Part 1',
        co: 'CO4',
        title: 'Unit Circle Transformed by B: Algebraic Canonical Equation',
        maxMarks: 8,
        awardedMarks: 8.0,
        startPage: 11,
        pages: [11, 12],
        studentInput: 'Unit circle xᵀx = 1, B = [[2, 2], [2, -1]], det(B) = -6. Calculated B⁻¹ = [[1/6, 1/3], [1/3, -1/3]]. Computed P = (B⁻¹)ᵀAB⁻¹ = [[5/36, -1/18], [-1/18, 2/9]]. Transformed equation: yᵀPy = 1 => 5y₁² + 8y₂² - 4y₁y₂ = 36.',
        aiFeedback: 'Accurate inverse and quadratic matrix multiplication. Standard algebraic equation derived without flaw.',
        mistakesInline: []
      },
      {
        qNo: 'Q3(b)-Part 2',
        co: 'CO4',
        title: 'Principal Axes, Canonical Ellipse & Geometric Sketch',
        maxMarks: 9,
        awardedMarks: 8.0,
        startPage: 14,
        pages: [12, 13, 14, 15],
        studentInput: 'Matrix A\\\' = [[5, -2], [-2, 8]], characteristic equation λ² - 13λ + 36 = 0 => λ₁ = 9, λ₂ = 4. Eigenvectors: [1, -2]ᵀ for λ=9 (line y₂ = -2y₁) and [2, 1]ᵀ for λ=4 (line y₁ = 2y₂). Canonical form: z₁²/4 + z₂²/9 = 1 => z₁²/2² + z₂²/3² = 1 (semi-axes a=3, b=2). Hand-drawn geometric sketch showing original unit circle and transformed tilted ellipse with principal axes.',
        aiFeedback: 'Superb geometric visualization and eigenvalue analysis. Minor step-credit note: when defining z = Qᵀy on page 14, Q was not explicitly scaled by the 1/√5 normalization scalar, although the canonical ellipse formula z₁²/4 + z₂²/9 = 1 and diagram were deduced correctly. 1.0 mark deduction.',
        mistakesInline: [
          { text: 'Q = [[1, 2], [-2, 1]] (unnormalized rotation)', type: 'warning', note: 'Omitted 1/√5 normalization scalar before substitution into canonical variable z', penalty: -1.0 }
        ]
      }
    ]
  },
  {
    id: 'STU-MATH-19205418',
    name: 'Priya Nandakumar',
    usn: '19205418',
    courseId: 'math_202',
    evaluationMode: 'Assignment',
    department: 'Computer Science & Engineering',
    semester: 'Semester III',
    degree: 'B.Tech (Honors)',
    cgpa: 9.35,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    totalMarks: 67.5,
    maxMarks: 75,
    percentage: 90.0,
    grade: 'S (Outstanding)',
    gradePoint: 10,
    cohortRank: 2,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 08:18 IST',
    evaluator: 'Prof. Dr. Gilbert Strang & Gemini 3.6 Multimodal Engine',
    scriptImage: '/maths/ans_page_1.jpg',
    scriptPages: ['/maths/ans_page_1.jpg'],
    questionPaperImage: '/maths/qp_page_1.jpg',
    coAttainment: { CO1: 92, CO2: 90, CO3: 88, CO4: 90 },
    strongestAreas: ['Gaussian Elimination', 'Eigenvalue Computations'],
    weakestAreas: ['Normalizing Matrix Q'],
    answers: []
  },
  {
    id: 'STU-MATH-19205425',
    name: 'Rohit Deshmukh',
    usn: '19205425',
    courseId: 'math_202',
    evaluationMode: 'Quiz',
    department: 'Computer Science & Engineering',
    semester: 'Semester III',
    degree: 'B.Tech (Honors)',
    cgpa: 8.40,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalMarks: 58.0,
    maxMarks: 75,
    percentage: 77.3,
    grade: 'A (Very Good)',
    gradePoint: 8,
    cohortRank: 5,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 08:20 IST',
    evaluator: 'Prof. Dr. Gilbert Strang & Gemini 3.6 Multimodal Engine',
    scriptImage: '/maths/ans_page_1.jpg',
    scriptPages: ['/maths/ans_page_1.jpg'],
    coAttainment: { CO1: 80, CO2: 75, CO3: 78, CO4: 76 },
    strongestAreas: ['Subspaces Basis'],
    weakestAreas: ['Gram-Schmidt Projection formula'],
    answers: []
  },
  {
    id: 'STU-MATH-19205452',
    name: 'Vikramaditya Rao',
    usn: '19205452',
    courseId: 'math_202',
    evaluationMode: 'Examination',
    department: 'Computer Science & Engineering',
    semester: 'Semester III',
    degree: 'B.Tech (Honors)',
    cgpa: 6.10,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    totalMarks: 38.5,
    maxMarks: 75,
    percentage: 51.3,
    grade: 'C (Average)',
    gradePoint: 6,
    cohortRank: 14,
    status: 'Certified by CoE',
    evaluatedAt: '2026-09-24 08:22 IST',
    evaluator: 'Prof. Dr. Gilbert Strang & Gemini 3.6 Multimodal Engine',
    scriptImage: '/maths/ans_page_1.jpg',
    scriptPages: ['/maths/ans_page_1.jpg'],
    coAttainment: { CO1: 54, CO2: 50, CO3: 52, CO4: 48 },
    strongestAreas: ['Basic Matrix Multiplication'],
    weakestAreas: ['Gram-Schmidt Orthogonalization', 'Spectral Decomposition'],
    answers: []
  },
  {
    id: 'STU-2024-042',
    name: 'Aarav Sharma',
    usn: '2024BCSE042',
    courseId: 'cs_301',
    evaluationMode: 'Examination',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    degree: 'B.Tech (Honors)',
    cgpa: 9.24,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalMarks: 68.5,
    maxMarks: 75,
    percentage: 91.3,
    grade: 'S (Outstanding)',
    gradePoint: 10,
    cohortRank: 2,
    status: 'Certified by CoE',
    evaluatedAt: '2026-10-24 16:40 IST',
    evaluator: 'Prof. Dr. A. Krishnamurthy (Chief) & Gemini 3.6 Multimodal Engine',
    scriptImage: '/answer_sheet_1.jpg',
    questionPaperImage: '/question_paper_1.jpg',
    coAttainment: {
      CO1: 93, // Concurrency & Scheduling
      CO2: 96, // Deadlocks & Bankers
      CO3: 88, // Virtual Memory & Paging
      CO4: 90  // Distributed Consensus
    },
    strongestAreas: ['Banker\'s Safety Derivation', 'Coffman Criteria Proof', 'Semaphore Producer-Consumer'],
    weakestAreas: ['EMAT Unit Labeling under speed', 'Dirty Bit Hardware Traps'],
    answers: [
      {
        qNo: 'Q1',
        co: 'CO2',
        maxMarks: 5,
        awardedMarks: 5.0,
        studentInput: 'Listed 4 Coffman conditions accurately with linear resource hierarchy breaking circular wait.',
        aiFeedback: 'Flawless answer. Precise definitions of mutual exclusion, hold-wait, no-preemption, and circular wait with formal proof.',
        mistakesInline: []
      },
      {
        qNo: 'Q2',
        co: 'CO3',
        maxMarks: 5,
        awardedMarks: 5.0,
        studentInput: 'Belady anomaly definition with Stack algorithm subset property proof for LRU/OPT.',
        aiFeedback: 'Full marks awarded. Thorough mathematical subset proof provided.',
        mistakesInline: []
      },
      {
        qNo: 'Q3',
        co: 'CO1',
        maxMarks: 5,
        awardedMarks: 5.0,
        studentInput: 'Distinguished mode switch vs context switch with PCB hardware registers (PC, SP, CR3).',
        aiFeedback: 'Excellent clarity on user/kernel privilege bit vs address space invalidation.',
        mistakesInline: []
      },
      {
        qNo: 'Q4',
        co: 'CO2',
        maxMarks: 10,
        awardedMarks: 10.0,
        studentInput: 'Complete Banker\'s Matrix derivation: Available=(3,3,2), Need Matrix calculated, Safe sequence <P1, P3, P4, P0, P2> verified step-by-step.',
        aiFeedback: 'Exemplary solution! All 5 safety steps accompanied by returned vector calculations.',
        mistakesInline: []
      },
      {
        qNo: 'Q5',
        co: 'CO1',
        maxMarks: 10,
        awardedMarks: 9.5,
        studentInput: 'POSIX semaphore code with mutex=1, empty=N, full=0. Demonstrated race condition and deadlock proof.',
        aiFeedback: 'Deducted 0.5 marks for omitting pthread_exit / return check in consumer loop. Otherwise rigorous synchronization design.',
        mistakesInline: [
          { text: 'consumer_routine() { ... }', type: 'warning', note: 'Missing thread cancellation/clean termination check.', penalty: -0.5 }
        ]
      },
      {
        qNo: 'Q6',
        co: 'CO3',
        maxMarks: 10,
        awardedMarks: 8.5,
        studentInput: 'Calculated hit time 95ns, miss time 255ns. Derived EMAT=104.6ns. Derived h >= 90.63%. Student omitted unit "ns" in the final step.',
        aiFeedback: 'Calculations are 100% mathematically correct. Deducted 1.5 marks because final threshold did not state units and omitted intermediate inequality step.',
        mistakesInline: [
          { text: 'h >= 145/160 = 0.9062', type: 'warning', note: 'Omitted percentage format or unit label in concluding sentence.', penalty: -1.5 }
        ]
      },
      {
        qNo: 'Q7',
        co: 'CO3',
        maxMarks: 15,
        awardedMarks: 12.5,
        studentInput: 'Detailed page fault trap handling diagram and 6-step lifecycle. Explanations of dirty bit and valid-invalid bit.',
        aiFeedback: 'Solid conceptual understanding. Deducted 2.5 marks for brief discussion on instruction restart atomic register checkpointing.',
        mistakesInline: [
          { text: 'OS updates page table and restarts', type: 'error', note: 'Failed to explain micro-architectural instruction replay and undo log for complex autoincrement instructions.', penalty: -2.5 }
        ]
      },
      {
        qNo: 'Q8',
        co: 'CO4',
        maxMarks: 15,
        awardedMarks: 13.0,
        studentInput: 'Raft consensus architecture with election timeouts and 3-node partition quorum proof.',
        aiFeedback: 'Great explanation of network partition handling and majority quorum safety.',
        mistakesInline: []
      }
    ]
  },
  {
    id: 'STU-2024-088',
    name: 'Priya Patel',
    usn: '2024BCSE088',
    courseId: 'cs_301',
    evaluationMode: 'Assignment',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    degree: 'B.Tech (Honors)',
    cgpa: 8.41,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    totalMarks: 58.0,
    maxMarks: 75,
    percentage: 77.3,
    grade: 'A (Very Good)',
    gradePoint: 8,
    cohortRank: 12,
    status: 'Certified by CoE',
    evaluatedAt: '2026-10-24 16:48 IST',
    evaluator: 'Dr. Meenakshi S. & Gemini 3.6 Multimodal Engine',
    scriptImage: '/answer_sheet_2.jpg',
    questionPaperImage: '/question_paper_1.jpg',
    coAttainment: {
      CO1: 82,
      CO2: 74,
      CO3: 79,
      CO4: 72
    },
    strongestAreas: ['Paged Memory EMAT Calculations', 'Semaphore Logic'],
    weakestAreas: ['Banker\'s Safety Alternate Sequences', 'Distributed Consensus Log Invariant'],
    answers: [
      { qNo: 'Q1', co: 'CO2', maxMarks: 5, awardedMarks: 4.0, studentInput: 'Stated Coffman conditions.', aiFeedback: 'Good, but missed detailed explanation on linear resource hierarchy.', mistakesInline: [] },
      { qNo: 'Q2', co: 'CO3', maxMarks: 5, awardedMarks: 5.0, studentInput: 'Belady anomaly definition and LRU immunity.', aiFeedback: 'Full marks awarded.', mistakesInline: [] },
      { qNo: 'Q3', co: 'CO1', maxMarks: 5, awardedMarks: 4.0, studentInput: 'Mode switch vs context switch.', aiFeedback: 'Clear distinction.', mistakesInline: [] },
      { qNo: 'Q4', co: 'CO2', maxMarks: 10, awardedMarks: 7.0, studentInput: 'Banker algorithm calculation had alternate safe sequence <P3, P1, P4, P0, P2>.', aiFeedback: 'Deducted 3.0 marks for confusing P0 available addition in intermediate step.', mistakesInline: [{ text: 'P0 returns (7,4,3)', type: 'error', note: 'Wrong vector return calculation.', penalty: -3.0 }] },
      { qNo: 'Q5', co: 'CO1', maxMarks: 10, awardedMarks: 8.5, studentInput: 'Producer consumer semaphore pseudocode.', aiFeedback: 'Well written.', mistakesInline: [] },
      { qNo: 'Q6', co: 'CO3', maxMarks: 10, awardedMarks: 9.5, studentInput: 'EMAT derived with 94% hit ratio and threshold computation.', aiFeedback: 'Excellent mathematical working.', mistakesInline: [] },
      { qNo: 'Q7', co: 'CO3', maxMarks: 15, awardedMarks: 10.0, studentInput: 'Demand paging explanation.', aiFeedback: 'Good flow diagram.', mistakesInline: [] },
      { qNo: 'Q8', co: 'CO4', maxMarks: 15, awardedMarks: 10.0, studentInput: 'Raft consensus overview.', aiFeedback: 'Missed detailed partition healing log convergence.', mistakesInline: [] }
    ]
  },
  {
    id: 'STU-2024-015',
    name: 'Rohan Verma',
    usn: '2024BCSE015',
    courseId: 'cs_301',
    evaluationMode: 'Examination',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    degree: 'B.Tech (Honors)',
    cgpa: 9.68,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalMarks: 73.0,
    maxMarks: 75,
    percentage: 97.3,
    grade: 'S+ (University Rank 1)',
    gradePoint: 10,
    cohortRank: 1,
    status: 'Certified by CoE',
    evaluatedAt: '2026-10-24 16:32 IST',
    evaluator: 'Prof. Dr. A. Krishnamurthy (Chief) & Gemini 3.6 Multimodal Engine',
    scriptImage: '/answer_sheet_1.jpg',
    questionPaperImage: '/question_paper_1.jpg',
    coAttainment: {
      CO1: 98,
      CO2: 98,
      CO3: 96,
      CO4: 96
    },
    strongestAreas: ['All Curricular Domains - Mastered', 'Formal Distributed Proofs'],
    weakestAreas: ['None identified'],
    answers: [
      { qNo: 'Q1', co: 'CO2', maxMarks: 5, awardedMarks: 5.0, studentInput: 'Flawless answer.', aiFeedback: 'Perfect score.', mistakesInline: [] },
      { qNo: 'Q2', co: 'CO3', maxMarks: 5, awardedMarks: 5.0, studentInput: 'Flawless answer.', aiFeedback: 'Perfect score.', mistakesInline: [] },
      { qNo: 'Q3', co: 'CO1', maxMarks: 5, awardedMarks: 5.0, studentInput: 'Flawless answer.', aiFeedback: 'Perfect score.', mistakesInline: [] },
      { qNo: 'Q4', co: 'CO2', maxMarks: 10, awardedMarks: 10.0, studentInput: 'Flawless Banker solution.', aiFeedback: 'Exemplary matrix.', mistakesInline: [] },
      { qNo: 'Q5', co: 'CO1', maxMarks: 10, awardedMarks: 10.0, studentInput: 'POSIX code complete.', aiFeedback: 'Flawless synchronization.', mistakesInline: [] },
      { qNo: 'Q6', co: 'CO3', maxMarks: 10, awardedMarks: 10.0, studentInput: 'EMAT complete with proof.', aiFeedback: '100% accurate.', mistakesInline: [] },
      { qNo: 'Q7', co: 'CO3', maxMarks: 15, awardedMarks: 14.0, studentInput: 'Demand paging detailed architecture.', aiFeedback: 'Exceptional diagram and text.', mistakesInline: [] },
      { qNo: 'Q8', co: 'CO4', maxMarks: 15, awardedMarks: 14.0, studentInput: 'Raft consensus design.', aiFeedback: 'Masterful analysis of quorum safety.', mistakesInline: [] }
    ]
  },
  {
    id: 'STU-2024-067',
    name: 'Sneha Rao',
    usn: '2024BCSE067',
    courseId: 'cs_301',
    evaluationMode: 'Quiz',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    degree: 'B.Tech (Honors)',
    cgpa: 7.15,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalMarks: 46.5,
    maxMarks: 75,
    percentage: 62.0,
    grade: 'B (Above Average)',
    gradePoint: 7,
    cohortRank: 38,
    status: 'Certified by CoE',
    evaluatedAt: '2026-10-24 17:05 IST',
    evaluator: 'Dr. Meenakshi S. & Gemini 3.6 Multimodal Engine',
    scriptImage: '/answer_sheet_2.jpg',
    questionPaperImage: '/question_paper_1.jpg',
    coAttainment: {
      CO1: 65,
      CO2: 60,
      CO3: 64,
      CO4: 58
    },
    strongestAreas: ['Belady\'s Anomaly Definition', 'Context Switching Basics'],
    weakestAreas: ['Multi-level Paging Calculation Steps', 'Raft Election Timeout Mechanics'],
    answers: [
      { qNo: 'Q1', co: 'CO2', maxMarks: 5, awardedMarks: 3.5, studentInput: 'Mentioned 3 conditions.', aiFeedback: 'Incomplete Coffman listing.', mistakesInline: [] },
      { qNo: 'Q2', co: 'CO3', maxMarks: 5, awardedMarks: 4.5, studentInput: 'Defined Belady anomaly.', aiFeedback: 'Good conceptual grasp.', mistakesInline: [] },
      { qNo: 'Q3', co: 'CO1', maxMarks: 5, awardedMarks: 3.5, studentInput: 'Distinguished mode vs context switch.', aiFeedback: 'Lacked details on PTBR / CR3.', mistakesInline: [] },
      { qNo: 'Q4', co: 'CO2', maxMarks: 10, awardedMarks: 6.0, studentInput: 'Banker calculation with partial steps.', aiFeedback: 'Partial step marks awarded. Stalled on step 3.', mistakesInline: [] },
      { qNo: 'Q5', co: 'CO1', maxMarks: 10, awardedMarks: 7.0, studentInput: 'Semaphore solution.', aiFeedback: 'Weak deadlock proof.', mistakesInline: [] },
      { qNo: 'Q6', co: 'CO3', maxMarks: 10, awardedMarks: 5.0, studentInput: 'EMAT formula had wrong miss multiplier.', aiFeedback: 'Used 2 memory accesses instead of 3 for 2-level paging.', mistakesInline: [] },
      { qNo: 'Q7', co: 'CO3', maxMarks: 15, awardedMarks: 9.0, studentInput: 'Demand paging overview.', aiFeedback: 'Missing dirty bit optimization.', mistakesInline: [] },
      { qNo: 'Q8', co: 'CO4', maxMarks: 15, awardedMarks: 8.0, studentInput: 'Raft consensus.', aiFeedback: 'Brief explanation.', mistakesInline: [] }
    ]
  },
  {
    id: 'STU-2024-091',
    name: 'Vikramaditya Roy',
    usn: '2024BCSE091',
    courseId: 'cs_301',
    evaluationMode: 'Examination',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    degree: 'B.Tech (Honors)',
    cgpa: 6.20,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    totalMarks: 38.0,
    maxMarks: 75,
    percentage: 50.7,
    grade: 'C (Average)',
    gradePoint: 6,
    cohortRank: 52,
    status: 'Certified by CoE',
    evaluatedAt: '2026-10-24 17:15 IST',
    evaluator: 'Prof. K. Venkatesh & Gemini 3.6 Multimodal Engine',
    scriptImage: '/answer_sheet_2.jpg',
    questionPaperImage: '/question_paper_1.jpg',
    coAttainment: {
      CO1: 52,
      CO2: 48,
      CO3: 54,
      CO4: 45
    },
    strongestAreas: ['Basic Definitions (Coffman, Belady)'],
    weakestAreas: ['Mathematical Derivations', 'Banker\'s Safety Algorithm', 'POSIX Synchronization'],
    answers: [
      { qNo: 'Q1', co: 'CO2', maxMarks: 5, awardedMarks: 3.0, studentInput: 'Defined Coffman conditions briefly.', aiFeedback: 'Basic credit.', mistakesInline: [] },
      { qNo: 'Q2', co: 'CO3', maxMarks: 5, awardedMarks: 3.0, studentInput: 'Belady definition only.', aiFeedback: 'Did not explain subset property.', mistakesInline: [] },
      { qNo: 'Q3', co: 'CO1', maxMarks: 5, awardedMarks: 2.5, studentInput: 'Brief mode switch comment.', aiFeedback: 'Partial marks.', mistakesInline: [] },
      { qNo: 'Q4', co: 'CO2', maxMarks: 10, awardedMarks: 4.5, studentInput: 'Need matrix computed with minor arithmetic errors.', aiFeedback: 'Step credit for Need formula.', mistakesInline: [] },
      { qNo: 'Q5', co: 'CO1', maxMarks: 10, awardedMarks: 5.0, studentInput: 'Incomplete semaphore solution.', aiFeedback: 'Missed wait(empty) call in producer.', mistakesInline: [] },
      { qNo: 'Q6', co: 'CO3', maxMarks: 10, awardedMarks: 4.0, studentInput: 'EMAT setup without final solution.', aiFeedback: 'Formula credit only.', mistakesInline: [] },
      { qNo: 'Q7', co: 'CO3', maxMarks: 15, awardedMarks: 8.0, studentInput: 'Basic page fault steps.', aiFeedback: 'Surface level description.', mistakesInline: [] },
      { qNo: 'Q8', co: 'CO4', maxMarks: 15, awardedMarks: 8.0, studentInput: 'Raft consensus high-level notes.', aiFeedback: 'Did not analyze partition recovery.', mistakesInline: [] }
    ]
  }
];

export const UNIVERSITY_GRIEVANCES = [
  {
    id: 'ISSUE-701',
    courseId: 'physics_motion',
    studentId: 'STU-101',
    studentName: 'Aarav Kumar',
    usn: '9-A-04',
    department: 'Department of Physics',
    semester: 'Grade 9',
    qNo: 'Q8',
    questionTitle: 'Acceleration calculation',
    currentScore: 3,
    maxMarks: 5,
    claimedScore: 4,
    appealType: 'Unit Deduction Re-check',
    reason: 'I wrote the unit m/s² at the top of my working on the previous line, so please re-check Q8 for the missing-unit deduction.',
    submissionDate: '25 Jul 2026, 11:30 AM',
    feeStatus: 'Confirmed',
    status: 'Under Review',
    aiRecommendation: 'AI Review: A unit does appear earlier in the working but not against the final answer. Recommend a partial +1 restoration under lenient step-marking.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'ISSUE-702',
    courseId: 'physics_motion',
    studentId: 'STU-102',
    studentName: 'Priya Patel',
    usn: '9-A-12',
    department: 'Department of Physics',
    semester: 'Grade 9',
    qNo: 'Q4',
    questionTitle: 'Uniform circular motion',
    currentScore: 0.5,
    maxMarks: 2,
    claimedScore: 2,
    appealType: 'Rubric Re-evaluation',
    reason: 'I said "motion in a circle" which I think should get full marks for the definition.',
    submissionDate: '25 Jul 2026, 12:10 PM',
    feeStatus: 'Confirmed',
    status: 'Under Review',
    aiRecommendation: 'AI Review: The rubric requires constant speed as a separate mark, which the answer omits. Recommend maintaining 0.5.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-ME617-EXAM-402',
    courseId: 'me_617',
    studentId: 'STU-TURBO-EXAM-19205402',
    studentName: 'Abhishek Kumar Pandey',
    usn: '19205402',
    department: 'Mechanical & Aerospace Engineering',
    semester: 'Semester VI',
    qNo: 'Q4',
    questionTitle: 'Turbine Cascade Stagger, Circulation & Lift Coefficient Derivation',
    currentScore: 15.5,
    maxMarks: 17,
    claimedScore: 17.0,
    appealType: 'Step Credit & Notation Re-Check',
    reason: 'In Question 4, the formal derivation of CL = 2(s/c)(tan α₂ - tan α₁)cos αm from circulation Γ = s(Cθ2 - Cθ1) is mathematically rigorous with complete cascade vector diagrams on Page 8 and 9. The 1.5 mark deduction was solely for writing ρ = 1000 kg/m³ in the cascade power numerical calculation on Page 10, whereas the prompt primarily assessed aerodynamic cascade lift coefficient and circulation physics. Requesting restoration of 1.5 marks.',
    submissionDate: '2026-09-24 09:40 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review',
    aiRecommendation: 'AI Audit Recommendation: The theoretical derivation of the Kutta-Joukowski lift force and non-dimensionalization to CL on Page 9 is completely sound and verified. The power calculation arithmetic slip does not detract from candidate\'s mastery of aerodynamic circulation. Recommend awarding +1.0 mark under Moderation Ordinance 4.2.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-ME617-QUIZ-402',
    courseId: 'me_617',
    studentId: 'STU-TURBO-QUIZ-19205402',
    studentName: 'Abhishek Kumar Pandey',
    usn: '19205402',
    department: 'Mechanical & Aerospace Engineering',
    semester: 'Semester VI',
    qNo: 'Q3',
    questionTitle: 'Multi-Stage Compressor Pressure Ratios & Blade Height',
    currentScore: 18.5,
    maxMarks: 20,
    claimedScore: 19.5,
    appealType: 'Ambiguity in Question Wording',
    reason: 'The problem statement on Quiz 2 Q3 stated: "(C₁)last rotor = 165 m/s", which I accurately resolved into Cz = C₁ cos 20° = 155.049 m/s before applying the Euler work equation and continuity. Deducting 1.0 mark for interpreting this as absolute velocity rather than axial velocity is requested to be reconsidered as all subsequent working is entirely consistent.',
    submissionDate: '2026-09-24 09:45 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review',
    aiRecommendation: 'AI Audit Recommendation: Follow-through working for β₁ = 49.69°, U = 239.196 m/s, and blade height l = 3.9 cm is internally rigorous. Recommend awarding +1.0 mark compensatory credit.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-MATH202-402',
    courseId: 'math_202',
    studentId: 'STU-MATH-19205402',
    studentName: 'Abhishek Kumar Pandey',
    usn: '19205402',
    department: 'Computer Science & Engineering',
    semester: 'Semester III',
    qNo: 'Q3(b)-Part 2',
    questionTitle: 'Principal Axes & Canonical Ellipse Equation',
    currentScore: 8.0,
    maxMarks: 9,
    claimedScore: 9.0,
    appealType: 'Step Credit & Notation Re-Check',
    reason: 'In Question 3(b) Part 2 on Page 14, I derived the canonical ellipse equation z1²/2² + z2²/3² = 1 directly from the eigenvalues λ₁=9, λ₂=4 and sketched the ellipse with principal axes y₁=2y₂ and y₂=-2y₁ on Page 15. The 1.0 mark deduction for not explicitly multiplying the rotation matrix Q by 1/√5 on the intermediate line is requested to be restored as the final canonical form and geometric sketch are 100% correct.',
    submissionDate: '2026-09-24 08:30 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review',
    aiRecommendation: 'AI Audit Recommendation: Student demonstrated complete comprehension of the Principal Axis Theorem. The canonical equation z₁²/4 + z₂²/9 = 1 and the geometric diagram on Page 15 correctly reflect semi-axes a=3, b=2 along the eigenvectors. Recommend awarding +1.0 mark full credit under Ordinance 14(c).',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-CS301-042',
    courseId: 'cs_301',
    studentId: 'STU-2024-042',
    studentName: 'Aarav Sharma',
    usn: '2024BCSE042',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    qNo: 'Q6',
    questionTitle: '2-Level Paging EMAT & Hit Ratio Derivation',
    currentScore: 8.5,
    maxMarks: 10,
    claimedScore: 10.0,
    appealType: 'Step Credit & Notation Re-Check',
    reason: 'My derivation steps for both EMAT (104.6 ns) and minimum hit ratio (h >= 90.625% or 90.63%) are mathematically precise. Marks were deducted for omitting the nanosecond unit label on the intermediate inequality step, which is explicitly shown in the working line right above it.',
    submissionDate: '2026-10-25 10:30 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review', // 'Under Review', 'Approved by CoE', 'Rejected by Board'
    aiRecommendation: 'AI Audit: Student clearly wrote "EMAT = 104.6 ns" on line 4, and derived h >= 145/160 = 90.625%. Deduction of 1.5 marks is deemed excessively pedantic. Recommend awarding +1.5 marks in accordance with University Moderation Guideline 4.2.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-CS301-088',
    courseId: 'cs_301',
    studentId: 'STU-2024-088',
    studentName: 'Priya Patel',
    usn: '2024BCSE088',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    qNo: 'Q4',
    questionTitle: 'Banker\'s Algorithm Safe Sequence Verification',
    currentScore: 7.0,
    maxMarks: 10,
    claimedScore: 9.0,
    appealType: 'Alternate Valid Algorithmic Path',
    reason: 'I derived the alternate safe sequence <P3, P1, P4, P0, P2>, which is mathematically valid as P3\'s need (0,1,1) is <= initial available (3,3,2). Deducting 3.0 marks for selecting an alternative safe branch is unfair.',
    submissionDate: '2026-10-25 11:45 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review',
    aiRecommendation: 'AI Audit: Verified that <P3, P1, P4, P0, P2> is a legitimate safe sequence recognized under multi-solution Banker\'s algorithm rubrics. However, student arithmetic error occurred in Step 4 for P0. Recommend partial credit adjustment of +1.5 marks.',
    facultyRemark: '',
    moderatorActionDate: null
  },
  {
    id: 'UNIGR-2026-CS301-067',
    courseId: 'cs_301',
    studentId: 'STU-2024-067',
    studentName: 'Sneha Rao',
    usn: '2024BCSE067',
    department: 'Computer Science & Engineering',
    semester: 'Semester V',
    qNo: 'Q5',
    questionTitle: 'Producer-Consumer Semaphore Solution',
    currentScore: 7.0,
    maxMarks: 10,
    claimedScore: 9.0,
    appealType: 'Rubric Re-evaluation',
    reason: 'My explanation of deadlock when wait(empty) and wait(mutex) are swapped clearly describes the hold-and-wait deadlock scenario.',
    submissionDate: '2026-10-25 14:10 IST',
    feeStatus: 'Re-evaluation Fee Paid (INR 500 / Docket Confirmed)',
    status: 'Under Review',
    aiRecommendation: 'AI Audit: Student explanation identified hold-and-wait concept, but failed to demonstrate how consumer blocks on wait(mutex). Maintain current score of 7.0.',
    facultyRemark: '',
    moderatorActionDate: null
  }
];

export const UNIVERSITY_BENCHMARKS = {
  courseId: 'math_202',
  courseName: 'MATH-202: Linear Algebra and Matrix Theory (Assignment - 2)',
  totalEnrolled: 64,
  evaluatedCount: 64,
  meanMarks: 62.4, // out of 75
  meanPercentage: 83.2,
  medianMarks: 64.0,
  standardDeviation: 7.8,
  highestScore: 73.5, // Abhishek Kumar Pandey
  lowestScore: 38.5,
  passPercentage: 98.4,
  gradeDistribution: [
    { grade: 'S+ (Outstanding)', gpa: 10, minMarks: 70, count: 5, percent: 7.8 },
    { grade: 'S (Excellent)', gpa: 9.5, minMarks: 65, count: 14, percent: 21.9 },
    { grade: 'A (Very Good)', gpa: 8.5, minMarks: 58, count: 22, percent: 34.4 },
    { grade: 'B (Good)', gpa: 7.5, minMarks: 48, count: 16, percent: 25.0 },
    { grade: 'C (Average)', gpa: 6.0, minMarks: 40, count: 6, percent: 9.4 },
    { grade: 'F (Remedial)', gpa: 0, minMarks: 0, count: 1, percent: 1.6 }
  ],
  coAttainmentMatrix: [
    { co: 'CO1', title: 'Gaussian Elimination & Subspaces', target: 75, achieved: 85.6, status: 'Target Exceeded' },
    { co: 'CO2', title: 'Gram-Schmidt & Distance Projections', target: 70, achieved: 82.4, status: 'Target Exceeded' },
    { co: 'CO3', title: 'Eigenvalues & Spectral Theorem', target: 72, achieved: 79.8, status: 'Target Met' },
    { co: 'CO4', title: 'Quadratic Forms & Conic Geometry', target: 65, achieved: 74.2, status: 'Target Met' }
  ],
  bloomLevelDistribution: [
    { level: 'L3: Apply', maxMarks: 24, classAvgPercent: 88.2 },
    { level: 'L4: Analyze', maxMarks: 34, classAvgPercent: 82.5 },
    { level: 'L5: Evaluate', maxMarks: 17, classAvgPercent: 76.4 }
  ]
};
