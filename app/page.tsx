import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const showcaseRoutes = [
  {
    href: "/dashboard-v2",
    title: "Dashboard v2",
    description: "Phase 2 flagship — first end-to-end screen using the v2 token + component system.",
    status: "in progress",
  },
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

        <div className="grid gap-4 sm:grid-cols-2">
          {showcaseRoutes.map((r) => (
            <Link key={r.href} href={r.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
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
