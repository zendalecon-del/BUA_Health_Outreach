"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Filter, Search, SlidersHorizontal, UserRoundSearch } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { participants } from "@/lib/mock-data";

export function ParticipantsPage({ mode }: { mode: "staff" | "admin" }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(() => participants.filter((participant) => {
    const haystack = `${participant.name} ${participant.reg} ${participant.phone} ${participant.department}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (status === "all" || participant.status === status);
  }), [query, status]);

  return (
    <PortalShell mode={mode} title="Participants" description="Search registration records and open the participant profile before starting or continuing a screening." action={mode === "admin" ? <Button asChild variant="outline"><a href="/api/admin/export"><Download /> Export records</a></Button> : undefined}>
      <Card className="overflow-hidden border-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e0e9e7] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative min-w-0 flex-1"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search registration number, participant, phone or department…" /></div>
          <Select value={status} onValueChange={setStatus}><SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 size-4 text-[#6b8187]" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="Not Started">Not started</SelectItem><SelectItem value="In Progress">In progress</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Updated">Updated</SelectItem></SelectContent></Select>
          <Button variant="outline"><SlidersHorizontal /> More filters</Button>
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader><TableRow><TableHead>Registration</TableHead><TableHead>Participant</TableHead><TableHead>Department</TableHead><TableHead>Requested service</TableHead><TableHead>Status</TableHead><TableHead>Last activity</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>{filtered.map((participant) => <TableRow key={participant.id}><TableCell><span className="font-mono text-xs font-bold tracking-[0.06em] text-[var(--primary)]">{participant.reg}</span></TableCell><TableCell><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-[#e8f5f1] text-xs font-bold text-[var(--primary)]">{participant.initials}</div><div><p className="font-semibold text-[#173945]">{participant.name}</p><p className="mt-0.5 text-xs text-[#7a8e93]">{participant.phone}</p></div></div></TableCell><TableCell className="text-[#526c73]">{participant.department}</TableCell><TableCell className="max-w-[210px] text-[#526c73]">{participant.service}</TableCell><TableCell><StatusBadge status={participant.status} /></TableCell><TableCell className="text-xs text-[#6d8288]">{participant.lastActivity}</TableCell><TableCell className="text-right"><Button asChild variant="ghost" size="sm"><Link href={`/${mode}/participants/${participant.id}`}>View profile</Link></Button></TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
        <div className="divide-y divide-[#e1eae8] lg:hidden">
          {filtered.map((participant) => <Link key={participant.id} href={`/${mode}/participants/${participant.id}`} className="block p-4 hover:bg-[#f8fbfa]"><div className="flex items-start gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[#e8f5f1] text-xs font-bold text-[var(--primary)]">{participant.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-[#173945]">{participant.name}</p><StatusBadge status={participant.status} /></div><p className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">{participant.reg}</p><p className="mt-2 text-xs leading-5 text-[#71868c]">{participant.department} · {participant.service}</p></div><ChevronRight className="mt-2 size-4 text-[#8fa2a6]" /></div></Link>)}
        </div>
        {filtered.length === 0 && <div className="grid min-h-72 place-items-center p-8 text-center"><div><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#edf5f3] text-[#6c858b]"><UserRoundSearch /></div><h3 className="mt-4 font-bold text-[var(--navy)]">No participants found</h3><p className="mt-2 text-sm text-[#71868c]">Try another search or clear the status filter.</p></div></div>}
        <div className="flex flex-col justify-between gap-3 border-t border-[#e0e9e7] bg-[#fbfdfc] p-4 text-xs text-[#6c8288] sm:flex-row sm:items-center sm:px-5"><span>Showing {filtered.length} of {participants.length} participants</span><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled><ChevronLeft /> Previous</Button><span className="rounded-lg bg-[var(--navy)] px-3 py-2 font-bold text-white">1</span><Button variant="outline" size="sm" disabled>Next <ChevronRight /></Button></div></div>
      </Card>
    </PortalShell>
  );
}
