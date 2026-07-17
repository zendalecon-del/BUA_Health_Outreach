# BUA Health Outreach — Visual Approval Build 2.1

This package contains the first structural design-approval pass requested after review of the live Netlify deployment.

## Rebuilt approval screens

1. `/` — Registration opening page
2. `/register` — Complete six-step registration shell, including the redesigned personal-information step
3. `/staff/dashboard` — Operational staff dashboard

## Structural changes

- The previous card-led marketing hero has been replaced by an institutional full-height registration opening experience.
- BUA ownership is now dominant; Zendale is presented as the delivery partner.
- The supplied outreach photography is integrated into the page architecture rather than placed inside generic cards.
- The registration journey now uses a persistent desktop journey rail, a compact mobile header and a flat editorial form canvas.
- The staff portal shell and navigation were rebuilt.
- The staff dashboard now uses one operational brief, a live participant queue and a priority-work column instead of four generic dashboard cards.
- The visual system now uses BUA crimson/gold, Zendale blue, institutional navy and warm neutral surfaces.
- Typography, spacing, borders, controls and motion were revised.

## Files changed

- `app/page.tsx`
- `app/register/page.tsx`
- `app/staff/dashboard/page.tsx`
- `app/globals.css`
- `components/brand.tsx`
- `components/portal-shell.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`

## Quality verification

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run build` passed.
- `/` returned HTTP 200 during local verification.
- `/register` returned HTTP 200 during local verification.

## Deployment

Replace the current repository contents with this package, preserve the existing Netlify environment variables, commit to the branch connected to Netlify and allow Netlify to deploy the new commit.
