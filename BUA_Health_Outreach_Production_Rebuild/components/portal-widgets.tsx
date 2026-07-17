import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, helper, icon: Icon, tone = "blue" }: { label: string; value: number | string; helper?: string; icon: LucideIcon; tone?: "red" | "blue" | "green" | "gold" | "slate" }) {
  const tones = { red: "bg-[#fff1f3] text-[#a5162a]", blue: "bg-[#eaf1fb] text-[#225f9d]", green: "bg-[#e8f5ee] text-[#157347]", gold: "bg-[#fff1cf] text-[#8a5a00]", slate: "bg-[#efede8] text-[#59606a]" };
  return <Card className="p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.12em] text-[#7c828c]">{label}</p><p className="mt-3 text-3xl font-black tracking-[-.045em] text-[#1e232a]">{value}</p>{helper && <p className="mt-1 text-xs text-[#777e87]">{helper}</p>}</div><div className={cn("grid size-10 place-items-center rounded-xl", tones[tone])}><Icon className="size-5"/></div></div></Card>;
}

export function PanelHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-3 border-b border-[#e8e3db] px-5 py-4 sm:flex-row sm:items-center"><div><h2 className="font-bold tracking-[-.02em] text-[#22272e]">{title}</h2>{description && <p className="mt-1 text-xs leading-5 text-[#7a818a]">{description}</p>}</div>{action}</div>;
}

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/_/g, " ");
  if (["completed","active","confirmed","delivered"].includes(key)) return <Badge>{key}</Badge>;
  if (["updated","in progress","scheduled"].includes(key)) return <Badge variant="info">{key}</Badge>;
  if (["urgent","failed","inactive","unable to reach"].includes(key)) return <Badge variant="destructive">{key}</Badge>;
  if (["pending","not started","informed"].includes(key)) return <Badge variant="warning">{key}</Badge>;
  return <Badge variant="secondary">{key}</Badge>;
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: React.ReactNode }) {
  return <div className="grid place-items-center px-6 py-14 text-center"><div className="grid size-12 place-items-center rounded-2xl bg-[#efede8] text-[#6c737d]"><Icon className="size-5"/></div><h3 className="mt-4 text-lg font-bold text-[#242930]">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[#747b84]">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}

export function QueueLink({ title, count, href, tone = "blue" }: { title: string; count: number; href: string; tone?: "red" | "blue" | "gold" }) {
  const colors = { red: "border-[#f0cbd1] bg-[#fff7f8] text-[#94172a]", blue: "border-[#d5e1ef] bg-[#f6f8fb] text-[#225f9d]", gold: "border-[#ead9a0] bg-[#fff9e9] text-[#805400]" };
  return <a href={href} className={cn("flex items-center justify-between rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm", colors[tone])}><span className="text-sm font-semibold">{title}</span><span className="inline-flex items-center gap-1 text-lg font-black">{count}<ArrowUpRight className="size-4"/></span></a>;
}
