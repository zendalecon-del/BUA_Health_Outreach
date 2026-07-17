"use client";

import { useState } from "react";
import { Mail, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ResultNotificationButton({ participantId, updated = false }: { participantId: string; updated?: boolean }) {
  const [sending, setSending] = useState(false);
  async function send() {
    setSending(true);
    try {
      const response = await fetch(`/api/staff/participants/${participantId}/notify`, { method: "POST" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "The notification could not be sent.");
      toast.success(updated ? "Updated result notification sent." : "Result notification sent.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The notification could not be sent.");
    } finally {
      setSending(false);
    }
  }
  return <Button type="button" variant="outline" onClick={send} disabled={sending}>{sending ? <LoaderCircle className="animate-spin"/> : <Mail/>}{sending ? "Sending…" : updated ? "Send updated result" : "Send result notification"}</Button>;
}
