import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CircleCheck,
} from "lucide-react";
import { ZendaleMark } from "@/components/brand";

const capabilities = [
  {
    number: "01",
    title: "Clinical & specialist healthcare",
    description: "Coordinated access to preventive, general, specialist and advanced clinical services.",
    items: ["General medical services", "Specialist consultations", "Intensive care", "Endoscopy", "Diagnostics", "Telemedicine", "Preventive healthcare"],
  },
  {
    number: "02",
    title: "Fertility & women’s health",
    description: "Personalised reproductive care supported by specialist expertise and modern treatment pathways.",
    items: ["Fertility assessment", "IVF", "Assisted reproductive services", "Reproductive health"],
  },
  {
    number: "03",
    title: "Corporate healthcare",
    description: "Workforce-health programmes designed around organisational risk, access and continuity of care.",
    items: ["Corporate retainership", "Pre-employment screening", "Annual medicals", "Executive medicals", "Occupational health", "Workplace wellness", "Nationwide support"],
  },
  {
    number: "04",
    title: "Medical technology solutions",
    description: "End-to-end support across the medical-equipment lifecycle.",
    items: ["Procurement", "Installation", "Preventive maintenance", "Repairs", "Biomedical engineering support"],
  },
  {
    number: "05",
    title: "Healthcare consulting",
    description: "Strategic and operational guidance for stronger institutions and more reliable health systems.",
    items: ["Hospital planning", "Regulatory compliance", "Quality improvement", "Operational advisory", "PPP support"],
  },
  {
    number: "06",
    title: "Hospital partnership & transformation",
    description: "Partnership models that strengthen capability, governance, service delivery and patient outcomes.",
    items: ["Strategic partnerships", "Management support", "Acquisitions", "Operational transformation"],
  },
] as const;

const network = [
  {
    number: "01",
    name: "Sky High Medical Centre",
    category: "Multi-specialist care",
    location: "Magodo Phase II, Lagos",
    description: "Comprehensive medical and surgical care, specialist clinics, diagnostics, corporate healthcare and home-care support.",
    href: "https://skyhighmedicalcentre.com/",
  },
  {
    number: "02",
    name: "Sky High ICU Centre",
    category: "Critical care",
    location: "Mainland Hospital, Yaba, Lagos",
    description: "Advanced intensive care for patients requiring specialist monitoring, life support and intensive medical management.",
    href: "https://skyhighmedicalcentre.com/sky-high-dialysis/",
  },
  {
    number: "03",
    name: "Finnih Medical Centre",
    category: "Primary & specialist care",
    location: "Ikeja GRA, Lagos",
    description: "Patient-centred primary and specialist healthcare, diagnostics, preventive health and corporate medical services.",
    href: "https://finnihmedicalcentre.com/",
  },
  {
    number: "04",
    name: "Lifecentre Medical Services",
    category: "Diagnostics & occupational health",
    location: "Ikeja GRA · Ketu · Alimosho · Nationwide support",
    description: "Diagnostics, preventive care, occupational health and corporate medical solutions through a trusted partner network.",
    href: "https://lifecentremedicals.com/",
  },
  {
    number: "05",
    name: "Kindred Path Fertility Centre",
    category: "Fertility & reproductive health",
    location: "LASUTH, Ikeja, Lagos",
    description: "Fertility assessment, IVF, assisted reproduction and personalised fertility care through a strategic public-private partnership.",
    href: "https://www.ifmkindredpathfertilitycentre.com/",
  },
  {
    number: "06",
    name: "Zendale Endoscopy Centre",
    category: "Endoscopy & gastroenterology",
    location: "LASUTH, Ikeja, Lagos",
    description: "Diagnostic and therapeutic gastrointestinal procedures supported by specialist expertise and advanced endoscopic technology.",
    href: "https://zendaleendoscopy.com/",
  },
  {
    number: "07",
    name: "Lifecentre Med Support",
    category: "Biomedical engineering",
    location: "LASUTH, Ikeja, Lagos",
    description: "Medical-equipment procurement, installation, preventive maintenance, repairs, lifecycle management and technical support.",
    href: "https://www.lifecentermedsupport.com/",
  },
  {
    number: "08",
    name: "VHELAR Consulting",
    category: "Healthcare consulting",
    location: "Lagos, Nigeria",
    description: "Hospital planning, regulatory compliance, quality improvement, operational advisory and public-private partnership support.",
    href: null,
  },
] as const;

const reasons = [
  "One accountable partner across the healthcare journey",
  "Specialist institutions connected through a coordinated network",
  "Corporate and occupational healthcare expertise",
  "Medical technology, consulting and clinical capability in one system",
  "Nationwide reach through trusted healthcare partnerships",
  "A patient-centred commitment to quality, access and better outcomes",
];

export default function ZendalePage() {
  return (
    <main className="min-h-screen bg-[#f3f6f8] text-[#102c49]">
      <header className="sticky top-0 z-50 border-b border-[#d8e0e6] bg-[#f7fafc]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1560px] items-center justify-between px-5 sm:px-8 xl:px-12">
          <ZendaleMark />
          <nav className="hidden items-center gap-7 text-[11px] font-black text-[#53677b] lg:flex" aria-label="Zendale navigation">
            <Link href="#about" className="transition hover:text-[#205f9b]">About</Link>
            <Link href="#capabilities" className="transition hover:text-[#205f9b]">Capabilities</Link>
            <Link href="#network" className="transition hover:text-[#205f9b]">Healthcare network</Link>
            <Link href="#contact" className="transition hover:text-[#205f9b]">Partnerships</Link>
          </nav>
          <Link href="#contact" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#123f70] px-5 text-[11px] font-black text-white transition hover:bg-[#0b315c]">
            Partner with Zendale <ArrowDown className="size-3.5" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#071d34] text-white">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:70px_70px]" />
        <div className="relative mx-auto grid min-h-[720px] max-w-[1560px] lg:grid-cols-[.94fr_1.06fr]">
          <div className="flex flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 xl:px-12 xl:py-20">
            <div className="max-w-[720px]">
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#8fc9ee]">Integrated healthcare solutions</p>
              <h1 className="mt-6 text-balance text-[clamp(3.2rem,6vw,6.8rem)] font-black leading-[.86] tracking-[-.07em]">
                One partner.
                <span className="mt-2 block text-[#91c9ec]">Complete healthcare solutions.</span>
              </h1>
              <p className="mt-7 max-w-[650px] text-[16px] leading-8 text-white/67">
                Zendale brings together specialist care, medical technology, corporate health, consulting expertise and strategic partnerships to solve healthcare needs through one coordinated system.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#network" className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-black text-[#0d3157] transition hover:-translate-y-0.5">
                  Explore our network <ArrowDown className="size-4" />
                </Link>
                <Link href="#capabilities" className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10">
                  View capabilities
                </Link>
              </div>
            </div>

            <div className="mt-12 grid border-y border-white/15 sm:grid-cols-3">
              {[
                ["01", "Clinical care", "Preventive, specialist and intensive care"],
                ["02", "Health systems", "Consulting, quality and transformation"],
                ["03", "National reach", "Corporate support through trusted partners"],
              ].map(([number, title, text], index) => (
                <div key={number} className={`py-5 sm:px-5 ${index < 2 ? "border-b border-white/15 sm:border-b-0 sm:border-r" : ""}`}>
                  <p className="text-[9px] font-black tracking-[.18em] text-[#7fc0e8]">{number}</p>
                  <p className="mt-3 text-sm font-black">{title}</p>
                  <p className="mt-1 text-[10px] leading-5 text-white/48">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px bg-white/15">
              <div className="relative row-span-2 overflow-hidden">
                <Image src="/outreach/outreach-1.webp" alt="Zendale clinician discussing healthcare options with a participant" fill priority className="object-cover object-[52%_center]" sizes="(min-width:1024px) 34vw, 50vw" />
              </div>
              <div className="relative overflow-hidden">
                <Image src="/outreach/outreach-3.webp" alt="Zendale team supporting a corporate health programme" fill className="object-cover object-center" sizes="(min-width:1024px) 24vw, 50vw" />
              </div>
              <div className="relative overflow-hidden">
                <Image src="/outreach/outreach-4.webp" alt="Zendale healthcare professional conducting a screening" fill className="object-cover object-center" sizes="(min-width:1024px) 24vw, 50vw" />
              </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(4,18,32,.78)_100%)]" />
            <div className="absolute inset-x-6 bottom-6 border-l-2 border-[#8fc9ee] pl-4 text-white sm:inset-x-8 sm:bottom-8">
              <p className="max-w-xl text-xl font-black leading-tight tracking-[-.035em] sm:text-2xl">Clinical care, operational expertise and strategic partnerships—connected around the need.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-[1560px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12 lg:py-28">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#2870aa]">About Zendale</p>
            <h2 className="mt-5 max-w-lg text-4xl font-black leading-[1] tracking-[-.055em] text-[#0f2d4a] sm:text-5xl">A connected healthcare company, not a single facility.</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl font-bold leading-9 tracking-[-.025em] text-[#183d60] sm:text-2xl">
              We coordinate institutions, specialists, technology and partnerships so individuals and organisations can reach the right healthcare solution through one accountable partner.
            </p>
            <div className="mt-8 grid gap-6 border-t border-[#dce4ea] pt-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-[#607285]">Our model combines clinical excellence, healthcare innovation, operational expertise and strategic partnerships to improve access and outcomes across Nigeria.</p>
              <p className="text-sm leading-7 text-[#607285]">From specialist medical care and fertility treatment to occupational health, medical equipment and hospital transformation, Zendale provides a coordinated route from need to solution.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 border-y border-[#d8e0e6] bg-[#eef3f6]">
        <div className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#2870aa]">What we deliver</p>
              <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-.055em] text-[#0f2d4a] sm:text-5xl">Six capabilities. One accountable partner.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#607285] lg:justify-self-end">A coordinated portfolio spanning clinical care, workforce health, medical technology and healthcare-system development.</p>
          </div>

          <div className="mt-14 grid border-t border-[#cfd9e1] lg:grid-cols-2">
            {capabilities.map((capability, index) => (
              <article key={capability.number} className={`grid gap-5 border-b border-[#cfd9e1] py-8 sm:grid-cols-[54px_1fr] lg:px-8 ${index % 2 === 0 ? "lg:border-r lg:pl-0" : "lg:pr-0"}`}>
                <span className="text-[10px] font-black tracking-[.18em] text-[#2c73aa]">{capability.number}</span>
                <div>
                  <h3 className="text-xl font-black tracking-[-.03em] text-[#163653]">{capability.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#657687]">{capability.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {capability.items.map((item) => <span key={item} className="inline-flex items-center gap-2 text-[11px] font-bold text-[#35516d]"><span className="size-1 rounded-full bg-[#4a8abd]" />{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-24 bg-[#071d34] text-white">
        <div className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#8fc9ee]">The Zendale healthcare network</p>
              <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-.055em] sm:text-5xl">Specialist institutions. One coordinated system.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/55 lg:justify-self-end">Select a facility to visit its official website. VHELAR remains unlinked until an official public profile is confirmed.</p>
          </div>

          <div className="mt-14 border-t border-white/15">
            {network.map((facility) => {
              const content = (
                <div className="group grid gap-4 border-b border-white/15 py-6 transition sm:grid-cols-[50px_1fr_160px_36px] sm:items-center lg:grid-cols-[60px_280px_1fr_220px_40px]">
                  <span className="text-[9px] font-black tracking-[.18em] text-[#7bb9df]">{facility.number}</span>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[.14em] text-white/42">{facility.category}</p>
                    <h3 className="mt-2 text-lg font-black tracking-[-.025em] text-white transition group-hover:text-[#9fd3f2]">{facility.name}</h3>
                  </div>
                  <p className="text-xs leading-6 text-white/52">{facility.description}</p>
                  <p className="text-[10px] font-bold leading-5 text-white/45">{facility.location}</p>
                  <div className="flex size-9 items-center justify-center rounded-full border border-white/18 text-white/70 transition group-hover:border-[#8fc9ee] group-hover:bg-[#8fc9ee] group-hover:text-[#082541]">
                    {facility.href ? <ArrowUpRight className="size-4" /> : <span className="text-[8px] font-black">—</span>}
                  </div>
                </div>
              );
              return facility.href ? (
                <a key={facility.number} href={facility.href} target="_blank" rel="noreferrer" aria-label={`Visit ${facility.name} website`} className="block">{content}</a>
              ) : (
                <div key={facility.number} title="Official public link not yet confirmed">{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1560px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.84fr_1.16fr] lg:px-12 lg:py-28">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#2870aa]">Why Zendale</p>
            <h2 className="mt-5 max-w-lg text-4xl font-black leading-[1] tracking-[-.055em] text-[#0f2d4a] sm:text-5xl">Built to solve the full healthcare journey.</h2>
          </div>
          <div className="grid border-y border-[#dbe3e9] sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason} className={`flex gap-3 border-b border-[#dbe3e9] py-5 sm:px-5 ${index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"} ${index >= reasons.length - 2 ? "sm:border-b-0" : ""}`}>
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-[#2a79ad]" />
                <p className="text-sm font-bold leading-6 text-[#294660]">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#d9eafa]">
        <div className="mx-auto grid max-w-[1560px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#236ca4]">Let’s partner with you</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[.98] tracking-[-.055em] text-[#0b2d4e] sm:text-6xl">Stronger healthcare systems. Healthier organisations. Healthier communities.</h2>
          </div>
          <div className="border-l border-[#a9c8df] pl-6 lg:self-end">
            <p className="text-sm leading-7 text-[#395a74]">Whether the need is specialist care, corporate healthcare, medical technology, consulting or a hospital partnership, Zendale has the expertise and network to support the next step.</p>
            <div className="mt-6 grid gap-4 text-sm font-black text-[#103a62]">
              <p>Phone: <span className="font-semibold text-[#58748b]">To be confirmed</span></p>
              <p>Email: <span className="font-semibold text-[#58748b]">To be confirmed</span></p>
              <p>Location: <span className="font-semibold text-[#58748b]">Lagos, Nigeria</span></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#06182a] text-white">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between xl:px-12">
          <div>
            <ZendaleMark inverse />
            <p className="mt-5 max-w-sm text-xs leading-6 text-white/46">One Partner. Complete Healthcare Solutions.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold text-white/52">
            <Link href="#about" className="hover:text-white">About</Link>
            <Link href="#capabilities" className="hover:text-white">Capabilities</Link>
            <Link href="#network" className="hover:text-white">Healthcare network</Link>
            <Link href="#contact" className="hover:text-white">Partnerships</Link>
            <span>© 2026 Zendale Limited</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
