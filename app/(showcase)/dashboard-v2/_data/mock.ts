/**
 * Dashboard v2 mock data — mirrors copy from Figma file 0u7EjU8sbCqCBmgPN7ufBO,
 * page "🚀 Dashboard v2" (4016:2). Replace with live API calls in production.
 */

export type AccentColor = "blue" | "indigo" | "green" | "amber" | "rose" | "violet";
export type AskStatus = "active" | "pending" | "closed";

export const user = {
  name: "Irene Stravinsky",
  email: "irene@soar.com",
  initials: "IS",
  workspace: "Irene's Workspace",
  greeting: "Good morning, Irene",
  meta: "Tuesday, May 14 · You have 3 new responses to review.",
} as const;

export interface KpiData {
  label: string;
  value: string;
  delta: { sign: "up" | "down"; value: string };
  accent: AccentColor;
  series: number[]; // 0–1, length = bar count
}

export const kpis: KpiData[] = [
  {
    label: "Connections",
    value: "320",
    delta: { sign: "up", value: "12%" },
    accent: "blue",
    series: [0.20, 0.43, 0.31, 0.54, 0.43, 0.66, 0.54, 0.77, 0.66, 0.89, 0.77, 1.00],
  },
  {
    label: "Active asks",
    value: "5",
    delta: { sign: "up", value: "2" },
    accent: "indigo",
    series: [0.20, 0.40, 0.40, 0.60, 0.60, 0.80, 0.80, 1.00, 0.80, 1.00, 1.00, 1.00],
  },
  {
    label: "Responses this week",
    value: "24",
    delta: { sign: "up", value: "8%" },
    accent: "green",
    series: [0.31, 0.20, 0.43, 0.31, 0.54, 0.43, 0.66, 0.77, 0.54, 0.89, 0.77, 1.00],
  },
  {
    label: "Pending intros",
    value: "3",
    delta: { sign: "down", value: "1" },
    accent: "amber",
    series: [1.00, 0.73, 0.73, 0.47, 0.47, 0.73, 0.47, 0.20, 0.47, 0.20, 0.47, 0.47],
  },
];

export interface AskItem {
  title: string;
  responses: number;
  age: string;
  status: AskStatus;
}

export const recentAsks: AskItem[] = [
  { title: "Looking for a fractional CTO with 10+ years experience", responses: 5, age: "2h ago", status: "active" },
  { title: "Need a ballet teacher for ages 5–8 in NYC", responses: 12, age: "1d ago", status: "active" },
  { title: "Beta testers for new analytics dashboard", responses: 3, age: "2d ago", status: "pending" },
  { title: "Speaker for our virtual founder panel — May 22", responses: 8, age: "3d ago", status: "closed" },
];

export interface ActivityItem {
  initials: string;
  accent: AccentColor;
  actor: string;
  verb: string;
  object?: string;
  time: string;
}

export const activity: ActivityItem[] = [
  { initials: "JM", accent: "indigo", actor: "Jordan Maxwell", verb: "replied to your ask", object: "\"Looking for a fractional CTO\"", time: "2 min ago" },
  { initials: "AK", accent: "rose", actor: "Anya Krishnan", verb: "accepted your connection request", time: "1h ago" },
  { initials: "SP", accent: "green", actor: "Sam Patel", verb: "mentioned you in", object: "\"Beta testers ask\"", time: "3h ago" },
  { initials: "LV", accent: "amber", actor: "Lena Voss", verb: "closed your ask", object: "\"Speaker for our virtual founder panel\"", time: "5h ago" },
];

export interface ConnectionItem {
  initials: string;
  accent: AccentColor;
  name: string;
  role: string;
  score: number;
}

export const topConnections: ConnectionItem[] = [
  { initials: "JM", accent: "indigo", name: "Jordan Maxwell", role: "GP at Sequoia", score: 98 },
  { initials: "AK", accent: "rose", name: "Anya Krishnan", role: "Founder at Reframe", score: 96 },
  { initials: "SP", accent: "green", name: "Sam Patel", role: "Eng Lead at Plaid", score: 94 },
  { initials: "MN", accent: "blue", name: "Mira Nakamura", role: "Partner at A16z", score: 92 },
];

export interface GoalItem {
  label: string;
  current: number;
  target: number;
}

export const q2Goals: GoalItem[] = [
  { label: "New connections", current: 248, target: 300 },
  { label: "Asks completed", current: 14, target: 20 },
  { label: "Quality intros (Soar > 90)", current: 9, target: 15 },
];

export const sidebarPlatform = [
  { id: "dashboard", label: "Dashboard", iconKey: "dashboard" as const, badge: undefined as string | undefined, active: true },
  { id: "inbox", label: "Inbox", iconKey: "inbox" as const, badge: "12" },
  { id: "asks", label: "Asks", iconKey: "sparkles" as const, badge: "5" },
  { id: "connections", label: "Connections", iconKey: "users" as const, badge: "320" },
  { id: "notifications", label: "Notifications", iconKey: "bell" as const, badge: "3" },
];

export const sidebarWorkspaces = [
  { id: "groups", label: "My Groups" },
  { id: "marketplace", label: "Ask Marketplace" },
];

/**
 * Map an AccentColor to its CSS variable token name (matches our tokens).
 */
export function accentVar(c: AccentColor): string {
  return `var(--accent-${c})`;
}
