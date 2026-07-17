import { notFound } from "next/navigation";
import { requirePortalProfile } from "@/lib/auth";
import { getActiveHospitals, getParticipant } from "@/lib/data/portal";
import { ScreeningForm } from "@/components/screening-form";
export const dynamic = "force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){ const profile=await requirePortalProfile("admin"); const {id}=await params; const [participant,hospitals]=await Promise.all([getParticipant(id),getActiveHospitals()]); if(!participant) notFound(); return <ScreeningForm mode="admin" profile={profile} participant={participant} hospitals={hospitals}/>; }
