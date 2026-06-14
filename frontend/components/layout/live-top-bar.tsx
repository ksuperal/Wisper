"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiveTopBarProps {
  sessionName: string;
  moveCount?: number;
  totalMoves?: number;
  className?: string;
}

export function LiveTopBar({
  sessionName,
  moveCount,
  totalMoves,
  className,
}: LiveTopBarProps) {
  return (
    <div className={cn("bg-ink border-b border-[#1C1C1C]", className)}>
      {/* Main bar */}
      <div className="flex items-center justify-between h-[52px] px-5">
        {/* Left - LIVE indicator */}
        <div className="flex items-center gap-2">
          {/* Pulsing dot */}
          <div className="relative w-1.5 h-1.5">
            <div className="w-1.5 h-1.5 bg-danger rounded-full" />
            {/* Pulse ring effect */}
            <div className="absolute inset-0 w-1.5 h-1.5 bg-danger rounded-full animate-deal-pulse" />
          </div>
          <span className="text-[11px] font-medium text-danger uppercase tracking-wider">
            LIVE
          </span>
        </div>

        {/* Center - Session name */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-[13px] text-text-3">{sessionName}</span>
        </div>

        {/* Right - Move counter */}
        {moveCount !== undefined && (
          <div className="text-[11px] text-[#444444]">
            Move {moveCount}
            {totalMoves && ` / ${totalMoves}`}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ContextBarProps {
  goal: string;
  floor: string;
  currentOffer: string;
  className?: string;
}

export function ContextBar({ goal, floor, currentOffer, className }: ContextBarProps) {
  return (
    <div
      className={cn(
        "px-5 py-2 bg-ink border-b border-[#141414]",
        className
      )}
    >
      <p className="text-[11px] text-[#444444] truncate">
        Goal {goal} · Floor {floor} · Offer {currentOffer}
      </p>
    </div>
  );
}
