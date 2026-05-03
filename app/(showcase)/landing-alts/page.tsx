import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const variants = [
  { id: "A", headline: "Your network, finally working for you",    cta: "Get started",    proof: "Trusted by founders at Sequoia, A16z" },
  { id: "B", headline: "Send a warm intro in 60 seconds",           cta: "Try free",       proof: "Used by 2,000 operators" },
  { id: "C", headline: "Stop losing your most valuable contacts",   cta: "Claim my graph", proof: "Featured in TechCrunch, The Verge" },
  { id: "D", headline: "AI that understands your real network",     cta: "See the demo",   proof: "100M+ relationships indexed" },
];

export default function LandingAltsPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4"><div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground">Landing alts</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Hero variants</h1><p className="text-body-sm text-muted-foreground">A/B/C/D headlines and CTAs ready for split-test.</p></div><ThemeToggle /></header>
        <div className="grid gap-4 sm:grid-cols-2">
          {variants.map((v) => (
            <Card key={v.id} className="flex flex-col gap-4 rounded-2xl p-8">
              <Badge variant="outline" className="self-start rounded-full">Variant {v.id}</Badge>
              <h2 className="text-h2 text-card-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{v.headline}</h2>
              <p className="text-caption text-muted-foreground">{v.proof}</p>
              <div className="mt-auto"><span className="rounded-full bg-primary px-4 py-1.5 text-body-sm-medium text-primary-foreground">{v.cta}</span></div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
