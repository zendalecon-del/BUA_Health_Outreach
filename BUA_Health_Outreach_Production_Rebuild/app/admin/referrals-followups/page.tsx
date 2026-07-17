import { requirePortalProfile } from "@/lib/auth";
import { getFollowUpQueue, getReferralQueue } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ReferralsPage } from "@/components/referrals-page";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("admin");const [referrals,followUps]=await Promise.all([getReferralQueue(),getFollowUpQueue()]);return <PortalShell mode="admin" profile={profile} title="Referral and follow-up oversight" description="Monitor operational status across all screening records."><ReferralsPage mode="admin" referrals={referrals} followUps={followUps}/></PortalShell>;}
