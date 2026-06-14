"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-8 text-center",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-[48px] opacity-30">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-base font-medium text-text-1 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-text-3 mb-6 max-w-sm">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
