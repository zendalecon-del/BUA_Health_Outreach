# BUA Health Outreach System v2.6

## Release purpose

This release replaces the v2.5 public experience and completes the requested form, Zendale-profile, lookup-recovery and first-administrator work.

## Public homepage

- Rebuilt the opening experience around a compact editorial layout instead of a generic card-heavy template.
- The programme purpose, privacy position, estimated completion time, email requirement, primary registration action, record lookup and three-step journey are all presented in the opening viewport on normal laptop and desktop sizes.
- Added viewport-height handling for shorter screens so the composition does not depend on browser zoom.
- Retained the approved authentic outreach photography and BUA/Zendale programme relationship.

## Zendale corporate profile

- Rebuilt as a completely standalone Zendale Limited website page.
- Removed BUA Health Outreach navigation, branding, programme messaging and footer references.
- Added a dedicated Zendale brand header, company story, capability architecture, healthcare-network directory, partnership narrative and contact section.
- Added external links for the seven supplied healthcare institutions.
- VHELAR Consulting remains deliberately unlinked because no verified official website or official social profile was confirmed.

## Registration form

- Maintains one clear question per screen.
- Reduced heading, explanation and option sizes to avoid unnecessary scrolling.
- Changed “What would you like to access?” to a true multi-select field.
- Added the requested vaccination-interest multi-select immediately after preferred services:
  - HPV
  - Hepatitis B
  - Tetanus
  - No, thank you
- “No, thank you” is mutually exclusive with vaccine selections.
- Email remains required.
- Review and consent show all selected services and vaccination interests.

## Lookup reliability and recovery

- Registration verification now happens before optional screening, referral and follow-up queries.
- A participant can therefore be verified even when no screening record exists yet.
- Added a lookup-readiness endpoint at `GET /api/lookup`.
- Added an administrator-only “Issue new lookup code” action on the participant profile.
- A newly issued code immediately replaces the previous code, can be copied once, and is emailed when the provider is configured.
- Added audit and email-event records for lookup-code resets.

## Database and administration

- Added `supabase/BUA_SYSTEM_UPGRADE_V2_6.sql`, designed for installations that previously ran only the v2.5 registration compatibility SQL.
- Adds the full staff, screening, referral, follow-up, audit and support structure.
- Adds `requested_services` and `vaccine_interest` to participants and safely backfills the legacy requested service.
- Added `supabase/CREATE_FIRST_ADMIN_V2_6.sql` with a safe first-administrator workflow.

## Verification completed

- TypeScript: passed
- ESLint: passed with no warnings
- Next.js production build: passed
- Static pages: `/`, `/register`, `/zendale`, `/lookup` returned successfully in the local production server
- New administrator lookup-reset route compiled successfully

The package was not connected to the production Supabase project or production Resend account during local verification. The included readiness endpoints and SQL readiness report are provided for the production check.
