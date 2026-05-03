import { LineChart, BarChart3, PieChart, Plus, MoreHorizontal, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar } from "../_data/shared";

const dashboards = [
  { name: "Outreach Funnel",        owner: "Irene",     updated: "2h ago",  icon: BarChart3, accent: "blue" as const,   pinned: true,  visibility: "Private" },
  { name: "Network Health Q2",      owner: "Irene",     updated: "1d ago",  icon: LineChart, accent: "indigo" as const, pinned: true,  visibility: "Private" },
  { name: "Ask Throughput",         owner: "Irene",     updated: "3d ago",  icon: BarChart3, accent: "green" as const,  pinned: false, visibility: "Shared" },
  { name: "Investor Touchpoints",   owner: "Irene",     updated: "1w ago",  icon: LineChart, accent: "rose" as const,   pinned: false, visibility: "Private" },
  { name: "Group Engagement",       owner: "Sam Patel", updated: "2w ago",  icon: PieChart,  accent: "amber" as const,  pinned: false, visibility: "Shared" },
  { name: "Geographic Distribution",owner: "Anya K.",   updated: "1mo ago", icon: PieChart,  accent: "violet" as const, pinned: false, visibility: "Public" },
];

export default function InsightsPage() {
  const pinned = dashboards.filter((d) => d.pinned);
  const all = dashboards.filter((d) => !d.pinned);
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Insights</h1><p className="text-body-sm text-muted-foreground">{dashboards.length} dashboards · {pinned.length} pinned</p></div>
          <div className="flex items-center gap-2"><ThemeToggle /><Button variant="outline">Browse templates</Button><Button><Plus /> New dashboard</Button></div>
        </header>
        {pinned.length > 0 && (<section className="flex flex-col gap-3"><h2 className="text-overline text-muted-foreground">Pinned</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{pinned.map((d) => <DashboardCard key={d.name} {...d} />)}</div></section>)}
        <section className="flex flex-col gap-3"><h2 className="text-overline text-muted-foreground">All dashboards</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{all.map((d) => <DashboardCard key={d.name} {...d} />)}</div></section>
      </div>
    </main>
  );
}

function DashboardCard({ name, owner, updated, icon: Icon, accent, pinned, visibility }: typeof dashboards[number]) {
  return (
    <Card className="flex flex-col gap-3 rounded-2xl p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${accentVar(accent)} 18%, transparent)`, color: accentVar(accent) }}><Icon className="size-5" /></span>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-1"><p className="truncate text-body-medium text-card-foreground">{name}</p>{pinned && <Pin className="size-3 fill-primary text-primary" />}</div>
          <p className="truncate text-caption text-muted-foreground">{owner} · updated {updated}</p>
        </div>
        <button className="text-muted-foreground hover:text-foreground" aria-label="More"><MoreHorizontal className="size-4" /></button>
      </div>
      <div className="flex h-20 items-end gap-1 rounded-md bg-muted/40 p-3">{[0.3,0.5,0.4,0.7,0.6,0.9,0.8,1,0.7,0.85].map((h, i) => (<span key={i} className="flex-1 rounded-sm" style={{ height: `${h * 100}%`, background: accentVar(accent), opacity: 0.6 + h * 0.4 }} />))}</div>
      <div className="flex items-center justify-between"><Badge variant="outline" className="rounded-full">{visibility}</Badge><Button variant="outline" size="sm">Open</Button></div>
    </Card>
  );
}
