"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  History,
  Users,
  Settings,
  LogOut,
  Activity,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Record Movement",
    href: "/dashboard/record",
    icon: Video,
    badge: "Phase 2",
  },
  {
    name: "Session History",
    href: "/dashboard/history",
    icon: History,
    badge: null,
  },
  {
    name: "Reviewer Sharing",
    href: "/dashboard/reviewers",
    icon: Users,
    badge: "Phase 4",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between min-h-[calc(100vh-45px)]">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-slate-900 block leading-tight">
              MotionMind
            </span>
            <span className="text-[10px] text-purple-700 font-semibold uppercase tracking-wider block">
              Participant Portal
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Movement Workspaces
          </div>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-50 text-purple-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-purple-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge variant="neutral" className="text-[10px] py-0 px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}

          {/* Disabled Setting item */}
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-400 cursor-not-allowed select-none opacity-60"
            title="Account preferences will be configurable in Phase 3"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
              Inactive
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Profile Preview */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold text-xs flex-shrink-0">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 truncate flex items-center gap-1">
              Alex River
              <UserCheck className="w-3 h-3 text-purple-600 flex-shrink-0" />
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              alex.river@preview.internal
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 py-1.5 hover:bg-slate-100 rounded-md transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Exit Preview Session
        </Link>
      </div>
    </aside>
  );
}

