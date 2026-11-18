import React from "react";
import Link from "next/link";
import {
  Video,
  CheckCircle2,
  Clock,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DisclaimerCard } from "@/components/shared/disclaimer-card";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Page Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Movement Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and review therapist-approved 30-Second Chair Stand (30CST) assessments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="lavender" className="py-1 px-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse inline-block mr-1"></span>
            Phase 1 UI Foundation
          </Badge>
          <Link href="/dashboard/record">
            <Button size="sm" className="gap-2">
              <Video className="w-4 h-4" />
              Prepare STS Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Next Assessment Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-purple-200/70 bg-gradient-to-br from-white via-purple-50/20 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="lavender">Standard Assessment</Badge>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 30-Second Target
              </span>
            </div>
            <CardTitle className="text-xl mt-2">
              30-Second Chair Stand Test (30CST)
            </CardTitle>
            <CardDescription>
              Objective measurement of lower-extremity functional strength and dynamic postural control.
              Webcam-based pose tracking operates entirely in your local browser client.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Standard 17-inch chair against wall</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Arms crossed at chest during test</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Webcam placed 6–8 ft away at torso height</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Full body visible from feet to head</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/dashboard/record" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto gap-2">
                  <Video className="w-4 h-4" />
                  Launch Recorder Preview
                </Button>
              </Link>
              <span className="text-xs text-slate-400">
                Note: Webcam capture will be enabled in Phase 2.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Measurement Parameters Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Kinematic Metrics</CardTitle>
              <Badge variant="neutral">Spec v1</Badge>
            </div>
            <CardDescription>
              Biomechanical features captured during each repetition cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Repetition Count</p>
                  <p className="text-slate-500 text-[11px]">Valid completed cycles</p>
                </div>
                <Badge variant="neutral" className="text-[10px]">Pending Phase 2</Badge>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Concentric Phase Time</p>
                  <p className="text-slate-500 text-[11px]">Standing transition speed</p>
                </div>
                <Badge variant="neutral" className="text-[10px]">Pending Phase 2</Badge>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Peak Trunk Flexion</p>
                  <p className="text-slate-500 text-[11px]">Forward torso lean angle</p>
                </div>
                <Badge variant="neutral" className="text-[10px]">Pending Phase 2</Badge>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Bilateral Knee Symmetry</p>
                  <p className="text-slate-500 text-[11px]">Left/right excursion balance</p>
                </div>
                <Badge variant="neutral" className="text-[10px]">Pending Phase 2</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State: Session Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Assessment Sessions</CardTitle>
              <CardDescription>
                Synchronized movement sessions stored in your PostgreSQL audit trail.
              </CardDescription>
            </div>
            <Link
              href="/dashboard/history"
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
            >
              View Full History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-8 sm:p-12 text-center bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              No Movement Sessions Recorded Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Phase 1 provides the foundational database schema and UI shell. In Phase 2,
              MediaPipe Pose Landmarker will run directly in your browser to record your first session.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/dashboard/record">
                <Button size="sm" variant="secondary" className="gap-2">
                  <Video className="w-4 h-4" />
                  Explore Recorder Shell
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Disclaimer */}
      <DisclaimerCard />
    </div>
  );
}
