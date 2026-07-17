import { notFound } from "next/navigation";
import { requirePortalProfile } from "@/lib/auth";
import { getParticipant } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ParticipantProfile } from "@/components/participant-profile";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const profile=await requirePortalProfile("staff"); const {id}=await params; const participant=await getParticipant(id); if(!participant) notFound(); return <PortalShell mode="staff" profile={profile} title="Participant profile" description="Review the registration before starting or continuing the screening."><ParticipantProfile mode="staff" participant={participant}/></PortalShell>; }
