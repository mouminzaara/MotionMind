import React from "react";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import { PreviewBanner } from "@/components/shared/preview-banner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFE]">
      {/* Global Phase 1 Preview Shell Announcement */}
      <PreviewBanner currentView="Participant Dashboard Shell" />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

