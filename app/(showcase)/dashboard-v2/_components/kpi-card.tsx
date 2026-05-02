import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { type KpiData, accentVar } from "../_data/mock";
import { cn } from "@/lib/utils";

export function KpiCard({ label, value, delta, accent, series }: KpiData) {
  const accentColor = accentVar(accent);
  const isUp = delta.sign === "up";
  // "up" delta is good for everything except the destructive amber chart in Figma — but
  // the design uses status-success for up and status-error for down, regardless of metric.
  const deltaColor = isUp ? "var(--status-success)" : "var(--status-error)";
  const DeltaIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <Card className="flex w-full flex-col gap-3 rounded-2xl p-5">
      <div className="flex items-center">
        <p className="flex-1 text-small-medium text-muted-foreground">{label}</p>
        <span
          className="size-2 rounded-full"
          style={{ background: accentColor }}
          aria-hidden
        />
      </div>

      <div className="flex items-end gap-2">
        <p className="text-h1 font-bold leading-[44px] tracking-[-0.5px] text-card-foreground">
          {value}
        </p>
        <span
          className="inline-flex items-center gap-0.5 rounded-full px-2 text-caption-medium"
          style={{
            color: deltaColor,
            background: `color-mix(in oklab, ${deltaColor} 18%, transparent)`,
          }}
        >
          <DeltaIcon className="size-3" aria-hidden />
          {delta.value}
        </span>
      </div>

      {/* Mini bar chart — 12 bars with varying opacity */}
      <div className="flex h-8 items-end gap-[2px]" aria-hidden>
        {series.map((v, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${Math.max(4, v * 32)}px`,
              background: accentColor,
              opacity: Math.max(0.3, v),
            }}
          />
        ))}
      </div>
    </Card>
  );
}

/**
 * Backwards-compat helper for arbitrary classNames on the card grid container.
 */
export function KpiGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
