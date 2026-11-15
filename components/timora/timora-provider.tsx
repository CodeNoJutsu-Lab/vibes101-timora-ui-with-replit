'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  seedState,
  type AcademicItem,
  type Course,
  type ScheduleEvent,
  type TimoraState,
} from '@/lib/timora-data';
import { courseOf, dateKey, id } from './ui';

export type ModalType = 'task' | 'course' | 'event' | 'plan' | 'detail' | '';

export type TaskFormState = {
  title: string;
  courseId: string;
  type: string;
  dueDate: string;
  priority: string;
  estimatedMinutes: string;
  description: string;
};

export type CourseFormState = {
  name: string;
  code: string;
  instructor: string;
  color: string;
};

export type EventFormState = {
  title: string;
  type: string;
  date: string;
  start: string;
  end: string;
  courseId: string;
};

export type PlanFormState = {
  targetId: string;
  availableMinutes: string;
  completionDate: string;
};

type TimoraContextValue = {
  data: TimoraState;
  update: (fn: (current: TimoraState) => TimoraState) => void;
  query: string;
  setQuery: (value: string) => void;
  filteredItems: AcademicItem[];
  modal: ModalType;
  setModal: (value: ModalType) => void;
  selectedItem: AcademicItem | null;
  toast: string;
  setToast: (value: string) => void;
  taskForm: TaskFormState;
  setTaskForm: (value: TaskFormState) => void;
  courseForm: CourseFormState;
  setCourseForm: (value: CourseFormState) => void;
  eventForm: EventFormState;
  setEventForm: (value: EventFormState) => void;
  planForm: PlanFormState;
  setPlanForm: (value: PlanFormState) => void;
  openModal: (type: Exclude<ModalType, '' | 'detail'>) => void;
  openTaskDetail: (item: AcademicItem) => void;
  addTask: (event: FormEvent) => void;
  addCourse: (event: FormEvent) => void;
  addEvent: (event: FormEvent) => void;
  createPlan: (event: FormEvent) => void;
  toggleTask: (task: AcademicItem) => void;
  toggleSubtask: (itemId: string, index: number) => void;
};

const TimoraContext = createContext<TimoraContextValue | null>(null);

const STORAGE_KEY = 'timora-demo-v2';

export function TimoraProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [data, setData] = useState<TimoraState>(seedState);
  const [hydrated, setHydrated] = useState(false);
  const [modal, setModal] = useState<ModalType>('');
  const [selectedItem, setSelectedItem] = useState<AcademicItem | null>(null);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [taskForm, setTaskForm] = useState<TaskFormState>({
    title: '',
    courseId: 'math',
    type: 'Assignment',
    dueDate: '2026-11-23',
    priority: 'medium',
    estimatedMinutes: '60',
    description: '',
  });
  const [courseForm, setCourseForm] = useState<CourseFormState>({
    name: '',
    code: '',
    instructor: '',
    color: '#7664E8',
  });
  const [eventForm, setEventForm] = useState<EventFormState>({
    title: '',
    type: 'Study',
    date: '2026-11-16',
    start: '14:00',
    end: '15:00',
    courseId: '',
  });
  const [planForm, setPlanForm] = useState<PlanFormState>({
    targetId: 'a5',
    availableMinutes: '180',
    completionDate: '2026-12-02',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setData(JSON.parse(stored) as TimoraState);
    } catch {
      // Fall back to the demo seed when storage is unavailable or invalid.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage can be unavailable in private browsing; the demo still works.
    }
  }, [data, hydrated]);

  useEffect(() => {
    const dark = Boolean(data.settings.darkMode);
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('dark-body', dark);
  }, [data.settings.darkMode]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const update = (fn: (current: TimoraState) => TimoraState) =>
    setData((current) => fn(current));

  const filteredItems = useMemo(
    () =>
      data.items.filter((item) =>
        `${item.title} ${courseOf(data.courses, item.courseId)?.name ?? ''}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [data.items, data.courses, query],
  );

  const openModal = (type: Exclude<ModalType, '' | 'detail'>) => setModal(type);

  const openTaskDetail = (item: AcademicItem) => {
    setSelectedItem(item);
    setModal('detail');
  };

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    if (!taskForm.title.trim()) return;
    const item: AcademicItem = {
      ...taskForm,
      id: id(),
      description: taskForm.description || 'Added to your academic workload.',
      estimatedMinutes: Number(taskForm.estimatedMinutes),
      dueDate: taskForm.dueDate,
      priority: taskForm.priority as AcademicItem['priority'],
      status: 'not started',
      progress: 0,
      subtasks: [],
    };
    update((s) => ({ ...s, items: [item, ...s.items] }));
    setModal('');
    setTaskForm({ ...taskForm, title: '', description: '' });
    setToast('Added to your workload');
  };

  const addCourse = (event: FormEvent) => {
    event.preventDefault();
    if (!courseForm.name.trim() || !courseForm.code.trim()) return;
    const course: Course = {
      ...courseForm,
      id: id(),
      semester: 'Fall 2026',
      progress: 0,
    };
    update((s) => ({ ...s, courses: [...s.courses, course] }));
    setModal('');
    setCourseForm({ name: '', code: '', instructor: '', color: '#7664E8' });
    setToast('Course added to Fall 2026');
  };

  const addEvent = (event: FormEvent) => {
    event.preventDefault();
    if (!eventForm.title.trim()) return;
    const entry: ScheduleEvent = {
      id: id(),
      title: eventForm.title,
      type: eventForm.type,
      start: `${eventForm.date}T${eventForm.start}`,
      end: `${eventForm.date}T${eventForm.end}`,
      courseId: eventForm.courseId || undefined,
    };
    if (eventForm.end <= eventForm.start) {
      setToast('Choose an end time after the start time');
      return;
    }
    const overlap = data.events.find(
      (existing) =>
        existing.start.slice(0, 10) === entry.start.slice(0, 10) &&
        entry.start < existing.end &&
        entry.end > existing.start,
    );
    update((s) => ({ ...s, events: [...s.events, entry] }));
    setModal('');
    setToast(
      overlap
        ? `Saved with a schedule overlap: ${overlap.title}`
        : 'Event added to your calendar',
    );
  };

  const createPlan = (event: FormEvent) => {
    event.preventDefault();
    const target = data.items.find((item) => item.id === planForm.targetId);
    if (!target) return;
    const count = Math.max(1, Math.ceil(target.estimatedMinutes / 60));
    const sessions = Array.from({ length: count }, (_, i) => {
      const date = new Date('2026-11-17T12:00:00');
      date.setDate(date.getDate() + i * 2);
      return {
        date: dateKey(date),
        start: '18:00',
        minutes: Math.min(60, target.estimatedMinutes - i * 60),
        topic: i === count - 1 ? 'Review and wrap up' : `Focused work block ${i + 1}`,
        done: false,
      };
    });
    update((s) => ({
      ...s,
      plans: [
        {
          id: id(),
          title: `${target.title} — study plan`,
          targetId: target.id,
          availableMinutes: Number(planForm.availableMinutes),
          completionDate: planForm.completionDate,
          sessions,
          status:
            target.estimatedMinutes > Number(planForm.availableMinutes)
              ? 'needs adjustment'
              : 'proposed',
        },
        ...s.plans,
      ],
    }));
    setModal('');
    router.push('/planner');
    setToast(
      target.estimatedMinutes > Number(planForm.availableMinutes)
        ? 'Plan created — it needs more available time'
        : 'Draft plan is ready to review',
    );
  };

  const toggleTask = (task: AcademicItem) =>
    update((s) => ({
      ...s,
      items: s.items.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: item.status === 'completed' ? 'not started' : 'completed',
              progress: item.status === 'completed' ? 0 : 100,
            }
          : item,
      ),
    }));

  const toggleSubtask = (itemId: string, index: number) =>
    update((s) => ({
      ...s,
      items: s.items.map((item) =>
        item.id === itemId
          ? (() => {
              const subtasks = item.subtasks.map((sub, i) =>
                i === index ? { ...sub, done: !sub.done } : sub,
              );
              const progress = subtasks.length
                ? Math.round(
                    (subtasks.filter((sub) => sub.done).length /
                      subtasks.length) *
                      100,
                  )
                : item.progress;
              return {
                ...item,
                subtasks,
                progress,
                status:
                  progress === 100
                    ? ('completed' as const)
                    : progress
                      ? ('in progress' as const)
                      : ('not started' as const),
              };
            })()
          : item,
      ),
    }));

  const value: TimoraContextValue = {
    data,
    update,
    query,
    setQuery,
    filteredItems,
    modal,
    setModal,
    selectedItem,
    toast,
    setToast,
    taskForm,
    setTaskForm,
    courseForm,
    setCourseForm,
    eventForm,
    setEventForm,
    planForm,
    setPlanForm,
    openModal,
    openTaskDetail,
    addTask,
    addCourse,
    addEvent,
    createPlan,
    toggleTask,
    toggleSubtask,
  };

  return (
    <TimoraContext.Provider value={value}>{children}</TimoraContext.Provider>
  );
}

export function useTimora() {
  const context = useContext(TimoraContext);
  if (!context) {
    throw new Error('useTimora must be used inside a TimoraProvider');
  }
  return context;
}
