import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotionMind | AI Movement Intelligence Platform",
  description:
    "Production-oriented, browser-based movement intelligence for therapist-approved sit-to-stand exercises. Objective biomechanical measurement; strictly non-diagnostic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FBFBFE] text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
