# apk-store-pro

Ultra-premium APK marketplace UI system + dashboard architecture built with Next.js 15 App Router, Tailwind CSS, shadcn-style reusable UI, Framer Motion, and Supabase-ready backend scaffolding.

## What is included

### 🎨 Design system
- Tokenized color system for dark/light themes (default dark)
- Inter typography and tight heading rhythm
- 8px spacing grid and rounded glass surfaces
- Aurora gradients, neon glow rings, and depth shadows
- Motion presets for cards, fade-up reveals, and sidebar transitions

### 🌐 Public UX
- Premium homepage (hero glow, trending carousel, categories, featured blocks, testimonials, CTA)
- App details page with screenshots slider, tabs, timeline, and related apps
- Categories with filter sidebar, masonry layout, and sorting controls
- Instant search page with debounce + match highlighting
- Publisher landing page with monetization-first messaging

### 📊 Dashboard UX
- Reusable dashboard shell with:
  - collapsible sidebar
  - sticky topbar
  - breadcrumbs
  - global search, notifications, avatar, theme toggle
- Admin pages: overview, apps management, ads manager, users
- Publisher pages: control center, my apps, upload wizard, analytics, revenue
- Shared settings and user dashboard pages

### 🧩 Component library
- Gradient button
- Glass card
- Tag badges
- Skeleton shimmer
- Animated counter
- Tabs
- Modal
- Toast notifications
- Mobile bottom navigation

## Folder highlights

```txt
app/
  (public)/
  auth/
  dashboard/
components/
  dashboard/
  layout/
  marketing/
  providers/
  ui/
hooks/
lib/
  design/
  motion/
```

## Key files
- `lib/design/tokens.ts` → source of visual token truth
- `lib/motion/presets.ts` → motion primitives
- `components/layout/dashboard-shell.tsx` → SaaS shell
- `app/globals.css` + `tailwind.config.ts` → theme + utility system

## Run
```bash
npm install
npm run dev
```

## Notes
- Supabase schema and API scaffolding from prior implementation are preserved.
- Current iteration focuses on premium visual system and dashboard architecture requested in product design brief.
