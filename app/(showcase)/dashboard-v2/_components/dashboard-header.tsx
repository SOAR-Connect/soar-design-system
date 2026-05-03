import { Flag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { greeting } from "../_data/mock";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          {greeting.greeting}
        </h1>
        <p className="text-body-sm text-muted-foreground">{greeting.meta}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="icon" aria-label="Flagged items"><Flag /></Button>
        <Button><Plus /> New Ask</Button>
      </div>
    </header>
  );
}
