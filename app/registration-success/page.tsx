"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Copy, LockKeyhole, MailCheck, Printer, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/public-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Result = { firstName: string; email: string; registrationNumber: string; lookupCode: string; emailStatus: "sent" | "failed" | "not_provided" | "not_configured" };

function Detail({ label, value, confidential = false }: { label: string; value: string; confidential?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(value); setCopied(true); toast.success(`${label} copied`); setTimeout(() => setCopied(false), 1500); };
  return <div className="rounded-2xl border border-[#dfd9d0] bg-[#fbfaf7] p-5"><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#7f858e]">{label}</p>{confidential && <LockKeyhole className="size-4 text-[var(--bua-red)]" />}</div><div className="mt-3 flex items-center justify-between gap-3"><p className="font-mono text-xl font-black tracking-[.08em] text-[#1e232a] sm:text-2xl">{value}</p><Button type="button" variant="outline" size="sm" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy"}</Button></div></div>;
}

export default function RegistrationSuccessPage() {
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => { try { const raw = sessionStorage.getItem("bua-registration-result"); if (raw) setResult(JSON.parse(raw)); } catch { /* ignore */ } }, []);
  if (!result) return <PublicShell narrow><div className="mx-auto max-w-2xl py-20 text-center"><h1 className="text-3xl font-black">No recent registration found</h1><p className="mt-3 text-[#6c737c]">Complete the registration form to receive your identifiers.</p><Button asChild className="mt-6"><Link href="/register">Start registration</Link></Button></div></PublicShell>;

  const emailText = result.emailStatus === "sent" ? `A copy has been sent to ${result.email}.` : result.emailStatus === "not_provided" ? "No email was provided. Save both identifiers before leaving this page." : "Your registration succeeded, but the confirmation email could not be sent. Save both identifiers now.";

  return <PublicShell narrow><div className="mx-auto max-w-3xl pb-16 pt-6 sm:pt-10"><Card className="card-shadow overflow-hidden border-[#ddd7cd]"><div className="relative overflow-hidden bg-[#17243a] p-7 text-white sm:p-10"><div className="brand-grid absolute inset-0 opacity-50"/><div className="relative flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[#e9f7ef] text-[#157347]"><CheckCircle2 className="size-8" /></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f3d66a]">Registration complete</p><h1 className="mt-2 text-3xl font-black tracking-[-.045em] sm:text-4xl">You’re registered, {result.firstName}.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-white/66">Keep the two details below. You will need them during check-in and for secure online lookup.</p></div></div></div><div className="space-y-4 p-6 sm:p-8"><Detail label="Registration number" value={result.registrationNumber} /><Detail label="Private lookup code" value={result.lookupCode} confidential /><Alert className="border-[#f0c6cc] bg-[#fff6f7] text-[#6f2430]"><ShieldAlert className="absolute left-4 top-4 size-5 text-[var(--bua-red)]" /><AlertTitle className="pl-7">Do not share your private lookup code</AlertTitle><AlertDescription className="pl-7">It works with your registration number to access approved screening information.</AlertDescription></Alert><div className="flex items-start gap-3 rounded-2xl border border-[#d8e2ef] bg-[#f4f7fb] p-4"><MailCheck className="mt-0.5 size-5 shrink-0 text-[var(--zendale-blue)]" /><p className="text-sm leading-6 text-[#405166]">{emailText}</p></div><div className="flex flex-col gap-3 pt-2 sm:flex-row"><Button asChild size="lg" className="flex-1"><Link href="/lookup"><Search /> Check my registration or result</Link></Button><Button type="button" size="lg" variant="outline" onClick={() => window.print()}><Printer /> Print or save</Button></div></div></Card></div></PublicShell>;
}
