"use client";

import * as React from "react";
import { Maximize2, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";

const nodes = [
  { id: "is", initials: "IS", x: 50, y: 50, accent: "indigo" as AccentColor, name: "You" },
  { id: "jm", initials: "JM", x: 25, y: 30, accent: "indigo" as AccentColor, name: "Jordan Maxwell" },
  { id: "ak", initials: "AK", x: 75, y: 25, accent: "rose"   as AccentColor, name: "Anya Krishnan" },
  { id: "sp", initials: "SP", x: 80, y: 70, accent: "green"  as AccentColor, name: "Sam Patel" },
  { id: "mn", initials: "MN", x: 20, y: 75, accent: "blue"   as AccentColor, name: "Mira Nakamura" },
  { id: "lv", initials: "LV", x: 60, y: 85, accent: "amber"  as AccentColor, name: "Lena Voss" },
  { id: "rh", initials: "RH", x: 90, y: 50, accent: "rose"   as AccentColor, name: "Ravi Hassan" },
  { id: "tc", initials: "TC", x: 10, y: 50, accent: "indigo" as AccentColor, name: "Tom Chen" },
];
const edges = [["is","jm"],["is","ak"],["is","sp"],["is","mn"],["jm","ak"],["sp","rh"],["mn","tc"],["lv","sp"],["ak","rh"]];

export default function NetworkGraphPage() {
  const [selected, setSelected] = React.useState<string | null>("jm");
  const node = nodes.find((n) => n.id === selected);
  return (
    <div className="grid h-screen flex-1 grid-cols-[1fr_360px] overflow-hidden">
      <section className="relative bg-muted/40">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-body-sm shadow-sm"><Search className="size-4 text-muted-foreground" /><input className="w-48 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Find a connection…" /></div>
          <Button variant="outline" size="sm"><Filter /> Filters</Button>
        </div>
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2"><ThemeToggle /><Button variant="outline" size="icon" aria-label="Fullscreen"><Maximize2 /></Button></div>
        <svg viewBox="0 0 100 100" className="size-full" preserveAspectRatio="xMidYMid meet">
          {edges.map(([a, b]) => {
            const na = nodes.find((n) => n.id === a)!;
            const nb = nodes.find((n) => n.id === b)!;
            return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--border)" strokeWidth="0.3" />;
          })}
          {nodes.map((n) => (
            <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
              <circle cx={n.x} cy={n.y} r={selected === n.id ? 4 : 3} fill={accentVar(n.accent)} opacity={selected === n.id ? 1 : 0.85} />
              <text x={n.x} y={n.y + 0.5} textAnchor="middle" fontSize="2" fill="white" fontWeight="600">{n.initials}</text>
            </g>
          ))}
        </svg>
      </section>
      <aside className="flex h-full flex-col overflow-y-auto border-l border-border bg-card p-5">
        <p className="mb-4 text-overline text-muted-foreground">Selected node</p>
        {node ? (
          <>
            <div className="mb-4 flex items-center gap-3">
              <Avatar size="xl" style={{ background: accentVar(node.accent) }}><AvatarFallback className="bg-transparent text-white text-h4">{node.initials}</AvatarFallback></Avatar>
              <div><p className="text-body-lg-medium text-card-foreground">{node.name}</p><p className="text-caption text-muted-foreground">8 mutual · score 96</p></div>
            </div>
            <Card className="mb-3 rounded-xl p-3"><p className="text-caption text-muted-foreground">Last contact</p><p className="text-body-sm text-card-foreground">3 days ago · email</p></Card>
            <Card className="mb-3 rounded-xl p-3"><p className="text-caption text-muted-foreground">Tags</p><div className="mt-1 flex flex-wrap gap-1">{["Investor","SaaS","Series B"].map((t) => <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>)}</div></Card>
            <div className="mt-auto flex flex-col gap-2"><Button>Message</Button><Button variant="outline">View profile</Button></div>
          </>
        ) : (<p className="text-body-sm text-muted-foreground">Click a node to inspect.</p>)}
      </aside>
    </div>
  );
}
