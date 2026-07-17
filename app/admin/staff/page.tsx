"use client";

import { useState } from "react";
import { Check, Clipboard, KeyRound, Mail, MoreHorizontal, Plus, Search, Send, ShieldCheck, UserRoundCog } from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { staffMembers as seedStaff } from "@/lib/mock-data";

export default function StaffManagementPage() {
  const [staff, setStaff] = useState(seedStaff);
  const [addOpen, setAddOpen] = useState(false);
  const [createdOpen, setCreatedOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Medical Staff");
  const created = { id: `BUA-STF-${String(staff.length + 1).padStart(3, "0")}`, password: "G7!vQ9#kM2" };

  const create = () => {
    if (!name || !email || !phone) { toast.error("Complete the four required staff fields."); return; }
    setStaff((items) => [...items, { id: created.id, name, role, email, status: "Active", lastSeen: "Never" }]);
    setAddOpen(false); setCreatedOpen(true);
  };
  const copy = async () => { await navigator.clipboard.writeText(`Staff ID: ${created.id}\nTemporary password: ${created.password}`); toast.success("Login details copied."); };

  return (
    <PortalShell mode="admin" title="Staff management" description="Create and manage authorised staff accounts. Existing passwords are never retrievable." action={<Button onClick={() => setAddOpen(true)}><Plus /> Add staff</Button>}>
      <div className="mb-6 grid gap-4 sm:grid-cols-3"><Card className="border-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Active staff</p><p className="mt-3 text-3xl font-black text-[var(--navy)]">{staff.filter((item) => item.status === "Active").length}</p></Card><Card className="border-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Credential delivery</p><p className="mt-3 text-3xl font-black text-[var(--navy)]">100%</p></Card><Card className="border-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Password resets</p><p className="mt-3 text-3xl font-black text-[var(--navy)]">2</p><p className="mt-1 text-xs text-[#71868c]">This month</p></Card></div>
      <Card className="overflow-hidden border-white shadow-sm">
        <div className="border-b border-[#e0e9e7] p-5"><div className="relative max-w-lg"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input className="pl-10" placeholder="Search Staff ID, name, email or role…" /></div></div>
        <Table><TableHeader><TableRow><TableHead>Staff member</TableHead><TableHead>Staff ID</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Last activity</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{staff.map((member) => <TableRow key={member.id}><TableCell><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[#e8f5f1] text-xs font-bold text-[var(--primary)]">{member.name.split(" ").slice(-2).map((part) => part[0]).join("")}</div><div><p className="font-semibold text-[#173945]">{member.name}</p><p className="mt-1 text-xs text-[#71868c]">{member.email}</p></div></div></TableCell><TableCell><span className="font-mono text-xs font-bold text-[var(--primary)]">{member.id}</span></TableCell><TableCell><Badge variant="outline">{member.role}</Badge></TableCell><TableCell><StatusBadge status={member.status} /></TableCell><TableCell className="text-xs text-[#71868c]">{member.lastSeen}</TableCell><TableCell className="text-right"><div className="inline-flex gap-1"><Button variant="ghost" size="icon" aria-label="Reset password" onClick={() => toast.success("A new temporary password has been generated.")}><KeyRound /></Button><Button variant="ghost" size="icon" aria-label="Send login details" onClick={() => toast.success("Credential email queued.")}><Mail /></Button><Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal /></Button></div></TableCell></TableRow>)}</TableBody></Table>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent className="max-w-lg"><DialogHeader><div className="mb-2 grid size-11 place-items-center rounded-2xl bg-[#e5f5f1] text-[var(--primary)]"><UserRoundCog className="size-5" /></div><DialogTitle>Add staff member</DialogTitle><DialogDescription>The admin enters only four fields. The system generates an immutable Staff ID and one-time temporary password.</DialogDescription></DialogHeader><div className="grid gap-4 py-2"><div className="space-y-2"><Label>Full name *</Label><Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" /></div><div className="space-y-2"><Label>Phone number *</Label><Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0803 123 4567" /></div><div className="space-y-2"><Label>Email address *</Label><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" /></div><div className="space-y-2"><Label>Role *</Label><Select value={role} onValueChange={setRole}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Administrator">Administrator</SelectItem><SelectItem value="Reception Staff">Reception Staff</SelectItem><SelectItem value="Medical Staff">Medical Staff</SelectItem></SelectContent></Select></div></div><DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={create}><Plus /> Create staff account</Button></DialogFooter></DialogContent></Dialog>

      <Dialog open={createdOpen} onOpenChange={setCreatedOpen}><DialogContent><DialogHeader><div className="mb-2 grid size-12 place-items-center rounded-2xl bg-[#e2f4ef] text-[var(--primary)]"><Check className="size-6" /></div><DialogTitle>Staff account created</DialogTitle><DialogDescription>The temporary password is displayed once. Copy or send it now; it cannot be viewed later.</DialogDescription></DialogHeader><div className="space-y-3 rounded-2xl border border-[#d6e5e1] bg-[#f7fbfa] p-4"><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Staff ID</p><p className="mt-1 font-mono text-lg font-black text-[var(--navy)]">{created.id}</p></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">Temporary password</p><p className="mt-1 font-mono text-lg font-black tracking-[0.06em] text-[var(--navy)]">{created.password}</p></div></div><div className="flex items-start gap-2 rounded-xl bg-[#fff7e8] p-3 text-xs leading-5 text-[#6b5631]"><ShieldCheck className="mt-0.5 size-4 shrink-0" />The staff member must change this password on first login.</div><DialogFooter><Button variant="outline" onClick={copy}><Clipboard /> Copy details</Button><Button onClick={() => { toast.success("Login details email queued."); setCreatedOpen(false); }}><Send /> Send login details</Button></DialogFooter></DialogContent></Dialog>
    </PortalShell>
  );
}
