import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({ password: z.string().min(12).max(128) });
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Use at least 12 characters." }, { status: 400 });
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    if (error) throw error;
    await createAdminClient().from("staff_profiles").update({ must_change_password: false }).eq("auth_user_id", user.id);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "The password could not be changed." }, { status: 500 }); }
}
