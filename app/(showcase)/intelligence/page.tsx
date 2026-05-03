import { TrendingUp, Network, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar } from "../_data/shared";

export default function IntelligencePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-overline text-muted-foreground">Intelligence</p>
            <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Network signals</h1>
            <p className="text-body-sm text-muted-foreground">AI-detected patterns across your relationships, last 30 days.</p>
          </div>
          <ThemeToggle />
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((s) => (
            <Card key={s.label} className="rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2"><s.icon className="size-4 text-primary" /><p className="flex-1 text-small-medium text-muted-foreground">{s.label}</p></div>
              <p className="text-h2 text-card-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{s.value}</p>
              <p className="mt-1 text-caption text-status-success">↑ {s.delta}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl">
            <header className="flex items-center justify-between px-6 pt-5 pb-3"><h3 className="text-body-lg-medium text-card-foreground">Rising connections</h3><span className="text-caption text-muted-foreground">Past 7 days</span></header>
            <ul className="divide-y divide-border/50">{rising.map((r) => (
              <li key={r.name} className="flex items-center gap-3 px-6 py-3">
                <Avatar size="md" style={{ background: accentVar(r.accent) }}><AvatarFallback className="bg-transparent text-white">{r.initials}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1"><p className="truncate text-body-sm-medium text-card-foreground">{r.name}</p><p className="truncate text-caption text-muted-foreground">{r.reason}</p></div>
                <Badge variant="success" className="rounded-full">+{r.delta}</Badge>
              </li>
            ))}</ul>
          </Card>
          <Card className="rounded-2xl">
            <header className="flex items-center justify-between px-6 pt-5 pb-3"><h3 className="text-body-lg-medium text-card-foreground">Reach-out suggestions</h3><a className="text-small text-primary hover:underline" href="#">View all</a></header>
            <ul className="divide-y divide-border/50">{reachOut.map((r) => (
              <li key={r.name} className="flex items-center gap-3 px-6 py-3">
                <Avatar size="md" style={{ background: accentVar(r.accent) }}><AvatarFallback className="bg-transparent text-white">{r.initials}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1"><p className="truncate text-body-sm-medium text-card-foreground">{r.name}</p><p className="truncate text-caption text-muted-foreground">{r.because}</p></div>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </li>
            ))}</ul>
          </Card>
        </div>
      </div>
    </main>
  );
}

const signals = [
  { label: "Network velocity", value: "+34%", delta: "8 pts", icon: TrendingUp },
  { label: "Active threads",   value: "47",   delta: "12",    icon: Sparkles },
  { label: "Strong ties",      value: "128",  delta: "6",     icon: Network },
  { label: "Re-engagements",   value: "12",   delta: "4",     icon: Users },
];
const rising = [
  { initials: "JM", accent: "indigo" as const, name: "Jordan Maxwell", reason: "5 mentions in your inbox this week", delta: 12 },
  { initials: "AK", accent: "rose"   as const, name: "Anya Krishnan",  reason: "Mutual connection accepted intro",  delta: 8 },
  { initials: "SP", accent: "green"  as const, name: "Sam Patel",      reason: "Calendar overlap +3 meetings",       delta: 6 },
];
const reachOut = [
  { initials: "LV", accent: "amber" as const, name: "Lena Voss",     because: "No contact in 90 days, score 90" },
  { initials: "MN", accent: "blue"  as const, name: "Mira Nakamura", because: "She replied to 3 of your asks last quarter" },
  { initials: "RH", accent: "rose"  as const, name: "Ravi Hassan",   because: "Just changed jobs — Stripe → Anthropic" },
];
