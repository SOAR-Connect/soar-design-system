"use client";

import * as React from "react";
import { Search, Flag, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { accentVar, type AccentColor } from "../_data/shared";
import { cn } from "@/lib/utils";

interface AskListItem {
  id: string;
  status: "active" | "pending" | "closed" | "completed";
  title: string;
  responses: number;
  age: string;
  responders: { initials: string; accent: AccentColor }[];
  extra?: number;
  unread?: boolean;
}

const sentAsks: AskListItem[] = [
  { id: "ask-1", status: "active",    title: "Looking for a fractional CTO with 10+ years experience", responses: 5,  age: "2h ago", responders: [{ initials: "JM", accent: "indigo" }, { initials: "AK", accent: "rose" }, { initials: "SP", accent: "green" }], extra: 2, unread: true },
  { id: "ask-2", status: "active",    title: "Need a ballet teacher for ages 5–8 in NYC",              responses: 12, age: "1d ago", responders: [{ initials: "MN", accent: "blue" }, { initials: "TC", accent: "indigo" }, { initials: "EW", accent: "amber" }], extra: 1 },
  { id: "ask-3", status: "pending",   title: "Beta testers for new analytics dashboard",               responses: 3,  age: "2d ago", responders: [{ initials: "SP", accent: "green" }, { initials: "LV", accent: "amber" }, { initials: "MN", accent: "blue" }], unread: true },
  { id: "ask-4", status: "closed",    title: "Speaker for our virtual founder panel — May 22",         responses: 8,  age: "3d ago", responders: [{ initials: "JM", accent: "indigo" }, { initials: "AK", accent: "rose" }, { initials: "TC", accent: "blue" }] },
  { id: "ask-5", status: "completed", title: "Recommendations for senior ML hiring",                   responses: 14, age: "5d ago", responders: [{ initials: "SP", accent: "green" }, { initials: "RH", accent: "rose" }, { initials: "EW", accent: "amber" }] },
  { id: "ask-6", status: "active",    title: "Connect with Series B operators",                        responses: 2,  age: "1w ago", responders: [{ initials: "MN", accent: "blue" }, { initials: "LV", accent: "amber" }] },
];

const statusVariant: Record<AskListItem["status"], "success" | "warning" | "secondary" | "default"> = {
  active: "success", pending: "warning", closed: "secondary", completed: "default",
};

interface Response {
  initials: string; accent: AccentColor; actor: string; role: string;
  sentiment: "positive" | "pending" | "negative"; body: string; time: string;
}
const detailResponses: Response[] = [
  { initials: "JM", accent: "indigo", actor: "Jordan Maxwell", role: "GP at Sequoia",       sentiment: "positive", body: "Got someone in mind — Sarah Liu, ex-VP Eng at Plaid. She just wrapped up a fractional engagement at a Series B fint…", time: "2 min ago" },
  { initials: "AK", accent: "rose",   actor: "Anya Krishnan",  role: "Founder at Reframe",  sentiment: "positive", body: "I know two people who could be a fit. One has scaled from $5M → $50M ARR. Want me to send their LinkedIn profile…", time: "1h ago" },
  { initials: "SP", accent: "green",  actor: "Sam Patel",      role: "Eng Lead at Plaid",   sentiment: "pending",  body: "Let me think about who in my network might fit. Will get back to you in a day.", time: "3h ago" },
];
const sentimentVariant: Record<Response["sentiment"], "success" | "warning" | "destructive"> = {
  positive: "success", pending: "warning", negative: "destructive",
};

export default function InboxPage() {
  const [tab, setTab] = React.useState<"sent" | "received">("sent");
  const [activeId, setActiveId] = React.useState("ask-1");
  const [responseFilter, setResponseFilter] = React.useState<"All" | "Positive" | "Not answered" | "Negative">("All");
  const active = sentAsks.find((a) => a.id === activeId)!;

  return (
    <div className="grid h-screen flex-1 grid-cols-[360px_1fr] overflow-hidden">
      <section className="flex h-full flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-5 py-4">
          <h1 className="text-h2 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Inbox</h1>
          <Button variant="outline" size="icon" aria-label="Flag"><Flag /></Button>
        </header>
        <div className="flex border-b border-border px-5">
          <TabButton active={tab === "sent"} onClick={() => setTab("sent")} count={12}>Sent Asks</TabButton>
          <TabButton active={tab === "received"} onClick={() => setTab("received")} count={4}>Received Asks</TabButton>
        </div>
        <div className="px-5 py-3">
          <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-body-sm">
            <Search className="size-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search asks…" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {sentAsks.map((a) => {
            const isActive = a.id === activeId;
            return (
              <li key={a.id} onClick={() => setActiveId(a.id)} className={cn("cursor-pointer border-b border-border/50 px-5 py-4 transition-colors", isActive && "bg-[color-mix(in_oklab,var(--accent-amber)_18%,transparent)]")}>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant={statusVariant[a.status]} className="rounded-full capitalize">{a.status}</Badge>
                  {a.unread && <span className="size-2 rounded-full bg-primary" aria-hidden />}
                </div>
                <p className="mb-2 line-clamp-2 text-body-sm-medium text-card-foreground">{a.title}</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {a.responders.map((r) => (
                      <Avatar key={r.initials} size="sm" className="border-2 border-card" style={{ background: accentVar(r.accent) }}>
                        <AvatarFallback className="bg-transparent text-[9px] text-white">{r.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    {a.extra && (
                      <span className="flex size-6 items-center justify-center rounded-full border-2 border-card bg-secondary text-caption text-muted-foreground">+{a.extra}</span>
                    )}
                  </div>
                  <span className="ml-auto text-caption text-muted-foreground">{a.responses} responses · {a.age}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex h-full flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto px-8 py-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant[active.status]} className="rounded-full capitalize">{active.status}</Badge>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm">Mark complete</Button>
              </div>
            </div>
            <header>
              <h2 className="text-h2 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{active.title}</h2>
              <p className="mt-2 text-caption text-muted-foreground">Sent <strong className="font-medium text-foreground">{active.age}</strong> · To 8 connections · {active.responses} responses</p>
            </header>
            <Card className="rounded-2xl bg-muted/40 p-5">
              <p className="mb-2 text-overline text-muted-foreground">Your ask</p>
              <p className="text-body text-card-foreground">{active.title} to help us scope our next platform iteration. Should have B2B SaaS background and have shipped to enterprise customers.</p>
            </Card>
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-h3 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Responses</h3>
                <div className="ml-auto flex gap-1">
                  {(["All", "Positive", "Not answered", "Negative"] as const).map((f) => {
                    const count = f === "All" ? 5 : f === "Positive" ? 3 : f === "Not answered" ? 2 : 0;
                    return (
                      <button key={f} onClick={() => setResponseFilter(f)} className={cn("rounded-full px-3 py-1 text-small-medium transition-colors", responseFilter === f ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground")}>
                        {f} <span className="opacity-70">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {detailResponses.map((r, i) => (
                  <Card key={i} className="rounded-2xl p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar size="md" style={{ background: accentVar(r.accent) }}>
                        <AvatarFallback className="bg-transparent text-white">{r.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-body-sm-medium text-card-foreground">{r.actor}</span>
                          <Badge variant={sentimentVariant[r.sentiment]} className="rounded-full capitalize">{r.sentiment}</Badge>
                        </div>
                        <span className="text-caption text-muted-foreground">{r.role}</span>
                      </div>
                      <span className="text-caption text-muted-foreground">{r.time}</span>
                    </div>
                    <p className="mb-4 text-body-sm text-foreground">{r.body}</p>
                    <div className="flex gap-2">
                      <Button size="sm">Yes — make intro</Button>
                      <Button variant="outline" size="sm">Tell me more</Button>
                      <Button variant="ghost" size="sm">Decline</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="border-t border-border bg-card px-8 py-4">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <input className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Reply to all respondents…" />
            <Button size="icon" aria-label="Send"><Send /></Button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function TabButton({ active, onClick, count, children }: { active: boolean; onClick: () => void; count: number; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("-mb-px flex items-center gap-2 border-b-2 px-3 py-2 text-body-sm-medium transition-colors", active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
      {children}
      <span className={cn("rounded-full px-1.5 py-0.5 text-caption-medium", active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>{count}</span>
    </button>
  );
}
