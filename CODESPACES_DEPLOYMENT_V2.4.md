# GitHub Codespaces Deployment — v2.4

1. Upload `BUA_Health_Outreach_Enterprise_v2.4.zip` beside `package.json`.
2. Create and push backup branch `backup-before-enterprise-v24`.
3. Extract the ZIP.
4. Copy the contents of `BUA_Health_Outreach_Production_Rebuild` to the repository root.
5. Remove the extracted folder and ZIP.
6. Use Node 22 and npm 10.9.2.
7. Run `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build`.
8. Run `git add .` before committing.
9. Commit and push to `main`.
10. Confirm the Netlify deploy message and hard-refresh the live routes.
