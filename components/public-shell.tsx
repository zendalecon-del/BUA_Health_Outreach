import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { BuaMark, PoweredBy } from "@/components/brand";

export function PublicShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <main className="min-h-screen bg-[#f6f4ef]">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 sm:px-6 lg:px-10">
        <header className="no-print flex items-center justify-between py-5 sm:py-7">
          <BuaMark />
          <div className="hidden items-center gap-2 rounded-full border border-[#ded8ce] bg-white px-4 py-2 text-xs font-semibold text-[#4d5561] shadow-sm sm:flex">
            <LockKeyhole className="size-4 text-[var(--zendale-blue)]" /> Confidential participant experience
          </div>
        </header>
        <div className={narrow ? "mx-auto w-full max-w-5xl flex-1" : "flex-1"}>{children}</div>
        <footer className="no-print mt-auto flex flex-col items-center justify-between gap-4 border-t border-[#dedbd3] py-6 text-center sm:flex-row sm:text-left">
          <PoweredBy />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#747a83]">
            <span>© 2026 BUA Health Outreach</span>
            <Link className="hover:text-[var(--bua-red)]" href="/lookup">Participant lookup</Link>
            <Link className="hover:text-[var(--bua-red)]" href="/staff/login">Authorised personnel</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
