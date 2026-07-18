"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, UserRoundPlus } from "lucide-react";
import { EmptyState, StatusBadge } from "@/components/portal-widgets";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ParticipantsPage({ mode, participants }: { mode: "staff" | "admin"; participants: any[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return participants;
    return participants.filter((p) => [p.full_name, p.registration_number, p.phone, p.email, p.department].filter(Boolean).some((v) => String(v).toLowerCase().includes(q)));
  }, [query, participants]);
  return <Card className="overflow-hidden shadow-sm"><div className="flex flex-col gap-4 border-b border-[#e8e3db] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-[#242930]">Participant directory</h2><p className="mt-1 text-xs text-[#7a818a]">Search registration number, name, phone or department.</p></div><div className="relative w-full sm:max-w-sm"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#858b94]"/><Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" placeholder="Search participants"/></div></div>{filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[850px] border-collapse text-left"><thead><tr className="bg-[#faf9f6] text-[10px] font-black uppercase tracking-[.1em] text-[#7b818a]"><th className="px-5 py-3">Registration</th><th className="px-5 py-3">Participant</th><th className="px-5 py-3">Department</th><th className="px-5 py-3">Requested service</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Registered</th><th className="px-5 py-3"></th></tr></thead><tbody className="divide-y divide-[#ece8e0]">{filtered.map((participant) => { const screening = Array.isArray(participant.screenings) ? participant.screenings[0] : participant.screenings; const status = screening?.status || "not started"; return <tr key={participant.id} className="transition hover:bg-[#faf9f6]"><td className="px-5 py-4 font-mono text-sm font-bold text-[#225f9d]">{participant.registration_number}</td><td className="px-5 py-4"><p className="text-sm font-semibold text-[#272c33]">{participant.full_name}</p><p className="mt-1 text-xs text-[#7b818a]">{participant.phone}</p></td><td className="px-5 py-4 text-sm text-[#565e68]">{participant.department}</td><td className="px-5 py-4 text-sm text-[#565e68]">{(participant.requested_services || []).length ? participant.requested_services.join(", ") : participant.requested_service}</td><td className="px-5 py-4"><StatusBadge status={status}/></td><td className="px-5 py-4 text-xs text-[#7b818a]">{new Date(participant.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</td><td className="px-5 py-4"><Link href={`/${mode}/participants/${participant.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[var(--bua-red)] hover:underline">View profile <ArrowRight className="size-3.5"/></Link></td></tr>; })}</tbody></table></div> : <EmptyState icon={UserRoundPlus} title={query ? "No matching participant" : "No registrations yet"} description={query ? "Try another registration number, name or phone number." : "Participant records will appear here immediately after successful registration."}/>}</Card>;
}
