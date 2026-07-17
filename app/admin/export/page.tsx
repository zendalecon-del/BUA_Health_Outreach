"use client";

import { useState } from "react";
import { CalendarRange, CheckCircle2, Database, Download, FileSpreadsheet, Filter, LoaderCircle, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sheets = [
  ["Participants", "Identity, contact, employment, health declarations, consent and registration timestamps", "248 rows"],
  ["Screenings", "Measurements, clinical workflow status and completion/update metadata", "184 rows"],
  ["Referrals", "Hospital, reason, urgency, participant-informed status and operational state", "18 rows"],
  ["Follow-ups", "Suggested date, instructions, contact permission and completion state", "31 rows"],
  ["Complete Records", "One management-friendly row per participant with latest linked records", "248 rows"],
  ["Staff Activity", "Audit-safe account and workflow activity without password information", "62 rows"],
];

export default function ExportPage() {
  const [downloading, setDownloading] = useState(false);
  const download = () => { setDownloading(true); window.location.href = "/api/admin/export"; setTimeout(() => setDownloading(false), 900); };
  return (
    <PortalShell mode="admin" title="Excel export" description="Generate a structured multi-sheet workbook from the system database. Excel is an export, not the primary record store." action={<Button onClick={download} disabled={downloading}>{downloading ? <LoaderCircle className="animate-spin" /> : <Download />} Generate workbook</Button>}>
      <div className="grid gap-6 xl:grid-cols-[.7fr_1.3fr]">
        <Card className="h-fit border-white p-5 shadow-sm xl:sticky xl:top-28">
          <div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#e4f5f1] text-[var(--primary)]"><Filter className="size-5" /></div><div><h2 className="font-bold text-[var(--navy)]">Export filters</h2><p className="mt-1 text-xs text-[#71868c]">Applied to every compatible sheet</p></div></div>
          <div className="mt-6 space-y-5"><div className="space-y-2"><Label>Registration date from</Label><Input type="date" defaultValue="2026-07-01" /></div><div className="space-y-2"><Label>Registration date to</Label><Input type="date" defaultValue="2026-07-17" /></div><div className="space-y-2"><Label>Screening status</Label><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="updated">Updated</SelectItem><SelectItem value="in-progress">In progress</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Requested service</Label><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All services</SelectItem><SelectItem value="wellness">Free wellness</SelectItem><SelectItem value="standard">Standard</SelectItem><SelectItem value="comprehensive">Comprehensive</SelectItem></SelectContent></Select></div></div>
          <Button onClick={download} size="lg" className="mt-6 w-full" disabled={downloading}>{downloading ? <><LoaderCircle className="animate-spin" /> Preparing…</> : <><FileSpreadsheet /> Download .xlsx</>}</Button>
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#f1f7f5] p-3 text-xs leading-5 text-[#647b81]"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />Lookup-code plaintext and password data are never included.</div>
        </Card>
        <div className="space-y-6">
          <Card className="overflow-hidden border-white shadow-sm"><div className="flex flex-col gap-4 border-b border-[#e0e9e7] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-[var(--navy)]">Workbook contents</h2><p className="mt-1 text-xs text-[#71868c]">Headers are frozen, filters enabled and dates exported as real Excel date cells.</p></div><Badge variant="outline">6 sheets</Badge></div><div className="divide-y divide-[#e2ebe9]">{sheets.map(([name, description, rows]) => <div key={name} className="flex items-start gap-4 p-5"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f5f1] text-[var(--primary)]"><FileSpreadsheet className="size-4.5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-[#173945]">{name}</p><Badge variant="secondary">{rows}</Badge></div><p className="mt-1 text-sm leading-6 text-[#687f85]">{description}</p></div><CheckCircle2 className="mt-1 size-5 text-[var(--primary)]" /></div>)}</div></Card>
          <Card className="border-0 bg-[var(--navy)] p-6 text-white shadow-lg"><div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#7ad8ca]"><Database className="size-4" /> Database snapshot</div><h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">BUA_Health_Outreach_Export_2026-07-17_0035.xlsx</h3><p className="mt-2 text-sm leading-6 text-white/58">The generated timestamp and active filter summary are included inside the workbook.</p></div><div className="rounded-2xl border border-white/10 bg-white/8 p-5 text-center"><CalendarRange className="mx-auto size-6 text-[#76d5c6]" /><p className="mt-2 text-2xl font-black">248</p><p className="text-[10px] uppercase tracking-[0.1em] text-white/45">Records</p></div></div></Card>
          <Alert><AlertTitle>Export access is audited</AlertTitle><AlertDescription>Every workbook generation should record the administrator, timestamp, filters and outcome. Store exported files only in approved locations.</AlertDescription></Alert>
        </div>
      </div>
    </PortalShell>
  );
}
