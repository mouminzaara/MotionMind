import React from "react";
import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerCardProps {
  className?: string;
  compact?: boolean;
}

export function DisclaimerCard({ className, compact = false }: DisclaimerCardProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "rounded-lg border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900 flex items-start gap-2.5",
          className
        )}
      >
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Non-Diagnostic Movement Tool:</strong>{" "}
          MotionMind provides objective kinematic biofeedback. It is not a clinical diagnosis or treatment prescription system.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-amber-950",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-700 flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm text-amber-950">
            Movement Intelligence & Clinical Scope Notice
          </h4>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            MotionMind is designed to record and quantify biomechanical movement features (e.g. repetition duration, trajectory, and symmetry) during therapist-guided sit-to-stand exercises.
            It does not evaluate symptoms, diagnose disease, formulate treatment plans, or substitute for professional medical counsel.
          </p>
        </div>
      </div>
    </div>
  );
}

