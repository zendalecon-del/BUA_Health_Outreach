import Link from "next/link";
import { ArrowRight, CalendarClock, CircleAlert, Search, Sparkles, UserRoundPlus } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { MetricCard, PanelHeader, StatusBadge } from "@/components/portal-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { dashboardStats, participants } from "@/lib/mock-data";

export default function StaffDashboardPage() {
  return (
    <PortalShell mode="staff" title="Good morning, Kemi" description="Here is the outreach activity that needs your attention today." action={<Button asChild><Link href="/staff/participants"><Search /> Find a participant</Link></Button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{dashboardStats.map((stat) => <MetricCard key={stat.label} {...stat} />)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_.75fr]">
        <Card className="overflow-hidden border-white shadow-sm">
          <PanelHeader title="Recent participants" description="Open a profile to start or continue a screening." action={<Button asChild variant="ghost" size="sm"><Link href="/staff/participants">View all <ArrowRight /></Link></Button>} />
          <div className="divide-y divide-[#e2ebe9]">
            {participants.slice(0, 5).map((participant) => (
              <Link key={participant.id} href={`/staff/participants/${participant.id}`} className="flex items-center gap-4 p-4 transition hover:bg-[#f7fbfa] sm:px-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f5f1] text-xs font-bold text-[var(--primary)]">{participant.initials}</div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-semibold text-[#173945]">{participant.name}</p><StatusBadge status={participant.status} /></div><p className="mt-1 text-xs text-[#75898e]">{participant.reg} · {participant.department}</p></div>
                <div className="hidden text-right sm:block"><p className="text-xs font-semibold text-[#536b72]">{participant.lastActivity}</p><p className="mt-1 text-[11px] text-[#829398]">Last activity</p></div>
                <ArrowRight className="size-4 text-[#8da0a5]" />
              </Link>
            ))}
          </div>
        </Card>
        <div className="grid gap-6">
          <Card className="overflow-hidden border-white shadow-sm">
            <PanelHeader title="Quick participant search" description="Registration number, name or phone" />
            <div className="p-5"><div className="relative"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#789097]" /><Input className="pl-10" placeholder="Search BUA-0047 or John…" /></div><Button className="mt-3 w-full" asChild><Link href="/staff/participants">Search participant list</Link></Button></div>
          </Card>
          <Card className="overflow-hidden border-white shadow-sm">
            <PanelHeader title="Priority queue" description="Items that may need action" />
            <div className="space-y-3 p-5">
              <Link href="/staff/referrals-followups" className="flex items-start gap-3 rounded-2xl border border-[#f0d8d5] bg-[#fff7f6] p-4 transition hover:border-[#e9bab5]"><div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fbe4e1] text-[#b85b51]"><CircleAlert className="size-4" /></div><div><div className="flex items-center gap-2"><p className="text-sm font-bold text-[#4e3533]">5 urgent referrals</p><Badge variant="destructive">Today</Badge></div><p className="mt-1 text-xs leading-5 text-[#7e6663]">Confirm participant informed status.</p></div></Link>
              <Link href="/staff/referrals-followups" className="flex items-start gap-3 rounded-2xl border border-[#e7dcc1] bg-[#fffaf0] p-4 transition hover:border-[#d9c492]"><div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f8ebcc] text-[#93671d]"><CalendarClock className="size-4" /></div><div><p className="text-sm font-bold text-[#4f4431]">7 follow-ups this week</p><p className="mt-1 text-xs leading-5 text-[#7c735e]">Review dates and contact permissions.</p></div></Link>
            </div>
          </Card>
        </div>
      </div>
      <Card className="mt-6 overflow-hidden border-0 bg-[var(--navy)] p-6 text-white shadow-lg sm:p-7"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div className="flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10"><Sparkles className="size-5 text-[#78dacb]" /></div><div><h3 className="font-bold">Fast screening workflow</h3><p className="mt-1 max-w-2xl text-sm leading-6 text-white/60">Open a participant profile, start the screening, save at any step and complete only from the final review.</p></div></div><Button asChild variant="outline" className="border-white/15 bg-white/10 text-white hover:bg-white hover:text-[var(--navy)]"><Link href="/staff/participants"><UserRoundPlus /> Open participant list</Link></Button></div></Card>
    </PortalShell>
  );
}
