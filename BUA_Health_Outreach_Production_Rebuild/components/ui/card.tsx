import * as React from "react";
import { cn } from "@/lib/utils";
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("rounded-[18px] border border-[#dedad2] bg-white text-[var(--card-foreground)]", className)} {...props} />; }
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />; }
function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn("text-lg font-bold tracking-[-0.025em]", className)} {...props} />; }
function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cn("text-sm leading-6 text-[var(--muted-foreground)]", className)} {...props} />; }
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("p-6 pt-0", className)} {...props} />; }
function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />; }
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
