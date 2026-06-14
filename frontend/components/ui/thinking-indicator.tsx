"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ThinkingIndicatorProps {
  label?: string;
  className?: string;
}

export function ThinkingIndicator({
  label = "Analyzing...",
  className,
}: ThinkingIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      {/* Three dots animation */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-signal rounded-full animate-deal-think"
            style={{
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      {label && (
        <p className="caption">{label}</p>
      )}
    </div>
  );
}
