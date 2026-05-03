import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const plans = [
  { name: "Free",      price: "$0",     period: "forever", features: ["100 connections", "5 asks / month", "Basic analytics"], cta: "Current plan", current: true },
  { name: "Pro",       price: "$29",    period: "/ month", features: ["Unlimited connections", "50 asks / month", "AI suggestions", "Advanced analytics"], cta: "Upgrade to Pro", featured: true },
  { name: "Team",      price: "$99",    period: "/ user / month", features: ["Everything in Pro", "Team workspaces", "SSO", "Audit log", "Priority support"], cta: "Talk to sales" },
  { name: "Enterprise",price: "Custom", period: "",        features: ["Everything in Team", "White-label", "Data residency", "Dedicated CSM", "99.99% SLA"], cta: "Contact us" },
];

export default function PaymentPlansPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-8">
        <header className="relative flex flex-col items-center gap-3 text-center">
          <p className="text-overline text-muted-foreground">Payment plans</p>
          <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Choose your plan</h1>
          <p className="max-w-md text-body-sm text-muted-foreground">All plans include a 14-day free trial. Cancel anytime — no questions asked.</p>
          <div className="absolute right-0 top-0"><ThemeToggle /></div>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <Card key={p.name} className={`flex flex-col gap-5 rounded-2xl p-6 ${p.featured ? "border-primary shadow-md" : ""}`}>
              <div>
                {p.featured && <Badge className="mb-2 rounded-full">Most popular</Badge>}
                <p className="text-body-lg-medium text-card-foreground">{p.name}</p>
                <p className="mt-2"><span className="text-h2 text-card-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{p.price}</span> <span className="text-caption text-muted-foreground">{p.period}</span></p>
              </div>
              <ul className="flex flex-1 flex-col gap-2">
                {p.features.map((f) => (<li key={f} className="flex items-start gap-2 text-body-sm text-card-foreground"><Check className="mt-0.5 size-4 shrink-0 text-status-success" />{f}</li>))}
              </ul>
              <Button variant={p.featured ? "default" : "outline"} disabled={p.current}>{p.cta}</Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
