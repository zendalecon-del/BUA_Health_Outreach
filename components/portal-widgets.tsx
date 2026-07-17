import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ScreeningStatus } from "@/lib/mock-data";

const tones: Record<string, { bg: string; dot: string; text: string }> = {
  teal: { bg: "bg-[#e8f7f3]", dot: "bg-[#15978d]", text: "text-[#12635f]" },
  slate: { bg: "bg-[#eef2f3]", dot: "bg-[#71858b]", text: "text-[#4d636a]" },
  blue: { bg: "bg-[#eaf2fb]", dot: "bg-[#4c82b6]", text: "text-[#345f88]" },
  green: { bg: "bg-[#eaf6e9]", dot: "bg-[#5d9d50]", text: "text-[#467740]" },
  coral: { bg: "bg-[#fceceb]", dot: "bg-[#dc6b60]", text: "text-[#9f4e47]" },
  gold: { bg: "bg-[#fff3df]", dot: "bg-[#d99a35]", text: "text-[#855f22]" },
};

export function MetricCard({ label, value, trend, tone = "teal", change = "up" }: { label: string; value: string; trend: string; tone?: string; change?: "up" | "down" | "neutral" }) {
  const style = tones[tone] ?? tones.teal;
  return (
    <Card className="group relative overflow-hidden border-white bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={cn("absolute -right-8 -top-8 size-24 rounded-full opacity-55 transition group-hover:scale-110", style.bg)} />
      <div className="relative">
        <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.09em] text-[#71868c]">{label}</p><span className={cn("size-2.5 rounded-full", style.dot)} /></div>
        <p className="mt-4 text-3xl font-black tracking-[-0.045em] text-[var(--navy)]">{value}</p>
        <p className={cn("mt-2 inline-flex items-center gap-1 text-xs font-semibold", style.text)}>{change === "up" && <ArrowUpRight className="size-3.5" />}{change === "down" && <ArrowDownRight className="size-3.5" />}{trend}</p>
      </div>
    </Card>
  );
}

export function StatusBadge({ status }: { status: ScreeningStatus | string }) {
  const variant = status === "Completed" ? "default" : status === "Updated" ? "info" : status === "In Progress" ? "warning" : status === "Active" ? "default" : status === "Urgent" ? "destructive" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

export function PanelHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-3 border-b border-[#e0e9e7] p-5 sm:flex-row sm:items-center">
      <div><h2 className="text-base font-bold tracking-[-0.02em] text-[var(--navy)]">{title}</h2>{description && <p className="mt-1 text-xs leading-5 text-[#71868c]">{description}</p>}</div>
      {action ?? <Button variant="ghost" size="icon"><MoreHorizontal /></Button>}
    </div>
  );
}
