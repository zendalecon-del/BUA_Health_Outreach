"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  FileCheck2,
  HeartPulse,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Pencil,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
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
  submissionId: "",
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

type FormData = typeof emptyData;
type QuestionKey = keyof FormData | "summary" | "consentScreen";
type Question = {
  key: QuestionKey;
  section: "Details" | "Health" | "Screening" | "Review";
  eyebrow: string;
  title: string;
  help?: string;
  optional?: boolean;
};

const services = [
  ["Free Wellness Screening", "Free wellness screening", "Essential checks and a guided wellness review."],
  ["Standard Package", "Standard package", "Additional screening options available on the day."],
  ["Comprehensive Package", "Comprehensive package", "A broader assessment with the healthcare team."],
  ["Doctor Consultation Only", "Doctor consultation only", "Discuss a specific concern with a clinician."],
] as const;

const stageMeta = [
  { name: "Details", label: "Your details", icon: CircleUserRound },
  { name: "Health", label: "Health background", icon: HeartPulse },
  { name: "Screening", label: "Screening choice", icon: Stethoscope },
  { name: "Review", label: "Review & consent", icon: FileCheck2 },
] as const;

function Choice({
  group,
  value,
  label,
  description,
}: {
  group: string;
  value: string;
  label: string;
  description?: string;
}) {
  const id = `${group}-${value}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <Label
      htmlFor={id}
      className="group flex min-h-[52px] cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-[#d8dfe6] bg-white px-4 py-2.5 transition hover:border-[#9da9b7] hover:bg-[#fbfcfd] has-[[data-state=checked]]:border-[#a90f28] has-[[data-state=checked]]:bg-[#fff7f8] has-[[data-state=checked]]:shadow-[0_8px_24px_rgba(169,15,40,.08)]"
    >
      <span className="min-w-0">
        <span className="block text-[13px] font-extrabold tracking-[-.01em] text-[#182e48]">{label}</span>
        {description && <span className="mt-0.5 block text-[10px] leading-4 text-[#6d7b8b]">{description}</span>}
      </span>
      <RadioGroupItem id={id} value={value} className="size-[18px] shrink-0 border-[#aab4bf] data-[state=checked]:border-[#a90f28] data-[state=checked]:text-[#a90f28]" />
    </Label>
  );
}

function ReviewSection({
  title,
  icon: Icon,
  rows,
  onEdit,
}: {
  title: string;
  icon: typeof CircleUserRound;
  rows: Array<[string, string]>;
  onEdit: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce3e9] bg-white">
      <div className="flex items-center justify-between border-b border-[#e6eaee] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#edf3f8] text-[#1d5f99]"><Icon className="size-4" /></div>
          <h3 className="text-[11px] font-black uppercase tracking-[.12em] text-[#27415e]">{title}</h3>
        </div>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#21639e] hover:text-[#154d82]">
          <Pencil className="size-3" /> Edit
        </button>
      </div>
      <dl className="grid grid-cols-2 gap-x-5 px-4 py-1">
        {rows.map(([label, value]) => (
          <div key={label} className="border-b border-[#eef1f4] py-2.5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
            <dt className="text-[8px] font-black uppercase tracking-[.13em] text-[#8a949f]">{label}</dt>
            <dd className="mt-1 break-words text-[11px] font-bold leading-4 text-[#2d4056]">{value || "Not provided"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(emptyData);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("bua-registration-draft");
      const restored = saved ? { ...emptyData, ...JSON.parse(saved) } : emptyData;
      setData({ ...restored, submissionId: restored.submissionId || crypto.randomUUID() });
    } catch {
      setData({ ...emptyData, submissionId: crypto.randomUUID() });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem("bua-registration-draft", JSON.stringify(data));
  }, [data, hydrated]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setAttempted(false);
  };

  const questions = useMemo<Question[]>(() => {
    const list: Question[] = [
      { key: "fullName", section: "Details", eyebrow: "Your identity", title: "What is your full name?", help: "Enter it exactly as you would like it recorded." },
      { key: "gender", section: "Details", eyebrow: "About you", title: "How would you describe your gender?" },
      { key: "age", section: "Details", eyebrow: "About you", title: "How old are you?" },
      { key: "phone", section: "Details", eyebrow: "Contact details", title: "What is your phone number?" },
      { key: "email", section: "Details", eyebrow: "Contact details", title: "What is your email address?", help: "Required. Your registration number and private lookup code will be sent here." },
      { key: "department", section: "Details", eyebrow: "Your work", title: "Which department do you work in?" },
    ];

    if (data.department === "Others") list.push({ key: "otherDepartment", section: "Details", eyebrow: "Your work", title: "Please enter your department." });

    list.push({ key: "conditions", section: "Health", eyebrow: "Health background", title: "Do you have any known medical conditions?", help: "Select all that apply, or choose None." });

    if (data.conditions.includes("Others")) list.push({ key: "otherCondition", section: "Health", eyebrow: "Health background", title: "What other condition should we record?" });

    list.push({ key: "medication", section: "Health", eyebrow: "Medication", title: "Are you currently taking medication?" });

    if (data.medication === "Yes") list.push({ key: "medicationDetails", section: "Health", eyebrow: "Medication", title: "Which medication are you taking?", help: "List the names and any useful details." });

    list.push(
      { key: "smoking", section: "Health", eyebrow: "Lifestyle", title: "Do you currently smoke?" },
      { key: "alcohol", section: "Health", eyebrow: "Lifestyle", title: "Do you consume alcohol?" },
      { key: "healthConcern", section: "Health", eyebrow: "Your concern", title: "Is there a health concern you would like to discuss?", optional: true },
      { key: "requestedService", section: "Screening", eyebrow: "Screening choice", title: "What would you like to access?" },
      { key: "medicalContact", section: "Screening", eyebrow: "Contact permission", title: "May the healthcare team contact you if further attention is required?", help: "This does not determine whether a referral is clinically required." },
      { key: "wellnessInfo", section: "Screening", eyebrow: "Programme updates", title: "Would you like future wellness information?", help: "Choosing No will not affect your screening." },
      { key: "summary", section: "Review", eyebrow: "Review", title: "Check your registration details." },
      { key: "consentScreen", section: "Review", eyebrow: "Final step", title: "Consent and submit." },
    );

    return list;
  }, [data.department, data.conditions, data.medication]);

  useEffect(() => {
    if (index > questions.length - 1) setIndex(questions.length - 1);
  }, [index, questions.length]);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const error = useMemo(() => {
    if (!question) return "";
    switch (question.key) {
      case "fullName": return data.fullName.trim().length < 3 ? "Enter your full name." : "";
      case "gender": return !data.gender ? "Select one option." : "";
      case "age": return !data.age || Number(data.age) < 16 || Number(data.age) > 100 ? "Enter an age between 16 and 100." : "";
      case "phone": return data.phone.replace(/\D/g, "").length < 10 ? "Enter a valid phone number." : "";
      case "email": return !/^\S+@\S+\.\S+$/.test(data.email) ? "Enter a valid email address." : "";
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
      case "consentScreen": return !data.consent ? "Accept the consent statement before submitting." : "";
      default: return "";
    }
  }, [data, question]);

  const move = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
    setAttempted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToKey = (key: QuestionKey) => {
    const target = questions.findIndex((item) => item.key === key);
    if (target >= 0) move(target);
  };

  const next = () => {
    if (error) {
      setAttempted(true);
      return;
    }
    move(Math.min(index + 1, questions.length - 1));
  };

  const toggleCondition = (condition: string, checked: boolean) => {
    setData((current) => {
      if (condition === "None" && checked) return { ...current, conditions: ["None"], otherCondition: "" };
      const withoutNone = current.conditions.filter((item) => item !== "None");
      const values = checked
        ? [...withoutNone.filter((item) => item !== condition), condition]
        : withoutNone.filter((item) => item !== condition);
      return { ...current, conditions: values, otherCondition: condition === "Others" && !checked ? "" : current.otherCondition };
    });
    setAttempted(false);
  };

  const submit = async () => {
    if (error) {
      setAttempted(true);
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const reference = result.reference ? ` Reference: ${result.reference}` : "";
        throw new Error(`${result.error || "Registration could not be completed."}${reference}`);
      }

      sessionStorage.removeItem("bua-registration-draft");
      sessionStorage.setItem("bua-registration-result", JSON.stringify({ ...result, firstName: data.fullName.trim().split(/\s+/)[0], email: data.email }));
      router.push("/registration-success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration could not be completed.", { duration: 9000 });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.shiftKey || submitting) return;
      const tag = (event.target as HTMLElement)?.tagName;
      if (tag === "TEXTAREA" || tag === "BUTTON") return;
      event.preventDefault();
      if (question?.key === "consentScreen") void submit();
      else next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const answer = (() => {
    switch (question?.key) {
      case "fullName":
        return <Input autoFocus value={data.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="e.g. Ada Okafor" autoComplete="name" className="h-13 rounded-[14px] border-[#cfd7df] bg-white px-4 text-[15px] shadow-none focus-visible:ring-[#24649c]" />;
      case "gender":
        return <RadioGroup className="grid gap-2 sm:grid-cols-3" value={data.gender} onValueChange={(value) => update("gender", value)}>{["Male", "Female", "Prefer not to say"].map((value) => <Choice key={value} group="gender" value={value} label={value} />)}</RadioGroup>;
      case "age":
        return <Input autoFocus type="number" min="16" max="100" inputMode="numeric" value={data.age} onChange={(event) => update("age", event.target.value)} placeholder="e.g. 35" className="h-13 max-w-[220px] rounded-[14px] border-[#cfd7df] bg-white px-4 text-lg font-black shadow-none focus-visible:ring-[#24649c]" />;
      case "phone":
        return <Input autoFocus type="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} placeholder="0801 234 5678" autoComplete="tel" className="h-13 rounded-[14px] border-[#cfd7df] bg-white px-4 text-[15px] shadow-none focus-visible:ring-[#24649c]" />;
      case "email":
        return (
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#718092]" />
            <Input autoFocus type="email" required value={data.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" autoComplete="email" className="h-13 rounded-[14px] border-[#cfd7df] bg-white pl-11 pr-4 text-[15px] shadow-none focus-visible:ring-[#24649c]" />
          </div>
        );
      case "department":
        return (
          <Select value={data.department} onValueChange={(value) => { update("department", value); if (value !== "Others") update("otherDepartment", ""); }}>
            <SelectTrigger className="h-13 rounded-[14px] border-[#cfd7df] bg-white px-4 text-sm shadow-none"><SelectValue placeholder="Select department" /></SelectTrigger>
            <SelectContent>{["Administration", "Finance", "Human Resources", "Procurement", "ICT", "Operations", "Others"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent>
          </Select>
        );
      case "otherDepartment":
        return <Input autoFocus value={data.otherDepartment} onChange={(event) => update("otherDepartment", event.target.value)} placeholder="Department name" className="h-13 rounded-[14px] border-[#cfd7df] bg-white px-4 text-[15px] shadow-none focus-visible:ring-[#24649c]" />;
      case "conditions":
        return (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {["Hypertension", "Diabetes", "Asthma", "Heart disease", "Kidney disease", "High cholesterol", "None", "Others"].map((value) => {
              const id = `condition-${value}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const selected = data.conditions.includes(value);
              return (
                <Label key={value} htmlFor={id} className={`flex min-h-[48px] cursor-pointer items-center justify-between gap-2 rounded-[13px] border px-3 py-2 text-[11px] font-extrabold transition ${selected ? "border-[#a90f28] bg-[#fff7f8] text-[#8f1025]" : "border-[#d8dfe6] bg-white text-[#2d4056] hover:border-[#9da9b7]"}`}>
                  <span>{value}</span>
                  <Checkbox id={id} checked={selected} onCheckedChange={(checked) => toggleCondition(value, checked === true)} className="size-4" />
                </Label>
              );
            })}
          </div>
        );
      case "otherCondition":
        return <Input autoFocus value={data.otherCondition} onChange={(event) => update("otherCondition", event.target.value)} placeholder="Condition" className="h-13 rounded-[14px] border-[#cfd7df] bg-white px-4 text-[15px] shadow-none focus-visible:ring-[#24649c]" />;
      case "medication":
        return <RadioGroup className="grid gap-2 sm:grid-cols-2" value={data.medication} onValueChange={(value) => { update("medication", value); if (value === "No") update("medicationDetails", ""); }}><Choice group="medication" value="Yes" label="Yes" /><Choice group="medication" value="No" label="No" /></RadioGroup>;
      case "medicationDetails":
        return <Textarea autoFocus value={data.medicationDetails} onChange={(event) => update("medicationDetails", event.target.value)} placeholder="Medication names and useful details" className="min-h-[92px] resize-none rounded-[14px] border-[#cfd7df] bg-white px-4 py-3 text-sm shadow-none focus-visible:ring-[#24649c]" />;
      case "smoking":
        return <RadioGroup className="grid gap-2 sm:grid-cols-3" value={data.smoking} onValueChange={(value) => update("smoking", value)}>{["Yes", "No", "Former smoker"].map((value) => <Choice key={value} group="smoking" value={value} label={value} />)}</RadioGroup>;
      case "alcohol":
        return <RadioGroup className="grid gap-2 sm:grid-cols-3" value={data.alcohol} onValueChange={(value) => update("alcohol", value)}>{["Yes", "Occasionally", "No"].map((value) => <Choice key={value} group="alcohol" value={value} label={value} />)}</RadioGroup>;
      case "healthConcern":
        return <Textarea autoFocus value={data.healthConcern} onChange={(event) => update("healthConcern", event.target.value)} maxLength={1200} placeholder="Share a brief concern" className="min-h-[92px] resize-none rounded-[14px] border-[#cfd7df] bg-white px-4 py-3 text-sm shadow-none focus-visible:ring-[#24649c]" />;
      case "requestedService":
        return <RadioGroup className="grid gap-2 sm:grid-cols-2" value={data.requestedService} onValueChange={(value) => update("requestedService", value)}>{services.map(([value, label, description]) => <Choice key={value} group="service" value={value} label={label} description={description} />)}</RadioGroup>;
      case "medicalContact":
        return <RadioGroup className="grid gap-2 sm:grid-cols-2" value={data.medicalContact} onValueChange={(value) => update("medicalContact", value)}><Choice group="medical-contact" value="Yes" label="Yes, you may contact me" /><Choice group="medical-contact" value="No" label="No, do not contact me" /></RadioGroup>;
      case "wellnessInfo":
        return <RadioGroup className="grid gap-2 sm:grid-cols-2" value={data.wellnessInfo} onValueChange={(value) => update("wellnessInfo", value)}><Choice group="wellness-information" value="Yes" label="Yes, keep me informed" /><Choice group="wellness-information" value="No" label="No, thank you" /></RadioGroup>;
      case "summary":
        return (
          <div className="grid gap-3 lg:grid-cols-2">
            <ReviewSection
              title="Personal & work"
              icon={CircleUserRound}
              onEdit={() => goToKey("fullName")}
              rows={[
                ["Full name", data.fullName],
                ["Gender / age", `${data.gender} · ${data.age}`],
                ["Phone", data.phone],
                ["Email", data.email],
                ["Department", data.department === "Others" ? data.otherDepartment : data.department],
              ]}
            />
            <ReviewSection
              title="Health & screening"
              icon={HeartPulse}
              onEdit={() => goToKey("conditions")}
              rows={[
                ["Conditions", data.conditions.length ? data.conditions.join(", ") : "None selected"],
                ["Medication", data.medication === "Yes" ? data.medicationDetails : data.medication],
                ["Smoking / alcohol", `${data.smoking} · ${data.alcohol}`],
                ["Service", data.requestedService],
                ["Permissions", `Medical: ${data.medicalContact} · Wellness: ${data.wellnessInfo}`],
              ]}
            />
          </div>
        );
      case "consentScreen":
        return (
          <div className="grid gap-3 lg:grid-cols-[1.1fr_.9fr]">
            <Label htmlFor="consent-final" className={`flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-5 transition ${data.consent ? "border-[#a90f28] shadow-[0_10px_32px_rgba(169,15,40,.08)]" : "border-[#dce3e9]"}`}>
              <Checkbox id="consent-final" checked={data.consent} onCheckedChange={(checked) => update("consent", checked === true)} className="mt-0.5 size-5" />
              <span>
                <strong className="block text-sm font-black text-[#1a2e47]">I consent to the use of my information for this outreach.</strong>
                <span className="mt-2 block text-[11px] leading-5 text-[#627184]">My information may be used for registration, authorised screening administration and necessary follow-up. I confirm that the details provided are accurate to the best of my knowledge.</span>
              </span>
            </Label>
            <div className="rounded-2xl bg-[#0c2a4d] p-5 text-white">
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-[#8bc5ef]"><LockKeyhole className="size-4" /></div>
              <p className="mt-4 text-xs font-black">Your private code remains private.</p>
              <p className="mt-2 text-[10px] leading-5 text-white/60">After registration, staff cannot view your private lookup code in plain text. Keep it safe with your registration number.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  })();

  return (
    <main className="min-h-[100dvh] bg-[#f4f6f8] text-[#162a42] lg:grid lg:h-[100dvh] lg:grid-cols-[320px_1fr] lg:overflow-hidden">
      <aside className="relative hidden overflow-hidden bg-[#082543] text-white lg:flex lg:h-[100dvh] lg:flex-col">
        <Image src="/outreach/outreach-1.webp" alt="" fill className="object-cover opacity-34" sizes="320px" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,25,48,.45),rgba(5,25,48,.96)_65%)]" />
        <div className="relative z-10 p-7"><BuaMark inverse /></div>

        <div className="relative z-10 mt-8 px-7">
          <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#89c4ee]">Registration journey</p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-[-.04em]">Private, clear and easy to complete.</h2>
          <div className="mt-7 space-y-1.5">
            {stageMeta.map(({ name, label, icon: Icon }, stageIndex) => {
              const activeIndex = stageMeta.findIndex((item) => item.name === question?.section);
              const active = question?.section === name;
              const complete = stageIndex < activeIndex;
              return (
                <div key={name} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${active ? "bg-white/10" : ""}`}>
                  <div className={`flex size-8 items-center justify-center rounded-lg ${active ? "bg-white text-[#0a294b]" : complete ? "bg-[#2c8660] text-white" : "border border-white/15 text-white/40"}`}>
                    {complete ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </div>
                  <div>
                    <p className={`text-[11px] font-black ${active ? "text-white" : "text-white/50"}`}>{label}</p>
                    {active && <p className="mt-0.5 text-[8px] font-black uppercase tracking-[.14em] text-[#89c4ee]">In progress</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-auto border-t border-white/10 p-7">
          <div className="flex items-start gap-3 text-[10px] leading-5 text-white/55"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#89c4ee]" />Your draft stays in this browser until you submit or close the session.</div>
          <div className="mt-5"><PoweredBy inverse /></div>
        </div>
      </aside>

      <section className="flex min-h-[100dvh] min-w-0 flex-col lg:h-[100dvh] lg:min-h-0">
        <header className="shrink-0 border-b border-[#dce3e9] bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[66px] w-full max-w-[1120px] items-center justify-between px-4 sm:px-7">
            <div className="lg:hidden"><BuaMark compact /></div>
            <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex"><Link href="/"><ArrowLeft /> Exit registration</Link></Button>
            <div className="ml-auto flex items-center gap-2 text-[10px] font-bold text-[#667588]"><ShieldCheck className="size-4 text-[#21639e]" />Saved in this browser</div>
          </div>
          <div className="h-[3px] bg-[#e6eaee]"><motion.div className="h-full bg-[#a90f28]" animate={{ width: `${progress}%` }} transition={{ duration: .25 }} /></div>
        </header>

        <div className="flex min-h-0 flex-1 items-center py-5 sm:py-7 lg:py-4">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col px-4 sm:px-7">
            <div className="overflow-hidden rounded-[24px] border border-[#dce3e9] bg-[#fafbfc] shadow-[0_24px_70px_rgba(20,42,66,.08)]">
              <div className="flex items-center justify-between border-b border-[#e2e7ec] bg-white px-5 py-3 sm:px-7">
                <span className="text-[9px] font-black uppercase tracking-[.17em] text-[#6d7b8c]">{question?.section}</span>
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1.5 text-[9px] font-bold text-[#7a8795] sm:flex"><Clock3 className="size-3" /> Usually under 3 minutes</span>
                  <span className="text-[10px] font-black tabular-nums text-[#84909d]">{String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span>
                </div>
              </div>

              <div className="flex min-h-[360px] items-center px-5 py-6 sm:min-h-[390px] sm:px-8 sm:py-7 lg:min-h-[min(55vh,500px)] lg:px-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${question?.key}-${index}`}
                    custom={direction}
                    className="w-full"
                    initial={{ opacity: 0, y: 8, x: direction * 10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -4, x: direction * -8 }}
                    transition={{ duration: .2, ease: "easeOut" }}
                  >
                    <div className="mx-auto w-full max-w-[860px]">
                      <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a90f28]">{question?.eyebrow}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <h1 className="max-w-[780px] text-balance font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-.04em] text-[#122a45]">{question?.title}</h1>
                        {question?.optional && <span className="rounded-full bg-[#e9edf1] px-2.5 py-1 text-[8px] font-black uppercase tracking-[.12em] text-[#687687]">Optional</span>}
                      </div>
                      {question?.help && <p className="mt-2.5 max-w-2xl text-[11px] leading-5 text-[#657487]">{question.help}</p>}
                      <div className="mt-5">{answer}</div>
                      {attempted && error && <p role="alert" className="mt-3 flex items-center gap-2 text-[11px] font-bold text-[#a3152c]"><span className="size-1.5 rounded-full bg-[#a90f28]" />{error}</p>}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[#e2e7ec] bg-white px-4 py-3 sm:px-6">
                <Button type="button" variant="ghost" onClick={() => move(Math.max(0, index - 1))} disabled={index === 0}><ArrowLeft /> Back</Button>
                <div className="hidden items-center gap-2 text-[9px] font-bold text-[#84909d] md:flex"><CheckCircle2 className="size-3.5 text-[#2c8660]" />One question at a time</div>
                {question?.key === "consentScreen" ? (
                  <Button size="lg" onClick={submit} disabled={submitting}>{submitting ? <><LoaderCircle className="animate-spin" /> Submitting…</> : <>Submit registration <ArrowRight /></>}</Button>
                ) : (
                  <Button size="lg" onClick={next}>{question?.key === "summary" ? "Continue to consent" : "Continue"} <ArrowRight /></Button>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-[#7a8795] lg:hidden"><ShieldCheck className="size-3.5 text-[#21639e]" />Confidential participant experience</div>
          </div>
        </div>
      </section>
    </main>
  );
}
