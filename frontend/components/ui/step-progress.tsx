"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Dots and lines */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* Dot */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                  isActive && "bg-signal",
                  isComplete && "bg-signal-dim",
                  !isActive && !isComplete && "bg-border"
                )}
              >
                {isComplete ? (
                  <Check className="w-4 h-4 text-signal" />
                ) : (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isActive && "text-[#001A12]",
                      !isActive && "text-text-3"
                    )}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Line between dots */}
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "w-12 h-0.5 transition-colors",
                    stepNumber < currentStep ? "bg-signal" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Label */}
      <p className="text-[11px] text-text-3">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
