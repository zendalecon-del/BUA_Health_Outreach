import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors", {
  variants: {
    variant: {
      default: "border-transparent bg-[#dff5ef] text-[#08615d]",
      secondary: "border-transparent bg-[#edf2f3] text-[#536a72]",
      outline: "border-[#cbdad7] bg-white text-[#36545d]",
      warning: "border-transparent bg-[#fff1d8] text-[#85550f]",
      destructive: "border-transparent bg-[#fde8ea] text-[#a52e3b]",
      info: "border-transparent bg-[#e7f0fb] text-[#245b8b]",
      dark: "border-transparent bg-[#0b3547] text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { Badge, badgeVariants };
