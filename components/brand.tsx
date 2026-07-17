import Link from "next/link";
import { cn } from "@/lib/utils";

export function BuaMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="BUA Health Outreach home" className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[var(--navy)] text-white shadow-[0_10px_25px_rgba(8,47,64,.22)]">
        <span className="absolute -right-2 -top-2 size-6 rounded-full bg-[var(--gold)]/90" />
        <span className="absolute -bottom-3 -left-2 size-8 rounded-full bg-[#2cb6a8]/70" />
        <span className="relative text-[13px] font-extrabold tracking-[-0.05em]">BUA</span>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-[15px] font-extrabold tracking-[-0.02em] text-[var(--navy)]">BUA Health Outreach</span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b8289]">Registration & Screening</span>
        </span>
      )}
    </Link>
  );
}

export function PoweredBy() {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#73878d]">
      <span>Powered by</span>
      <span className="font-extrabold tracking-[0.02em] text-[#234b5a]">ZENDALE</span>
    </div>
  );
}
