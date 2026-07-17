import { requirePortalProfile } from "@/lib/auth";
import { ChangePasswordPage } from "@/components/change-password-page";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("staff");return <ChangePasswordPage mode="staff" profile={profile}/>;}
