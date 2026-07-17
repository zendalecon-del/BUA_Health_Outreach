import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white shadow-[0_8px_24px_rgba(8,111,107,.22)] hover:bg-[#075f5b]",
        destructive: "bg-[var(--destructive)] text-white hover:bg-[#ad2f3d]",
        outline: "border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm hover:border-[#abcfc8] hover:bg-[#f7fbfa]",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[#dcefeb]",
        ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
        dark: "bg-[var(--navy)] text-white shadow-[0_8px_24px_rgba(8,47,64,.22)] hover:bg-[#0c3b4e]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5",
        lg: "h-13 rounded-[14px] px-6 text-[15px]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
