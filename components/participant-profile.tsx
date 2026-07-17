"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Edit3,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { participants } from "@/lib/mock-data";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5"><dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">{label}</dt><dd className="text-sm font-semibold leading-6 text-[#294750]">{value || "—"}</dd></div>;
}

export function ParticipantProfile({ mode, id }: { mode: "staff" | "admin"; id: string }) {
  const participant = participants.find((item) => item.id === id) ?? participants[0];
  const [notified, setNotified] = useState(false);
  const screeningHref = `/${mode}/screenings/${participant.id}`;
  const actionLabel = participant.status === "Not Started" ? "Start screening" : participant.status === "In Progress" ? "Continue screening" : "View screening";
  const actionIcon = participant.status === "Not Started" ? Stethoscope : participant.status === "In Progress" ? ClipboardCheck : CheckCircle2;
  const ActionIcon = actionIcon;

  return (
    <PortalShell
      mode={mode}
      title={participant.name}
      description={`${participant.reg} · ${participant.department}`}
      action={<div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link href={`/${mode}/participants`}><ArrowLeft /> Participant list</Link></Button><Button asChild><Link href={screeningHref}><ActionIcon /> {actionLabel}</Link></Button></div>}
    >
      <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <div className="space-y-6">
          <Card className="overflow-hidden border-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-[#e0e9e7] bg-[#fbfdfc] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4"><div className="grid size-14 place-items-center rounded-2xl bg-[#e1f4ef] text-base font-black text-[var(--primary)]">{participant.initials}</div><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold tracking-[-0.02em] text-[var(--navy)]">Registration information</h2><Badge>Confirmed</Badge></div><p className="mt-1 text-xs text-[#71868c]">Registered 17 July 2026 · 9:32 AM</p></div></div>
              <Button variant="ghost" size="sm"><Edit3 /> Correct registration</Button>
            </div>
            <dl className="divide-y divide-[#e3ebe9] px-5 sm:px-6"><InfoRow label="Full name" value={participant.name} /><InfoRow label="Gender / Age" value="Male · 38 years" /><InfoRow label="Phone" value={<span className="inline-flex items-center gap-2"><Phone className="size-4 text-[var(--primary)]" /> {participant.phone}</span>} /><InfoRow label="Email" value={<span className="inline-flex items-center gap-2"><Mail className="size-4 text-[var(--primary)]" /> {participant.email}</span>} /><InfoRow label="Department" value={participant.department} /><InfoRow label="Requested service" value={participant.service} /></dl>
          </Card>

          <Card className="overflow-hidden border-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#e0e9e7] p-5"><div className="grid size-10 place-items-center rounded-xl bg-[#e8f5f1] text-[var(--primary)]"><HeartPulse className="size-5" /></div><div><h2 className="font-bold text-[var(--navy)]">Self-reported health information</h2><p className="mt-1 text-xs text-[#71868c]">Submitted during participant registration</p></div></div>
            <dl className="divide-y divide-[#e3ebe9] px-5 sm:px-6"><InfoRow label="Known conditions" value="Hypertension" /><InfoRow label="Medication" value="Amlodipine 5 mg, once daily" /><InfoRow label="Smoking" value="No" /><InfoRow label="Alcohol" value="Occasionally" /><InfoRow label="Health concern" value="Occasional headaches after long work shifts." /></dl>
          </Card>

          <Card className="overflow-hidden border-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-[#e0e9e7] p-5"><div><h2 className="font-bold text-[var(--navy)]">Permissions & consent</h2><p className="mt-1 text-xs text-[#71868c]">Consent choices are stored separately.</p></div><ShieldCheck className="size-5 text-[var(--primary)]" /></div>
            <div className="grid gap-3 p-5 sm:grid-cols-2"><div className="rounded-xl border border-[#d7e6e2] bg-[#f7fbfa] p-4"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Medical follow-up contact</p><p className="mt-2 font-bold text-[#1c5d57]">Yes — permission granted</p></div><div className="rounded-xl border border-[#d7e6e2] bg-[#f7fbfa] p-4"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Future wellness information</p><p className="mt-2 font-bold text-[#50656b]">No — not subscribed</p></div></div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden border-white shadow-sm">
            <div className="bg-[var(--navy)] p-5 text-white"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#76d4c6]">Screening status</p><div className="mt-3"><StatusBadge status={participant.status} /></div></div><Stethoscope className="size-7 text-[#74d6c7]" /></div></div>
            <div className="p-5"><div className="space-y-3 text-sm"><div className="flex items-center justify-between"><span className="text-[#71868c]">Last activity</span><span className="font-semibold text-[#294750]">{participant.lastActivity}</span></div><div className="flex items-center justify-between"><span className="text-[#71868c]">Completed by</span><span className="font-semibold text-[#294750]">Dr. Ada Mensah</span></div><div className="flex items-center justify-between"><span className="text-[#71868c]">Completed on</span><span className="font-semibold text-[#294750]">17 Jul, 10:42 AM</span></div></div><Separator className="my-5" /><Button asChild className="w-full"><Link href={screeningHref}><ActionIcon /> {actionLabel}</Link></Button>{["Completed", "Updated"].includes(participant.status) && <Button asChild variant="outline" className="mt-3 w-full"><Link href={`${screeningHref}?mode=edit`}><Edit3 /> Edit screening</Link></Button>}</div>
          </Card>

          {participant.referral && <Card className="border-[#eddcc0] bg-[#fffaf2] p-5 shadow-sm"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fae9cb] text-[#94641a]"><MapPin className="size-5" /></div><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-[var(--navy)]">Referral required</h3><Badge variant="warning">Within 7 days</Badge></div><p className="mt-2 text-sm font-semibold text-[#4f5f62]">Zendale Medical Centre</p><p className="mt-1 text-sm leading-6 text-[#6d7f83]">General Medicine · Participant informed</p></div></div></Card>}

          {participant.followUp && <Card className="border-[#d7e6e2] p-5 shadow-sm"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f5f1] text-[var(--primary)]"><CalendarDays className="size-5" /></div><div><h3 className="font-bold text-[var(--navy)]">Follow-up required</h3><p className="mt-2 text-sm font-semibold text-[#4e676e]">Suggested: 24 July 2026</p><p className="mt-1 text-sm leading-6 text-[#6d7f83]">Repeat blood-pressure check.</p></div></div></Card>}

          {["Completed", "Updated"].includes(participant.status) && <Card className="border-white p-5 shadow-sm"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f1fb] text-[#356f9f]"><Send className="size-5" /></div><div className="flex-1"><h3 className="font-bold text-[var(--navy)]">Result notification</h3><p className="mt-1 text-sm leading-6 text-[#6c8187]">Send a secure result-ready notice without medical details.</p><Button className="mt-4 w-full" variant={notified ? "secondary" : "default"} disabled={notified || participant.email === "—"} onClick={() => { setNotified(true); toast.success("Result notification queued successfully."); }}>{notified ? <><CheckCircle2 /> Notification queued</> : <><Send /> Send result notification</>}</Button></div></div></Card>}

          <Alert><Clock3 className="absolute left-4 top-4 size-5 text-[var(--primary)]" /><AlertTitle className="pl-7">Audit protection</AlertTitle><AlertDescription className="pl-7">Completed records open read-only. Corrections use a separate edit action and preserve original completion metadata.</AlertDescription></Alert>
        </div>
      </div>
    </PortalShell>
  );
}
