import Link from "next/link";
import { Eye, Filter, Search, Stethoscope } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { participants } from "@/lib/mock-data";

export default function AdminScreeningsPage() {
  return (
    <PortalShell mode="admin" title="Screening records" description="Review every screening lifecycle state, completion record and authorised update.">
      <Card className="overflow-hidden border-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e0e9e7] p-5 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input className="pl-10" placeholder="Search screening or participant…" /></div><Select defaultValue="all"><SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 size-4" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="in-progress">In progress</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="updated">Updated</SelectItem></SelectContent></Select></div>
        <Table><TableHeader><TableRow><TableHead>Screening</TableHead><TableHead>Participant</TableHead><TableHead>Package delivered</TableHead><TableHead>Status</TableHead><TableHead>Completed / updated</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{participants.map((participant, index) => <TableRow key={participant.id}><TableCell><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-[#e8f5f1] text-[var(--primary)]"><Stethoscope className="size-4" /></div><div><p className="font-mono text-xs font-bold text-[var(--primary)]">SCR-2026-{1047-index}</p><p className="mt-1 text-xs text-[#7a8e93]">{participant.reg}</p></div></div></TableCell><TableCell><p className="font-semibold text-[#173945]">{participant.name}</p><p className="mt-1 text-xs text-[#71868c]">{participant.department}</p></TableCell><TableCell className="text-sm text-[#506a71]">{participant.service}</TableCell><TableCell><StatusBadge status={participant.status} /></TableCell><TableCell className="text-xs leading-5 text-[#667d83]">{participant.status === "Not Started" ? "—" : participant.lastActivity}<br /><span className="text-[#8b9b9f]">{participant.status === "Updated" ? "Updated by admin" : "Dr. Ada Mensah"}</span></TableCell><TableCell className="text-right"><Button asChild variant="ghost" size="sm"><Link href={`/admin/screenings/${participant.id}`}><Eye /> Open</Link></Button></TableCell></TableRow>)}</TableBody></Table>
      </Card>
    </PortalShell>
  );
}
