"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Row — 1136×64 loading shimmer.
 * Mirrors the row anatomy of Ask/Connection rows so transitions feel calm.
 * Per design-standards-v11 §24.
 */
export interface SkeletonRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton rows to render. */
  count?: number;
}

export function SkeletonRow({ count = 1, className, ...rest }: SkeletonRowProps) {
  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-16 items-center gap-3 border-b border-border px-5 last:border-b-0"
          aria-hidden="true"
        >
          <Shimmer className="h-9 w-9 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Shimmer className="h-3.5 w-1/3 rounded-sm" />
            <Shimmer className="h-3 w-1/4 rounded-sm" />
          </div>
          <Shimmer className="h-6 w-10 rounded-md" />
          <Shimmer className="h-8 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, oklch(0.86 0.04 75 / 0.45), transparent)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.6s linear infinite",
      }}
    />
  );
}
