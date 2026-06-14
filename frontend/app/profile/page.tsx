"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-ink flex flex-col pb-20">
      {/* Top Bar */}
      <TopBar title="Profile" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="py-6 pb-24 space-y-6">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-raised rounded-full flex items-center justify-center text-text-1 text-xl font-medium">
            U
          </div>
          <div className="flex-1">
            <h2 className="text-base font-medium text-text-1">User Name</h2>
            <p className="text-sm text-text-3">user@example.com</p>
          </div>
        </div>

        {/* Subscription */}
        <Card variant="standard" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium text-text-1 mb-1">Free Plan</h3>
              <p className="text-xs text-text-3">1 session per month</p>
            </div>
            <Button variant="primary">Upgrade</Button>
          </div>
        </Card>

        {/* Menu items */}
        <div className="space-y-0 bg-surface rounded-xl overflow-hidden">
          {[
            { label: "Account Settings", href: "#" },
            { label: "Billing & Subscription", href: "#" },
            { label: "Notifications", href: "#" },
            { label: "Help & Support", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-4 hover:bg-raised/50 transition-colors ${
                i < 5 ? "border-b border-[#1C1C1C]" : ""
              }`}
            >
              <span className="text-sm text-text-2">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-text-3" />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <Button variant="secondary" fullWidth>
          Sign Out
        </Button>

          {/* Version */}
          <p className="text-xs text-text-3 text-center">Version 1.0.0</p>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomTabBar />
    </div>
  );
}
