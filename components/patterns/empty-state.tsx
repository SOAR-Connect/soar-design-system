"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Empty State pattern — 480×200 (per design-standards-v11 §24).
 * Icon + headline + subtitle + optional CTA. Used for empty lists,
 * search results with no matches, dashboards with no data, etc.
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  /** Variant for specific contexts. `closed-asks` adds strikethrough nuance. */
  variant?: "default" | "search" | "closed-asks" | "error";
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "mx-auto flex w-full max-w-[480px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/40 px-6 py-10 text-center",
        className
      )}
      style={{ minHeight: 200 }}
      {...rest}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3
        className={cn(
          "font-display text-xl font-semibold text-foreground",
          variant === "closed-asks" && "line-through decoration-muted-foreground/50"
        )}
      >
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} size="sm" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
