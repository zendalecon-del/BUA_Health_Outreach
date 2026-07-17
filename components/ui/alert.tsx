import * as React from "react";
import { cn } from "@/lib/utils";
function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div role="alert" className={cn("relative w-full rounded-2xl border border-[#d8e1ec] bg-[#f4f7fb] px-4 py-3.5 text-sm text-[#31465e]", className)} {...props} />; }
function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h5 className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />; }
function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <div className={cn("text-sm leading-6 [&_p]:leading-relaxed", className)} {...props} />; }
export { Alert, AlertTitle, AlertDescription };
