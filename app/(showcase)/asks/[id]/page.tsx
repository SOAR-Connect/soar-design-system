import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar } from "../../_data/shared";

export default function AskDetailPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="mb-4 flex items-center gap-2">
        <Link href="/asks" className="inline-flex items-center gap-1 text-body-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to asks</Link>
        <div className="ml-auto"><ThemeToggle /></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Card className="rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="success" className="rounded-full">Active</Badge>
              <span className="text-caption text-muted-foreground">Sent 2 days ago · 8 connections · 5 responses</span>
              <div className="ml-auto flex gap-2"><Button variant="outline" size="sm"><Share2 /> Share</Button><Button size="sm">Mark complete</Button></div>
            </div>
            <h1 className="mb-3 text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Looking for a fractional CTO with 10+ years experience</h1>
            <p className="text-body text-card-foreground">We&apos;re a Series A B2B SaaS scaling to 50 customers. Need someone 2 days/week to advise our early eng team and architect for the next 6 months. Background in distributed systems + eng leadership preferred.</p>
            <div className="mt-4 flex flex-wrap gap-2">{["Engineering", "Fractional", "Series A", "B2B SaaS"].map((t) => (<Badge key={t} variant="outline" className="rounded-full">{t}</Badge>))}</div>
          </Card>
          <Card className="rounded-2xl">
            <header className="flex items-center gap-2 px-6 pt-5 pb-3"><h2 className="text-body-lg-medium text-card-foreground">Conversation thread</h2><span className="ml-auto text-caption text-muted-foreground">3 replies</span></header>
            <ul className="divide-y divide-border/50">{thread.map((m, i) => (
              <li key={i} className="flex items-start gap-3 px-6 py-4">
                <Avatar size="md" style={{ background: accentVar(m.accent) }}><AvatarFallback className="bg-transparent text-white">{m.initials}</AvatarFallback></Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-1"><div className="flex items-center gap-2 text-body-sm"><span className="font-medium text-card-foreground">{m.actor}</span><span className="text-caption text-muted-foreground">· {m.time}</span></div><p className="text-body-sm text-foreground">{m.body}</p></div>
              </li>
            ))}</ul>
            <footer className="flex items-center gap-3 border-t border-border px-6 py-4"><input className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-body-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Reply…" /><Button size="sm">Send</Button></footer>
          </Card>
        </div>
        <aside className="flex flex-col gap-4">
          <Card className="rounded-2xl p-5">
            <h3 className="mb-3 text-body-lg-medium text-card-foreground">Ask owner</h3>
            <div className="flex items-center gap-3"><Avatar size="lg" style={{ background: "var(--accent-indigo)" }}><AvatarFallback className="bg-transparent text-white">IS</AvatarFallback></Avatar><div><p className="text-body-sm-medium text-card-foreground">Irene Stravinsky</p><p className="text-caption text-muted-foreground">Founder & CEO</p></div></div>
          </Card>
          <Card className="rounded-2xl p-5">
            <h3 className="mb-3 text-body-lg-medium text-card-foreground">Routed to</h3>
            <ul className="flex flex-col gap-2">{routedTo.map((r) => (
              <li key={r.name} className="flex items-center gap-2 text-body-sm">
                <Avatar size="sm" style={{ background: accentVar(r.accent) }}><AvatarFallback className="bg-transparent text-[9px] text-white">{r.initials}</AvatarFallback></Avatar>
                <span className="flex-1 truncate text-card-foreground">{r.name}</span>
                <Badge variant={r.replied ? "success" : "secondary"} className="rounded-full">{r.replied ? "Replied" : "Pending"}</Badge>
              </li>
            ))}</ul>
          </Card>
          <Card className="rounded-2xl p-5">
            <h3 className="mb-3 text-body-lg-medium text-card-foreground">Activity</h3>
            <ul className="flex flex-col gap-2 text-caption text-muted-foreground"><li>5 responses received</li><li>3 positive · 2 pending</li><li>1 intro made</li><li>2 days remaining</li></ul>
          </Card>
        </aside>
      </div>
    </main>
  );
}

const thread = [
  { initials: "JM", accent: "indigo" as const, actor: "Jordan Maxwell", time: "2 min ago", body: "Got someone in mind — Sarah Liu, ex-VP Eng at Plaid. She just wrapped up a fractional engagement at a Series B fintech." },
  { initials: "IS", accent: "indigo" as const, actor: "Irene (you)",     time: "1 min ago", body: "That sounds perfect. Mind making the intro?" },
  { initials: "JM", accent: "indigo" as const, actor: "Jordan Maxwell", time: "now",       body: "On it. Sending the email now." },
];
const routedTo = [
  { initials: "JM", accent: "indigo" as const, name: "Jordan Maxwell", replied: true },
  { initials: "AK", accent: "rose"   as const, name: "Anya Krishnan",  replied: true },
  { initials: "SP", accent: "green"  as const, name: "Sam Patel",      replied: true },
  { initials: "MN", accent: "blue"   as const, name: "Mira Nakamura",  replied: false },
  { initials: "LV", accent: "amber"  as const, name: "Lena Voss",      replied: false },
];
