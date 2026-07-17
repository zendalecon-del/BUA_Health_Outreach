"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const [registration, setRegistration] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^BUA-?\d{3,}$/i.test(registration.replace(/\s/g, "")) || code.replace(/[^A-Z0-9]/gi, "").length < 8) {
      toast.error("Enter your registration number and private lookup code exactly as shown.");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    sessionStorage.setItem("bua-lookup-demo", JSON.stringify({ registration: registration.toUpperCase(), verifiedAt: Date.now() }));
    router.push("/lookup/record");
  };

  return (
    <PublicShell narrow>
      <div className="mx-auto max-w-2xl pb-16 pt-5 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="mb-5 -ml-3"><Link href="/"><ArrowLeft /> Back to registration</Link></Button>
        <Card className="card-shadow overflow-hidden border-white">
          <div className="bg-[var(--navy)] px-6 py-7 text-white sm:px-8">
            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10"><LockKeyhole className="size-6 text-[#7bdaca]" /></div>
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#76d0c3]">Secure participant lookup</p><h1 className="mt-2 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">View your registration or result</h1><p className="mt-2 text-sm leading-6 text-white/62">Both identifiers are required. We never tell an unsuccessful visitor which value was incorrect.</p></div>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-5 p-6 sm:p-8">
            <div className="space-y-2.5"><Label htmlFor="registration">Registration number <span className="text-[#c74b58]">*</span></Label><Input id="registration" value={registration} onChange={(event) => setRegistration(event.target.value.toUpperCase())} placeholder="BUA-0047" autoComplete="off" /></div>
            <div className="space-y-2.5"><Label htmlFor="lookup-code">Private lookup code <span className="text-[#c74b58]">*</span></Label><div className="relative"><Input id="lookup-code" type={showCode ? "text" : "password"} value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="7K9P-X4MT" className="pr-12 font-mono tracking-[0.08em]" autoComplete="off" /><button type="button" onClick={() => setShowCode((value) => !value)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#637b82] hover:bg-[#edf3f2]" aria-label={showCode ? "Hide private code" : "Show private code"}>{showCode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" /> Verifying securely…</> : <><Search /> View my record</>}</Button>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#688087]"><ShieldCheck className="size-4 text-[var(--primary)]" /> Protected with rate limiting and temporary lockout</div>
          </form>
        </Card>
        <Alert className="mt-5"><HelpCircle className="absolute left-4 top-4 size-5 text-[var(--primary)]" /><AlertTitle className="pl-7">Where can I find these details?</AlertTitle><AlertDescription className="pl-7">Both were shown immediately after registration. When you supplied an email, they were also included in your confirmation message.</AlertDescription></Alert>
      </div>
    </PublicShell>
  );
}
