"use client";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

/**
 * SOAR-themed Sonner toaster.
 *
 * Mount once at the root layout: `<Toaster />`. Then call `toast(...)` from
 * `sonner` anywhere. We map the sonner CSS variables onto SOAR tokens so the
 * toast surface inherits the brand without per-call className gymnastics.
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:!border-destructive group-[.toaster]:!text-destructive",
          success: "group-[.toaster]:!border-status-success group-[.toaster]:!text-status-success",
          warning: "group-[.toaster]:!border-status-warning group-[.toaster]:!text-status-warning",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
