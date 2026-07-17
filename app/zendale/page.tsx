import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Building2, Check, HeartPulse, Landmark, Microscope,
  Network, Settings2, ShieldCheck, Stethoscope, UsersRound, Wrench
} from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";

const services = [
  { icon: Stethoscope, title: "Clinical & specialist healthcare", items: ["General medical services", "Specialist consultations", "Intensive care services", "Endoscopy and diagnostics", "Telemedicine", "Preventive healthcare"] },
  { icon: HeartPulse, title: "Fertility & women’s health", items: ["Fertility assessment", "In-vitro fertilization", "Assisted reproductive services", "Reproductive health"] },
  { icon: UsersRound, title: "Corporate healthcare", items: ["Corporate retainership", "Pre-employment screening", "Annual and executive medicals", "Occupational health", "Workplace wellness", "Nationwide support"] },
  { icon: Wrench, title: "Medical technology solutions", items: ["Equipment procurement", "Installation", "Preventive maintenance", "Repairs", "Biomedical engineering support"] },
  { icon: Settings2, title: "Healthcare consulting", items: ["Hospital planning and development", "Regulatory compliance", "Quality improvement", "Operational advisory", "PPP support"] },
  { icon: Network, title: "Hospital partnership & transformation", items: ["Strategic partnerships", "Management support", "Acquisitions", "Operational transformation"] },
];

const network = [
  ["Sky High Medical Centre", "Magodo Phase II, Lagos", "Multi-specialist medical and surgical care, specialist clinics, diagnostics, corporate healthcare, retainership programmes and home care."],
  ["Sky High ICU Centre", "Mainland Hospital, Yaba, Lagos", "Advanced critical care for patients requiring life support, specialist monitoring and intensive medical management."],
  ["Finnih Medical Centre", "Ikeja GRA, Lagos", "Accessible, patient-centred primary and specialist healthcare with preventive health, diagnostics and corporate healthcare."],
  ["Lifecentre Medical Services", "Ikeja GRA • Ketu • Alimosho • Nationwide", "Comprehensive diagnostics, occupational health, preventive care and corporate medical solutions through a trusted partner network."],
  ["Kindred Path Fertility Centre", "LASUTH, Ikeja, Lagos", "Specialist fertility assessment, IVF, reproductive health and personalised fertility care through a strategic public-private partnership."],
  ["Zendale Endoscopy Centre", "LASUTH, Ikeja, Lagos", "Advanced diagnostic and therapeutic gastrointestinal procedures delivered by experienced specialists."],
  ["Lifecentre Med Support", "LASUTH, Ikeja, Lagos", "End-to-end biomedical engineering, equipment procurement, installation, maintenance, repairs and lifecycle management."],
  ["VHELAR Consulting", "Lagos, Nigeria", "Hospital planning, regulatory compliance, quality improvement, operational advisory and public-private partnership support."],
];

const strengths = [
  "One trusted partner for complete healthcare solutions",
  "Integrated network of specialist healthcare providers",
  "Corporate and occupational healthcare expertise",
  "Advanced medical technology and specialist services",
  "Healthcare consulting and hospital development expertise",
  "Nationwide coverage through a trusted partner network",
  "Strategic public and private sector partnerships",
  "Commitment to quality, innovation and patient-centred care",
];

export default function ZendalePage() {
  return (
    <main className="bg-[#f6f3ed] text-[#152538]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15">
        <div className="mx-auto flex h-20 max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20">BUA Health Outreach</Link>
          <PoweredBy inverse compact />
        </div>
      </header>

      <section className="relative min-h-[760px] overflow-hidden bg-[#0b2f58] text-white">
        <Image src="/outreach/outreach-4.webp" alt="Zendale healthcare outreach team" fill priority className="object-cover object-center opacity-42" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,55,.98)_0%,rgba(7,28,55,.86)_46%,rgba(7,28,55,.2)_100%)]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-[1540px] items-end px-5 pb-20 pt-36 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[.18em] text-white/80 backdrop-blur-md"><ShieldCheck className="size-4 text-[#f2c230]" /> Integrated healthcare solutions</div>
            <h1 className="max-w-4xl text-balance text-[clamp(3.5rem,8vw,8.5rem)] font-black leading-[.84] tracking-[-.075em]">One partner.<br /><span className="text-[#74b8ff]">Complete healthcare solutions.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">Zendale brings together specialist healthcare institutions, technology, consulting expertise and strategic partnerships to improve access and outcomes across Nigeria.</p>
            <div className="mt-10 flex flex-wrap gap-3"><a href="#network" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#0b2f58] transition hover:translate-y-[-1px]">Explore our network <ArrowRight className="size-4" /></a><a href="#contact" className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10">Partner with Zendale</a></div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9d4ca] bg-white">
        <div className="mx-auto grid max-w-[1540px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12 lg:py-28">
          <div><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2a67a5]">About Zendale</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] text-[#13253b] sm:text-5xl">Healthcare, connected around what people and organisations actually need.</h2></div>
          <div className="space-y-6 text-lg leading-9 text-[#596675]"><p>Zendale Limited is an integrated healthcare solutions company committed to transforming healthcare delivery through quality clinical services, specialist care, healthcare consulting, medical technology and corporate health solutions.</p><p>Rather than operating as a single hospital, Zendale connects a network of specialist institutions and strategic partnerships for individuals, organisations, providers and government institutions.</p><p>Our approach combines clinical excellence, innovation, operational expertise and partnerships to strengthen healthcare access and outcomes across Nigeria.</p></div>
        </div>
      </section>

      <section className="bg-[#f6f3ed]">
        <div className="mx-auto max-w-[1540px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl"><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#b5122b]">What we deliver</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] text-[#13253b] sm:text-6xl">A complete healthcare capability, not a collection of disconnected services.</h2></div>
          <div className="mt-14 grid border-l border-t border-[#d8d2c7] md:grid-cols-2 xl:grid-cols-3">
            {services.map(({icon: Icon,title,items}) => <article key={title} className="group border-b border-r border-[#d8d2c7] bg-[#f6f3ed] p-7 transition hover:bg-white sm:p-9"><Icon className="size-6 text-[#2a67a5]" /><h3 className="mt-10 text-2xl font-black tracking-[-.04em]">{title}</h3><ul className="mt-6 space-y-2.5 text-sm text-[#64707d]">{items.map(item=><li key={item} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b5122b]" />{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section id="network" className="bg-[#0b2f58] text-white">
        <div className="mx-auto max-w-[1540px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><div className="lg:sticky lg:top-10 lg:self-start"><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#74b8ff]">The Zendale healthcare network</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] sm:text-6xl">Specialist institutions. One coordinated network.</h2><p className="mt-6 max-w-md text-base leading-7 text-white/60">Clinical care, critical care, fertility, endoscopy, medical technology and consulting connected through one healthcare partner.</p></div><div className="divide-y divide-white/15 border-t border-white/15">{network.map(([name,location,description],i)=><article key={name} className="grid gap-4 py-7 sm:grid-cols-[50px_1fr] lg:grid-cols-[60px_.75fr_1.25fr]"><span className="text-xs font-black text-[#f2c230]">{String(i+1).padStart(2,"0")}</span><div><h3 className="text-xl font-black tracking-[-.03em]">{name}</h3><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#74b8ff]">{location}</p></div><p className="text-sm leading-7 text-white/62">{description}</p></article>)}</div></div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1540px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem]"><Image src="/outreach/outreach-3.webp" alt="Zendale outreach team engaging participants" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" /></div>
          <div className="flex flex-col justify-center"><p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2a67a5]">Why choose Zendale</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] sm:text-5xl">Built to solve healthcare needs across the full journey.</h2><div className="mt-10 grid gap-4 sm:grid-cols-2">{strengths.map(item=><div key={item} className="flex gap-3 border-t border-[#ddd8cf] pt-4 text-sm font-semibold leading-6 text-[#425160]"><Check className="mt-0.5 size-4 shrink-0 text-[#287a55]" />{item}</div>)}</div></div>
        </div>
      </section>

      <section id="contact" className="bg-[#f2c230] text-[#13253b]">
        <div className="mx-auto grid max-w-[1540px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20"><div><p className="text-[11px] font-black uppercase tracking-[.22em]">Let’s partner with you</p><h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-6xl">Stronger healthcare systems. Healthier organisations. Healthier communities.</h2></div><div className="space-y-2 text-sm font-bold"><p>Phone: +234 XXX XXX XXXX</p><p>Email: contact@placeholder.com</p><p>Lagos, Nigeria</p></div></div>
      </section>

      <footer className="bg-[#071c37] text-white"><div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center lg:px-12"><BuaMark inverse /><div className="flex flex-col gap-3 md:items-end"><PoweredBy inverse /><div className="flex gap-5 text-xs text-white/45"><Link href="/">Outreach registration</Link><Link href="/lookup">Participant lookup</Link><Link href="/staff/login">Authorised personnel</Link></div></div></div></footer>
    </main>
  );
}
