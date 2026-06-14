/**
 * Deal App Type Definitions
 */

// Move Types - The core tactical moves in negotiation
export type MoveType =
  | "ANCHOR"
  | "MIRROR"
  | "BRIDGE"
  | "QUESTION"
  | "SILENCE"
  | "WALKAWAY"
  | "CLOSE"
  | "TAKEIT";

// Negotiation Category Types
export type NegotiationType =
  | "salary"
  | "rent"
  | "contract"
  | "medical"
  | "vendor"
  | "other";

// Negotiation Style
export type NegotiationStyle = "collaborative" | "balanced" | "hardball";

// Session Status
export type SessionStatus = "won" | "lost" | "ongoing";

// User Subscription Tier
export type SubscriptionTier = "free" | "pro" | "payperuse";

// Move Badge Configuration
export interface MoveBadgeConfig {
  type: MoveType;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

// Session Type
export interface Session {
  id: string;
  userId: string;
  type: NegotiationType;
  title?: string;
  goal: string;
  floor?: string;
  currentOffer?: string;
  walkAwayPoint: string;
  myLeverage?: string;
  theirPressure?: string;
  style: NegotiationStyle;
  status: SessionStatus;
  outcome?: string;
  finalAmount?: number;
  moveCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Turn (conversation turn in a session)
export interface Turn {
  id: string;
  sessionId: string;
  turnNumber: number;
  theyInput: string;
  moveType: MoveType;
  youSay: string;
  why: string;
  watchFor: string;
  createdAt: string;
}

// Debrief
export interface Debrief {
  id: string;
  sessionId: string;
  score: number;
  whatWorked: string[];
  doNextTime: string[];
  theirTactics: string[];
  verdict: string;
  createdAt: string;
}

// User Profile
export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  subscriptionTier: SubscriptionTier;
  sessionsRemaining?: number;
  createdAt: string;
}
