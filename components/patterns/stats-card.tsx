"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Stats Card — 160×80 (per design-standards-v11 §24).
 *
 * Used on Dashboard widgets and Insights surfaces. Anatomy:
 *   - Label (Inter Semi Bold 12, uppercase, muted)
 *   - Number (EB Garamond 32, semibold, foreground)
 *   - Delta (small, colored by direction)
 */
export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number | string;
  /** e.g., "+12%" or "-3.4%". Sign drives the color. */
  delta?: string;
  /** Optional small icon to the left of the label. */
  icon?: React.ReactNode;
}

export function StatsCard({ label, value, delta, icon, className, ...rest }: StatsCardProps) {
  const positive = delta && (delta.startsWith("+") || (delta.length > 0 && !delta.startsWith("-")));
  const negative = delta && delta.startsWith("-");

  return (
    <div
      className={cn(
        "flex min-w-[160px] flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm",
        className
      )}
      style={{ minHeight: 80 }}
      {...rest}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground opacity-70">{icon}</span>}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold leading-none text-foreground">{value}</span>
        {delta && (
          <span
            className={cn(
              "text-xs font-semibold",
              positive && "text-status-success",
              negative && "text-destructive"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
