"use client";

import { useState } from "react";
import { Building2, Edit3, MapPin, Phone, Plus, Power, Search } from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/portal-widgets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { hospitals as seedHospitals } from "@/lib/mock-data";

export default function ReferralHospitalsPage() {
  const [hospitals, setHospitals] = useState(seedHospitals);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const add = () => {
    if (!name.trim()) { toast.error("Enter a hospital name."); return; }
    setHospitals((items) => [...items, { id: String(items.length + 1), name, specialty: "General Medicine", phone: "+234 800 000 0000", status: "Active" }]);
    setName(""); setOpen(false); toast.success("Referral hospital added.");
  };
  const toggle = (id: string) => setHospitals((items) => items.map((item) => item.id === id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item));
  return (
    <PortalShell mode="admin" title="Referral hospitals" description="Manage the approved directory used by clinicians when a screening requires referral." action={<Button onClick={() => setOpen(true)}><Plus /> Add hospital</Button>}>
      <Card className="border-[#d6e5e1] bg-[#f5fbf9] p-4 shadow-sm"><p className="text-sm font-semibold text-[#27534f]">Inactive hospitals remain visible in historical records but disappear from new referral dropdowns.</p></Card>
      <div className="mt-6 flex max-w-md"><div className="relative w-full"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input className="pl-10" placeholder="Search hospital or specialty…" /></div></div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hospitals.map((hospital) => <Card key={hospital.id} className="border-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-start justify-between gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#e6f5f1] text-[var(--primary)]"><Building2 className="size-5" /></div><StatusBadge status={hospital.status} /></div><h3 className="mt-5 text-lg font-bold tracking-[-0.025em] text-[var(--navy)]">{hospital.name}</h3><p className="mt-1 text-sm font-semibold text-[#5d747b]">{hospital.specialty}</p><div className="mt-5 space-y-2.5 text-xs text-[#71868c]"><p className="flex items-center gap-2"><MapPin className="size-4 text-[var(--primary)]" /> Lagos, Nigeria</p><p className="flex items-center gap-2"><Phone className="size-4 text-[var(--primary)]" /> {hospital.phone}</p></div><div className="mt-5 flex gap-2 border-t border-[#e1eae8] pt-4"><Button variant="outline" size="sm" className="flex-1"><Edit3 /> Edit</Button><Button variant="ghost" size="sm" className="flex-1" onClick={() => toggle(hospital.id)}><Power /> {hospital.status === "Active" ? "Deactivate" : "Activate"}</Button></div></Card>)}
      </div>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>Add referral hospital</DialogTitle><DialogDescription>Active hospitals will appear immediately in the clinician referral dropdown.</DialogDescription></DialogHeader><div className="grid gap-4 py-2"><div className="space-y-2"><Label>Hospital name *</Label><Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Hospital or medical centre" /></div><div className="space-y-2"><Label>Address</Label><Input placeholder="Full facility address" /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Phone number</Label><Input placeholder="+234…" /></div><div className="space-y-2"><Label>Department / specialty</Label><Input placeholder="e.g. General Medicine" /></div></div><div className="space-y-2"><Label>Default participant instruction</Label><Textarea placeholder="Concise, non-diagnostic instruction shown in lookup" /></div><div className="space-y-2"><Label>Status</Label><Select defaultValue="Active"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent></Select></div></div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={add}><Plus /> Add hospital</Button></DialogFooter></DialogContent></Dialog>
    </PortalShell>
  );
}
