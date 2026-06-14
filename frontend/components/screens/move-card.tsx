"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MoveBadge } from "@/components/ui/move-badge";
import { MoveType } from "@/lib/types";

export interface MoveCardData {
  moveType: MoveType;
  moveNumber?: number;
  youSay: string;
  why: string;
  watchFor: string;
}

export interface MoveCardProps {
  move: MoveCardData;
  className?: string;
}

export function MoveCard({ move, className }: MoveCardProps) {
  return (
    <Card
      variant="signal"
      signalAccent
      className={cn("p-4 space-y-4 animate-deal-card-in", className)}
    >
      {/* Top row - Badge and move number */}
      <div className="flex items-center justify-between">
        <MoveBadge type={move.moveType} />
        {move.moveNumber && (
          <span className="text-[11px] text-[#444444]">
            Move {move.moveNumber}
          </span>
        )}
      </div>

      {/* SAY THIS section */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-medium uppercase tracking-wider text-signal">
          SAY THIS:
        </h3>
        <div className="bg-[#0A1F14] rounded-lg p-3">
          <p className="text-[15px] text-text-1 leading-[1.65]">
            "{move.youSay}"
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-signal-dim" />

      {/* WHY section */}
      <div className="space-y-1">
        <h4 className="text-[10px] font-medium uppercase tracking-wider text-text-3">
          WHY
        </h4>
        <p className="text-[13px] text-[#888888] leading-relaxed">
          {move.why}
        </p>
      </div>

      {/* WATCH FOR section */}
      <div className="space-y-1">
        <h4 className="text-[10px] font-medium uppercase tracking-wider text-text-3">
          WATCH FOR
        </h4>
        <p className="text-[13px] text-[#888888] leading-relaxed">
          {move.watchFor}
        </p>
      </div>
    </Card>
  );
}

// Loading state for move card
export function MoveCardLoading({ className }: { className?: string }) {
  return (
    <Card variant="standard" className={cn("p-10", className)}>
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Three dots animation */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-signal rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: "1.2s",
              }}
            />
          ))}
        </div>
        <p className="text-[12px] text-text-3">Analyzing their position...</p>
      </div>
    </Card>
  );
}
