import React from "react";
import Link from "next/link";
import {
  Camera,
  CameraOff,
  ArrowLeft,
  Info,
  Shield,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecordSessionPage() {
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
            Sit-to-Stand Assessment Recorder
          </h1>
          <p className="text-sm text-slate-500">
            Interactive viewport and alignment shell for 30-Second Chair Stand Test (30CST).
          </p>
        </div>
        <div>
          <Badge variant="amber" className="gap-1.5 py-1 px-3">
            <CameraOff className="w-3.5 h-3.5 text-amber-600" />
            Camera Disabled in Phase 1
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Viewport Shell */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-slate-300/80 shadow-sm">
            <div className="relative aspect-video bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
              {/* Mock Alignment Overlay */}
              <div className="absolute inset-8 border border-white/20 rounded-lg pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between items-start text-[11px] text-white/50 font-mono">
                  <span>CAMERA: PREVIEW_STUB</span>
                  <span>FPS: -- / TARGET: 30</span>
                </div>
                <div className="self-center border border-dashed border-purple-400/40 rounded-full w-24 h-32 flex items-center justify-center text-[10px] text-purple-200/60 uppercase tracking-widest font-mono">
                  Body Box
                </div>
                <div className="flex justify-between items-end text-[11px] text-white/50 font-mono">
                  <span>STANDARDIZED: 30CST</span>
                  <span>CONFIDENCE: --</span>
                </div>
              </div>

              {/* Viewport Center Notice */}
              <div className="z-10 max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center mx-auto text-purple-400">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-base text-white">
                  Camera Feed Inactive
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Webcam hardware access, landmark tracking, and MediaPipe Pose Landmarker
                  will be connected during <strong>Phase 2</strong>. No video streams are captured in this foundational phase.
                </p>
                <div className="pt-2">
                  <Button
                    disabled
                    size="sm"
                    variant="outline"
                    className="border-slate-700 bg-slate-800 text-slate-400 cursor-not-allowed opacity-75"
                  >
                    Start Test (Enabled in Phase 2)
                  </Button>
                </div>
              </div>
            </div>

            {/* Viewport Controls Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>
                  <strong>Privacy Guard:</strong> Video frames process client-side; raw video is never uploaded.
                </span>
              </div>
              <Badge variant="neutral">Worker Engine: Pending</Badge>
            </div>
          </Card>
        </div>

        {/* Protocol Sidebar Checklist */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-600" />
                Assessment Instructions
              </CardTitle>
              <CardDescription>
                Therapist-validated 30-Second Chair Stand Protocol.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>Chair Positioning:</strong> Use a sturdy, armless chair (standard 17 inches) placed firmly against a wall.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  <strong>Starting Stance:</strong> Sit in the middle of the seat with your back straight, feet flat on the floor, and arms crossed at wrists over opposite shoulders.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  <strong>Excursion:</strong> Rise to a full standing position without using your hands, then return to a fully seated position. Repeat continuously for 30 seconds.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-purple-900 space-y-1">
                  <p className="font-semibold text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    Phase 2 Landmark Model
                  </p>
                  <p className="text-[11px] text-purple-800/90 leading-relaxed">
                    Will compute real-time hip-knee angles and classify ascent vs descent states directly inside a dedicated WebAssembly Web Worker.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
