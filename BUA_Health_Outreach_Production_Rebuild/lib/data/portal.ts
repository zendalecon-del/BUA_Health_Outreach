import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type DashboardSnapshot = {
  registered: number; notStarted: number; inProgress: number; completed: number; updated: number; referrals: number; followUps: number;
};

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const db = createAdminClient();
  const [registered, screenings, inProgress, completed, updated, referrals, followUps] = await Promise.all([
    db.from("participants").select("id", { count: "exact", head: true }),
    db.from("screenings").select("id", { count: "exact", head: true }),
    db.from("screenings").select("id", { count: "exact", head: true }).eq("status", "in_progress"),
    db.from("screenings").select("id", { count: "exact", head: true }).eq("status", "completed"),
    db.from("screenings").select("id", { count: "exact", head: true }).eq("status", "updated"),
    db.from("referrals").select("id", { count: "exact", head: true }).neq("status", "completed"),
    db.from("follow_ups").select("id", { count: "exact", head: true }).neq("status", "completed"),
  ]);
  const registeredCount = registered.count ?? 0;
  return { registered: registeredCount, notStarted: Math.max(0, registeredCount - (screenings.count ?? 0)), inProgress: inProgress.count ?? 0, completed: completed.count ?? 0, updated: updated.count ?? 0, referrals: referrals.count ?? 0, followUps: followUps.count ?? 0 };
}

export async function getParticipants(limit = 100) {
  const db = createAdminClient();
  const { data, error } = await db.from("participants")
    .select("id, registration_number, full_name, department, requested_service, created_at, phone, email, screenings(id,status,updated_at,completed_at)")
    .order("created_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getParticipant(id: string) {
  const db = createAdminClient();
  const { data, error } = await db.from("participants")
    .select("*, screenings(*, referrals(*, referral_hospitals(*)), follow_ups(*))")
    .eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getActiveHospitals() {
  const db = createAdminClient();
  const { data, error } = await db.from("referral_hospitals").select("*").eq("active", true).order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getReferralQueue() {
  const db = createAdminClient();
  const { data, error } = await db.from("referrals")
    .select("id,status,urgency,reason,participant_informed,created_at, participants(id,registration_number,full_name,medical_contact_permission), referral_hospitals(name,department_specialty), screenings(id)")
    .order("created_at", { ascending: false }).limit(200);
  if (error) throw error;
  return data ?? [];
}

export async function getFollowUpQueue() {
  const db = createAdminClient();
  const { data, error } = await db.from("follow_ups")
    .select("id,status,suggested_date,reason,created_at, participants(id,registration_number,full_name,medical_contact_permission), screenings(id)")
    .order("suggested_date", { ascending: true }).limit(200);
  if (error) throw error;
  return data ?? [];
}

export async function getHospitals() {
  const db = createAdminClient();
  const { data, error } = await db.from("referral_hospitals").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getStaff() {
  const db = createAdminClient();
  const { data, error } = await db.from("staff_profiles").select("id,staff_id,full_name,email,phone,role,active,credential_sent_at,last_seen_at,created_at").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getScreenings() {
  const db = createAdminClient();
  const { data, error } = await db.from("screenings")
    .select("id,status,screening_package,screening_date,systolic,diastolic,random_blood_sugar,updated_at,completed_at,participants(id,registration_number,full_name,department)")
    .order("updated_at", { ascending: false }).limit(500);
  if (error) throw error;
  return data ?? [];
}
