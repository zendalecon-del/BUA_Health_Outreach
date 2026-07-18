import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileKey2,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";

const essentials = [
  { icon: Clock3, title: "About 3 minutes", text: "One focused question at a time." },
  { icon: MailCheck, title: "Email required", text: "Your private access details are sent there." },
  { icon: LockKeyhole, title: "No payment", text: "Registration is completely free." },
];

const journey = [
  { number: "01", title: "Register privately", text: "Complete the guided form on your phone or computer." },
  { number: "02", title: "Attend screening", text: "Bring the registration number issued to you." },
  { number: "03", title: "Return securely", text: "Use both private identifiers for approved updates." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f1ea] text-[#0d2745]">
      <header className="border-b border-[#d9d4cb] bg-[#f8f5ef]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1560px] items-center justify-between px-5 sm:px-8 xl:px-12">
          <BuaMark />
          <nav className="flex items-center gap-2" aria-label="Public navigation">
            <Link href="/zendale" className="hidden px-4 py-2 text-xs font-black text-[#536273] transition hover:text-[#153e69] md:inline-flex">
              About Zendale
            </Link>
            <Link href="/lookup" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#cfc9bf] bg-white/85 px-4 text-xs font-black text-[#243a54] transition hover:border-[#9ca7b3] hover:bg-white">
              <FileKey2 className="size-4 text-[#2369a7]" />
              Check my record
            </Link>
            <Link href="/staff/login" className="hidden h-10 items-center rounded-full bg-[#0b2d54] px-5 text-xs font-black text-white transition hover:bg-[#071f3c] sm:inline-flex">
              Staff access
            </Link>
          </nav>
        </div>
      </header>

      <section className="outreach-hero-shell relative border-b border-[#d9d4cb]">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(19,56,91,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(19,56,91,.055)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="outreach-hero-grid relative mx-auto grid max-w-[1560px] lg:grid-cols-[minmax(0,1.08fr)_minmax(480px,.92fr)]">
          <div className="outreach-hero-copy flex min-w-0 flex-col justify-between px-5 py-7 sm:px-8 sm:py-9 xl:px-12 xl:py-10">
            <div className="max-w-[760px]">
              <div className="inline-flex items-center gap-3 border-l-2 border-[#b5122b] pl-3 text-[10px] font-black uppercase tracking-[.2em] text-[#8d1327]">
                BUA Employee Health Programme · 2026
              </div>

              <h1 className="outreach-hero-title mt-5 max-w-[760px] text-balance text-[clamp(2.65rem,5vw,5.4rem)] font-black leading-[.94] tracking-[-.065em] text-[#0b2746]">
                A clearer way to prepare for your health screening.
              </h1>

              <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#55677a] sm:text-[16px]">
                Register before the outreach, receive your private identifiers by email, and arrive ready for a smoother check-in. Your information is used only for authorised screening administration and approved follow-up.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/register" className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#b5122b] px-7 text-sm font-black text-white shadow-[0_18px_42px_rgba(181,18,43,.22)] transition hover:-translate-y-0.5 hover:bg-[#981025]">
                  Begin registration
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
                <Link href="/lookup" className="inline-flex h-13 items-center justify-center rounded-full border border-[#c9c4bb] bg-white/75 px-7 text-sm font-black text-[#243b55] transition hover:border-[#9ea8b3] hover:bg-white">
                  I already registered
                </Link>
              </div>

              <div className="mt-7 grid max-w-[720px] border-y border-[#d5d0c7] sm:grid-cols-3">
                {essentials.map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className={`flex gap-3 py-4 sm:px-4 ${index < essentials.length - 1 ? "border-b border-[#d5d0c7] sm:border-b-0 sm:border-r" : ""}`}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8f1f8] text-[#2167a4]"><Icon className="size-4" /></div>
                    <div>
                      <p className="text-[11px] font-black text-[#142f4d]">{title}</p>
                      <p className="mt-1 text-[9px] leading-4 text-[#6b7887]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 grid border-t border-[#d5d0c7] sm:grid-cols-3">
              {journey.map((item, index) => (
                <div key={item.number} className={`grid grid-cols-[30px_1fr] gap-3 py-4 sm:px-4 ${index < journey.length - 1 ? "border-b border-[#d5d0c7] sm:border-b-0 sm:border-r" : ""}`}>
                  <span className="pt-0.5 text-[9px] font-black tracking-[.16em] text-[#b5122b]">{item.number}</span>
                  <div>
                    <p className="text-[11px] font-black text-[#18344f]">{item.title}</p>
                    <p className="mt-1 text-[9px] leading-4 text-[#707d8a]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="outreach-hero-image relative min-h-[580px] overflow-hidden border-t border-[#d9d4cb] lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/outreach/outreach-2.webp"
              alt="Zendale healthcare professionals welcoming a participant during a corporate health outreach"
              fill
              priority
              className="object-cover object-[58%_center]"
              sizes="(min-width:1024px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,26,49,.03)_15%,rgba(5,26,49,.2)_56%,rgba(5,26,49,.9)_100%)]" />
            <div className="absolute left-5 top-5 border-l-2 border-white/80 pl-3 sm:left-7 sm:top-7">
              <p className="text-[9px] font-black uppercase tracking-[.2em] text-white">Confidential registration</p>
              <p className="mt-1 text-[10px] font-bold text-white/60">BUA Health Outreach · Powered by Zendale</p>
            </div>

            <div className="absolute inset-x-5 bottom-5 bg-[#082846]/92 p-5 text-white shadow-2xl backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr] xl:items-end">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#86c7ef]">Before you start</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-.04em] sm:text-3xl">Keep both private identifiers safe.</h2>
                  <p className="mt-2 max-w-lg text-[11px] leading-5 text-white/65">Your registration number supports check-in. Your lookup code protects access to approved information.</p>
                </div>
                <div className="grid gap-2">
                  {["No payment is collected", "Email is required", "Only authorised staff can access records"].map((item) => (
                    <div key={item} className="flex items-center gap-2 border-t border-white/15 pt-2 text-[10px] font-bold text-white/78 first:border-t-0 first:pt-0">
                      <CheckCircle2 className="size-3.5 shrink-0 text-[#78d1a7]" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1560px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:px-12 lg:py-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#2268a7]">Privacy and clarity</p>
            <h2 className="mt-4 max-w-lg text-4xl font-black leading-[1.02] tracking-[-.05em] text-[#102b49] sm:text-5xl">Everything important, explained before you begin.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#657386]">The form asks only for information needed to organise screening, support clinical conversations and manage approved follow-up.</p>
          </div>
          <div className="grid divide-y divide-[#dfe4e9] border-y border-[#dfe4e9]">
            {[
              [ShieldCheck, "What your information supports", "Registration, screening administration and necessary follow-up by authorised personnel."],
              [Stethoscope, "What happens on the day", "Present your registration number so the team can find your record quickly."],
              [LockKeyhole, "How secure lookup works", "Use your registration number together with the private lookup code sent to your email."],
            ].map(([Icon, title, text], index) => {
              const ItemIcon = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className="grid gap-4 py-5 sm:grid-cols-[48px_140px_1fr] sm:items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#edf4f9] text-[#2066a3]"><ItemIcon className="size-4.5" /></div>
                  <p className="text-[9px] font-black uppercase tracking-[.14em] text-[#a61029]">0{index + 1}</p>
                  <div>
                    <h3 className="text-sm font-black text-[#18334f]">{String(title)}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#6b7887]">{String(text)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d9d4cb] bg-[#f5f1ea]">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between xl:px-12">
          <PoweredBy />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#697583]">
            <span>© 2026 BUA Health Outreach</span>
            <Link href="/zendale" className="hover:text-[#b5122b]">About Zendale</Link>
            <Link href="/lookup" className="hover:text-[#b5122b]">Participant lookup</Link>
            <Link href="/staff/login" className="hover:text-[#b5122b]">Authorised personnel</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
