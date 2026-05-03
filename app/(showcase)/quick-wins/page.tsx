import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function QuickWinsPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground">Quick wins</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Polish patches</h1><p className="text-body-sm text-muted-foreground">Small UX additions that ship in batch.</p></div>
          <ThemeToggle />
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl p-6"><p className="mb-4 text-overline text-muted-foreground">SSO providers</p><div className="flex flex-col gap-2">{["Continue with Apple", "Continue with Google", "Continue with Microsoft"].map((p) => (<Button key={p} variant="outline" className="justify-start">{p}</Button>))}</div></Card>
          <Card className="rounded-2xl p-6"><p className="mb-4 text-overline text-muted-foreground">Ask composer · Web search add</p><textarea className="mb-3 min-h-20 w-full resize-none rounded-md border border-border bg-background p-3 text-body-sm" placeholder="Add a web link or paste a query…" /><div className="flex gap-2"><Button>Search & attach</Button><Button variant="ghost">Cancel</Button></div></Card>
          <Card className="rounded-2xl p-6 sm:col-span-2"><p className="mb-4 text-overline text-muted-foreground">Conversation invitation · States</p><div className="grid gap-3 sm:grid-cols-3">{[{label:"Pending",body:"Awaiting response"},{label:"Accepted",body:"Thread is open"},{label:"Declined",body:"Closed without reply"}].map((s) => (<div key={s.label} className="rounded-xl border border-border p-4"><p className="text-body-sm-medium text-card-foreground">{s.label}</p><p className="text-caption text-muted-foreground">{s.body}</p></div>))}</div></Card>
        </div>
      </div>
    </main>
  );
}
