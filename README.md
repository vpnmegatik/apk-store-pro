# apk-store-pro

Production-ready APK distribution platform (APKPure-style) with role-based dashboards, upload review flow, monetization modules, and SEO-first public pages.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn-style component primitives
- Framer Motion + Recharts
- Supabase (Auth, Postgres, Storage)
- Vercel deployment + GitHub Actions CI

## Features
### Public site
- SEO homepage with instant app search
- Categories page
- App detail pages with SSR/ISR
- JSON-LD structured data + OpenGraph metadata
- Dynamic sitemap and robots

### Upload & moderation
- APK/XAPK validation
- Slug generation
- Screenshot upload
- Pending/approved/rejected status workflow
- Signed download URLs + per-endpoint rate limiting

### Dashboards
- **Admin/Moderator:** approvals, users, ads, analytics, subscriptions
- **Publisher:** app upload/edit, revenue and download view
- **User:** favorites and comments

### Monetization
- Google AdSense slots
- Custom banner ads
- Affiliate links per app
- SaaS subscription schema scaffold

### Bonus implemented scaffolds
- Multi-language ready architecture
- Public API endpoint for developers (`/api/apps`)
- AI description generation endpoint (`/api/ai-description`)
- Malware scan integration endpoint (`/api/scan`)

## Project structure

```txt
app/
  (public)/
  dashboard/
  api/
components/
lib/
hooks/
types/
utils/
supabase/
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
3. Initialize Supabase SQL schema:
   - Run `supabase/schema.sql` in the Supabase SQL editor.
4. Create Supabase Storage buckets:
   - `apks` (private)
   - `icons` (public)
   - `screenshots` (public)
5. Start development server:
   ```bash
   npm run dev
   ```

## Deploy
### Vercel
1. Import repository into Vercel.
2. Configure env variables from `.env.example`.
3. Set build command: `npm run build`.
4. Deploy.

### GitHub CI/CD
- Workflow in `.github/workflows/ci.yml` runs typecheck, lint, and build.

## Security checklist
- Enforce RLS policies in Supabase.
- Keep APK bucket private and only serve via signed URLs.
- Add edge/CDN WAF rules in front of download endpoints.
- Connect malware scan endpoint to an actual scanning vendor.
