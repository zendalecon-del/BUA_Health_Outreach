"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  DoorOpen,
  Hospital,
  LoaderCircle,
  Save,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { PortalShell } from "@/components/portal-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { hospitals, participants } from "@/lib/mock-data";

const screeningSteps = [
  { title: "Measurements", description: "Package delivered and objective screening measurements.", icon: Activity },
  { title: "Clinical review", description: "Record the consultation and clinical decisions.", icon: Stethoscope },
  { title: "Referral & follow-up", description: "Complete only the sections triggered by the clinical review.", icon: Hospital },
  { title: "Review & complete", description: "Confirm every value before formally completing the screening.", icon: ClipboardCheck },
];

const initial = {
  package: "Comprehensive Package",
  systolic: "124",
  diastolic: "81",
  bloodSugar: "5.8",
  date: "2026-07-17",
  doctorSeen: "Yes",
  clinicalNote: "Participant reports occasional headaches after long work shifts. No acute distress observed.",
  referralRequired: "Yes",
  followUpRequired: "Yes",
  hospital: "Zendale Medical Centre",
  referralReason: "Review of blood pressure history and medication response.",
  referralInstruction: "Please contact the selected facility within seven days for a medical review.",
  urgency: "Within 7 days",
  participantInformed: "Yes",
  followUpReason: "Repeat blood-pressure measurement after rest and medication review.",
  followUpDate: "2026-07-24",
  followUpInstruction: "Return for a repeat blood-pressure check and bring current medication details.",
};

type ScreeningData = typeof initial;

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return <div className="space-y-2.5"><div className="flex items-baseline justify-between gap-3"><Label>{label}{required && <span className="ml-1 text-[#c64b58]">*</span>}</Label>{hint && <span className="text-xs text-[#72868c]">{hint}</span>}</div>{children}</div>;
}

function BinaryChoice({ value, onChange, name }: { value: string; onChange: (value: string) => void; name: string }) {
  return <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-2">{["Yes", "No"].map((option) => <Label key={option} htmlFor={`${name}-${option}`} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d7e4e1] bg-white p-3.5 font-semibold transition hover:border-[#acd0ca] has-[[data-state=checked]]:border-[var(--primary)] has-[[data-state=checked]]:bg-[#eff9f6] has-[[data-state=checked]]:text-[var(--primary)]"><RadioGroupItem id={`${name}-${option}`} value={option} />{option}</Label>)}</RadioGroup>;
}

function SummaryRow({ label, value, privateNote = false }: { label: string; value: React.ReactNode; privateNote?: boolean }) {
  return <div className="grid gap-1 border-b border-[#e2ebe9] py-3 last:border-0 sm:grid-cols-[170px_1fr]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#71868c]">{label}{privateNote && <Badge variant="secondary" className="ml-2 align-middle">Internal</Badge>}</p><div className="text-sm font-semibold leading-6 text-[#2a4851]">{value || "—"}</div></div>;
}

export function ScreeningForm({ mode, id }: { mode: "staff" | "admin"; id: string }) {
  const router = useRouter();
  const participant = participants.find((item) => item.id === id) ?? participants[0];
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ScreeningData>(initial);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [completing, setCompleting] = useState(false);

  const update = <K extends keyof ScreeningData>(key: K, value: ScreeningData[K]) => setData((current) => ({ ...current, [key]: value }));
  const progress = ((step + 1) / screeningSteps.length) * 100;
  const current = screeningSteps[step];

  const validation = useMemo(() => {
    if (step === 0 && (!data.package || !data.systolic || !data.diastolic || !data.bloodSugar || !data.date)) return "Complete all required measurement fields.";
    if (step === 1 && (!data.doctorSeen || !data.referralRequired || !data.followUpRequired)) return "Complete all clinical decision fields.";
    if (step === 2 && data.referralRequired === "Yes" && (!data.hospital || !data.referralReason || !data.referralInstruction || !data.urgency || !data.participantInformed)) return "Complete all required referral fields.";
    if (step === 2 && data.followUpRequired === "Yes" && (!data.followUpReason || !data.followUpDate || !data.followUpInstruction)) return "Complete all required follow-up fields.";
    return "";
  }, [data, step]);

  const save = async (exit = false) => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    toast.success(exit ? "Screening saved. You can resume later." : "Screening draft saved.");
    if (exit) router.push(`/${mode}/participants/${participant.id}`);
  };

  const next = () => {
    if (validation) { toast.error(validation); return; }
    setStep((value) => Math.min(value + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const complete = async () => {
    setCompleting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Screening completed and locked for ordinary editing.");
    router.push(`/${mode}/participants/${participant.id}`);
  };

  const content = [
    <div key="measurements" className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Registration number"><Input value={participant.reg} disabled /></Field></div>
      <div className="sm:col-span-2"><Field label="Screening package delivered" required><Select value={data.package} onValueChange={(value) => update("package", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Free Wellness Screening", "Standard Package", "Comprehensive Package", "Doctor Consultation Only"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></Field></div>
      <Field label="Blood pressure" required hint="mmHg"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><Input type="number" value={data.systolic} onChange={(event) => update("systolic", event.target.value)} placeholder="Systolic" /><span className="font-bold text-[#71868c]">/</span><Input type="number" value={data.diastolic} onChange={(event) => update("diastolic", event.target.value)} placeholder="Diastolic" /></div><p className="text-xs text-[#72868c]">Displayed as {data.systolic || "—"} / {data.diastolic || "—"} mmHg</p></Field>
      <Field label="Random blood sugar" required hint="mmol/L"><div className="relative"><Input type="number" step="0.1" value={data.bloodSugar} onChange={(event) => update("bloodSugar", event.target.value)} className="pr-20" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#71868c]">mmol/L</span></div></Field>
      <Field label="Screening date" required><Input type="date" value={data.date} onChange={(event) => update("date", event.target.value)} /></Field>
      <Field label="Staff identity"><Input value="Kemi Lawal · BUA-STF-002" disabled /></Field>
      <div className="sm:col-span-2"><Alert><ShieldCheck className="absolute left-4 top-4 size-5 text-[var(--primary)]" /><AlertTitle className="pl-7">Measurement validation supports, but does not diagnose</AlertTitle><AlertDescription className="pl-7">The system may flag implausible entry ranges to catch typing errors. It must not make a clinical diagnosis.</AlertDescription></Alert></div>
    </div>,

    <div key="clinical" className="space-y-6">
      <Card className="border-[#d8e6e2] p-5 shadow-sm"><Field label="Was the participant seen by a doctor?" required><BinaryChoice name="doctor-seen" value={data.doctorSeen} onChange={(value) => update("doctorSeen", value)} /></Field></Card>
      <Field label="Clinical observation / internal note" hint="Not visible to participant"><Textarea value={data.clinicalNote} onChange={(event) => update("clinicalNote", event.target.value)} placeholder="Record concise, factual internal observations" className="min-h-36" /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="border-[#d8e6e2] p-5 shadow-sm"><Field label="Referral required?" required><p className="mb-3 text-xs leading-5 text-[#71868c]">Selecting Yes reveals referral details on the next step.</p><BinaryChoice name="referral-required" value={data.referralRequired} onChange={(value) => update("referralRequired", value)} /></Field></Card>
        <Card className="border-[#d8e6e2] p-5 shadow-sm"><Field label="Follow-up required?" required><p className="mb-3 text-xs leading-5 text-[#71868c]">Selecting Yes reveals a calendar date and instruction fields.</p><BinaryChoice name="follow-up-required" value={data.followUpRequired} onChange={(value) => update("followUpRequired", value)} /></Field></Card>
      </div>
    </div>,

    <div key="referral" className="space-y-6">
      {data.referralRequired === "Yes" ? <Card className="overflow-hidden border-[#e3d5b8] shadow-sm"><div className="flex items-center gap-3 border-b border-[#eadfc8] bg-[#fffaf0] p-5"><div className="grid size-10 place-items-center rounded-xl bg-[#faeacb] text-[#966619]"><Hospital className="size-5" /></div><div><h3 className="font-bold text-[var(--navy)]">Referral details</h3><p className="mt-1 text-xs text-[#746d5d]">Required because Referral Required = Yes</p></div></div><div className="grid gap-5 p-5 sm:p-6"><Field label="Referral hospital" required><Select value={data.hospital} onValueChange={(value) => update("hospital", value)}><SelectTrigger><SelectValue placeholder="Select active referral hospital" /></SelectTrigger><SelectContent>{hospitals.filter((item) => item.status === "Active").map((item) => <SelectItem key={item.id} value={item.name}>{item.name} · {item.specialty}</SelectItem>)}</SelectContent></Select></Field><Field label="Referral reason" required><Textarea value={data.referralReason} onChange={(event) => update("referralReason", event.target.value)} /></Field><Field label="Participant-facing instruction" required><Textarea value={data.referralInstruction} onChange={(event) => update("referralInstruction", event.target.value)} /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Urgency" required><Select value={data.urgency} onValueChange={(value) => update("urgency", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Routine", "Within 7 days", "Urgent"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></Field><Field label="Participant informed?" required><BinaryChoice name="participant-informed" value={data.participantInformed} onChange={(value) => update("participantInformed", value)} /></Field></div></div></Card> : <Alert><AlertTitle>No referral required</AlertTitle><AlertDescription>The referral section is hidden because the clinical decision is No.</AlertDescription></Alert>}
      {data.followUpRequired === "Yes" ? <Card className="overflow-hidden border-[#d6e6e2] shadow-sm"><div className="flex items-center gap-3 border-b border-[#dfeae8] bg-[#f6fbf9] p-5"><div className="grid size-10 place-items-center rounded-xl bg-[#e2f3ef] text-[var(--primary)]"><CalendarDays className="size-5" /></div><div><h3 className="font-bold text-[var(--navy)]">Follow-up details</h3><p className="mt-1 text-xs text-[#71868c]">Required because Follow-up Required = Yes</p></div></div><div className="grid gap-5 p-5 sm:p-6"><Field label="Follow-up reason" required><Textarea value={data.followUpReason} onChange={(event) => update("followUpReason", event.target.value)} /></Field><Field label="Suggested follow-up date" required><Input type="date" value={data.followUpDate} onChange={(event) => update("followUpDate", event.target.value)} /></Field><Field label="Participant-facing follow-up instruction" required><Textarea value={data.followUpInstruction} onChange={(event) => update("followUpInstruction", event.target.value)} /></Field></div></Card> : <Alert><AlertTitle>No follow-up required</AlertTitle><AlertDescription>The follow-up section is hidden because the clinical decision is No.</AlertDescription></Alert>}
    </div>,

    <div key="review" className="space-y-5">
      <Alert className="border-[#e1d7bb] bg-[#fffaf0] text-[#5f5437]"><ShieldCheck className="absolute left-4 top-4 size-5 text-[#9b701f]" /><AlertTitle className="pl-7">Completion is a formal action</AlertTitle><AlertDescription className="pl-7">After completion, the record becomes read-only. Future corrections must use the explicit Edit Screening workflow and will change the status to Updated.</AlertDescription></Alert>
      <Card className="p-5 shadow-sm"><div className="mb-2 flex items-center justify-between"><h3 className="font-bold text-[var(--navy)]">Measurements</h3><Button variant="ghost" size="sm" onClick={() => setStep(0)}>Edit</Button></div><SummaryRow label="Package delivered" value={data.package} /><SummaryRow label="Blood pressure" value={`${data.systolic} / ${data.diastolic} mmHg`} /><SummaryRow label="Random blood sugar" value={`${data.bloodSugar} mmol/L`} /><SummaryRow label="Screening date" value={data.date} /></Card>
      <Card className="p-5 shadow-sm"><div className="mb-2 flex items-center justify-between"><h3 className="font-bold text-[var(--navy)]">Clinical review</h3><Button variant="ghost" size="sm" onClick={() => setStep(1)}>Edit</Button></div><SummaryRow label="Doctor seen" value={data.doctorSeen} /><SummaryRow label="Clinical note" value={data.clinicalNote} privateNote /><SummaryRow label="Referral required" value={data.referralRequired} /><SummaryRow label="Follow-up required" value={data.followUpRequired} /></Card>
      {(data.referralRequired === "Yes" || data.followUpRequired === "Yes") && <Card className="p-5 shadow-sm"><div className="mb-2 flex items-center justify-between"><h3 className="font-bold text-[var(--navy)]">Referral & follow-up</h3><Button variant="ghost" size="sm" onClick={() => setStep(2)}>Edit</Button></div>{data.referralRequired === "Yes" && <><SummaryRow label="Hospital" value={data.hospital} /><SummaryRow label="Urgency" value={data.urgency} /><SummaryRow label="Referral instruction" value={data.referralInstruction} /></>}{data.followUpRequired === "Yes" && <><SummaryRow label="Follow-up date" value={data.followUpDate} /><SummaryRow label="Instruction" value={data.followUpInstruction} /></>}</Card>}
    </div>,
  ];

  return (
    <PortalShell mode={mode} title={`${participant.name} · Screening`} description={`${participant.reg} · Draft saves do not complete the screening.`} action={<Button variant="outline" onClick={() => save(true)} disabled={saving}><DoorOpen /> Save & exit</Button>}>
      <div className="grid gap-6 xl:grid-cols-[250px_1fr]">
        <Card className="h-fit border-white p-3 shadow-sm xl:sticky xl:top-28">
          <div className="p-3"><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#71868c]">Screening progress</p><div className="mt-3 flex items-center justify-between"><span className="text-2xl font-black text-[var(--navy)]">{Math.round(progress)}%</span><Badge variant="warning">In progress</Badge></div><Progress className="mt-3" value={progress} /></div>
          <nav className="mt-2 space-y-1">
            {screeningSteps.map((item, index) => { const Icon = item.icon; const active = index === step; const complete = index < step; return <button key={item.title} type="button" disabled={index > step} onClick={() => index <= step && setStep(index)} className={cn("flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold transition", active && "bg-[var(--navy)] text-white", complete && "text-[#23645f] hover:bg-[#edf7f5]", index > step && "cursor-not-allowed text-[#9aa9ad]")}><span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", active ? "bg-white/12" : complete ? "bg-[#dff5ef]" : "bg-[#edf2f1]")}>{complete ? <Check className="size-4" /> : <Icon className="size-4" />}</span><span>{item.title}</span></button>; })}
          </nav>
          <div className="mt-3 rounded-xl bg-[#f1f7f5] p-3 text-xs leading-5 text-[#647b81]"><Save className="mb-2 size-4 text-[var(--primary)]" />Use Save draft at any time. Completion is available only on the final step.</div>
        </Card>

        <Card className="overflow-hidden border-white shadow-sm">
          <div className="border-b border-[#e0e9e7] bg-[#fbfdfc] p-5 sm:p-6"><div className="flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e5f5f1] text-[var(--primary)]"><current.icon /></div><div><p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--primary)]">Step {step + 1} of 4</p><h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[var(--navy)]">{current.title}</h2><p className="mt-1 text-sm leading-6 text-[#6c8187]">{current.description}</p></div></div></div>
          <div className="p-5 sm:p-7"><AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>{content[step]}</motion.div></AnimatePresence></div>
          <div className="flex flex-col-reverse gap-3 border-t border-[#e0e9e7] bg-[#fbfdfc] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <Button variant="outline" disabled={step === 0 || saving || completing} onClick={() => setStep((value) => value - 1)}><ArrowLeft /> Back</Button>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center"><Button variant="ghost" onClick={() => save(false)} disabled={saving || completing}>{saving ? <LoaderCircle className="animate-spin" /> : <Save />} Save draft</Button>{step < 3 ? <Button onClick={next}>Save & continue <ArrowRight /></Button> : <Button onClick={() => setCompleteOpen(true)}><CheckCircle2 /> Complete screening</Button>}</div>
          </div>
        </Card>
      </div>

      <Dialog open={completeOpen} onOpenChange={setCompleteOpen}>
        <DialogContent>
          <DialogHeader><div className="mb-2 grid size-12 place-items-center rounded-2xl bg-[#e4f5f1] text-[var(--primary)]"><CheckCircle2 className="size-6" /></div><DialogTitle>Complete this screening?</DialogTitle><DialogDescription>All required information will be formally submitted. The screening will become read-only and the referral/follow-up queue will update automatically.</DialogDescription></DialogHeader>
          <div className="rounded-xl border border-[#e2d8bd] bg-[#fffaf0] p-3 text-xs leading-5 text-[#6b5c3a]">Corrections after completion must use Edit Screening and will preserve the original completion date and staff identity.</div>
          <DialogFooter><Button variant="outline" onClick={() => setCompleteOpen(false)} disabled={completing}>Review again</Button><Button onClick={complete} disabled={completing}>{completing ? <><LoaderCircle className="animate-spin" /> Completing…</> : <><CheckCircle2 /> Confirm completion</>}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
