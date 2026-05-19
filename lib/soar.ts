/**
 * SOAR Design System — domain-specific helpers
 *
 * Pure logic (no React, no DOM) for SOAR product concepts:
 *  - SOAR Score tier classification + tokens
 *  - Group type tokens
 *  - Membership state mapping
 *
 * Components that render badges, pills, or score rings should consume
 * the *_TOKENS / *_CLASSES maps below rather than hardcoding values.
 */

// ── SOAR Score tiers ──────────────────────────────────────────────────────────

export type SoarTier = "low" | "medium" | "high" | "elite";

/**
 * Map a numeric SOAR Score (0–100) to a semantic tier.
 * Boundaries match design-standards-v11 §11.
 */
export function getSoarTier(score: number): SoarTier {
  if (score >= 90) return "elite";
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

/** Tier → human-readable label */
export const SOAR_TIER_LABELS: Record<SoarTier, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  elite: "Elite",
};

/** Tier → raw CSS variable (use in inline styles or where Tailwind class isn't usable) */
export const SOAR_TIER_TOKENS: Record<SoarTier, string> = {
  low: "var(--soar-low)",
  medium: "var(--soar-medium)",
  high: "var(--soar-high)",
  elite: "var(--soar-elite)",
};

/** Tier → Tailwind class string for a colored chip / badge */
export const SOAR_TIER_CLASSES: Record<SoarTier, string> = {
  low: "text-soar-low bg-soar-low/10 border-soar-low/20",
  medium: "text-soar-medium bg-soar-medium/10 border-soar-medium/20",
  high: "text-soar-high bg-soar-high/10 border-soar-high/20",
  elite: "text-soar-elite bg-soar-elite/10 border-soar-elite/30 shadow-[0_0_12px_var(--soar-glow)]",
};

// ── Group types ───────────────────────────────────────────────────────────────

export type GroupType = "public" | "private" | "circle" | "subgroup";

export const GROUP_TYPE_LABELS: Record<GroupType, string> = {
  public: "Public",
  private: "Private",
  circle: "Circle",
  subgroup: "Subgroup",
};

export const GROUP_TYPE_TOKENS: Record<GroupType, string> = {
  public: "var(--group-public)",
  private: "var(--group-private)",
  circle: "var(--group-circle)",
  subgroup: "var(--group-subgroup)",
};

export const GROUP_TYPE_CLASSES: Record<GroupType, string> = {
  public: "text-group-public border-group-public/40 bg-group-public/10",
  private: "text-group-private border-group-private/40 bg-group-private/10",
  circle: "text-group-circle border-group-circle/40 bg-group-circle/10",
  subgroup: "text-group-subgroup border-group-subgroup/40 bg-group-subgroup/10",
};

// ── Membership state (per design-standards-v11 §11) ──────────────────────────

export type MembershipState = "member" | "pending" | "request-to-join" | "open-join";

export const MEMBERSHIP_LABELS: Record<MembershipState, string> = {
  member: "Member",
  pending: "Pending Approval",
  "request-to-join": "Request to Join",
  "open-join": "Open",
};

export const MEMBERSHIP_BADGE_CLASSES: Record<MembershipState, string> = {
  member: "text-status-success bg-status-success/10",
  pending: "text-status-warning bg-status-warning/10",
  "request-to-join": "text-muted-foreground bg-muted",
  "open-join": "text-status-success bg-status-success/10",
};

export const MEMBERSHIP_CTA_LABELS: Record<MembershipState, string> = {
  member: "Open Group →",
  pending: "Withdraw",
  "request-to-join": "Request to Join →",
  "open-join": "+ Join",
};
