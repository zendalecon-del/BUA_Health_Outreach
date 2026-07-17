import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-28 w-full resize-y rounded-xl border border-[var(--input)] bg-white px-4 py-3 text-[15px] shadow-sm transition placeholder:text-[#8ba0a6] hover:border-[#b6d1cc] focus:border-[var(--ring)] focus:outline-none focus:ring-4 focus:ring-[rgba(22,141,133,.12)] disabled:cursor-not-allowed disabled:bg-[#f1f5f4] disabled:opacity-70",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
export { Textarea };
