# Codespaces deployment — v2.3

1. Upload `BUA_Health_Outreach_Premium_v2.3.zip` beside `package.json` in the existing Codespace.
2. Create and push a backup branch.
3. Unzip the file.
4. Copy the extracted project contents over the repository root.
5. Remove the extracted folder and ZIP.
6. Use Node 22 and npm 10.9.2.
7. Run `npm ci`, then `npm run build`.
8. Run `git add .` before committing.
9. Commit and push to `main`.
10. Confirm Netlify publishes the new commit, then hard-refresh the live site.

Full commands are provided in the ChatGPT delivery message.
