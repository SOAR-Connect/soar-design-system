import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AskRow } from "@/components/patterns/ask-row";
import { ConnectionRow } from "@/components/patterns/connection-row";
import { EmptyState } from "@/components/patterns/empty-state";
import { GroupCoverCard } from "@/components/patterns/group-cover-card";
import { InboxMessageRow } from "@/components/patterns/inbox-message-row";
import { NotificationItem } from "@/components/patterns/notification-item";
import { SkeletonRow } from "@/components/patterns/skeleton-row";
import { SoarScoreRing } from "@/components/patterns/soar-score-ring";
import { StatsCard } from "@/components/patterns/stats-card";

export default function ShowcasePage() {
  return (
    <main className="container mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-semibold tracking-tight">SOAR Design System</h1>
        <p className="text-lg text-muted-foreground">
          Canonical primitives + SOAR-specific patterns. EB Garamond + Inter. Burgundy + gold.
        </p>
      </header>

      <Section title="Typography">
        <h1 className="font-display text-5xl font-semibold">Display 1 — EB Garamond 48</h1>
        <h2 className="font-display text-3xl font-semibold">Display 2 — EB Garamond 30</h2>
        <h3 className="font-display text-xl font-semibold">Display 3 — EB Garamond 20</h3>
        <p className="text-base">Body — Inter 16. The matchmaker for superconnectors.</p>
        <p className="text-sm text-muted-foreground">Body sm — Inter 14 muted.</p>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="default">Default</Button>
          <Button size="lg">LG</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </Section>

      <Section title="Avatars">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/40?u=irene" alt="Irene Sousa" />
            <AvatarFallback>IS</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">DM</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-md gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
          <div className="flex items-center gap-2 pt-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Notifications</Label>
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Premium Plan</CardTitle>
            <CardDescription>For superconnectors moving in premium networks.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Unlimited asks. Soar Score insights. Concierge onboarding.</p>
          </CardContent>
          <CardFooter>
            <Button>Upgrade</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="overview" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview content.</TabsContent>
          <TabsContent value="activity">Activity content.</TabsContent>
          <TabsContent value="settings">Settings content.</TabsContent>
        </Tabs>
      </Section>

      <Separator className="my-8" />

      <header className="space-y-2">
        <h2 className="font-display text-3xl font-semibold">SOAR Patterns</h2>
        <p className="text-sm text-muted-foreground">
          Composed components per <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">design-standards-v11 §24</code>.
        </p>
      </header>

      <Section title="SoarScoreRing">
        <div className="flex items-center gap-6">
          <SoarScoreRing score={87} />
          <SoarScoreRing score={62} size={64} />
          <SoarScoreRing score={34} size={48} thickness={4} showLabel={false} />
        </div>
      </Section>

      <Section title="StatsCard">
        <div className="flex flex-wrap gap-3">
          <StatsCard label="New connections" value={142} delta="+12%" />
          <StatsCard label="Open asks" value={28} delta="-3" />
          <StatsCard label="Avg. SOAR Score" value={71} delta="+1.4" />
          <StatsCard label="Replies" value="1.3k" delta="+24%" />
        </div>
      </Section>

      <Section title="AskRow">
        <Card className="overflow-hidden p-0">
          <AskRow
            name="David Lin"
            role="Product Lead · Acme"
            initials="DL"
            score={87}
            tags={[{ label: "Strategy", tone: "brand" }, { label: "Tech", tone: "forest" }]}
            contactLabel="Reply"
          />
          <AskRow
            name="Marie Lambert"
            role="L&D Practitioner"
            initials="ML"
            score={64}
            tags={[{ label: "Growth", tone: "earth" }]}
            status="pending"
          />
          <AskRow
            name="Tomás García"
            role="Engineer · Linear"
            initials="TG"
            score={92}
            status="closed"
          />
        </Card>
      </Section>

      <Section title="ConnectionRow">
        <Card className="overflow-hidden p-0">
          <ConnectionRow name="Irene Sousa" role="Designer · SF" initials="IS" mutualCount={12} score={78} tags={[{ label: "Product" }]} />
          <ConnectionRow name="Andrew Park" role="Founder · Stripe" initials="AP" mutualCount={3} score={91} tags={[{ label: "Finance" }]} />
          <ConnectionRow name="Priya Shah" role="Investor" initials="PS" mutualCount={7} score={55} status="suggested" />
        </Card>
      </Section>

      <Section title="NotificationItem">
        <Card className="max-w-xl overflow-hidden p-0">
          <NotificationItem
            actorName="Irene Sousa"
            actorInitials="IS"
            message={<>accepted your ask <strong>"Intro to Stripe ops"</strong>.</>}
            timestamp="2m ago"
            unread
          />
          <NotificationItem
            actorName="David Lin"
            actorInitials="DL"
            message={<>added you to <strong>Premium Networks</strong>.</>}
            timestamp="1h ago"
          />
          <NotificationItem
            actorName="Andrew Park"
            actorInitials="AP"
            message={<>replied to your conversation.</>}
            timestamp="Yesterday"
          />
        </Card>
      </Section>

      <Section title="InboxMessageRow">
        <Card className="max-w-xl overflow-hidden p-0">
          <InboxMessageRow
            senderName="Marie Lambert"
            senderInitials="ML"
            subject="Re: Soar Score deep-dive"
            preview="Loved your post on tokenized workflows. Let's connect on Thursday — I'm free between 2 and 4."
            timestamp="3:21 PM"
            unread
            hasAttachment
          />
          <InboxMessageRow
            senderName="Tomás García"
            senderInitials="TG"
            subject="Coffee?"
            preview="In SF next week — would love 30 minutes if you have time."
            timestamp="11:04 AM"
          />
          <InboxMessageRow
            senderName="Linear Team"
            senderInitials="LT"
            preview="Your weekly digest is ready. 12 new asks completed across your network."
            timestamp="Mon"
          />
        </Card>
      </Section>

      <Section title="GroupCoverCard">
        <div className="flex flex-wrap gap-3">
          <GroupCoverCard
            name="Premium Networks"
            tagline="Where superconnectors meet."
            membersCount={1240}
            members={[{ initials: "IS" }, { initials: "DL" }, { initials: "AP" }]}
            state="open"
          />
          <GroupCoverCard
            name="L&D Practitioners"
            tagline="Learning + development pros."
            membersCount={384}
            members={[{ initials: "ML" }, { initials: "PS" }]}
            state="member"
          />
          <GroupCoverCard
            name="Investors Circle"
            tagline="Curated network of LPs/GPs."
            membersCount={91}
            state="request"
          />
        </div>
      </Section>

      <Section title="SkeletonRow">
        <Card className="max-w-xl overflow-hidden p-0">
          <SkeletonRow count={3} />
        </Card>
      </Section>

      <Section title="EmptyState">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EmptyState
            title="No asks yet"
            description="Asks you create or receive will appear here. Start by asking your network for an intro."
            action={{ label: "+ New ask" }}
          />
          <EmptyState
            variant="closed-asks"
            title="All caught up"
            description="No closed asks need your attention right now."
          />
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="border-b border-border pb-2 font-display text-2xl font-semibold">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
