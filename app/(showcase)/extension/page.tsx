"use client";

import * as React from "react";
import { Loader2, Check, AlertCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success" | "error";

export default function ExtensionPage() {
  const [state, setState] = React.useState<State>("idle");
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-8">
      <div className="mb-4 flex items-center gap-2"><p className="text-overline text-muted-foreground">Extension preview</p><div className="ml-auto"><ThemeToggle /></div></div>
      <div className="mb-4 flex gap-1 rounded-md border border-border p-0.5">
        {(["idle", "loading", "success", "error"] as State[]).map((s) => (<button key={s} onClick={() => setState(s)} className={cn("flex-1 rounded px-2 py-1 text-small-medium capitalize transition-colors", state === s ? "bg-secondary text-foreground" : "text-muted-foreground")}>{s}</button>))}
      </div>
      <Card className="aspect-[380/540] flex flex-col rounded-2xl p-5">
        <header className="mb-4 flex items-center gap-2"><span className="size-5 rounded-sm bg-primary" /><p className="text-body-medium text-card-foreground">SOAR Connect</p></header>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          {state === "idle" && (<><Sparkles className="size-10 text-primary" /><div><p className="text-body-medium text-card-foreground">Save this profile?</p><p className="mt-1 text-caption text-muted-foreground">linkedin.com/in/jmaxwell</p></div><Button>Save to network</Button></>)}
          {state === "loading" && <><Loader2 className="size-10 animate-spin text-primary" /><p className="text-body-sm text-muted-foreground">Saving…</p></>}
          {state === "success" && (<><div className="flex size-12 items-center justify-center rounded-full bg-status-success text-primary-foreground"><Check className="size-6" /></div><p className="text-body-medium text-card-foreground">Saved to network</p><p className="text-caption text-muted-foreground">Jordan Maxwell · GP at Sequoia</p><Button variant="outline" size="sm">View in SOAR</Button></>)}
          {state === "error" && (<><div className="flex size-12 items-center justify-center rounded-full bg-status-error text-primary-foreground"><AlertCircle className="size-6" /></div><p className="text-body-medium text-card-foreground">Couldn't save</p><p className="text-caption text-muted-foreground">Network error — try again in a moment.</p><Button>Retry</Button></>)}
        </div>
      </Card>
    </main>
  );
}
