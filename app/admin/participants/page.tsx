import { requirePortalProfile } from "@/lib/auth";
import { getParticipants } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ParticipantsPage } from "@/components/participants-page";
export const dynamic = "force-dynamic";
export default async function Page(){ const profile=await requirePortalProfile("admin"); const participants=await getParticipants(1000); return <PortalShell mode="admin" profile={profile} title="Participant oversight" description="Review registrations, screening status and participant-facing notification eligibility."><ParticipantsPage mode="admin" participants={participants}/></PortalShell>; }
