import { requirePortalProfile } from "@/lib/auth";
import { getHospitals } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { HospitalsAdmin } from "@/components/hospitals-admin";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("admin");const hospitals=await getHospitals();return <PortalShell mode="admin" profile={profile} title="Referral hospitals" description="Admin-controlled facility directory used by the conditional screening dropdown."><HospitalsAdmin initial={hospitals}/></PortalShell>;}
