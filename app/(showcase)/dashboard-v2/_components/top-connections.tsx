import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { topConnections, accentVar } from "../_data/mock";

export function TopConnections() {
  return (
    <Card className="rounded-2xl">
      <header className="flex items-center gap-2 px-6 pt-6 pb-4">
        <p className="flex-1 text-body-lg-medium text-card-foreground">Top connections</p>
        <a className="text-small text-primary hover:underline" href="#">See all</a>
      </header>
      <ul className="divide-y divide-border/50">
        {topConnections.map((c) => (
          <li key={c.name} className="flex items-center gap-3 px-6 py-3">
            <Avatar size="lg" style={{ background: accentVar(c.accent) }}>
              <AvatarFallback className="bg-transparent text-white">{c.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="truncate text-body-sm-medium text-card-foreground">{c.name}</p>
              <p className="truncate text-caption text-muted-foreground">{c.role}</p>
            </div>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-caption-medium text-foreground">
              {c.score}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
