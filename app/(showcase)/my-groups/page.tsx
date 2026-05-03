import { Plus, Users, Lock, Globe, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";

interface Group { name: string; description: string; members: number; visibility: "private" | "public"; accent: AccentColor; tag: string; preview: { initials: string; accent: AccentColor }[]; }
const groups: Group[] = [
  { name: "Series B Founders",        description: "Tactical advice for founders ~30-100 employees.", members: 47,  visibility: "private", accent: "indigo", tag: "Founders",    preview: [{initials:"JM",accent:"indigo"},{initials:"AK",accent:"rose"},{initials:"TC",accent:"blue"}] },
  { name: "AI Builders SF",            description: "SF-based AI engineers shipping in production.",   members: 128, visibility: "private", accent: "blue",   tag: "Engineering", preview: [{initials:"SP",accent:"green"},{initials:"RH",accent:"rose"},{initials:"MN",accent:"blue"}] },
  { name: "Design System Leads",       description: "Heads of design system at growth-stage SaaS.",   members: 22,  visibility: "private", accent: "rose",   tag: "Design",      preview: [{initials:"EW",accent:"amber"},{initials:"LV",accent:"amber"},{initials:"PR",accent:"rose"}] },
  { name: "Climate Tech Investors",    description: "GPs and angels writing checks in climate.",      members: 64,  visibility: "public",  accent: "green",  tag: "Investors",   preview: [{initials:"MN",accent:"blue"},{initials:"JM",accent:"indigo"},{initials:"AK",accent:"rose"}] },
  { name: "Female Engineering Leaders",description: "VPs of Eng, CTOs, and Eng Directors.",            members: 89,  visibility: "private", accent: "violet", tag: "Engineering", preview: [{initials:"SP",accent:"green"},{initials:"AK",accent:"rose"},{initials:"PR",accent:"rose"}] },
  { name: "Open-Source Maintainers",   description: "Maintainers of significant OSS projects.",        members: 156, visibility: "public",  accent: "amber",  tag: "Engineering", preview: [{initials:"RH",accent:"rose"},{initials:"SP",accent:"green"},{initials:"TC",accent:"blue"}] },
];

export default function MyGroupsPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>My Groups</h1><p className="text-body-sm text-muted-foreground">{groups.length} groups · curated peer circles</p></div>
          <div className="flex items-center gap-2"><ThemeToggle /><Button variant="outline">Browse</Button><Button><Plus /> Create group</Button></div>
        </header>
        <div className="flex h-9 w-80 items-center gap-2 rounded-md border border-border bg-background px-3 text-body-sm">
          <Search className="size-4 text-muted-foreground" />
          <input className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search groups…" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{groups.map((g) => (
          <Card key={g.name} className="flex flex-col gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${accentVar(g.accent)} 18%, transparent)`, color: accentVar(g.accent) }}><Users className="size-5" /></span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-body-medium text-card-foreground">{g.name}</p>
                <span className="inline-flex items-center gap-1 text-caption text-muted-foreground">{g.visibility === "private" ? <Lock className="size-3" /> : <Globe className="size-3" />}{g.visibility} · {g.members} members</span>
              </div>
              <Badge variant="outline" className="rounded-full">{g.tag}</Badge>
            </div>
            <p className="text-body-sm text-muted-foreground">{g.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">{g.preview.map((p) => (<Avatar key={p.initials} size="sm" className="border-2 border-card" style={{ background: accentVar(p.accent) }}><AvatarFallback className="bg-transparent text-[9px] text-white">{p.initials}</AvatarFallback></Avatar>))}</div>
              <Button variant="outline" size="sm">Open</Button>
            </div>
          </Card>
        ))}</div>
      </div>
    </main>
  );
}
