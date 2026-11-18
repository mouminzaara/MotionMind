"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Video,
  Server,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DisclaimerCard } from "@/components/shared/disclaimer-card";
import { fetchBackendHealth, HealthResponse } from "@/lib/api";

export default function LandingPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchBackendHealth()
      .then((data) => {
        if (isMounted) {
          setHealth(data);
          setLoadingHealth(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingHealth(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFE]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* Badges */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2">
                <Badge variant="lavender" className="py-1 px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block mr-1"></span>
                  Phase 1 Foundation Live
                </Badge>
                <Badge variant="neutral" className="py-1 px-3">
                  Objective Movement Intelligence
                </Badge>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Therapist-Guided Sit-to-Stand Tracking Through Your{" "}
                <span className="text-purple-700">Webcam</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                MotionMind measures repetition velocity, phase duration, and bilateral symmetry during
                standard chair stand exercises. Edge-first pose tracking runs privately in your browser—no video is uploaded.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-6">
                    Explore Preview Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/record" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 text-base px-6 border-slate-300"
                  >
                    <Video className="w-4 h-4 text-purple-600" />
                    Movement Recorder Shell
                  </Button>
                </Link>
              </div>

              {/* Subtle Trust & Privacy Statement */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Client-side video processing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  Validated 30CST protocol
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-600" />
                  Non-diagnostic biofeedback
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Live System Health Section */}
        <section className="py-10 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Backend Vitality & Health Probe
                  </h3>
                  <code className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                    GET /api/v1/health
                  </code>
                </div>
                <span className="text-xs text-slate-500">
                  Real API probe connected to FastAPI backend
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Service Status */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                  <p className="text-slate-500 text-[11px] font-medium">Service Status</p>
                  <p className="font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        loadingHealth
                          ? "bg-amber-400"
                          : health?.status === "healthy"
                          ? "bg-emerald-500"
                          : health?.status === "degraded"
                          ? "bg-amber-500"
                          : "bg-slate-400"
                      }`}
                    ></span>
                    {loadingHealth
                      ? "Probing API..."
                      : health?.status === "healthy"
                      ? "Healthy"
                      : health?.status === "degraded"
                      ? "Online (Degraded)"
                      : "Offline / Standby"}
                  </p>
                </div>

                {/* API Release */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                  <p className="text-slate-500 text-[11px] font-medium">API Version</p>
                  <p className="font-semibold text-slate-900 mt-1 font-mono">
                    {health ? health.version : "v0.1.0"}
                  </p>
                </div>

                {/* Database Dialect */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                  <p className="text-slate-500 text-[11px] font-medium">Database Layer</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {health?.database?.status === "connected"
                      ? `Connected (${health.database.dialect})`
                      : "Scaffolded (Postgres)"}
                  </p>
                </div>

                {/* Environment */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                  <p className="text-slate-500 text-[11px] font-medium">Environment</p>
                  <p className="font-semibold text-slate-900 mt-1 capitalize">
                    {health ? health.environment : "development"}
                  </p>
                </div>
              </div>

              {health?.status === "unreachable" && (
                <div className="mt-3 p-2.5 rounded-md bg-purple-50/80 border border-purple-200/70 text-[11px] text-purple-900 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span>
                    Backend dev server can be started on port 8000 via{" "}
                    <code className="font-mono bg-white px-1 py-0.5 rounded text-purple-800">
                      python -m uvicorn app.main:app --port 8000
                    </code>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sit-to-Stand Protocol Section */}
        <section id="protocol" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <Badge variant="lavender">Standardized Assessment</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                The 30-Second Chair Stand Protocol
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                A clinically validated assessment utilized by physical therapists to evaluate lower-extremity
                functional endurance, transitional velocity, and bilateral balance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-2">
                    01
                  </div>
                  <CardTitle className="text-base">Standard Setup</CardTitle>
                  <CardDescription>
                    Armless 17-inch chair placed securely against a wall. Subject starts upright with arms crossed over opposite shoulders.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>No arm pushing permitted</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-2">
                    02
                  </div>
                  <CardTitle className="text-base">Concentric Excursion</CardTitle>
                  <CardDescription>
                    Rise to full knee and hip extension (standing apex), measuring vertical torso velocity and forward trunk lean angle.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Full 165°+ knee extension</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-2">
                    03
                  </div>
                  <CardTitle className="text-base">Controlled Eccentric Phase</CardTitle>
                  <CardDescription>
                    Controlled descent until pelvis re-contacts the seat. Quantifies motor deceleration control rather than unassisted dropping.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Full seat contact before next rep</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase Implementation Roadmap */}
        <section id="roadmap" className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <Badge variant="neutral">Engineering Discipline</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Phase-by-Phase Platform Delivery
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Building an honest, production-grade movement measurement system step by step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Phase 1 */}
              <div className="p-5 rounded-xl border-2 border-purple-500 bg-purple-50/30 relative">
                <span className="absolute -top-3 left-4 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Phase 1: Active
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2">Foundation</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Next.js monorepo, FastAPI backend, health check, SQLAlchemy models & Alembic scaffolding.
                </p>
                <Badge variant="success">Completed</Badge>
              </div>

              {/* Phase 2 */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-sm text-slate-900">Computer Vision</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  MediaPipe Pose in Web Worker, webcam stream capture, real-time joint angle computations.
                </p>
                <Badge variant="neutral">Phase 2 Target</Badge>
              </div>

              {/* Phase 3 */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-sm text-slate-900">Biomechanical Features</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Concentric/eccentric phase breakdown, symmetry indices, session storage in PostgreSQL.
                </p>
                <Badge variant="neutral">Phase 3 Target</Badge>
              </div>

              {/* Phase 4 */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-sm text-slate-900">Reviewer Dossiers</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Invited clinician sharing, longitudinal comparison, PDF summaries, exportable metrics.
                </p>
                <Badge variant="neutral">Phase 4 Target</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Disclaimer Block */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <DisclaimerCard />
        </section>
      </main>

      <Footer />
    </div>
  );
}
