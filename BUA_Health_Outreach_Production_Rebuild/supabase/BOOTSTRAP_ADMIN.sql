-- Run only after creating the first administrator in Supabase Authentication.
-- Replace the values before executing. Never paste a password into this file.
insert into public.staff_profiles (auth_user_id, full_name, phone, email, role, active, must_change_password)
select id, 'System Administrator', '08000000000', email, 'administrator', true, false
from auth.users
where email = 'REPLACE_WITH_ADMIN_EMAIL@example.com'
on conflict (email) do update set auth_user_id = excluded.auth_user_id, role = 'administrator', active = true;
