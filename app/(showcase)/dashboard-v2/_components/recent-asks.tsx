import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentAsks, type AskStatus } from "../_data/mock";

const statusVariant: Record<AskStatus, "success" | "warning" | "secondary"> = {
  active: "success",
  pending: "warning",
  closed: "secondary",
};
const statusLabel: Record<AskStatus, string> = {
  active: "Active",
  pending: "Pending",
  closed: "Closed",
};

export function RecentAsks() {
  return (
    <Card className="rounded-2xl">
      <header className="flex items-center gap-2 px-6 pt-6 pb-4">
        <p className="flex-1 text-body-lg-medium text-card-foreground">Recent asks</p>
        <a className="text-small text-primary hover:underline" href="#">View all</a>
      </header>
      <div className="h-px w-full bg-border" />
      <ul className="divide-y divide-border/50">
        {recentAsks.map((ask) => (
          <li key={ask.title} className="flex items-center gap-3 px-6 py-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="truncate text-body-sm-medium text-card-foreground">{ask.title}</p>
              <div className="flex items-center gap-2 text-caption text-muted-foreground">
                <span>{ask.responses} responses</span>
                <span>·</span>
                <span>{ask.age}</span>
              </div>
            </div>
            <Badge variant={statusVariant[ask.status]} className="rounded-full">
              {statusLabel[ask.status]}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
