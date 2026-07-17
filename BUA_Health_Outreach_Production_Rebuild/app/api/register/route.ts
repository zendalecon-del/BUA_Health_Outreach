import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateLookupCode, hashLookupCode } from "@/lib/security";
import { registrationSchema } from "@/lib/validators";
import { sendRegistrationEmail } from "@/lib/email";
import { registrationConfigIssues } from "@/lib/env";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  return `+234${digits}`;
}

function errorText(error: unknown) {
  if (!error) return "";
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  try { return JSON.stringify(error); } catch { return String(error); }
}

function classifyDatabaseError(error: unknown) {
  const details = errorText(error);
  if (/PGRST205|42P01|relation .* does not exist|Could not find the table|schema cache/i.test(details)) {
    return { code: "DATABASE_SETUP_REQUIRED", status: 503, message: "Registration is temporarily unavailable because the secure registration tables have not been activated." };
  }
  if (/PGRST204|column .* does not exist|Could not find the .* column/i.test(details)) {
    return { code: "DATABASE_UPDATE_REQUIRED", status: 503, message: "Registration is temporarily unavailable because the secure database requires the latest compatibility update." };
  }
  if (/Invalid API key|JWT|service role|apikey|unauthorized|permission denied/i.test(details)) {
    return { code: "DATABASE_CREDENTIAL_ERROR", status: 503, message: "Registration is temporarily unavailable because the secure database credentials require attention." };
  }
  if (/23514|check constraint/i.test(details)) {
    return { code: "DATABASE_VALIDATION_ERROR", status: 422, message: "One answer could not be accepted by the secure record system. Please review your responses and try again." };
  }
  if (/fetch failed|network|ECONN|ENOTFOUND|timeout/i.test(details)) {
    return { code: "DATABASE_UNAVAILABLE", status: 503, message: "The secure registration service could not be reached. Please wait briefly and try again." };
  }
  return { code: "REGISTRATION_SAVE_FAILED", status: 500, message: "We could not save the registration. Please try again or share the reference below with an authorised staff member." };
}


export async function GET() {
  const reference = `REG-CHECK-${Date.now().toString(36).toUpperCase()}`;
  const missing = registrationConfigIssues();
  if (missing.length) {
    return NextResponse.json({ ready: false, code: "CONFIGURATION_REQUIRED", reference }, { status: 503 });
  }

  try {
    const db = createAdminClient();
    const participantCheck = await db.from("participants").select("id", { count: "exact", head: true });
    if (participantCheck.error) throw participantCheck.error;

    const rateLimitCheck = await db.from("rate_limit_events").select("id", { count: "exact", head: true });
    if (rateLimitCheck.error) throw rateLimitCheck.error;

    return NextResponse.json({ ready: true, code: "REGISTRATION_READY" });
  } catch (error) {
    const classified = classifyDatabaseError(error);
    console.error("Registration readiness check failed", { reference, code: classified.code, error });
    return NextResponse.json({ ready: false, code: classified.code, reference }, { status: classified.status });
  }
}

export async function POST(request: Request) {
  const reference = `REG-${Date.now().toString(36).toUpperCase()}`;

  try {
    const missing = registrationConfigIssues();
    if (missing.length) {
      console.error("Registration configuration incomplete", { reference, missing });
      return NextResponse.json(
        { code: "CONFIGURATION_REQUIRED", error: "Registration is temporarily unavailable because the secure connection has not been fully configured.", reference },
        { status: 503 },
      );
    }

    if (!(await enforceRateLimit(request, "registration", 8, 15))) {
      return NextResponse.json({ code: "RATE_LIMITED", error: "Too many attempts. Please wait for a few minutes and try again.", reference }, { status: 429 });
    }

    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { code: "FORM_VALIDATION_ERROR", error: parsed.error.issues[0]?.message || "Please review the form.", reference },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const lookupCode = generateLookupCode();
    const lookupCodeHash = hashLookupCode(lookupCode);
    const db = createAdminClient();

    const payload = {
      submission_id: input.submissionId,
      lookup_code_hash: lookupCodeHash,
      full_name: input.fullName,
      gender: input.gender,
      age: input.age,
      phone: input.phone,
      phone_normalized: normalizePhone(input.phone),
      email: input.email,
      department: input.department,
      other_department: input.department === "Others" ? input.otherDepartment : null,
      medical_conditions: input.conditions,
      other_condition: input.conditions.includes("Others") ? input.otherCondition : null,
      taking_medication: input.medication === "Yes",
      medication_details: input.medication === "Yes" ? input.medicationDetails : null,
      smoking_status: input.smoking,
      alcohol_use: input.alcohol,
      health_concern: input.healthConcern || null,
      requested_service: input.requestedService,
      medical_contact_permission: input.medicalContact === "Yes",
      wellness_information_permission: input.wellnessInfo === "Yes",
      consent_accepted: true,
    };

    let { data: participant, error } = await db.from("participants").insert(payload).select("id, registration_number").single();

    // Browsers and mobile networks can retry the same request after a timeout.
    // Reuse the already-created record instead of returning a duplicate error.
    if (error?.code === "23505" && /submission_id/i.test(error.message || "")) {
      const existing = await db.from("participants").select("id, registration_number").eq("submission_id", input.submissionId).single();
      if (!existing.error && existing.data) {
        const rotated = await db.from("participants").update({ lookup_code_hash: lookupCodeHash, email: input.email }).eq("id", existing.data.id);
        if (!rotated.error) {
          participant = existing.data;
          error = null;
        }
      }
    }

    if (error || !participant) throw error || new Error("Registration was not saved.");

    let emailStatus: "sent" | "failed" | "not_configured" = "failed";
    try {
      const sent = await sendRegistrationEmail({
        to: input.email,
        firstName: input.fullName.split(/\s+/)[0],
        registrationNumber: participant.registration_number,
        lookupCode,
      });
      emailStatus = sent.status;

      const emailEvent = await db.from("email_events").insert({
        email_type: "registration_confirmation",
        recipient: input.email,
        participant_id: participant.id,
        provider_message_id: "id" in sent ? sent.id : null,
        status: sent.status === "sent" ? "sent" : "failed",
      });
      if (emailEvent.error) console.error("Registration email event was not recorded", { reference, error: emailEvent.error });
    } catch (emailError) {
      emailStatus = "failed";
      console.error("Registration email failed", { reference, emailError });
      await db.from("email_events").insert({
        email_type: "registration_confirmation",
        recipient: input.email,
        participant_id: participant.id,
        status: "failed",
        error_code: emailError instanceof Error ? emailError.message.slice(0, 200) : "unknown",
      });
    }

    return NextResponse.json({ registrationNumber: participant.registration_number, lookupCode, emailStatus }, { status: 201 });
  } catch (error) {
    const classified = classifyDatabaseError(error);
    console.error("Registration error", { reference, code: classified.code, error });
    return NextResponse.json({ code: classified.code, error: classified.message, reference }, { status: classified.status });
  }
}
