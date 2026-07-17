import { NextResponse } from "next/server";
import { z } from "zod";
import { getPortalProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const createSchema = z.object({ name: z.string().trim().min(2).max(160), address: z.string().trim().max(300).optional(), phone: z.string().trim().max(30).optional(), departmentSpecialty: z.string().trim().max(160).optional(), participantInstruction: z.string().trim().max(1000).optional() });
const patchSchema = z.object({ id: z.string().uuid(), active: z.boolean() });
export async function POST(request: Request) {
  const profile = await getPortalProfile(); if (profile?.role !== "administrator") return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  const parsed = createSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const { data, error } = await createAdminClient().from("referral_hospitals").insert({ name: parsed.data.name, address: parsed.data.address || null, phone: parsed.data.phone || null, department_specialty: parsed.data.departmentSpecialty || null, participant_instruction: parsed.data.participantInstruction || null, created_by: profile.id }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 }); return NextResponse.json(data, { status: 201 });
}
export async function PATCH(request: Request) {
  const profile = await getPortalProfile(); if (profile?.role !== "administrator") return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  const parsed = patchSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const { error } = await createAdminClient().from("referral_hospitals").update({ active: parsed.data.active }).eq("id", parsed.data.id); if (error) return NextResponse.json({ error: error.message }, { status: 400 }); return NextResponse.json({ ok: true });
}
