"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Menu, X, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                MotionMind
              </span>
              <span className="text-[10px] tracking-wide text-slate-500 font-medium -mt-1 uppercase">
                Movement Intelligence
              </span>
            </div>
          </Link>
          <Badge variant="lavender" className="hidden sm:inline-flex ml-1">
            Phase 1 Foundation
          </Badge>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="#protocol"
            className="hover:text-purple-700 transition-colors"
          >
            STS Protocol
          </Link>
          <Link
            href="#architecture"
            className="hover:text-purple-700 transition-colors"
          >
            System Architecture
          </Link>
          <Link
            href="#roadmap"
            className="hover:text-purple-700 transition-colors"
          >
            Roadmap
          </Link>
          <Link
            href="/dashboard"
            className="text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1 font-semibold"
          >
            Dashboard Preview
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-500" />
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            Preview Account
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <Link
              href="#protocol"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              STS Protocol
            </Link>
            <Link
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              System Architecture
            </Link>
            <Link
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              Roadmap
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md bg-purple-50 text-purple-700 font-semibold"
            >
              Dashboard Preview
            </Link>
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-700"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-medium bg-purple-600 text-white rounded-lg"
            >
              Preview Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

