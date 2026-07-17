# BUA Health Outreach — Enterprise Experience v2.5

## Status

This release replaces the withdrawn v2.4 package.

## Public homepage

- Rebuilt the opening viewport around one decisive employee-health journey.
- The first screen now includes programme purpose, registration and lookup actions, expected completion time, privacy position, required email notice, no-payment notice, the three-stage journey, and instructions for the two private identifiers.
- Replaced the generic stacked-card presentation with an editorial split-screen composition using the supplied BUA/Zendale outreach photography.
- Added a controlled secondary privacy section and simplified footer navigation.

## Registration flow

- Preserved one question per screen.
- Reduced question scale and option height so ordinary questions and all answer choices fit within the viewport on standard laptop screens.
- Medical-condition choices use a compact 2-column mobile / 4-column desktop grid.
- Service choices use a compact responsive grid.
- Validation messages appear only after a user tries to continue, rather than showing errors before interaction.
- Every radio group and checkbox uses a unique identifier and independent state.
- Added Enter-key progression for standard input questions.
- Reworked review into compact, editable information panels.
- Reworked final consent into a clear consent decision and a separate privacy explanation.
- Email remains compulsory in both browser and server validation.

## Zendale profile

- Rebuilt as a distinct corporate experience rather than an outreach-page variant.
- Added full-screen corporate hero, integrated-healthcare positioning, capability architecture, network directory, healthcare-with-purpose story, partnership case, and premium contact section.
- Included all approved service groups and all eight network institutions supplied by the project owner.
- Phone and email remain clearly identified placeholders.

## Registration reliability

- Added explicit checks for Supabase URL, service-role key and lookup-code pepper.
- Added specific database, migration, credential, network and validation error classifications.
- Preserved idempotent retry handling for duplicate browser submissions.
- Added `GET /api/register` as a safe readiness check. A healthy production setup returns:

```json
{"ready":true,"code":"REGISTRATION_READY"}
```

- Added `supabase/REGISTRATION_COMPATIBILITY_V2_5.sql`, an idempotent compatibility patch for the registration tables and fields.
- Email delivery failures no longer prevent the participant record from being created.

## Verification completed

- TypeScript: passed
- ESLint: passed with zero warnings
- Next.js production build: passed
- 19 application routes generated successfully
- Local readiness failure path: verified with explicit configuration response

## Important limitation

The package cannot directly access or alter the owner’s live Supabase project. Run the supplied compatibility SQL and then open `/api/register` after deployment to verify the live environment before testing a registration.
