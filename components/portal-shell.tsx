"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Bell,
  Building2,
  ChevronDown,
  ClipboardList,
  Download,
  HeartHandshake,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  Search,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { BuaMark, PoweredBy } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const staffNav = [
  { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/participants", label: "Participants", icon: Users },
  { href: "/staff/referrals-followups", label: "Referrals & follow-ups", icon: HeartHandshake },
  { href: "/staff/change-password", label: "Security", icon: LockKeyhole },
];

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/participants", label: "Participants", icon: Users },
  { href: "/admin/screenings", label: "Screenings", icon: Stethoscope },
  { href: "/admin/referrals-followups", label: "Referrals & follow-ups", icon: HeartHandshake },
  { href: "/admin/referral-hospitals", label: "Referral hospitals", icon: Building2 },
  { href: "/admin/staff", label: "Staff management", icon: ClipboardList },
  { href: "/admin/export", label: "Excel export", icon: Download },
  { href: "/admin/change-password", label: "Security", icon: Settings },
];

function SidebarContent({ mode, close }: { mode: "staff" | "admin"; close?: () => void }) {
  const pathname = usePathname();
  const items = mode === "admin" ? adminNav : staffNav;
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-5 pt-6"><BuaMark /></div>
      <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#2b9c92] text-sm font-bold">{mode === "admin" ? "AM" : "KL"}</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{mode === "admin" ? "Ada Mensah" : "Kemi Lawal"}</p>
            <p className="truncate text-xs text-white/60">{mode === "admin" ? "System Administrator" : "Medical Staff"}</p>
          </div>
          <ChevronDown className="ml-auto size-4 text-white/50" />
        </div>
      </div>
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-2">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">Workspace</p>
        {items.map((item) => {
          const active = pathname === item.href || (item.href.includes("participants") && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/64 transition hover:bg-white/8 hover:text-white",
                active && "bg-white text-[var(--navy)] shadow-lg hover:bg-white hover:text-[var(--navy)]",
              )}
            >
              {active && <motion.span layoutId={`${mode}-active-nav`} className="absolute inset-0 rounded-xl bg-white" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <Icon className={cn("relative size-4.5", active ? "text-[var(--primary)]" : "text-white/55 group-hover:text-white")} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="m-4 rounded-2xl border border-white/10 bg-white/6 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/75"><Activity className="size-4 text-[#70d8ca]" /> System operational</div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[92%] rounded-full bg-[#62cfbf]" /></div>
        <p className="mt-2 text-[11px] leading-5 text-white/45">Last sync: a few seconds ago</p>
      </div>
      <div className="border-t border-white/10 px-5 py-4"><PoweredBy /></div>
    </div>
  );
}

export function PortalShell({ mode, title, description, children, action }: { mode: "staff" | "admin"; title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#eef5f3] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] overflow-hidden bg-[var(--navy)] lg:block">
        <div className="shell-grid absolute inset-0 opacity-20" />
        <div className="relative h-full"><SidebarContent mode={mode} /></div>
      </aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button aria-label="Close navigation" className="fixed inset-0 z-40 bg-[#041d27]/55 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 w-[290px] overflow-hidden bg-[var(--navy)] lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", stiffness: 350, damping: 34 }}>
              <button className="absolute right-3 top-3 z-10 rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white" onClick={() => setMobileOpen(false)}><X className="size-5" /></button>
              <div className="shell-grid absolute inset-0 opacity-20" />
              <div className="relative h-full"><SidebarContent mode={mode} close={() => setMobileOpen(false)} /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 border-b border-[#d6e4e0] bg-white/88 backdrop-blur-xl">
          <div className="flex h-[76px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu className="size-5" /></Button>
            <div className="hidden min-w-0 max-w-md flex-1 sm:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" />
                <Input className="h-10 border-transparent bg-[#f0f5f4] pl-10 shadow-none focus:bg-white" placeholder="Search participant, registration number…" />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative"><Bell className="size-5" /><span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-[var(--coral)]" /></Button>
              <div className="hidden h-8 w-px bg-[#dbe6e3] sm:block" />
              <Button variant="ghost" className="hidden gap-2 sm:inline-flex"><LogOut className="size-4" /> Sign out</Button>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#cfe3df] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#527177]">
                  {mode === "admin" ? "Admin portal" : "Staff portal"}
                </div>
                <h1 className="text-balance text-2xl font-bold tracking-[-0.035em] text-[var(--navy)] sm:text-3xl">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#627980]">{description}</p>}
              </div>
              {action}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
