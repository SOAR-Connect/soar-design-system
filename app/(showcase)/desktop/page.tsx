import { Apple, Bell, RotateCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DesktopMacPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground inline-flex items-center gap-1"><Apple className="size-3" /> macOS</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Desktop · Mac shell</h1><p className="text-body-sm text-muted-foreground">Native chrome on top of the web app — banner, popup overlay, sync bar.</p></div>
          <ThemeToggle />
        </header>
        <Card className="overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2"><span className="size-3 rounded-full bg-status-error" /><span className="size-3 rounded-full bg-status-warning" /><span className="size-3 rounded-full bg-status-success" /><p className="ml-2 text-caption text-muted-foreground">SOAR Connect — Dashboard</p></div>
          <div className="grid h-80 place-items-center bg-background"><p className="text-body text-muted-foreground">Web content renders here</p></div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl p-4"><p className="mb-3 text-overline text-muted-foreground">In-app banner</p><div className="flex items-center gap-3 rounded-md bg-primary p-3 text-primary-foreground"><Bell className="size-4" /><span className="flex-1 text-body-sm-medium">3 new responses to your asks</span><Button size="sm" variant="secondary">View</Button></div></Card>
          <Card className="rounded-2xl p-4"><p className="mb-3 text-overline text-muted-foreground">Sync bar</p><div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 p-3"><RotateCw className="size-4 animate-spin text-primary" /><span className="flex-1 text-body-sm">Syncing 320 contacts…</span><Badge variant="outline" className="rounded-full">62%</Badge></div></Card>
        </div>
        <Card className="rounded-2xl p-6"><p className="mb-3 text-overline text-muted-foreground">Popup overlay</p><div className="rounded-xl border border-border bg-card p-5 shadow-lg"><p className="text-body-medium text-card-foreground">New connection saved</p><p className="mt-1 text-caption text-muted-foreground">Jordan Maxwell · GP at Sequoia</p><div className="mt-4 flex gap-2"><Button size="sm">Open profile</Button><Button size="sm" variant="ghost">Dismiss</Button></div></div></Card>
      </div>
    </main>
  );
}
