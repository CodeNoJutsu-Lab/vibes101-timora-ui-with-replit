'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AlarmClock,
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  SquareCheckBig,
  Timer,
  WandSparkles,
} from 'lucide-react';
import { TimoraModal } from './modal';
import { useTimora } from './timora-provider';

const links = [
  { section: 'OVERVIEW', items: [{ href: '/', label: 'Dashboard', Icon: Home }] },
  {
    section: 'ACADEMIC',
    items: [
      { href: '/courses', label: 'My courses', Icon: BookOpen },
      { href: '/assignments', label: 'Assignments & exams', Icon: SquareCheckBig },
    ],
  },
  {
    section: 'PRODUCTIVITY',
    items: [
      { href: '/calendar', label: 'Calendar', Icon: CalendarDays },
      { href: '/planner', label: 'Study planner', Icon: WandSparkles },
      { href: '/focus', label: 'Focus sessions', Icon: Timer },
    ],
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { href: '/assistant', label: 'Study assistant', Icon: Sparkles },
      { href: '/insights', label: 'Insights', Icon: ChartNoAxesCombined },
    ],
  },
  {
    section: 'PERSONAL',
    items: [
      { href: '/schedule', label: 'My schedule', Icon: Clock3 },
      { href: '/settings', label: 'Settings', Icon: Settings },
    ],
  },
];

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/courses': 'My courses',
  '/assignments': 'Assignments & exams',
  '/calendar': 'Calendar',
  '/planner': 'Study planner',
  '/focus': 'Focus sessions',
  '/assistant': 'Study assistant',
  '/insights': 'Insights',
  '/schedule': 'My schedule',
  '/settings': 'Settings',
};

export function AppShell({ children }: { children: ReactNode }) {
  const { data, query, setQuery, setToast, openModal, modal, toast } =
    useTimora();
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = titles[pathname] ?? 'Dashboard';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/" className="brand" data-testid="link-brand">
          <span className="brand-mark">t</span>
          <span>timora</span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map((group) => (
            <div key={group.section}>
              <div className="nav-label">{group.section}</div>
              {group.items.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname === href ? 'active' : ''}`}
                  data-testid={`link-nav-${href.slice(1) || 'dashboard'}`}
                >
                  <Icon />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="profile">
            <div className="avatar">AM</div>
            <div>
              <div className="profile-name">{String(data.settings.name)}</div>
              <div className="profile-meta">Fall 2026 · Student</div>
            </div>
            <MoreHorizontal size={16} color="#9995a5" />
          </div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="crumb">
            <b>{pageTitle}</b>
            <span> &nbsp;·&nbsp; Fall 2026</span>
          </div>
          <div className="top-actions">
            <label className="search-box">
              <Search size={15} />
              <input
                aria-label="Search your work"
                placeholder="Search your work"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') router.push('/assignments');
                }}
                data-testid="input-global-search"
              />
            </label>
            <button
              className="icon-btn"
              aria-label="Notifications"
              onClick={() => setToast('You’re all caught up for now')}
              data-testid="button-notifications"
            >
              <AlarmClock size={16} />
            </button>
            <button
              className="icon-btn"
              aria-label="Quick add task"
              onClick={() => openModal('task')}
              data-testid="button-quick-add"
            >
              <Plus size={17} />
            </button>
            <div className="avatar">AM</div>
          </div>
        </header>
        <div className="content fade-in">{children}</div>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links
          .flatMap((group) => group.items)
          .map(({ href, label, Icon }) => (
            <Link
              href={href}
              key={href}
              className={pathname === href ? 'active' : ''}
              data-testid={`mobile-nav-${href.slice(1) || 'dashboard'}`}
            >
              <Icon />
              <span>
                {label === 'Assignments & exams' ? 'Tasks' : label.split(' ')[0]}
              </span>
            </Link>
          ))}
      </nav>
      {modal && <TimoraModal />}
      {toast && (
        <div role="status" className="toast-pop" data-testid="status-toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
