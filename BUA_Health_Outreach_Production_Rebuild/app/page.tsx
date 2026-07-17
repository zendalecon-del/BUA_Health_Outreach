import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock3,
  FileKey2,
  HeartPulse,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";

const journey = [
  { number: "01", title: "Register", body: "A private, guided form." },
  { number: "02", title: "Screen", body: "Attend with your registration number." },
  { number: "03", title: "Follow up", body: "Return securely for approved updates." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#10233b]">
      <header className="relative z-40 border-b border-[#d9d5ce] bg-[#f6f3ed]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 xl:px-12">
          <BuaMark />
          <nav className="flex items-center gap-2" aria-label="Public navigation">
            <Link href="/zendale" className="hidden px-4 py-2 text-xs font-extrabold text-[#536174] transition hover:text-[#102f57] md:inline-flex">
              About Zendale
            </Link>
            <Link href="/lookup" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#cbc7c0] bg-white/75 px-4 text-xs font-extrabold text-[#26394f] transition hover:border-[#9ea8b3] hover:bg-white">
              <FileKey2 className="size-4 text-[#215f9c]" />
              Check my record
            </Link>
            <Link href="/staff/login" className="hidden h-10 items-center rounded-full bg-[#0a284b] px-5 text-xs font-extrabold text-white transition hover:bg-[#071f3c] sm:inline-flex">
              Staff access
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[#d9d5ce]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(181,18,43,.08),transparent_26%),radial-gradient(circle_at_90%_10%,rgba(42,103,165,.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(13,42,73,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(13,42,73,.06)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-[1600px] lg:grid-cols-[minmax(0,1.04fr)_minmax(500px,.96fr)]">
          <div className="flex min-w-0 flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 xl:px-12 xl:py-12">
            <div className="max-w-[760px]">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#d9d3cb] bg-white/70 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#8d1024] shadow-sm backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#b5122b]" />
                BUA Employee Health Programme · 2026
              </div>

              <h1 className="mt-7 max-w-[760px] text-balance font-serif text-[clamp(3rem,6.2vw,6.75rem)] font-bold leading-[.88] tracking-[-.062em] text-[#0b2543]">
                Your health,
                <span className="block text-[#a80f28]">handled with care.</span>
              </h1>

              <p className="mt-7 max-w-[640px] text-[15px] leading-7 text-[#536377] sm:text-[17px] sm:leading-8">
                Complete your confidential BUA Health Outreach registration before screening. It takes about three minutes, requires no payment, and sends your private access details directly to your email.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/register" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#ae1029] px-7 text-sm font-black text-white shadow-[0_18px_40px_rgba(174,16,41,.22)] transition hover:-translate-y-0.5 hover:bg-[#951024]">
                  Begin registration
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/lookup" className="inline-flex h-14 items-center justify-center rounded-full border border-[#c8c5bf] bg-white/75 px-7 text-sm font-extrabold text-[#233750] transition hover:border-[#9aa6b3] hover:bg-white">
                  I already registered
                </Link>
              </div>

              <div className="mt-8 grid max-w-[680px] gap-2.5 sm:grid-cols-3">
                {[
                  [Clock3, "About 3 minutes", "One clear question at a time"],
                  [LockKeyhole, "Private by design", "Authorised access only"],
                  [MailCheck, "Email required", "Receive both private identifiers"],
                ].map(([Icon, title, body]) => {
                  const IconComponent = Icon as typeof Clock3;
                  return (
                    <div key={String(title)} className="flex min-h-[82px] items-start gap-3 rounded-2xl border border-[#d9d5ce] bg-white/62 p-4 backdrop-blur-sm">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3f8] text-[#1d5f9b]">
                        <IconComponent className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#172b44]">{String(title)}</p>
                        <p className="mt-1 text-[10px] leading-4 text-[#687688]">{String(body)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid border-y border-[#d4d1ca] sm:grid-cols-3 lg:mt-8">
              {journey.map((item, index) => (
                <div key={item.number} className={`grid grid-cols-[34px_1fr] gap-3 py-4 sm:px-4 ${index < 2 ? "border-b border-[#d4d1ca] sm:border-b-0 sm:border-r" : ""}`}>
                  <span className="pt-0.5 text-[9px] font-black tracking-[.18em] text-[#a70f27]">{item.number}</span>
                  <div>
                    <p className="text-xs font-black text-[#172b44]">{item.title}</p>
                    <p className="mt-1 text-[10px] leading-4 text-[#6b7785]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[600px] overflow-hidden border-t border-[#d9d5ce] lg:min-h-0 lg:border-l lg:border-t-0">
            <Image src="/outreach/outreach-2.webp" alt="Zendale healthcare professionals supporting participants during a corporate health outreach" fill priority className="object-cover object-center" sizes="(min-width:1024px) 48vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,25,49,.02)_10%,rgba(5,25,49,.18)_55%,rgba(5,25,49,.82)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
              <span className="rounded-full border border-white/35 bg-[#092847]/70 px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] text-white backdrop-blur-xl">Confidential registration</span>
              <span className="hidden text-[9px] font-black uppercase tracking-[.22em] text-white/75 sm:block">BUA × Zendale</span>
            </div>

            <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/20 bg-[#071f3b]/82 p-5 text-white shadow-2xl backdrop-blur-2xl sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[1.15fr_.85fr] sm:items-end">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.19em] text-[#8bc5ef]">Everything you need before you start</p>
                  <h2 className="mt-3 max-w-md font-serif text-2xl font-bold leading-tight tracking-[-.035em] sm:text-3xl">Register once. Keep two private identifiers.</h2>
                  <p className="mt-3 max-w-lg text-xs leading-6 text-white/65">Your registration number supports check-in. Your private lookup code protects access to approved screening information.</p>
                </div>
                <div className="grid gap-2">
                  {[
                    "No payment is collected",
                    "Only relevant follow-up questions appear",
                    "Keep your lookup code confidential",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5 text-[11px] font-bold text-white/80">
                      <Check className="size-3.5 shrink-0 text-[#7fd0a9]" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#225f9a]">Privacy first</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl font-bold leading-[1.02] tracking-[-.045em] text-[#10253f] sm:text-5xl">Clear information. No surprises.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-[#dce2e8] bg-[#dce2e8] md:grid-cols-3">
            {[
              [ShieldCheck, "What your details support", "Registration, authorised screening administration and necessary follow-up."],
              [HeartPulse, "What happens on the day", "Present your registration number so the team can locate your record quickly."],
              [LockKeyhole, "How secure lookup works", "Use both private identifiers to access approved status and follow-up information."],
            ].map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof ShieldCheck;
              return (
                <article key={String(title)} className="bg-[#f8fafb] p-6 sm:p-7">
                  <IconComponent className="size-5 text-[#1e649f]" />
                  <h3 className="mt-7 text-sm font-black text-[#18304b]">{String(title)}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#657487]">{String(body)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d8d4cc] bg-[#f6f3ed]">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-5 py-7 sm:px-8 md:flex-row md:items-center xl:px-12">
          <PoweredBy />
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#687584]">
            <Link href="/zendale" className="transition hover:text-[#a70f27]">About Zendale</Link>
            <Link href="/lookup" className="transition hover:text-[#a70f27]">Participant lookup</Link>
            <Link href="/staff/login" className="transition hover:text-[#a70f27]">Authorised personnel</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
