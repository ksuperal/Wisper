"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function TopBar({
  title,
  showBack = false,
  onBack,
  rightAction,
  className,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-5 bg-ink",
        className
      )}
    >
      {/* Left - Back button */}
      <div className="flex items-center min-w-[44px]">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-11 h-11 -ml-2 text-text-2 hover:text-text-1 transition-colors rounded-lg focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Center - Title */}
      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] font-medium text-text-1">
          {title}
        </h1>
      )}

      {/* Right - Action */}
      <div className="flex items-center justify-end min-w-[44px]">
        {rightAction}
      </div>
    </header>
  );
}
