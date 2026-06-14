"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { SessionListItem } from "@/components/screens/session-list-item";
import { StatCard } from "@/components/screens/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowRight } from "lucide-react";
import { Session } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    // TODO: Fetch sessions from API
    // fetchSessions().then(setSessions).finally(() => setIsLoading(false));
    // TODO: Fetch user data
    // fetchUser().then(setUser);
    setIsLoading(false);
  }, []);

  const handleStartNegotiation = () => {
    router.push("/sessions/new");
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  const getUserInitial = () => {
    if (user?.fullName) return user.fullName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col pb-20">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5">
        {/* Top greeting section */}
        <div className="pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="caption mb-0.5">
              {getGreeting()}
            </p>
            <h1 className="text-lg font-medium text-text-1">
              {user?.fullName?.split(' ')[0] || 'Deal'}
            </h1>
          </div>
          {/* Avatar placeholder */}
          <div className="w-[34px] h-[34px] bg-raised rounded-full flex items-center justify-center text-text-2 text-sm font-medium">
            {getUserInitial()}
          </div>
        </div>

        {/* Hero CTA Card */}
        <button
          onClick={handleStartNegotiation}
          className="w-full bg-signal hover:bg-[#00CC8F] transition-all duration-100 rounded-2xl p-5 text-left active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#004D35]">
                START NEGOTIATION
              </p>
              <h2 className="text-lg font-medium text-[#001A12]">
                What are you negotiating?
              </h2>
            </div>
            <ArrowRight className="w-5 h-5 text-[#004D35] flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Stats row */}
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-2">
          <StatCard value={sessions.length.toString()} label="Sessions" />
          <StatCard
            value={sessions
              .filter(s => s.finalAmount)
              .reduce((sum, s) => sum + (s.finalAmount || 0), 0)
              .toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
            }
            label="Total won"
          />
        </div>
      </div>

      {/* Recent sessions section */}
      <div className="mb-2.5">
        <h2 className="caption">
          RECENT SESSIONS
        </h2>
      </div>

      {/* Session list */}
      <div className="pb-24">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-text-3">Loading...</p>
          </div>
        ) : sessions.length > 0 ? (
          <div className="bg-surface -mx-5">
            {sessions.map((session) => (
              <SessionListItem key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🤝"
            title="No sessions yet"
            description="Start your first negotiation and see how much more you can win."
            action={{
              label: "Start negotiating",
              onClick: handleStartNegotiation,
            }}
          />
        )}
      </div>
      </div>

      {/* Bottom navigation */}
      <BottomTabBar />
    </div>
  );
}
