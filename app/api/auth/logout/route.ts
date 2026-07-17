import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { requiredEnv } from "@/lib/env";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  const supabase = createServerClient(requiredEnv("NEXT_PUBLIC_SUPABASE_URL"), requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
    cookies: {
      getAll() { return request.headers.get("cookie")?.split(";").map((item) => { const [name, ...rest] = item.trim().split("="); return { name, value: rest.join("=") }; }) ?? []; },
      setAll(items) { items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); },
    },
  });
  await supabase.auth.signOut();
  return response;
}
