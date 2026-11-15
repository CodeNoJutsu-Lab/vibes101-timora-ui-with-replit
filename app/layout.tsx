import type { Metadata, Viewport } from 'next';
import { AppShell } from '@/components/timora/app-shell';
import { TimoraProvider } from '@/components/timora/timora-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Timora',
  description:
    'Timora helps students organize courses, assignments, schedules, and study sessions in one calm academic planner.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Timora',
    description:
      'A calm academic planner for courses, assignments, schedules, and focused study.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timora',
    description:
      'A calm academic planner for courses, assignments, schedules, and focused study.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TimoraProvider>
          <AppShell>{children}</AppShell>
        </TimoraProvider>
      </body>
    </html>
  );
}
