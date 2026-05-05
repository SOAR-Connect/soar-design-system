"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Group Cover Card — 240×140 (per design-standards-v11 §24).
 *
 * Smaller cousin of the full-width Group Cover banner (§8). Used in
 * Discover Groups grid and group-list contexts. Anatomy:
 *   - Gradient cover background (brand → accent)
 *   - Group name (EB Garamond SemiBold)
 *   - Members count line (Inter Regular muted)
 *   - Stacked member avatars (max 3) bottom-left
 *   - Join CTA bottom-right
 *
 * NON-NEGOTIABLE per §8: no pills, chips, tags, or labels on covers.
 */
export interface GroupMember {
  initials: string;
  avatarUrl?: string;
}

export interface GroupCoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  tagline?: string;
  membersCount: number;
  members?: GroupMember[];
  state?: "member" | "pending" | "request" | "open";
  onAction?: () => void;
}

const stateConfig: Record<NonNullable<GroupCoverCardProps["state"]>, { label: string; variant: "default" | "secondary" | "outline" }> = {
  member:  { label: "Open Group →", variant: "default" },
  pending: { label: "Withdraw", variant: "outline" },
  request: { label: "Request to Join →", variant: "default" },
  open:    { label: "+ Join", variant: "default" },
};

export function GroupCoverCard({
  name,
  tagline,
  membersCount,
  members = [],
  state = "open",
  onAction,
  className,
  ...rest
}: GroupCoverCardProps) {
  const config = stateConfig[state];
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border shadow-sm",
        "transition-shadow hover:shadow-md",
        className
      )}
      style={{
        width: 240,
        height: 140,
        backgroundImage:
          "linear-gradient(135deg, oklch(0.40 0.14 30) 0%, oklch(0.55 0.16 50) 60%, oklch(0.72 0.16 70) 100%)",
      }}
      {...rest}
    >
      {/* Ambient orb for depth */}
      <span
        aria-hidden="true"
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-black/10 blur-xl"
      />

      <div className="relative flex flex-1 flex-col justify-between p-3 text-white">
        <div className="space-y-0.5">
          <h3 className="font-display text-base font-semibold leading-tight">{name}</h3>
          {tagline && (
            <p className="line-clamp-1 text-[11px] leading-tight text-white/80">{tagline}</p>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((m, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-white/90">
                  {m.avatarUrl && <AvatarImage src={m.avatarUrl} alt="" />}
                  <AvatarFallback className="bg-primary text-[9px] text-primary-foreground">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-[10px] font-medium text-white/80">
              {membersCount.toLocaleString()} members
            </span>
          </div>

          <Button
            size="xs"
            variant={config.variant === "default" ? "secondary" : config.variant}
            className={cn(
              "h-7 shrink-0 text-[11px] font-semibold",
              config.variant === "default" && "bg-white text-foreground hover:bg-white/90"
            )}
            onClick={onAction}
          >
            {config.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
