"use client";

import { Send, X, LayoutGrid, List, Check } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";
import { cn } from "@/lib/utils";
import * as React from "react";

interface Recommendation {
  initials: string;
  accent: AccentColor;
  name: string;
  role: string;
  score: number;
  tags: string[];
}

const top: Recommendation[] = [
  { initials: "AM", accent: "blue",   name: "Arlene McCoy",      role: "Director", score: 96, tags: ["Music", "Culture", "Art"] },
  { initials: "DR", accent: "rose",   name: "Darlene Robertson", role: "Director", score: 94, tags: ["Music", "Culture", "Art"] },
];
const suggested: Recommendation[] = [
  { initials: "WW", accent: "amber",  name: "Wade Warren",       role: "Director", score: 88, tags: ["Music", "Culture", "Art"] },
  { initials: "JP", accent: "green",  name: "John Pena",         role: "Director", score: 86, tags: ["Music", "Culture", "Art"] },
  { initials: "KM", accent: "rose",   name: "Kathryn Murphy",    role: "Director", score: 84, tags: ["Music", "Culture", "Art"] },
];

const filterPills = ["All", "Investors", "Engineers", "Designers"];
const promptChips = ["New York +", "When +", "Ballet +", "Organisation +", "with 10-year experience +"];

export default function AsksPage() {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [view, setView] = React.useState<"list" | "grid">("list");
  const [selected, setSelected] = React.useState<Set<string>>(new Set([
    "Arlene McCoy", "Wade Warren", "John Pena", "Kathryn Murphy",
  ]));
  const toggle = (name: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });

  const send = () => {
    toast.success(`Asks sent to ${selected.size} connections`, {
      description: "We'll notify you as responses come in.",
    });
    setSelected(new Set());
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>

        <section className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Create your ask
          </h1>
          <p className="max-w-md text-body text-muted-foreground">
            Enter your request and we will find the right connections to help.
            We learn your patterns to surface the most relevant intros.
          </p>
        </section>

        <Card className="rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            <textarea
              className="min-h-12 w-full resize-none rounded-md border border-primary/60 bg-transparent p-3 text-body text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              defaultValue="Need a ballet teacher for young children, specifically for girls aged 5"
              rows={1}
            />
            <div className="flex flex-wrap items-center gap-2">
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-small text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {chip}
                </button>
              ))}
              <div className="ml-auto">
                <Button>Ask</Button>
              </div>
            </div>
          </div>
        </Card>

        {selected.size > 0 && (
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-primary-foreground"
            style={{ background: "var(--accent-amber)" }}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-small-medium text-primary-foreground">
              {selected.size}
            </span>
            <span className="flex-1 text-body-medium">connections selected — ready to send</span>
            <button
              className="text-small-medium hover:underline"
              onClick={() => setSelected(new Set())}
            >
              Clear
            </button>
            <Button variant="default" onClick={send}>
              <Send /> Send asks
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {filterPills.map((p) => (
              <button
                key={p}
                onClick={() => setActiveFilter(p)}
                className={cn(
                  "rounded-full px-3 py-1 text-small-medium transition-colors",
                  activeFilter === p
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 text-small text-muted-foreground">
              <span>Sort by</span>
              <Select defaultValue="soar-score">
                <SelectTrigger className="h-8 w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="soar-score">SOAR score</SelectItem>
                  <SelectItem value="last-contact">Last contact</SelectItem>
                  <SelectItem value="mutual">Mutual connections</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={cn("flex size-7 items-center justify-center rounded text-muted-foreground", view === "list" && "bg-secondary text-foreground")}
              >
                <List className="size-4" />
              </button>
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={cn("flex size-7 items-center justify-center rounded text-muted-foreground", view === "grid" && "bg-secondary text-foreground")}
              >
                <LayoutGrid className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <RecommendationGroup
          label="Top recommendations"
          count={top.length}
          items={top}
          selected={selected}
          toggle={toggle}
        />
        <RecommendationGroup
          label="Suggested connections"
          count={suggested.length}
          items={suggested}
          selected={selected}
          toggle={toggle}
        />
      </div>
    </main>
  );
}

function RecommendationGroup({
  label, count, items, selected, toggle,
}: {
  label: string; count: number; items: Recommendation[];
  selected: Set<string>; toggle: (name: string) => void;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <header className="flex items-center justify-between px-6 pt-4 pb-2 text-overline text-muted-foreground">
        <span>{label}</span>
        <span>{count} connections</span>
      </header>
      <ul className="divide-y divide-border/50">
        {items.map((r) => {
          const isSelected = selected.has(r.name);
          return (
            <li
              key={r.name}
              className={cn(
                "flex items-center gap-3 px-6 py-3 transition-colors",
                isSelected ? "" : "bg-background"
              )}
              style={isSelected ? { background: "color-mix(in oklab, var(--accent-amber) 18%, transparent)" } : undefined}
            >
              <Avatar size="md" style={{ background: accentVar(r.accent) }}>
                <AvatarFallback className="bg-transparent text-white">{r.initials}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-body-sm-medium text-card-foreground">{r.name}</p>
                <p className="truncate text-caption text-muted-foreground">{r.role}</p>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-caption-medium text-foreground">{r.score}</span>
              <div className="flex gap-1">
                {r.tags.map((t) => (
                  <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">Contact</Button>
              <button
                aria-label={isSelected ? "Unselect" : "Select"}
                onClick={() => toggle(r.name)}
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-transparent hover:border-primary"
                )}
              >
                {isSelected ? <Check className="size-3.5" /> : <X className="size-3.5 opacity-0" />}
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
