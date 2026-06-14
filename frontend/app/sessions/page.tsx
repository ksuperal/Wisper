"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { SessionListItem } from "@/components/screens/session-list-item";
import { EmptyState } from "@/components/ui/empty-state";
import { Session } from "@/lib/types";

export default function SessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch sessions from API
    // fetchSessions().then(setSessions).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-ink flex flex-col pb-20">
      {/* Top Bar */}
      <TopBar title="Sessions" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-4 px-5">
        <div className="pb-24">
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-text-3">Loading sessions...</p>
            </div>
          ) : sessions.length > 0 ? (
            <div className="bg-surface -mx-5">
              {sessions.map((session) => (
                <SessionListItem key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="⏱️"
              title="Nothing here yet"
              description="Your session history will show up here."
            />
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomTabBar />
    </div>
  );
}
