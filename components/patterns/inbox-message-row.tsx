"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * Inbox Message Row — 800×72 (per design-standards-v11 §24).
 *
 * One row per thread in the inbox list. Shows: sender avatar, sender name,
 * preview snippet, timestamp, unread dot, attachment icon.
 */
export interface InboxMessageRowProps extends React.HTMLAttributes<HTMLDivElement> {
  senderName: string;
  senderAvatarUrl?: string;
  senderInitials?: string;
  subject?: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
  hasAttachment?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function InboxMessageRow({
  senderName,
  senderAvatarUrl,
  senderInitials,
  subject,
  preview,
  timestamp,
  unread = false,
  hasAttachment = false,
  selected = false,
  onClick,
  className,
  ...rest
}: InboxMessageRowProps) {
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
        selected && "bg-accent/10",
        unread && !selected && "bg-card",
        className
      )}
      data-unread={unread}
      {...rest}
    >
      <Avatar className="h-10 w-10 shrink-0">
        {senderAvatarUrl && <AvatarImage src={senderAvatarUrl} alt={senderName} />}
        <AvatarFallback className="bg-primary text-primary-foreground">
          {senderInitials ?? senderName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "truncate text-sm leading-tight text-foreground",
              unread ? "font-bold" : "font-semibold"
            )}
          >
            {senderName}
          </span>
          <time className="shrink-0 text-xs text-muted-foreground">{timestamp}</time>
        </div>
        {subject && (
          <span
            className={cn(
              "truncate text-sm leading-tight text-foreground",
              unread ? "font-semibold" : "font-medium"
            )}
          >
            {subject}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">{preview}</p>
          {hasAttachment && (
            <span aria-label="Has attachment" className="shrink-0 text-muted-foreground" title="Has attachment">
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 7L6 12a3 3 0 11-4-4l5.5-5.5a2 2 0 113 3L4.5 11.5" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {unread && (
        <span
          aria-label="Unread"
          className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-primary"
        />
      )}
    </div>
  );
}
