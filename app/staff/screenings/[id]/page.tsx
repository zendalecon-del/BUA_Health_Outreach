import { ScreeningForm } from "@/components/screening-form";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ScreeningForm mode="staff" id={id} />; }
