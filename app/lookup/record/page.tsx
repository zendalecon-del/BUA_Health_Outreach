"use client";

import Link from "next/link";
import { Activity, ArrowLeft, CalendarDays, CheckCircle2, HeartPulse, Hospital, Printer, ShieldCheck, Stethoscope } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function ResultMetric({ icon: Icon, label, value, note }: { icon: typeof Activity; label: string; value: string; note: string }) {
  return <Card className="p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6d8389]">{label}</p><p className="mt-2 text-2xl font-black tracking-[-0.035em] text-[var(--navy)]">{value}</p><p className="mt-1 text-xs text-[#71868c]">{note}</p></div><div className="grid size-10 place-items-center rounded-xl bg-[#e4f5f1] text-[var(--primary)]"><Icon className="size-5" /></div></div></Card>;
}

export default function LookupRecordPage() {
  return (
    <PublicShell narrow>
      <div className="pb-16 pt-5 sm:pt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><Button asChild variant="ghost" size="sm" className="-ml-3"><Link href="/lookup"><ArrowLeft /> New lookup</Link></Button><Button variant="outline" size="sm" onClick={() => window.print()}><Printer /> Print record</Button></div>
        <Card className="card-shadow overflow-hidden border-white">
          <div className="relative overflow-hidden bg-[var(--navy)] p-6 text-white sm:p-8">
            <div className="shell-grid absolute inset-0 opacity-20" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div><Badge className="mb-3 border-white/10 bg-white/10 text-white">Verified participant record</Badge><h1 className="text-3xl font-black tracking-[-0.045em]">John A.</h1><p className="mt-2 font-mono text-sm tracking-[0.08em] text-white/60">BUA-0047</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4"><div className="flex items-center gap-3"><CheckCircle2 className="size-7 text-[#69d3c3]" /><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/45">Screening status</p><p className="mt-1 text-lg font-bold">Result available</p></div></div></div>
            </div>
          </div>
          <div className="p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#cfe4df] bg-[#f1faf7] p-4"><ShieldCheck className="size-6 shrink-0 text-[var(--primary)]" /><div><p className="text-sm font-bold text-[#174440]">Only approved participant-facing information is shown here.</p><p className="mt-1 text-xs leading-5 text-[#657d82]">Internal clinical notes, staff identity and audit history are not included.</p></div></div>
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[var(--navy)]">Approved screening results</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2"><ResultMetric icon={Activity} label="Blood pressure" value="124 / 81 mmHg" note="Recorded 17 Jul 2026" /><ResultMetric icon={HeartPulse} label="Random blood sugar" value="5.8 mmol/L" note="Recorded 17 Jul 2026" /></div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Card className="border-[#d4e5e1] p-5"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f1fb] text-[#2f6c9d]"><Stethoscope className="size-5" /></div><div><p className="text-sm font-bold text-[var(--navy)]">Doctor consultation</p><p className="mt-1 text-sm leading-6 text-[#647b82]">Completed during the outreach screening.</p></div></div></Card>
              <Card className="border-[#eadabd] bg-[#fffaf1] p-5"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fceac8] text-[#986515]"><Hospital className="size-5" /></div><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-[var(--navy)]">Referral required</p><Badge variant="warning">Within 7 days</Badge></div><p className="mt-2 text-sm font-semibold text-[#4d6066]">Zendale Medical Centre · General Medicine</p><p className="mt-1 text-sm leading-6 text-[#6d7f83]">Please contact the facility with your registration number for the recommended review.</p></div></div></Card>
            </div>
            <Card className="mt-4 border-[#d6e5e1] p-5"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f5f1] text-[var(--primary)]"><CalendarDays className="size-5" /></div><div><p className="text-sm font-bold text-[var(--navy)]">Suggested follow-up</p><p className="mt-1 text-sm font-semibold text-[#445e65]">24 July 2026</p><p className="mt-1 text-sm leading-6 text-[#6c8086]">Return for a repeat blood-pressure check and bring any current medication details.</p></div></div></Card>
            <Alert className="mt-6 border-[#e2d9be] bg-[#fffaf0] text-[#5e5437]"><AlertTitle>Important health notice</AlertTitle><AlertDescription>This outreach screening is preliminary and does not replace a comprehensive diagnosis, emergency care or consultation with your usual healthcare professional.</AlertDescription></Alert>
          </div>
        </Card>
      </div>
    </PublicShell>
  );
}
