# Supabase Registration Fix — v2.5

The public registration route now exposes a safe readiness check at `/api/register`.

Before testing the form, run `supabase/REGISTRATION_COMPATIBILITY_V2_5.sql` once in the Supabase SQL Editor. The script is idempotent and may be rerun if necessary.

After deployment, open:

```text
https://buahealth.netlify.app/api/register
```

Expected healthy response:

```json
{"ready":true,"code":"REGISTRATION_READY"}
```

The readiness check does not reveal keys, connection strings or participant information.
