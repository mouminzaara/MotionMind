"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowLeft, Info, Lock, Mail, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"participant" | "reviewer">("participant");
  const [fullName, setFullName] = useState("Alex River");
  const [email, setEmail] = useState("alex.river@preview.internal");
  const [password, setPassword] = useState("SecurePreviewPass123!");

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
            Create MotionMind Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Initiate your movement intelligence profile and session log.
          </p>
        </div>

        {/* Phase 1 Notice */}
        <div className="mb-6 rounded-xl border border-purple-200 bg-purple-50/70 p-4 text-xs text-purple-950">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-purple-950">
                Phase 1 Preview Shell Notice
              </p>
              <p className="text-purple-900/90 leading-relaxed text-[11px]">
                Registration endpoints and credential hashing in PostgreSQL will be linked in Phase 2.
                Clicking &quot;Create Preview Account&quot; navigates directly to the dashboard shell.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-slate-200/90 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("participant")}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      role === "participant"
                        ? "border-purple-600 bg-purple-50 text-purple-900 font-semibold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Participant
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("reviewer")}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      role === "reviewer"
                        ? "border-purple-600 bg-purple-50 text-purple-900 font-semibold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Clinical Reviewer
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="First and last name"
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Minimum 8 characters"
                  />
                </div>
              </div>

              {/* Non-diagnostic disclaimer checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    required
                    className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="leading-relaxed">
                    I understand that MotionMind is a movement measurement tool and does not provide medical diagnoses or replace clinical care.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full gap-2">
                  Create Preview Account <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer switch */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
          >
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
