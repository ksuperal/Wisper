"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScoreBarProps {
  score: number;
  maxScore?: number;
  animated?: boolean;
  showScore?: boolean;
  label?: string;
  className?: string;
}

export function ScoreBar({
  score,
  maxScore = 10,
  animated = true,
  showScore = true,
  label,
  className,
}: ScoreBarProps) {
  const [displayScore, setDisplayScore] = React.useState(animated ? 0 : score);
  const percentage = (score / maxScore) * 100;

  React.useEffect(() => {
    if (!animated) return;

    // Animated count-up effect
    const duration = 800; // ms
    const steps = 60;
    const stepValue = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(stepValue * currentStep);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [score, animated]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Score display */}
      {showScore && (
        <div className="flex items-baseline gap-2">
          <span className="text-[40px] font-medium text-text-1 tracking-tight">
            {displayScore.toFixed(1)}
          </span>
          <span className="text-xl text-text-3">/ {maxScore}</span>
        </div>
      )}

      {/* Label */}
      {label && (
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-3">
          {label}
        </p>
      )}

      {/* Progress bar */}
      <div className="relative w-full h-1.5 bg-raised rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute left-0 top-0 h-full bg-signal rounded-full transition-all",
            animated && "duration-[800ms] ease-out"
          )}
          style={{
            width: `${percentage}%`,
            transitionDelay: animated ? "200ms" : "0ms",
          }}
        />
      </div>
    </div>
  );
}
