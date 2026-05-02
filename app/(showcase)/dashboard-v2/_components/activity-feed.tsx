import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { activity, accentVar } from "../_data/mock";

export function ActivityFeed() {
  return (
    <Card className="rounded-2xl">
      <header className="flex items-center gap-2 px-6 pt-6 pb-4">
        <p className="flex-1 text-body-lg-medium text-card-foreground">Activity</p>
        <span className="text-caption text-muted-foreground">Last 7 days</span>
      </header>
      <ul className="divide-y divide-border/50">
        {activity.map((a, i) => (
          <li key={i} className="flex items-center gap-3 px-6 py-4">
            <Avatar size="md" style={{ background: accentVar(a.accent) }}>
              <AvatarFallback className="bg-transparent text-white">{a.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-1 text-body-sm">
                <span className="font-medium text-card-foreground">{a.actor}</span>
                <span className="text-muted-foreground">{a.verb}</span>
              </div>
              {a.object && (
                <p className="truncate text-small text-foreground">{a.object}</p>
              )}
            </div>
            <span className="shrink-0 text-caption text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
