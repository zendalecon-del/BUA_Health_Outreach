import { NextResponse } from "next/server";
import { getPortalProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendResultAvailableEmail } from "@/lib/email";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = await getPortalProfile();
  if (!actor || !actor.active || !["administrator", "medical"].includes(actor.role)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }

  const { id } = await context.params;
  const db = createAdminClient();
  const { data: participant, error } = await db
    .from("participants")
    .select("id,full_name,email,registration_number,screenings(id,status)")
    .eq("id", id)
    .maybeSingle();

  if (error || !participant) return NextResponse.json({ error: "Participant was not found." }, { status: 404 });
  if (!participant.email) return NextResponse.json({ error: "This participant did not provide an email address." }, { status: 400 });

  const screening = Array.isArray(participant.screenings) ? participant.screenings[0] : participant.screenings;
  if (!screening || !["completed", "updated"].includes(screening.status)) {
    return NextResponse.json({ error: "A completed or updated screening is required before notification." }, { status: 400 });
  }

  try {
    const sent = await sendResultAvailableEmail({
      to: participant.email,
      firstName: participant.full_name.split(/\s+/)[0],
      registrationNumber: participant.registration_number,
      updated: screening.status === "updated",
    });

    await db.from("email_events").insert({
      email_type: "result_available",
      recipient: participant.email,
      participant_id: participant.id,
      provider_message_id: "id" in sent ? sent.id : null,
      requested_by: actor.id,
      status: sent.status === "sent" ? "sent" : "failed",
      error_code: sent.status === "not_configured" ? "provider_not_configured" : null,
    });
    await db.from("audit_events").insert({
      actor_staff_profile_id: actor.id,
      action: screening.status === "updated" ? "updated_result_notification_sent" : "result_notification_sent",
      entity_type: "participant",
      entity_id: participant.id,
      metadata: { screening_id: screening.id },
    });

    if (sent.status !== "sent") return NextResponse.json({ error: "The email provider is not configured." }, { status: 503 });
    return NextResponse.json({ ok: true });
  } catch (sendError) {
    await db.from("email_events").insert({
      email_type: "result_available",
      recipient: participant.email,
      participant_id: participant.id,
      requested_by: actor.id,
      status: "failed",
      error_code: sendError instanceof Error ? sendError.message.slice(0, 200) : "unknown",
    });
    return NextResponse.json({ error: "The notification could not be sent." }, { status: 502 });
  }
}
