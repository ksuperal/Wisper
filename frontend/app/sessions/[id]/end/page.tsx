"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OUTCOME_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const emotions = [
  { label: "Confident", emoji: "😎" },
  { label: "Nervous", emoji: "😰" },
  { label: "In control", emoji: "💪" },
  { label: "Pressured", emoji: "😓" },
  { label: "Neutral", emoji: "😐" },
];

export default function SessionEndPage() {
  const params = useParams();
  const router = useRouter();
  const [outcome, setOutcome] = React.useState<string | null>(null);
  const [finalOutcome, setFinalOutcome] = React.useState("");
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = async () => {
    if (!outcome || !finalOutcome.trim()) return;

    setIsGenerating(true);
    try {
      // TODO: Call API to save outcome and generate debrief
      // await api.saveSessionOutcome(params.id, {
      //   outcome,
      //   finalOutcome,
      //   emotions: selectedEmotions
      // });
      // router.push(`/sessions/${params.id}/debrief`);
    } catch (error) {
      console.error("Failed to save outcome:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-5 space-y-2">
        <h1 className="text-[22px] font-medium text-text-1">How did it go?</h1>
        <p className="text-sm text-text-3">
          Tell us the outcome so we can debrief you.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="pb-24 space-y-6">
        {/* Outcome picker - 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {OUTCOME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setOutcome(option.value)}
              className={cn(
                "flex flex-col items-center justify-center h-[70px] rounded-xl border-2 transition-all",
                outcome === option.value
                  ? "border-signal bg-signal-bg"
                  : "border-border bg-surface hover:border-muted"
              )}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-xs text-text-2">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Final outcome */}
        <div className="space-y-2">
          <label
            htmlFor="finalOutcome"
            className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
          >
            WHAT WAS AGREED?
          </label>
          <Textarea
            id="finalOutcome"
            value={finalOutcome}
            onChange={(e) => setFinalOutcome(e.target.value)}
            placeholder="$93,000 salary + $5K signing bonus"
            rows={3}
          />
        </div>

        {/* Emotions */}
        <div className="space-y-3">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-text-3">
            HOW DID YOU FEEL?
          </label>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion.label}
                onClick={() => toggleEmotion(emotion.label)}
                className={cn(
                  "flex items-center gap-2 px-3.5 h-[34px] rounded-full transition-all text-sm",
                  selectedEmotions.includes(emotion.label)
                    ? "bg-signal text-[#001A12]"
                    : "bg-raised text-text-3 border border-border hover:border-muted"
                )}
              >
                <span>{emotion.emoji}</span>
                <span>{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="px-5 py-4 bg-ink border-t border-border" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!outcome || !finalOutcome.trim() || isGenerating}
        >
          {isGenerating ? "Generating debrief..." : "Get my debrief →"}
        </Button>
      </div>
    </div>
  );
}
