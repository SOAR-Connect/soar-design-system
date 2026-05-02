"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme Toggle — mirrors Figma component "Theme Toggle" (4048:17, 2 variants).
 * 256×80 container, two pill buttons. Active variant uses the brand red ring.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch — render a neutral placeholder until mounted.
  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card p-1",
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={current === "light"}
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-small-medium transition-colors",
          current === "light"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="size-4" aria-hidden />
        Light
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={current === "dark"}
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-small-medium transition-colors",
          current === "dark"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="size-4" aria-hidden />
        Dark
      </button>
    </div>
  );
}
