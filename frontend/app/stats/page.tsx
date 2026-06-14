"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { StatCard } from "@/components/screens/stat-card";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function StatsPage() {
  const [stats, setStats] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch stats from API
    // fetchUserStats().then(setStats).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-ink flex flex-col pb-20">
      {/* Top Bar */}
      <TopBar title="Stats" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="py-6 pb-24 space-y-6">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-text-3">Loading stats...</p>
          </div>
        ) : stats ? (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-2">
              <StatCard value={stats.totalSessions} label="Total Sessions" />
              <StatCard value={stats.winRate} label="Win Rate" />
              <StatCard value={stats.totalWon} label="Total Won" />
              <StatCard value={stats.avgScore} label="Avg Score" />
            </div>

            {/* Win breakdown */}
            <Card variant="standard" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-text-1">Win Breakdown</h2>
                <TrendingUp className="w-4 h-4 text-signal" />
              </div>

              <div className="space-y-3">
                {stats.winBreakdown?.map((item: any) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-text-2">{item.category}</span>
                        <span className="text-sm text-signal font-medium">{item.won}</span>
                      </div>
                      <div className="h-1.5 bg-raised rounded-full overflow-hidden">
                        <div
                          className="h-full bg-signal rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Most used moves */}
            <Card variant="standard" className="p-4 space-y-3">
              <h2 className="text-sm font-medium text-text-1">Most Used Moves</h2>
              <div className="space-y-2">
                {stats.mostUsedMoves?.map((item: any) => (
                  <div key={item.move} className="flex items-center justify-between">
                    <span className="text-sm text-text-2">{item.move}</span>
                    <span className="text-sm text-text-1 font-medium">{item.count}x</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-text-3">No stats available yet</p>
          </div>
        )}
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomTabBar />
    </div>
  );
}
