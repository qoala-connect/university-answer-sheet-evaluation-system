// Class and student analytics derived from the live roster.
export const PASS_PERCENTAGE = 33;

/** Total marks available on the paper, taken from the roster or the schema. */
export function paperTotal(students, schema) {
  if (students && students.length && students[0].maxMarks) return students[0].maxMarks;
  return schema?.maxTotalMarks || 75;
}

/** Headline class KPIs. Safe on an empty roster. */
export function classStats(students = [], schema) {
  const maxMarks = paperTotal(students, schema);
  const count = students.length;

  if (!count) {
    return { count: 0, average: 0, averagePercent: 0, highest: 0, lowest: 0, maxMarks, passRate: 0, topper: null };
  }

  const totals = students.map((s) => s.totalMarks || 0);
  const sum = totals.reduce((acc, value) => acc + value, 0);
  const average = sum / count;
  const passing = students.filter((s) => (s.percentage || (s.totalMarks / maxMarks) * 100) >= PASS_PERCENTAGE).length;
  const topper = students.reduce((best, s) => (s.totalMarks > best.totalMarks ? s : best), students[0]);

  return {
    count,
    average: Number(average.toFixed(1)),
    averagePercent: maxMarks ? Math.round((average / maxMarks) * 100) : 0,
    highest: Math.max(...totals),
    lowest: Math.min(...totals),
    maxMarks,
    passRate: Math.round((passing / count) * 100),
    topper,
  };
}

const QUESTION_STEM = /^(define|describe|explain|state|distinguish between|differentiate between|what (is|are|does)|calculate|find|determine|compute|a |an |the )\s*/i;

function questionLabel(qNo, schema, limit = 30) {
  const question = schema?.sections
    ?.flatMap((section) => section.questions)
    ?.find((q) => q.qNo === qNo);

  if (!question) return qNo;

  const fromRubric = question.type !== 'Descriptive' && question.rubricBreakdown?.[0]?.criteria;
  const source = fromRubric || question.question || question.title || qNo;

  const text = source.replace(QUESTION_STEM, '').replace(/[.?]\s*$/, '').trim();
  if (text.length <= limit) return `${qNo}: ${text}`;

  const cut = text.slice(0, limit);
  const boundary = cut.lastIndexOf(' ');
  return `${qNo}: ${(boundary > limit * 0.5 ? cut.slice(0, boundary) : cut).trim()}…`;
}

/** Per-question mastery across the class */
export function topicMastery(students = [], schema) {
  if (!students.length) return [];

  const byQuestion = new Map();

  students.forEach((student) => {
    student.answers?.forEach((ans) => {
      if (!ans.maxMarks) return;
      if (!byQuestion.has(ans.qNo)) byQuestion.set(ans.qNo, []);
      byQuestion.get(ans.qNo).push((ans.awardedMarks / ans.maxMarks) * 100);
    });
  });

  return [...byQuestion.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([qNo, percentages]) => ({
      qNo,
      topic: questionLabel(qNo, schema),
      avgPercent: Math.round(percentages.reduce((acc, p) => acc + p, 0) / percentages.length),
      topPercent: Math.round(Math.max(...percentages)),
    }));
}

/** One student's standing against class average and topper */
export function studentComparison(student, students = [], schema) {
  const mastery = topicMastery(students, schema);

  return mastery.map((entry) => {
    const own = student?.answers?.find((a) => a.qNo === entry.qNo);
    const ownPercent = own?.maxMarks ? Math.round((own.awardedMarks / own.maxMarks) * 100) : 0;

    return {
      topic: entry.qNo,
      fullTopic: entry.topic,
      'Your Score %': ownPercent,
      'Class Avg %': entry.avgPercent,
      'Top Scorer %': entry.topPercent,
    };
  });
}

/** Percentile standing */
export function percentile(student, students = []) {
  if (students.length < 2) return 100;
  const below = students.filter((s) => s.totalMarks < student.totalMarks).length;
  return Math.round((below / (students.length - 1)) * 100);
}

/** Study suggestions */
export function studySuggestions(student, schema) {
  const weakest = (student?.answers || [])
    .filter((a) => a.maxMarks && a.awardedMarks < a.maxMarks)
    .sort((a, b) => a.awardedMarks / a.maxMarks - b.awardedMarks / b.maxMarks)
    .slice(0, 3);

  return weakest.map((ans) => {
    const lost = Number((ans.maxMarks - ans.awardedMarks).toFixed(2));
    return {
      qNo: ans.qNo,
      label: questionLabel(ans.qNo, schema),
      lost,
      note: ans.mistakesInline?.[0]?.note || ans.aiFeedback || 'Needs revision on key derivation steps.',
    };
  });
}
