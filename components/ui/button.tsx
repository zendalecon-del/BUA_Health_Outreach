import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[11px] text-sm font-bold transition-[background-color,border-color,color,transform,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--bua-red)] text-white shadow-[0_12px_30px_rgba(181,18,43,.20)] hover:bg-[var(--bua-red-dark)] hover:shadow-[0_14px_34px_rgba(181,18,43,.26)]",
        destructive: "bg-[var(--destructive)] text-white hover:bg-[#8f1b13]",
        outline: "border border-[#cbc7bf] bg-white text-[#1d2731] hover:border-[#8f9baa] hover:bg-[#f8f7f3]",
        secondary: "bg-[#e7eff8] text-[#174a86] hover:bg-[#dae8f6]",
        ghost: "text-[#5c6671] hover:bg-[#eae7e1] hover:text-[#17202a]",
        link: "text-[var(--bua-red)] underline-offset-4 hover:underline",
        dark: "bg-[#0f2744] text-white shadow-[0_12px_30px_rgba(9,26,46,.20)] hover:bg-[#091a2e]",
        blue: "bg-[var(--zendale-blue)] text-white shadow-[0_12px_30px_rgba(42,103,165,.20)] hover:bg-[var(--zendale-blue-dark)]"
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-[9px] px-3.5",
        lg: "h-13 rounded-xl px-6 text-[15px]",
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
