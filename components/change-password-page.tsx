"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Profile = { full_name: string; staff_id: string; role: string };
export function ChangePasswordPage({ mode, profile }: { mode: "staff" | "admin"; profile: Profile }) {
  const router = useRouter();
  const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [show, setShow] = useState(false); const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); if(password.length<12) return toast.error("Use at least 12 characters."); if(password!==confirm) return toast.error("Passwords do not match."); setLoading(true); try { const response=await fetch("/api/auth/change-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})}); const result=await response.json(); if(!response.ok) throw new Error(result.error||"Password change failed."); toast.success("Password changed securely."); router.push(`/${mode}/dashboard`); router.refresh(); } catch(error){toast.error(error instanceof Error?error.message:"Password change failed.");setLoading(false);} };
  return <PortalShell mode={mode} profile={profile} title="Account security" description="Change your password without exposing the current password to administrators."><div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><Card className="p-6 shadow-sm"><div className="grid size-12 place-items-center rounded-2xl bg-[#17243a] text-white"><KeyRound className="size-5"/></div><h2 className="mt-5 text-xl font-black tracking-[-.03em]">Password requirements</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-[#68707b]"><li>At least 12 characters</li><li>Use a phrase that is not reused elsewhere</li><li>Include uppercase, lowercase, number or symbol</li><li>Never share credentials in chat or spreadsheets</li></ul></Card><Card className="p-6 shadow-sm sm:p-8"><form onSubmit={submit} className="space-y-5"><div className="space-y-2.5"><Label htmlFor="password">New password</Label><div className="relative"><Input id="password" type={show?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} className="pr-12" autoComplete="new-password"/><button type="button" onClick={()=>setShow(v=>!v)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#68707b] hover:bg-[#efede8]">{show?<EyeOff className="size-4"/>:<Eye className="size-4"/>}</button></div></div><div className="space-y-2.5"><Label htmlFor="confirm">Confirm new password</Label><Input id="confirm" type={show?"text":"password"} value={confirm} onChange={(e)=>setConfirm(e.target.value)} autoComplete="new-password"/></div><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading?<><LoaderCircle className="animate-spin"/> Updating…</>:"Change password"}</Button></form><Alert className="mt-5"><ShieldCheck className="absolute left-4 top-4 size-5 text-[var(--zendale-blue)]"/><AlertTitle className="pl-7">Secure reset model</AlertTitle><AlertDescription className="pl-7">Administrators can issue a new temporary password, but they cannot view your existing password.</AlertDescription></Alert></Card></div></PortalShell>;
}
