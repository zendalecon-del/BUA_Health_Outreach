# BUA Health Outreach Registration & Screening System

A production-oriented Next.js 16 application for participant registration, secure result lookup, staff screening, referral/follow-up operations, staff administration, transactional email and Excel export.

## What changed in Version 2

- Complete visual redesign using the supplied official BUA and Zendale assets.
- BUA red and gold combined with Zendale blue in a restrained corporate-health design system.
- Supplied outreach photographs integrated into the public opening and portal login experiences.
- Fake dashboard statistics and fake participant records removed.
- Public registration now writes to Supabase PostgreSQL.
- Private lookup codes are generated with cryptographic randomness and stored only as HMAC hashes.
- Participant lookup returns a restricted participant-safe projection.
- Supabase Auth staff/admin sign-in using immutable Staff IDs.
- Live participant lists, dashboards, screenings, referrals, follow-ups, hospitals and staff accounts.
- Resend registration confirmation, staff credential and result-ready notification workflows.
- Real Excel export from database records.
- Server-side rate limiting stored in PostgreSQL.
- Node 22, npm 10.9.2, public npm registry, Netlify and Vercel deployment configuration.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn/ui-style Radix components
- Motion for React
- Supabase PostgreSQL and Auth
- Resend
- ExcelJS

## Required environment variables

Copy `.env.example` to `.env.local` for local work. Add the same values in Netlify or Vercel settings.

```env
APP_URL=https://your-production-domain.example
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_FROM=BUA Health Outreach <no-reply@notifications.example.com>
SUPPORT_EMAIL=outreach-support@example.com
LOOKUP_CODE_PEPPER=
```

Generate the pepper once and store it securely:

```bash
openssl rand -hex 48
```

Do not change the pepper after participant records have been created.

## Database setup

1. Create the Supabase project.
2. Open **SQL Editor**.
3. Run `supabase/migrations/202607170001_initial_schema.sql` once.
4. In Supabase Authentication, create the first administrator user with email and password.
5. Edit `supabase/BOOTSTRAP_ADMIN.sql` and replace the administrator email.
6. Run the edited bootstrap query.
7. Sign in through `/admin/login` using the generated Staff ID from `staff_profiles` and the Auth password.

The SQL intentionally creates no anonymous table policies. Public registration and lookup pass through protected Next.js route handlers using the server-only service-role key.

## Local development

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The repository contains:

- `.nvmrc` — Node 22
- `.npmrc` — public npm registry and CI-friendly settings
- `packageManager` — npm 10.9.2
- `vercel.json` — deterministic Vercel install/build commands
- `netlify.toml` — Node/npm versions; Netlify applies its current OpenNext adapter automatically

Keep `package.json`, `package-lock.json`, `.npmrc`, `.nvmrc`, `vercel.json` and `netlify.toml` at the repository root.

## Security boundaries

- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` and `LOOKUP_CODE_PEPPER` are server-only secrets.
- Never prefix them with `NEXT_PUBLIC_`.
- Do not store secrets in GitHub.
- The supplied database migration enables RLS and denies direct anonymous table access.
- The public lookup response excludes internal notes, staff identity and audit metadata.
- Excel exports exclude passwords and lookup-code plaintext.

## Production approval

This source implements technical safeguards but does not replace BUA/Zendale clinical, legal, privacy, retention, incident-response and information-security approval. Complete those reviews before collecting real health information.
