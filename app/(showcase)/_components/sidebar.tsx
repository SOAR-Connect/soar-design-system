"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, LayoutDashboard, Inbox, Sparkles, Users, Bell, MoreHorizontal, ChevronDown, Circle } from "lucide-react";
import { SidebarItem } from "@/components/ui/sidebar-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sidebarPlatform, sidebarWorkspaces, user } from "../_data/shared";
import { cn } from "@/lib/utils";

const iconMap = {
  dashboard: LayoutDashboard,
  inbox: Inbox,
  sparkles: Sparkles,
  users: Users,
  bell: Bell,
} as const;

export function ShowcaseSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-sidebar p-2 text-sidebar-foreground">
      <button className="flex items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-sidebar-accent">
        <span className="size-5 shrink-0 rounded-sm bg-primary" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-small-semibold">SOAR Connect</span>
          <span className="truncate text-caption text-muted-foreground">{user.workspace}</span>
        </span>
        <ChevronDown className="size-3 text-muted-foreground" aria-hidden />
      </button>

      <div className="px-2 py-1">
        <div className="flex h-8 w-full items-center gap-1 rounded-md border border-border bg-background px-2 text-body-sm text-muted-foreground">
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="flex-1 truncate text-small">Search…</span>
          <kbd className="rounded bg-secondary px-1 text-caption-medium text-muted-foreground">⌘K</kbd>
        </div>
      </div>

      <SectionLabel>Platform</SectionLabel>
      <nav className="flex flex-col gap-0.5" aria-label="Platform navigation">
        {sidebarPlatform.map((item) => {
          const Icon = iconMap[item.iconKey];
          const active = pathname === item.href;
          return (
            <SidebarItem key={item.id} state={active ? "active" : "default"} asChild>
              <Link href={item.href}>
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="flex-1 truncate text-left">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-caption-medium text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            </SidebarItem>
          );
        })}
      </nav>

      <SectionLabel className="mt-4">Workspaces</SectionLabel>
      <nav className="flex flex-col gap-0.5" aria-label="Workspaces">
        {sidebarWorkspaces.map((item) => (
          <SidebarItem key={item.id} asChild>
            <Link href={item.href}>
              <Circle className="size-3 shrink-0 text-muted-foreground" aria-hidden />
              <span className="flex-1 truncate text-left">{item.label}</span>
            </Link>
          </SidebarItem>
        ))}
      </nav>

      <div className="flex-1" />
      <div className="my-1 h-px w-full bg-sidebar-border" />

      <button className="flex items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-sidebar-accent">
        <Avatar size="md" style={{ background: "var(--accent-indigo)" }}>
          <AvatarFallback className="bg-transparent text-white">{user.initials}</AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-small-medium text-sidebar-foreground">{user.name}</span>
          <span className="truncate text-caption text-muted-foreground">{user.email}</span>
        </span>
        <MoreHorizontal className="size-3.5 text-muted-foreground" aria-hidden />
      </button>
    </aside>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("px-2 py-1 text-overline text-muted-foreground", className)}>
      {children}
    </p>
  );
}
