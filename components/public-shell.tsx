import { BuaMark, PoweredBy } from "@/components/brand";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function PublicShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 sm:px-6 lg:px-10">
        <header className="no-print flex items-center justify-between py-5 sm:py-7">
          <BuaMark />
          <div className="hidden items-center gap-2 rounded-full border border-[#d5e6e2] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#4e6c73] shadow-sm sm:flex">
            <ShieldCheck className="size-4 text-[var(--primary)]" /> Confidential & secure
          </div>
        </header>
        <div className={narrow ? "mx-auto w-full max-w-4xl flex-1" : "flex-1"}>{children}</div>
        <footer className="no-print mt-auto flex flex-col items-center justify-between gap-4 border-t border-[#dce8e5] py-6 text-center sm:flex-row sm:text-left">
          <PoweredBy />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6f8389]">
            <span>© 2026 BUA Health Outreach</span>
            <Link className="hover:text-[var(--primary)]" href="/lookup">Participant lookup</Link>
            <Link className="hover:text-[var(--primary)]" href="/staff/login">Authorised personnel</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
