import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck, UserPlus, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReviewersPage() {
  return (
    <div className="space-y-6">
      {/* Top back & title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reviewer Sharing & Collaboration
          </h1>
          <p className="text-sm text-slate-500">
            Optionally invite licensed physical therapists or movement specialists to inspect session metrics.
          </p>
        </div>
        <div>
          <Badge variant="lavender">Phase 4 Milestone</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invite Reviewer Shell */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-600" />
                Invite Clinical Reviewer
              </CardTitle>
              <Badge variant="neutral">Form Disabled</Badge>
            </div>
            <CardDescription>
              Grant selective read access to specific 30CST assessment records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1.5 opacity-60">
              <label className="font-medium text-slate-700 block">
                Reviewer Professional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  disabled
                  placeholder="therapist@clinic.org"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5 opacity-60">
              <label className="font-medium text-slate-700 block">
                Sharing Scope
              </label>
              <select
                disabled
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 cursor-not-allowed"
              >
                <option>Full Kinematic History & Symmetry Reports</option>
                <option>Last 3 Sessions Only</option>
              </select>
            </div>

            <div className="pt-2">
              <Button disabled size="sm" className="w-full gap-2 cursor-not-allowed opacity-60">
                <Lock className="w-3.5 h-3.5" />
                Send Invite (Available in Phase 4)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Authorization Model */}
        <Card className="bg-purple-50/30 border-purple-200/80">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-purple-950">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Participant-Controlled Authorization
            </CardTitle>
            <CardDescription>
              Privacy boundaries for therapist-shared records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              In MotionMind, reviewers are strictly read-only observers invited by the participant.
              No health system integration or automatic broadcasting occurs without explicit consent.
            </p>
            <div className="p-3 bg-white rounded-lg border border-purple-200/70 space-y-1.5">
              <p className="font-semibold text-purple-900">What Reviewers Can See:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                <li>Repetition counts and cadence</li>
                <li>Concentric and eccentric phase durations</li>
                <li>Bilateral hip and knee angular excursions</li>
                <li>Participant self-reported exertion notes</li>
              </ul>
            </div>
            <p className="text-[11px] text-slate-500">
              Raw webcam recordings are never saved to disk or transmitted to reviewers; only numeric biomechanical metrics are shared.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
