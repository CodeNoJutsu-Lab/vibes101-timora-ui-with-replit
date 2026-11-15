'use client';

import { useRouter } from 'next/navigation';
import {
  AssignmentsPage,
  AssistantPage,
  CalendarPage,
  CoursesPage,
  Dashboard,
  FocusPage,
  InsightsPage,
  NotFound,
  PlannerPage,
  SchedulePage,
  SettingsPage,
} from './pages';
import { useTimora } from './timora-provider';

export function DashboardRoute() {
  const { data, openTaskDetail, openModal } = useTimora();
  const router = useRouter();
  return (
    <Dashboard
      data={data}
      openTask={openTaskDetail}
      go={(path) => router.push(path)}
      onCreate={() => openModal('task')}
    />
  );
}

export function CoursesRoute() {
  const { data, openTaskDetail, openModal } = useTimora();
  return (
    <CoursesPage
      data={data}
      openTask={openTaskDetail}
      onCreate={() => openModal('course')}
    />
  );
}

export function AssignmentsRoute() {
  const {
    data,
    filteredItems,
    toggleTask,
    openTaskDetail,
    openModal,
  } = useTimora();
  return (
    <AssignmentsPage
      data={data}
      items={filteredItems}
      toggleTask={toggleTask}
      openTask={openTaskDetail}
      onCreate={() => openModal('task')}
    />
  );
}

export function CalendarRoute() {
  const { data, openModal } = useTimora();
  return <CalendarPage data={data} onCreate={() => openModal('event')} />;
}

export function PlannerRoute() {
  const { data, update, openModal } = useTimora();
  const router = useRouter();
  return (
    <PlannerPage
      data={data}
      update={update}
      onCreate={() => openModal('plan')}
      go={(path) => router.push(path)}
    />
  );
}

export function FocusRoute() {
  const { data, update } = useTimora();
  return <FocusPage data={data} update={update} />;
}

export function AssistantRoute() {
  const { data, update, openModal } = useTimora();
  return (
    <AssistantPage
      data={data}
      update={update}
      onCreatePlan={() => openModal('plan')}
    />
  );
}

export function InsightsRoute() {
  const { data } = useTimora();
  return <InsightsPage data={data} />;
}

export function ScheduleRoute() {
  const { data, update, openModal } = useTimora();
  return (
    <SchedulePage
      data={data}
      update={update}
      onCreate={() => openModal('event')}
    />
  );
}

export function SettingsRoute() {
  const { data, update } = useTimora();
  return <SettingsPage data={data} update={update} />;
}

export function NotFoundRoute() {
  const router = useRouter();
  return <NotFound go={(path) => router.push(path)} />;
}
