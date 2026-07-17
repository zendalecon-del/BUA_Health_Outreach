import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors", {
  variants: { variant: {
    default: "border-transparent bg-[#e8f5ee] text-[#12633e]",
    secondary: "border-transparent bg-[#efede8] text-[#59606a]",
    outline: "border-[#d6d1c8] bg-white text-[#3f4752]",
    warning: "border-transparent bg-[#fff1cf] text-[#8a5a00]",
    destructive: "border-transparent bg-[#fce7ea] text-[#a5162a]",
    info: "border-transparent bg-[#e6eef9] text-[#225f9d]",
    dark: "border-transparent bg-[#17243a] text-white"
  }}, defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) { return <div className={cn(badgeVariants({ variant }), className)} {...props} />; }
export { Badge, badgeVariants };
