import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const groups = [
  { label: "App shell", routes: [
    { href: "/dashboard-v2",  title: "Dashboard",    body: "KPIs, recent asks, activity, top connections, Q2 goals." },
    { href: "/inbox",         title: "Inbox",        body: "Three-pane mail layout for sent + received asks." },
    { href: "/asks",          title: "Asks",         body: "Create-ask form + AI-suggested recommendations." },
    { href: "/asks/sample",   title: "Ask detail",   body: "Conversation thread, routed-to panel, activity rollup." },
    { href: "/connections",   title: "Connections",  body: "Searchable directory with sort, filter, table view." },
    { href: "/notifications", title: "Notifications",body: "Grouped feed with category filters." },
    { href: "/profile",       title: "Profile · Settings", body: "Personal info, integrations, danger zone." },
  ]},
  { label: "Product modules", routes: [
    { href: "/intelligence", title: "Intelligence", body: "AI-detected network signals + reach-out suggestions." },
    { href: "/insights",     title: "Insights",     body: "Saved dashboards with mini charts and visibility states." },
    { href: "/my-groups",    title: "My Groups",    body: "Curated peer-circle hub." },
    { href: "/network",      title: "3D Network",   body: "Force-directed graph with selection panel (SVG approx)." },
    { href: "/ai-bi",        title: "AI BI",        body: "Natural-language analytics composer." },
  ]},
  { label: "Surfaces", routes: [
    { href: "/marketing",       title: "Marketing landing", body: "Public hero + features + CTA." },
    { href: "/onboarding",      title: "Onboarding",        body: "9-step wizard with progress + integrations." },
    { href: "/extension",       title: "Browser extension", body: "Idle / loading / success / error states." },
    { href: "/desktop",         title: "Mac desktop shell", body: "Native chrome, banner, sync bar, popup." },
    { href: "/mobile-security", title: "Mobile security",   body: "Face ID + permission primers." },
    { href: "/admin",           title: "Admin console",     body: "User management + KPI strip." },
    { href: "/enterprise",      title: "Enterprise",        body: "Org admin, brand config, guides." },
  ]},
  { label: "Audit / planning", routes: [
    { href: "/payment-plans", title: "Payment plans",  body: "Free / Pro / Team / Enterprise tier comparison." },
    { href: "/quick-wins",    title: "Quick wins",     body: "SSO, web search add, invitation states." },
    { href: "/gap-closure",   title: "Gap closure",    body: "UI additions from audit review." },
    { href: "/improvements",  title: "Improvements",   body: "Prioritized backlog from design audits." },
    { href: "/landing-alts",  title: "Landing alts",   body: "A/B/C/D hero variants for split-test." },
  ]},
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><div><p className="text-overline text-muted-foreground">SOAR Connect</p><h1 className="text-h2">Design System</h1></div><ThemeToggle /></div></header>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10"><h2 className="text-h3 mb-2">Showcase routes</h2><p className="text-body text-muted-foreground">Living style guide for the v2 redesign. Every route is a real implementation of a Figma screen using the canonical tokens and components in this repo.</p></div>
        <div className="flex flex-col gap-12">
          {groups.map((g) => (
            <section key={g.label} className="flex flex-col gap-3">
              <h3 className="text-overline text-muted-foreground">{g.label}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.routes.map((r) => (
                  <Link key={r.href} href={r.href} className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Card className="h-full transition-colors hover:border-primary/40">
                      <CardHeader><div className="flex items-center justify-between"><CardTitle>{r.title}</CardTitle><Badge variant="outline">live</Badge></div><CardDescription>{r.body}</CardDescription></CardHeader>
                      <CardContent><p className="text-body-sm text-muted-foreground">{r.href}</p></CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
