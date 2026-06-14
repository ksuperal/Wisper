"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";
import { Session } from "@/lib/types";
import { NEGOTIATION_TYPES } from "@/lib/constants";
import { formatDateShort, formatCurrency } from "@/lib/utils";

export interface SessionListItemProps {
  session: Session;
  className?: string;
}

export function SessionListItem({ session, className }: SessionListItemProps) {
  const categoryConfig = NEGOTIATION_TYPES.find((t) => t.value === session.type);

  // Format date as "Jun 14"
  const date = new Date(session.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Link
      href={`/sessions/${session.id}`}
      className={cn(
        "flex items-center gap-3.5 px-5 py-3.5 border-b border-[#1C1C1C] last:border-b-0",
        "hover:bg-surface/50 transition-colors active:bg-surface",
        className
      )}
    >
      {/* Left - Category icon badge */}
      <div className="flex items-center justify-center w-9 h-9 bg-raised rounded-lg text-xl flex-shrink-0">
        {categoryConfig?.icon || "💬"}
      </div>

      {/* Center - Title and subtitle */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-text-1 truncate">
          {session.title || `${categoryConfig?.label || "Negotiation"}`}
        </h3>
        <p className="text-xs text-text-3 truncate">
          {formattedDate}{session.moveCount ? ` · ${session.moveCount} moves` : ''}
        </p>
      </div>

      {/* Right - Status and amount */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <Pill variant="status" status={session.status}>
          {session.status === "won"
            ? "Won"
            : session.status === "lost"
            ? "Lost"
            : "Ongoing"}
        </Pill>
        {session.finalAmount && (
          <span className="text-[13px] font-medium text-signal">
            {session.finalAmount > 0 ? "+" : ""}
            {formatCurrency(session.finalAmount)}
          </span>
        )}
      </div>
    </Link>
  );
}
