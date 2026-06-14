/**
 * Deal App Constants
 */

import { MoveBadgeConfig, MoveType, NegotiationType } from "./types";

// Move Badge Configurations
export const MOVE_CONFIGS: Record<MoveType, MoveBadgeConfig> = {
  ANCHOR: {
    type: "ANCHOR",
    label: "ANCHOR",
    color: "#3B82F6",
    bgColor: "#1E3A5F",
    textColor: "#60A5FA",
  },
  MIRROR: {
    type: "MIRROR",
    label: "MIRROR",
    color: "#8B5CF6",
    bgColor: "#2E1A5E",
    textColor: "#A78BFA",
  },
  BRIDGE: {
    type: "BRIDGE",
    label: "BRIDGE",
    color: "#06B6D4",
    bgColor: "#0F3540",
    textColor: "#67E8F9",
  },
  QUESTION: {
    type: "QUESTION",
    label: "QUESTION",
    color: "#F5A623",
    bgColor: "#3A2800",
    textColor: "#FCD34D",
  },
  SILENCE: {
    type: "SILENCE",
    label: "SILENCE",
    color: "#6B7280",
    bgColor: "#1F2020",
    textColor: "#9CA3AF",
  },
  WALKAWAY: {
    type: "WALKAWAY",
    label: "WALK AWAY",
    color: "#FF4D4D",
    bgColor: "#2A0A0A",
    textColor: "#FCA5A5",
  },
  CLOSE: {
    type: "CLOSE",
    label: "CLOSE",
    color: "#10B981",
    bgColor: "#052E16",
    textColor: "#6EE7B7",
  },
  TAKEIT: {
    type: "TAKEIT",
    label: "TAKE IT",
    color: "#00E5A0",
    bgColor: "#001F14",
    textColor: "#00E5A0",
  },
};

// Negotiation Type Configurations
export const NEGOTIATION_TYPES: Array<{
  value: NegotiationType;
  label: string;
  icon: string;
}> = [
  { value: "salary", label: "Salary", icon: "💼" },
  { value: "rent", label: "Rent", icon: "🏠" },
  { value: "contract", label: "Contract", icon: "📄" },
  { value: "medical", label: "Medical", icon: "🏥" },
  { value: "vendor", label: "Vendor", icon: "🤝" },
  { value: "other", label: "Other", icon: "💬" },
];

// Negotiation Style Configurations
export const NEGOTIATION_STYLES = [
  {
    value: "collaborative",
    label: "Collaborative",
    description: "Preserve the relationship",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Firm but professional",
  },
  {
    value: "hardball",
    label: "Hardball",
    description: "Maximum outcome",
  },
] as const;

// Outcome Options for Session End
export const OUTCOME_OPTIONS = [
  {
    value: "won",
    label: "Won the deal",
    icon: "🎯",
    color: "#00E5A0",
  },
  {
    value: "ongoing",
    label: "Still ongoing",
    icon: "⏳",
    color: "#F5A623",
  },
  {
    value: "i_walked",
    label: "I walked away",
    icon: "🚪",
    color: "#A0A0A0",
  },
  {
    value: "they_walked",
    label: "They walked away",
    icon: "❌",
    color: "#FF4D4D",
  },
] as const;

// Animation Durations (in ms)
export const ANIMATIONS = {
  SCREEN_TRANSITION: 280,
  BOTTOM_SHEET_OPEN: 300,
  BOTTOM_SHEET_CLOSE: 250,
  MOVE_CARD_APPEAR: 250,
  SCORE_BAR_FILL: 800,
  LIVE_DOT_PULSE: 1200,
  THINKING_DOTS: 400,
  NUMBER_COUNT_UP: 600,
  TAB_SWITCH: 150,
  TOAST: 200,
  BUTTON_TAP: 80,
} as const;

// Typography Sizes
export const TYPOGRAPHY = {
  DISPLAY: "text-[32px] md:text-[40px] font-medium tracking-tight",
  H1: "text-2xl font-medium tracking-tight",
  H2: "text-lg font-medium tracking-tight",
  H3: "text-[15px] font-medium tracking-tight",
  BODY_LARGE: "text-[15px] leading-relaxed",
  BODY: "text-[13px] leading-relaxed",
  CAPTION: "text-[11px] font-medium uppercase tracking-wider",
  MONO: "font-mono text-xs",
} as const;

// Spacing
export const SPACING = {
  SCREEN_PADDING: "px-5",
  CARD_GAP: "gap-2",
  SECTION_GAP: "gap-5",
  LARGE_GAP: "gap-6",
} as const;
