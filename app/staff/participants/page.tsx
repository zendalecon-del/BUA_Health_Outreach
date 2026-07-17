import { requirePortalProfile } from "@/lib/auth";
import { getParticipants } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ParticipantsPage } from "@/components/participants-page";
export const dynamic = "force-dynamic";
export default async function Page(){ const profile=await requirePortalProfile("staff"); const participants=await getParticipants(500); return <PortalShell mode="staff" profile={profile} title="Participants" description="Find a registration and open the participant profile before starting a screening."><ParticipantsPage mode="staff" participants={participants}/></PortalShell>; }
