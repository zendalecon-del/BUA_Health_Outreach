import { notFound } from "next/navigation";
import { requirePortalProfile } from "@/lib/auth";
import { getParticipant } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ParticipantProfile } from "@/components/participant-profile";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const profile=await requirePortalProfile("admin"); const {id}=await params; const participant=await getParticipant(id); if(!participant) notFound(); return <PortalShell mode="admin" profile={profile} title="Participant profile" description="Administrative view of registration and screening lifecycle."><ParticipantProfile mode="admin" participant={participant}/></PortalShell>; }
