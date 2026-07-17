import { requirePortalProfile } from "@/lib/auth";
import { getFollowUpQueue, getReferralQueue } from "@/lib/data/portal";
import { PortalShell } from "@/components/portal-shell";
import { ReferralsPage } from "@/components/referrals-page";
export const dynamic="force-dynamic";
export default async function Page(){const profile=await requirePortalProfile("staff");const [referrals,followUps]=await Promise.all([getReferralQueue(),getFollowUpQueue()]);return <PortalShell mode="staff" profile={profile} title="Referrals and follow-ups" description="Review cases requiring additional communication or care coordination."><ReferralsPage mode="staff" referrals={referrals} followUps={followUps}/></PortalShell>;}
