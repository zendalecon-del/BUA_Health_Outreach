import { NextResponse } from "next/server";
import { getPortalProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { screeningSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const profile = await getPortalProfile();
    if (!profile || !profile.active || !["administrator", "medical"].includes(profile.role)) return NextResponse.json({ error: "Not authorised." }, { status: 403 });
    const parsed = screeningSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Review the screening form." }, { status: 400 });
    const input = parsed.data;
    const db = createAdminClient();
    const { data: existing } = await db.from("screenings").select("id,status,completed_at,completed_by").eq("participant_id", input.participantId).maybeSingle();
    const targetStatus = input.action === "complete" ? "completed" : input.action === "update" ? "updated" : "in_progress";
    const payload: Record<string, unknown> = {
      participant_id: input.participantId,
      screening_package: input.screeningPackage,
      systolic: input.systolic,
      diastolic: input.diastolic,
      random_blood_sugar: input.randomBloodSugar,
      screening_date: input.screeningDate,
      doctor_seen: input.doctorSeen,
      clinical_note: input.clinicalNote || null,
      referral_required: input.referralRequired,
      follow_up_required: input.followUpRequired,
      status: targetStatus,
      current_step: 4,
      last_saved_by: profile.id,
    };
    if (!existing) payload.created_by = profile.id;
    if (input.action === "complete") { payload.completed_by = profile.id; payload.completed_at = new Date().toISOString(); }
    if (input.action === "update") { payload.updated_by = profile.id; payload.updated_after_completion_at = new Date().toISOString(); }

    const screeningResult = existing
      ? await db.from("screenings").update(payload).eq("id", existing.id).select("id").single()
      : await db.from("screenings").insert(payload).select("id").single();
    if (screeningResult.error || !screeningResult.data) throw screeningResult.error || new Error("Screening was not saved.");
    const screeningId = screeningResult.data.id;

    if (input.referralRequired) {
      if (!input.referralHospitalId || !input.referralReason || !input.referralInstruction || !input.urgency || input.participantInformed === null || input.participantInformed === undefined) return NextResponse.json({ error: "Complete all required referral fields." }, { status: 400 });
      const { error } = await db.from("referrals").upsert({
        screening_id: screeningId, participant_id: input.participantId, referral_hospital_id: input.referralHospitalId,
        reason: input.referralReason, participant_instruction: input.referralInstruction, urgency: input.urgency,
        participant_informed: input.participantInformed, status: input.participantInformed ? "informed" : "pending",
      }, { onConflict: "screening_id" });
      if (error) throw error;
    } else await db.from("referrals").delete().eq("screening_id", screeningId);

    if (input.followUpRequired) {
      if (!input.followUpReason || !input.followUpInstruction) return NextResponse.json({ error: "Complete all required follow-up fields." }, { status: 400 });
      const { error } = await db.from("follow_ups").upsert({
        screening_id: screeningId, participant_id: input.participantId, reason: input.followUpReason,
        suggested_date: input.followUpDate || null, participant_instruction: input.followUpInstruction, status: "pending",
      }, { onConflict: "screening_id" });
      if (error) throw error;
    } else await db.from("follow_ups").delete().eq("screening_id", screeningId);

    await db.from("audit_events").insert({ actor_staff_profile_id: profile.id, action: `screening_${input.action}`, entity_type: "screening", entity_id: screeningId, metadata: { participant_id: input.participantId } });
    return NextResponse.json({ ok: true, screeningId, status: targetStatus });
  } catch (error) {
    console.error("Screening save error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "The screening could not be saved." }, { status: 500 });
  }
}
