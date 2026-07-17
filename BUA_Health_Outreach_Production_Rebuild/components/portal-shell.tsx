"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Building2,
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
  { href: "/staff/dashboard", label: "Today", icon: LayoutDashboard },
  { href: "/staff/participants", label: "Participants", icon: Users },
  { href: "/staff/referrals-followups", label: "Referrals & follow-ups", icon: HeartHandshake },
  { href: "/staff/change-password", label: "Account security", icon: LockKeyhole },
];

const adminNav = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/participants", label: "Participants", icon: Users },
  { href: "/admin/screenings", label: "Screenings", icon: Stethoscope },
  { href: "/admin/referrals-followups", label: "Referrals & follow-ups", icon: HeartHandshake },
  { href: "/admin/referral-hospitals", label: "Referral hospitals", icon: Building2 },
  { href: "/admin/staff", label: "Staff management", icon: ClipboardList },
  { href: "/admin/export", label: "Excel export", icon: Download },
  { href: "/admin/change-password", label: "Account security", icon: Settings },
];

type Profile = { full_name: string; staff_id: string; role: string };

function Sidebar({ mode, profile, close }: { mode: "staff" | "admin"; profile: Profile; close?: () => void }) {
  const pathname = usePathname();
  const items = mode === "admin" ? adminNav : staffNav;
  const initials = profile.full_name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#0b2038] text-white">
      <div className="brand-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="relative flex h-full flex-col">
        <div className="border-b border-white/10 px-6 py-6"><BuaMark inverse /></div>

        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-[#b5122b] text-xs font-black ring-4 ring-white/5">{initials}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{profile.full_name}</p>
              <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-[.1em] text-white/42">{profile.staff_id} · {profile.role.replace("_", " ")}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-5">
          <p className="px-6 pb-3 text-[9px] font-black uppercase tracking-[.2em] text-white/30">Workspace</p>
          {items.map((item) => {
            const active = pathname === item.href || (item.href.includes("participants") && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn("relative flex items-center gap-3 border-l-2 px-6 py-3.5 text-sm font-bold transition", active ? "border-[#f2c230] bg-white/8 text-white" : "border-transparent text-white/55 hover:bg-white/5 hover:text-white")}
              >
                {active && <motion.span layoutId={`${mode}-active-nav`} className="absolute inset-0 bg-white/4" transition={{ type: "spring", stiffness: 420, damping: 35 }} />}
                <Icon className={cn("relative size-[18px]", active ? "text-[#f2c230]" : "text-white/40")} />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-6 py-5">
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#7bb6dd]">Privacy reminder</p>
          <p className="mt-2 text-[11px] leading-5 text-white/42">Access only information required for your assigned outreach duties.</p>
        </div>
        <div className="border-t border-white/10 px-6 py-5"><PoweredBy inverse /></div>
      </div>
    </div>
  );
}

export function PortalShell({ mode, profile, title, description, children, action }: { mode: "staff" | "admin"; profile: Profile; title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f2ed] lg:grid lg:grid-cols-[252px_1fr]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] lg:block"><Sidebar mode={mode} profile={profile} /></aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.button aria-label="Close navigation" className="fixed inset-0 z-40 bg-[#071526]/65 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 w-[286px] lg:hidden" initial={{ x: -310 }} animate={{ x: 0 }} exit={{ x: -310 }} transition={{ type: "spring", stiffness: 360, damping: 35 }}>
              <button className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/70 hover:bg-white/10" onClick={() => setOpen(false)}><X className="size-5" /></button>
              <Sidebar mode={mode} profile={profile} close={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 border-b border-[#ddd8cf] bg-[#fbfaf7]/94 backdrop-blur-xl">
          <div className="flex h-[68px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5" /></Button>
            <div className="hidden text-[10px] font-black uppercase tracking-[.18em] text-[#7d858e] sm:block">BUA Health Outreach · {mode === "admin" ? "Administration" : "Staff operations"}</div>
            <div className="ml-auto hidden w-full max-w-sm sm:block">
              <div className="relative"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7d858e]" /><Input className="h-10 border-[#ddd8cf] bg-white pl-10 shadow-none" placeholder="Search participant or registration number" /></div>
            </div>
            <div className="ml-auto flex items-center gap-1 sm:ml-2">
              <Button variant="ghost" size="icon" className="relative"><Bell className="size-5" /><span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#b5122b]" /></Button>
              <form action="/api/auth/logout" method="post"><Button type="submit" variant="ghost" className="hidden gap-2 sm:inline-flex"><LogOut className="size-4" /> Sign out</Button></form>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#b5122b]">{mode === "admin" ? "Administrator portal" : "Staff portal"}</p>
                <h1 className="mt-2 text-balance text-3xl font-black tracking-[-.05em] text-[#17202a] sm:text-[2.4rem]">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68727d]">{description}</p>}
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
