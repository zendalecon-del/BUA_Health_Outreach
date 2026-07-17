"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  HeartPulse,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
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
  { title: "Employment information", short: "Employment", icon: BriefcaseBusiness },
  { title: "Health information", short: "Health", icon: HeartPulse },
  { title: "Today’s screening", short: "Service", icon: Sparkles },
  { title: "Follow-up & communication", short: "Contact", icon: Mail },
  { title: "Consent & review", short: "Review", icon: ClipboardCheck },
];

const services = [
  { value: "Free Wellness Screening", title: "Free Wellness Screening", description: "Essential checks and a guided wellness review for every participant.", tag: "Recommended starting point" },
  { value: "Standard Package", title: "Learn about Standard Package", description: "Ask the healthcare team about additional screening options available on the day.", tag: "More screening options" },
  { value: "Comprehensive Package", title: "Learn about Comprehensive Package", description: "Explore a broader set of assessments after speaking with the healthcare team.", tag: "Broader assessment" },
  { value: "Doctor Consultation Only", title: "Doctor Consultation Only", description: "Register to speak with a clinician about a specific concern.", tag: "Focused conversation" },
];

const defaultData = {
  fullName: "",
  gender: "",
  age: "",
  phone: "",
  email: "",
  department: "",
  otherDepartment: "",
  conditions: [] as string[],
  otherCondition: "",
  medication: "",
  medicationDetails: "",
  smoking: "",
  alcohol: "",
  healthConcern: "",
  requestedService: "",
  medicalContact: "",
  wellnessInfo: "",
  consent: false,
};

type FormData = typeof defaultData;

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <Label>{label}{required && <span className="ml-1 text-[#c74b58]">*</span>}</Label>
        {hint && <span className="text-xs text-[#72868c]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ChoiceRow({ value, label, description }: { value: string; label: string; description?: string }) {
  return (
    <Label htmlFor={value} className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border border-[#d8e4e1] bg-white p-3.5 font-normal transition hover:border-[#aad2cb] has-[[data-state=checked]]:border-[var(--primary)] has-[[data-state=checked]]:bg-[#f0faf7] has-[[data-state=checked]]:shadow-[0_0_0_3px_rgba(22,141,133,.08)]">
      <RadioGroupItem value={value} id={value} className="mt-0.5" />
      <span>
        <span className="block text-sm font-semibold text-[#173945]">{label}</span>
        {description && <span className="mt-1 block text-xs leading-5 text-[#6a7f85]">{description}</span>}
      </span>
    </Label>
  );
}

function ReviewItem({ label, value, onEdit }: { label: string; value: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#e2ebe9] py-3.5 last:border-0">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73888e]">{label}</p>
        <div className="mt-1 text-sm font-semibold text-[#173945]">{value || <span className="font-normal text-[#8a9da2]">Not provided</span>}</div>
      </div>
      <button type="button" onClick={onEdit} className="rounded-lg px-2 py-1 text-xs font-bold text-[var(--primary)] hover:bg-[#edf7f5]">Edit</button>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(defaultData);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("bua-registration-draft");
    let restored: FormData | null = null;
    if (saved) {
      try { restored = { ...defaultData, ...JSON.parse(saved) }; } catch { /* ignore corrupt browser state */ }
    }
    const frame = requestAnimationFrame(() => {
      if (restored) setData(restored);
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem("bua-registration-draft", JSON.stringify(data));
  }, [data, hydrated]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setData((current) => ({ ...current, [key]: value }));

  const validationMessage = useMemo(() => {
    if (step === 0) {
      if (data.fullName.trim().length < 3) return "Please enter your full name.";
      if (!data.gender) return "Please select a gender option.";
      if (!data.age || Number(data.age) < 16 || Number(data.age) > 100) return "Please enter a valid age between 16 and 100.";
      if (data.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email address or leave the field blank.";
    }
    if (step === 1) {
      if (!data.department) return "Please select your department.";
      if (data.department === "Others" && data.otherDepartment.trim().length < 2) return "Please specify your department.";
    }
    if (step === 2) {
      if (!data.medication) return "Please tell us whether you are currently taking medication.";
      if (data.medication === "Yes" && data.medicationDetails.trim().length < 2) return "Please provide your medication details.";
      if (!data.smoking) return "Please select your smoking status.";
      if (!data.alcohol) return "Please select an alcohol consumption option.";
      if (data.conditions.includes("Others") && data.otherCondition.trim().length < 2) return "Please specify the other medical condition.";
    }
    if (step === 3 && !data.requestedService) return "Please select the service you are interested in.";
    if (step === 4) {
      if (!data.medicalContact) return "Please choose whether we may contact you for medical follow-up.";
      if (!data.wellnessInfo) return "Please choose whether you want future wellness information.";
    }
    if (step === 5 && !data.consent) return "You need to agree to the consent statement before submitting.";
    return "";
  }, [data, step]);

  const move = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }
    move(Math.min(step + 1, steps.length - 1));
  };

  const submit = async () => {
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Registration could not be completed.");
      const result = await response.json();
      sessionStorage.removeItem("bua-registration-draft");
      sessionStorage.setItem("bua-registration-result", JSON.stringify({ ...result, firstName: data.fullName.trim().split(" ")[0], email: data.email }));
      router.push("/registration-success");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const toggleCondition = (condition: string, checked: boolean) => {
    setData((current) => {
      if (condition === "None" && checked) return { ...current, conditions: ["None"], otherCondition: "" };
      const withoutNone = current.conditions.filter((item) => item !== "None");
      const conditions = checked ? [...withoutNone.filter((item) => item !== condition), condition] : current.conditions.filter((item) => item !== condition);
      return { ...current, conditions };
    });
  };

  const stepContent = [
    <div key="personal" className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Full name" required><Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. John Adewale" autoComplete="name" /></Field></div>
      <Field label="Gender" required>
        <RadioGroup value={data.gender} onValueChange={(value) => update("gender", value)} className="grid sm:grid-cols-3 sm:col-span-2">
          {["Male", "Female", "Prefer not to say"].map((option) => <ChoiceRow key={option} value={option} label={option} />)}
        </RadioGroup>
      </Field>
      <Field label="Age" required><Input type="number" inputMode="numeric" min="16" max="100" value={data.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 34" /></Field>
      <Field label="Phone number" required><Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="e.g. 0803 123 4567" autoComplete="tel" /></Field>
      <div className="sm:col-span-2"><Field label="Email address" hint="Optional"><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" autoComplete="email" /><p className="mt-2 text-xs leading-5 text-[#71868c]">You can register without an email address. Your identifiers will still appear after submission.</p></Field></div>
    </div>,

    <div key="employment" className="space-y-5">
      <Field label="Department" required>
        <Select value={data.department} onValueChange={(value) => { update("department", value); if (value !== "Others") update("otherDepartment", ""); }}>
          <SelectTrigger><SelectValue placeholder="Select your department" /></SelectTrigger>
          <SelectContent>{["Administration", "Finance", "Human Resources", "Procurement", "ICT", "Operations", "Others"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <AnimatePresence initial={false}>
        {data.department === "Others" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <Field label="Please specify your department" required><Input value={data.otherDepartment} onChange={(e) => update("otherDepartment", e.target.value)} placeholder="Enter department name" /></Field>
          </motion.div>
        )}
      </AnimatePresence>
      <Alert><CircleHelp className="absolute left-4 top-4 size-5 text-[var(--primary)]" /><AlertTitle className="pl-7">Why we ask</AlertTitle><AlertDescription className="pl-7">Department information helps the event team organise attendance and report overall outreach participation. It is not shown publicly.</AlertDescription></Alert>
    </div>,

    <div key="health" className="space-y-6">
      <Field label="Known medical conditions" hint="Select all that apply">
        <div className="grid gap-2 sm:grid-cols-2">
          {["Hypertension", "Diabetes", "Asthma", "Heart Disease", "Kidney Disease", "High Cholesterol", "None", "Others"].map((condition) => (
            <Label key={condition} htmlFor={`condition-${condition}`} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#d8e4e1] bg-white p-3.5 font-medium transition hover:border-[#aed1cb] has-[[data-state=checked]]:border-[var(--primary)] has-[[data-state=checked]]:bg-[#f0faf7]">
              <Checkbox id={`condition-${condition}`} checked={data.conditions.includes(condition)} onCheckedChange={(checked) => toggleCondition(condition, checked === true)} />{condition}
            </Label>
          ))}
        </div>
      </Field>
      {data.conditions.includes("Others") && <Field label="Please specify condition(s)" required><Input value={data.otherCondition} onChange={(e) => update("otherCondition", e.target.value)} placeholder="Enter condition" /></Field>}
      <Field label="Are you currently taking medication?" required>
        <RadioGroup value={data.medication} onValueChange={(value) => { update("medication", value); if (value === "No") update("medicationDetails", ""); }} className="grid sm:grid-cols-2"><ChoiceRow value="Yes" label="Yes" /><ChoiceRow value="No" label="No" /></RadioGroup>
      </Field>
      {data.medication === "Yes" && <Field label="Medication details" required><Textarea value={data.medicationDetails} onChange={(e) => update("medicationDetails", e.target.value)} placeholder="List medication names and any helpful details" /></Field>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Do you smoke?" required><RadioGroup value={data.smoking} onValueChange={(value) => update("smoking", value)}>{["Yes", "No", "Former smoker"].map((option) => <ChoiceRow key={option} value={option} label={option} />)}</RadioGroup></Field>
        <Field label="Do you consume alcohol?" required><RadioGroup value={data.alcohol} onValueChange={(value) => update("alcohol", value)}>{["Yes", "Occasionally", "No"].map((option) => <ChoiceRow key={option} value={option} label={option} />)}</RadioGroup></Field>
      </div>
      <Field label="Is there a health concern you want to discuss?" hint="Optional"><Textarea value={data.healthConcern} onChange={(e) => update("healthConcern", e.target.value)} placeholder="Share a brief concern for the healthcare team" maxLength={1000} /></Field>
    </div>,

    <div key="service" className="space-y-5">
      <RadioGroup value={data.requestedService} onValueChange={(value) => update("requestedService", value)} className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <Label key={service.value} htmlFor={`service-${service.value}`} className="group relative flex min-h-48 cursor-pointer flex-col rounded-2xl border border-[#d8e4e1] bg-white p-5 font-normal transition hover:-translate-y-0.5 hover:border-[#9bcac2] hover:shadow-lg has-[[data-state=checked]]:border-[var(--primary)] has-[[data-state=checked]]:bg-[#effaf7] has-[[data-state=checked]]:shadow-[0_0_0_4px_rgba(22,141,133,.1)]">
            <div className="flex items-start justify-between gap-3"><span className="rounded-full bg-[#edf4f3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5c747b] group-has-[[data-state=checked]]:bg-[#d6f0e9] group-has-[[data-state=checked]]:text-[#08615d]">{service.tag}</span><RadioGroupItem id={`service-${service.value}`} value={service.value} /></div>
            <span className="mt-5 block text-lg font-bold tracking-[-0.025em] text-[var(--navy)]">{service.title}</span>
            <span className="mt-2 block text-sm leading-6 text-[#687f85]">{service.description}</span>
          </Label>
        ))}
      </RadioGroup>
      <Alert className="border-[#ead7ad] bg-[#fff9ed] text-[#5f4c22]"><ShieldCheck className="absolute left-4 top-4 size-5 text-[#a5741b]" /><AlertTitle className="pl-7">No payment is taken in this form</AlertTitle><AlertDescription className="pl-7">The healthcare team will explain available packages and any approved charges before you decide or make a payment.</AlertDescription></Alert>
    </div>,

    <div key="contact" className="space-y-5">
      <Card className="border-[#d8e6e2] p-5 shadow-sm">
        <Field label="May we contact you if further medical attention is required?" required>
          <p className="mb-3 text-sm leading-6 text-[#6b8086]">This is permission to contact you. A healthcare professional decides whether a referral or follow-up is clinically required.</p>
          <RadioGroup value={data.medicalContact} onValueChange={(value) => update("medicalContact", value)} className="grid sm:grid-cols-2"><ChoiceRow value="Yes" label="Yes, you may contact me" /><ChoiceRow value="No" label="No, do not contact me" /></RadioGroup>
        </Field>
      </Card>
      <Card className="border-[#d8e6e2] p-5 shadow-sm">
        <Field label="Would you like to receive future programme and wellness information?" required>
          <p className="mb-3 text-sm leading-6 text-[#6b8086]">This preference is stored separately from medical follow-up permission. Choosing No will not affect today’s screening.</p>
          <RadioGroup value={data.wellnessInfo} onValueChange={(value) => update("wellnessInfo", value)} className="grid sm:grid-cols-2"><ChoiceRow value="Yes" label="Yes, keep me informed" /><ChoiceRow value="No" label="No, thank you" /></RadioGroup>
        </Field>
      </Card>
    </div>,

    <div key="review" className="space-y-5">
      <Alert><LockKeyhole className="absolute left-4 top-4 size-5 text-[var(--primary)]" /><AlertTitle className="pl-7">Consent and privacy</AlertTitle><AlertDescription className="pl-7">I understand that my information will be used for BUA Health Outreach registration, authorised screening administration and necessary follow-up, subject to approved privacy practices. This preliminary screening does not replace a comprehensive diagnosis or consultation.</AlertDescription></Alert>
      <Label htmlFor="consent" className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#cfe1dd] bg-white p-4 font-normal shadow-sm has-[[data-state=checked]]:border-[var(--primary)] has-[[data-state=checked]]:bg-[#f0faf7]">
        <Checkbox id="consent" checked={data.consent} onCheckedChange={(checked) => update("consent", checked === true)} className="mt-0.5" />
        <span><span className="block text-sm font-bold text-[#173945]">I agree to the consent statement</span><span className="mt-1 block text-xs leading-5 text-[#6d8187]">You must actively choose this option. It is never preselected.</span></span>
      </Label>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 shadow-sm"><h3 className="mb-2 text-sm font-bold text-[var(--navy)]">Personal & employment</h3><ReviewItem label="Full name" value={data.fullName} onEdit={() => move(0)} /><ReviewItem label="Gender / Age" value={`${data.gender || "—"} · ${data.age || "—"}`} onEdit={() => move(0)} /><ReviewItem label="Phone / Email" value={<>{data.phone || "—"}<br /><span className="font-normal text-[#6f8389]">{data.email || "No email provided"}</span></>} onEdit={() => move(0)} /><ReviewItem label="Department" value={data.department === "Others" ? data.otherDepartment : data.department} onEdit={() => move(1)} /></Card>
        <Card className="p-5 shadow-sm"><h3 className="mb-2 text-sm font-bold text-[var(--navy)]">Health & service</h3><ReviewItem label="Known conditions" value={data.conditions.length ? data.conditions.join(", ") : "None provided"} onEdit={() => move(2)} /><ReviewItem label="Medication" value={data.medication === "Yes" ? data.medicationDetails : data.medication} onEdit={() => move(2)} /><ReviewItem label="Requested service" value={data.requestedService} onEdit={() => move(3)} /><ReviewItem label="Contact preferences" value={`Medical follow-up: ${data.medicalContact || "—"} · Wellness: ${data.wellnessInfo || "—"}`} onEdit={() => move(4)} /></Card>
      </div>
    </div>,
  ];

  const CurrentIcon = steps[step].icon;
  return (
    <PublicShell narrow>
      <div className="pb-14 pt-3 sm:pt-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm" className="-ml-3"><Link href="/"><ArrowLeft /> Exit registration</Link></Button>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#667e84]"><ShieldCheck className="size-4 text-[var(--primary)]" /> Draft saved on this device</div>
        </div>
        <Card className="card-shadow overflow-hidden border-white bg-white/95">
          <div className="border-b border-[#dce8e5] bg-[#f8fbfa] px-5 py-5 sm:px-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)]">Step {step + 1} of {steps.length}</p>
                <p className="mt-1 text-sm font-semibold text-[#435f67]">{steps[step].title}</p>
              </div>
              <span className="text-sm font-bold text-[var(--navy)]">{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>
            <Progress value={((step + 1) / steps.length) * 100} />
            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const active = index === step;
                const complete = index < step;
                return (
                  <button key={item.short} type="button" onClick={() => index < step && move(index)} disabled={index > step} className={cn("flex min-w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition", active && "bg-[var(--navy)] text-white", complete && "bg-[#dff5ef] text-[#09625e] hover:bg-[#d0eee7]", index > step && "bg-[#edf2f1] text-[#98a7aa]")}>
                    <span className={cn("grid size-5 place-items-center rounded-full", active && "bg-white/15", complete && "bg-[var(--primary)] text-white")}>{complete ? <Check className="size-3" /> : <Icon className="size-3" />}</span>{item.short}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="mb-7 flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e4f5f1] text-[var(--primary)]"><CurrentIcon className="size-5" /></div>
              <div><h1 className="text-2xl font-bold tracking-[-0.035em] text-[var(--navy)]">{steps[step].title}</h1><p className="mt-1 text-sm leading-6 text-[#667e84]">{step === 5 ? "Check your answers carefully before submitting." : "Please provide the information below. Required fields are marked with an asterisk."}</p></div>
            </div>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div key={step} custom={direction} variants={{ enter: (d: number) => ({ opacity: 0, x: d * 24 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: d * -18 }) }} initial="enter" animate="center" exit="exit">
                {stepContent[step]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-[#dce8e5] bg-[#fbfdfc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Button variant="outline" disabled={step === 0 || submitting} onClick={() => move(step - 1)}><ArrowLeft /> Back</Button>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              {validationMessage && <p className="max-w-xs text-xs leading-5 text-[#9f4954] sm:text-right">{validationMessage}</p>}
              {step < steps.length - 1 ? <Button onClick={next}>Continue <ArrowRight /></Button> : <Button onClick={submit} disabled={submitting || !data.consent}>{submitting ? <><LoaderCircle className="animate-spin" /> Submitting securely…</> : <><CheckCircle2 /> Submit registration</>}</Button>}
            </div>
          </div>
        </Card>
      </div>
    </PublicShell>
  );
}
