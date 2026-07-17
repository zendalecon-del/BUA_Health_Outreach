import { requirePortalProfile } from "@/lib/auth";
import { getStaff } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { StaffAdmin } from "@/components/staff-admin";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("admin");const staff=await getStaff();return <PortalShell mode="admin" profile={profile} title="Staff management" description="Create authorised accounts, issue temporary credentials and review access status."><StaffAdmin initial={staff}/></PortalShell>;}
