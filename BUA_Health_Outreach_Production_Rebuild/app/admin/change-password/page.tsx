import { requirePortalProfile } from "@/lib/auth";
import { ChangePasswordPage } from "@/components/change-password-page";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("admin");return <ChangePasswordPage mode="admin" profile={profile}/>;}
