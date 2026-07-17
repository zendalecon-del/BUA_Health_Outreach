"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  Clock3,
  HeartPulse,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { BuaMark, PoweredBy } from "@/components/brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Personal information", short: "Personal", eyebrow: "Tell us who you are", icon: UserRound },
  { title: "Employment information", short: "Employment", eyebrow: "Your place within BUA", icon: BriefcaseBusiness },
  { title: "Health information", short: "Health", eyebrow: "Your health background", icon: HeartPulse },
  { title: "Today’s screening", short: "Service", eyebrow: "Choose today’s service", icon: Sparkles },
  { title: "Follow-up and communication", short: "Contact", eyebrow: "Your contact preferences", icon: Mail },
  { title: "Consent and review", short: "Review", eyebrow: "Check and submit", icon: ClipboardCheck },
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
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <Label className="text-[13px] font-black tracking-[-.01em] text-[#27313b]">
          {label}{required && <span className="ml-1 text-[var(--bua-red)]">*</span>}
        </Label>
        {hint && <span className="text-[11px] font-semibold text-[#828993]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Choice({ value, label, description }: { value: string; label: string; description?: string }) {
  const id = `choice-${value.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <Label
      htmlFor={id}
      className="group flex min-h-14 cursor-pointer items-start justify-between gap-4 rounded-[13px] border border-[#d8d4cc] bg-white px-4 py-3.5 font-normal transition hover:border-[#8e9baa] has-[[data-state=checked]]:border-[#2a67a5] has-[[data-state=checked]]:bg-[#f3f7fb] has-[[data-state=checked]]:shadow-[inset_3px_0_0_#2a67a5]"
    >
      <span>
        <span className="block text-sm font-bold text-[#222d38]">{label}</span>
        {description && <span className="mt-1 block text-xs leading-5 text-[#6d7781]">{description}</span>}
      </span>
      <RadioGroupItem value={value} id={id} className="mt-0.5 shrink-0" />
    </Label>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="grid gap-3 border-b border-[#e5e1d9] py-4 last:border-0 sm:grid-cols-[150px_1fr_auto] sm:items-start">
      <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#8a9098]">{label}</p>
      <div className="text-sm font-bold leading-6 text-[#26313b]">{value || "Not provided"}</div>
      <button type="button" onClick={onEdit} className="w-fit text-xs font-black text-[var(--bua-red)] hover:underline">Edit</button>
    </div>
  );
}

function SectionNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#2a67a5] bg-[#edf3f9] px-4 py-3.5 text-sm leading-6 text-[#506171]">
      <strong className="mr-1 text-[#173f70]">{title}</strong>{children}
    </div>
  );
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
    } catch {
      setData((current) => ({ ...current, submissionId: crypto.randomUUID() }));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem("bua-registration-draft", JSON.stringify(data));
  }, [data, hydrated]);

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

  const move = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
    <div key="personal" className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Full name" required><Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. John Adewale" autoComplete="name" className="h-12 bg-white" /></Field></div>
      <div className="sm:col-span-2"><Field label="Gender" required><RadioGroup value={data.gender} onValueChange={(value) => update("gender", value)} className="grid gap-2 sm:grid-cols-3">{["Male", "Female", "Prefer not to say"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field></div>
      <Field label="Age" required><Input type="number" min="16" max="100" value={data.age} onChange={(e) => update("age", e.target.value)} inputMode="numeric" className="h-12 bg-white" placeholder="e.g. 34" /></Field>
      <Field label="Phone number" required><Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0801 234 5678" autoComplete="tel" className="h-12 bg-white" /></Field>
      <div className="sm:col-span-2"><Field label="Email address" hint="Optional"><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" autoComplete="email" className="h-12 bg-white" /></Field></div>
      <div className="sm:col-span-2"><SectionNote title="Why email is optional.">You will receive both identifiers on the next screen whether or not you provide an email address.</SectionNote></div>
    </div>,

    <div key="work" className="space-y-6">
      <Field label="Department" required>
        <Select value={data.department} onValueChange={(value) => { update("department", value); if (value !== "Others") update("otherDepartment", ""); }}>
          <SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select department" /></SelectTrigger>
          <SelectContent>{["Administration", "Finance", "Human Resources", "Procurement", "ICT", "Operations", "Others"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <AnimatePresence>{data.department === "Others" && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Field label="Please specify your department" required><Input value={data.otherDepartment} onChange={(e) => update("otherDepartment", e.target.value)} className="h-12 bg-white" /></Field></motion.div>}</AnimatePresence>
      <SectionNote title="Why we ask.">Department information helps the event team organise attendance and report overall participation. It is not shown publicly.</SectionNote>
    </div>,

    <div key="health" className="space-y-7">
      <Field label="Known medical conditions" hint="Select all that apply">
        <div className="grid gap-2 sm:grid-cols-2">{["Hypertension", "Diabetes", "Asthma", "Heart Disease", "Kidney Disease", "High Cholesterol", "None", "Others"].map((condition) => <Label key={condition} htmlFor={`condition-${condition}`} className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#d8d4cc] bg-white px-4 py-3.5 font-bold text-[#27313b] transition hover:border-[#8e9baa] has-[[data-state=checked]]:border-[#2a67a5] has-[[data-state=checked]]:bg-[#f3f7fb]"><Checkbox id={`condition-${condition}`} checked={data.conditions.includes(condition)} onCheckedChange={(checked) => toggleCondition(condition, checked === true)} />{condition}</Label>)}</div>
      </Field>
      {data.conditions.includes("Others") && <Field label="Please specify condition(s)" required><Input value={data.otherCondition} onChange={(e) => update("otherCondition", e.target.value)} className="h-12 bg-white" /></Field>}
      <Field label="Are you currently taking medication?" required><RadioGroup value={data.medication} onValueChange={(value) => { update("medication", value); if (value === "No") update("medicationDetails", ""); }} className="grid gap-2 sm:grid-cols-2"><Choice value="Yes" label="Yes" /><Choice value="No" label="No" /></RadioGroup></Field>
      {data.medication === "Yes" && <Field label="Medication details" required><Textarea value={data.medicationDetails} onChange={(e) => update("medicationDetails", e.target.value)} placeholder="List medication names and any helpful details" className="min-h-28 bg-white" /></Field>}
      <div className="grid gap-6 sm:grid-cols-2"><Field label="Do you smoke?" required><RadioGroup value={data.smoking} onValueChange={(value) => update("smoking", value)} className="grid gap-2">{["Yes", "No", "Former smoker"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field><Field label="Do you consume alcohol?" required><RadioGroup value={data.alcohol} onValueChange={(value) => update("alcohol", value)} className="grid gap-2">{["Yes", "Occasionally", "No"].map((option) => <Choice key={option} value={option} label={option} />)}</RadioGroup></Field></div>
      <Field label="Is there a health concern you want to discuss?" hint="Optional"><Textarea value={data.healthConcern} onChange={(e) => update("healthConcern", e.target.value)} maxLength={1200} placeholder="Share a brief concern for the healthcare team" className="min-h-32 bg-white" /></Field>
    </div>,

    <div key="service" className="space-y-6">
      <RadioGroup value={data.requestedService} onValueChange={(value) => update("requestedService", value)} className="grid gap-3 sm:grid-cols-2">
        {services.map((service, index) => {
          const id = `service-${service.value.replace(/\s+/g, "-")}`;
          return (
            <Label key={service.value} htmlFor={id} className="group relative flex min-h-52 cursor-pointer flex-col border border-[#d8d4cc] bg-white p-5 font-normal transition hover:border-[#8e9baa] has-[[data-state=checked]]:border-[#b5122b] has-[[data-state=checked]]:shadow-[inset_4px_0_0_#b5122b]">
              <div className="flex items-start justify-between gap-3"><span className="text-[10px] font-black uppercase tracking-[.14em] text-[#8b9199]">0{index + 1} · {service.tag}</span><RadioGroupItem id={id} value={service.value} /></div>
              <span className="mt-auto block pt-10 text-lg font-black tracking-[-.025em] text-[#1d2731]">{service.title}</span>
              <span className="mt-2 block text-sm leading-6 text-[#66717c]">{service.body}</span>
            </Label>
          );
        })}
      </RadioGroup>
      <Alert className="rounded-none border-[#dec66b] bg-[#fff8dc] text-[#654d10]"><AlertTitle>No payment is taken in this form</AlertTitle><AlertDescription>The healthcare team will describe available packages and any approved charge before you decide or pay.</AlertDescription></Alert>
    </div>,

    <div key="contact" className="space-y-8">
      <div className="border-b border-[#dcd8d0] pb-8"><Field label="May we contact you if further medical attention is required?" required><p className="mb-4 text-sm leading-6 text-[#6b7580]">This is contact permission. A healthcare professional decides whether a referral or follow-up is required.</p><RadioGroup value={data.medicalContact} onValueChange={(value) => update("medicalContact", value)} className="grid gap-2 sm:grid-cols-2"><Choice value="Yes" label="Yes, you may contact me" /><Choice value="No" label="No, do not contact me" /></RadioGroup></Field></div>
      <div><Field label="Receive future programme and wellness information?" required><p className="mb-4 text-sm leading-6 text-[#6b7580]">This preference is stored separately. Choosing No will not affect today’s screening.</p><RadioGroup value={data.wellnessInfo} onValueChange={(value) => update("wellnessInfo", value)} className="grid gap-2 sm:grid-cols-2"><Choice value="Yes" label="Yes, keep me informed" /><Choice value="No" label="No, thank you" /></RadioGroup></Field></div>
    </div>,

    <div key="review" className="space-y-7">
      <Alert className="rounded-none border-[#c8d6e6] bg-[#edf3f9]"><LockKeyhole className="absolute left-4 top-4 size-5 text-[var(--zendale-blue)]" /><AlertTitle className="pl-7">Consent and privacy</AlertTitle><AlertDescription className="pl-7">I understand that my information will be used for BUA Health Outreach registration, authorised screening administration and necessary follow-up, subject to approved privacy practices. This preliminary screening does not replace a comprehensive diagnosis or consultation.</AlertDescription></Alert>
      <Label htmlFor="consent" className="flex cursor-pointer items-start gap-3 border border-[#d2cdc4] bg-white p-5 font-normal has-[[data-state=checked]]:border-[var(--bua-red)] has-[[data-state=checked]]:shadow-[inset_4px_0_0_#b5122b]"><Checkbox id="consent" checked={data.consent} onCheckedChange={(checked) => update("consent", checked === true)} className="mt-0.5" /><span><span className="block text-sm font-black text-[#222d38]">I agree to the consent statement</span><span className="mt-1 block text-xs leading-5 text-[#727b84]">This option is never preselected.</span></span></Label>
      <div className="border-y border-[#dcd8d0]"><ReviewRow label="Full name" value={data.fullName} onEdit={() => move(0)} /><ReviewRow label="Gender / Age" value={`${data.gender || "—"} · ${data.age || "—"}`} onEdit={() => move(0)} /><ReviewRow label="Phone / Email" value={<>{data.phone || "—"}<br /><span className="font-normal text-[#7c838b]">{data.email || "No email provided"}</span></>} onEdit={() => move(0)} /><ReviewRow label="Department" value={data.department === "Others" ? data.otherDepartment : data.department} onEdit={() => move(1)} /><ReviewRow label="Known conditions" value={data.conditions.length ? data.conditions.join(", ") : "None selected"} onEdit={() => move(2)} /><ReviewRow label="Medication" value={data.medication === "Yes" ? data.medicationDetails : data.medication} onEdit={() => move(2)} /><ReviewRow label="Requested service" value={data.requestedService} onEdit={() => move(3)} /><ReviewRow label="Contact preferences" value={`Medical: ${data.medicalContact || "—"} · Wellness: ${data.wellnessInfo || "—"}`} onEdit={() => move(4)} /></div>
    </div>,
  ];

  const CurrentIcon = steps[step].icon;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <main className="min-h-screen bg-[#fbfaf7] lg:grid lg:grid-cols-[360px_1fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#0b2038] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="brand-grid absolute inset-0 opacity-50" />
        <div className="relative z-10 border-b border-white/10 px-8 py-7"><BuaMark inverse /></div>
        <div className="relative z-10 flex-1 px-8 py-8">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f3d861]">Registration journey</p>
          <nav className="mt-7 space-y-1">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const active = index === step;
              const done = index < step;
              return (
                <button
                  key={item.title}
                  type="button"
                  disabled={index > step}
                  onClick={() => index < step && move(index)}
                  className={cn("group relative flex w-full items-center gap-4 border-l px-4 py-3.5 text-left transition", active ? "border-[#f2c230] bg-white/7" : done ? "border-white/18 hover:bg-white/5" : "border-white/8 opacity-45")}
                >
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border text-xs font-black", active ? "border-[#f2c230] bg-[#f2c230] text-[#0b2038]" : done ? "border-[#71bd97] bg-[#71bd97] text-[#0b2038]" : "border-white/25 text-white/60")}>{done ? <Check className="size-4" /> : <Icon className="size-4" />}</span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-white/38">Step {index + 1}</span><span className={cn("mt-1 block text-sm font-bold", active ? "text-white" : "text-white/62")}>{item.short}</span></span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="relative z-10 mt-auto overflow-hidden border-t border-white/10">
          <div className="relative h-40">
            <Image src="/outreach/outreach-2.webp" alt="BUA Health Outreach screening" fill className="object-cover object-center opacity-55" sizes="360px" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,32,56,.18),rgba(11,32,56,.88))]" />
            <div className="absolute inset-x-0 bottom-0 p-6"><PoweredBy inverse /></div>
          </div>
        </div>
      </aside>

      <section className="min-w-0 bg-[#fbfaf7]">
        <header className="sticky top-0 z-30 border-b border-[#dedad2] bg-[#fbfaf7]/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-[1080px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <div className="lg:hidden"><BuaMark compact /></div>
            <Button asChild variant="ghost" size="sm" className="hidden -ml-3 lg:inline-flex"><Link href="/"><ArrowLeft /> Exit registration</Link></Button>
            <div className="ml-auto flex items-center gap-3 text-xs font-bold text-[#6d7680]"><ShieldCheck className="size-4 text-[#2a67a5]" /><span className="hidden sm:inline">Draft saved on this device</span></div>
          </div>
          <div className="h-1 bg-[#e3dfd7]"><motion.div className="h-full bg-[linear-gradient(90deg,#b5122b,#d92a48)]" animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div>
        </header>

        <div className="mx-auto max-w-[1080px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mb-9 flex items-start gap-5">
            <div className="hidden size-12 shrink-0 place-items-center rounded-full bg-[#0f2744] text-white sm:grid"><CurrentIcon className="size-5" /></div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-[11px] font-black uppercase tracking-[.2em] text-[#b5122b]">Step {step + 1} of {steps.length}</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7a828b]"><Clock3 className="size-3.5" /> About {step === 5 ? "1 minute" : "30 seconds"}</span>
              </div>
              <p className="mt-3 text-sm font-bold text-[#2a67a5]">{steps[step].eyebrow}</p>
              <h1 className="display-serif mt-1 text-balance text-[clamp(2.5rem,5vw,4.6rem)] leading-[.98] tracking-[-.055em] text-[#142235]">{steps[step].title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#66717c]">Required questions are marked with an asterisk. Your answers are saved on this device as you move through the form.</p>
            </div>
          </div>

          <div className="max-w-[820px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={step} custom={direction} initial={{ opacity: 0, y: direction * 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: direction * -8 }} transition={{ duration: .2 }}>
                {content[step]}
              </motion.div>
            </AnimatePresence>

            {error && <p className="mt-6 border-l-3 border-[#b5122b] bg-[#fff0f2] px-4 py-3 text-sm font-bold text-[#8d1426]">{error}</p>}

            <div className="mt-10 flex flex-col-reverse justify-between gap-3 border-t border-[#dcd8d0] pt-6 sm:flex-row sm:items-center">
              <Button type="button" variant="ghost" onClick={() => move(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft /> Back</Button>
              {step < 5 ? (
                <Button type="button" size="lg" onClick={continueForm} className="min-w-44">Continue <ArrowRight /></Button>
              ) : (
                <Button type="button" size="lg" onClick={submit} disabled={submitting} className="min-w-52">{submitting ? <><LoaderCircle className="animate-spin" /> Submitting securely…</> : <>Submit registration <ArrowRight /></>}</Button>
              )}
            </div>
          </div>
        </div>

        <footer className="border-t border-[#dedad2] px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-[1080px] flex-col justify-between gap-3 text-xs text-[#79818a] sm:flex-row sm:items-center"><span>Health information is restricted to authorised outreach personnel.</span><div className="lg:hidden"><PoweredBy compact /></div></div>
        </footer>
      </section>
    </main>
  );
}
