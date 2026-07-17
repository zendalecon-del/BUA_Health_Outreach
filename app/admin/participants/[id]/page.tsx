import { ParticipantProfile } from "@/components/participant-profile";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ParticipantProfile mode="admin" id={id} />; }
