"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  LockKeyhole,
  Search,
  ShieldCheck,
} from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";
import { Button } from "@/components/ui/button";

const faqs = [
  [
    "What will I receive after registration?",
    "Your registration number and a private lookup code will appear immediately. Keep both details safe; you will need them to check your status or approved result.",
  ],
  [
    "Can I register without an email address?",
    "Yes. Email is optional. Save or copy both identifiers from the confirmation screen before you leave.",
  ],
  [
    "Who can see my health information?",
    "Only authorised outreach personnel can access information required for registration, screening administration and approved follow-up.",
  ],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3efe8] text-[#17202a]">
      <section className="relative min-h-[760px] overflow-hidden bg-[#0b2038] text-white lg:min-h-screen">
        <div className="brand-grid pointer-events-none absolute inset-0 opacity-55" />
        <div className="absolute left-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,#b5122b_0_64%,#f2c230_64%_72%,#2a67a5_72%_100%)]" />

        <header className="relative z-20 mx-auto flex max-w-[1540px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <BuaMark inverse />
          <div className="hidden items-center gap-5 lg:flex">
            <Link href="/lookup" className="text-sm font-bold text-white/68 transition hover:text-white">
              Already registered?
            </Link>
            <Button asChild variant="outline" className="border-white/22 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#0b2038]">
              <Link href="/lookup"><Search /> Check my record</Link>
            </Button>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[680px] max-w-[1540px] lg:grid-cols-[1.02fr_.98fr]">
          <motion.div
            className="flex flex-col justify-center px-5 pb-14 pt-8 sm:px-8 lg:px-12 lg:pb-20 lg:pt-12"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#f2c230]" />
              <p className="text-[11px] font-black uppercase tracking-[.24em] text-[#f3d861]">Official employee health programme</p>
            </div>
            <h1 className="display-serif max-w-[760px] text-balance text-[clamp(3.2rem,6.7vw,7.4rem)] leading-[.92] tracking-[-.065em] text-white">
              Register for your health screening.
            </h1>
            <p className="mt-7 max-w-[610px] text-[17px] leading-8 text-white/67 sm:text-lg">
              A guided registration for BUA Health Outreach. It takes about three minutes, and your secure registration details are issued immediately.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-14 min-w-56 bg-[#b5122b] text-base hover:bg-[#cf1735]">
                <Link href="/register">Begin registration <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 min-w-52 border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#0b2038] lg:hidden">
                <Link href="/lookup"><Search /> Check my record</Link>
              </Button>
            </div>

            <div className="mt-11 grid max-w-[690px] gap-5 border-t border-white/13 pt-7 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white"><Clock3 className="size-4 text-[#f2c230]" /> 2–3 minutes</div>
                <p className="mt-2 text-xs leading-5 text-white/45">Complete the form on any phone or computer.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white"><LockKeyhole className="size-4 text-[#7bb6dd]" /> Private by design</div>
                <p className="mt-2 text-xs leading-5 text-white/45">Your lookup code is confidential and uniquely generated.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white"><ShieldCheck className="size-4 text-[#73c69b]" /> Email optional</div>
                <p className="mt-2 text-xs leading-5 text-white/45">Registration still works when no email is provided.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[520px] overflow-hidden lg:min-h-full"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .7, delay: .08 }}
          >
            <Image
              src="/outreach/outreach-4.webp"
              alt="A Zendale healthcare professional discussing screening information with a participant"
              fill
              priority
              className="object-cover object-[55%_center]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,32,56,.48)_0%,transparent_30%),linear-gradient(180deg,transparent_58%,rgba(6,19,34,.72)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-5 p-6 sm:p-8 lg:p-10">
              <div className="max-w-[470px] border-l-2 border-[#f2c230] pl-4">
                <p className="text-[11px] font-black uppercase tracking-[.2em] text-[#f3d861]">What happens next</p>
                <p className="mt-2 text-sm leading-6 text-white/82">Register, attend your screening, then return securely to view information approved for you.</p>
              </div>
              <div className="hidden rounded-full border border-white/20 bg-black/18 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-sm sm:block">BUA × Zendale</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#d9d4cb] bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-[1540px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#b5122b]">Before you register</p>
            <h2 className="display-serif mt-4 max-w-md text-4xl leading-[1.05] tracking-[-.045em] text-[#132235] sm:text-5xl">Everything you need to know, up front.</h2>
          </div>
          <div className="grid gap-0 border-t border-[#d7d2c8]">
            {[
              ["Have your phone number ready", "It is required for registration and authorised outreach communication."],
              ["Email is optional", "You can still register and receive both identifiers on screen."],
              ["Keep your private code confidential", "It works with your registration number to protect access to your record."],
            ].map(([title, body], index) => (
              <div key={title} className="grid gap-3 border-b border-[#d7d2c8] py-6 sm:grid-cols-[54px_1fr]">
                <span className="text-xs font-black text-[#b5122b]">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-black tracking-[-.025em] text-[#17202a]">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68717b]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3efe8]">
        <div className="mx-auto grid max-w-[1540px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2a67a5]">Questions</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] text-[#132235]">Clear answers before you continue.</h2>
            <div className="mt-7 flex items-center gap-3 text-sm text-[#58636f]"><Check className="size-4 text-[#287a55]" /> No payment is taken during registration.</div>
          </div>
          <div className="border-t border-[#d3cec4]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group border-b border-[#d3cec4] py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-black text-[#18222d] marker:hidden">
                  {question}
                  <ChevronDown className="size-5 shrink-0 text-[#2a67a5] transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[#65707b]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#091a2e] text-white">
        <div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center lg:px-12">
          <BuaMark inverse />
          <div className="flex flex-col items-start gap-4 md:items-end">
            <PoweredBy inverse />
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
              <span>© 2026 BUA Health Outreach</span>
              <Link href="/staff/login" className="transition hover:text-white">Authorised personnel</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
