import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PreviewBannerProps {
  currentView?: string;
}

export function PreviewBanner({ currentView = "Dashboard" }: PreviewBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-purple-50/90 border-b border-purple-200/80 px-4 py-2.5 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-purple-900 font-medium">
          <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <span>
            <strong className="font-semibold text-purple-950">Phase 1 Preview:</strong>{" "}
            You are exploring the <span className="underline decoration-purple-300">{currentView}</span> shell.
            Authentication, webcam tracking, and pose extraction are scheduled for Phase 2.
          </span>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="lavender" className="bg-white/80">
            Interactive Mockup
          </Badge>
          <Link
            href="/"
            className="text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            Platform Overview <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

