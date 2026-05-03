import { Building2, Users2, Palette, BookOpen, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function EnterprisePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground inline-flex items-center gap-1"><Building2 className="size-3" /> Enterprise</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Acme Corp · Workspace</h1><p className="text-body-sm text-muted-foreground">Org admin, white-label brand config, and the enterprise guide library.</p></div>
          <ThemeToggle />
        </header>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Org members",      body: "Manage 47 seats, roles, and SSO claims.", icon: Users2,  cta: "Open" },
            { title: "Brand configuration",body: "White-label colors, logos, email templates.",icon: Palette, cta: "Configure" },
            { title: "Enterprise guide viewer",body: "Structured runbooks shared across your org.", icon: BookOpen, cta: "Browse" },
          ].map((c) => (
            <Card key={c.title} className="flex flex-col gap-4 rounded-2xl p-5">
              <c.icon className="size-6 text-primary" />
              <div className="flex-1"><p className="text-body-medium text-card-foreground">{c.title}</p><p className="mt-1 text-body-sm text-muted-foreground">{c.body}</p></div>
              <Button variant="outline" className="self-start">{c.cta} <ArrowRight /></Button>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden rounded-2xl">
          <header className="flex items-center justify-between px-6 pt-5 pb-3"><h3 className="text-body-lg-medium text-card-foreground">Workspace settings</h3><Badge variant="outline" className="rounded-full">Enterprise tier</Badge></header>
          <ul className="divide-y divide-border/50">
            {[{label:"Single sign-on",value:"Okta · enabled"},{label:"Data residency",value:"us-east-1"},{label:"iMessage permission flow (Mac)",value:"Custom installer ready"},{label:"Audit log retention",value:"365 days"},{label:"API access",value:"Read + write"}].map((r) => (
              <li key={r.label} className="flex items-center justify-between px-6 py-3 text-body-sm"><span className="text-muted-foreground">{r.label}</span><span className="text-card-foreground">{r.value}</span></li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
