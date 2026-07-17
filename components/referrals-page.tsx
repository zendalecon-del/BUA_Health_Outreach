"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronRight, Filter, Hospital, Search } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const queue = [
  { id: "1", reg: "BUA-0047", name: "John Adewale", type: "Both", hospital: "Zendale Medical Centre", urgency: "Within 7 days", followUp: "24 Jul 2026", permission: "Yes", informed: "Yes", status: "Scheduled" },
  { id: "4", reg: "BUA-0044", name: "Fatima Bello", type: "Referral", hospital: "Sky High Medical Centre", urgency: "Urgent", followUp: "—", permission: "Yes", informed: "No", status: "Pending" },
  { id: "5", reg: "BUA-0043", name: "Tunde Balogun", type: "Follow-up", hospital: "—", urgency: "—", followUp: "22 Jul 2026", permission: "No", informed: "N/A", status: "Pending" },
  { id: "6", reg: "BUA-0042", name: "Ngozi Eze", type: "Follow-up", hospital: "—", urgency: "—", followUp: "25 Jul 2026", permission: "Yes", informed: "N/A", status: "Informed" },
];

export function ReferralsPage({ mode }: { mode: "staff" | "admin" }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const filtered = useMemo(() => queue.filter((item) => (`${item.reg} ${item.name} ${item.hospital}`).toLowerCase().includes(query.toLowerCase()) && (type === "all" || item.type === type)), [query, type]);
  return (
    <PortalShell mode={mode} title="Referrals & follow-ups" description="An operational queue generated from screening records. Update actions here without re-entering core participant data.">
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[ ["Pending actions", "12", "warning"], ["Urgent referrals", "5", "destructive"], ["Upcoming follow-ups", "7", "info"], ["Completed this week", "18", "default"] ].map(([label, value, variant]) => <Card key={label} className="border-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">{label}</p><Badge variant={variant as "warning" | "destructive" | "info" | "default"}>{value}</Badge></div><p className="mt-4 text-3xl font-black tracking-[-0.04em] text-[var(--navy)]">{value}</p></Card>)}
      </div>
      <Card className="overflow-hidden border-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e0e9e7] p-4 sm:flex-row sm:items-center sm:p-5"><div className="relative flex-1"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search participant, registration or hospital…" /></div><Select value={type} onValueChange={setType}><SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 size-4" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All action types</SelectItem><SelectItem value="Referral">Referral</SelectItem><SelectItem value="Follow-up">Follow-up</SelectItem><SelectItem value="Both">Both</SelectItem></SelectContent></Select></div>
        <div className="hidden overflow-x-auto lg:block"><Table><TableHeader><TableRow><TableHead>Participant</TableHead><TableHead>Type</TableHead><TableHead>Hospital / Follow-up</TableHead><TableHead>Permission</TableHead><TableHead>Informed</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{filtered.map((item) => <TableRow key={item.id}><TableCell><p className="font-semibold text-[#173945]">{item.name}</p><p className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">{item.reg}</p></TableCell><TableCell><Badge variant={item.type === "Referral" ? "warning" : item.type === "Both" ? "destructive" : "info"}>{item.type}</Badge></TableCell><TableCell><div className="space-y-1 text-xs text-[#596f76]">{item.hospital !== "—" && <p className="flex items-center gap-1.5"><Hospital className="size-3.5 text-[#986719]" /> {item.hospital} · {item.urgency}</p>}{item.followUp !== "—" && <p className="flex items-center gap-1.5"><CalendarDays className="size-3.5 text-[var(--primary)]" /> {item.followUp}</p>}</div></TableCell><TableCell><Badge variant={item.permission === "Yes" ? "default" : "secondary"}>{item.permission}</Badge></TableCell><TableCell><Badge variant={item.informed === "No" ? "destructive" : "secondary"}>{item.informed}</Badge></TableCell><TableCell><StatusBadge status={item.status} /></TableCell><TableCell className="text-right"><Button asChild variant="ghost" size="sm"><Link href={`/${mode}/participants/${item.id}`}>Open record <ChevronRight /></Link></Button></TableCell></TableRow>)}</TableBody></Table></div>
        <div className="divide-y divide-[#e1eae8] lg:hidden">{filtered.map((item) => <Link key={item.id} href={`/${mode}/participants/${item.id}`} className="block p-4 hover:bg-[#f8fbfa]"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-[#173945]">{item.name}</p><Badge variant={item.type === "Both" ? "destructive" : item.type === "Referral" ? "warning" : "info"}>{item.type}</Badge></div><p className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">{item.reg}</p><p className="mt-2 text-xs leading-5 text-[#647b82]">{item.hospital !== "—" ? item.hospital : `Follow-up ${item.followUp}`}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div><ChevronRight className="mt-2 size-4 text-[#91a2a6]" /></div></Link>)}</div>
      </Card>
    </PortalShell>
  );
}
