"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "group flex h-9 w-full items-center gap-3 rounded-lg px-3 text-body-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      state: {
        default: "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        active: "bg-sidebar-accent text-sidebar-foreground shadow-sm",
      },
    },
    defaultVariants: { state: "default" },
  }
);

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarItemVariants> {
  asChild?: boolean;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, state, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="sidebar-item"
        className={cn(sidebarItemVariants({ state }), className)}
        {...props}
      />
    );
  }
);
SidebarItem.displayName = "SidebarItem";

export { sidebarItemVariants };
