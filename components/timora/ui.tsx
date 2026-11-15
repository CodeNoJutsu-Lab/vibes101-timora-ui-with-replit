'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { today, type AcademicItem, type Course, type TimoraState } from '@/lib/timora-data';

export const fmtDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' },
) =>
  new Intl.DateTimeFormat('en-US', options).format(
    new Date(`${value.slice(0, 10)}T12:00:00`),
  );

export const timeText = (value: string) =>
  new Date(value).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

export const id = () => Math.random().toString(36).slice(2, 9);

/** Format a Date as YYYY-MM-DD using its local calendar values. */
export const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

export const courseOf = (courses: Course[], courseId?: string) =>
  courses.find((course) => course.id === courseId);

export const statusTone = (status: string) =>
  status === 'completed' || status === 'approved'
    ? 'green'
    : status === 'in progress'
      ? 'purple'
      : status === 'proposed'
        ? 'orange'
        : 'rose';

export function Heading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Button({
  children,
  onClick,
  kind = 'primary',
  testId,
  small = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: 'primary' | 'soft' | 'plain';
  testId?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      className={`btn btn-${kind} ${small ? 'btn-sm' : ''}`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export function TimoMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="24"
      height="24"
      role="img"
      aria-label="Timo, Timora's study companion"
    >
      <path
        d="M13 16.5c1.3-5.2 5.2-8 11-8s9.7 2.8 11 8l2.6 14.1a5.8 5.8 0 0 1-5.7 6.9H16.1a5.8 5.8 0 0 1-5.7-6.9L13 16.5Z"
        fill="#8E7BE8"
      />
      <path
        d="M14.2 13.1 11 7.8a1 1 0 0 1 1.3-1.4l6 3.2M33.8 13.1 37 7.8a1 1 0 0 0-1.3-1.4l-6 3.2"
        fill="#A995F2"
      />
      <ellipse cx="19" cy="22" rx="1.55" ry="2" fill="#29243E" />
      <ellipse cx="29" cy="22" rx="1.55" ry="2" fill="#29243E" />
      <path
        d="M20.4 28.4c1.9 1.7 5.3 1.7 7.2 0"
        fill="none"
        stroke="#4F438F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m38 12 1.2 2.4 2.6.4-1.9 1.9.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.9 2.6-.4L38 12Z"
        fill="#D49ABF"
      />
    </svg>
  );
}

export function TaskLine({
  item,
  data,
  onClick,
}: {
  item: AcademicItem;
  data: TimoraState;
  onClick: () => void;
}) {
  const course = courseOf(data.courses, item.courseId);
  return (
    <button
      className="list-row task-line"
      onClick={onClick}
      data-testid={`row-task-${item.id}`}
    >
      <span className="course-dot" style={{ background: course?.color }} />
      <span className="row-main">
        <span className="row-title">{item.title}</span>
        <span className="row-meta">
          {course?.code} · {item.type}
        </span>
      </span>
      <span
        className={`pill ${
          item.priority === 'high'
            ? 'rose'
            : item.priority === 'medium'
              ? 'orange'
              : ''
        }`}
      >
        {item.priority}
      </span>
      <span className="task-due">{fmtDate(item.dueDate)}</span>
      <ArrowUpRight size={14} color="#aaa6b3" />
    </button>
  );
}

export function StudyBars({
  sessions,
  dailyGoal = 120,
}: {
  sessions: { date?: string; duration: number; status: string }[];
  dailyGoal?: number;
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(`${today}T12:00:00`);
    date.setDate(date.getDate() - (6 - i));
    const key = dateKey(date);
    const minutes = sessions
      .filter((session) => session.date === key && session.status === 'completed')
      .reduce((sum, session) => sum + session.duration, 0);
    return {
      key,
      minutes,
      label: date.toLocaleDateString('en-US', { weekday: 'narrow' }),
    };
  });
  return (
    <div className="chart-bars">
      {days.map(({ key, minutes, label }) => (
        <div className="bar-group" key={key}>
          <div className="bar-stack">
            <span
              className="bar done"
              style={{ height: `${Math.min(100, (minutes / dailyGoal) * 100)}%` }}
            />
            <span className="bar" style={{ height: '100%' }} />
          </div>
          <span className="bar-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function SettingToggle({
  title,
  detail,
  checked,
  onClick,
  testId,
}: {
  title: string;
  detail: string;
  checked: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <div className="setting-row">
      <div>
        <b>{title}</b>
        <small>{detail}</small>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        className={`switch ${checked ? 'on' : ''}`}
        onClick={onClick}
        aria-label={title}
        data-testid={testId}
      />
    </div>
  );
}

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function Empty({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty-mark">
        <TimoMark />
      </div>
      <b>{title}</b>
      <p>{text}</p>
      {action}
    </div>
  );
}
