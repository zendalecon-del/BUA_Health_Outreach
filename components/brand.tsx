import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BuaMark({ compact = false, inverse = false, className }: { compact?: boolean; inverse?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="BUA Health Outreach home" className={cn("inline-flex items-center gap-3.5", className)}>
      <Image
        src="/brand/bua-logo.png"
        alt="BUA"
        width={52}
        height={57}
        className="h-11 w-auto shrink-0 object-contain sm:h-12"
        priority
      />
      {!compact && (
        <span className="leading-none">
          <span className={cn("block text-[15px] font-black tracking-[-0.025em]", inverse ? "text-white" : "text-[#17202a]")}>BUA Health Outreach</span>
          <span className={cn("mt-2 block text-[9px] font-bold uppercase tracking-[0.22em]", inverse ? "text-white/55" : "text-[#68717c]")}>Registration &amp; Screening</span>
        </span>
      )}
    </Link>
  );
}

export function ZendaleMark({ inverse = false, compact = false, className }: { inverse?: boolean; compact?: boolean; className?: string }) {
  return (
    <Link href="/zendale" aria-label="Zendale Limited home" className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("flex size-10 items-center justify-center rounded-xl", inverse ? "bg-white/10" : "bg-[#eef4fa]")}>
        <Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={28} height={30} className="h-6 w-auto object-contain" priority />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={cn("block text-[15px] font-black tracking-[-.025em]", inverse ? "text-white" : "text-[#102d4a]")}>Zendale Limited</span>
          <span className={cn("mt-1.5 block text-[8px] font-black uppercase tracking-[.22em]", inverse ? "text-white/50" : "text-[#6b7b8d]")}>Integrated Healthcare Solutions</span>
        </span>
      )}
    </Link>
  );
}

export function PoweredBy({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-[11px]", inverse ? "text-white/48" : "text-[#6b7480]") }>
      {!compact && <span className="uppercase tracking-[.12em]">Powered by</span>}
      <span className={cn("inline-flex items-center gap-2 font-bold", inverse ? "text-white" : "text-[#173f70]") }>
        <Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={25} height={27} className="h-6 w-auto object-contain" />
        <span>Zendale Limited</span>
      </span>
    </div>
  );
}
