# BUA Health Outreach Registration & Screening System

A polished, responsive Next.js implementation of the BUA Health Outreach product specification. It includes the public participant experience, staff portal, admin portal, animated multi-step forms, secure-lookup experience, screening workflow, operational queues, staff and referral-hospital management, plus a working Excel workbook export.

> **Prototype status:** the complete UX and route structure are implemented with realistic mock records. The registration endpoint generates demo identifiers and the Excel endpoint generates a real `.xlsx` workbook. Supabase authentication/database, production audit storage, rate limiting and Resend delivery are intentionally not connected because deployment credentials and approved data policies were not supplied.

## Technology

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui-style Radix components
- Motion for React (current Framer Motion package)
- Zod validation
- ExcelJS workbook generation
- Lucide icon system

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production verification:

```bash
npm run lint
npm run build
npm run start
```

## Demo entry points

### Public

- `/` — registration opening page
- `/register` — six-step participant registration
- `/registration-success` — generated identifiers and copy/print actions
- `/lookup` — secure registration number + private code entry
- `/lookup/record` — participant-safe result view

### Staff

- `/staff/login` — prefilled demo sign-in
- `/staff/dashboard`
- `/staff/participants`
- `/staff/participants/1`
- `/staff/screenings/1`
- `/staff/referrals-followups`
- `/staff/change-password`

### Admin

- `/admin/login` — prefilled demo sign-in
- `/admin/dashboard`
- `/admin/participants`
- `/admin/screenings`
- `/admin/referrals-followups`
- `/admin/referral-hospitals`
- `/admin/staff`
- `/admin/export`
- `/admin/change-password`

## Working prototype operations

- `POST /api/register` validates the core payload and returns a demo registration number and cryptographically random lookup code.
- `GET /api/admin/export` generates a real Excel workbook with Participants, Screenings, Referrals, Follow-ups, Complete Records, Staff Activity and Export Info sheets.
- The public registration draft is retained in `sessionStorage` during the active browser session.
- Staff/admin tables, filters, forms, modals, status controls and notification feedback are interactive mock workflows.

## Production connection checklist

1. Replace `components/brand.tsx` with the approved official BUA and Zendale artwork.
2. Add Supabase/PostgreSQL schema, migrations, RLS policies and approved geographic region.
3. Replace demo portal authentication with Supabase Auth or the approved identity provider.
4. Store only a strong hash of the private lookup code and add a server-side pepper.
5. Implement database sequences for registration numbers and Staff IDs.
6. Add transactional registration/credential/result email adapters and delivery webhooks.
7. Add endpoint-specific rate limits, generic authentication failures and temporary lockouts.
8. Add immutable audit events, data-retention rules, backups and incident monitoring.
9. Obtain clinical, privacy, legal and information-security approval before processing real health information.

## Design notes

The visual system uses a calm healthcare palette: deep navy for authority, teal for care and progress, warm gold for attention, and high-contrast off-white surfaces. The public journey intentionally has no marketing navigation. Yes/No consent controls are neutral and never preselected. Motion respects the operating system's reduced-motion preference.
