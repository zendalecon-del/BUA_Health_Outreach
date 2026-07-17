import { NextResponse } from "next/server";
import { z } from "zod";
import { getPortalProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateTemporaryPassword } from "@/lib/security";
import { sendStaffCredentialsEmail } from "@/lib/email";

const schema = z.object({ fullName: z.string().trim().min(3).max(120), phone: z.string().trim().min(10).max(30), email: z.string().email(), role: z.enum(["administrator","reception","medical"]), sendEmail: z.boolean().default(true) });
export async function POST(request: Request) {
  const actor = await getPortalProfile(); if (actor?.role !== "administrator") return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const db = createAdminClient(); const password = generateTemporaryPassword();
  const authResult = await db.auth.admin.createUser({ email: parsed.data.email, password, email_confirm: true, user_metadata: { full_name: parsed.data.fullName } });
  if (authResult.error || !authResult.data.user) return NextResponse.json({ error: authResult.error?.message || "Could not create authentication account." }, { status: 400 });
  const { data: staff, error } = await db.from("staff_profiles").insert({ auth_user_id: authResult.data.user.id, full_name: parsed.data.fullName, phone: parsed.data.phone, email: parsed.data.email, role: parsed.data.role, active: true, must_change_password: true }).select("id,staff_id,full_name,email,role").single();
  if (error || !staff) { await db.auth.admin.deleteUser(authResult.data.user.id); return NextResponse.json({ error: error?.message || "Could not create staff profile." }, { status: 400 }); }
  let emailStatus = "not_sent";
  if (parsed.data.sendEmail) { try { const sent=await sendStaffCredentialsEmail({ to: staff.email, name: staff.full_name, staffId: staff.staff_id, password, role: staff.role }); emailStatus=sent.status; if(sent.status==="sent") await db.from("staff_profiles").update({ credential_sent_at: new Date().toISOString() }).eq("id",staff.id); await db.from("email_events").insert({ email_type: "staff_credentials", recipient: staff.email, staff_profile_id: staff.id, provider_message_id: "id" in sent ? sent.id : null, requested_by: actor.id, status: sent.status === "sent" ? "sent" : "failed", error_code: sent.status === "not_configured" ? "provider_not_configured" : null }); } catch (sendError) { emailStatus="failed"; await db.from("email_events").insert({ email_type: "staff_credentials", recipient: staff.email, staff_profile_id: staff.id, requested_by: actor.id, status: "failed", error_code: sendError instanceof Error ? sendError.message.slice(0, 200) : "unknown" }); } }
  await db.from("audit_events").insert({ actor_staff_profile_id: actor.id, action: "staff_created", entity_type: "staff_profile", entity_id: staff.id, metadata: { role: staff.role } });
  return NextResponse.json({ staff, temporaryPassword: password, emailStatus }, { status: 201 });
}
