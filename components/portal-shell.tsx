"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Bell, Building2, ClipboardList, Download, HeartHandshake, LayoutDashboard, LockKeyhole, LogOut, Menu, Search, Settings, Stethoscope, Users, X } from "lucide-react";
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

type Profile = { full_name: string; staff_id: string; role: string };

function Sidebar({ mode, profile, close }: { mode: "staff" | "admin"; profile: Profile; close?: () => void }) {
  const pathname = usePathname();
  const items = mode === "admin" ? adminNav : staffNav;
  const initials = profile.full_name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <div className="relative flex h-full flex-col overflow-hidden bg-[#17243a] text-white"><div className="brand-grid absolute inset-0 opacity-25"/><div className="relative flex h-full flex-col"><div className="px-5 pb-5 pt-6"><BuaMark inverse /></div><div className="mx-4 mb-5 rounded-2xl border border-white/10 bg-white/7 p-4"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[var(--bua-red)] text-sm font-black">{initials}</div><div className="min-w-0"><p className="truncate text-sm font-semibold">{profile.full_name}</p><p className="mt-0.5 truncate text-[11px] text-white/55">{profile.staff_id} · {profile.role.replace("_", " ")}</p></div></div></div><nav className="flex-1 space-y-1 overflow-y-auto px-3"><p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[.17em] text-white/35">Workspace</p>{items.map((item) => { const active = pathname === item.href || (item.href.includes("participants") && pathname.startsWith(item.href)); const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={close} className={cn("relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/62 transition hover:bg-white/8 hover:text-white", active && "bg-white text-[#17243a] shadow-lg hover:bg-white hover:text-[#17243a]")}>{active && <motion.span layoutId={`${mode}-active-nav`} className="absolute inset-0 rounded-xl bg-white" transition={{ type: "spring", stiffness: 420, damping: 34 }}/>}<Icon className={cn("relative size-4.5", active ? "text-[var(--bua-red)]" : "text-white/55")}/><span className="relative">{item.label}</span></Link>; })}</nav><div className="m-4 rounded-2xl border border-white/10 bg-white/6 p-4"><p className="text-xs font-semibold text-white/74">Privacy reminder</p><p className="mt-2 text-[11px] leading-5 text-white/45">Access only participant information required for your assigned outreach work.</p></div><div className="border-t border-white/10 px-5 py-4"><PoweredBy inverse /></div></div></div>;
}

export function PortalShell({ mode, profile, title, description, children, action }: { mode: "staff" | "admin"; profile: Profile; title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-[#f3f1ec] lg:grid lg:grid-cols-[282px_1fr]"><aside className="fixed inset-y-0 left-0 z-40 hidden w-[282px] lg:block"><Sidebar mode={mode} profile={profile}/></aside><AnimatePresence>{open && <><motion.button aria-label="Close navigation" className="fixed inset-0 z-40 bg-[#0f1726]/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/><motion.aside className="fixed inset-y-0 left-0 z-50 w-[292px] lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", stiffness: 360, damping: 35 }}><button className="absolute right-3 top-3 z-10 rounded-lg p-2 text-white/70 hover:bg-white/10" onClick={() => setOpen(false)}><X className="size-5"/></button><Sidebar mode={mode} profile={profile} close={() => setOpen(false)}/></motion.aside></>}</AnimatePresence><div className="min-w-0 lg:col-start-2"><header className="sticky top-0 z-30 border-b border-[#ded9d0] bg-white/92 backdrop-blur-xl"><div className="flex h-[74px] items-center gap-3 px-4 sm:px-6 lg:px-8"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5"/></Button><div className="hidden min-w-0 max-w-md flex-1 sm:block"><div className="relative"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#858b94]"/><Input className="h-10 border-transparent bg-[#f2f0eb] pl-10 shadow-none focus:bg-white" placeholder="Search participant or registration number"/></div></div><div className="ml-auto flex items-center gap-2"><Button variant="ghost" size="icon" className="relative"><Bell className="size-5"/></Button><form action="/api/auth/logout" method="post"><Button type="submit" variant="ghost" className="hidden gap-2 sm:inline-flex"><LogOut className="size-4"/> Sign out</Button></form></div></div></header><main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-[1480px]"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#ddd7cd] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#6e747d]">{mode === "admin" ? "Administrator portal" : "Staff portal"}</div><h1 className="text-balance text-2xl font-black tracking-[-.045em] text-[#1d2229] sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6d747e]">{description}</p>}</div>{action}</div>{children}</div></main></div></div>;
}
