-- Read-only registration setup check for Supabase SQL Editor.
-- It does not create or change data.
select
  to_regclass('public.participants') is not null as participants_table_exists,
  to_regclass('public.rate_limit_events') is not null as rate_limit_table_exists,
  to_regclass('public.email_events') is not null as email_events_table_exists,
  exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'email'
  ) as participant_email_column_exists;
