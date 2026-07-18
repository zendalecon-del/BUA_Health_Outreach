import "server-only";
import { Resend } from "resend";
import { appUrl } from "@/lib/env";

function client() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f4ef;font-family:Arial,sans-serif;color:#151a22"><div style="max-width:620px;margin:0 auto;padding:30px 18px"><div style="background:#fff;border:1px solid #e1ddd4;border-radius:20px;overflow:hidden"><div style="background:#b4162b;color:#fff;padding:22px 28px"><div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.8">BUA Health Outreach</div><h1 style="font-size:24px;margin:8px 0 0">${title}</h1></div><div style="padding:28px;line-height:1.65">${body}</div><div style="border-top:1px solid #ece8df;padding:18px 28px;color:#737983;font-size:12px">Powered by Zendale Limited · Do not reply with medical information.</div></div></div></body></html>`;
}

export async function sendRegistrationEmail(input: { to: string; firstName: string; registrationNumber: string; lookupCode: string }) {
  const resend = client();
  if (!resend) return { status: "not_configured" as const };
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "BUA Health Outreach <no-reply@example.com>",
    to: input.to,
    subject: `Your BUA Health Outreach registration: ${input.registrationNumber}`,
    html: shell("Registration confirmed", `<p>Hello ${input.firstName},</p><p>Your registration has been completed successfully.</p><div style="background:#f7f5f0;border-radius:14px;padding:18px;margin:22px 0"><p style="margin:0 0 8px"><strong>Registration number:</strong> ${input.registrationNumber}</p><p style="margin:0"><strong>Private lookup code:</strong> ${input.lookupCode}</p></div><p>Keep the private lookup code confidential. You will need both details to check your screening status or approved result.</p><p><a href="${appUrl()}/lookup" style="display:inline-block;background:#225f9d;color:#fff;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:bold">Open secure lookup</a></p>`),
  });
  if (result.error) throw new Error(result.error.message);
  return { status: "sent" as const, id: result.data?.id };
}

export async function sendLookupCodeResetEmail(input: { to: string; firstName: string; registrationNumber: string; lookupCode: string }) {
  const resend = client();
  if (!resend) return { status: "not_configured" as const };
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "BUA Health Outreach <no-reply@example.com>",
    to: input.to,
    subject: `Your new BUA Health Outreach lookup code: ${input.registrationNumber}`,
    html: shell("New private lookup code", `<p>Hello ${input.firstName},</p><p>An authorised administrator issued a new private lookup code for your registration. Your previous lookup code no longer works.</p><div style="background:#f7f5f0;border-radius:14px;padding:18px;margin:22px 0"><p style="margin:0 0 8px"><strong>Registration number:</strong> ${input.registrationNumber}</p><p style="margin:0"><strong>New private lookup code:</strong> ${input.lookupCode}</p></div><p>Keep this code confidential. Use it together with your registration number on the secure lookup page.</p><p><a href="${appUrl()}/lookup" style="display:inline-block;background:#225f9d;color:#fff;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:bold">Open secure lookup</a></p>`),
  });
  if (result.error) throw new Error(result.error.message);
  return { status: "sent" as const, id: result.data?.id };
}

export async function sendStaffCredentialsEmail(input: { to: string; name: string; staffId: string; password: string; role: string }) {
  const resend = client();
  if (!resend) return { status: "not_configured" as const };
  const path = input.role === "administrator" ? "/admin/login" : "/staff/login";
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "BUA Health Outreach <no-reply@example.com>",
    to: input.to,
    subject: "Your BUA Health Outreach login details",
    html: shell("Staff account created", `<p>Hello ${input.name},</p><p>An authorised BUA Health Outreach account has been created for you.</p><div style="background:#f7f5f0;border-radius:14px;padding:18px;margin:22px 0"><p style="margin:0 0 8px"><strong>Staff ID:</strong> ${input.staffId}</p><p style="margin:0"><strong>Temporary password:</strong> ${input.password}</p></div><p>You will be required to change this password after your first sign-in.</p><p><a href="${appUrl()}${path}" style="display:inline-block;background:#b4162b;color:#fff;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:bold">Sign in securely</a></p>`),
  });
  if (result.error) throw new Error(result.error.message);
  return { status: "sent" as const, id: result.data?.id };
}

export async function sendResultAvailableEmail(input: { to: string; firstName: string; registrationNumber: string; updated?: boolean }) {
  const resend = client();
  if (!resend) return { status: "not_configured" as const };
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "BUA Health Outreach <no-reply@example.com>",
    to: input.to,
    subject: input.updated ? "Your BUA Health Outreach result has been updated" : "Your BUA Health Outreach result is available",
    html: shell(input.updated ? "Updated result available" : "Your result is available", `<p>Hello ${input.firstName},</p><p>Your BUA Health Outreach screening record is now available through the secure participant lookup.</p><div style="background:#f7f5f0;border-radius:14px;padding:18px;margin:22px 0"><p style="margin:0"><strong>Registration number:</strong> ${input.registrationNumber}</p></div><p>For your privacy, medical details are not included in this email. Open the secure lookup and enter your registration number together with your private lookup code.</p><p><a href="${appUrl()}/lookup" style="display:inline-block;background:#225f9d;color:#fff;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:bold">View securely</a></p>`),
  });
  if (result.error) throw new Error(result.error.message);
  return { status: "sent" as const, id: result.data?.id };
}
