"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ListChecks, TrendingUp, User } from "lucide-react";

interface TabItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: TabItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/sessions", label: "Sessions", icon: ListChecks },
  { href: "/stats", label: "Stats", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-[#1C1C1C]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 relative transition-colors flex-1",
                "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-lg"
              )}
            >
              {/* Active indicator - 2px line at very top */}
              {isActive && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-0.5 bg-signal" />
              )}

              {/* Icon */}
              <Icon
                className={cn(
                  "w-6 h-6 transition-colors mb-0.5",
                  isActive ? "text-signal" : "text-[#444444]"
                )}
              />

              {/* Label */}
              <span
                className={cn(
                  "text-[11px] transition-colors",
                  isActive ? "text-signal font-medium" : "text-[#444444] font-normal"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
