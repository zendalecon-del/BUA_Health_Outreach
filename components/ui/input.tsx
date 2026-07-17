import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-xl border border-[var(--input)] bg-white px-4 py-2 text-[15px] text-[var(--foreground)] shadow-sm transition placeholder:text-[#8ba0a6] hover:border-[#b6d1cc] focus:border-[var(--ring)] focus:outline-none focus:ring-4 focus:ring-[rgba(22,141,133,.12)] disabled:cursor-not-allowed disabled:bg-[#f1f5f4] disabled:opacity-70",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
