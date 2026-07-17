import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-28 w-full resize-y rounded-xl border border-[var(--input)] bg-white px-4 py-3 text-[15px] shadow-sm transition placeholder:text-[#858b95] hover:border-[#aeb9c8] focus:border-[var(--ring)] focus:outline-none focus:ring-4 focus:ring-[rgba(34,95,157,.13)] disabled:cursor-not-allowed disabled:bg-[#f1f5f4] disabled:opacity-70",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
export { Textarea };
