"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { LiveTopBar, ContextBar } from "@/components/layout/live-top-bar";
import { MoveCard, MoveCardLoading } from "@/components/screens/move-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic } from "lucide-react";
import { MoveType } from "@/lib/types";
import { MoveCardData } from "@/components/screens/move-card";

export default function LiveSessionPage() {
  const params = useParams();
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [currentMove, setCurrentMove] = React.useState<MoveCardData | null>(null);
  const [session, setSession] = React.useState<any>(null);

  React.useEffect(() => {
    // TODO: Fetch session data
    // fetchSession(params.id).then(setSession);
  }, [params.id]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      // TODO: Call API to get next move
      // const response = await api.createTurn(params.id, input);
      // setCurrentMove(response.move);
      setInput("");
    } catch (error) {
      console.error("Failed to get move:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicToggle = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const handleDealClosed = () => {
    router.push(`/sessions/${params.id}/end`);
  };

  const handleWalkAway = () => {
    if (confirm("Are you sure you want to walk away from this negotiation?")) {
      router.push(`/sessions/${params.id}/end`);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Live Top Bar */}
      <LiveTopBar
        sessionName={session?.title || "Negotiation"}
        moveCount={session?.moveCount || 0}
      />

      {/* Context Bar */}
      <ContextBar
        goal={session?.goal || ""}
        floor={session?.floor || ""}
        currentOffer={session?.currentOffer || ""}
      />

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-5">
        {/* Move Card */}
        {isLoading ? (
          <MoveCardLoading className="my-4" />
        ) : currentMove ? (
          <MoveCard move={currentMove} className="my-4" />
        ) : (
          <div className="my-4 p-8 text-center">
            <p className="text-text-3">Enter what they said to get your next move</p>
          </div>
        )}

        {/* Move History (collapsed by default) */}
        <div className="pb-6">
          <button className="text-[11px] text-[#444444] uppercase tracking-wider">
            Previous moves
          </button>
        </div>
      </div>

      {/* Fixed bottom input area */}
      <div className="bg-ink border-t border-[#1C1C1C] px-5 py-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        {/* Input label */}
        <label className="block text-[10px] font-medium uppercase tracking-wider text-text-3 mb-2">
          WHAT DID THEY JUST SAY?
        </label>

        {/* Textarea */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or tap mic to whisper..."
          className="mb-2.5"
          rows={2}
          disabled={isLoading}
        />

        {/* Action row */}
        <div className="flex items-center gap-2.5 mb-3">
          {/* Mic button */}
          <Button
            variant="mic"
            isRecording={isRecording}
            onClick={handleMicToggle}
            disabled={isLoading}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <Mic className={isRecording ? "text-danger" : "text-text-2"} size={22} />
          </Button>

          {/* Submit button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Thinking..." : "Get my move →"}
          </Button>
        </div>

        {/* Danger row */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleDealClosed}
            className="text-[13px] text-signal hover:text-[#00CC8F] transition-colors"
          >
            Deal closed
          </button>
          <button
            onClick={handleWalkAway}
            className="text-[13px] text-danger hover:text-[#FF6B6B] transition-colors"
          >
            Walk away
          </button>
        </div>
      </div>
    </div>
  );
}
