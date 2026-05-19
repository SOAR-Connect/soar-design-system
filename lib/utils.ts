import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — resolves conflicts, dedupes.
 * The standard shadcn/ui pattern.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a SOAR Score for display.
 * Single-decimal precision, e.g. 87 → "87.0", 64.27 → "64.3".
 */
export function formatSoarScore(score: number): string {
  return clamp(score, 0, 100).toFixed(1);
}

/**
 * Generate initials from a full name (max 2 chars, uppercase).
 * "Irene Sousa" → "IS"; "David" → "D"; "  " → "".
 */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
