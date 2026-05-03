import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const showcaseRoutes = [
  { href: "/dashboard-v2",  title: "Dashboard v2",   description: "KPI cards, recent asks, activity feed, top connections, Q2 goals.",  status: "live" },
  { href: "/asks",          title: "Asks",           description: "Create-ask form, AI-suggested recommendations, multi-select to send.", status: "live" },
  { href: "/connections",   title: "Connections",    description: "Searchable directory of 320 connections with sort and filters.",     status: "live" },
  { href: "/inbox",         title: "Inbox",          description: "Three-pane mail layout for managing sent and received asks.",        status: "live" },
  { href: "/notifications", title: "Notifications",  description: "Grouped activity feed with category filters and unread tracking.",   status: "live" },
  { href: "/profile",       title: "Profile · Settings", description: "Personal info, integrations, workspace, and danger-zone actions.",   status: "live" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-overline text-muted-foreground">SOAR Connect</p>
            <h1 className="text-h2">Design System</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-h3 mb-2">Showcase routes</h2>
          <p className="text-body text-muted-foreground">
            Living style guide for the v2 redesign. Each route is a real implementation of a
            Figma screen using the canonical tokens and components in this repo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseRoutes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{r.title}</CardTitle>
                    <Badge variant="outline">{r.status}</Badge>
                  </div>
                  <CardDescription>{r.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-muted-foreground">{r.href}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
