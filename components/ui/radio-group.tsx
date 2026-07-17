"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(
  ({ className, ...props }, ref) => <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />,
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item ref={ref} className={cn("aspect-square size-5 rounded-full border border-[#aeb5c0] bg-white text-[var(--primary)] shadow-sm transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(34,95,157,.13)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[var(--primary)]", className)} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center"><Circle className="size-2.5 fill-current text-current" /></RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  ),
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
export { RadioGroup, RadioGroupItem };
