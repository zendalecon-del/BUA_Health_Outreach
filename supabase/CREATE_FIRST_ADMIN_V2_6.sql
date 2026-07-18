-- CREATE FIRST ADMINISTRATOR — BUA Health Outreach v2.6
--
-- BEFORE RUNNING THIS FILE:
-- 1. Supabase Dashboard > Authentication > Users > Add user.
-- 2. Enter your real administrator email and a strong temporary password.
-- 3. Tick/choose the option that confirms the email, if Supabase displays it.
-- 4. Replace ALL FOUR placeholder values below.
-- 5. Run the entire script in Supabase SQL Editor.
--
-- The email below must exactly match the Authentication user you created.

do $$
declare
  v_auth_user_id uuid;
  v_email text := lower('REPLACE_WITH_ADMIN_EMAIL@example.com');
  v_full_name text := 'REPLACE WITH ADMIN FULL NAME';
  v_phone text := 'REPLACE WITH ADMIN PHONE';
begin
  select id into v_auth_user_id
  from auth.users
  where lower(email) = v_email
  limit 1;

  if v_auth_user_id is null then
    raise exception 'No Supabase Authentication user exists for %. Create that user first, then run this script again.', v_email;
  end if;

  update public.staff_profiles
  set auth_user_id = v_auth_user_id,
      full_name = v_full_name,
      phone = v_phone,
      email = v_email,
      role = 'administrator',
      active = true,
      must_change_password = false,
      updated_at = timezone('utc', now())
  where lower(email) = v_email or auth_user_id = v_auth_user_id;

  if not found then
    insert into public.staff_profiles (
      auth_user_id,
      full_name,
      phone,
      email,
      role,
      active,
      must_change_password
    ) values (
      v_auth_user_id,
      v_full_name,
      v_phone,
      v_email,
      'administrator',
      true,
      false
    );
  end if;
end $$;

select staff_id, full_name, email, role, active
from public.staff_profiles
where lower(email) = lower('REPLACE_WITH_ADMIN_EMAIL@example.com');
