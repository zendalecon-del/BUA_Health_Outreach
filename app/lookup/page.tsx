"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, HelpCircle, LoaderCircle, LockKeyhole, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/public-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LookupPage() {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [lookupCode, setLookupCode] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true);
    try {
      const response = await fetch("/api/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ registrationNumber, lookupCode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The details could not be verified.");
      sessionStorage.setItem("bua-lookup-record", JSON.stringify(result));
      router.push("/lookup/record");
    } catch (error) { toast.error(error instanceof Error ? error.message : "The details could not be verified."); setLoading(false); }
  };
  return <PublicShell narrow><div className="mx-auto max-w-2xl pb-16 pt-5 sm:pt-10"><Button asChild variant="ghost" size="sm" className="mb-5 -ml-3"><Link href="/"><ArrowLeft /> Back to registration</Link></Button><Card className="card-shadow overflow-hidden border-[#ddd7cd]"><div className="bg-[#17243a] px-6 py-8 text-white sm:px-8"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10"><LockKeyhole className="size-6 text-[#f3d66a]" /></div><div><p className="text-xs font-bold uppercase tracking-[.13em] text-[#84b8e7]">Secure participant lookup</p><h1 className="mt-2 text-2xl font-black tracking-[-.035em] sm:text-3xl">View your registration or approved result</h1><p className="mt-2 text-sm leading-6 text-white/62">Both identifiers are required. The system will not reveal which value was incorrect.</p></div></div></div><form onSubmit={submit} className="space-y-5 p-6 sm:p-8"><div className="space-y-2.5"><Label htmlFor="registration">Registration number <span className="text-[var(--bua-red)]">*</span></Label><Input id="registration" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())} placeholder="BUA-0047" autoComplete="off" /></div><div className="space-y-2.5"><Label htmlFor="code">Private lookup code <span className="text-[var(--bua-red)]">*</span></Label><div className="relative"><Input id="code" type={show ? "text" : "password"} value={lookupCode} onChange={(e) => setLookupCode(e.target.value.toUpperCase())} placeholder="7K9P-X4MT" className="pr-12 font-mono tracking-[.08em]" autoComplete="off" /><button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#68707b] hover:bg-[#efede8]" aria-label={show ? "Hide private code" : "Show private code"}>{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" /> Verifying securely…</> : <><Search /> View my record</>}</Button><div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#69717b]"><ShieldCheck className="size-4 text-[var(--zendale-blue)]" /> Generic errors protect participant privacy</div></form></Card><Alert className="mt-5"><HelpCircle className="absolute left-4 top-4 size-5 text-[var(--zendale-blue)]" /><AlertTitle className="pl-7">Where can I find these details?</AlertTitle><AlertDescription className="pl-7">Both were shown immediately after registration. When an email was supplied, they were also included in the confirmation message.</AlertDescription></Alert></div></PublicShell>;
}
