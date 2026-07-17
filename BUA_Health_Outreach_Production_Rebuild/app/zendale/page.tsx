import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  HeartPulse,
  Hospital,
  Landmark,
  MapPin,
  Network,
  Settings2,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    icon: Stethoscope,
    title: "Clinical & specialist healthcare",
    intro: "Coordinated care across primary, specialist and advanced clinical services.",
    items: ["General medical services", "Specialist consultations", "Intensive care services", "Endoscopy", "Diagnostics", "Telemedicine", "Preventive healthcare"],
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Fertility & women’s health",
    intro: "Personalised reproductive care delivered by specialist teams.",
    items: ["Fertility assessment", "In-vitro fertilization", "Assisted reproductive services", "Reproductive health"],
  },
  {
    number: "03",
    icon: UsersRound,
    title: "Corporate healthcare",
    intro: "Workforce-health programmes designed around organisational needs.",
    items: ["Corporate retainership", "Pre-employment screening", "Annual medical check-ups", "Executive medicals", "Occupational health", "Workplace wellness", "Nationwide support"],
  },
  {
    number: "04",
    icon: Settings2,
    title: "Medical technology solutions",
    intro: "End-to-end support across the medical-equipment lifecycle.",
    items: ["Equipment procurement", "Installation", "Preventive maintenance", "Repairs", "Biomedical engineering support"],
  },
  {
    number: "05",
    icon: Landmark,
    title: "Healthcare consulting",
    intro: "Strategic and operational guidance for stronger health systems.",
    items: ["Hospital planning & development", "Regulatory compliance", "Quality improvement", "Operational advisory", "PPP support"],
  },
  {
    number: "06",
    icon: Network,
    title: "Hospital partnership & transformation",
    intro: "Partnership models that improve capability, governance and outcomes.",
    items: ["Strategic partnerships", "Management support", "Acquisitions", "Operational transformation"],
  },
] as const;

const facilities = [
  {
    name: "Sky High Medical Centre",
    location: "5B Adekunle Banjo Street, Magodo Phase II, Shangisha, Lagos",
    category: "Multi-specialist care",
    description: "Comprehensive medical and surgical care, specialist clinics, diagnostics, corporate healthcare, retainership programmes and home care services.",
  },
  {
    name: "Sky High ICU Centre",
    location: "Mainland Hospital, Yaba, Lagos",
    category: "Critical care",
    description: "Advanced intensive care for patients requiring life support, specialist monitoring and intensive medical management.",
  },
  {
    name: "Finnih Medical Centre",
    location: "Ikeja GRA, Lagos",
    category: "Primary & specialist care",
    description: "Accessible, patient-centred primary and specialist healthcare, preventive health, diagnostics and corporate healthcare.",
  },
  {
    name: "Lifecentre Medical Services",
    location: "Ikeja GRA • Ketu • Alimosho • Nationwide",
    category: "Corporate & occupational health",
    description: "Diagnostics, occupational health, preventive care and corporate medical solutions through multiple facilities and a trusted nationwide partner network.",
  },
  {
    name: "Kindred Path Fertility Centre",
    location: "LASUTH, Ikeja, Lagos",
    category: "Fertility",
    description: "Fertility assessment, IVF, reproductive health and personalised fertility care through a strategic public-private partnership.",
  },
  {
    name: "Zendale Endoscopy Centre",
    location: "LASUTH, Ikeja, Lagos",
    category: "Endoscopy",
    description: "Advanced diagnostic and therapeutic gastrointestinal procedures delivered by experienced specialists and modern technology.",
  },
  {
    name: "Lifecentre Med Support",
    location: "LASUTH, Ikeja, Lagos",
    category: "Biomedical engineering",
    description: "Medical-equipment procurement, installation, preventive maintenance, repairs, lifecycle management and technical support.",
  },
  {
    name: "VHELAR Consulting",
    location: "Lagos, Nigeria",
    category: "Healthcare consulting",
    description: "Hospital planning, regulatory compliance, quality improvement, operational advisory and public-private partnership support.",
  },
] as const;

const reasons = [
  "One trusted partner for complete healthcare solutions",
  "Integrated network of specialist healthcare providers",
  "Corporate and occupational healthcare expertise",
  "Advanced medical technology and specialist services",
  "Healthcare consulting and hospital-development expertise",
  "Nationwide coverage through a trusted partner network",
  "Strategic public and private sector partnerships",
  "Commitment to quality, innovation and patient-centred care",
] as const;

export default function ZendalePage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#0d2440]">
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/15 bg-[#082544]/35 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-8 xl:px-12">
          <Link href="/zendale" className="flex items-center gap-3" aria-label="Zendale Limited home">
            <Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={46} height={48} className="h-10 w-auto rounded-md bg-white p-1 object-contain" priority />
            <div>
              <p className="text-sm font-black">Zendale Limited</p>
              <p className="mt-1 text-[8px] font-bold uppercase tracking-[.19em] text-white/55">Integrated healthcare solutions</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 text-xs font-extrabold" aria-label="Zendale navigation">
            <a href="#capabilities" className="hidden rounded-full px-4 py-2 text-white/75 transition hover:text-white md:inline-flex">Capabilities</a>
            <a href="#network" className="hidden rounded-full px-4 py-2 text-white/75 transition hover:text-white md:inline-flex">Network</a>
            <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white transition hover:bg-white/15">BUA Outreach</Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#071f3a] text-white">
        <Image src="/outreach/outreach-3.webp" alt="Zendale healthcare team supporting participants" fill priority className="object-cover object-center opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,25,48,.96)_0%,rgba(5,25,48,.86)_43%,rgba(5,25,48,.36)_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -right-28 top-24 size-[420px] rounded-full border-[80px] border-white/[.035]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-12 xl:px-12 xl:pb-14">
          <div className="max-w-[980px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-black uppercase tracking-[.19em] text-[#8bc5ef] backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-[#8bc5ef]" />
              Integrated healthcare solutions
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(3.6rem,8vw,8.8rem)] font-bold leading-[.82] tracking-[-.075em]">
              One partner.
              <span className="mt-2 block text-[#8bc5ef]">Complete healthcare solutions.</span>
            </h1>
            <p className="mt-8 max-w-[760px] text-[15px] leading-8 text-white/70 sm:text-lg sm:leading-9">
              Zendale connects specialist healthcare institutions, clinical expertise, medical technology, consulting capability and strategic partnerships to solve complex healthcare needs across Nigeria.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#network" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-black text-[#0a2b4f] transition hover:-translate-y-0.5">
                Explore our network <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="inline-flex h-14 items-center justify-center rounded-full border border-white/24 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">Partner with Zendale</a>
            </div>
          </div>

          <div className="mt-12 grid border-y border-white/15 lg:grid-cols-3">
            {[
              ["01", "Clinical care", "From preventive health to specialist and intensive care."],
              ["02", "Health systems", "Consulting, quality improvement and operational transformation."],
              ["03", "National reach", "Corporate-health support through a trusted partner network."],
            ].map(([number, title, body], index) => (
              <div key={number} className={`grid grid-cols-[38px_1fr] gap-3 py-4 lg:px-5 ${index < 2 ? "border-b border-white/15 lg:border-b-0 lg:border-r" : ""}`}>
                <span className="pt-0.5 text-[9px] font-black tracking-[.2em] text-[#8bc5ef]">{number}</span>
                <div><p className="text-xs font-black">{title}</p><p className="mt-1 text-[10px] leading-4 text-white/52">{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#21639e]">About Zendale</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-6xl">A connected healthcare company, not a single facility.</h2>
          </div>
          <div className="grid gap-6 text-[14px] leading-7 text-[#59697b] md:grid-cols-2">
            <p>Zendale Limited is an integrated healthcare solutions company committed to transforming healthcare delivery through quality clinical services, specialist care, healthcare consulting, medical technology and corporate health solutions.</p>
            <p>Rather than operating as one hospital, Zendale brings together a network of specialist institutions and strategic partnerships for individuals, organisations, healthcare providers and government institutions.</p>
            <p>Our model combines clinical excellence, healthcare innovation, operational expertise and strategic partnerships to improve healthcare access and outcomes across Nigeria.</p>
            <p>Whether the need is specialist care, fertility treatment, occupational health, equipment support, consulting or nationwide corporate healthcare, Zendale provides one coordinated route to the right solution.</p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-y border-[#d9d5ce] bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#21639e]">What we deliver</p>
              <h2 className="mt-4 font-serif text-4xl font-bold tracking-[-.05em] sm:text-6xl">Six capabilities.<br />One accountable partner.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#627184] lg:justify-self-end">A coordinated portfolio that supports clinical care, workforce health, medical technology and healthcare-system development.</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-[#dfe4e9] bg-[#dfe4e9] md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map(({ number, icon: Icon, title, intro, items }) => (
              <article key={number} className="group bg-[#fbfcfd] p-6 transition hover:bg-[#f4f8fb] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-[.2em] text-[#a60f27]">{number}</span>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#eaf2f8] text-[#1c609a]"><Icon className="size-5" /></div>
                </div>
                <h3 className="mt-7 text-lg font-black tracking-[-.025em] text-[#142c47]">{title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#6a7888]">{intro}</p>
                <div className="mt-6 grid gap-2">
                  {items.map((item) => <div key={item} className="flex items-start gap-2 text-[10px] leading-4 text-[#4f6073]"><Check className="mt-0.5 size-3.5 shrink-0 text-[#27835e]" />{item}</div>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className="bg-[#0a2849] text-white">
        <div className="mx-auto max-w-[1600px] px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#8bc5ef]">The Zendale healthcare network</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-6xl">Specialist institutions.<br />One coordinated system.</h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-white/60">Clinical care, critical care, fertility, endoscopy, biomedical engineering and consulting connected through a single healthcare partner.</p>
              <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-[#8bc5ef]"><MapPin className="size-4" /> Lagos base · Nationwide partner coverage</div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15">
            {facilities.map((facility, index) => (
              <article key={facility.name} className="group grid gap-4 border-b border-white/15 py-6 transition hover:bg-white/[.035] sm:grid-cols-[52px_1fr] lg:grid-cols-[70px_260px_1fr_24px] lg:items-center lg:px-4">
                <span className="text-[9px] font-black tracking-[.2em] text-[#f0c53a]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[.16em] text-[#8bc5ef]">{facility.category}</p>
                  <h3 className="mt-2 text-lg font-black tracking-[-.02em]">{facility.name}</h3>
                </div>
                <div>
                  <p className="flex items-start gap-2 text-[9px] font-bold uppercase tracking-[.08em] text-white/42"><MapPin className="mt-0.5 size-3 shrink-0" />{facility.location}</p>
                  <p className="mt-2 max-w-2xl text-[11px] leading-5 text-white/58">{facility.description}</p>
                </div>
                <ChevronRight className="hidden size-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white/70 lg:block" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-18 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-24">
          <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#dbe7f0]">
            <Image src="/outreach/outreach-1.webp" alt="Zendale health professional consulting with a participant" fill className="object-cover" sizes="(min-width:1024px) 52vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,25,48,.78))]" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-[#082746]/80 p-5 text-white backdrop-blur-xl">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#8bc5ef]">Healthcare with purpose</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/74">We connect clinical care, operational expertise and strategic partnerships to build stronger healthcare systems and healthier communities.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#21639e]">Why choose Zendale</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-6xl">Built to solve the full healthcare journey.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {reasons.map((reason) => <div key={reason} className="flex items-start gap-3 border-t border-[#dce2e7] pt-4 text-[11px] font-bold leading-5 text-[#40536a]"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#27835e]" />{reason}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#eaf1f6]">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-18 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#21639e]">Let’s partner with you</p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-6xl">Stronger healthcare systems. Healthier organisations. Healthier communities.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#5e6d7f]">Whether you need specialist care, corporate healthcare, medical equipment support, consulting or a hospital partnership, Zendale has the expertise and network to support your goals.</p>
          </div>
          <div className="rounded-[24px] bg-[#0a2849] p-6 text-white shadow-[0_24px_60px_rgba(10,40,73,.18)] sm:p-7">
            <div className="flex items-center gap-3">
              <Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={46} height={48} className="h-10 w-auto rounded bg-white p-1 object-contain" />
              <div><p className="text-sm font-black">Zendale Limited</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[.17em] text-white/45">One Partner. Complete Healthcare Solutions.</p></div>
            </div>
            <div className="mt-6 grid gap-4 border-t border-white/12 pt-5 text-sm">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-[#8bc5ef]" /><div><p className="font-black">Lagos, Nigeria</p><p className="mt-1 text-[10px] text-white/45">Corporate office</p></div></div>
              <div className="flex items-start gap-3"><Building2 className="mt-0.5 size-4 text-[#8bc5ef]" /><div><p className="font-black">+234 XXX XXX XXXX</p><p className="mt-1 text-[10px] text-white/45">Phone placeholder</p></div></div>
              <div className="flex items-start gap-3"><Hospital className="mt-0.5 size-4 text-[#8bc5ef]" /><div><p className="font-black">contact@placeholder.com</p><p className="mt-1 text-[10px] text-white/45">Email placeholder</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#061a31] text-white">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-5 py-7 sm:px-8 md:flex-row md:items-center xl:px-12">
          <div className="flex items-center gap-3"><Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={40} height={42} className="h-8 w-auto rounded bg-white p-1 object-contain" /><div><p className="text-xs font-black">Zendale Limited</p><p className="mt-1 text-[7px] font-bold uppercase tracking-[.18em] text-white/38">One Partner. Complete Healthcare Solutions.</p></div></div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-white/48"><Link href="/" className="transition hover:text-white">BUA Health Outreach</Link><Link href="/lookup" className="transition hover:text-white">Participant lookup</Link><Link href="/staff/login" className="transition hover:text-white">Authorised personnel</Link></div>
        </div>
      </footer>
    </main>
  );
}
