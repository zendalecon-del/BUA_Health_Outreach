import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { loginSchema } from "@/lib/validators";
import { requiredEnv } from "@/lib/env";

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "portal_login", 10, 15))) return NextResponse.json({ error: "Too many attempts. Please wait and try again." }, { status: 429 });
  const response = NextResponse.json({ ok: true });
  try {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid staff ID or password." }, { status: 400 });
    const admin = createAdminClient();
    const { data: profile } = await admin.from("staff_profiles").select("auth_user_id,email,role,active,must_change_password").eq("staff_id", parsed.data.staffId).maybeSingle();
    if (!profile?.active || !profile.auth_user_id) return NextResponse.json({ error: "Invalid staff ID or password." }, { status: 401 });
    if (parsed.data.mode === "admin" && profile.role !== "administrator") return NextResponse.json({ error: "This account is not authorised for the administrator portal." }, { status: 403 });

    const supabase = createServerClient(requiredEnv("NEXT_PUBLIC_SUPABASE_URL"), requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
      cookies: {
        getAll() { return []; },
        setAll(items) { items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); },
      },
    });
    const { error } = await supabase.auth.signInWithPassword({ email: profile.email, password: parsed.data.password });
    if (error) return NextResponse.json({ error: "Invalid staff ID or password." }, { status: 401 });
    await admin.from("staff_profiles").update({ last_seen_at: new Date().toISOString() }).eq("auth_user_id", profile.auth_user_id);
    const redirectTo = profile.must_change_password
      ? (profile.role === "administrator" ? "/admin/change-password" : "/staff/change-password")
      : (profile.role === "administrator" ? "/admin/dashboard" : "/staff/dashboard");
    const payload = NextResponse.json({ ok: true, redirectTo });
    response.cookies.getAll().forEach((cookie) => payload.cookies.set(cookie));
    return payload;
  } catch {
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 500 });
  }
}
