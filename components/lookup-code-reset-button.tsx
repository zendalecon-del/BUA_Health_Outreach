"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ResetResult = {
  lookupCode: string;
  registrationNumber: string;
  emailStatus: "sent" | "failed" | "not_configured";
};

export function LookupCodeResetButton({ participantId }: { participantId: string }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ResetResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function resetCode() {
    if (!window.confirm("Issue a new private lookup code? The previous code will stop working immediately.")) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/participants/${participantId}/reset-lookup`, { method: "POST" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "A new lookup code could not be issued.");
      setResult(payload);
      toast.success(payload.emailStatus === "sent" ? "New lookup code issued and emailed." : "New lookup code issued. Copy it before closing.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "A new lookup code could not be issued.");
    } finally {
      setBusy(false);
    }
  }

  async function copyCode() {
    if (!result) return;
    await navigator.clipboard.writeText(`${result.registrationNumber}\n${result.lookupCode}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={resetCode} disabled={busy}>
        {busy ? <LoaderCircle className="animate-spin" /> : <KeyRound />}
        {busy ? "Issuing…" : "Issue new lookup code"}
      </Button>

      {result && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#071a2d]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="lookup-reset-title">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#2367a4]">Private access reset</p>
                <h2 id="lookup-reset-title" className="mt-2 text-2xl font-black tracking-[-.04em] text-[#102b48]">New lookup code issued</h2>
              </div>
              <button type="button" onClick={() => setResult(null)} className="grid size-9 place-items-center rounded-full border border-[#ddd8cf] text-[#506172] transition hover:bg-[#f2efe9]" aria-label="Close"><X className="size-4" /></button>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl bg-[#0c2d50] p-5 text-white">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[.14em] text-white/50">Registration number</p>
                <p className="mt-1 font-mono text-lg font-black tracking-[.08em]">{result.registrationNumber}</p>
              </div>
              <div className="border-t border-white/12 pt-3">
                <p className="text-[9px] font-black uppercase tracking-[.14em] text-white/50">New private lookup code</p>
                <p className="mt-1 font-mono text-2xl font-black tracking-[.16em] text-[#9bd5f5]">{result.lookupCode}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#647180]">
              {result.emailStatus === "sent" ? "The participant has also received the new code by email." : "Email delivery was unavailable. Copy this code and share it only through an approved private channel."}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button type="button" onClick={copyCode}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy both details"}</Button>
              <Button type="button" variant="outline" onClick={() => setResult(null)}>Done</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
