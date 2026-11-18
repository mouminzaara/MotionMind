"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowLeft, Info, Lock, Mail, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alex.river@preview.internal");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional auth per Phase 1 scope: direct route navigation to dashboard preview
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Return */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          href="/"
          className="text-xs font-medium text-slate-500 hover:text-purple-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Platform Overview
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white mx-auto shadow-sm mb-3">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign In to MotionMind
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your movement workspace and historical assessment logs.
          </p>
        </div>

        {/* Phase 1 Explanatory Alert */}
        <div className="mb-6 rounded-xl border border-purple-200 bg-purple-50/70 p-4 text-xs text-purple-950">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-purple-950">
                Phase 1 Preview Shell Notice
              </p>
              <p className="text-purple-900/90 leading-relaxed text-[11px]">
                Backend authentication logic and JWT session issuance will be activated in Phase 2.
                Submitting this form navigates directly to the dashboard preview.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-slate-200/90 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-slate-400 cursor-not-allowed text-[11px]">
                    Forgot Password? (Phase 2)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Remember this device</span>
                </label>
                <Badge variant="neutral" className="text-[10px]">Preview Mode</Badge>
              </div>

              <div className="pt-2 space-y-2">
                <Button type="submit" className="w-full gap-2">
                  Preview Sign In <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/dashboard" className="w-full block">
                  <Button type="button" variant="outline" className="w-full text-xs">
                    Enter Directly as Guest
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer switch */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
          >
            Create a Preview Account
          </Link>
        </p>
      </div>
    </div>
  );
}
