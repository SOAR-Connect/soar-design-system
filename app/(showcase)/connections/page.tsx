"use client";

import * as React from "react";
import { Search, Plus, Upload, LayoutGrid, List, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";
import { cn } from "@/lib/utils";

interface Connection {
  initials: string; accent: AccentColor; name: string; role: string;
  location: string; tags: string[]; mutual: number; score: number;
}

const connections: Connection[] = [
  { initials: "JM", accent: "indigo", name: "Jordan Maxwell", role: "GP at Sequoia",       location: "San Francisco", tags: ["Investor",  "SaaS"],     mutual: 14, score: 98 },
  { initials: "AK", accent: "rose",   name: "Anya Krishnan",  role: "Founder at Reframe",  location: "New York",      tags: ["Founder",   "Health"],   mutual: 8,  score: 96 },
  { initials: "SP", accent: "green",  name: "Sam Patel",      role: "Eng Lead at Plaid",   location: "San Francisco", tags: ["Engineer",  "Fintech"],  mutual: 22, score: 94 },
  { initials: "MN", accent: "blue",   name: "Mira Nakamura",  role: "Partner at A16z",     location: "Menlo Park",    tags: ["Investor",  "AI"],       mutual: 11, score: 92 },
  { initials: "LV", accent: "amber",  name: "Lena Voss",      role: "CMO at Notion",       location: "Berlin",        tags: ["Marketing", "SaaS"],     mutual: 6,  score: 90 },
  { initials: "RH", accent: "rose",   name: "Ravi Hassan",    role: "CTO at Stripe",       location: "Dublin",        tags: ["Engineer",  "Payments"], mutual: 9,  score: 88 },
  { initials: "TC", accent: "indigo", name: "Tom Chen",       role: "Founder at Anthropic",location: "San Francisco", tags: ["Founder",   "AI"],       mutual: 5,  score: 86 },
  { initials: "EW", accent: "amber",  name: "Erin Walsh",     role: "Designer at Linear",  location: "NYC",           tags: ["Designer",  "Tools"],    mutual: 17, score: 84 },
  { initials: "PR", accent: "rose",   name: "Priya Raman",    role: "Partner at A16z",     location: "NYC",           tags: ["Investor",  "SaaS"],     mutual: 4,  score: 82 },
];

const filters = ["All", "Investors", "Founders", "Engineers"];

export default function ConnectionsPage() {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [view, setView] = React.useState<"list" | "grid">("list");

  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              Connections
            </h1>
            <p className="text-body-sm text-muted-foreground">
              {connections.length * 36} connections · 14 added this week
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button variant="outline"><Upload /> Import</Button>
            <Button><Plus /> Add connection</Button>
          </div>
        </header>

        <Card className="overflow-hidden rounded-2xl">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-6 py-4">
            <div className="flex h-9 w-72 items-center gap-2 rounded-md border border-border bg-background px-3 text-body-sm">
              <Search className="size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, company, or interest…"
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "rounded-full px-3 py-1 text-small-medium transition-colors",
                    activeFilter === f
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 text-small text-muted-foreground">
                Sort by
                <select className="rounded-md border border-border bg-background px-2 py-1 text-small text-foreground">
                  <option>Last contact</option>
                  <option>SOAR score</option>
                  <option>Mutual</option>
                </select>
              </div>
              <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
                <button onClick={() => setView("list")} aria-label="List" className={cn("flex size-7 items-center justify-center rounded text-muted-foreground", view === "list" && "bg-secondary text-foreground")}>
                  <List className="size-4" />
                </button>
                <button onClick={() => setView("grid")} aria-label="Grid" className={cn("flex size-7 items-center justify-center rounded text-muted-foreground", view === "grid" && "bg-secondary text-foreground")}>
                  <LayoutGrid className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-body-sm">
              <thead className="bg-muted/40 text-overline text-muted-foreground">
                <tr>
                  <Th className="w-1/3">Name</Th>
                  <Th>Location</Th>
                  <Th>Tags</Th>
                  <Th>Mutual</Th>
                  <Th>Score</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {connections.map((c) => (
                  <tr key={c.name} className="hover:bg-muted/20">
                    <Td>
                      <div className="flex items-center gap-3">
                        <Avatar size="md" style={{ background: accentVar(c.accent) }}>
                          <AvatarFallback className="bg-transparent text-white">{c.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                          <p className="truncate text-body-sm-medium text-card-foreground">{c.name}</p>
                          <p className="truncate text-caption text-muted-foreground">{c.role}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-3.5" /> {c.location}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex gap-1">
                        {c.tags.map((t) => (
                          <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                        ))}
                      </div>
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Users className="size-3.5" /> {c.mutual} mutual
                      </span>
                    </Td>
                    <Td>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-caption-medium text-foreground">
                        {c.score}
                      </span>
                    </Td>
                    <Td className="text-right">
                      <Button variant="outline" size="sm">Message</Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn("px-6 py-3 text-left font-medium uppercase tracking-wide", className)}>{children}</th>;
}
function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn("px-6 py-3 align-middle", className)}>{children}</td>;
}
