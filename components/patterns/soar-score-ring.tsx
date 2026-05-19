"use client";
import * as React from "react";
import { cn, clamp } from "@/lib/utils";
import { getSoarTier, SOAR_TIER_TOKENS, type SoarTier } from "@/lib/soar";

/**
 * Soar Score Ring — 80×80 arc ring + numeric score + "Score" label.
 * Per design-standards-v11 §24 and §11.
 *
 * Score is 0–100. The ring fills proportionally; underlying track stays
 * visible. Color is **tier-derived by default** (low/medium/high/elite)
 * via getSoarTier(score); override with `color` prop to force a value.
 */
export interface SoarScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  size?: number; // px; default 80
  thickness?: number; // px; default 6
  /** CSS color or token; default is tier-derived from score */
  color?: string;
  /** Track ring color; default var(--muted) */
  trackColor?: string;
  /** Show "Score" label under the number */
  showLabel?: boolean;
  /** Override the auto-detected tier (useful for showcase / Storybook) */
  forceTier?: SoarTier;
}

export function SoarScoreRing({
  score,
  size = 80,
  thickness = 6,
  color,
  trackColor = "var(--muted)",
  showLabel = true,
  forceTier,
  className,
  ...rest
}: SoarScoreRingProps) {
  const clamped = Math.round(clamp(score, 0, 100));
  const tier = forceTier ?? getSoarTier(clamped);
  const resolvedColor = color ?? SOAR_TIER_TOKENS[tier];
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
      aria-label={`Soar Score: ${clamped} out of 100 (${tier} tier)`}
      data-tier={tier}
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
          stroke={resolvedColor}
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
