# GitHub Codespaces deployment — BUA Health Outreach v2.6

Use the ZIP file `BUA_Health_Outreach_Premium_System_v2.6.zip`.

## 1. Open Codespaces

Open the GitHub repository connected to Netlify, click **Code → Codespaces**, and open the existing Codespace.

## 2. Upload the ZIP

Drag the ZIP into the repository root beside `package.json`.

## 3. Create and push a backup branch

```bash
git branch backup-before-premium-v26
git push origin backup-before-premium-v26
```

## 4. Extract and copy the new project

```bash
unzip -q BUA_Health_Outreach_Premium_System_v2.6.zip
cp -a BUA_Health_Outreach_Production_Rebuild/. .
rm -rf BUA_Health_Outreach_Production_Rebuild
rm -f BUA_Health_Outreach_Premium_System_v2.6.zip
```

## 5. Confirm the version

```bash
head -n 12 package.json
```

Confirm that the version is `2.6.0`.

## 6. Select the supported runtime

```bash
nvm install 22
nvm use 22
npm install -g npm@10.9.2
node -v
npm -v
```

Node must begin with `v22` and npm must begin with `10`.

## 7. Install and verify

Run one command at a time:

```bash
npm ci --no-audit --no-fund --progress=false
npm run typecheck
npm run lint
npm run build
```

Do not continue if the production build fails.

## 8. Commit correctly

```bash
git status
git add .
git status
```

The second `git status` must say **Changes to be committed**.

Then run:

```bash
git commit -m "Deploy premium public experience and system upgrade v2.6"
git push origin main
```

## 9. Run the database upgrade

In Supabase SQL Editor, run the entire file:

`supabase/BUA_SYSTEM_UPGRADE_V2_6.sql`

Confirm that every readiness value at the bottom is `true`.

## 10. Check Netlify

Open **Netlify → buahealth → Deploys**. Wait until the commit named `Deploy premium public experience and system upgrade v2.6` is published.

If it does not start automatically, choose **Trigger deploy → Clear cache and deploy site**.

## 11. Production checks

Hard-refresh each page with `Ctrl + Shift + R`:

- `/`
- `/register`
- `/zendale`
- `/lookup`

Then open:

- `/api/register`
- `/api/lookup`

Both must return `ready: true` before live testing.

## 12. Create the first administrator

Follow `DATABASE_ADMIN_LOOKUP_V2.6.md` and run `supabase/CREATE_FIRST_ADMIN_V2_6.sql` only after creating the matching user in Supabase Authentication.
