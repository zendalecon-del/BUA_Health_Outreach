import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Search,
  Stethoscope,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { requirePortalProfile } from "@/lib/auth";
import { getDashboardSnapshot, getParticipants } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { EmptyState, StatusBadge } from "@/components/portal-widgets";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function StaffDashboardPage() {
  const profile = await requirePortalProfile("staff");
  const [stats, participants] = await Promise.all([getDashboardSnapshot(), getParticipants(7)]);
  const firstName = profile.full_name.split(" ")[0];
  const today = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  const metrics = [
    { label: "Registered", value: stats.registered, icon: Users },
    { label: "Awaiting screening", value: stats.notStarted, icon: Clock3 },
    { label: "In progress", value: stats.inProgress, icon: Stethoscope },
    { label: "Completed", value: stats.completed + stats.updated, icon: CheckCircle2 },
  ];

  return (
    <PortalShell
      mode="staff"
      profile={profile}
      title={`Good day, ${firstName}`}
      description="Your operational view of today’s outreach activity and cases needing attention."
      action={<Button asChild><Link href="/staff/participants"><Search /> Find participant</Link></Button>}
    >
      <section className="overflow-hidden bg-[#0f2744] text-white shadow-[0_24px_70px_rgba(9,26,46,.15)]">
        <div className="grid lg:grid-cols-[1.05fr_1.95fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#f3d861]">Today’s brief</p>
            <p className="display-serif mt-4 text-4xl leading-none tracking-[-.05em] sm:text-5xl">{today}</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">Start with participants who are waiting, then review referrals and follow-ups before closing completed records.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {metrics.map(({ label, value, icon: Icon }, index) => (
              <div key={label} className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6 last:border-r-0">
                <Icon className="size-5 text-[#7bb6dd]" />
                <p className="mt-8 text-4xl font-black tracking-[-.055em] sm:text-5xl">{value}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[.12em] text-white/42">{label}</p>
                {index === 1 && value > 0 && <span className="mt-4 inline-block h-1 w-8 bg-[#f2c230]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-7 grid gap-7 xl:grid-cols-[1.55fr_.75fr]">
        <section className="border border-[#ddd8cf] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#ddd8cf] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#2a67a5]">Live queue</p>
              <h2 className="mt-2 text-xl font-black tracking-[-.035em] text-[#1c2731]">Recent participants</h2>
              <p className="mt-1 text-xs leading-5 text-[#767f88]">Latest registrations across the outreach.</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link href="/staff/participants">View all <ArrowRight /></Link></Button>
          </div>

          {participants.length ? (
            <div>
              <div className="hidden grid-cols-[1.45fr_.8fr_.65fr_110px] gap-4 border-b border-[#e4e0d8] bg-[#f7f5f1] px-6 py-3 text-[9px] font-black uppercase tracking-[.14em] text-[#7c848d] md:grid">
                <span>Participant</span><span>Department</span><span>Status</span><span>Registered</span>
              </div>
              {participants.map((participant: any) => {
                const screening = Array.isArray(participant.screenings) ? participant.screenings[0] : participant.screenings;
                const status = screening?.status || "not started";
                return (
                  <Link key={participant.id} href={`/staff/participants/${participant.id}`} className="group grid gap-3 border-b border-[#ebe7df] px-5 py-4 transition last:border-0 hover:bg-[#fbfaf7] sm:px-6 md:grid-cols-[1.45fr_.8fr_.65fr_110px] md:items-center md:gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e7eff8] text-xs font-black text-[#225f9d]">{participant.full_name.split(/\s+/).slice(0, 2).map((part: string) => part[0]).join("")}</div>
                      <div className="min-w-0"><p className="truncate text-sm font-black text-[#26313b] group-hover:text-[#b5122b]">{participant.full_name}</p><p className="mt-1 text-[11px] font-bold text-[#838a92]">{participant.registration_number}</p></div>
                    </div>
                    <p className="text-xs font-bold text-[#68727c]">{participant.department}</p>
                    <div><StatusBadge status={status} /></div>
                    <p className="text-xs font-bold text-[#7a828b]">{new Date(participant.created_at).toLocaleDateString("en-GB")}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState icon={UserRoundPlus} title="No participants yet" description="New registrations will appear here immediately after successful submission." />
          )}
        </section>

        <div className="space-y-7">
          <section className="border border-[#ddd8cf] bg-white">
            <div className="border-b border-[#ddd8cf] px-5 py-5">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#b5122b]">Needs attention</p>
              <h2 className="mt-2 text-xl font-black tracking-[-.035em] text-[#1c2731]">Priority work</h2>
            </div>
            <Link href="/staff/participants" className="flex items-center justify-between gap-4 border-b border-[#ebe7df] px-5 py-5 transition hover:bg-[#fbfaf7]">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#fff3c4] text-[#8a5a00]"><Clock3 className="size-5" /></span><div><p className="text-sm font-black text-[#25303a]">Awaiting screening</p><p className="mt-1 text-xs text-[#78818a]">Participants not yet started</p></div></div><span className="text-2xl font-black text-[#17202a]">{stats.notStarted}</span>
            </Link>
            <Link href="/staff/referrals-followups" className="flex items-center justify-between gap-4 border-b border-[#ebe7df] px-5 py-5 transition hover:bg-[#fbfaf7]">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#fff0f2] text-[#a5162a]"><HeartHandshake className="size-5" /></span><div><p className="text-sm font-black text-[#25303a]">Open referrals</p><p className="mt-1 text-xs text-[#78818a]">Clinical action required</p></div></div><span className="text-2xl font-black text-[#17202a]">{stats.referrals}</span>
            </Link>
            <Link href="/staff/referrals-followups" className="flex items-center justify-between gap-4 px-5 py-5 transition hover:bg-[#fbfaf7]">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#e7f3ed] text-[#287a55]"><CalendarDays className="size-5" /></span><div><p className="text-sm font-black text-[#25303a]">Follow-ups</p><p className="mt-1 text-xs text-[#78818a]">Cases requiring contact</p></div></div><span className="text-2xl font-black text-[#17202a]">{stats.followUps}</span>
            </Link>
          </section>

          <section className="relative overflow-hidden bg-[#b5122b] px-6 py-7 text-white">
            <div className="absolute -right-10 -top-12 size-36 rounded-full border-[24px] border-white/7" />
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#f7d97a]">Screening discipline</p>
            <h3 className="mt-4 text-2xl font-black tracking-[-.04em]">Save is not completion.</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">A screening becomes official only after every required field is reviewed and Complete Screening is selected.</p>
            <Button asChild variant="outline" className="mt-6 border-white/25 bg-transparent text-white hover:bg-white hover:text-[#7a0d1f]"><Link href="/staff/participants">Open participant list <ArrowRight /></Link></Button>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
