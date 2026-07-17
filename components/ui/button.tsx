import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--bua-red)] text-white shadow-[0_10px_28px_rgba(180,22,43,.22)] hover:bg-[var(--bua-red-dark)]",
        destructive: "bg-[var(--destructive)] text-white hover:bg-[#8f1b13]",
        outline: "border border-[#d8d4cb] bg-white text-[#20242b] shadow-sm hover:border-[#aeb9c8] hover:bg-[#faf9f6]",
        secondary: "bg-[#eaf1fb] text-[#174a86] hover:bg-[#dce9f8]",
        ghost: "text-[#5d6470] hover:bg-[#eeece6] hover:text-[#1e232a]",
        link: "text-[var(--bua-red)] underline-offset-4 hover:underline",
        dark: "bg-[#17243a] text-white shadow-[0_10px_28px_rgba(23,36,58,.2)] hover:bg-[#101b2d]",
        blue: "bg-[var(--zendale-blue)] text-white shadow-[0_10px_28px_rgba(34,95,157,.22)] hover:bg-[var(--zendale-blue-dark)]"
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5",
        lg: "h-13 rounded-[14px] px-6 text-[15px]",
        icon: "size-11"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
