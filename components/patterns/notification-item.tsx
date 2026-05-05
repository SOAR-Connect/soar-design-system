"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * Notification Item — 600×72 (per design-standards-v11 §24).
 *
 * Used in the SOAR-229 Notification Center panel. Shows: actor avatar,
 * action description, timestamp, optional unread dot.
 *
 * Connects to: SOAR-274 (notifications not clearing) and SOAR-275 (crash
 * on open) — those are runtime bugs but the component design is here.
 */
export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  actorName: string;
  actorAvatarUrl?: string;
  actorInitials?: string;
  message: React.ReactNode;
  timestamp: string;
  unread?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function NotificationItem({
  actorName,
  actorAvatarUrl,
  actorInitials,
  message,
  timestamp,
  unread = false,
  icon,
  onClick,
  className,
  ...rest
}: NotificationItemProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "flex min-h-[72px] cursor-default items-start gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0",
        onClick && "cursor-pointer hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        unread && "bg-accent/5",
        className
      )}
      data-unread={unread}
      {...rest}
    >
      {unread && (
        <span
          aria-label="Unread"
          className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-primary"
        />
      )}
      <Avatar className="h-9 w-9 shrink-0">
        {actorAvatarUrl && <AvatarImage src={actorAvatarUrl} alt={actorName} />}
        <AvatarFallback className="bg-primary text-primary-foreground">
          {actorInitials ?? actorName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="text-sm leading-snug text-foreground">
          <span className="font-semibold">{actorName}</span> {message}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {icon && <span className="opacity-70">{icon}</span>}
          <time>{timestamp}</time>
        </div>
      </div>
    </div>
  );
}
