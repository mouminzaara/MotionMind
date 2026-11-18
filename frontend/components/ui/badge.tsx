import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lavender" | "neutral" | "amber" | "outline" | "success";
}

export function Badge({
  className,
  variant = "lavender",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    lavender: "bg-purple-50 text-purple-700 border-purple-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    outline: "bg-transparent text-slate-700 border-slate-300",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

