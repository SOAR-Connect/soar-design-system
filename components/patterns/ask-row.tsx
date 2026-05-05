"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Ask Row — 1136×64 (per design-standards-v11 §24).
 *
 * Anatomy:
 *   [Avatar 36×36] [Name + Role] [Score Badge 40×24] [Tags] [Contact Button 76×32] [✓ 16×16]
 *      x=20, y=14   x=68          x=260                x=312  x=1024                  x=1100
 *
 * 64px tall with 1px bottom divider. Avatar uses brand primary fallback.
 *
 * Connects to: SOAR-273 (closed badge state) and SOAR-279 (closed visual indicator).
 * The `status="closed"` variant applies strikethrough + dimmed styling per
 * design-standards-v11 §11 (membership/state system).
 */
export type AskTagTone = "brand" | "earth" | "forest" | "gold";

export interface AskRowProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl?: string;
  initials?: string;
  name: string;
  role?: string;
  score?: number; // 0–100
  tags?: { label: string; tone?: AskTagTone }[];
  contactLabel?: string; // default "Contact"
  onContact?: () => void;
  status?: "open" | "closed" | "pending";
  selected?: boolean;
}

const toneClass: Record<AskTagTone, string> = {
  brand: "bg-primary/10 text-primary border-primary/20",
  earth: "bg-[oklch(0.7_0.04_60)]/15 text-[oklch(0.46_0.04_55)] border-[oklch(0.7_0.04_60)]/30",
  forest: "bg-status-success/15 text-status-success border-status-success/30",
  gold: "bg-accent/15 text-[oklch(0.40_0.14_70)] border-accent/30",
};

export function AskRow({
  avatarUrl,
  initials,
  name,
  role,
  score,
  tags = [],
  contactLabel = "Contact",
  onContact,
  status = "open",
  selected = false,
  className,
  ...rest
}: AskRowProps) {
  const closed = status === "closed";
  return (
    <div
      className={cn(
        "group flex h-16 items-center gap-3 border-b border-border px-5 transition-colors last:border-b-0",
        "hover:bg-muted/40",
        selected && "bg-accent/10",
        closed && "opacity-70",
        className
      )}
      data-status={status}
      {...rest}
    >
      <Avatar className="h-9 w-9 shrink-0">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className="bg-primary text-primary-foreground">
          {initials ?? name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate text-sm font-semibold leading-tight text-foreground",
            closed && "line-through decoration-muted-foreground/60"
          )}
        >
          {name}
        </span>
        {role && (
          <span className="truncate text-xs leading-tight text-muted-foreground">{role}</span>
        )}
      </div>

      {typeof score === "number" && (
        <div className="flex h-6 w-10 items-center justify-center rounded-md bg-accent/15 text-xs font-semibold text-foreground">
          {Math.max(0, Math.min(100, Math.round(score)))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          {tags.slice(0, 3).map((t, i) => (
            <Badge
              key={i}
              variant="outline"
              className={cn("border text-[10px] font-semibold uppercase tracking-wider", toneClass[t.tone ?? "brand"])}
            >
              {t.label}
            </Badge>
          ))}
        </div>
      )}

      {closed ? (
        <Badge variant="outline" className="ml-auto shrink-0">
          Closed
        </Badge>
      ) : (
        <Button
          size="sm"
          variant={status === "pending" ? "outline" : "default"}
          className="ml-auto h-8 w-[76px] shrink-0 rounded-full text-xs"
          onClick={onContact}
        >
          {status === "pending" ? "Pending" : contactLabel}
        </Button>
      )}
    </div>
  );
}
