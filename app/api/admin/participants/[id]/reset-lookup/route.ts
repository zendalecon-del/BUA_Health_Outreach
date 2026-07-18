import { NextResponse } from "next/server";
import { getPortalProfile } from "@/lib/auth";
import { sendLookupCodeResetEmail } from "@/lib/email";
import { generateLookupCode, hashLookupCode } from "@/lib/security";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = await getPortalProfile();
  if (!actor || !actor.active || actor.role !== "administrator") {
    return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  }

  const { id } = await context.params;
  const db = createAdminClient();
  const { data: participant, error } = await db
    .from("participants")
    .select("id,full_name,email,registration_number")
    .eq("id", id)
    .maybeSingle();

  if (error || !participant) return NextResponse.json({ error: "Participant was not found." }, { status: 404 });

  const lookupCode = generateLookupCode();
  const lookupCodeHash = hashLookupCode(lookupCode);
  const update = await db.from("participants").update({ lookup_code_hash: lookupCodeHash }).eq("id", participant.id);
  if (update.error) return NextResponse.json({ error: "The secure lookup code could not be updated." }, { status: 500 });

  let emailStatus: "sent" | "failed" | "not_configured" = "failed";
  if (participant.email) {
    try {
      const sent = await sendLookupCodeResetEmail({
        to: participant.email,
        firstName: participant.full_name.split(/\s+/)[0],
        registrationNumber: participant.registration_number,
        lookupCode,
      });
      emailStatus = sent.status;
      const event = await db.from("email_events").insert({
        email_type: "lookup_code_reset",
        recipient: participant.email,
        participant_id: participant.id,
        provider_message_id: "id" in sent ? sent.id : null,
        requested_by: actor.id,
        status: sent.status === "sent" ? "sent" : "failed",
        error_code: sent.status === "not_configured" ? "provider_not_configured" : null,
      });
      if (event.error) console.error("Lookup reset email event was not recorded", event.error);
    } catch (sendError) {
      emailStatus = "failed";
      console.error("Lookup reset email failed", sendError);
    }
  }

  const audit = await db.from("audit_events").insert({
    actor_staff_profile_id: actor.id,
    action: "lookup_code_reset",
    entity_type: "participant",
    entity_id: participant.id,
    metadata: { email_status: emailStatus },
  });
  if (audit.error) console.error("Lookup reset audit event was not recorded", audit.error);

  return NextResponse.json({ lookupCode, registrationNumber: participant.registration_number, emailStatus });
}
