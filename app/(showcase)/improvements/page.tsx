import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const improvements = [
  { id: "IMP-01", area: "Dashboard",   title: "Hero greeting variation by time-of-day",          impact: "low",    status: "queued" },
  { id: "IMP-02", area: "Asks",        title: "Inline AI rewrite for ask titles",                  impact: "high",   status: "in design" },
  { id: "IMP-03", area: "Connections", title: "Bulk-tag selected rows from table",                impact: "medium", status: "queued" },
  { id: "IMP-04", area: "Inbox",       title: "Smart-thread grouping by ask",                     impact: "high",   status: "shipped" },
  { id: "IMP-05", area: "Profile",     title: "Add public-profile metric card on mobile",         impact: "low",    status: "queued" },
  { id: "IMP-06", area: "Notifications",title:"Daily digest email summarizing this card group",   impact: "medium", status: "in design" },
  { id: "IMP-07", area: "Onboarding",  title: "Skip-and-resume across sessions",                  impact: "high",   status: "queued" },
  { id: "IMP-08", area: "Foundation",  title: "Audit color contrast on amber accents",            impact: "medium", status: "shipped" },
];
const impactVariant: Record<string, "destructive" | "warning" | "secondary"> = { high: "destructive", medium: "warning", low: "secondary" };
const statusVariant: Record<string, "success" | "warning" | "secondary"> = { shipped: "success", "in design": "warning", queued: "secondary" };

export default function ImprovementsPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1"><p className="text-overline text-muted-foreground">Proposed improvements</p><h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Design audit backlog</h1><p className="text-body-sm text-muted-foreground">Triaged from design audits. Tracked alongside the v2 implementation.</p></div>
          <ThemeToggle />
        </header>
        <Card className="overflow-hidden rounded-2xl">
          <table className="w-full text-body-sm">
            <thead className="bg-muted/40 text-overline text-muted-foreground"><tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Area</th><th className="px-6 py-3 text-left">Title</th><th className="px-6 py-3 text-left">Impact</th><th className="px-6 py-3 text-left">Status</th></tr></thead>
            <tbody className="divide-y divide-border/50">
              {improvements.map((i) => (
                <tr key={i.id} className="hover:bg-muted/20">
                  <td className="px-6 py-3 text-mono-sm text-muted-foreground">{i.id}</td>
                  <td className="px-6 py-3"><Badge variant="outline" className="rounded-full">{i.area}</Badge></td>
                  <td className="px-6 py-3 text-card-foreground">{i.title}</td>
                  <td className="px-6 py-3"><Badge variant={impactVariant[i.impact]} className="rounded-full capitalize">{i.impact}</Badge></td>
                  <td className="px-6 py-3"><Badge variant={statusVariant[i.status]} className="rounded-full capitalize">{i.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </main>
  );
}
