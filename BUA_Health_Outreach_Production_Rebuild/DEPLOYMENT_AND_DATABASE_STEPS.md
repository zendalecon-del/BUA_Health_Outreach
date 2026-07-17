# Deployment and Database Steps

## A. Replace the old GitHub repository contents

The new package is a complete replacement. Upload the contents of this folder so these files appear directly at the repository root:

```text
app/
components/
lib/
public/
supabase/
.env.example
.npmrc
.nvmrc
netlify.toml
vercel.json
package.json
package-lock.json
```

Do not upload `node_modules`, `.next` or `.env.local`.

## B. Fix the Vercel project

The earlier Vercel screenshot showed commit `5041a60`, the old 53-line package.json and no visible `.nvmrc` or `.npmrc`. That Vercel project was therefore still building the old repository state.

After uploading this replacement package:

1. Open Vercel → Project Settings → Build and Deployment.
2. Set **Root Directory** to the repository root.
3. Set **Node.js Version** to **22.x**.
4. Remove any old custom Install Command override. The committed `vercel.json` supplies it.
5. Keep Build Command automatic, or use `npm run build`.
6. Redeploy without cache.

The expected install command is:

```bash
npm ci --no-audit --no-fund --progress=false
```

## C. Netlify settings

The committed `netlify.toml` selects Node 22 and npm 10.9.2.

1. Link the replacement GitHub repository or commit.
2. Leave Base directory blank.
3. Build command: `npm run build`.
4. Do not set `public`, `out`, `dist` or `build` as the publish directory.
5. Add environment variables under Project configuration → Environment variables.
6. Clear cache and deploy.

## D. Supabase SQL

Use this SQL file:

```text
supabase/migrations/202607170001_initial_schema.sql
```

It creates:

- participants
- screenings
- referrals
- follow_ups
- referral_hospitals
- staff_profiles
- email_events
- audit_events
- rate_limit_events
- registration and Staff ID sequences
- update triggers
- indexes
- RLS policies
- initial referral hospital options

After the schema, create the first Auth user and run:

```text
supabase/BOOTSTRAP_ADMIN.sql
```

Edit the email placeholder before running it.

## E. Environment values

Use the exact keys below in Netlify or Vercel:

```text
APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
EMAIL_FROM
SUPPORT_EMAIL
LOOKUP_CODE_PEPPER
```

## F. First live test

1. Open `/register` and submit a test participant.
2. Confirm the record appears in Supabase → Table Editor → participants.
3. Confirm both identifiers appear on the success page.
4. Use `/lookup` with the correct pair.
5. Confirm an incorrect pair returns only a generic failure.
6. Sign in as the bootstrapped administrator.
7. Create a medical staff account from Staff Management.
8. Sign in as the medical staff user and complete a screening.
9. Confirm referral/follow-up records are generated only when selected.
10. Generate the Excel export and reconcile its totals with the dashboard.
