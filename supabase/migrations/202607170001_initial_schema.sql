-- BUA Health Outreach Registration & Screening System
-- Version 1 production schema for Supabase PostgreSQL
-- Run with the Supabase CLI or paste once into the Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.staff_role as enum ('administrator', 'reception', 'medical');
create type public.screening_status as enum ('in_progress', 'completed', 'updated');
create type public.workflow_status as enum ('pending', 'informed', 'scheduled', 'completed', 'unable_to_reach');
create type public.referral_urgency as enum ('Routine', 'Within 7 days', 'Urgent');
create type public.email_delivery_status as enum ('queued', 'sent', 'delivered', 'failed', 'bounced');

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

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  registration_number text not null unique default public.make_registration_number(),
  lookup_code_hash text not null,
  full_name text not null check (char_length(full_name) between 3 and 120),
  gender text not null check (gender in ('Male','Female','Prefer not to say')),
  age integer not null check (age between 16 and 100),
  phone text not null,
  phone_normalized text not null,
  email text,
  department text not null,
  other_department text,
  medical_conditions text[] not null default '{}',
  other_condition text,
  taking_medication boolean not null,
  medication_details text,
  smoking_status text not null,
  alcohol_use text not null,
  health_concern text,
  requested_service text not null,
  medical_contact_permission boolean not null,
  wellness_information_permission boolean not null,
  consent_accepted boolean not null default false,
  consent_version text not null default 'v1.0',
  consented_at timestamptz not null default timezone('utc', now()),
  registration_status text not null default 'confirmed' check (registration_status in ('confirmed','cancelled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  staff_id text not null unique default public.make_staff_id(),
  full_name text not null,
  phone text not null,
  email text not null unique,
  role public.staff_role not null,
  active boolean not null default true,
  must_change_password boolean not null default true,
  credential_sent_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.screenings (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null unique references public.participants(id) on delete restrict,
  screening_package text,
  systolic integer check (systolic between 50 and 300),
  diastolic integer check (diastolic between 30 and 200),
  random_blood_sugar numeric(6,2) check (random_blood_sugar between 1 and 50),
  blood_sugar_unit text not null default 'mmol/L',
  screening_date date,
  doctor_seen boolean,
  clinical_note text,
  referral_required boolean not null default false,
  follow_up_required boolean not null default false,
  status public.screening_status not null default 'in_progress',
  current_step integer not null default 1 check (current_step between 1 and 4),
  created_by uuid references public.staff_profiles(id),
  last_saved_by uuid references public.staff_profiles(id),
  completed_by uuid references public.staff_profiles(id),
  updated_by uuid references public.staff_profiles(id),
  completed_at timestamptz,
  updated_after_completion_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.referral_hospitals (
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

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null unique references public.screenings(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete restrict,
  referral_hospital_id uuid references public.referral_hospitals(id) on delete restrict,
  reason text not null,
  participant_instruction text not null,
  urgency public.referral_urgency not null,
  participant_informed boolean not null default false,
  status public.workflow_status not null default 'pending',
  status_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null unique references public.screenings(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete restrict,
  reason text not null,
  suggested_date date,
  participant_instruction text not null,
  status public.workflow_status not null default 'pending',
  status_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.email_events (
  id uuid primary key default gen_random_uuid(),
  email_type text not null check (email_type in ('registration_confirmation','staff_credentials','result_available')),
  recipient text not null,
  participant_id uuid references public.participants(id) on delete set null,
  staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  provider_message_id text,
  requested_by uuid references public.staff_profiles(id) on delete set null,
  status public.email_delivery_status not null default 'queued',
  error_code text,
  attempted_at timestamptz not null default timezone('utc', now()),
  delivered_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);


create table public.rate_limit_events (
  id bigint generated always as identity primary key,
  endpoint text not null,
  identifier_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_staff_profile_id uuid references public.staff_profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index participants_registration_number_idx on public.participants(registration_number);
create index participants_phone_normalized_idx on public.participants(phone_normalized);
create index participants_created_at_idx on public.participants(created_at desc);
create index screenings_status_idx on public.screenings(status);
create index referrals_status_idx on public.referrals(status, urgency);
create index follow_ups_date_idx on public.follow_ups(suggested_date, status);
create index rate_limit_events_lookup_idx on public.rate_limit_events(endpoint, identifier_hash, created_at desc);
create index audit_events_entity_idx on public.audit_events(entity_type, entity_id);

create trigger participants_updated_at before update on public.participants for each row execute function public.set_updated_at();
create trigger staff_profiles_updated_at before update on public.staff_profiles for each row execute function public.set_updated_at();
create trigger screenings_updated_at before update on public.screenings for each row execute function public.set_updated_at();
create trigger referral_hospitals_updated_at before update on public.referral_hospitals for each row execute function public.set_updated_at();
create trigger referrals_updated_at before update on public.referrals for each row execute function public.set_updated_at();
create trigger follow_ups_updated_at before update on public.follow_ups for each row execute function public.set_updated_at();

create or replace function public.current_staff_profile_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.staff_profiles where auth_user_id = auth.uid() and active = true limit 1;
$$;

create or replace function public.current_staff_role()
returns public.staff_role language sql stable security definer set search_path = public as $$
  select role from public.staff_profiles where auth_user_id = auth.uid() and active = true limit 1;
$$;

alter table public.participants enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.screenings enable row level security;
alter table public.referral_hospitals enable row level security;
alter table public.referrals enable row level security;
alter table public.follow_ups enable row level security;
alter table public.email_events enable row level security;
alter table public.audit_events enable row level security;
alter table public.rate_limit_events enable row level security;

-- There are deliberately no anonymous policies. Public registration and lookup use
-- protected Next.js route handlers with the service-role key kept server-side.

create policy "active staff read participants" on public.participants
  for select to authenticated using (public.current_staff_profile_id() is not null);
create policy "medical and admin update participants" on public.participants
  for update to authenticated using (public.current_staff_role() in ('administrator','medical')) with check (public.current_staff_role() in ('administrator','medical'));

create policy "staff read own profile and admin reads all" on public.staff_profiles
  for select to authenticated using (auth_user_id = auth.uid() or public.current_staff_role() = 'administrator');
create policy "admin manages staff profiles" on public.staff_profiles
  for all to authenticated using (public.current_staff_role() = 'administrator') with check (public.current_staff_role() = 'administrator');

create policy "active staff read screenings" on public.screenings
  for select to authenticated using (public.current_staff_profile_id() is not null);
create policy "medical and admin manage screenings" on public.screenings
  for all to authenticated using (public.current_staff_role() in ('administrator','medical')) with check (public.current_staff_role() in ('administrator','medical'));

create policy "active staff read hospitals" on public.referral_hospitals
  for select to authenticated using (public.current_staff_profile_id() is not null);
create policy "admin manages hospitals" on public.referral_hospitals
  for all to authenticated using (public.current_staff_role() = 'administrator') with check (public.current_staff_role() = 'administrator');

create policy "active staff read referrals" on public.referrals
  for select to authenticated using (public.current_staff_profile_id() is not null);
create policy "medical and admin manage referrals" on public.referrals
  for all to authenticated using (public.current_staff_role() in ('administrator','medical')) with check (public.current_staff_role() in ('administrator','medical'));

create policy "active staff read follow ups" on public.follow_ups
  for select to authenticated using (public.current_staff_profile_id() is not null);
create policy "medical and admin manage follow ups" on public.follow_ups
  for all to authenticated using (public.current_staff_role() in ('administrator','medical')) with check (public.current_staff_role() in ('administrator','medical'));

create policy "admin reads email events" on public.email_events
  for select to authenticated using (public.current_staff_role() = 'administrator');
create policy "admin reads audit events" on public.audit_events
  for select to authenticated using (public.current_staff_role() = 'administrator');

-- Optional initial referral hospitals. Edit or remove before production if not approved.
insert into public.referral_hospitals (name, department_specialty, participant_instruction)
values
  ('Finnish Medical Center', 'General Medicine', 'Contact the facility using your BUA registration number.'),
  ('Sky High Hospital / ICU', 'Advanced Hospital & Critical Care', 'Contact the facility using your BUA registration number.'),
  ('Kindred Path IVF Center', 'Fertility & Women''s Health', 'Contact the facility using your BUA registration number.'),
  ('Life Center Medicals', 'General Medical Services', 'Contact the facility using your BUA registration number.')
on conflict (name) do nothing;
