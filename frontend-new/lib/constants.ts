import { MoveConfig, MoveType } from './types';

export const MOVE_CONFIGS: Record<MoveType, MoveConfig> = {
  anchor: {
    label: 'ANCHOR',
    color: '#3B82F6',
    bgColor: '#1E3A5F',
    textColor: '#60A5FA',
  },
  mirror: {
    label: 'MIRROR',
    color: '#8B5CF6',
    bgColor: '#2E1A5E',
    textColor: '#A78BFA',
  },
  bridge: {
    label: 'BRIDGE',
    color: '#06B6D4',
    bgColor: '#0F3540',
    textColor: '#67E8F9',
  },
  question: {
    label: 'QUESTION',
    color: '#F5A623',
    bgColor: '#3A2800',
    textColor: '#FCD34D',
  },
  silence: {
    label: 'SILENCE',
    color: '#6B7280',
    bgColor: '#1F2020',
    textColor: '#9CA3AF',
  },
  walkaway: {
    label: 'WALK AWAY',
    color: '#FF4D4D',
    bgColor: '#2A0A0A',
    textColor: '#FCA5A5',
  },
  close: {
    label: 'CLOSE',
    color: '#10B981',
    bgColor: '#052E16',
    textColor: '#6EE7B7',
  },
  takeit: {
    label: 'TAKE IT',
    color: '#00E5A0',
    bgColor: '#001F14',
    textColor: '#00E5A0',
  },
};

// Demo data for initial development
export const DEMO_MOVES = [
  {
    n: 1,
    type: 'anchor' as MoveType,
    say: "Based on my research and the market data for this role, I was expecting to be in the $103–108K range.",
    why: "Sets your anchor high — makes their $82K feel like a lowball.",
    watch: "If they say 'that's way out of budget' — they're anchoring you down. Hold firm.",
    they: "We can offer you $82,000 for this position."
  },
  {
    n: 2,
    type: 'mirror' as MoveType,
    say: "$82,000? I appreciate the offer, but that's below what I was expecting given the scope of the role.",
    why: "Mirroring their number back makes them reconsider it.",
    watch: "If they defend it immediately — they have room to move.",
    they: "That's really our ceiling for this level."
  },
  {
    n: 3,
    type: 'bridge' as MoveType,
    say: "I appreciate you going to bat for me. If base salary has a ceiling, can we look at a signing bonus or an earlier review at 6 months?",
    why: "Gives them a face-saving yes on a different budget line.",
    watch: "If they say 'let me check' — they're not at ceiling.",
    they: "We really can't budge on the base salary."
  }
];

export const DEMO_SESSIONS = [
  {
    id: '1',
    type: 'salary' as const,
    title: 'Salary · TechCorp',
    goal: '$95,000',
    offer: '$82,000',
    floor: '$88,000',
    leverage: 'Competing offer from Company B at $91K',
    style: 'balanced' as const,
    status: 'won' as const,
    createdAt: new Date('2026-06-13'),
    moveCount: 4,
    finalAmount: 11000,
  },
  {
    id: '2',
    type: 'rent' as const,
    title: 'Rent renewal · Downtown',
    goal: '$2,200/mo',
    offer: '$2,650/mo',
    floor: '$2,400/mo',
    leverage: 'Been here 2 years, good tenant',
    style: 'collaborative' as const,
    status: 'ongoing' as const,
    createdAt: new Date('2026-06-10'),
    moveCount: 2,
  },
];

export const DEMO_USER = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john@example.com',
};

export const DEMO_STATS = {
  sessions: '2',
  won: '$11K',
};

export const CATEGORIES = [
  { id: 'salary', label: 'Salary' },
  { id: 'rent', label: 'Rent' },
  { id: 'contract', label: 'Contract' },
  { id: 'medical', label: 'Medical' },
  { id: 'vendor', label: 'Vendor' },
  { id: 'other', label: 'Other' },
];
