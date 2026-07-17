"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, CheckCircle2, Clipboard, LockKeyhole, MailCheck, Printer, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/public-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fallback = { registrationNumber: "BUA-0047", lookupCode: "7K9P-X4MT", firstName: "Participant", email: "", emailQueued: false };

type Result = typeof fallback & { createdAt?: string };

function CopyField({ label, value, confidential = false }: { label: string; value: string; confidential?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="rounded-2xl border border-[#d4e4e0] bg-[#f8fbfa] p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#627b82]">{label}</p>
        {confidential && <Badge variant="warning"><LockKeyhole className="mr-1 size-3" /> Keep private</Badge>}
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="break-all font-mono text-2xl font-black tracking-[0.08em] text-[var(--navy)] sm:text-3xl">{value}</p>
        <Button variant="outline" size="icon" onClick={copy} aria-label={`Copy ${label}`}>{copied ? <Check className="text-[var(--primary)]" /> : <Clipboard />}</Button>
      </div>
    </div>
  );
}

export default function RegistrationSuccessPage() {
  const [result, setResult] = useState<Result>(fallback);
  useEffect(() => {
    const raw = sessionStorage.getItem("bua-registration-result");
    let restored: Result | null = null;
    if (raw) {
      try { restored = { ...fallback, ...JSON.parse(raw) }; } catch { /* use demo fallback */ }
    }
    if (!restored) return;
    const frame = requestAnimationFrame(() => setResult(restored));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <PublicShell narrow>
      <div className="pb-16 pt-5 sm:pt-10">
        <motion.div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-[#dff5ef] text-[var(--primary)] shadow-[0_16px_45px_rgba(8,111,107,.18)]" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
          <CheckCircle2 className="size-10" />
        </motion.div>
        <div className="text-center">
          <Badge>Registration complete</Badge>
          <h1 className="mt-4 text-balance text-3xl font-black tracking-[-0.045em] text-[var(--navy)] sm:text-4xl">You’re registered, {result.firstName}.</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#627a81]">Save both details below. You will need your private lookup code together with your registration number to view your screening status and approved guidance.</p>
        </div>

        <Card className="card-shadow mt-8 border-white p-5 sm:p-7">
          <div className="grid gap-4">
            <CopyField label="Registration number" value={result.registrationNumber} />
            <CopyField label="Private lookup code" value={result.lookupCode} confidential />
          </div>
          <Alert className="mt-5 border-[#efd6bd] bg-[#fff8ef] text-[#684d2c]"><ShieldAlert className="absolute left-4 top-4 size-5 text-[#ad6f26]" /><AlertTitle className="pl-7">Do not share your private lookup code</AlertTitle><AlertDescription className="pl-7">Anyone with both identifiers may be able to view your approved screening information.</AlertDescription></Alert>
          <div className="mt-5 rounded-2xl border border-[#d7e6e2] bg-white p-4">
            <div className="flex items-start gap-3"><MailCheck className="mt-0.5 size-5 shrink-0 text-[var(--primary)]" /><div><p className="text-sm font-semibold text-[#183945]">{result.email ? `A copy has been queued for ${result.email.replace(/(^.).*(@.*$)/, "$1***$2")}` : "No email was provided"}</p><p className="mt-1 text-xs leading-5 text-[#6c8187]">{result.email ? "Registration remains complete even if email delivery is delayed." : "Please copy or print these details before leaving this page."}</p></div></div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg"><Link href="/lookup"><Search /> Check my registration / results</Link></Button>
            <Button variant="outline" size="lg" onClick={() => window.print()}><Printer /> Print or save confirmation</Button>
          </div>
        </Card>
        <p className="mt-5 text-center text-xs leading-5 text-[#768b90]">Your registration number is used for check-in and staff search. Your private code is only for secure online lookup.</p>
      </div>
    </PublicShell>
  );
}
