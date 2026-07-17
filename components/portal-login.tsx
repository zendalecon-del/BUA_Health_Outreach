"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { BuaMark, PoweredBy } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PortalLogin({ mode }: { mode: "staff" | "admin" }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAdmin = mode === "admin";
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    router.push(isAdmin ? "/admin/dashboard" : "/staff/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#edf5f3] lg:grid lg:grid-cols-[1.02fr_.98fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[var(--navy)] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="shell-grid absolute inset-0 opacity-25" />
        <div className="absolute -right-24 -top-20 size-[420px] rounded-full border-[68px] border-[#2d9389]/18" />
        <div className="absolute -bottom-28 -left-16 size-[360px] rounded-full bg-[#18596a]/45 blur-3xl" />
        <div className="relative"><BuaMark className="[&_span:last-child_span]:text-white" /></div>
        <motion.div className="relative max-w-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-xs font-bold text-[#8be0d2]"><ShieldCheck className="size-4" /> Authorised access only</div>
          <h1 className="text-balance text-5xl font-black leading-[1.03] tracking-[-0.055em] xl:text-6xl">Clinical operations, organised around every participant.</h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/62">Search, screen, refer and follow up without re-entering registration information. Every completion and update is auditable.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {["Role-based access", "Read-only completion", "Secure participant lookup", "Action-focused queues"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 text-sm font-semibold text-white/78"><span className="grid size-7 place-items-center rounded-lg bg-[#2b958b] text-xs">✓</span>{item}</div>)}
          </div>
        </motion.div>
        <div className="relative text-white/65"><PoweredBy /></div>
      </section>
      <section className="flex min-h-screen flex-col px-4 py-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between lg:hidden"><BuaMark /><Button asChild variant="ghost" size="sm"><Link href="/">Public site</Link></Button></div>
        <div className="mx-auto flex w-full max-w-md flex-1 items-center py-10">
          <motion.div className="w-full" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--primary)]">{isAdmin ? "Administrator portal" : "Staff portal"}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--navy)]">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-[#647b82]">Sign in with your assigned {isAdmin ? "administrator credentials" : "Staff ID and password"}.</p>
            <Card className="card-shadow mt-7 border-white p-5 sm:p-7">
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2.5"><Label htmlFor="staff-id">{isAdmin ? "Administrator ID or email" : "Staff ID"}</Label><div className="relative"><UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input id="staff-id" className="pl-10" placeholder={isAdmin ? "admin@example.com" : "BUA-STF-001"} defaultValue={isAdmin ? "admin@bua-outreach.local" : "BUA-STF-002"} /></div></div>
                <div className="space-y-2.5"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><button type="button" className="text-xs font-bold text-[var(--primary)] hover:underline">Need help?</button></div><div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input id="password" type={showPassword ? "text" : "password"} className="pl-10 pr-12" defaultValue="demo-password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#698086] hover:bg-[#edf3f2]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" /> Signing in…</> : "Sign in securely"}</Button>
                <div className="flex items-start gap-2 rounded-xl bg-[#f1f7f5] p-3 text-xs leading-5 text-[#627a80]"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" /> Repeated unsuccessful attempts may temporarily lock access. Contact an administrator for a password reset.</div>
              </form>
            </Card>
            <div className="mt-5 flex items-center justify-between text-xs text-[#71868c]"><Link href="/" className="font-semibold hover:text-[var(--primary)]">← Return to public site</Link><span>Prototype credentials prefilled</span></div>
          </motion.div>
        </div>
        <div className="flex justify-center pb-2 lg:hidden"><PoweredBy /></div>
      </section>
    </main>
  );
}
