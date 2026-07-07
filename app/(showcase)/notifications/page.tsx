"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";
import { cn } from "@/lib/utils";

interface NotificationItem {
  initials: string; accent: AccentColor; actor: string;
  verb: string; subject?: string; body?: string;
  cta?: string; time: string; unread?: boolean;
  category: "mention" | "ask" | "connection";
}

const today: NotificationItem[] = [
  { initials: "JM", accent: "indigo", actor: "Jordan Maxwell", verb: "replied to your ask",       subject: "\"Looking for a fractional CTO\"", body: "Got someone in mind — Sarah Liu, ex-VP Eng at Plaid…", cta: "View response", time: "2 min", unread: true, category: "ask" },
  { initials: "AK", accent: "rose",   actor: "Anya Krishnan",  verb: "accepted your connection request",                                                                       cta: "View profile",  time: "1h",   unread: true, category: "connection" },
  { initials: "SP", accent: "green",  actor: "Sam Patel",      verb: "mentioned you in",          subject: "\"Beta testers ask\"",            body: "@irene — would love your eyes on this one, you know the space well",                       time: "3h",   unread: true, category: "mention" },
];
const yesterday: NotificationItem[] = [
  { initials: "LV", accent: "amber",  actor: "Lena Voss",      verb: "closed your ask",           subject: "\"Speaker for our virtual founder panel\"",                                                                                  time: "Yesterday", category: "ask" },
  { initials: "RH", accent: "rose",   actor: "Ravi Hassan",    verb: "shared 3 connections",      subject: "\"Senior ML hiring\"",            body: "Andrei Volkov, Nina Park, and Dev Shah — all worked at top AI labs", cta: "View matches", time: "Yesterday", category: "ask" },
  { initials: "MN", accent: "blue",   actor: "Mira Nakamura",  verb: "sent you an intro request",                                            body: "Wants to connect about Series B fundraising — has a co-investor in mind",   cta: "Accept",       time: "Yesterday", category: "connection" },
];
const thisWeek: NotificationItem[] = [
  { initials: "TC", accent: "indigo", actor: "Tom Chen",       verb: "created a new ask in Ask Marketplace:", subject: "\"Looking for design system consultants\"",                                                                                time: "2d ago", category: "ask" },
  { initials: "PR", accent: "rose",   actor: "Priya Raman",    verb: "updated her profile",                                                                            body: "Now Partner at A16z (was Principal). 12 mutual connections updated.", time: "3d ago", category: "connection" },
  { initials: "EW", accent: "amber",  actor: "Erin Walsh",     verb: "rated her experience as",   subject: "\"5 stars\"",                     body: "Great intro from Jordan — closed our seed round in 6 weeks",                                                                                                  time: "5d ago", category: "ask" },
];

const filters = [
  { id: "all",         label: "All",         count: 9 },
  { id: "unread",      label: "Unread",      count: 3 },
  { id: "mention",     label: "Mentions",    count: 1 },
  { id: "ask",         label: "Asks",        count: 5 },
  { id: "connection",  label: "Connections", count: 3 },
] as const;

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState<typeof filters[number]["id"]>("all");
  function show(items: NotificationItem[]) {
    return items.filter((n) => {
      if (filter === "all") return true;
      if (filter === "unread") return n.unread;
      return n.category === filter;
    });
  }
  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Notifications</h1>
            <p className="text-body-sm text-muted-foreground">3 unread · You&apos;re all caught up after this</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button variant="outline">Settings</Button>
            <Button>Mark all as read</Button>
          </div>
        </header>
        <div className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-small-medium transition-colors", filter === f.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f.label}
              <span className={cn("rounded-full px-1.5 py-0.5 text-caption-medium", filter === f.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>{f.count}</span>
            </button>
          ))}
        </div>
        <Card className="overflow-hidden rounded-2xl">
          <Section label="Today" count={today.length} items={show(today)} />
          <Section label="Yesterday" count={yesterday.length} items={show(yesterday)} />
          <Section label="This week" count={thisWeek.length} items={show(thisWeek)} />
        </Card>
      </div>
    </main>
  );
}

function Section({ label, count, items }: { label: string; count: number; items: NotificationItem[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <header className="flex items-center justify-between bg-muted/40 px-6 py-2 text-overline text-muted-foreground"><span>{label}</span><span>{count}</span></header>
      <ul>
        {items.map((n, i) => (
          <li key={i} className={cn("flex items-start gap-3 border-b border-border/50 px-6 py-4 last:border-b-0", n.unread && "bg-[color-mix(in_oklab,var(--accent-amber)_18%,transparent)]")}>
            <Avatar size="md" style={{ background: accentVar(n.accent) }}>
              <AvatarFallback className="bg-transparent text-white">{n.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-body-sm">
                <span className="font-medium text-card-foreground">{n.actor}</span>{" "}
                <span className="text-muted-foreground">{n.verb}</span>{" "}
                {n.subject && <span className="font-medium text-foreground">{n.subject}</span>}
              </p>
              {n.body && <p className="text-small text-foreground">{n.body}</p>}
              {n.cta && <div className="mt-1"><Button variant="outline" size="sm">{n.cta}</Button></div>}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-caption text-muted-foreground">{n.time}</span>
              {n.unread && <span className="size-2 rounded-full bg-primary" aria-hidden />}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
