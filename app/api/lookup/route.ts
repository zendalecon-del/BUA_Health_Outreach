import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashLookupCode, safeHashEqual } from "@/lib/security";
import { lookupSchema } from "@/lib/validators";
import { registrationConfigIssues } from "@/lib/env";

function reference(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export async function GET() {
  const ref = reference("LOOKUP-CHECK");
  const missing = registrationConfigIssues();
  if (missing.length) return NextResponse.json({ ready: false, code: "CONFIGURATION_REQUIRED", reference: ref }, { status: 503 });

  try {
    const db = createAdminClient();
    const check = await db.from("participants").select("id,registration_number,lookup_code_hash", { count: "exact", head: true });
    if (check.error) throw check.error;
    return NextResponse.json({ ready: true, code: "LOOKUP_READY" });
  } catch (error) {
    console.error("Lookup readiness failed", { reference: ref, error });
    return NextResponse.json({ ready: false, code: "LOOKUP_DATABASE_REQUIRED", reference: ref }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const ref = reference("LOOKUP");
  if (!(await enforceRateLimit(request, "participant_lookup", 12, 15))) {
    return NextResponse.json({ code: "RATE_LIMITED", error: "Too many attempts. Please wait and try again.", reference: ref }, { status: 429 });
  }

  try {
    const parsed = lookupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ code: "LOOKUP_NOT_VERIFIED", error: "The details could not be verified. Check both identifiers exactly as issued.", reference: ref }, { status: 400 });
    }

    const db = createAdminClient();
    const participantResult = await db
      .from("participants")
      .select("id,registration_number,lookup_code_hash,full_name,registration_status")
      .eq("registration_number", parsed.data.registrationNumber)
      .maybeSingle();

    if (participantResult.error) {
      console.error("Lookup participant query failed", { reference: ref, error: participantResult.error });
      return NextResponse.json({ code: "LOOKUP_SERVICE_ERROR", error: "The secure lookup service could not complete the request. Please try again shortly.", reference: ref }, { status: 503 });
    }

    if (!participantResult.data) {
      console.warn("Lookup registration number not found", { reference: ref });
      return NextResponse.json({ code: "LOOKUP_NOT_VERIFIED", error: "The details could not be verified. Check both identifiers exactly as issued.", reference: ref }, { status: 401 });
    }

    const participant = participantResult.data;
    const incoming = hashLookupCode(parsed.data.lookupCode);
    if (!participant.lookup_code_hash || !safeHashEqual(incoming, participant.lookup_code_hash)) {
      console.warn("Lookup code mismatch", { reference: ref, participantId: participant.id });
      return NextResponse.json({ code: "LOOKUP_NOT_VERIFIED", error: "The details could not be verified. Check both identifiers exactly as issued.", reference: ref }, { status: 401 });
    }

    let screening: any = null;
    let referral: any = null;
    let followUp: any = null;

    const screeningResult = await db
      .from("screenings")
      .select("id,status,systolic,diastolic,random_blood_sugar,blood_sugar_unit,screening_date,doctor_seen,completed_at,updated_after_completion_at")
      .eq("participant_id", participant.id)
      .maybeSingle();

    if (!screeningResult.error) screening = screeningResult.data;
    else console.error("Lookup screening query unavailable", { reference: ref, error: screeningResult.error });

    if (screening?.id) {
      const referralResult = await db
        .from("referrals")
        .select("id,reason,participant_instruction,urgency,participant_informed,status,referral_hospital_id")
        .eq("screening_id", screening.id)
        .maybeSingle();
      if (!referralResult.error && referralResult.data) {
        referral = referralResult.data;
        if (referral.referral_hospital_id) {
          const hospitalResult = await db
            .from("referral_hospitals")
            .select("name,department_specialty,address,phone")
            .eq("id", referral.referral_hospital_id)
            .maybeSingle();
          if (!hospitalResult.error) referral.hospital = hospitalResult.data;
        }
      }

      const followUpResult = await db
        .from("follow_ups")
        .select("id,reason,suggested_date,participant_instruction,status")
        .eq("screening_id", screening.id)
        .maybeSingle();
      if (!followUpResult.error) followUp = followUpResult.data;
    }

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
        hospital: referral.hospital ?? null,
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
  } catch (error) {
    console.error("Unexpected lookup error", { reference: ref, error });
    return NextResponse.json({ code: "LOOKUP_SERVICE_ERROR", error: "The secure lookup service could not complete the request. Please try again shortly.", reference: ref }, { status: 503 });
  }
}
