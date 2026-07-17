import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { requiredEnv } from "@/lib/env";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateLookupCode() {
  const bytes = randomBytes(8);
  let value = "";
  for (let i = 0; i < 8; i += 1) value += ALPHABET[bytes[i] % ALPHABET.length];
  return `${value.slice(0, 4)}-${value.slice(4)}`;
}

export function hashLookupCode(code: string) {
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return createHmac("sha256", requiredEnv("LOOKUP_CODE_PEPPER")).update(normalized).digest("hex");
}

export function safeHashEqual(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

export function generateTemporaryPassword() {
  return `${randomBytes(5).toString("base64url")}!${randomBytes(4).toString("hex")}`;
}
