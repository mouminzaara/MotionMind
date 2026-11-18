import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900">MotionMind</span>
            </div>
            <p className="text-slate-500 text-xs max-w-md leading-relaxed">
              A production-oriented, browser-based AI movement intelligence platform for
              therapist-approved sit-to-stand exercises. Designed with privacy-preserving client-side pose tracking.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              © 2026 MotionMind. Built for objective movement measurement.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-purple-700 transition-colors">
                  Platform Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-700 transition-colors">
                  Dashboard Preview
                </Link>
              </li>
              <li>
                <Link href="/dashboard/record" className="hover:text-purple-700 transition-colors">
                  Movement Recorder (Preview)
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-purple-700 transition-colors">
                  Sign In Shell
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
              Specifications
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <span className="text-slate-700 font-medium">Protocol:</span> 30-Second Chair Stand (30CST)
              </li>
              <li>
                <span className="text-slate-700 font-medium">Client Vision:</span> MediaPipe Pose (Phase 2)
              </li>
              <li>
                <span className="text-slate-700 font-medium">Backend:</span> FastAPI + SQLAlchemy 2.0
              </li>
              <li>
                <span className="text-slate-700 font-medium">Status:</span> Phase 1 Foundation Completed
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer row */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 leading-relaxed">
          <strong>Clinical Disclaimer:</strong> MotionMind provides kinematic measurement and biofeedback data. It does not constitute medical advice, diagnosis, or clinical prescription. Always consult a certified physical therapist or physician for exercise interpretation and therapy prescription.
        </div>
      </div>
    </footer>
  );
}
