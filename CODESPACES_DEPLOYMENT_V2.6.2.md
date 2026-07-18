# BUA Health Outreach v2.6.2 — Codespaces Deployment

This release fixes the v2.6.1 deployment problem caused by a stale nested copy of the project being scanned by TypeScript.

## Important

Do not commit or deploy until `npm run typecheck`, `npm run lint`, and `npm run build` all succeed.

## Commands

After uploading `BUA_Health_Outreach_Premium_System_v2.6.2_FIXED.zip` beside `package.json`, run each command separately:

```bash
git fetch origin

```

```bash
git reset --hard origin/backup-before-premium-v26
```

```bash
rm -rf BUA_Health_Outreach_Production_Rebuild BUA_Health_Outreach_v2_6_1 BUA_Health_Outreach_v2_6_2
```

```bash
unzip -q BUA_Health_Outreach_Premium_System_v2.6.2_FIXED.zip
```

```bash
cp -a BUA_Health_Outreach_v2_6_2/. .
```

```bash
rm -rf BUA_Health_Outreach_v2_6_2
rm -f BUA_Health_Outreach_Premium_System_v2.6.2_FIXED.zip
```

```bash
head -n 12 package.json
```

Confirm the version is `2.6.2`.

```bash
nvm use 22
npm ci --no-audit --no-fund --progress=false
npm run typecheck
npm run lint
npm run build
```

Only after all checks succeed:

```bash
git add .
git status
git commit -m "Deploy corrected premium system v2.6.2"
git push origin main
```
