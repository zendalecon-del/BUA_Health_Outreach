"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Clock3, HelpCircle, LockKeyhole, Search, ShieldCheck, Stethoscope, UserRoundCheck } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const faqs = [
  ["What is my registration number for?", "It identifies your registration during check-in and screening. Staff may ask for it instead of repeatedly asking for your name."],
  ["What is the private lookup code for?", "It works with your registration number to securely view your screening status, approved result, referral information or follow-up instruction."],
  ["Should I share my private lookup code?", "No. Keep it private because it may allow access to your screening information."],
  ["What if I do not have an email address?", "You can still register. Both identifiers will appear immediately after submission, so save or copy them before leaving."],
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="pb-12 pt-3 lg:pb-20 lg:pt-8">
        <div className="grid overflow-hidden rounded-[34px] border border-[#ded8cd] bg-white shadow-[0_30px_100px_rgba(30,33,39,.12)] lg:grid-cols-[.93fr_1.07fr]">
          <motion.div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-14" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="absolute left-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,var(--bua-red)_0_47%,var(--bua-gold)_47%_56%,var(--zendale-blue)_56%_100%)]" />
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#eadde0] bg-[#fff7f8] px-3.5 py-2 text-xs font-bold text-[#8c1727]">
              <ShieldCheck className="size-4" /> Secure registration for BUA employees
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--zendale-blue)]">BUA Health Outreach</p>
            <h1 className="mt-4 max-w-2xl text-balance text-[clamp(2.5rem,5.4vw,5.4rem)] font-black leading-[.98] tracking-[-.065em] text-[#171b22]">
              A healthier workday starts with one clear step.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#626873]">
              Complete your registration in a few guided steps. Your registration number and private lookup code will be created immediately.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group min-w-52">
                <Link href="/register">Start registration <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-52">
                <Link href="/lookup"><Search /> Check my record</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-[#59616c] sm:grid-cols-3">
              <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[var(--bua-red)]" /> 2–3 minutes</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole className="size-4 text-[var(--zendale-blue)]" /> Email optional</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#157347]" /> Save instantly</span>
            </div>
          </motion.div>

          <motion.div className="relative min-h-[440px] overflow-hidden lg:min-h-[690px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .08 }}>
            <Image src="/outreach/outreach-1.webp" alt="Zendale healthcare professional carrying out a wellness screening during a corporate outreach" fill priority className="object-cover" sizes="(min-width:1024px) 55vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(13,22,34,.82)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-9">
              <div className="max-w-xl rounded-2xl border border-white/20 bg-[#101a29]/70 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#f6d66d]">What to expect</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[ [UserRoundCheck,"Register"], [Stethoscope,"Screen"], [ShieldCheck,"View securely"] ].map(([Icon,label]) => { const C = Icon as typeof UserRoundCheck; return <div key={String(label)} className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-white/10"><C className="size-4" /></span>{String(label)}</div>; })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-3">
        {[
          ["01", "Register once", "A mobile-first form that shows only the questions relevant to you."],
          ["02", "Save both identifiers", "Your registration number and confidential lookup code appear immediately."],
          ["03", "Return securely", "Use both details to view only information approved for participants."],
        ].map(([no,title,body]) => (
          <Card key={no} className="soft-shadow p-6">
            <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.14em] text-[var(--bua-red)]">{no}</span><span className="h-px w-14 bg-[#ddd7ce]" /></div>
            <h2 className="mt-6 text-xl font-bold tracking-[-.03em] text-[#1c2128]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#69707a]">{body}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[.72fr_1.28fr] lg:py-18">
        <div>
          <div className="grid size-12 place-items-center rounded-2xl bg-[#e9f0f9] text-[var(--zendale-blue)]"><HelpCircle /></div>
          <h2 className="mt-5 text-3xl font-black tracking-[-.045em] text-[#1a1f26]">Before you begin</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#6b717b]">Clear answers about privacy, identifiers and registration.</p>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question,answer]) => (
            <details key={question} className="group rounded-2xl border border-[#ded8cf] bg-white p-5 shadow-sm open:border-[#c7bfcf]">
              <summary className="cursor-pointer list-none pr-8 text-[15px] font-semibold text-[#242931] marker:hidden">{question}<span className="float-right text-xl font-light text-[var(--bua-red)] group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#69707a]">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
