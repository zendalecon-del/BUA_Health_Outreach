import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashLookupCode, safeHashEqual } from "@/lib/security";
import { lookupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "participant_lookup", 12, 15))) return NextResponse.json({ error: "Too many attempts. Please wait and try again." }, { status: 429 });
  try {
    const parsed = lookupSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "The details could not be verified." }, { status: 400 });
    const db = createAdminClient();
    const { data, error } = await db.from("participants")
      .select("id,registration_number,lookup_code_hash,full_name,registration_status,screenings(id,status,systolic,diastolic,random_blood_sugar,blood_sugar_unit,screening_date,doctor_seen,completed_at,updated_after_completion_at,referrals(id,reason,participant_instruction,urgency,participant_informed,status,referral_hospitals(name,department_specialty,address,phone)),follow_ups(id,reason,suggested_date,participant_instruction,status))")
      .eq("registration_number", parsed.data.registrationNumber).maybeSingle();
    if (error || !data) return NextResponse.json({ error: "The details could not be verified." }, { status: 401 });
    const participant = data as any;
    const incoming = hashLookupCode(parsed.data.lookupCode);
    if (!safeHashEqual(incoming, participant.lookup_code_hash)) return NextResponse.json({ error: "The details could not be verified." }, { status: 401 });

    const screening = Array.isArray(participant.screenings) ? participant.screenings[0] : participant.screenings;
    const referral = screening && Array.isArray(screening.referrals) ? screening.referrals[0] : screening?.referrals;
    const followUp = screening && Array.isArray(screening.follow_ups) ? screening.follow_ups[0] : screening?.follow_ups;
    const resultAvailable = screening?.status === "completed" || screening?.status === "updated";
    const names = participant.full_name.trim().split(/\s+/);
    return NextResponse.json({
      participantName: `${names[0]} ${names.length > 1 ? `${names[names.length - 1][0]}.` : ""}`.trim(),
      registrationNumber: participant.registration_number,
      registrationStatus: participant.registration_status,
      screeningStatus: screening ? screening.status : "not_started",
      resultAvailable,
      results: resultAvailable ? {
        bloodPressure: screening?.systolic && screening?.diastolic ? `${screening.systolic} / ${screening.diastolic} mmHg` : null,
        bloodSugar: screening?.random_blood_sugar ? `${screening.random_blood_sugar} ${screening.blood_sugar_unit}` : null,
        screeningDate: screening?.screening_date,
        doctorSeen: screening?.doctor_seen,
      } : null,
      referral: referral ? {
        required: true,
        hospital: Array.isArray(referral.referral_hospitals) ? referral.referral_hospitals[0] : referral.referral_hospitals,
        instruction: referral.participant_instruction,
        urgency: referral.urgency,
        status: referral.status,
      } : null,
      followUp: followUp ? {
        required: true,
        date: followUp.suggested_date,
        instruction: followUp.participant_instruction,
        status: followUp.status,
      } : null,
    });
  } catch {
    return NextResponse.json({ error: "The details could not be verified." }, { status: 401 });
  }
}
