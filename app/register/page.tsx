"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, ClipboardCheck, HeartPulse, LoaderCircle, LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/public-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Personal information", short: "Personal", icon: UserRound },
  { title: "Employment information", short: "Work", icon: BriefcaseBusiness },
  { title: "Health information", short: "Health", icon: HeartPulse },
  { title: "Today’s screening", short: "Service", icon: Sparkles },
  { title: "Follow-up and communication", short: "Contact", icon: Mail },
  { title: "Consent and review", short: "Review", icon: ClipboardCheck },
];

const services = [
  { value: "Free Wellness Screening", title: "Free Wellness Screening", body: "Essential checks and a guided wellness review for every participant.", tag: "Included" },
  { value: "Standard Package", title: "Learn about Standard Package", body: "Ask the healthcare team about additional screening options available on the day.", tag: "More checks" },
  { value: "Comprehensive Package", title: "Learn about Comprehensive Package", body: "Explore a broader assessment after speaking with the healthcare team.", tag: "Broader review" },
  { value: "Doctor Consultation Only", title: "Doctor Consultation Only", body: "Register to speak with a clinician about a specific concern.", tag: "Consultation" },
];

const emptyData = {
  submissionId: "",
  fullName: "", gender: "", age: "", phone: "", email: "", department: "", otherDepartment: "",
  conditions: [] as string[], otherCondition: "", medication: "", medicationDetails: "", smoking: "", alcohol: "", healthConcern: "",
  requestedService: "", medicalContact: "", wellnessInfo: "", consent: false,
};
type FormData = typeof emptyData;

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return <div className="space-y-2.5"><div className="flex items-baseline justify-between gap-4"><Label className="text-sm font-semibold text-[#2b3038]">{label}{required && <span className="ml-1 text-[var(--bua-red)]">*</span>}</Label>{hint && <span className="text-xs text-[#7b818a]">{hint}</span>}</div>{children}</div>;
}

function Choice({ value, label, description }: { value: string; label: string; description?: string }) {
  const id = `choice-${value.replace(/\s+/g, "-").toLowerCase()}`;
  return <Label htmlFor={id} className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border border-[#ded9cf] bg-white p-3.5 font-normal transition hover:border-[#aeb9c8] has-[[data-state=checked]]:border-[var(--zendale-blue)] has-[[data-state=checked]]:bg-[#f4f7fb] has-[[data-state=checked]]:shadow-[0_0_0_3px_rgba(34,95,157,.09)]"><RadioGroupItem value={value} id={id} className="mt-0.5" /><span><span className="block text-sm font-semibold text-[#252a31]">{label}</span>{description && <span className="mt-1 block text-xs leading-5 text-[#727982]">{description}</span>}</span></Label>;
}

function ReviewRow({ label, value, onEdit }: { label: string; value: React.ReactNode; onEdit: () => void }) {
  return <div className="flex items-start justify-between gap-4 border-b border-[#ece8e0] py-3.5 last:border-0"><div><p className="text-[10px] font-black uppercase tracking-[.12em] text-[#858b94]">{label}</p><div className="mt-1 text-sm font-semibold leading-6 text-[#272c33]">{value || "Not provided"}</div></div><button type="button" onClick={onEdit} className="rounded-lg px-2 py-1 text-xs font-bold text-[var(--bua-red)] hover:bg-[#fff1f3]">Edit</button></div>;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(emptyData);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("bua-registration-draft");
      if (saved) {
        const restored = { ...emptyData, ...JSON.parse(saved) };
        setData({ ...restored, submissionId: restored.submissionId || crypto.randomUUID() });
      } else {
        setData((current) => ({ ...current, submissionId: crypto.randomUUID() }));
      }
    } catch { setData((current) => ({ ...current, submissionId: crypto.randomUUID() })); }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) sessionStorage.setItem("bua-registration-draft", JSON.stringify(data)); }, [data, hydrated]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setData((current) => ({ ...current, [key]: value }));
  const error = useMemo(() => {
    if (step === 0) {
      if (data.fullName.trim().length < 3) return "Enter your full name.";
      if (!data.gender) return "Select a gender option.";
      if (!data.age || Number(data.age) < 16 || Number(data.age) > 100) return "Enter a valid age between 16 and 100.";
      if (data.phone.replace(/\D/g, "").length < 10) return "Enter a valid phone number.";
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return "Enter a valid email or leave it blank.";
    }
    if (step === 1) {
      if (!data.department) return "Select your department.";
      if (data.department === "Others" && data.otherDepartment.trim().length < 2) return "Specify your department.";
    }
    if (step === 2) {
      if (data.conditions.includes("Others") && data.otherCondition.trim().length < 2) return "Specify the other condition.";
      if (!data.medication) return "Choose whether you currently take medication.";
      if (data.medication === "Yes" && data.medicationDetails.trim().length < 2) return "Provide medication details.";
      if (!data.smoking || !data.alcohol) return "Complete the smoking and alcohol questions.";
    }
    if (step === 3 && !data.requestedService) return "Select a service.";
    if (step === 4 && (!data.medicalContact || !data.wellnessInfo)) return "Answer both communication questions.";
    if (step === 5 && !data.consent) return "You must actively agree before submitting.";
    return "";
  }, [data, step]);

  const move = (next: number) => { setDirection(next > step ? 1 : -1); setStep(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const continueForm = () => { if (error) return toast.error(error); move(Math.min(step + 1, 5)); };
  const toggleCondition = (condition: string, checked: boolean) => {
    setData((current) => {
      if (condition === "None" && checked) return { ...current, conditions: ["None"], otherCondition: "" };
      const filtered = current.conditions.filter((item) => item !== "None" && item !== condition);
      return { ...current, conditions: checked ? [...filtered, condition] : current.conditions.filter((item) => item !== condition) };
    });
  };

  const submit = async () => {
    if (error) return toast.error(error);
    setSubmitting(true);
    try {
      const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration could not be completed.");
      sessionStorage.removeItem("bua-registration-draft");
      sessionStorage.setItem("bua-registration-result", JSON.stringify({ ...result, firstName: data.fullName.trim().split(/\s+/)[0], email: data.email }));
      router.push("/registration-success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration could not be completed.");
      setSubmitting(false);
    }
  };

  const content = [
    <div key="personal" className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Full name" required><Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. John Adewale" autoComplete="name" /></Field></div>
      <div className="sm:col-span-2"><Field label="Gender" required><RadioGroup value={data.gender} onValueChange={(value) => update("gender", value)} className="grid sm:grid-cols-3">{["Male","Female","Prefer not to say"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field></div>
      <Field label="Age" required><Input type="number" min="16" max="100" value={data.age} onChange={(e) => update("age", e.target.value)} inputMode="numeric" /></Field>
      <Field label="Phone number" required><Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0801 234 5678" autoComplete="tel" /></Field>
      <div className="sm:col-span-2"><Field label="Email address" hint="Optional"><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" autoComplete="email" /></Field></div>
    </div>,
    <div key="work" className="space-y-6">
      <Field label="Department" required><Select value={data.department} onValueChange={(value) => { update("department", value); if (value !== "Others") update("otherDepartment", ""); }}><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent>{["Administration","Finance","Human Resources","Procurement","ICT","Operations","Others"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></Field>
      <AnimatePresence>{data.department === "Others" && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Field label="Please specify your department" required><Input value={data.otherDepartment} onChange={(e) => update("otherDepartment", e.target.value)} /></Field></motion.div>}</AnimatePresence>
      <Alert><ShieldCheck className="absolute left-4 top-4 size-5 text-[var(--zendale-blue)]" /><AlertTitle className="pl-7">Why we ask</AlertTitle><AlertDescription className="pl-7">Department information helps the event team organise attendance and report overall participation. It is not shown publicly.</AlertDescription></Alert>
    </div>,
    <div key="health" className="space-y-6">
      <Field label="Known medical conditions" hint="Select all that apply"><div className="grid gap-2 sm:grid-cols-2">{["Hypertension","Diabetes","Asthma","Heart Disease","Kidney Disease","High Cholesterol","None","Others"].map((condition) => <Label key={condition} htmlFor={`condition-${condition}`} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#ded9cf] bg-white p-3.5 font-medium transition hover:border-[#b8c1ce] has-[[data-state=checked]]:border-[var(--zendale-blue)] has-[[data-state=checked]]:bg-[#f4f7fb]"><Checkbox id={`condition-${condition}`} checked={data.conditions.includes(condition)} onCheckedChange={(checked) => toggleCondition(condition, checked === true)} />{condition}</Label>)}</div></Field>
      {data.conditions.includes("Others") && <Field label="Please specify condition(s)" required><Input value={data.otherCondition} onChange={(e) => update("otherCondition", e.target.value)} /></Field>}
      <Field label="Are you currently taking medication?" required><RadioGroup value={data.medication} onValueChange={(value) => { update("medication", value); if (value === "No") update("medicationDetails", ""); }} className="grid sm:grid-cols-2"><Choice value="Yes" label="Yes" /><Choice value="No" label="No" /></RadioGroup></Field>
      {data.medication === "Yes" && <Field label="Medication details" required><Textarea value={data.medicationDetails} onChange={(e) => update("medicationDetails", e.target.value)} placeholder="List medication names and any helpful details" /></Field>}
      <div className="grid gap-5 sm:grid-cols-2"><Field label="Do you smoke?" required><RadioGroup value={data.smoking} onValueChange={(value) => update("smoking", value)}>{["Yes","No","Former smoker"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field><Field label="Do you consume alcohol?" required><RadioGroup value={data.alcohol} onValueChange={(value) => update("alcohol", value)}>{["Yes","Occasionally","No"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field></div>
      <Field label="Is there a health concern you want to discuss?" hint="Optional"><Textarea value={data.healthConcern} onChange={(e) => update("healthConcern", e.target.value)} maxLength={1200} placeholder="Share a brief concern for the healthcare team" /></Field>
    </div>,
    <div key="service" className="space-y-5"><RadioGroup value={data.requestedService} onValueChange={(value) => update("requestedService", value)} className="grid gap-3 sm:grid-cols-2">{services.map((service) => { const id = `service-${service.value.replace(/\s+/g,"-")}`; return <Label key={service.value} htmlFor={id} className="group relative flex min-h-48 cursor-pointer flex-col rounded-2xl border border-[#ded9cf] bg-white p-5 font-normal transition hover:-translate-y-0.5 hover:border-[#aeb9c8] hover:shadow-lg has-[[data-state=checked]]:border-[var(--bua-red)] has-[[data-state=checked]]:bg-[#fff8f8] has-[[data-state=checked]]:shadow-[0_0_0_4px_rgba(180,22,43,.08)]"><div className="flex items-start justify-between gap-3"><span className="rounded-full bg-[#efede8] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] text-[#68707b] group-has-[[data-state=checked]]:bg-[#fce7ea] group-has-[[data-state=checked]]:text-[#9f1528]">{service.tag}</span><RadioGroupItem id={id} value={service.value} /></div><span className="mt-5 block text-lg font-bold tracking-[-.025em] text-[#20252c]">{service.title}</span><span className="mt-2 block text-sm leading-6 text-[#6e7580]">{service.body}</span></Label>; })}</RadioGroup><Alert className="border-[#ead9a0] bg-[#fff9e9] text-[#654d10]"><AlertTitle>No payment is taken in this form</AlertTitle><AlertDescription>The healthcare team will describe available packages and any approved charge before you decide or pay.</AlertDescription></Alert></div>,
    <div key="contact" className="space-y-5"><Card className="p-5 shadow-sm"><Field label="May we contact you if further medical attention is required?" required><p className="mb-3 text-sm leading-6 text-[#727983]">This is contact permission. A healthcare professional decides whether a referral or follow-up is required.</p><RadioGroup value={data.medicalContact} onValueChange={(value) => update("medicalContact", value)} className="grid sm:grid-cols-2"><Choice value="Yes" label="Yes, you may contact me" /><Choice value="No" label="No, do not contact me" /></RadioGroup></Field></Card><Card className="p-5 shadow-sm"><Field label="Receive future programme and wellness information?" required><p className="mb-3 text-sm leading-6 text-[#727983]">This preference is stored separately. Choosing No will not affect today’s screening.</p><RadioGroup value={data.wellnessInfo} onValueChange={(value) => update("wellnessInfo", value)} className="grid sm:grid-cols-2"><Choice value="Yes" label="Yes, keep me informed" /><Choice value="No" label="No, thank you" /></RadioGroup></Field></Card></div>,
    <div key="review" className="space-y-5"><Alert><LockKeyhole className="absolute left-4 top-4 size-5 text-[var(--zendale-blue)]" /><AlertTitle className="pl-7">Consent and privacy</AlertTitle><AlertDescription className="pl-7">I understand that my information will be used for BUA Health Outreach registration, authorised screening administration and necessary follow-up, subject to approved privacy practices. This preliminary screening does not replace a comprehensive diagnosis or consultation.</AlertDescription></Alert><Label htmlFor="consent" className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d9d3c9] bg-white p-4 font-normal shadow-sm has-[[data-state=checked]]:border-[var(--bua-red)] has-[[data-state=checked]]:bg-[#fff8f8]"><Checkbox id="consent" checked={data.consent} onCheckedChange={(checked) => update("consent", checked === true)} className="mt-0.5" /><span><span className="block text-sm font-bold text-[#242930]">I agree to the consent statement</span><span className="mt-1 block text-xs leading-5 text-[#747b84]">This option is never preselected.</span></span></Label><div className="grid gap-4 lg:grid-cols-2"><Card className="p-5 shadow-sm"><h3 className="mb-2 text-sm font-bold text-[#20252c]">Personal and employment</h3><ReviewRow label="Full name" value={data.fullName} onEdit={() => move(0)} /><ReviewRow label="Gender / Age" value={`${data.gender || "—"} · ${data.age || "—"}`} onEdit={() => move(0)} /><ReviewRow label="Phone / Email" value={<>{data.phone || "—"}<br/><span className="font-normal text-[#7c828b]">{data.email || "No email provided"}</span></>} onEdit={() => move(0)} /><ReviewRow label="Department" value={data.department === "Others" ? data.otherDepartment : data.department} onEdit={() => move(1)} /></Card><Card className="p-5 shadow-sm"><h3 className="mb-2 text-sm font-bold text-[#20252c]">Health and service</h3><ReviewRow label="Known conditions" value={data.conditions.length ? data.conditions.join(", ") : "None selected"} onEdit={() => move(2)} /><ReviewRow label="Medication" value={data.medication === "Yes" ? data.medicationDetails : data.medication} onEdit={() => move(2)} /><ReviewRow label="Requested service" value={data.requestedService} onEdit={() => move(3)} /><ReviewRow label="Contact preferences" value={`Medical: ${data.medicalContact || "—"} · Wellness: ${data.wellnessInfo || "—"}`} onEdit={() => move(4)} /></Card></div></div>,
  ];

  const CurrentIcon = steps[step].icon;
  return <PublicShell narrow><div className="pb-14 pt-3 sm:pt-7"><div className="mb-5 flex items-center justify-between gap-4"><Button asChild variant="ghost" size="sm" className="-ml-3"><Link href="/"><ArrowLeft /> Exit registration</Link></Button><div className="inline-flex items-center gap-2 text-xs font-semibold text-[#747b84]"><ShieldCheck className="size-4 text-[var(--zendale-blue)]" /> Draft saved on this device</div></div><Card className="card-shadow overflow-hidden border-[#ddd7cd] bg-white"><div className="border-b border-[#e6e1d8] bg-[#fbfaf7] px-5 py-5 sm:px-8"><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.12em] text-[var(--bua-red)]">Step {step + 1} of {steps.length}</p><p className="mt-1 text-sm font-semibold text-[#4e5560]">{steps[step].title}</p></div><span className="text-sm font-bold text-[#20252c]">{Math.round(((step + 1) / steps.length) * 100)}%</span></div><Progress value={((step + 1) / steps.length) * 100} /><div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">{steps.map((item,index) => { const Icon=item.icon; const active=index===step; const done=index<step; return <button key={item.title} type="button" onClick={() => index < step && move(index)} disabled={index > step} className={cn("flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition", active && "bg-[#17243a] text-white", done && "bg-[#eef3f8] text-[#225f9d]", index > step && "text-[#a0a4aa]")}><span className={cn("grid size-6 place-items-center rounded-lg", active ? "bg-white/12" : done ? "bg-white" : "bg-[#efede8]")}>{done ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}</span>{item.short}</button>; })}</div></div><div className="grid lg:grid-cols-[240px_1fr]"><aside className="hidden border-r border-[#e5e0d7] bg-[#f9f7f2] p-7 lg:block"><div className="grid size-12 place-items-center rounded-2xl bg-[#17243a] text-white"><CurrentIcon className="size-5" /></div><h1 className="mt-5 text-xl font-black tracking-[-.035em] text-[#1e232a]">{steps[step].title}</h1><p className="mt-2 text-sm leading-6 text-[#737a84]">Complete this section carefully. Required questions are marked with an asterisk.</p><div className="mt-8 rounded-2xl border border-[#e1d8c7] bg-[#fff9e9] p-4 text-xs leading-5 text-[#6b571f]"><strong className="block text-[#57450f]">Your privacy matters</strong>Health information is restricted to authorised outreach personnel.</div></aside><div className="p-5 sm:p-8"><AnimatePresence mode="wait" custom={direction}><motion.div key={step} custom={direction} initial={{ opacity: 0, x: direction * 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -18 }} transition={{ duration: .22 }}>{content[step]}</motion.div></AnimatePresence>{error && <p className="mt-5 rounded-xl bg-[#fff1f3] px-4 py-3 text-sm font-semibold text-[#9d1729]">{error}</p>}<div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-[#ece8df] pt-6 sm:flex-row"><Button type="button" variant="outline" onClick={() => move(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft /> Back</Button>{step < 5 ? <Button type="button" onClick={continueForm}>Continue <ArrowRight /></Button> : <Button type="button" onClick={submit} disabled={submitting}>{submitting ? <><LoaderCircle className="animate-spin" /> Submitting securely…</> : <>Submit registration <ArrowRight /></>}</Button>}</div></div></div></Card></div></PublicShell>;
}
