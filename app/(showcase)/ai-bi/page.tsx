"use client";

import * as React from "react";
import { Sparkles, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AiBiPage() {
  const suggestions = [
    "Who's responding fastest to my asks this quarter?",
    "Which of my connections changed jobs in the last 30 days?",
    "Show me my network growth by source",
    "Top 10 introducers by intro count",
  ];
  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-overline text-muted-foreground">AI BI</p>
            <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Ask anything about your network</h1>
            <p className="text-body-sm text-muted-foreground">Plain-English questions. SQL-grade answers. Charts attached.</p>
          </div>
          <ThemeToggle />
        </header>
        <Card className="rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-primary" />
            <input className="flex-1 bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground" placeholder="Ask a question about your network…" />
            <Button><Send /> Run</Button>
          </div>
        </Card>
        <div>
          <p className="mb-3 text-overline text-muted-foreground">Try one of these</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {suggestions.map((s) => (
              <button key={s} className="rounded-xl border border-border bg-card px-4 py-3 text-left text-body-sm text-card-foreground transition-colors hover:border-primary/40">{s}</button>
            ))}
          </div>
        </div>
        <Card className="rounded-2xl p-6">
          <header className="mb-3 flex items-center gap-2"><Badge variant="outline" className="rounded-full">Last query</Badge><p className="flex-1 text-body-sm text-muted-foreground">Connections by tag, last 30 days</p><Button variant="ghost" size="sm">Save</Button></header>
          <div className="flex h-40 items-end gap-3 rounded-md bg-muted/40 p-4">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.85, 0.3].map((h, i) => (<span key={i} className="flex-1 rounded-md" style={{ height: `${h * 100}%`, background: "var(--accent-blue)", opacity: 0.5 + h * 0.5 }} />))}
          </div>
        </Card>
      </div>
    </main>
  );
}
