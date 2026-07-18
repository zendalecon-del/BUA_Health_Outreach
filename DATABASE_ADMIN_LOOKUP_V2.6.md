# Database, lookup and first-administrator setup — v2.6

## A. Upgrade the database

Run `supabase/BUA_SYSTEM_UPGRADE_V2_6.sql` in Supabase SQL Editor before testing v2.6.

This is the correct upgrade when the earlier database only received `REGISTRATION_COMPATIBILITY_V2_5.sql`. It creates the operational tables that the staff portal and participant lookup expect, while preserving existing participant records.

At the bottom of the SQL result, confirm that every readiness value is `true`.

## B. Verify the two public services

After deployment, open:

- `/api/register`
- `/api/lookup`

Expected responses:

```json
{"ready":true,"code":"REGISTRATION_READY"}
```

```json
{"ready":true,"code":"LOOKUP_READY"}
```

If lookup readiness is true but one old participant still cannot verify, check both identifiers exactly as issued. A changed `LOOKUP_CODE_PEPPER` makes previously generated hashes impossible to verify. Do not change that Netlify environment variable after registrations have begun.

v2.6 also gives an administrator a safe recovery action: open the participant profile and choose **Issue new lookup code**. The old code stops working immediately.

## C. Create the first administrator

1. Open Supabase.
2. Go to **Authentication → Users**.
3. Click **Add user**.
4. Enter the administrator’s real email and a strong temporary password.
5. Confirm the email during creation if Supabase provides that option.
6. Open `supabase/CREATE_FIRST_ADMIN_V2_6.sql`.
7. Replace all placeholder values: administrator email, full name and phone number.
8. Run the complete SQL in **SQL Editor**.
9. Confirm that the result contains a staff ID such as `BUA-STF-001` and the role `administrator`.
10. Open `/admin/login` and sign in with the returned staff ID plus the Supabase Authentication password.

## D. Add other staff

After the first administrator signs in:

1. Open **Admin → Staff**.
2. Choose **Add staff member**.
3. Enter name, email and phone.
4. Select the role:
   - Reception
   - Medical
   - Administrator
5. Choose whether to email credentials.
6. Create the account.
7. Give the new staff member the generated staff ID and temporary password through an approved private channel if email is unavailable.
8. The staff member signs in at `/staff/login`; administrators use `/admin/login`.

## E. Important environment variables

Keep the existing production values in Netlify. Never commit them to GitHub:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LOOKUP_CODE_PEPPER`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_URL`

`LOOKUP_CODE_PEPPER` must remain stable after the first production registration.
