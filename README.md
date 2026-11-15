# Timora

A calm academic planner for courses, assignments, schedules, and focused study.

This project was originally generated on Replit as a pnpm workspace with a Vite
SPA. It now runs as a standalone **Next.js 16 App Router** application that can be
deployed to Vercel with zero configuration.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react icons
- Browser `localStorage` for the demo state (no backend or database required)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run typecheck   # TypeScript only
npm run build       # production build
npm start           # serve the production build
```

## Routes

| Route          | Page                 |
| -------------- | -------------------- |
| `/`            | Dashboard            |
| `/courses`     | My courses           |
| `/assignments` | Assignments & exams  |
| `/calendar`    | Calendar             |
| `/planner`     | Study planner        |
| `/focus`       | Focus sessions       |
| `/assistant`   | Study assistant      |
| `/insights`    | Insights             |
| `/schedule`    | My schedule          |
| `/settings`    | Settings             |

## Project structure

```text
app/
  layout.tsx              Root layout, metadata, providers and app shell
  page.tsx                Dashboard
  <route>/page.tsx        One page per workspace section
  globals.css             Design tokens and all Timora styles
components/timora/
  app-shell.tsx           Sidebar, top bar, mobile nav, toast
  timora-provider.tsx     Shared demo state, actions, local persistence
  route-pages.tsx         Thin route wrappers that connect state to pages
  pages.tsx               The ten workspace screens
  modal.tsx               Add/detail dialogs
  ui.tsx                  Shared presentational components and helpers
lib/
  timora-data.ts          Types and seeded demo data
public/
  favicon.svg
  robots.txt
```

The demo stores changes under the `timora-demo-v2` and `timora-availability`
keys in the browser. There is no server-side persistence.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel detects Next.js automatically. Keep the default settings:
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Output directory: `.next` (default)
   - Install command: `npm install`
4. No environment variables are required. Click **Deploy**.

You can also deploy from the CLI:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Migration notes

- Removed the Replit `.replit` config, workflows, artifact folders, mockup
  sandbox, unused API/DB packages, and Replit Vite plugins.
- Replaced Vite + wouter routing with the Next.js App Router and `next/link`.
- Moved shared state into a client provider so each route is a real Next.js page.
- Deferred `localStorage` reads to effects to keep server rendering and
  hydration deterministic.
- Replaced the pnpm catalog/workspace setup with a standard npm lockfile.
