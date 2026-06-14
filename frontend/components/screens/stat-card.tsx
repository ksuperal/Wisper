"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card variant="stat" className={cn("flex flex-col", className)}>
      <div className="text-[11px] text-text-3 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-2xl font-medium text-signal tracking-tight">
        {value}
      </div>
    </Card>
  );
}
