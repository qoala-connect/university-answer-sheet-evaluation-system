const STORAGE_KEY = 'unigrade.session';

export const TEACHER_CREDENTIALS = {
  username: 'teacher',
  password: 'password',
  name: 'Class Teacher',
  role: 'teacher',
  detail: 'teacher'
};

export const DEAN_CREDENTIALS = {
  username: 'dean',
  password: 'password',
  name: 'Dr. Eleanor Vance',
  role: 'dean',
  detail: 'Dean of Department · Academic Audit'
};

export const COE_CREDENTIALS = {
  username: 'coe',
  password: 'password',
  name: 'Prof. Marcus Brody',
  role: 'coe',
  detail: 'Controller of Examinations · Moderation'
};

export function loadSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Non-fatal
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Non-fatal
  }
}

export function signInAsRole(roleKey, extraData = {}) {
  let session = null;

  if (roleKey === 'teacher') {
    session = { ...TEACHER_CREDENTIALS };
  } else if (roleKey === 'dean') {
    session = { ...DEAN_CREDENTIALS };
  } else if (roleKey === 'coe') {
    session = { ...COE_CREDENTIALS };
  } else if (roleKey === 'student') {
    const student = extraData.student || extraData.students?.[0];
    session = {
      role: 'student',
      name: student?.name || 'Alex Rivera',
      studentId: student?.id || 'STU-MATH-19205402',
      rollNo: student?.usn || student?.rollNo || '19205402',
      detail: `Student · ${student?.usn || student?.rollNo || '19205402'}`
    };
  }

  if (session) {
    saveSession(session);
  }
  return session;
}
