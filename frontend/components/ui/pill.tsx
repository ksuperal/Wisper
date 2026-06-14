import * as React from "react";
import { cn } from "@/lib/utils";
import { SessionStatus } from "@/lib/types";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "category" | "status";
  selected?: boolean;
  status?: SessionStatus;
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      variant = "category",
      selected = false,
      status,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Category Pill
    if (variant === "category") {
      return (
        <button
          ref={ref}
          className={cn(
            // Base styles
            "inline-flex items-center justify-center h-[34px] px-3.5 rounded-full font-medium text-[13px] transition-colors",
            "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2",

            // Selected state
            selected
              ? "bg-signal text-[#001A12]"
              : "bg-raised text-text-3 border border-border hover:border-muted",

            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    // Status Pill
    if (variant === "status") {
      return (
        <div
          className={cn(
            // Base styles
            "inline-flex items-center justify-center h-6 px-2.5 rounded-full font-medium text-[11px]",

            // Status variants
            {
              "bg-signal-bg text-signal border border-signal-dim":
                status === "won",
              "bg-danger-bg text-[#FCA5A5] border border-[#FF4D4D40]":
                status === "lost",
              "bg-raised text-text-2 border border-border":
                status === "ongoing",
            },

            className
          )}
        >
          {children}
        </div>
      );
    }

    return null;
  }
);

Pill.displayName = "Pill";

export { Pill };
