"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Soar Score Ring — 80×80 arc ring + numeric score + "Score" label.
 * Per design-standards-v11 §24.
 *
 * Score is 0–100. The ring fills proportionally; underlying track stays
 * visible. Color is brand-primary by default; override via `color` prop.
 */
export interface SoarScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  size?: number; // px; default 80
  thickness?: number; // px; default 6
  color?: string; // CSS color or token; default var(--primary)
  trackColor?: string; // default var(--muted)
  showLabel?: boolean; // show "Score" label under number
}

export function SoarScoreRing({
  score,
  size = 80,
  thickness = 6,
  color = "oklch(0.40 0.14 30)",
  trackColor = "oklch(0.94 0.025 75)",
  showLabel = true,
  className,
  ...rest
}: SoarScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Soar Score: ${clamped} out of 100`}
      {...rest}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display text-xl font-semibold text-foreground">{clamped}</span>
        {showLabel && (
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Score
          </span>
        )}
      </div>
    </div>
  );
}
