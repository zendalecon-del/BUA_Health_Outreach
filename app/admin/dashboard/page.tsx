import Link from "next/link";
import { ArrowRight, Building2, CircleAlert, Download, MailCheck, ShieldCheck, UserPlus } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { MetricCard, PanelHeader, StatusBadge } from "@/components/portal-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dashboardStats, staffMembers } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <PortalShell mode="admin" title="Outreach command centre" description="Monitor registrations, screening progress, follow-up actions and system readiness." action={<div className="flex gap-2"><Button asChild variant="outline"><Link href="/admin/export"><Download /> Export data</Link></Button><Button asChild><Link href="/admin/staff"><UserPlus /> Add staff</Link></Button></div>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{dashboardStats.map((stat) => <MetricCard key={stat.label} {...stat} />)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="overflow-hidden border-white shadow-sm">
          <PanelHeader title="Screening completion" description="Current participant lifecycle distribution" />
          <div className="p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_190px] lg:items-center">
              <div className="space-y-4">
                {[
                  ["Completed", 155, 62.5, "bg-[#15978d]"],
                  ["Not started", 64, 25.8, "bg-[#8ba0a6]"],
                  ["In progress", 21, 8.5, "bg-[#d99a35]"],
                  ["Updated", 8, 3.2, "bg-[#4c82b6]"],
                ].map(([label, value, width, color]) => <div key={String(label)}><div className="mb-2 flex items-center justify-between text-xs"><span className="font-semibold text-[#536c73]">{label}</span><span className="font-bold text-[var(--navy)]">{value} · {width}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-[#eaf0ef]"><div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} /></div></div>)}
              </div>
              <div className="mx-auto grid size-40 place-items-center rounded-full bg-[conic-gradient(#15978d_0_62.5%,#8ba0a6_62.5%_88.3%,#d99a35_88.3%_96.8%,#4c82b6_96.8%)] p-4"><div className="grid size-full place-items-center rounded-full bg-white text-center"><div><p className="text-3xl font-black tracking-[-0.04em] text-[var(--navy)]">248</p><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71868c]">Registered</p></div></div></div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden border-white shadow-sm">
          <PanelHeader title="Operational alerts" description="Resolve before the next event window" />
          <div className="space-y-3 p-5">
            {[
              [CircleAlert, "5 referrals missing participant-informed status", "Urgent", "destructive", "/admin/referrals-followups"],
              [Building2, "1 hospital is inactive but retained in history", "Review", "warning", "/admin/referral-hospitals"],
              [MailCheck, "3 result emails awaiting retry", "Email", "info", "/admin/participants"],
              [ShieldCheck, "All staff sessions passed access review", "Secure", "default", "/admin/staff"],
            ].map(([Icon, title, tag, variant, href]) => { const Comp = Icon as typeof CircleAlert; return <Link key={String(title)} href={String(href)} className="flex items-start gap-3 rounded-xl border border-[#e0e9e7] p-3.5 transition hover:bg-[#f7fbfa]"><Comp className="mt-0.5 size-4.5 shrink-0 text-[var(--primary)]" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-5 text-[#334f57]">{String(title)}</p><Badge className="mt-2" variant={variant as "destructive" | "warning" | "info" | "default"}>{String(tag)}</Badge></div><ArrowRight className="mt-1 size-4 text-[#96a6aa]" /></Link>; })}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <Card className="overflow-hidden border-white shadow-sm"><PanelHeader title="Recent staff activity" description="Account access and credential delivery" action={<Button asChild variant="ghost" size="sm"><Link href="/admin/staff">Manage staff <ArrowRight /></Link></Button>} /><div className="divide-y divide-[#e2ebe9]">{staffMembers.map((staff) => <div key={staff.id} className="flex items-center gap-4 p-4 sm:px-5"><div className="grid size-10 place-items-center rounded-xl bg-[#e8f5f1] text-xs font-bold text-[var(--primary)]">{staff.name.split(" ").slice(-2).map((part) => part[0]).join("")}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#173945]">{staff.name}</p><p className="mt-1 text-xs text-[#75898e]">{staff.id} · {staff.role}</p></div><StatusBadge status={staff.status} /><span className="hidden text-xs text-[#75898e] sm:block">{staff.lastSeen}</span></div>)}</div></Card>
        <Card className="border-0 bg-[var(--navy)] p-6 text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#78d9ca]">Email delivery</p><p className="mt-4 text-4xl font-black tracking-[-0.045em]">96.8%</p><p className="mt-2 text-sm leading-6 text-white/58">Successful delivery across registration, credentials and result-ready notices.</p><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span className="text-white/55">Sent today</span><span className="font-bold">312</span></div><div className="flex justify-between"><span className="text-white/55">Queued</span><span className="font-bold">8</span></div><div className="flex justify-between"><span className="text-white/55">Failed</span><span className="font-bold text-[#f0b4ae]">3</span></div></div><Button asChild className="mt-6 w-full bg-white text-[var(--navy)] hover:bg-[#edf7f5]"><Link href="/admin/participants">Review notifications</Link></Button></Card>
      </div>
    </PortalShell>
  );
}
