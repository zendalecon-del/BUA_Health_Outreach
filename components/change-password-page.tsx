"use client";

import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordPage({ mode }: { mode: "staff" | "admin" }) {
  const [show, setShow] = useState(false);
  return (
    <PortalShell mode={mode} title="Security & password" description="Change your password and review the account security controls protecting outreach data.">
      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <Card className="border-white p-5 shadow-sm sm:p-7"><div className="mb-6 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#e4f5f1] text-[var(--primary)]"><KeyRound className="size-5" /></div><div><h2 className="font-bold text-[var(--navy)]">Change password</h2><p className="mt-1 text-xs text-[#71868c]">Use a unique password that you do not reuse elsewhere.</p></div></div><div className="space-y-5"><div className="space-y-2"><Label>Current password</Label><Input type={show ? "text" : "password"} placeholder="Enter current password" /></div><div className="space-y-2"><Label>New password</Label><Input type={show ? "text" : "password"} placeholder="At least 12 characters" /></div><div className="space-y-2"><Label>Confirm new password</Label><div className="relative"><Input type={show ? "text" : "password"} placeholder="Repeat new password" className="pr-12" /><button type="button" onClick={() => setShow((value) => !value)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#698086] hover:bg-[#edf3f2]">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div><div className="rounded-xl bg-[#f2f7f6] p-4 text-xs leading-6 text-[#61787e]"><p className="flex items-center gap-2 font-semibold text-[#315b57]"><CheckCircle2 className="size-4 text-[var(--primary)]" /> At least 12 characters</p><p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#93a5a9]" /> Uppercase, lowercase, number and symbol</p><p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#93a5a9]" /> Different from recent passwords</p></div><Button className="w-full" size="lg" onClick={() => toast.success("Password updated successfully.")}><LockKeyhole /> Update password</Button></div></Card>
        <div className="space-y-6"><Card className="border-0 bg-[var(--navy)] p-6 text-white shadow-lg"><ShieldCheck className="size-7 text-[#75d5c7]" /><h2 className="mt-5 text-2xl font-black tracking-[-0.04em]">Account protection</h2><p className="mt-3 text-sm leading-7 text-white/60">Sessions use secure, HTTP-only cookies. Repeated failed sign-ins are rate limited and may temporarily lock the account.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="text-xs uppercase tracking-[0.1em] text-white/40">Staff ID</p><p className="mt-2 font-mono font-bold">{mode === "admin" ? "BUA-STF-001" : "BUA-STF-002"}</p></div><div className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="text-xs uppercase tracking-[0.1em] text-white/40">Last sign-in</p><p className="mt-2 font-bold">Today, 12:14 AM</p></div></div></Card><Alert><AlertTitle>Password reset policy</AlertTitle><AlertDescription>{mode === "admin" ? "Administrators may reset a staff password by generating a new temporary password, but can never view the current password." : "Contact an administrator when you cannot sign in. They can generate a new one-time temporary password but cannot view your current password."}</AlertDescription></Alert></div>
      </div>
    </PortalShell>
  );
}
