import "server-only";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PortalProfile = {
  id: string;
  staff_id: string;
  full_name: string;
  email: string;
  role: "administrator" | "reception" | "medical";
  active: boolean;
  must_change_password: boolean;
};

export async function getPortalProfile(): Promise<PortalProfile | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from("staff_profiles").select("id, staff_id, full_name, email, role, active, must_change_password").eq("auth_user_id", user.id).maybeSingle();
  return (data as PortalProfile | null) ?? null;
}

export async function requirePortalProfile(mode: "staff" | "admin") {
  const profile = await getPortalProfile();
  if (!profile || !profile.active) redirect(mode === "admin" ? "/admin/login" : "/staff/login");
  if (mode === "admin" && profile.role !== "administrator") redirect("/staff/dashboard");
  if (profile.must_change_password) redirect(mode === "admin" ? "/admin/change-password" : "/staff/change-password");
  return profile;
}
