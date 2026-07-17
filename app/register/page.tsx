"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Clock3, LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { BuaMark, PoweredBy } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const emptyData = {
  submissionId: "", fullName: "", gender: "", age: "", phone: "", email: "", department: "", otherDepartment: "",
  conditions: [] as string[], otherCondition: "", medication: "", medicationDetails: "", smoking: "", alcohol: "", healthConcern: "",
  requestedService: "", medicalContact: "", wellnessInfo: "", consent: false,
};
type FormData = typeof emptyData;
type QuestionKey = keyof FormData | "review";
type Question = { key: QuestionKey; section: string; kicker: string; title: string; help?: string; optional?: boolean };

const services = [
  ["Free Wellness Screening", "Free wellness screening", "Essential checks and a guided wellness review."],
  ["Standard Package", "Standard package", "Learn about additional screening options available on the day."],
  ["Comprehensive Package", "Comprehensive package", "Explore a broader assessment with the healthcare team."],
  ["Doctor Consultation Only", "Doctor consultation only", "Speak with a clinician about a specific concern."],
] as const;

function Choice({ group, value, label, description }: { group: string; value: string; label: string; description?: string }) {
  const id = `${group}-${value}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <Label htmlFor={id} className="group flex min-h-16 cursor-pointer items-center justify-between gap-5 border-b border-[#ddd8cf] py-4 font-normal transition hover:border-[#7b8794] has-[[data-state=checked]]:border-[#b5122b]">
      <span>
        <span className="block text-[17px] font-semibold tracking-[-.02em] text-[#1d2731]">{label}</span>
        {description && <span className="mt-1 block max-w-xl text-sm leading-6 text-[#6d7781]">{description}</span>}
      </span>
      <RadioGroupItem id={id} value={value} className="size-5 shrink-0 border-[#a7adb4] data-[state=checked]:border-[#b5122b] data-[state=checked]:text-[#b5122b]" />
    </Label>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(emptyData);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("bua-registration-draft");
      const restored = saved ? { ...emptyData, ...JSON.parse(saved) } : emptyData;
      setData({ ...restored, submissionId: restored.submissionId || crypto.randomUUID() });
    } catch { setData({ ...emptyData, submissionId: crypto.randomUUID() }); }
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) sessionStorage.setItem("bua-registration-draft", JSON.stringify(data)); }, [data, hydrated]);
  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setData((current) => ({ ...current, [key]: value }));

  const questions = useMemo<Question[]>(() => {
    const list: Question[] = [
      { key: "fullName", section: "Personal information", kicker: "Let’s begin", title: "What is your full name?", help: "Enter your name exactly as you would like it recorded for the outreach." },
      { key: "gender", section: "Personal information", kicker: "About you", title: "How would you describe your gender?" },
      { key: "age", section: "Personal information", kicker: "About you", title: "How old are you?" },
      { key: "phone", section: "Personal information", kicker: "Contact details", title: "What phone number can we use for this registration?" },
      { key: "email", section: "Personal information", kicker: "Contact details", title: "What is your email address?", help: "Email is optional. Your registration number and private lookup code will still appear after submission.", optional: true },
      { key: "department", section: "Employment", kicker: "Your work", title: "Which department do you work in?" },
    ];
    if (data.department === "Others") list.push({ key: "otherDepartment", section: "Employment", kicker: "Your work", title: "Please tell us your department." });
    list.push({ key: "conditions", section: "Health information", kicker: "Health background", title: "Do you have any known medical conditions?", help: "Select every option that applies. Choose “None” if none apply." });
    if (data.conditions.includes("Others")) list.push({ key: "otherCondition", section: "Health information", kicker: "Health background", title: "What other condition should we know about?" });
    list.push(
      { key: "medication", section: "Health information", kicker: "Medication", title: "Are you currently taking any medication?" },
    );
    if (data.medication === "Yes") list.push({ key: "medicationDetails", section: "Health information", kicker: "Medication", title: "Which medication are you currently taking?", help: "List names and any information that may help the healthcare team." });
    list.push(
      { key: "smoking", section: "Health information", kicker: "Lifestyle", title: "Do you currently smoke?" },
      { key: "alcohol", section: "Health information", kicker: "Lifestyle", title: "Do you consume alcohol?" },
      { key: "healthConcern", section: "Health information", kicker: "Your concern", title: "Is there a health concern you would like to discuss?", optional: true },
      { key: "requestedService", section: "Today’s screening", kicker: "Choose a service", title: "What would you like to access today?" },
      { key: "medicalContact", section: "Communication", kicker: "Contact permission", title: "May we contact you if further medical attention is required?", help: "This is permission to contact you. It does not determine whether a referral is clinically required." },
      { key: "wellnessInfo", section: "Communication", kicker: "Programme updates", title: "Would you like to receive future wellness information?", help: "Choosing No will not affect today’s screening." },
      { key: "review", section: "Review and consent", kicker: "Final step", title: "Please review your registration before submitting." },
    );
    return list;
  }, [data.department, data.conditions, data.medication]);

  useEffect(() => { if (index > questions.length - 1) setIndex(questions.length - 1); }, [index, questions.length]);
  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const error = useMemo(() => {
    if (!question) return "";
    switch (question.key) {
      case "fullName": return data.fullName.trim().length < 3 ? "Enter your full name." : "";
      case "gender": return !data.gender ? "Select one option." : "";
      case "age": return !data.age || Number(data.age) < 16 || Number(data.age) > 100 ? "Enter an age between 16 and 100." : "";
      case "phone": return data.phone.replace(/\D/g, "").length < 10 ? "Enter a valid phone number." : "";
      case "email": return data.email && !/^\S+@\S+\.\S+$/.test(data.email) ? "Enter a valid email address or leave it blank." : "";
      case "department": return !data.department ? "Select your department." : "";
      case "otherDepartment": return data.otherDepartment.trim().length < 2 ? "Enter your department." : "";
      case "otherCondition": return data.otherCondition.trim().length < 2 ? "Enter the condition." : "";
      case "medication": return !data.medication ? "Select one option." : "";
      case "medicationDetails": return data.medicationDetails.trim().length < 2 ? "Enter your medication details." : "";
      case "smoking": return !data.smoking ? "Select one option." : "";
      case "alcohol": return !data.alcohol ? "Select one option." : "";
      case "requestedService": return !data.requestedService ? "Select a service." : "";
      case "medicalContact": return !data.medicalContact ? "Select one option." : "";
      case "wellnessInfo": return !data.wellnessInfo ? "Select one option." : "";
      case "review": return !data.consent ? "You must agree before submitting." : "";
      default: return "";
    }
  }, [data, question]);

  const move = (next: number) => { setDirection(next > index ? 1 : -1); setIndex(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const next = () => { if (error) return toast.error(error); move(Math.min(index + 1, questions.length - 1)); };
  const toggleCondition = (condition: string, checked: boolean) => {
    setData((current) => {
      if (condition === "None" && checked) return { ...current, conditions: ["None"], otherCondition: "" };
      const withoutNone = current.conditions.filter((item) => item !== "None");
      const nextValues = checked ? [...withoutNone.filter((item) => item !== condition), condition] : withoutNone.filter((item) => item !== condition);
      return { ...current, conditions: nextValues, otherCondition: condition === "Others" && !checked ? "" : current.otherCondition };
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
    } catch (err) { toast.error(err instanceof Error ? err.message : "Registration could not be completed."); setSubmitting(false); }
  };

  const answer = (() => {
    switch (question?.key) {
      case "fullName": return <Input autoFocus value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" autoComplete="name" className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-2xl shadow-none focus-visible:ring-0" />;
      case "gender": return <RadioGroup value={data.gender} onValueChange={(v) => update("gender", v)}>{["Male", "Female", "Prefer not to say"].map((v) => <Choice key={v} group="gender" value={v} label={v} />)}</RadioGroup>;
      case "age": return <Input autoFocus type="number" min="16" max="100" inputMode="numeric" value={data.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 35" className="h-20 max-w-xs border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-4xl shadow-none focus-visible:ring-0" />;
      case "phone": return <Input autoFocus type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0801 234 5678" autoComplete="tel" className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-2xl shadow-none focus-visible:ring-0" />;
      case "email": return <Input autoFocus type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" autoComplete="email" className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-2xl shadow-none focus-visible:ring-0" />;
      case "department": return <Select value={data.department} onValueChange={(v) => { update("department", v); if (v !== "Others") update("otherDepartment", ""); }}><SelectTrigger className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-lg shadow-none"><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent>{["Administration", "Finance", "Human Resources", "Procurement", "ICT", "Operations", "Others"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select>;
      case "otherDepartment": return <Input autoFocus value={data.otherDepartment} onChange={(e) => update("otherDepartment", e.target.value)} placeholder="Department name" className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-2xl shadow-none focus-visible:ring-0" />;
      case "conditions": return <div className="grid sm:grid-cols-2 sm:gap-x-8">{["Hypertension", "Diabetes", "Asthma", "Heart Disease", "Kidney Disease", "High Cholesterol", "None", "Others"].map((v) => { const id = `condition-${v}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"); return <Label key={v} htmlFor={id} className="flex cursor-pointer items-center justify-between border-b border-[#ddd8cf] py-4 text-[17px] font-semibold text-[#1d2731]"><span>{v}</span><Checkbox id={id} checked={data.conditions.includes(v)} onCheckedChange={(c) => toggleCondition(v, c === true)} className="size-5" /></Label>; })}</div>;
      case "otherCondition": return <Input autoFocus value={data.otherCondition} onChange={(e) => update("otherCondition", e.target.value)} placeholder="Condition" className="h-16 border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-2xl shadow-none focus-visible:ring-0" />;
      case "medication": return <RadioGroup value={data.medication} onValueChange={(v) => { update("medication", v); if (v === "No") update("medicationDetails", ""); }}><Choice group="medication" value="Yes" label="Yes" /><Choice group="medication" value="No" label="No" /></RadioGroup>;
      case "medicationDetails": return <Textarea autoFocus value={data.medicationDetails} onChange={(e) => update("medicationDetails", e.target.value)} placeholder="Medication names and details" className="min-h-44 resize-none border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-xl shadow-none focus-visible:ring-0" />;
      case "smoking": return <RadioGroup value={data.smoking} onValueChange={(v) => update("smoking", v)}>{["Yes", "No", "Former smoker"].map((v) => <Choice key={v} group="smoking" value={v} label={v} />)}</RadioGroup>;
      case "alcohol": return <RadioGroup value={data.alcohol} onValueChange={(v) => update("alcohol", v)}>{["Yes", "Occasionally", "No"].map((v) => <Choice key={v} group="alcohol" value={v} label={v} />)}</RadioGroup>;
      case "healthConcern": return <Textarea autoFocus value={data.healthConcern} onChange={(e) => update("healthConcern", e.target.value)} maxLength={1200} placeholder="Share a brief concern" className="min-h-44 resize-none border-0 border-b border-[#b8b4ad] bg-transparent px-0 text-xl shadow-none focus-visible:ring-0" />;
      case "requestedService": return <RadioGroup value={data.requestedService} onValueChange={(v) => update("requestedService", v)}>{services.map(([value, label, description]) => <Choice key={value} group="service" value={value} label={label} description={description} />)}</RadioGroup>;
      case "medicalContact": return <RadioGroup value={data.medicalContact} onValueChange={(v) => update("medicalContact", v)}><Choice group="medical-contact" value="Yes" label="Yes, you may contact me" /><Choice group="medical-contact" value="No" label="No, do not contact me" /></RadioGroup>;
      case "wellnessInfo": return <RadioGroup value={data.wellnessInfo} onValueChange={(v) => update("wellnessInfo", v)}><Choice group="wellness-info" value="Yes" label="Yes, keep me informed" /><Choice group="wellness-info" value="No" label="No, thank you" /></RadioGroup>;
      case "review": return <div className="space-y-7"><div className="divide-y divide-[#ddd8cf] border-y border-[#ddd8cf] text-sm">{[
        ["Name", data.fullName], ["Gender and age", `${data.gender} · ${data.age}`], ["Phone", data.phone], ["Email", data.email || "Not provided"], ["Department", data.department === "Others" ? data.otherDepartment : data.department], ["Conditions", data.conditions.length ? data.conditions.join(", ") : "None selected"], ["Medication", data.medication === "Yes" ? data.medicationDetails : data.medication], ["Service", data.requestedService], ["Contact preferences", `Medical: ${data.medicalContact} · Wellness: ${data.wellnessInfo}`]
      ].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><span className="text-xs font-bold uppercase tracking-[.12em] text-[#7c838b]">{label}</span><span className="font-semibold text-[#202a34]">{value}</span></div>)}</div><div className="flex items-start gap-4 border-l-2 border-[#b5122b] bg-[#fff5f5] p-5"><Checkbox id="consent-final" checked={data.consent} onCheckedChange={(c) => update("consent", c === true)} className="mt-1" /><Label htmlFor="consent-final" className="cursor-pointer text-sm leading-7 text-[#4e5964]"><strong className="block text-[#1d2731]">I agree to the consent statement</strong>I understand that my information will be used for BUA Health Outreach registration, authorised screening administration and necessary follow-up.</Label></div></div>;
      default: return null;
    }
  })();

  return (
    <main className="min-h-screen bg-[#f8f6f1] lg:grid lg:grid-cols-[minmax(320px,34vw)_1fr]">
      <aside className="relative hidden min-h-screen overflow-hidden lg:sticky lg:top-0 lg:block lg:h-screen">
        <Image src="/outreach/outreach-1.webp" alt="BUA Health Outreach" fill priority className="object-cover" sizes="34vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,26,47,.18),rgba(9,26,47,.9))]" />
        <div className="absolute inset-x-0 top-0 p-8"><BuaMark inverse /></div>
        <div className="absolute inset-x-0 bottom-0 p-8 text-white"><p className="max-w-sm text-sm leading-7 text-white/76">A private, guided registration experience for the BUA Health Outreach programme.</p><div className="mt-6 border-t border-white/20 pt-5"><PoweredBy inverse /></div></div>
      </aside>

      <section className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-[#dedad2] bg-[#f8f6f1]/95 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-10 lg:px-14"><div className="lg:hidden"><BuaMark compact /></div><Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex"><Link href="/"><ArrowLeft /> Exit</Link></Button><div className="ml-auto flex items-center gap-2 text-xs font-semibold text-[#69727c]"><ShieldCheck className="size-4 text-[#2a67a5]" /> Draft saved privately</div></div>
          <div className="h-[3px] bg-[#e3dfd7]"><motion.div className="h-full bg-[#b5122b]" animate={{ width: `${progress}%` }} transition={{ duration: .3 }} /></div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-10 lg:px-14 lg:py-16">
            <div className="mb-10 flex items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-[.16em] text-[#7c838b]"><span>{question?.section}</span><span>{index + 1} / {questions.length}</span></div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`${question?.key}-${index}`} custom={direction} initial={{ opacity: 0, x: direction * 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -12 }} transition={{ duration: .22, ease: "easeOut" }}>
                <p className="text-sm font-semibold text-[#b5122b]">{question?.kicker}</p>
                <h1 className="display-serif mt-3 text-balance text-[clamp(2.4rem,6vw,5rem)] leading-[.98] tracking-[-.055em] text-[#142235]">{question?.title}</h1>
                {question?.help && <p className="mt-5 max-w-2xl text-base leading-7 text-[#68727c]">{question.help}</p>}
                {question?.optional && <span className="mt-4 inline-flex rounded-full bg-[#e9e5dd] px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#666f78]">Optional</span>}
                <div className="mt-10">{answer}</div>
              </motion.div>
            </AnimatePresence>
            {error && <p className="mt-6 border-l-2 border-[#b5122b] pl-4 text-sm font-semibold text-[#98152a]">{error}</p>}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-[#dedad2] bg-[#f8f6f1]/96 px-5 py-4 backdrop-blur-xl sm:px-10 lg:px-14">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4"><Button type="button" variant="ghost" onClick={() => move(Math.max(0, index - 1))} disabled={index === 0}><ArrowLeft /> Back</Button><div className="hidden items-center gap-2 text-xs text-[#7a828b] sm:flex"><Clock3 className="size-4" /> Usually under 3 minutes</div>{question?.key === "review" ? <Button size="lg" onClick={submit} disabled={submitting}>{submitting ? <><LoaderCircle className="animate-spin" /> Submitting…</> : <>Submit registration <ArrowRight /></>}</Button> : <Button size="lg" onClick={next}>Continue <ArrowRight /></Button>}</div>
        </div>
      </section>
    </main>
  );
}
