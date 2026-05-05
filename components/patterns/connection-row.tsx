"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SoarScoreRing } from "./soar-score-ring";
import { cn } from "@/lib/utils";

/**
 * Connection Row — 1136×64 (per design-standards-v11 §24).
 *
 * One row per person in the Connections list. Anatomy mirrors AskRow but
 * emphasizes the SOAR Score (right-aligned ring instead of badge). Tags
 * indicate relationship strength / category.
 *
 * Connects to: SOAR-293 (score badge missing in list view).
 */
export interface ConnectionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl?: string;
  initials?: string;
  name: string;
  role?: string; // company / role
  mutualCount?: number;
  score?: number; // 0–100
  tags?: { label: string }[];
  status?: "connected" | "pending" | "suggested";
  onAction?: () => void;
}

export function ConnectionRow({
  avatarUrl,
  initials,
  name,
  role,
  mutualCount,
  score,
  tags = [],
  status = "connected",
  onAction,
  className,
  ...rest
}: ConnectionRowProps) {
  const actionLabel =
    status === "pending" ? "Pending" : status === "suggested" ? "+ Add" : "View";

  return (
    <div
      className={cn(
        "group flex h-16 items-center gap-3 border-b border-border px-5 transition-colors last:border-b-0",
        "hover:bg-muted/40",
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
        <span className="truncate text-sm font-semibold leading-tight text-foreground">{name}</span>
        <span className="truncate text-xs leading-tight text-muted-foreground">
          {role}
          {role && typeof mutualCount === "number" && " · "}
          {typeof mutualCount === "number" && `${mutualCount} mutual`}
        </span>
      </div>

      {tags.length > 0 && (
        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          {tags.slice(0, 2).map((t, i) => (
            <Badge key={i} variant="secondary" className="text-[10px] uppercase tracking-wider">
              {t.label}
            </Badge>
          ))}
        </div>
      )}

      {typeof score === "number" && (
        <SoarScoreRing
          score={score}
          size={40}
          thickness={3}
          showLabel={false}
          className="shrink-0"
        />
      )}

      <Button
        size="sm"
        variant={status === "suggested" ? "default" : status === "pending" ? "outline" : "ghost"}
        className="ml-1 h-8 w-[76px] shrink-0 rounded-full text-xs"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
