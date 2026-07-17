import { NextResponse } from "next/server";
import { randomInt, randomBytes } from "node:crypto";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  gender: z.string().min(1),
  age: z.coerce.number().int().min(16).max(100),
  phone: z.string().min(10).max(30),
  email: z.union([z.literal(""), z.email()]),
  department: z.string().min(1),
  requestedService: z.string().min(1),
  medicalContact: z.enum(["Yes", "No"]),
  wellnessInfo: z.enum(["Yes", "No"]),
  consent: z.literal(true),
}).passthrough();

function makeLookupCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  const chars = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Please review the form and try again." }, { status: 400 });
    }

    // Prototype transaction response. Replace with a database sequence and a hashed lookup code in production.
    const registrationNumber = `BUA-${randomInt(1000, 9999)}`;
    const lookupCode = makeLookupCode();

    await new Promise((resolve) => setTimeout(resolve, 650));
    return NextResponse.json({
      registrationNumber,
      lookupCode,
      emailQueued: Boolean(parsed.data.email),
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ message: "Registration could not be completed." }, { status: 500 });
  }
}
