"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pill } from "@/components/ui/pill";
import { StepProgress } from "@/components/ui/step-progress";
import { NEGOTIATION_TYPES, NEGOTIATION_STYLES } from "@/lib/constants";
import { NegotiationType, NegotiationStyle } from "@/lib/types";

export default function NewSessionPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  // Step 1 fields
  const [type, setType] = React.useState<NegotiationType | null>(null);
  const [goal, setGoal] = React.useState("");
  const [currentOffer, setCurrentOffer] = React.useState("");
  const [walkAway, setWalkAway] = React.useState("");

  // Step 2 fields
  const [myLeverage, setMyLeverage] = React.useState("");
  const [theirPressure, setTheirPressure] = React.useState("");
  const [style, setStyle] = React.useState<NegotiationStyle>("balanced");

  const [isGenerating, setIsGenerating] = React.useState(false);

  const canProceedStep1 = type && goal && walkAway;
  const canProceedStep2 = myLeverage;

  const handleNext = () => {
    if (step === 1 && canProceedStep1) {
      setStep(2);
    } else if (step === 2 && canProceedStep2) {
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Call API to create session and generate strategy
    // Simulate API call
    setTimeout(() => {
      router.push("/sessions/1/strategy");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Top Bar */}
      <TopBar
        title="New negotiation"
        showBack
        onBack={() => step === 1 ? router.back() : setStep(1)}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="py-6 pb-24">
          {/* Step indicator */}
          <div className="mb-8">
            <StepProgress currentStep={step} totalSteps={2} />
          </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Section title */}
            <h2 className="text-lg font-medium text-text-1">The situation</h2>

            {/* Type picker */}
            <div className="space-y-3">
              <label className="block text-[11px] font-medium uppercase tracking-wider text-text-3">
                WHAT ARE YOU NEGOTIATING?
              </label>
              <div className="flex flex-wrap gap-2">
                {NEGOTIATION_TYPES.map((t) => (
                  <Pill
                    key={t.value}
                    variant="category"
                    selected={type === t.value}
                    onClick={() => setType(t.value)}
                  >
                    {t.icon} {t.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label
                htmlFor="goal"
                className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
              >
                WHAT DO YOU WANT TO ACHIEVE?
              </label>
              <Textarea
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Get a salary of $95,000..."
                rows={3}
              />
            </div>

            {/* Current offer */}
            <div className="space-y-2">
              <label
                htmlFor="offer"
                className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
              >
                WHAT ARE THEY OFFERING?
              </label>
              <Input
                id="offer"
                type="text"
                value={currentOffer}
                onChange={(e) => setCurrentOffer(e.target.value)}
                placeholder="$82,000"
              />
            </div>

            {/* Walk away */}
            <div className="space-y-2">
              <label
                htmlFor="walkaway"
                className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
              >
                I WON'T ACCEPT LESS THAN...
              </label>
              <Input
                id="walkaway"
                type="text"
                value={walkAway}
                onChange={(e) => setWalkAway(e.target.value)}
                placeholder="$88,000"
              />
              <p className="text-[11px] text-text-3">
                This stays private. AI uses this to know when to say stop.
              </p>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Section title */}
            <h2 className="text-lg font-medium text-text-1">Your leverage</h2>

            {/* My leverage */}
            <div className="space-y-2">
              <label
                htmlFor="leverage"
                className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
              >
                WHY DO YOU HAVE POWER?
              </label>
              <Textarea
                id="leverage"
                value={myLeverage}
                onChange={(e) => setMyLeverage(e.target.value)}
                placeholder="I have a competing offer from Company B for $91K. They've been hiring for this role for 3 months..."
                rows={4}
              />
              <p className="text-[11px] text-text-3">
                The more detail, the better the strategy.
              </p>
            </div>

            {/* Their pressure */}
            <div className="space-y-2">
              <label
                htmlFor="pressure"
                className="block text-[11px] font-medium uppercase tracking-wider text-text-3"
              >
                WHAT PRESSURE MIGHT THEY BE UNDER? (OPTIONAL)
              </label>
              <Textarea
                id="pressure"
                value={theirPressure}
                onChange={(e) => setTheirPressure(e.target.value)}
                placeholder="End of quarter, hiring freeze coming..."
                rows={3}
              />
            </div>

            {/* Style selector */}
            <div className="space-y-3">
              <label className="block text-[11px] font-medium uppercase tracking-wider text-text-3">
                HOW AGGRESSIVE?
              </label>
              <div className="flex gap-2">
                {NEGOTIATION_STYLES.map((s) => (
                  <Pill
                    key={s.value}
                    variant="category"
                    selected={style === s.value}
                    onClick={() => setStyle(s.value)}
                    className="flex-1"
                  >
                    {s.label}
                  </Pill>
                ))}
              </div>
              {/* Helper text for selected style */}
              <p className="text-[11px] text-text-3 text-center">
                {NEGOTIATION_STYLES.find((s) => s.value === style)?.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="px-5 py-4 bg-ink border-t border-border">
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={step === 1 ? !canProceedStep1 : !canProceedStep2 || isGenerating}
        >
          {step === 1
            ? "Next →"
            : isGenerating
            ? "Building your playbook..."
            : "Generate my strategy →"}
        </Button>
        </div>
      </div>
    </div>
  );
}
