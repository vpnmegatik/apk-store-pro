# apk-store-pro

Production-grade APK marketplace with hardened Supabase integration, secure upload/download APIs, and App Router architecture for Vercel.

## Architecture

- `app/` route handlers, pages, metadata, middleware-protected surfaces
- `components/` reusable UI, dashboard shell, monetization slots
- `lib/` env, auth, security, logging, Supabase clients
- `services/` business logic (upload/download/auth)
- `repositories/` data access layer
- `types/` shared domain types
- `utils/` utility helpers

## Security posture

- Supabase client split:
  - `lib/supabaseClient.ts` browser anon SDK
  - `lib/supabaseServer.ts` server auth SDK + service-role SDK
- Role-gated middleware for `/dashboard/*` and `/api/upload`
- API rate limiting and abuse controls
- Centralized route error handling and structured logging
- Server-only upload processing with strict file validation and size limits
- Signed URL downloads from private storage bucket paths

## Storage layout

- `private-assets/apks/*`
- `public-assets/icons/*`
- `public-assets/screenshots/*`

## Environment files

Use `.env.local` for local development (never commit real secrets), and keep `.env.example` sanitized with placeholders only.

### `.env.local` template sections

- Core
- Supabase Public (client-safe)
- Supabase Secret (server-only)
- Optional Ads/Malware/AI integrations

## Vercel environment mapping

Set the following in Vercel Project → Settings → Environment Variables:

- `NEXT_PUBLIC_SITE_URL` → production URL (e.g. `https://apk-store-pro.vercel.app`)
- `NEXT_PUBLIC_SUPABASE_URL` → Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key (client-safe)
- `SUPABASE_SERVICE_ROLE_KEY` → service role key (server only, never expose)
- `NEXT_PUBLIC_ADSENSE_CLIENT` → optional AdSense client ID
- `MALWARE_SCAN_API_KEY` → optional malware API secret
- `OPENAI_API_KEY` → optional OpenAI API secret

## Deploy (Vercel)

1. Set environment variables in Vercel project settings.
2. Configure Supabase buckets:
   - `private-assets` (private)
   - `public-assets` (public)
3. Run migration SQL (`supabase/schema.sql`).
4. Deploy.

## Commands

```bash
npm install
npm run typecheck
npm run lint
npm run build
```
