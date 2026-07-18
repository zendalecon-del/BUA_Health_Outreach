# BUA Health Outreach v2.6.2

## Fixes

- Removes the deployment conflict caused by the old tracked `BUA_Health_Outreach_Production_Rebuild` directory.
- Prevents TypeScript and ESLint from scanning temporary extracted deployment folders.
- Confirms the registration API uses the multi-select `requestedServices` field.
- Includes the lookup-code reset email function required by the administrator reset route.
- Updates package version to 2.6.2.

## Deployment rule

Delete the stale nested project directory before testing and committing. Do not deploy if typecheck or build fails.
