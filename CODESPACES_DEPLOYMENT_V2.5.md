# GitHub Codespaces Deployment — v2.5

## Part A — Replace the project files

1. Download `BUA_Health_Outreach_Enterprise_Experience_v2.5.zip`.
2. Open the GitHub repository connected to Netlify.
3. Click **Code → Codespaces** and open the existing Codespace.
4. Drag the ZIP into the repository root beside `package.json`.
5. Run each command separately:

```bash
git branch backup-before-enterprise-v25
```

```bash
git push origin backup-before-enterprise-v25
```

```bash
unzip -q BUA_Health_Outreach_Enterprise_Experience_v2.5.zip
```

```bash
cp -a BUA_Health_Outreach_Production_Rebuild/. .
```

```bash
rm -rf BUA_Health_Outreach_Production_Rebuild
```

```bash
rm -f BUA_Health_Outreach_Enterprise_Experience_v2.5.zip
```

6. Confirm the version:

```bash
head -n 12 package.json
```

It must show `"version": "2.5.0"`.

7. Select the required Node and npm versions:

```bash
nvm install 22
```

```bash
nvm use 22
```

```bash
npm install -g npm@10.9.2
```

8. Install and verify:

```bash
npm ci --no-audit --no-fund --progress=false
```

```bash
npm run typecheck
```

```bash
npm run lint
```

```bash
npm run build
```

Do not continue if the production build fails.

## Part B — Commit and deploy

9. Add the changes:

```bash
git add .
```

10. Confirm that Git says **Changes to be committed**:

```bash
git status
```

11. Commit:

```bash
git commit -m "Deploy enterprise experience and registration reliability v2.5"
```

12. Push:

```bash
git push origin main
```

13. In Netlify, open **buahealth → Deploys** and wait for the commit above to show **Published**.

## Part C — Apply the registration compatibility update

14. In the extracted project, open:

```text
supabase/REGISTRATION_COMPATIBILITY_V2_5.sql
```

15. Copy the complete SQL file.
16. Open **Supabase → SQL Editor → New query**.
17. Paste the SQL and click **Run**.
18. The final result must show all five readiness values as `true`.

## Part D — Verify production

19. Open:

```text
https://buahealth.netlify.app/api/register
```

A healthy setup returns:

```json
{"ready":true,"code":"REGISTRATION_READY"}
```

20. Hard-refresh these pages with `Ctrl + Shift + R`:

```text
https://buahealth.netlify.app/
https://buahealth.netlify.app/register
https://buahealth.netlify.app/zendale
```

21. Submit one new test registration with a new email address.
22. Confirm the participant appears in **Supabase → Table Editor → participants**.

## If the readiness URL is not ready

- `CONFIGURATION_REQUIRED`: confirm `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `LOOKUP_CODE_PEPPER` in Netlify environment variables.
- `DATABASE_SETUP_REQUIRED`: run the compatibility SQL.
- `DATABASE_UPDATE_REQUIRED`: run the compatibility SQL and redeploy.
- `DATABASE_CREDENTIAL_ERROR`: replace the Supabase service-role key in Netlify.
