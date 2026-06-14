"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreBar } from "@/components/ui/score-bar";
import { Pill } from "@/components/ui/pill";
import { Check, ArrowRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DebriefPage() {
  const params = useParams();
  const router = useRouter();
  const [debrief, setDebrief] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch debrief from API
    // fetchDebrief(params.id).then(setDebrief).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, [params.id]);

  const handleShare = () => {
    router.push(`/sessions/${params.id}/share`);
  };

  const handleDone = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Top Bar */}
      <TopBar
        title="Session debrief"
        showBack={false}
        rightAction={
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-11 h-11 text-text-2 hover:text-text-1 transition-colors rounded-lg"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="py-6 pb-24 space-y-6">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-text-3">Generating debrief...</p>
          </div>
        ) : debrief ? (
          <>
            {/* Result header card */}
            <Card variant="signal" signalAccent className="space-y-2">
              <p className="text-[11px] text-text-3">
                {debrief.sessionInfo}
              </p>
              <p className="text-[13px] text-text-2">
                {debrief.changeDescription}
              </p>
              <div className="text-4xl font-medium text-signal tracking-tight">
                {debrief.totalGain}
              </div>
              <Pill variant="status" status={debrief.status}>
                {debrief.statusLabel}
              </Pill>
            </Card>

            {/* Score card */}
            <Card variant="standard" className="p-5">
              <ScoreBar
                score={debrief.score}
                maxScore={10}
                animated={true}
                showScore={true}
                label="NEGOTIATION SCORE"
              />
            </Card>

            {/* What worked */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-text-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-signal rounded-full" />
                WHAT WORKED
              </h2>
              <div className="space-y-0 bg-surface rounded-xl overflow-hidden">
                {debrief.whatWorked?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 p-4",
                      i < debrief.whatWorked.length - 1 && "border-b border-[#1C1C1C]"
                    )}
                  >
                    <Check className="w-4 h-4 text-signal flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] text-text-2 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improve next time */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-warn flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-warn rounded-full" />
                DO BETTER NEXT TIME
              </h2>
              <div className="space-y-0 bg-surface rounded-xl overflow-hidden">
                {debrief.improvements?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 p-4",
                      i < debrief.improvements.length - 1 && "border-b border-[#1C1C1C]"
                    )}
                  >
                    <ArrowRight className="w-4 h-4 text-warn flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] text-text-2 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Their tactics */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-text-3">
                THEY USED ON YOU
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {debrief.theirTactics?.map((tactic: string) => (
                  <div
                    key={tactic}
                    className="flex-shrink-0 px-3 h-8 flex items-center bg-raised border border-border rounded-lg text-xs text-text-2"
                  >
                    {tactic}
                  </div>
                ))}
              </div>
            </div>

            {/* Share button - only for wins */}
            {debrief.status === "won" && (
              <Button
                variant="danger"
                fullWidth
                onClick={handleShare}
                className="bg-signal hover:bg-[#00CC8F] text-[#001A12] border-signal"
              >
                Share my win
              </Button>
            )}

            {/* Done button */}
            <Button variant="secondary" fullWidth onClick={handleDone}>
              Back to dashboard
            </Button>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-text-3">No debrief available</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
