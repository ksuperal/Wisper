"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveBadge } from "@/components/ui/move-badge";
import { Pill } from "@/components/ui/pill";
import { Check, AlertCircle } from "lucide-react";

export default function StrategyPage() {
  const params = useParams();
  const router = useRouter();
  const [strategy, setStrategy] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch strategy from API
    // fetchStrategy(params.id).then(setStrategy).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, [params.id]);

  const handleStartSession = () => {
    router.push(`/sessions/${params.id}/live`);
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Top Bar */}
      <TopBar
        showBack
        rightAction={
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-text-2 hover:text-text-1"
          >
            × Close
          </button>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="py-6 pb-24 space-y-6">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-text-3">Loading strategy...</p>
          </div>
        ) : strategy ? (
          <>
            {/* Header */}
            <div className="space-y-3">
              <Pill variant="status" status="won" className="bg-signal-bg border-signal-dim">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-signal rounded-full" />
                  <span className="text-signal">READY</span>
                </div>
              </Pill>

              <div>
                <h1 className="text-[15px] font-medium text-text-1 mb-1">
                  {strategy.title}
                </h1>
                <p className="text-xs text-text-3">{strategy.date}</p>
              </div>
            </div>

            {/* Your Range Card */}
            <Card variant="standard">
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="px-4 py-3 text-center">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1">
                    Target
                  </p>
                  <p className="text-lg font-medium text-signal">{strategy.target}</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1">
                    Floor
                  </p>
                  <p className="text-lg font-medium text-text-1">{strategy.floor}</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1">
                    Gap
                  </p>
                  <p className="text-lg font-medium text-text-1">{strategy.gap}</p>
                </div>
              </div>
            </Card>

            {/* Opening Move Card */}
            <Card variant="signal" signalAccent className="space-y-3">
              <MoveBadge type={strategy.openingMoveType} />

              <div className="space-y-2">
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-signal">
                  Your opening line:
                </h3>
                <p className="text-sm text-[#E0E0E0] leading-relaxed italic">
                  "{strategy.openingLine}"
                </p>
              </div>
            </Card>

            {/* Watch Out Section */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-text-3 flex items-center gap-2">
                THEIR LIKELY MOVES
              </h2>
              <div className="space-y-2">
                {strategy.theirLikelyMoves?.map((tactic: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-surface rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-warn flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-text-2 leading-relaxed">{tactic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Power Moves */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-text-3">
                YOUR LEVERAGE
              </h2>
              <div className="space-y-2">
                {strategy.leverage?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-surface rounded-lg"
                  >
                    <Check className="w-4 h-4 text-signal flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-text-2 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle reminder */}
            <p className="text-[11px] text-[#444444] text-center">
              Your strategy is saved. Return anytime.
            </p>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-text-3">No strategy found</p>
          </div>
        )}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="px-5 py-4 bg-ink border-t border-border" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
        <Button variant="primary" fullWidth onClick={handleStartSession}>
          I'm ready — start session
        </Button>
      </div>
    </div>
  );
}
