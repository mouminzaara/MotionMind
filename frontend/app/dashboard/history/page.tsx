import React from "react";
import Link from "next/link";
import { History, ArrowLeft, Video } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SessionHistoryPage() {
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
            Session History & Longitudinal Log
          </h1>
          <p className="text-sm text-slate-500">
            Audit log of completed sit-to-stand movement tests and kinematic feature vectors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="lavender">PostgreSQL Scaffolding Ready</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-base">Historical Movement Records</CardTitle>
              <CardDescription>
                Synchronized with the backend <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-700">movement_sessions</code> and <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-700">session_metrics</code> tables.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-y border-slate-200">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Date & Time</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Protocol</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Repetitions</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Concentric Time</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Symmetry Index</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Review Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty State Row */}
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center">
                    <div className="max-w-sm mx-auto space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <History className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        No Session Records in Database
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Sessions performed via the webcam recorder in Phase 2 will be validated and persisted here. No synthetic fake records are displayed.
                      </p>
                      <div className="pt-2">
                        <Link href="/dashboard/record">
                          <Button size="sm" variant="secondary" className="gap-2">
                            <Video className="w-3.5 h-3.5" />
                            Go to Recorder Shell
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
