export type Course = { id: string; name: string; code: string; instructor: string; semester: string; color: string; progress: number };
export type AcademicItem = { id: string; title: string; courseId: string; type: string; description: string; dueDate: string; priority: 'high' | 'medium' | 'low'; estimatedMinutes: number; status: 'not started' | 'in progress' | 'completed'; progress: number; subtasks: { title: string; done: boolean }[] };
export type ScheduleEvent = { id: string; title: string; type: string; start: string; end: string; courseId?: string };
export type StudyPlan = { id: string; title: string; targetId: string; availableMinutes: number; completionDate: string; sessions: { date: string; start: string; minutes: number; topic: string; done: boolean }[]; status: string };
export type FocusSession = { id: string; taskId: string; courseId: string; duration: number; status: string; reflection: string; date?: string };
export type AssistantMessage = { id: string; role: 'user' | 'assistant'; text: string; time: string; preview?: boolean };
export type TimoraState = { courses: Course[]; items: AcademicItem[]; events: ScheduleEvent[]; plans: StudyPlan[]; sessions: FocusSession[]; messages: AssistantMessage[]; settings: Record<string, string | boolean | number> };

export const seedState: TimoraState = {
  courses: [
    { id: 'math', name: 'Mathematics II', code: 'MATH 241', instructor: 'Dr. Priya Shah', semester: 'Fall 2026', color: '#7664E8', progress: 68 },
    { id: 'cs', name: 'Computer Science', code: 'CS 218', instructor: 'Prof. Evan Brooks', semester: 'Fall 2026', color: '#E28AAF', progress: 54 },
    { id: 'db', name: 'Database Systems', code: 'CS 340', instructor: 'Dr. Lena Ortiz', semester: 'Fall 2026', color: '#53A88B', progress: 73 },
    { id: 'physics', name: 'Physics: Mechanics', code: 'PHYS 202', instructor: 'Dr. Noah Kim', semester: 'Fall 2026', color: '#E3A14F', progress: 42 },
  ],
  items: [
    { id: 'a1', title: 'Problem Set 6: Integrals', courseId: 'math', type: 'Assignment', description: 'Solve problems 1–12 on integration by parts and improper integrals. Show each step and upload a single PDF.', dueDate: '2026-11-19', priority: 'high', estimatedMinutes: 120, status: 'in progress', progress: 55, subtasks: [{ title: 'Review lecture notes', done: true }, { title: 'Complete problems 1–6', done: true }, { title: 'Complete problems 7–12', done: false }, { title: 'Check and submit PDF', done: false }] },
    { id: 'a2', title: 'Database Design Project', courseId: 'db', type: 'Project', description: 'Design a normalized schema for a campus dining reservation system, then document the relational model and key constraints.', dueDate: '2026-11-24', priority: 'high', estimatedMinutes: 240, status: 'in progress', progress: 30, subtasks: [{ title: 'Write project scope', done: true }, { title: 'Create ER diagram', done: false }, { title: 'Normalize schema to 3NF', done: false }, { title: 'Prepare design notes', done: false }] },
    { id: 'a3', title: 'Physics Lab: Momentum', courseId: 'physics', type: 'Lab', description: 'Analyze collision measurements, calculate uncertainty, and compare experimental results with conservation of momentum.', dueDate: '2026-11-27', priority: 'medium', estimatedMinutes: 150, status: 'not started', progress: 0, subtasks: [{ title: 'Organize lab measurements', done: false }, { title: 'Calculate uncertainty', done: false }, { title: 'Write discussion', done: false }] },
    { id: 'a4', title: 'Data Structures Quiz', courseId: 'cs', type: 'Quiz', description: 'A short in-class quiz covering linked lists, stacks, queues, and asymptotic complexity.', dueDate: '2026-11-20', priority: 'medium', estimatedMinutes: 75, status: 'not started', progress: 0, subtasks: [{ title: 'Review linked lists', done: false }, { title: 'Practice Big-O questions', done: false }] },
    { id: 'a5', title: 'Mathematics Midterm', courseId: 'math', type: 'Exam', description: 'Midterm covering sequences, series, integration techniques, and applications.', dueDate: '2026-12-03', priority: 'high', estimatedMinutes: 300, status: 'not started', progress: 0, subtasks: [{ title: 'Review sequences and series', done: false }, { title: 'Practice integration', done: false }, { title: 'Take a timed practice exam', done: false }] },
    { id: 'a6', title: 'Software Engineering Assignment 2', courseId: 'cs', type: 'Assignment', description: 'Implement a small test suite and write a concise note on the testing strategy.', dueDate: '2026-11-12', priority: 'low', estimatedMinutes: 100, status: 'completed', progress: 100, subtasks: [{ title: 'Write test cases', done: true }, { title: 'Run and document tests', done: true }] },
    { id: 'a7', title: 'Database Systems Final', courseId: 'db', type: 'Exam', description: 'Cumulative final exam covering relational algebra, SQL, normalization, and transactions.', dueDate: '2026-12-11', priority: 'medium', estimatedMinutes: 360, status: 'not started', progress: 0, subtasks: [{ title: 'Review relational algebra', done: false }, { title: 'Practice SQL queries', done: false }] },
  ],
  events: [
    { id: 'e1', title: 'Mathematics II lecture', type: 'Class', start: '2026-11-16T09:00', end: '2026-11-16T10:15', courseId: 'math' },
    { id: 'e2', title: 'Database Systems lecture', type: 'Class', start: '2026-11-16T11:00', end: '2026-11-16T12:15', courseId: 'db' },
    { id: 'e3', title: 'Problem Set 6: work session', type: 'Study', start: '2026-11-16T14:00', end: '2026-11-16T15:00', courseId: 'math' },
    { id: 'e4', title: 'Campus job shift', type: 'Personal', start: '2026-11-16T16:00', end: '2026-11-16T18:00' },
    { id: 'e5', title: 'Computer Science lab', type: 'Class', start: '2026-11-17T10:00', end: '2026-11-17T11:50', courseId: 'cs' },
    { id: 'e6', title: 'Database project work', type: 'Study', start: '2026-11-17T13:30', end: '2026-11-17T14:30', courseId: 'db' },
    { id: 'e7', title: 'Physics: Mechanics lecture', type: 'Class', start: '2026-11-18T09:30', end: '2026-11-18T10:45', courseId: 'physics' },
    { id: 'e8', title: 'Mathematics II lecture', type: 'Class', start: '2026-11-18T13:00', end: '2026-11-18T14:15', courseId: 'math' },
    { id: 'e9', title: 'Study: linked lists', type: 'Study', start: '2026-11-19T15:00', end: '2026-11-19T16:00', courseId: 'cs' },
    { id: 'e10', title: 'Physics lab', type: 'Class', start: '2026-11-20T13:00', end: '2026-11-20T15:00', courseId: 'physics' },
  ],
  plans: [
    { id: 'p1', title: 'Problem Set 6 — steady finish', targetId: 'a1', availableMinutes: 180, completionDate: '2026-11-19', status: 'in progress', sessions: [{ date: '2026-11-16', start: '14:00', minutes: 60, topic: 'Work through problems 7–9', done: false }, { date: '2026-11-17', start: '15:00', minutes: 60, topic: 'Finish problems 10–12', done: false }, { date: '2026-11-18', start: '16:00', minutes: 60, topic: 'Review and submit', done: false }] },
    { id: 'p2', title: 'Midterm foundations', targetId: 'a5', availableMinutes: 240, completionDate: '2026-12-02', status: 'proposed', sessions: [{ date: '2026-11-21', start: '10:00', minutes: 60, topic: 'Sequences and series', done: false }, { date: '2026-11-23', start: '14:00', minutes: 60, topic: 'Integration techniques', done: false }, { date: '2026-11-25', start: '10:00', minutes: 60, topic: 'Applications practice', done: false }, { date: '2026-11-28', start: '11:00', minutes: 60, topic: 'Timed practice exam', done: false }] },
  ],
  sessions: [
    { id: 'f1', taskId: 'a6', courseId: 'cs', duration: 45, status: 'completed', reflection: 'Got the test cases working after breaking the edge cases down.', date: '2026-11-10' },
    { id: 'f2', taskId: 'a1', courseId: 'math', duration: 35, status: 'interrupted', reflection: 'Paused when I ran out of time.', date: '2026-11-11' },
    { id: 'f3', taskId: 'a1', courseId: 'math', duration: 45, status: 'completed', reflection: 'The examples helped the method click.', date: '2026-11-11' },
    { id: 'f4', taskId: 'a2', courseId: 'db', duration: 60, status: 'completed', reflection: 'Mapped the project entities and their relationships.', date: '2026-11-12' },
    { id: 'f5', taskId: 'a3', courseId: 'physics', duration: 60, status: 'completed', reflection: 'Organized the lab data before writing.', date: '2026-11-13' },
    { id: 'f6', taskId: 'a1', courseId: 'math', duration: 90, status: 'completed', reflection: 'Finished the hardest integration questions.', date: '2026-11-14' },
    { id: 'f7', taskId: 'a4', courseId: 'cs', duration: 90, status: 'completed', reflection: 'A few practice problems made the structures feel clearer.', date: '2026-11-15' },
  ],
  messages: [{ id: 'm1', role: 'assistant', text: 'Hi Alex. I can help you make your workload feel more manageable. I use your courses and deadlines as context; any changes stay a suggestion until you approve them.', time: '9:14 AM' }],
  settings: { dailyGoal: 2, focusLength: 45, breakLength: 10, notifications: true, reminders: true, weeklySummary: false, darkMode: false, name: 'Alex Morgan', email: 'alex.morgan@campus.edu', major: 'Computer Science', semester: 'Fall 2026' },
};

export const today = '2026-11-16';
