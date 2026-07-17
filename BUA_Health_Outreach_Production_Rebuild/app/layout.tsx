import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BUA Health Outreach",
    template: "%s | BUA Health Outreach",
  },
  description: "Registration, screening, referral and follow-up management for BUA Health Outreach.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
