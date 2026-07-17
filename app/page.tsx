"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  HelpCircle,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const faqs = [
  ["What is my registration number for?", "It identifies your registration during check-in and screening, so staff do not need to repeatedly ask for your name."],
  ["What is the private lookup code for?", "It works with your registration number to securely view your screening status, approved results and follow-up instructions."],
  ["Will my information be confidential?", "Your information is used only for the outreach, authorised screening administration and necessary follow-up."],
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="grid items-center gap-8 pb-12 pt-4 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:pb-20 lg:pt-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cce4df] bg-white/78 px-3.5 py-2 text-xs font-bold text-[#326460] shadow-sm">
            <Sparkles className="size-4 text-[var(--gold)]" /> A simpler way to prepare for your health screening
          </div>
          <h1 className="text-balance max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.98] tracking-[-0.062em] text-[var(--navy)]">
            Your health journey, <span className="relative inline-block text-[var(--primary)]">clearly organised.<span className="absolute -bottom-2 left-1 h-2 w-[92%] rounded-full bg-[#aee2d9]/70" /></span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5a737a]">
            Register for the BUA Health Outreach in a few guided steps. You will receive a registration number and a private lookup code immediately after submission.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group min-w-48">
              <Link href="/register">Get started <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-48">
              <Link href="/lookup"><Search /> Check my registration</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#506970]">
            <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[var(--primary)]" /> Takes about 2–3 minutes</span>
            <span className="inline-flex items-center gap-2"><LockKeyhole className="size-4 text-[var(--primary)]" /> Email is optional</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[var(--primary)]" /> Confidential by design</span>
          </div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, scale: 0.98, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="absolute -left-8 top-10 size-28 rounded-full bg-[#bdebe3]/55 blur-2xl" />
          <div className="absolute -right-10 bottom-10 size-36 rounded-full bg-[#f8d79d]/45 blur-3xl" />
          <Card className="card-shadow relative overflow-hidden border-white/80 bg-white/92 p-3 sm:p-5">
            <div className="relative overflow-hidden rounded-[18px] bg-[var(--navy)] p-6 text-white sm:p-8">
              <div className="shell-grid absolute inset-0 opacity-20" />
              <div className="absolute -right-14 -top-16 size-56 rounded-full border-[28px] border-[#2d948a]/30" />
              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#83d6ca]">Outreach day</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em]">Your guided care path</h2>
                  </div>
                  <div className="grid size-12 place-items-center rounded-2xl bg-white/10"><HeartPulse className="size-6 text-[#72d9ca]" /></div>
                </div>
                <div className="grid gap-3">
                  {[
                    [UserRoundCheck, "Register", "Tell us who you are and what support you need", "01"],
                    [Stethoscope, "Complete screening", "A clinician records your measurements and review", "02"],
                    [CheckCircle2, "View approved guidance", "Use your private code to check your result safely", "03"],
                  ].map(([Icon, title, text, no], index) => {
                    const Comp = Icon as typeof UserRoundCheck;
                    return (
                      <motion.div key={String(title)} className="flex gap-4 rounded-2xl border border-white/10 bg-white/7 p-4" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.08 }}>
                        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#2c978c] text-white"><Comp className="size-5" /></div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{String(title)}</h3><span className="text-xs font-bold text-white/35">{String(no)}</span></div>
                          <p className="mt-1 text-sm leading-6 text-white/60">{String(text)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f1c46f] px-4 py-3.5 text-[#3d300e]">
                  <ShieldCheck className="size-5 shrink-0" />
                  <p className="text-sm font-semibold">Your private lookup code is never shown to other participants.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="grid gap-4 border-t border-[#d9e7e4] py-10 md:grid-cols-3">
        {[
          ["01", "Register once", "A clear, mobile-friendly form with conditional questions that only appear when relevant."],
          ["02", "Save your identifiers", "Your registration number and private lookup code are displayed immediately after submission."],
          ["03", "Return securely", "Use both identifiers to view only the screening information approved for you."],
        ].map(([number, title, body]) => (
          <Card key={number} className="border-[#d7e5e1] bg-white/70 p-6 shadow-sm">
            <span className="text-xs font-black tracking-[0.14em] text-[var(--primary)]">{number}</span>
            <h3 className="mt-5 text-xl font-bold tracking-[-0.025em] text-[var(--navy)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#627980]">{body}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 py-10 lg:grid-cols-[.72fr_1.28fr] lg:py-16">
        <div>
          <div className="grid size-12 place-items-center rounded-2xl bg-[#e4f5f1] text-[var(--primary)]"><HelpCircle /></div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[var(--navy)]">Before you begin</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#627980]">A few quick answers to help you understand how your details are used.</p>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-[#d6e5e1] bg-white p-5 shadow-sm open:border-[#acd6cf]">
              <summary className="cursor-pointer list-none pr-8 text-[15px] font-semibold text-[var(--navy)] marker:hidden">{question}<span className="float-right text-xl font-light text-[var(--primary)] group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#637a81]">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
