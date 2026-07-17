import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BuaMark({ compact = false, inverse = false, className }: { compact?: boolean; inverse?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="BUA Health Outreach home" className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl border shadow-sm", inverse ? "border-white/15 bg-white" : "border-[#e4ded5] bg-white")}>
        <Image src="/brand/bua-logo.png" alt="BUA" width={46} height={50} className="h-10 w-auto object-contain" priority />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className={cn("block text-[15px] font-extrabold tracking-[-0.02em]", inverse ? "text-white" : "text-[#1b2028]")}>BUA Health Outreach</span>
          <span className={cn("mt-0.5 block text-[10px] font-bold uppercase tracking-[0.16em]", inverse ? "text-white/58" : "text-[#777d86]")}>Registration & Screening</span>
        </span>
      )}
    </Link>
  );
}

export function PoweredBy({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-xs", inverse ? "text-white/55" : "text-[#717780]") }>
      {!compact && <span>Powered by</span>}
      <span className={cn("inline-flex items-center gap-2 font-semibold", inverse ? "text-white" : "text-[#1f2d3f]") }>
        <Image src="/brand/zendale-logo.png" alt="Zendale Limited" width={28} height={28} className="size-6 object-contain" />
        <span>Zendale Limited</span>
      </span>
    </div>
  );
}
