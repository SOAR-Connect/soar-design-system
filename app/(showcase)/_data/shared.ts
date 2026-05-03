/**
 * Shared mock data for showcase routes (Dashboard, Asks, Connections, Inbox,
 * Notifications, Profile). The sidebar uses these. Per-route data lives in
 * each route's _data/mock.ts.
 */

export type AccentColor = "blue" | "indigo" | "green" | "amber" | "rose" | "violet";

export const user = {
  name: "Irene Stravinsky",
  email: "irene@soar.com",
  initials: "IS",
  workspace: "Irene's Workspace",
} as const;

export const sidebarPlatform = [
  { id: "dashboard",     label: "Dashboard",     href: "/dashboard-v2",  iconKey: "dashboard" as const, badge: undefined as string | undefined },
  { id: "inbox",         label: "Inbox",         href: "/inbox",         iconKey: "inbox" as const,     badge: "12" },
  { id: "asks",          label: "Asks",          href: "/asks",          iconKey: "sparkles" as const,  badge: "5" },
  { id: "connections",   label: "Connections",   href: "/connections",   iconKey: "users" as const,     badge: "320" },
  { id: "notifications", label: "Notifications", href: "/notifications", iconKey: "bell" as const,      badge: "3" },
];

export const sidebarWorkspaces = [
  { id: "groups",      label: "My Groups",      href: "#" },
  { id: "marketplace", label: "Ask Marketplace", href: "#" },
];

export function accentVar(c: AccentColor): string {
  return `var(--accent-${c})`;
}
