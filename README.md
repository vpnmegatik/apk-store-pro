# apk-store-pro

Production-ready APK marketplace built on Next.js 15 App Router with a single, unified design system and consolidated layout architecture.

## What is included

### 🎨 Unified design system
- One token source via `app/globals.css` CSS variables + `tailwind.config.ts`
- Dark-first + light theme support with persisted theme preference
- Inter typography, 8px spacing rhythm, soft shadows, glassmorphism cards, and aurora backgrounds
- Shared motion presets for transitions and sidebar interactions

### 🌐 Public product surfaces
- Homepage with hero, trending, categories, featured sections, testimonials, and CTA
- App details (SSR-friendly route), categories, search, and publisher landing pages
- Public route-group layout for consistent top navigation and mobile bottom nav

### 📊 Dashboard system
- Single dashboard layout wrapper for all admin/publisher/user pages
- Collapsible sidebar, sticky top bar, breadcrumb/title generation from App Router path
- Admin: overview, apps management, ads manager, users
- Publisher: overview, my apps, upload wizard, analytics, revenue
- Shared settings and user dashboard routes

### 🧩 Reusable components
- Buttons, badges, tabs, modal, toast, skeletons, animated counters
- Marketing and dashboard component primitives
- Supabase-ready API routes and schema scaffolding

## Folder highlights

```txt
app/
  (public)/        # public website routes + layout
  auth/            # login/register
  dashboard/       # dashboard routes + shared dashboard layout
  api/             # platform APIs
components/
  app/
  dashboard/
  layout/
  marketing/
  providers/
  ui/
lib/
  motion/
  auth.ts
  storage.ts
  supabase.ts
  utils.ts
```

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```
