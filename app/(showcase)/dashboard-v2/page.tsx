import { DashboardSidebar } from "./_components/sidebar";
import { DashboardHeader } from "./_components/dashboard-header";
import { KpiCard, KpiGrid } from "./_components/kpi-card";
import { RecentAsks } from "./_components/recent-asks";
import { ActivityFeed } from "./_components/activity-feed";
import { TopConnections } from "./_components/top-connections";
import { Q2Goals } from "./_components/q2-goals";
import { kpis } from "./_data/mock";

/**
 * Dashboard v2 — flagship Phase 2 implementation of the Soar redesign.
 * Faithful to Figma: file 0u7EjU8sbCqCBmgPN7ufBO, page "🚀 Dashboard v2"
 * (4016:2). Desktop · Light variant (4016:4) is the source of truth;
 * dark theme is automatic via the .dark class on <html>.
 *
 * Living-style-guide route — does not call real APIs. Mock data lives in
 * ./_data/mock.ts. Components live in ./_components/*.
 */
export default function DashboardV2Page() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
          <div className="flex flex-col gap-8">
            <DashboardHeader />

            <KpiGrid>
              {kpis.map((k) => (
                <KpiCard key={k.label} {...k} />
              ))}
            </KpiGrid>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-6 min-w-0">
                <RecentAsks />
                <ActivityFeed />
              </div>
              <div className="flex flex-col gap-6">
                <TopConnections />
                <Q2Goals />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );}
