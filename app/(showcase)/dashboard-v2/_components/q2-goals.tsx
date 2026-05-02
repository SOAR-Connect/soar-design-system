import { Card } from "@/components/ui/card";
import { q2Goals } from "../_data/mock";

export function Q2Goals() {
  return (
    <Card className="flex flex-col gap-4 rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <p className="flex-1 text-body-lg-medium text-card-foreground">Q2 goals</p>
        <span className="text-caption text-muted-foreground">Apr–Jun</span>
      </div>

      <div className="flex flex-col gap-3">
        {q2Goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <div key={g.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="flex-1 text-small-medium text-card-foreground">{g.label}</p>
                <span className="text-caption text-muted-foreground">
                  {g.current} / {g.target}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                  role="progressbar"
                  aria-valuenow={g.current}
                  aria-valuemin={0}
                  aria-valuemax={g.target}
                  aria-label={g.label}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
