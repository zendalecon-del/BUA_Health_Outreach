import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateLookupCode, hashLookupCode } from "@/lib/security";
import { registrationSchema } from "@/lib/validators";
import { sendRegistrationEmail } from "@/lib/email";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  return `+234${digits}`;
}

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "registration", 8, 15))) return NextResponse.json({ error: "Too many attempts. Please wait and try again." }, { status: 429 });
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Please review the form." }, { status: 400 });

    const input = parsed.data;
    const lookupCode = generateLookupCode();
    const db = createAdminClient();
    const { data: participant, error } = await db.from("participants").insert({
      submission_id: input.submissionId,
      lookup_code_hash: hashLookupCode(lookupCode),
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
    }).select("id, registration_number").single();

    if (error || !participant) throw error || new Error("Registration was not saved.");

    let emailStatus: "sent" | "failed" | "not_provided" | "not_configured" = input.email ? "failed" : "not_provided";
    if (input.email) {
      try {
        const sent = await sendRegistrationEmail({
          to: input.email,
          firstName: input.fullName.split(/\s+/)[0],
          registrationNumber: participant.registration_number,
          lookupCode,
        });
        emailStatus = sent.status;
        await db.from("email_events").insert({
          email_type: "registration_confirmation",
          recipient: input.email,
          participant_id: participant.id,
          provider_message_id: "id" in sent ? sent.id : null,
          status: sent.status === "sent" ? "sent" : "failed",
        });
      } catch (emailError) {
        emailStatus = "failed";
        await db.from("email_events").insert({
          email_type: "registration_confirmation",
          recipient: input.email,
          participant_id: participant.id,
          status: "failed",
          error_code: emailError instanceof Error ? emailError.message.slice(0, 200) : "unknown",
        });
      }
    }

    return NextResponse.json({
      registrationNumber: participant.registration_number,
      lookupCode,
      emailStatus,
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "We could not complete the registration. Please try again or speak with an authorised staff member." }, { status: 500 });
  }
}
