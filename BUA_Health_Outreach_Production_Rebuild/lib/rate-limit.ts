import "server-only";
import { createHmac } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { requiredEnv } from "@/lib/env";

function requestIdentifier(request: Request) {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return createHmac("sha256", requiredEnv("LOOKUP_CODE_PEPPER")).update(raw).digest("hex");
}

export async function enforceRateLimit(request: Request, endpoint: string, maximum: number, windowMinutes: number) {
  const db = createAdminClient();
  const identifier = requestIdentifier(request);
  const cutoff = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count } = await db.from("rate_limit_events").select("id", { count: "exact", head: true }).eq("endpoint", endpoint).eq("identifier_hash", identifier).gte("created_at", cutoff);
  if ((count ?? 0) >= maximum) return false;
  await db.from("rate_limit_events").insert({ endpoint, identifier_hash: identifier });
  if (Math.random() < 0.02) await db.from("rate_limit_events").delete().lt("created_at", new Date(Date.now() - 24 * 60 * 60_000).toISOString());
  return true;
}
