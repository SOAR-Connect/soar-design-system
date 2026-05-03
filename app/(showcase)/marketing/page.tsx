import { ArrowRight, Network, Search, Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MarketingPage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-sm bg-primary" />
          <span className="text-body-semibold text-foreground">SOAR Connect</span>
        </div>
        <nav className="hidden items-center gap-6 text-body-sm text-muted-foreground sm:flex">
          <a href="#" className="hover:text-foreground">Features</a>
          <a href="#" className="hover:text-foreground">Pricing</a>
          <a href="#" className="hover:text-foreground">Customers</a>
          <a href="#" className="hover:text-foreground">Docs</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </div>
      </header>
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-8 py-24 text-center">
        <span className="rounded-full bg-secondary px-3 py-1 text-caption-medium text-secondary-foreground">Now with AI-suggested intros</span>
        <h1 className="text-display text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Your network, finally working for you</h1>
        <p className="max-w-xl text-body-lg text-muted-foreground">SOAR turns scattered relationship data into a private, queryable network. Send asks, get warm intros, never lose another connection.</p>
        <div className="flex gap-3"><Button size="lg">Get started <ArrowRight /></Button><Button size="lg" variant="outline">Watch demo</Button></div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="rounded-2xl p-6">
            <f.icon className="mb-4 size-6 text-primary" />
            <h3 className="text-body-lg-medium text-card-foreground">{f.title}</h3>
            <p className="mt-2 text-body-sm text-muted-foreground">{f.body}</p>
          </Card>
        ))}
      </section>
      <section className="mx-auto w-full max-w-6xl px-8 py-16">
        <p className="mb-8 text-center text-overline text-muted-foreground">Trusted by founders at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-body-medium text-muted-foreground/70">
          {["Sequoia", "A16z", "Stripe", "Notion", "Plaid", "Linear", "Anthropic"].map((c) => (<span key={c}>{c}</span>))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-4xl px-8 py-24">
        <Card className="flex flex-col items-center gap-4 rounded-2xl bg-primary p-12 text-center text-primary-foreground">
          <h2 className="text-h1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Ready to soar?</h2>
          <p className="max-w-md text-body opacity-90">Free for the first month. No credit card required. Cancel anytime.</p>
          <Button size="lg" variant="secondary">Get started <ArrowRight /></Button>
        </Card>
      </section>
      <footer className="border-t border-border px-8 py-8 text-center text-caption text-muted-foreground">© 2026 SOAR Connect · Strength of Authentic Relationships</footer>
    </main>
  );
}

const features = [
  { icon: Network,  title: "Map your network",  body: "Auto-import connections from email, calendar, socials, and messaging." },
  { icon: Search,   title: "Ask anything",      body: "Natural-language asks routed to the right people in your network." },
  { icon: Sparkles, title: "AI scoring",        body: "Every connection scored for relevance, recency, and reciprocity." },
  { icon: Lock,     title: "Private by default",body: "Your graph stays yours. No shared data. End-to-end encrypted." },
];
