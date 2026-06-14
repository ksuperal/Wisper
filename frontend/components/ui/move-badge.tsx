import * as React from "react";
import { cn } from "@/lib/utils";
import { MoveType } from "@/lib/types";
import { MOVE_CONFIGS } from "@/lib/constants";

export interface MoveBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: MoveType;
  compact?: boolean;
}

const MoveBadge = React.forwardRef<HTMLDivElement, MoveBadgeProps>(
  ({ type, compact = false, className, ...props }, ref) => {
    const config = MOVE_CONFIGS[type];

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center gap-2 px-2.5 rounded-md font-medium uppercase tracking-wider text-[11px]",

          // Height
          compact ? "h-6" : "h-[26px]",

          className
        )}
        style={{
          backgroundColor: config.bgColor,
          color: config.textColor,
        }}
        {...props}
      >
        {/* Colored dot */}
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: config.color }}
        />

        {/* Label */}
        <span>{config.label}</span>
      </div>
    );
  }
);

MoveBadge.displayName = "MoveBadge";

export { MoveBadge };
