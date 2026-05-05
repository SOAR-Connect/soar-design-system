import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShowcasePage() {
  return (
    <main className="container mx-auto max-w-5xl space-y-12 py-12 px-6">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-semibold tracking-tight">SOAR Design System</h1>
        <p className="text-lg text-muted-foreground">
          Canonical primitives. EB Garamond + Inter. Burgundy + gold.
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
            <AvatarFallback>DM</AvatarFallback>
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
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
