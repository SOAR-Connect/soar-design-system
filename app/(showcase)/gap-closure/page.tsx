import { HelpCircle, FileEdit, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function GapClosurePage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4"><div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground">Gap closure</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Audit-driven additions</h1><p className="text-body-sm text-muted-foreground">Small surfaces shipped to close audit gaps from v2 review.</p></div><ThemeToggle /></header>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl p-6"><div className="mb-3 flex items-center gap-2"><HelpCircle className="size-4 text-primary" /><p className="flex-1 text-body-medium text-card-foreground">Why this score?</p><Badge variant="outline" className="rounded-full">UI-1</Badge></div><p className="text-body-sm text-muted-foreground">Inline tooltip explaining the SOAR-score formula on connection cards.</p><Button variant="outline" size="sm" className="mt-4">Preview</Button></Card>
          <Card className="rounded-2xl p-6"><div className="mb-3 flex items-center gap-2"><FileEdit className="size-4 text-primary" /><p className="flex-1 text-body-medium text-card-foreground">My drafts</p><Badge variant="outline" className="rounded-full">UI-4</Badge></div><p className="text-body-sm text-muted-foreground">Saved-but-not-sent asks surface in a sidebar drawer.</p><Button variant="outline" size="sm" className="mt-4">Preview</Button></Card>
          <Card className="rounded-2xl p-6 sm:col-span-2"><div className="mb-3 flex items-center gap-2"><Star className="size-4 text-primary" /><p className="flex-1 text-body-medium text-card-foreground">New this week</p><Badge variant="outline" className="rounded-full">UI-8</Badge></div><p className="text-body-sm text-muted-foreground">Weekly digest card on the dashboard summarizing high-value events: new mutual connections, replies received, intros made, and connections who changed jobs.</p><Button variant="outline" size="sm" className="mt-4">Preview</Button></Card>
        </div>
      </div>
    </main>
  );
}
