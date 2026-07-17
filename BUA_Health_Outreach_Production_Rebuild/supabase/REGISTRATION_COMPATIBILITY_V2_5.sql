-- BUA Health Outreach registration compatibility update v2.5
-- Safe to run more than once in Supabase SQL Editor.
-- It creates or adds only the fields needed by public registration and confirmation email logging.

create extension if not exists pgcrypto;
create sequence if not exists public.registration_number_seq start 1;

create or replace function public.make_registration_number()
returns text language sql volatile as $$
  select 'BUA-' || lpad(nextval('public.registration_number_seq')::text, 4, '0');
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid,
  registration_number text default public.make_registration_number(),
  lookup_code_hash text,
  full_name text,
  gender text,
  age integer,
  phone text,
  phone_normalized text,
  email text,
  department text,
  other_department text,
  medical_conditions text[] default '{}',
  other_condition text,
  taking_medication boolean default false,
  medication_details text,
  smoking_status text,
  alcohol_use text,
  health_concern text,
  requested_service text,
  medical_contact_permission boolean default false,
  wellness_information_permission boolean default false,
  consent_accepted boolean default false,
  consent_version text default 'v1.0',
  consented_at timestamptz default timezone('utc', now()),
  registration_status text default 'confirmed',
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

alter table public.participants add column if not exists submission_id uuid;
alter table public.participants add column if not exists registration_number text default public.make_registration_number();
alter table public.participants add column if not exists lookup_code_hash text;
alter table public.participants add column if not exists full_name text;
alter table public.participants add column if not exists gender text;
alter table public.participants add column if not exists age integer;
alter table public.participants add column if not exists phone text;
alter table public.participants add column if not exists phone_normalized text;
alter table public.participants add column if not exists email text;
alter table public.participants add column if not exists department text;
alter table public.participants add column if not exists other_department text;
alter table public.participants add column if not exists medical_conditions text[] default '{}';
alter table public.participants add column if not exists other_condition text;
alter table public.participants add column if not exists taking_medication boolean default false;
alter table public.participants add column if not exists medication_details text;
alter table public.participants add column if not exists smoking_status text;
alter table public.participants add column if not exists alcohol_use text;
alter table public.participants add column if not exists health_concern text;
alter table public.participants add column if not exists requested_service text;
alter table public.participants add column if not exists medical_contact_permission boolean default false;
alter table public.participants add column if not exists wellness_information_permission boolean default false;
alter table public.participants add column if not exists consent_accepted boolean default false;
alter table public.participants add column if not exists consent_version text default 'v1.0';
alter table public.participants add column if not exists consented_at timestamptz default timezone('utc', now());
alter table public.participants add column if not exists registration_status text default 'confirmed';
alter table public.participants add column if not exists created_at timestamptz default timezone('utc', now());
alter table public.participants add column if not exists updated_at timestamptz default timezone('utc', now());

update public.participants
set registration_number = public.make_registration_number()
where registration_number is null;

create unique index if not exists participants_submission_id_unique_idx on public.participants(submission_id) where submission_id is not null;
create unique index if not exists participants_registration_number_unique_idx on public.participants(registration_number) where registration_number is not null;
create index if not exists participants_created_at_idx on public.participants(created_at desc);

create table if not exists public.rate_limit_events (
  id bigint generated always as identity primary key,
  endpoint text not null,
  identifier_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists rate_limit_events_lookup_idx on public.rate_limit_events(endpoint, identifier_hash, created_at desc);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  email_type text not null,
  recipient text not null,
  participant_id uuid references public.participants(id) on delete set null,
  staff_profile_id uuid,
  provider_message_id text,
  requested_by uuid,
  status text not null default 'queued',
  error_code text,
  attempted_at timestamptz not null default timezone('utc', now()),
  delivered_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.participants enable row level security;
alter table public.rate_limit_events enable row level security;
alter table public.email_events enable row level security;

-- Public requests continue to pass through protected Next.js server routes using the service-role key.
-- No anonymous insert or select policies are created by this patch.

select
  to_regclass('public.participants') is not null as participants_ready,
  to_regclass('public.rate_limit_events') is not null as rate_limit_ready,
  to_regclass('public.email_events') is not null as email_events_ready,
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'participants' and column_name = 'submission_id'
  ) as submission_id_ready,
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'participants' and column_name = 'email'
  ) as required_email_ready;
