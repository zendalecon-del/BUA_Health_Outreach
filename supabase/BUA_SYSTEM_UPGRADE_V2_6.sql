-- BUA Health Outreach System Upgrade v2.6
-- Safe compatibility migration for installations that previously ran only REGISTRATION_COMPATIBILITY_V2_5.sql.
-- Run once in Supabase SQL Editor. It is written to be safe to run again.

create extension if not exists pgcrypto;
create sequence if not exists public.registration_number_seq start 1;
create sequence if not exists public.staff_id_seq start 1;

create or replace function public.make_registration_number()
returns text language sql volatile as $$
  select 'BUA-' || lpad(nextval('public.registration_number_seq')::text, 4, '0');
$$;

create or replace function public.make_staff_id()
returns text language sql volatile as $$
  select 'BUA-STF-' || lpad(nextval('public.staff_id_seq')::text, 3, '0');
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- PARTICIPANTS ---------------------------------------------------------------
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
  requested_services text[] default '{}',
  vaccine_interest text[] default '{}',
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
alter table public.participants add column if not exists requested_services text[] default '{}';
alter table public.participants add column if not exists vaccine_interest text[] default '{}';
alter table public.participants add column if not exists medical_contact_permission boolean default false;
alter table public.participants add column if not exists wellness_information_permission boolean default false;
alter table public.participants add column if not exists consent_accepted boolean default false;
alter table public.participants add column if not exists consent_version text default 'v1.0';
alter table public.participants add column if not exists consented_at timestamptz default timezone('utc', now());
alter table public.participants add column if not exists registration_status text default 'confirmed';
alter table public.participants add column if not exists created_at timestamptz default timezone('utc', now());
alter table public.participants add column if not exists updated_at timestamptz default timezone('utc', now());

update public.participants set registration_number = public.make_registration_number() where registration_number is null;
update public.participants
set requested_services = array[requested_service]
where coalesce(array_length(requested_services, 1), 0) = 0 and requested_service is not null and btrim(requested_service) <> '';

create unique index if not exists participants_submission_id_unique_idx on public.participants(submission_id) where submission_id is not null;
create unique index if not exists participants_registration_number_unique_idx on public.participants(registration_number) where registration_number is not null;
create index if not exists participants_phone_normalized_idx on public.participants(phone_normalized);
create index if not exists participants_created_at_idx on public.participants(created_at desc);

-- STAFF ----------------------------------------------------------------------
create table if not exists public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  staff_id text unique default public.make_staff_id(),
  full_name text not null,
  phone text not null,
  email text not null unique,
  role text not null check (role in ('administrator','reception','medical')),
  active boolean not null default true,
  must_change_password boolean not null default true,
  credential_sent_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.staff_profiles add column if not exists auth_user_id uuid references auth.users(id) on delete cascade;
alter table public.staff_profiles add column if not exists staff_id text default public.make_staff_id();
alter table public.staff_profiles add column if not exists full_name text;
alter table public.staff_profiles add column if not exists phone text;
alter table public.staff_profiles add column if not exists email text;
alter table public.staff_profiles add column if not exists role text;
alter table public.staff_profiles add column if not exists active boolean default true;
alter table public.staff_profiles add column if not exists must_change_password boolean default true;
alter table public.staff_profiles add column if not exists credential_sent_at timestamptz;
alter table public.staff_profiles add column if not exists last_seen_at timestamptz;
alter table public.staff_profiles add column if not exists created_at timestamptz default timezone('utc', now());
alter table public.staff_profiles add column if not exists updated_at timestamptz default timezone('utc', now());

update public.staff_profiles set staff_id = public.make_staff_id() where staff_id is null;
create unique index if not exists staff_profiles_auth_user_id_unique_idx on public.staff_profiles(auth_user_id) where auth_user_id is not null;
create unique index if not exists staff_profiles_staff_id_unique_idx on public.staff_profiles(staff_id) where staff_id is not null;
create unique index if not exists staff_profiles_email_unique_idx on public.staff_profiles(lower(email)) where email is not null;

-- SCREENING WORKFLOW ---------------------------------------------------------
create table if not exists public.screenings (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null unique references public.participants(id) on delete restrict,
  screening_package text,
  systolic integer,
  diastolic integer,
  random_blood_sugar numeric(6,2),
  blood_sugar_unit text not null default 'mmol/L',
  screening_date date,
  doctor_seen boolean,
  clinical_note text,
  referral_required boolean not null default false,
  follow_up_required boolean not null default false,
  status text not null default 'in_progress' check (status in ('in_progress','completed','updated')),
  current_step integer not null default 1,
  created_by uuid references public.staff_profiles(id),
  last_saved_by uuid references public.staff_profiles(id),
  completed_by uuid references public.staff_profiles(id),
  updated_by uuid references public.staff_profiles(id),
  completed_at timestamptz,
  updated_after_completion_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists screenings_status_idx on public.screenings(status);

create table if not exists public.referral_hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  address text,
  phone text,
  department_specialty text,
  participant_instruction text,
  active boolean not null default true,
  created_by uuid references public.staff_profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null unique references public.screenings(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete restrict,
  referral_hospital_id uuid references public.referral_hospitals(id) on delete restrict,
  reason text not null,
  participant_instruction text not null,
  urgency text not null check (urgency in ('Routine','Within 7 days','Urgent')),
  participant_informed boolean not null default false,
  status text not null default 'pending' check (status in ('pending','informed','scheduled','completed','unable_to_reach')),
  status_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists referrals_status_idx on public.referrals(status, urgency);

create table if not exists public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null unique references public.screenings(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete restrict,
  reason text not null,
  suggested_date date,
  participant_instruction text not null,
  status text not null default 'pending' check (status in ('pending','informed','scheduled','completed','unable_to_reach')),
  status_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists follow_ups_date_idx on public.follow_ups(suggested_date, status);

-- SUPPORT TABLES -------------------------------------------------------------
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

alter table public.email_events add column if not exists staff_profile_id uuid;
alter table public.email_events add column if not exists requested_by uuid;
alter table public.email_events add column if not exists error_code text;
alter table public.email_events add column if not exists delivered_at timestamptz;

-- The original full schema limited email types to three values. v2.6 adds the
-- administrator-issued lookup-code email while retaining all existing types.
alter table public.email_events drop constraint if exists email_events_email_type_check;
alter table public.email_events add constraint email_events_email_type_check
  check (email_type in ('registration_confirmation','staff_credentials','result_available','lookup_code_reset'));

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  actor_staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists audit_events_entity_idx on public.audit_events(entity_type, entity_id);

-- AUTOMATIC UPDATED_AT -------------------------------------------------------
drop trigger if exists participants_updated_at on public.participants;
create trigger participants_updated_at before update on public.participants for each row execute function public.set_updated_at();
drop trigger if exists staff_profiles_updated_at on public.staff_profiles;
create trigger staff_profiles_updated_at before update on public.staff_profiles for each row execute function public.set_updated_at();
drop trigger if exists screenings_updated_at on public.screenings;
create trigger screenings_updated_at before update on public.screenings for each row execute function public.set_updated_at();
drop trigger if exists referral_hospitals_updated_at on public.referral_hospitals;
create trigger referral_hospitals_updated_at before update on public.referral_hospitals for each row execute function public.set_updated_at();
drop trigger if exists referrals_updated_at on public.referrals;
create trigger referrals_updated_at before update on public.referrals for each row execute function public.set_updated_at();
drop trigger if exists follow_ups_updated_at on public.follow_ups;
create trigger follow_ups_updated_at before update on public.follow_ups for each row execute function public.set_updated_at();

-- RLS: all public and portal database actions pass through protected server routes.
alter table public.participants enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.screenings enable row level security;
alter table public.referral_hospitals enable row level security;
alter table public.referrals enable row level security;
alter table public.follow_ups enable row level security;
alter table public.email_events enable row level security;
alter table public.audit_events enable row level security;
alter table public.rate_limit_events enable row level security;

-- Optional approved referral network starters.
insert into public.referral_hospitals (name, department_specialty, participant_instruction)
values
  ('Finnih Medical Centre', 'General and specialist medicine', 'Contact the facility using your BUA registration number.'),
  ('Sky High Medical Centre / ICU', 'Advanced hospital and critical care', 'Contact the facility using your BUA registration number.'),
  ('Kindred Path Fertility Centre', 'Fertility and women''s health', 'Contact the facility using your BUA registration number.'),
  ('Lifecentre Medical Services', 'Diagnostics and occupational health', 'Contact the facility using your BUA registration number.')
on conflict (name) do nothing;

-- READINESS REPORT -----------------------------------------------------------
select
  to_regclass('public.participants') is not null as participants_ready,
  to_regclass('public.staff_profiles') is not null as staff_profiles_ready,
  to_regclass('public.screenings') is not null as screenings_ready,
  to_regclass('public.referral_hospitals') is not null as hospitals_ready,
  to_regclass('public.referrals') is not null as referrals_ready,
  to_regclass('public.follow_ups') is not null as follow_ups_ready,
  to_regclass('public.email_events') is not null as email_events_ready,
  to_regclass('public.audit_events') is not null as audit_events_ready,
  to_regclass('public.rate_limit_events') is not null as rate_limit_ready,
  exists (select 1 from information_schema.columns where table_schema='public' and table_name='participants' and column_name='requested_services') as requested_services_ready,
  exists (select 1 from information_schema.columns where table_schema='public' and table_name='participants' and column_name='vaccine_interest') as vaccine_interest_ready;
