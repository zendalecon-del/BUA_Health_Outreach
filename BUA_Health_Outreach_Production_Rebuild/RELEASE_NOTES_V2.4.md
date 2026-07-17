# BUA Health Outreach v2.4 — Enterprise Experience Rebuild

## Visual changes

- Rebuilt the public gateway as an application-first programme entry page.
- All essential registration information now appears in the opening viewport on common desktop sizes.
- Rebuilt the Zendale profile around an integrated healthcare-network narrative, capability system and facility directory.
- Rebuilt registration with smaller typography, compact options and no nested answer-area scrolling.
- Split the old review-and-consent screen into a compact summary screen and a separate consent screen.

## Registration reliability

- Email remains compulsory in client and server validation.
- Registration retries with the same browser submission ID are now handled safely instead of failing with a duplicate-record error.
- Setup and credential failures return clear error codes while keeping database details private.
- The production schema now marks participant email as required.

## Important

A successful deployment does not create Supabase tables. If registration returns `SETUP_REQUIRED`, run `supabase/migrations/202607170001_initial_schema.sql` once in the Supabase SQL Editor and confirm the Netlify Supabase variables are correct.
