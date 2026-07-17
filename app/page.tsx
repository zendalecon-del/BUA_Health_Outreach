import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";

const faqs = [
  ["What is my registration number for?", "It identifies your registration during check-in and screening, so staff can find your record quickly."],
  ["What is the private lookup code for?", "It works with your registration number to protect access to your screening status and approved information."],
  ["Should I share my private lookup code?", "No. Keep it confidential because it may allow another person to access your screening information."],
  ["Why is an email address required?", "We use it to send your registration number and private lookup code after submission."],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#142235]">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <header className="relative z-30 mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <BuaMark />
          <div className="flex items-center gap-2">
            <Link href="/lookup" className="hidden rounded-full border border-[#d6d0c5] bg-white/70 px-4 py-2 text-xs font-bold text-[#4b5967] backdrop-blur-md transition hover:bg-white sm:inline-flex">Check my record</Link>
            <Link href="/staff/login" className="rounded-full border border-[#d6d0c5] bg-white/70 px-4 py-2 text-xs font-bold text-[#4b5967] backdrop-blur-md transition hover:bg-white">Staff login</Link>
          </div>
        </header>

        <div className="mx-auto grid min-h-[calc(100dvh-80px)] max-w-[1600px] items-stretch px-5 pb-5 sm:px-8 sm:pb-8 lg:grid-cols-[.88fr_1.12fr] lg:px-12 lg:pb-12">
          <div className="relative z-10 flex flex-col justify-between rounded-t-[2rem] bg-[#f5f1e9] px-1 py-10 sm:px-4 lg:rounded-l-[2.5rem] lg:rounded-tr-none lg:px-8 lg:py-14 xl:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4cec3] bg-white/65 px-4 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#2a67a5]"><ShieldCheck className="size-4" /> Confidential employee registration</div>
              <h1 className="mt-8 max-w-3xl text-balance text-[clamp(3.6rem,7.6vw,8.6rem)] font-black leading-[.82] tracking-[-.08em]">Your health<br /><span className="text-[#b5122b]">starts here.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#5e6975] sm:text-lg">Register for the BUA Health Outreach in a private, guided flow designed to take only a few minutes.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/register" className="inline-flex h-14 items-center gap-3 rounded-full bg-[#b5122b] px-7 text-sm font-black text-white shadow-[0_16px_35px_rgba(181,18,43,.2)] transition hover:-translate-y-0.5 hover:bg-[#991128]">Begin registration <ArrowRight className="size-4" /></Link>
                <Link href="/lookup" className="inline-flex h-14 items-center gap-2 rounded-full border border-[#cbc4b9] bg-white/60 px-6 text-sm font-bold text-[#293746] transition hover:bg-white"><KeyRound className="size-4 text-[#2a67a5]" /> Already registered?</Link>
              </div>
            </div>
            <div className="mt-12 grid max-w-2xl gap-4 border-t border-[#d8d1c6] pt-6 text-xs text-[#61707e] sm:grid-cols-3 lg:mt-8">
              <div className="flex items-center gap-2"><Clock3 className="size-4 text-[#b5122b]" /><strong className="text-[#263544]">2–3 minutes</strong></div>
              <div className="flex items-center gap-2"><LockKeyhole className="size-4 text-[#2a67a5]" /><strong className="text-[#263544]">Private by design</strong></div>
              <div className="flex items-center gap-2"><Check className="size-4 text-[#287a55]" /><strong className="text-[#263544]">Email confirmation</strong></div>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-b-[2rem] lg:rounded-r-[2.5rem] lg:rounded-bl-none">
            <Image src="/outreach/outreach-2.webp" alt="Zendale health professionals supporting a corporate outreach participant" fill priority className="object-cover" sizes="(min-width:1024px) 58vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,51,.02),rgba(8,27,51,.42))]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <div className="ml-auto max-w-sm rounded-[1.5rem] border border-white/20 bg-[#071c37]/76 p-5 text-white backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#74b8ff]">What happens next</p>
                <p className="mt-3 text-sm leading-6 text-white/75">After registration, keep your registration number and private lookup code. Staff will use your registration number during screening.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d1c6] bg-white">
        <div className="mx-auto grid max-w-[1540px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-24">
          <div><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#b5122b]">A clear three-stage journey</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] sm:text-5xl">Register once.<br />Return securely.</h2></div>
          <div className="divide-y divide-[#ded8cd] border-t border-[#ded8cd]">
            {[
              ["01", "Register", "Answer one clear question at a time. Only relevant follow-up questions appear."],
              ["02", "Attend screening", "Present your registration number so authorised staff can locate your record."],
              ["03", "View approved information", "Use both identifiers to check your screening status, referral or follow-up instructions."],
            ].map(([number,title,body])=><article key={number} className="grid gap-3 py-6 sm:grid-cols-[60px_180px_1fr]"><span className="text-xs font-black text-[#b5122b]">{number}</span><h3 className="text-lg font-black">{title}</h3><p className="text-sm leading-7 text-[#64717d]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9]">
        <div className="mx-auto grid max-w-[1540px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12 lg:py-24">
          <div><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2a67a5]">Before you register</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">Clear answers. No surprises.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#63707c]">Registration does not collect payment. Your details are used for outreach administration, screening and approved follow-up.</p></div>
          <div className="border-t border-[#d6cfc4]">{faqs.map(([question,answer])=><details key={question} className="group border-b border-[#d6cfc4]"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-black marker:hidden">{question}<ChevronDown className="size-5 text-[#2a67a5] transition group-open:rotate-180" /></summary><p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[#65717d]">{answer}</p></details>)}</div>
        </div>
      </section>

      <footer className="bg-[#071c37] text-white">
        <div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center lg:px-12"><BuaMark inverse /><div className="flex flex-col gap-3 md:items-end"><PoweredBy inverse /><div className="flex flex-wrap gap-5 text-xs text-white/45"><Link href="/zendale" className="hover:text-white">About Zendale</Link><Link href="/lookup" className="hover:text-white">Participant lookup</Link><Link href="/staff/login" className="hover:text-white">Authorised personnel</Link></div></div></div>
      </footer>
    </main>
  );
}
