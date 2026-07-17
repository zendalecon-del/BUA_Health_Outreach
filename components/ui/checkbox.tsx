"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} className={cn("peer size-5 shrink-0 rounded-md border border-[#b8cbc7] bg-white shadow-sm transition data-[state=checked]:border-[var(--primary)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:text-white focus-visible:ring-4 focus-visible:ring-[rgba(22,141,133,.12)] disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current"><Check className="size-4" /></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
